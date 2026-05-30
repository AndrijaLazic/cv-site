import { useEffect, useMemo, useRef, useState } from 'react'
import { HeroCarousel, PostCard } from '#/features/blog/components'
import type { BlogPostSummary } from '#/features/blog/types/blog'
import type { PostDetailRouteTo } from '#/features/blog/types/routes'
import type { SupportedLanguage } from '#/app/i18n/languages'
import { BackgroundSection } from '#/shared/ui/background-section'
import { cn } from '#/shared/utils'

type PostIndexPageCopy = {
  allPostsLabel: string
  filterByTagAriaLabel: string
  heroAriaLabel: string
  newestLabel: string
  noPostsForTagLabel: string
  oldestLabel: string
  sortLabel: string
  subtitle: string
  title: string
}

type PostIndexPageProps = {
  activeLanguage: SupportedLanguage
  activeTag?: string
  copy: PostIndexPageCopy
  initialPage?: number
  onClearTag: () => void
  onTagClick: (tag: string) => void
  postDetailRouteTo: PostDetailRouteTo
  posts: BlogPostSummary[]
}

const POSTS_PER_PAGE = 6

export function PostIndexPage({
  activeLanguage,
  activeTag,
  copy,
  initialPage = 1,
  onClearTag,
  onTagClick,
  postDetailRouteTo,
  posts,
}: PostIndexPageProps) {
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')
  const [visiblePageCount, setVisiblePageCount] = useState(1)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const topPosts = useMemo(() => {
    return [...posts]
      .sort(
        (a, b) =>
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime(),
      )
      .slice(0, 3)
  }, [posts])

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)))
    return Array.from(tagSet).sort()
  }, [posts])

  const filteredPosts = useMemo(() => {
    const result = activeTag
      ? posts.filter((post) => post.tags.includes(activeTag))
      : [...posts]

    result.sort((a, b) => {
      const diff =
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime()
      return sortOrder === 'desc' ? diff : -diff
    })

    return result
  }, [posts, activeTag, sortOrder])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
  )
  const currentPage = Math.min(Math.max(1, initialPage), totalPages)
  const pageStart = (currentPage - 1) * POSTS_PER_PAGE
  const visiblePosts = filteredPosts.slice(
    pageStart,
    pageStart + visiblePageCount * POSTS_PER_PAGE,
  )
  const hasMorePosts = pageStart + visiblePosts.length < filteredPosts.length

  useEffect(() => {
    setVisiblePageCount(1)
  }, [activeTag, currentPage, sortOrder])

  useEffect(() => {
    const loadMoreElement = loadMoreRef.current
    if (!loadMoreElement || !hasMorePosts) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        setVisiblePageCount((count) => count + 1)
      },
      { rootMargin: '320px 0px' },
    )

    observer.observe(loadMoreElement)
    return () => observer.disconnect()
  }, [hasMorePosts, visiblePosts.length])

  return (
    <BackgroundSection
      variant="features-gradient"
      className="relative min-h-screen"
    >
      <div className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 border-b border-slate-200/60 pb-8 text-center dark:border-slate-800/60">
            <h1 className="text-4xl font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
              {copy.title}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-balance text-slate-600 sm:text-xl dark:text-slate-400">
              {copy.subtitle}
            </p>
          </div>

          {topPosts.length > 0 && (
            <div className="relative left-1/2 w-screen -translate-x-1/2 sm:left-auto sm:w-auto sm:translate-x-0">
              <HeroCarousel
                posts={topPosts}
                activeLanguage={activeLanguage}
                ariaLabel={copy.heroAriaLabel}
                postRouteTo={postDetailRouteTo}
              />
            </div>
          )}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {allTags.length > 0 && (
              <nav aria-label={copy.filterByTagAriaLabel} className="flex-1">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={onClearTag}
                    className={cn(
                      'rounded-full border px-3 py-1 text-xs font-medium transition-colors sm:text-sm',
                      !activeTag
                        ? 'border-fmea-brand-blue bg-fmea-brand-blue text-white dark:border-blue-500 dark:bg-blue-500'
                        : 'border-slate-300 bg-white/70 text-slate-700 hover:border-blue-500 hover:text-blue-700 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-300',
                    )}
                  >
                    {copy.allPostsLabel}
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        if (activeTag === tag) {
                          onClearTag()
                          return
                        }

                        onTagClick(tag)
                      }}
                      className={cn(
                        'rounded-full border px-3 py-1 text-xs font-medium transition-colors sm:text-sm',
                        activeTag === tag
                          ? 'border-fmea-brand-blue bg-fmea-brand-blue text-white dark:border-blue-500 dark:bg-blue-500'
                          : 'border-slate-300 bg-white/70 text-slate-700 hover:border-blue-500 hover:text-blue-700 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-300',
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </nav>
            )}

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {copy.sortLabel}
              </span>
              <div className="flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => setSortOrder('desc')}
                  className={cn(
                    'rounded-l-md border border-slate-300 px-3 py-1 text-xs font-medium transition-colors sm:text-sm',
                    sortOrder === 'desc'
                      ? 'border-fmea-brand-blue bg-fmea-brand-blue text-white dark:border-blue-500 dark:bg-blue-500'
                      : 'bg-white/70 text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-700/50',
                  )}
                >
                  {copy.newestLabel}
                </button>
                <button
                  type="button"
                  onClick={() => setSortOrder('asc')}
                  className={cn(
                    'rounded-r-md border border-l-0 border-slate-300 px-3 py-1 text-xs font-medium transition-colors sm:text-sm',
                    sortOrder === 'asc'
                      ? 'border-fmea-brand-blue bg-fmea-brand-blue text-white dark:border-blue-500 dark:bg-blue-500'
                      : 'bg-white/70 text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-700/50',
                  )}
                >
                  {copy.oldestLabel}
                </button>
              </div>
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visiblePosts.map((post, index) => (
                  <article key={`${post.slug}-${index}`}>
                    <PostCard post={post} postRouteTo={postDetailRouteTo} />
                  </article>
                ))}
              </div>

              <div ref={loadMoreRef} className="h-1" aria-hidden="true" />
            </>
          ) : (
            <p className="py-12 text-center text-slate-500 dark:text-slate-400">
              {copy.noPostsForTagLabel}
            </p>
          )}
        </div>
      </div>
    </BackgroundSection>
  )
}
