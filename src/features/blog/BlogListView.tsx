import { useTranslation } from 'react-i18next'
import { useMemo, useState } from 'react'
import { cn } from '#/shared/utils'
import { resolveSupportedLanguage } from '#/features/i18n/config'
import { HeroCarousel, PostCard } from '#/features/blog/components'
import type { BlogPostSummary } from '#/features/blog/types/blog'
import { BackgroundSection } from '#/shared/ui/background-section'
import { Reveal } from '#/shared/ui/reveal'

type BlogListViewProps = {
  posts: BlogPostSummary[]
}

export function BlogListView({ posts }: BlogListViewProps) {
  const { t, i18n } = useTranslation('resume')
  const activeLanguage = resolveSupportedLanguage(
    i18n.resolvedLanguage ?? i18n.language,
  )

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
    posts.forEach((p) => p.tags.forEach((tag) => tagSet.add(tag)))
    return Array.from(tagSet).sort()
  }, [posts])

  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')

  const [activeTag, setActiveTag] = useState<string | undefined>()

  const filteredPosts = useMemo(() => {
    const result = activeTag
      ? posts.filter((p) => p.tags.includes(activeTag))
      : [...posts]
    result.sort((a, b) => {
      const diff =
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime()
      return sortOrder === 'desc' ? diff : -diff
    })
    return result
  }, [posts, activeTag, sortOrder])

  function handleTagClick(tag: string) {
    if (tag === activeTag) {
      setActiveTag(undefined)
    } else {
      setActiveTag(tag)
    }
  }

  return (
    <BackgroundSection
      variant="radial-simple"
      className="flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-14"
    >
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">
            {t('blogTitle')}
          </h1>
          <p className="text-base text-slate-600 sm:text-lg dark:text-slate-400">
            {t('blogSubtitle')}
          </p>
        </div>

        {topPosts.length > 0 && !activeTag && (
          <HeroCarousel
            posts={topPosts}
            activeLanguage={activeLanguage}
            ariaLabel={t('blogLatestPost')}
          />
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {allTags.length > 0 && (
            <nav aria-label={t('blogFilterByTag')} className="flex-1">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTag(undefined)}
                  className={cn(
                    'rounded-full border px-3 py-1 text-xs font-medium transition-colors sm:text-sm',
                    !activeTag
                      ? 'border-cyan-600 bg-cyan-600 text-white dark:border-cyan-500 dark:bg-cyan-500'
                      : 'border-slate-300 bg-white/70 text-slate-700 hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300',
                  )}
                >
                  {t('blogAllPosts')}
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className={cn(
                      'rounded-full border px-3 py-1 text-xs font-medium transition-colors sm:text-sm',
                      activeTag === tag
                        ? 'border-cyan-600 bg-cyan-600 text-white dark:border-cyan-500 dark:bg-cyan-500'
                        : 'border-slate-300 bg-white/70 text-slate-700 hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300',
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
              Sort:
            </span>
            <div className="flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setSortOrder('desc')}
                className={cn(
                  'rounded-l-md border border-slate-300 px-3 py-1 text-xs font-medium transition-colors sm:text-sm',
                  sortOrder === 'desc'
                    ? 'border-cyan-600 bg-cyan-600 text-white dark:border-cyan-500 dark:bg-cyan-500'
                    : 'bg-white/70 text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-700/50',
                )}
              >
                {t('blogNewest', 'Newest')}
              </button>
              <button
                type="button"
                onClick={() => setSortOrder('asc')}
                className={cn(
                  'rounded-r-md border border-l-0 border-slate-300 px-3 py-1 text-xs font-medium transition-colors sm:text-sm',
                  sortOrder === 'asc'
                    ? 'border-cyan-600 bg-cyan-600 text-white dark:border-cyan-500 dark:bg-cyan-500'
                    : 'bg-white/70 text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-700/50',
                )}
              >
                {t('blogOldest', 'Oldest')}
              </button>
            </div>
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => {
              const isFirstRow = index < 3
              return (
                <Reveal
                  key={`${post.slug}-${index}`}
                  disabled={isFirstRow}
                  duration="duration-500"
                  className="h-full"
                >
                  <PostCard post={post} locale={activeLanguage} />
                </Reveal>
              )
            })}
          </div>
        ) : (
          <p className="py-12 text-center text-slate-500 dark:text-slate-400">
            {t('blogFilterByTag')}: <strong>{activeTag}</strong> — 0 posts
          </p>
        )}
      </div>
    </BackgroundSection>
  )
}
