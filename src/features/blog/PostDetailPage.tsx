import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { BlogContentRenderer } from './BlogContentRenderer'
import { BlogImage } from './components'
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
      url: siteUrl,
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

  return (
    <>
      <PostJsonLd
        post={post}
        canonicalUrl={canonicalUrl}
        structuredDataType={structuredDataType}
      />
      <div className="relative min-h-screen overflow-hidden bg-(--color-bg)">
        <main className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-4xl space-y-8">
            <Link
              to={listRouteTo}
              search={{ tag: undefined }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-fmea-brand-blue transition-colors hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeft className="size-4" />
              {copy.backToListLabel}
            </Link>

            <article className="space-y-10">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/5 p-2 shadow-2xl backdrop-blur-xl md:rounded-3xl md:p-3 dark:border-slate-800/50 dark:bg-slate-900/40">
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-tr from-fmea-brand-red/10 via-transparent to-fmea-brand-blue/10 opacity-50" />
                <div className="relative z-10 flex h-auto w-full aspect-video flex-col overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-inner md:rounded-xl dark:border-slate-800 dark:bg-slate-900">
                  <BlogImage {...post.coverImage} />
                </div>
              </div>

              <header className="space-y-4 text-center">
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-balance text-slate-900 md:text-5xl lg:text-6xl dark:text-white">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-4 border-t border-slate-200/60 pt-4 dark:border-slate-800/60">
                  <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    {copy.publishedLabel}
                    <time
                      dateTime={post.publishedDate}
                      className="font-bold text-slate-900 dark:text-slate-100"
                    >
                      {post.publishedDate}
                    </time>
                  </span>
                  <div className="hidden h-4 w-px bg-slate-300 dark:bg-slate-700 sm:block"></div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-fmea-brand-blue/30 bg-fmea-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-fmea-brand-blue backdrop-blur-md dark:border-fmea-brand-blue/40 dark:text-blue-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </header>

              <div className="pt-2">
                <BlogContentRenderer content={post.content} />
              </div>

              <PostFaq faqItems={post.faqItems} locale={post.locale} />
            </article>
          </div>
        </main>
      </div>
    </>
  )
}
