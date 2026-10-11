import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import type { SupportedLanguage } from '#/features/i18n/languages'
import type { BlogPostSummary } from '../types/blog'
import { ResponsiveImage } from './ResponsiveImage'

export function PostRow({
  post,
  locale,
}: {
  post: BlogPostSummary
  locale: SupportedLanguage
}) {
  const { t } = useTranslation('resume')
  return (
    <Link
      to="/{-$locale}/blog/$slug"
      params={{ locale: locale === 'en' ? undefined : locale, slug: post.slug }}
      className="group border-border focus-visible:ring-ring grid gap-5 border-b py-8 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none lg:grid-cols-[130px_minmax(0,1fr)_300px] lg:gap-8"
    >
      <div
        className="border-border bg-card aspect-[5/3] overflow-hidden rounded-xl border lg:order-3 lg:w-full lg:self-start"
        style={{
          backgroundColor: post.coverImage.bgColor,
          padding: post.coverImage.padding,
        }}
      >
        <ResponsiveImage
          src={post.coverImage.src}
          alt={post.coverImage.alt}
          className="h-full w-full"
          pictureClassName="block h-full w-full"
          sizes="(min-width: 1024px) 300px, calc(100vw - 32px)"
          style={{
            objectFit: post.coverImage.fit ?? 'contain',
            objectPosition: post.coverImage.position ?? 'center',
          }}
        />
      </div>
      <div className="text-muted-foreground flex flex-wrap gap-x-3 font-mono text-xs leading-6 tracking-wide uppercase lg:order-1 lg:block lg:pt-1">
        <time dateTime={post.publishedDate} className="block">
          {new Date(post.publishedDate).toLocaleDateString(
            locale === 'sr' ? 'sr-Latn-RS' : 'en-US',
            {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              timeZone: 'UTC',
            },
          )}
        </time>
        {post.tags[0] && (
          <span className="text-primary block">{post.tags[0]}</span>
        )}
      </div>
      <div className="min-w-0 lg:order-2">
        <h3 className="font-heading text-foreground group-hover:text-primary text-2xl leading-tight font-semibold tracking-tight transition-colors lg:text-[28px]">
          {post.title}
        </h3>
        <p className="text-muted-foreground mt-3 text-base leading-7">
          {post.summary}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-secondary text-muted-foreground rounded-md px-2.5 py-1 font-mono text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-primary mt-4 inline-flex min-h-6 items-center gap-1 text-sm font-semibold group-hover:underline">
          {t('blogReadMore')} <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
}
