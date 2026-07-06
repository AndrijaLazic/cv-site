import { Link, createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, CalendarDays, Clock3 } from 'lucide-react'
import { getBlogPostMeta, loadBlogPost } from '#/features/blog/api'
import { BlogContentRenderer } from '#/features/blog/BlogContentRenderer'
import { BlogImage, BlogTableOfContents } from '#/features/blog/components'
import {
  resolveSupportedLanguage,
  supportedLanguages,
} from '#/features/i18n/config'
import type { BlogPostSummary } from '#/features/blog/types/blog'
import { publicConfig } from '#/shared/config/public-env'
import { Badge } from '#/shared/ui/badge'

function findPostBySlug(slug: string): BlogPostSummary | undefined {
  for (const locale of supportedLanguages) {
    const post = getBlogPostMeta(locale, slug)
    if (post) {
      return post
    }
  }

  return undefined
}

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostPage,
  loader: async ({ params }) =>
    Object.fromEntries(
      await Promise.all(
        supportedLanguages.map(async (locale) => [
          locale,
          await loadBlogPost(locale, params.slug),
        ]),
      ),
    ),
  head: ({ params }) => {
    const siteUrl = publicConfig.siteUrl
    const canonicalUrl = `${siteUrl}/blog/${params.slug}`
    const post = findPostBySlug(params.slug)
    const title = post
      ? `${post.title} | Andrija Lazic`
      : 'Blog | Andrija Lazic'
    const description = post?.summary ?? 'Blog post by Andrija Lazic.'
    const coverImageSrc = post?.coverImage.src
    const coverImageUrl = coverImageSrc
      ? coverImageSrc.startsWith('http')
        ? coverImageSrc
        : `${siteUrl}${coverImageSrc}`
      : undefined
    const meta: Array<Record<string, string>> = [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:type', content: 'article' },
    ]
    if (coverImageUrl) {
      meta.push({ property: 'og:image', content: coverImageUrl })
    }
    return {
      meta,
      links: [{ rel: 'canonical', href: canonicalUrl }],
    }
  },
})

function BlogPostJsonLd({ post }: { post: BlogPostSummary }) {
  const coverImageSrc = post.coverImage.src
  const coverImageUrl = coverImageSrc
    ? coverImageSrc.startsWith('http')
      ? coverImageSrc
      : `${publicConfig.siteUrl}${coverImageSrc}`
    : undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedDate,
    author: {
      '@type': 'Person',
      name: post.author,
      url: post.authorUrl ?? publicConfig.siteUrl,
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
  const postsByLanguage = Route.useLoaderData()
  const { t, i18n } = useTranslation('resume')
  const activeLanguage = resolveSupportedLanguage(
    i18n.resolvedLanguage ?? i18n.language,
  )

  const post = postsByLanguage[activeLanguage]
  const showTableOfContents = post?.showTableOfContents !== false

  if (!post) {
    return (
      <div className="flex-1 bg-(--color-bg) px-4 py-10 sm:px-6 sm:py-14">
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
      </div>
    )
  }

  return (
    <>
      <BlogPostJsonLd post={post} />
      <div className="flex-1 bg-(--color-bg) px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-18">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 transition-colors hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            <ArrowLeft className="size-4" />
            {t('blogBackToList')}
          </Link>

          <article className="mt-8">
            <header className="max-w-4xl space-y-5">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <TagLink key={tag} tag={tag} />
                ))}
              </div>
              <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-balance text-slate-950 sm:text-5xl lg:text-6xl dark:text-slate-50">
                {post.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300">
                {post.summary}
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200/80 pt-5 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <AuthorLink post={post} />
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-4" aria-hidden="true" />
                  <span className="sr-only">{t('blogPublished')}</span>
                  <time dateTime={post.publishedDate}>
                    {post.publishedDate}
                  </time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="size-4" aria-hidden="true" />
                  {estimateReadingTime(post)}
                </span>
              </div>
            </header>

            {post.coverImage ? (
              <div className="mt-10 overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <BlogImage {...post.coverImage} />
              </div>
            ) : null}

            <div
              className={
                showTableOfContents
                  ? 'mx-auto mt-10 grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,640px)_minmax(240px,280px)] lg:items-start lg:justify-center'
                  : 'mx-auto mt-10 max-w-[640px]'
              }
            >
              <div className="min-w-0">
                {showTableOfContents ? (
                  <BlogTableOfContents
                    className="mb-9 lg:hidden"
                    items={post.tableOfContents}
                    locale={post.locale}
                  />
                ) : null}
                <BlogContentRenderer content={post.content} />
              </div>
              {showTableOfContents ? (
                <BlogTableOfContents
                  className="hidden lg:block"
                  items={post.tableOfContents}
                  locale={post.locale}
                />
              ) : null}
            </div>
          </article>
        </div>
      </div>
    </>
  )
}

function AuthorLink({ post }: { post: BlogPostSummary }) {
  if (!post.authorUrl) {
    return (
      <span className="font-semibold text-slate-700 dark:text-slate-200">
        {post.author}
      </span>
    )
  }

  return (
    <a
      href={post.authorUrl}
      target="_blank"
      rel="noreferrer"
      className="font-semibold text-slate-700 underline-offset-4 transition-colors hover:text-cyan-700 hover:underline dark:text-slate-200 dark:hover:text-cyan-300"
    >
      {post.author}
    </a>
  )
}

function TagLink({ tag }: { tag: string }) {
  return (
    <Link to="/blog" search={{ tag }}>
      <Badge
        variant="outline"
        className="border-slate-300/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 transition-colors hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-900/65 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
      >
        {tag}
      </Badge>
    </Link>
  )
}

function estimateReadingTime(post: BlogPostSummary) {
  const sectionCount = Math.max(post.tableOfContents.length, 1)
  const minutes = Math.max(2, Math.round(sectionCount * 0.7))
  return post.locale === 'sr' ? `${minutes} min čitanja` : `${minutes} min read`
}
