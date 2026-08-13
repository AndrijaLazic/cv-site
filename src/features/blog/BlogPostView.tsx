import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  Copy,
  Mail,
  Share2,
  SquareTerminal,
} from 'lucide-react'
import { BlogContentRenderer } from '#/features/blog/BlogContentRenderer'
import { BlogImage, BlogTableOfContents } from '#/features/blog/components'
import type {
  BlogPostDetail,
  BlogPostSummary,
} from '#/features/blog/types/blog'
import { publicConfig } from '#/shared/config/public-env'
import { LinkedInIcon } from '#/shared/ui/brand-icons'
import { cn } from '#/shared/utils'

type BlogPostViewProps = {
  post: BlogPostDetail
  backTo: string
}

export function BlogPostJsonLd({ post }: { post: BlogPostSummary }) {
  const coverImageSrc = post.coverImage.src
  const coverImageUrl = coverImageSrc
    ? coverImageSrc.startsWith('http')
      ? coverImageSrc
      : `${publicConfig.siteUrl}${coverImageSrc}`
    : undefined

  const postUrl = `${publicConfig.siteUrl}${post.locale === 'en' ? '' : '/sr'}/blog/${post.slug}`

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
    url: postUrl,
    inLanguage: post.locale,
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

export function BlogPostView({ post, backTo }: BlogPostViewProps) {
  const { t } = useTranslation('resume')

  const postUrl = `${publicConfig.siteUrl}${post.locale === 'en' ? '' : '/sr'}/blog/${post.slug}`

  const showTableOfContents = post.showTableOfContents !== false

  return (
    <>
      <BlogPostJsonLd post={post} />
      <div className="article-page flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <Link
            to={backTo}
            className="inline-flex min-h-11 items-center gap-2 rounded-md px-1 font-mono text-xs font-semibold tracking-[0.08em] text-(--article-muted) transition-colors hover:text-(--article-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--article-focus)"
          >
            <ArrowLeft className="size-4" />
            {t('blogBackToList')}
          </Link>

          <article className="mt-3">
            <header className="article-hero relative overflow-hidden border border-(--article-line) bg-(--article-surface) px-5 py-7 shadow-sm sm:px-8 sm:py-9 lg:px-12 lg:py-12">
              <div
                className="article-hero-grid pointer-events-none absolute inset-0"
                aria-hidden="true"
              />
              <div className="relative max-w-4xl">
                <div className="mb-5 flex items-center gap-2 font-mono text-[0.68rem] font-semibold tracking-[0.16em] text-(--article-muted) uppercase">
                  <SquareTerminal
                    className="size-3.5 text-(--article-accent)"
                    aria-hidden="true"
                  />
                  <span>{t('blogKicker')}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <TagLink key={tag} tag={tag} locale={post.locale} />
                  ))}
                </div>
                <h1 className="mt-6 text-4xl font-bold leading-[1.03] tracking-[-0.045em] text-balance text-(--article-ink) sm:text-5xl lg:text-6xl">
                  {post.title}
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-(--article-muted) sm:text-xl sm:leading-9">
                  {post.summary}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs leading-5 text-(--article-muted)">
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
                <ShareButtons
                  post={post}
                  postUrl={postUrl}
                  copy={{
                    heading: t('blogShareHeading', 'Share this post'),
                    nativeLabel: t('blogShareNative', 'Share'),
                    linkedInLabel: t('blogShareLinkedIn', 'Share on LinkedIn'),
                    xLabel: t('blogShareX', 'Share on X'),
                    facebookLabel: t('blogShareFacebook', 'Share on Facebook'),
                    emailLabel: t('blogShareEmail', 'Share by email'),
                    copyLabel: t('blogShareCopy', 'Copy link'),
                    copiedLabel: t('blogShareCopied', 'Copied'),
                  }}
                />
              </div>
            </header>

            <div className="mt-5 overflow-hidden border border-(--article-line) bg-(--article-media) shadow-sm">
              <BlogImage {...post.coverImage} priority />
            </div>

            <div
              className={
                showTableOfContents
                  ? 'mx-auto mt-9 grid max-w-5xl gap-9 lg:grid-cols-[minmax(0,660px)_minmax(220px,260px)] lg:items-start lg:justify-center'
                  : 'mx-auto mt-9 max-w-[660px]'
              }
            >
              <div className="min-w-0">
                {showTableOfContents ? (
                  <BlogTableOfContents
                    className="mb-9 lg:hidden"
                    compact
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

type ShareButtonsCopy = {
  heading: string
  nativeLabel: string
  linkedInLabel: string
  xLabel: string
  facebookLabel: string
  emailLabel: string
  copyLabel: string
  copiedLabel: string
}

function ShareButtons({
  post,
  postUrl,
  copy,
}: {
  post: BlogPostSummary
  postUrl: string
  copy: ShareButtonsCopy
}) {
  const [copied, setCopied] = useState(false)
  const encodedUrl = encodeURIComponent(postUrl)
  const encodedTitle = encodeURIComponent(post.title)
  const encodedSummary = encodeURIComponent(post.summary)
  const shareLinks = [
    {
      label: copy.linkedInLabel,
      shortLabel: 'in',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <LinkedInIcon className="size-4" aria-hidden="true" />,
    },
    {
      label: copy.xLabel,
      shortLabel: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: copy.facebookLabel,
      shortLabel: 'f',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: copy.emailLabel,
      shortLabel: null,
      href: `mailto:?subject=${encodedTitle}&body=${encodedSummary}%0A%0A${encodedUrl}`,
      icon: <Mail className="size-4" aria-hidden="true" />,
    },
  ]

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(postUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  async function sharePost() {
    if ('share' in navigator) {
      try {
        await navigator.share({
          title: post.title,
          text: post.summary,
          url: postUrl,
        })
        return
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }
      }
    }

    await copyLink()
  }

  return (
    <section className="flex flex-col gap-3 pt-5" aria-label={copy.heading}>
      <p className="text-sm font-semibold text-(--article-ink)">
        {copy.heading}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => {
            void sharePost()
          }}
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-(--article-primary) bg-(--article-primary) px-3 text-sm font-semibold text-(--article-primary-ink) shadow-sm transition-colors hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--article-focus)"
          aria-label={copy.nativeLabel}
          title={copy.nativeLabel}
        >
          <Share2 className="size-4" aria-hidden="true" />
          <span>{copy.nativeLabel}</span>
        </button>

        {shareLinks.map((link) => {
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-md border border-(--article-line) bg-(--article-surface-raised) text-sm font-bold text-(--article-ink) shadow-sm transition-colors hover:border-(--article-primary) hover:text-(--article-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--article-focus)"
              aria-label={link.label}
              title={link.label}
            >
              {link.icon ? (
                link.icon
              ) : (
                <span aria-hidden="true">{link.shortLabel}</span>
              )}
            </a>
          )
        })}

        <button
          type="button"
          onClick={() => {
            void copyLink()
          }}
          className={cn(
            'inline-flex min-h-11 items-center gap-2 rounded-md border px-3 text-sm font-semibold shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--article-focus)',
            copied
              ? 'border-(--article-accent) bg-(--article-accent-soft) text-(--article-accent-ink)'
              : 'border-(--article-line) bg-(--article-surface-raised) text-(--article-ink) hover:border-(--article-primary) hover:text-(--article-primary)',
          )}
          aria-label={copied ? copy.copiedLabel : copy.copyLabel}
          title={copied ? copy.copiedLabel : copy.copyLabel}
        >
          {copied ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <Copy className="size-4" aria-hidden="true" />
          )}
          <span>{copied ? copy.copiedLabel : copy.copyLabel}</span>
        </button>
      </div>
      <span className="sr-only" aria-live="polite">
        {copied ? copy.copiedLabel : ''}
      </span>
    </section>
  )
}

function AuthorLink({ post }: { post: BlogPostSummary }) {
  if (!post.authorUrl) {
    return (
      <span className="font-semibold text-(--article-ink)">{post.author}</span>
    )
  }

  return (
    <a
      href={post.authorUrl}
      target="_blank"
      rel="noreferrer"
      className="font-semibold text-(--article-ink) underline decoration-(--article-line) underline-offset-4 transition-colors hover:text-(--article-primary) hover:decoration-current focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--article-focus)"
    >
      {post.author}
    </a>
  )
}

function TagLink({ tag, locale }: { tag: string; locale: string }) {
  return (
    <Link
      to="/{-$locale}/blog"
      params={{ locale: locale === 'en' ? undefined : locale }}
      search={{ tag: [tag] }}
      className="text-sm font-medium text-(--article-muted) underline decoration-(--article-line) underline-offset-4 transition-colors hover:text-(--article-primary) hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--article-focus)"
    >
      {tag}
    </Link>
  )
}

function estimateReadingTime(post: BlogPostSummary) {
  const sectionCount = Math.max(post.tableOfContents.length, 1)
  const minutes = Math.max(2, Math.round(sectionCount * 0.7))
  return post.locale === 'sr' ? `${minutes} min čitanja` : `${minutes} min read`
}
