import { Link, createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'
import { getPostComponent, getPostMeta } from '#/features/blog/registry'
import { MdxRenderer } from '#/features/blog/MdxRenderer'
import { BlogImage } from '#/features/blog/components'
import { resolveSupportedLanguage } from '#/features/i18n/config'
import type { SupportedLanguage } from '#/features/i18n/languages'
import type { PostMeta } from '#/features/blog/types/blog'
import { publicConfig } from '#/shared/config/public-env'
import { Badge } from '#/shared/ui/badge'

function findPostMeta(
  slug: string,
  locale: SupportedLanguage,
): PostMeta | undefined {
  return getPostMeta(locale, slug)
}

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostPage,
  head: ({ params }) => {
    const siteUrl = publicConfig.siteUrl
    const canonicalUrl = `${siteUrl}/blog/${params.slug}`
    const post =
      findPostMeta(params.slug, 'en') ?? findPostMeta(params.slug, 'sr')
    const title = post ? `${post.title} | Andrija Lazic` : 'Blog | Andrija Lazic'
    const description = post?.summary ?? 'Blog post by Andrija Lazic.'
    const coverImageSrc = post?.coverImage?.src
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

function BlogPostJsonLd({ post }: { post: PostMeta }) {
  const coverImageSrc = post.coverImage?.src
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

  const post = getPostMeta(activeLanguage, slug)
  const PostComponent = getPostComponent(activeLanguage, slug)

  if (!post || !PostComponent) {
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

          <article className="space-y-6">
            {post.coverImage && <BlogImage {...post.coverImage} />}

            <header className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {t('blogPublished')}{' '}
                  <time
                    dateTime={post.publishedDate}
                    className="font-medium text-slate-700 dark:text-slate-300"
                  >
                    {post.publishedDate}
                  </time>
                </span>
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
              </div>
            </header>

            <div className="border-t border-slate-200 pt-6 dark:border-slate-700">
              <MdxRenderer Component={PostComponent} />
            </div>
          </article>
        </div>
      </main>
    </>
  )
}
