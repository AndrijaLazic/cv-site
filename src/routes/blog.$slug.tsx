import { Link, createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { marked } from 'marked'
import type { Tokens } from 'marked'
import { ArrowLeft } from 'lucide-react'
import { useMemo } from 'react'
import * as contentCollections from '../../.content-collections/generated/index.js'
import type { SupportedLanguage } from '#/features/i18n/config'
import {
  resolveSupportedLanguage,
  supportedLanguages,
} from '#/features/i18n/config'
import { publicConfig } from '#/shared/config/public-env'
import { Badge } from '#/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '#/shared/ui/card'

type ContentCollections = typeof contentCollections
type BlogPost = ContentCollections[keyof ContentCollections][number] & {
  title: string
  slug: string
  summary: string
  publishedDate: string
  coverImage?: string
  tags: string[]
  content: string
}

type SectionBreadcrumb = {
  id: string
  title: string
  depth: number
}

type RenderedBlogContent = {
  html: string
  sectionBreadcrumbs: Array<SectionBreadcrumb>
}

function toCollectionSuffix(language: SupportedLanguage) {
  return `${language.charAt(0).toUpperCase()}${language.slice(1)}s`
}

function getLocalizedBlogs(language: SupportedLanguage) {
  const key =
    `allBlogs${toCollectionSuffix(language)}` as keyof ContentCollections
  const collection = contentCollections[key]
  return (Array.isArray(collection) ? collection : []) as Array<BlogPost>
}

const blogsByLanguage = Object.fromEntries(
  supportedLanguages.map((language) => [language, getLocalizedBlogs(language)]),
) as Record<SupportedLanguage, Array<BlogPost>>

function findPost(slug: string, language: SupportedLanguage) {
  return blogsByLanguage[language].find((post) => post.slug === slug)
}

function stripHtmlTags(value: string) {
  return value.replace(/<[^>]*>/g, '')
}

function createHeadingSlug(headingText: string) {
  const cleaned = stripHtmlTags(headingText)
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  return cleaned.length > 0 ? cleaned : 'section'
}

function resolveUniqueHeadingId(baseSlug: string, seen: Map<string, number>) {
  const count = seen.get(baseSlug) ?? 0
  seen.set(baseSlug, count + 1)

  if (count === 0) {
    return baseSlug
  }

  return `${baseSlug}-${count + 1}`
}

function buildSectionBreadcrumbs(markdownContent: string) {
  const tokens = marked.lexer(markdownContent)
  const seen = new Map<string, number>()
  const sectionBreadcrumbs: Array<SectionBreadcrumb> = []

  for (const token of tokens) {
    if (token.type !== 'heading') {
      continue
    }

    if (token.depth < 2 || token.depth > 3) {
      continue
    }

    const title = token.text.trim()
    if (!title) {
      continue
    }

    const id = resolveUniqueHeadingId(createHeadingSlug(title), seen)
    sectionBreadcrumbs.push({
      id,
      title,
      depth: token.depth,
    })
  }

  return sectionBreadcrumbs
}

function renderBlogContent(markdownContent: string): RenderedBlogContent {
  const sectionBreadcrumbs = buildSectionBreadcrumbs(markdownContent)
  const seen = new Map<string, number>()
  const renderer = new marked.Renderer()

  renderer.heading = function ({ tokens, depth }: Tokens.Heading) {
    const headingHtml = this.parser.parseInline(tokens)
    const headingText = stripHtmlTags(headingHtml)
    const id = resolveUniqueHeadingId(createHeadingSlug(headingText), seen)

    return `<h${depth} id="${id}" class="scroll-mt-24">${headingHtml}</h${depth}>`
  }

  return {
    html: marked(markdownContent, { renderer }) as string,
    sectionBreadcrumbs,
  }
}

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostPage,
  head: ({ params }) => {
    // Use English as fallback for SSR head meta
    const siteUrl = publicConfig.siteUrl
    const canonicalUrl = `${siteUrl}/blog/${params.slug}`
    const post = findPost(params.slug, 'en') ?? findPost(params.slug, 'sr')
    const title = post
      ? `${post.title} | Andrija Lazic`
      : 'Blog | Andrija Lazic'
    const description = post?.summary ?? 'Blog post by Andrija Lazic.'
    const coverImageUrl = post?.coverImage
      ? post.coverImage.startsWith('http')
        ? post.coverImage
        : `${siteUrl}${post.coverImage}`
      : undefined
    const meta = [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      {
        property: 'og:url',
        content: canonicalUrl,
      },
      { property: 'og:type', content: 'article' },
    ]

    if (coverImageUrl) {
      meta.push({ property: 'og:image', content: coverImageUrl })
    }

    return {
      meta,
      links: [
        {
          rel: 'canonical',
          href: canonicalUrl,
        },
      ],
    }
  },
})

function BlogPostJsonLd({ post }: { post: BlogPost }) {
  const coverImageUrl = post.coverImage
    ? post.coverImage.startsWith('http')
      ? post.coverImage
      : `${publicConfig.siteUrl}${post.coverImage}`
    : undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedDate,
    author: {
      '@type': 'Person',
      name: 'Andrija Lazic',
      url: publicConfig.siteUrl,
    },
    url: `${publicConfig.siteUrl}/blog/${post.slug}`,
    keywords: post.tags.join(', '),
    ...(coverImageUrl ? { image: coverImageUrl } : {}),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function BlogPostPage() {
  const { slug } = Route.useParams()
  const { t, i18n } = useTranslation('resume')
  const activeLanguage = resolveSupportedLanguage(
    i18n.resolvedLanguage ?? i18n.language,
  )

  const post = findPost(slug, activeLanguage)
  const renderedContent = useMemo(
    () => (post ? renderBlogContent(post.content) : null),
    [post],
  )

  if (!post) {
    return (
      <main className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            404
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">
            Post not found
          </h1>
          <Link
            to="/blog"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-700 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            <ArrowLeft className="size-4" />
            {t('blogBackToList')}
          </Link>
        </div>
      </main>
    )
  }

  return (
    <>
      <BlogPostJsonLd post={post} />
      <main className="px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-3xl space-y-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-700 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            <ArrowLeft className="size-4" />
            {t('blogBackToList')}
          </Link>

          <Card className="border-slate-200/80 bg-white/75 shadow-lg backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/65">
            <CardHeader className="space-y-4">
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-100">
                  {post.title}
                </CardTitle>
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="mt-4 aspect-[16/9] w-full rounded-xl object-cover"
                  />
                ) : null}
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t('blogPublished')}{' '}
                  <time dateTime={post.publishedDate}>
                    {post.publishedDate}
                  </time>
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-slate-300/70 bg-white/65 text-slate-700 dark:border-slate-600/70 dark:bg-slate-800/75 dark:text-slate-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              {renderedContent?.sectionBreadcrumbs.length ? (
                <nav aria-label={t('blogSections', 'Sections')}>
                  <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
                    {renderedContent.sectionBreadcrumbs.map((section, index) => (
                      <li
                        key={section.id}
                        className={
                          section.depth === 3
                            ? 'text-slate-500 dark:text-slate-400'
                            : 'text-slate-700 dark:text-slate-200'
                        }
                      >
                        {index > 0 ? (
                          <span
                            aria-hidden="true"
                            className="mr-1 text-slate-400 dark:text-slate-500"
                          >
                            /
                          </span>
                        ) : null}
                        <a
                          href={`#${section.id}`}
                          className="rounded px-1 py-0.5 hover:bg-slate-100 hover:text-cyan-700 dark:hover:bg-slate-800 dark:hover:text-cyan-300"
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              ) : null}
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-slate max-w-none dark:prose-invert [&_iframe]:aspect-video [&_iframe]:w-full [&_iframe]:rounded-xl [&_iframe]:shadow-md [&_img]:mx-auto [&_img]:rounded-xl [&_img]:shadow-md [&_video]:w-full [&_video]:rounded-xl [&_video]:shadow-md"
                dangerouslySetInnerHTML={{
                  __html: renderedContent?.html ?? '',
                }}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
