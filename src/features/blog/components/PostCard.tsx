import { Link } from '@tanstack/react-router'
import type { BlogPostSummary } from '#/features/blog/types/blog'
import { cn } from '#/shared/utils'
import { Badge } from '#/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '#/shared/ui/card'

const FALLBACK_IMAGE_BACKGROUND = 'var(--color-surface-soft)'

type PostCardProps = {
  post: BlogPostSummary
  featured?: boolean
  className?: string
}

export function PostCard({ post, featured = false, className }: PostCardProps) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group block h-full focus-visible:outline-none"
    >
      <Card
        className={cn(
          'flex h-full min-h-[26rem] flex-col gap-0 overflow-hidden border-(--color-border) bg-(--color-card) py-0 shadow-md ring-1 ring-(--color-border) transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-(--color-primary) group-hover:shadow-xl group-hover:ring-(--color-primary)',
          featured && 'md:min-h-[24rem] md:flex-row',
          className,
        )}
      >
        {post.coverImage ? (
          <div
            className={cn(
              'relative flex w-full shrink-0 items-center justify-center overflow-hidden border-b border-(--color-border)',
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
            <img
              src={post.coverImage.src}
              alt={post.coverImage.alt}
              className="block h-full w-full"
              loading={featured ? 'eager' : 'lazy'}
              style={{
                objectFit: post.coverImage.fit ?? 'contain',
                objectPosition: post.coverImage.position ?? 'center',
              }}
            />
          </div>
        ) : null}

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
                'line-clamp-2 leading-tight font-semibold text-(--color-text) transition-colors group-hover:text-(--color-primary)',
                featured ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl',
              )}
            >
              {post.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex min-h-0 flex-1 flex-col space-y-4 px-4 pb-4 sm:px-5 sm:pb-5 lg:px-6">
            <p
              className={cn(
                'text-sm leading-relaxed text-(--color-muted) sm:text-base',
                featured ? 'line-clamp-4' : 'line-clamp-3',
              )}
            >
              {post.summary}
            </p>

            <div className="mt-auto flex flex-wrap gap-2 border-t border-(--color-border) pt-4">
              {post.tags.map((tag) => (
                <Badge
                  key={`${post.slug}-${tag}`}
                  variant="outline"
                  className="border-(--color-border) bg-(--color-surface-soft) text-xs text-(--color-muted)"
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
