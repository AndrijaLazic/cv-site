import { Link } from '@tanstack/react-router'
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

export function PostCard({
  post,
  featured = false,
  className,
  locale,
}: PostCardProps) {
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
          'flex h-full min-h-104 flex-col gap-0 overflow-hidden border border-slate-200/50 bg-white/60 dark:bg-slate-900/40 py-0 shadow-sm ring-0 backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-fmea-brand-blue/30 group-hover:shadow-lg group-hover:shadow-fmea-brand-blue/10 dark:border-slate-800/50 dark:group-hover:border-fmea-brand-blue/40',
          featured && 'md:min-h-96 md:flex-row',
          className,
        )}
      >
        <div
          className={cn(
            'relative flex w-full shrink-0 items-center justify-center overflow-hidden border-b border-slate-200/80 dark:border-slate-700/80',
            featured
              ? 'h-64 sm:h-80 md:h-auto md:w-1/2 md:border-r md:border-b-0'
              : post.coverImage.aspectRatio
                ? ''
                : 'h-56 sm:h-75',
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
            className="block h-full w-full"
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
          <CardHeader className="space-y-3 px-4 pt-4 pb-2 sm:px-5 sm:pt-5 lg:px-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className="text-[0.68rem] font-semibold tracking-wide uppercase sm:text-[0.7rem]"
              >
                <time dateTime={post.publishedDate}>{post.publishedDate}</time>
              </Badge>
            </div>

            <CardTitle
              className={cn(
                'line-clamp-2 leading-tight font-extrabold text-slate-900 transition-colors group-hover:text-fmea-brand-blue dark:text-slate-100 dark:group-hover:text-blue-400 text-balance',
                featured ? 'text-xl sm:text-3xl' : 'text-lg sm:text-xl',
              )}
            >
              {post.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex min-h-0 flex-1 flex-col space-y-4 px-4 pb-4 sm:px-5 sm:pb-5 lg:px-6">
            <p
              className={cn(
                'text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300',
                featured ? 'line-clamp-4' : 'line-clamp-3',
              )}
            >
              {post.summary}
            </p>

            <div className="mt-auto flex flex-wrap gap-2 border-t border-slate-200/50 pt-4 dark:border-slate-800/50">
              {post.tags.map((tag) => (
                <Badge
                  key={`${post.slug}-${tag}`}
                  variant="outline"
                  className="border-slate-200 bg-slate-50/50 text-xs font-medium text-slate-600 dark:border-slate-700/50 dark:bg-slate-800/50 dark:text-slate-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}
