import { Link } from '@tanstack/react-router'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import { BlogContentRenderer } from './BlogContentRenderer'
import { BlogImage, BlogTableOfContents } from './components'
import type { BlogPostDetail, BlogPostSummary } from './types/blog'
import type { PostListRouteTo } from './types/routes'
import { publicConfig } from '#/shared/config/public-env'
import { defaultOgImageUrl } from '#/shared/config/social-preview'
import { Badge } from '#/shared/ui/badge'

type PostDetailPageCopy = {
  backToListLabel: string
  notFoundTitle: string
  publishedLabel: string
}

type PostDetailPageProps = {
  canonicalBasePath: PostListRouteTo
  copy: PostDetailPageCopy
  listRouteTo: PostListRouteTo
  post?: BlogPostDetail
  structuredDataType?: 'Article' | 'BlogPosting' | 'NewsArticle'
}

function PostJsonLd({
  post,
  canonicalUrl,
  structuredDataType,
}: {
  post: BlogPostSummary
  canonicalUrl: string
  structuredDataType: 'Article' | 'BlogPosting' | 'NewsArticle'
}) {
  const siteUrl = publicConfig.siteUrl
  const socialImage = post.socialImage
  const socialImageSrc = socialImage.src
  const socialImageUrl = socialImageSrc
    ? socialImageSrc.startsWith('http')
      ? socialImageSrc
      : `${siteUrl}${socialImageSrc}`
    : defaultOgImageUrl

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': structuredDataType,
    headline: post.title,
    description: post.summary,
    inLanguage: post.locale,
    datePublished: post.publishedDate,
    dateModified: post.publishedDate,
    image: socialImageUrl,
    mainEntityOfPage: canonicalUrl,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: post.authorUrl ?? siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'FMEA Excellence',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/fmea-excellence-logo-mark-1024.png`,
      },
    },
    url: canonicalUrl,
    keywords: post.tags.join(', '),
  }

  const faqJsonLd =
    post.faqItems && post.faqItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : undefined

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
    </>
  )
}

function PostFaq({
  faqItems,
  locale,
}: Pick<BlogPostSummary, 'faqItems' | 'locale'>) {
  if (!faqItems || faqItems.length === 0) {
    return null
  }

  const heading =
    locale === 'sr' ? 'Često postavljana pitanja' : 'Frequently Asked Questions'

  return (
    <section
      aria-labelledby="blog-post-faq"
      className="border-t border-slate-200/70 pt-10 dark:border-slate-800/70"
    >
      <h2
        id="blog-post-faq"
        className="mb-5 text-2xl font-semibold text-slate-900 dark:text-slate-100"
      >
        {heading}
      </h2>
      <div className="space-y-5">
        {faqItems.map((item) => (
          <div key={item.question}>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {item.question}
            </h3>
            <p className="mt-2 text-base leading-7 text-slate-700 dark:text-slate-300">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function PostDetailPage({
  canonicalBasePath,
  copy,
  listRouteTo,
  post,
  structuredDataType = 'BlogPosting',
}: PostDetailPageProps) {
  if (!post) {
    return (
      <main className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            404
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">
            {copy.notFoundTitle}
          </h1>
          <Link
            to={listRouteTo}
            search={{ tag: undefined }}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-fmea-brand-blue transition-colors hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft className="size-4" />
            {copy.backToListLabel}
          </Link>
        </div>
      </main>
    )
  }

  const canonicalUrl = `${publicConfig.siteUrl}${canonicalBasePath}/${post.slug}`
  const showTableOfContents = post.showTableOfContents !== false

  return (
    <>
      <PostJsonLd
        post={post}
        canonicalUrl={canonicalUrl}
        structuredDataType={structuredDataType}
      />
      <div className="relative min-h-screen overflow-hidden bg-(--color-bg)">
        <main className="relative px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <Link
              to={listRouteTo}
              search={{ tag: undefined }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-fmea-brand-blue transition-colors hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeft className="size-4" />
              {copy.backToListLabel}
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
                    <span className="sr-only">{copy.publishedLabel}</span>
                    <time dateTime={post.publishedDate}>
                      {post.publishedDate}
                    </time>
                  </span>
                </div>
              </header>

              <div className="mt-10 overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <BlogImage {...post.coverImage} />
              </div>

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

              <PostFaq faqItems={post.faqItems} locale={post.locale} />
            </article>
          </div>
        </main>
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
