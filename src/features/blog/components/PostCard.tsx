import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import type { SupportedLanguage } from '#/features/i18n/languages'
import type { BlogPostSummary } from '#/features/blog/types/blog'
import { cn } from '#/shared/utils'
import { Badge } from '#/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '#/shared/ui/card'
import { POST_CARD_IMAGE_SIZES } from '../contentImages'
import { ResponsiveImage } from './ResponsiveImage'

const FALLBACK_IMAGE_BACKGROUND = 'transparent'

type PostCardProps = {
  post: BlogPostSummary
  featured?: boolean
  className?: string
  locale?: SupportedLanguage
}

function formatPublishedDate(date: string, locale?: SupportedLanguage) {
  return new Date(date).toLocaleDateString(
    locale === 'sr' ? 'sr-Latn-RS' : 'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  )
}

export function PostCard({
  post,
  featured = false,
  className,
  locale,
}: PostCardProps) {
  const { t } = useTranslation('resume')
  const routeLocale = locale ?? post.locale

  return (
    <Link
      to="/{-$locale}/blog/$slug"
      params={{
        locale: routeLocale === 'en' ? undefined : routeLocale,
        slug: post.slug,
      }}
      className="group block h-full focus-visible:outline-none"
    >
      <Card
        className={cn(
          'border-border/50 bg-card/60 has-[:focus-visible]:ring-ring group-hover:border-primary/40 group-hover:shadow-primary/10 flex h-full min-h-104 flex-col gap-0 overflow-hidden border py-0 shadow-sm ring-0 backdrop-blur-xl transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background group-hover:-translate-y-1 group-hover:shadow-lg',
          featured && 'md:min-h-96 md:flex-row',
          className,
        )}
      >
        <div
          className={cn(
            'border-border/80 relative flex w-full shrink-0 items-center justify-center overflow-hidden border-b',
            featured
              ? 'aspect-[16/10] md:aspect-auto md:h-full md:w-1/2 md:border-r md:border-b-0'
              : post.coverImage.aspectRatio
                ? ''
                : 'aspect-[16/10]',
          )}
          style={{
            backgroundColor:
              post.coverImage.bgColor ?? FALLBACK_IMAGE_BACKGROUND,
            ...(post.coverImage.padding
              ? { padding: post.coverImage.padding }
              : {}),
            ...(post.coverImage.rounded ? { borderRadius: '8px' } : {}),
            ...(post.coverImage.aspectRatio
              ? { aspectRatio: post.coverImage.aspectRatio }
              : {}),
          }}
        >
          <ResponsiveImage
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            className="block h-full w-full transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
            loading={featured ? 'eager' : 'lazy'}
            pictureClassName="block h-full w-full"
            sizes={POST_CARD_IMAGE_SIZES}
            style={{
              objectFit: post.coverImage.fit ?? 'contain',
              objectPosition: post.coverImage.position ?? 'center',
            }}
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <CardHeader className="space-y-3 px-4 pt-5 pb-2 sm:px-5 lg:px-6">
            <div className="flex items-center gap-2">
              <time
                dateTime={post.publishedDate}
                className="font-mono text-muted-foreground text-[0.68rem] font-medium tracking-widest uppercase sm:text-xs"
              >
                {formatPublishedDate(post.publishedDate, routeLocale)}
              </time>
            </div>

            <CardTitle
              className={cn(
                'font-heading text-foreground group-hover:text-primary line-clamp-2 leading-tight font-bold text-balance transition-colors',
                featured ? 'text-xl sm:text-3xl' : 'text-lg sm:text-xl',
              )}
            >
              {post.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex min-h-0 flex-1 flex-col gap-4 px-4 pb-5 sm:px-5 lg:px-6">
            <p
              className={cn(
                'text-muted-foreground text-sm leading-relaxed sm:text-base',
                featured ? 'line-clamp-4' : 'line-clamp-3',
              )}
            >
              {post.summary}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge
                  key={`${post.slug}-${tag}`}
                  variant="outline"
                  className="border-border/50 bg-muted/40 text-muted-foreground group-hover:border-primary/30 text-xs font-medium"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="border-border/50 mt-auto flex items-center gap-2 border-t pt-4">
              <span className="text-primary inline-flex items-center gap-1 text-sm font-semibold">
                {t('blogReadMore')}
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                  aria-hidden="true"
                />
              </span>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}
