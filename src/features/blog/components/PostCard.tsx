import { Link } from '@tanstack/react-router'
import type { PostMeta } from '#/features/blog/types/blog'
import { cn } from '#/shared/utils'
import { Badge } from '#/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '#/shared/ui/card'

const FALLBACK_IMAGE_BACKGROUND = 'rgb(241 245 249)'

type PostCardProps = {
  post: PostMeta
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
          'flex h-full min-h-[26rem] flex-col gap-0 overflow-hidden border-slate-200/85 bg-linear-to-br from-white via-white to-slate-50/70 py-0 shadow-md ring-1 ring-slate-950/5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl group-hover:ring-cyan-500/25 dark:border-slate-700/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/90 dark:ring-white/10 dark:group-hover:ring-cyan-400/30',
          featured && 'md:min-h-[24rem] md:flex-row',
          className,
        )}
      >
        {post.coverImage ? (
          <div
            className={cn(
              'relative flex w-full shrink-0 items-center justify-center overflow-hidden border-b border-slate-200/80 dark:border-slate-700/80',
              featured
                ? 'h-64 sm:h-80 md:h-auto md:w-1/2 md:border-r md:border-b-0'
                : 'h-56 sm:h-75',
            )}
            style={{
              backgroundColor:
                post.coverImage.bgColor ?? FALLBACK_IMAGE_BACKGROUND,
            }}
          >
            <img
              src={post.coverImage.src}
              alt={post.coverImage.alt}
              className="block h-full w-auto max-w-none"
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
                'line-clamp-2 leading-tight font-semibold text-slate-900 transition-colors group-hover:text-cyan-700 dark:text-slate-100 dark:group-hover:text-cyan-300',
                featured ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl',
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

            <div className="mt-auto flex flex-wrap gap-2 border-t border-slate-200/80 pt-4 dark:border-slate-700/80">
              {post.tags.map((tag) => (
                <Badge
                  key={`${post.slug}-${tag}`}
                  variant="outline"
                  className="border-slate-300/70 bg-white/70 text-xs text-slate-700 dark:border-slate-600/70 dark:bg-slate-800/75 dark:text-slate-200"
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
