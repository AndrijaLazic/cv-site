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
          <h1 className="text-foreground text-3xl font-bold sm:text-4xl">
            {t('blogTitle')}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
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
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card/70 text-foreground hover:border-primary hover:text-primary',
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
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-card/70 text-foreground hover:border-primary hover:text-primary',
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </nav>
          )}

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-muted-foreground text-sm font-medium">
              Sort:
            </span>
            <div className="flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setSortOrder('desc')}
                className={cn(
                  'border-border rounded-l-md border px-3 py-1 text-xs font-medium transition-colors sm:text-sm',
                  sortOrder === 'desc'
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'bg-card/70 text-foreground hover:bg-muted',
                )}
              >
                {t('blogNewest', 'Newest')}
              </button>
              <button
                type="button"
                onClick={() => setSortOrder('asc')}
                className={cn(
                  'border-border rounded-r-md border border-l-0 px-3 py-1 text-xs font-medium transition-colors sm:text-sm',
                  sortOrder === 'asc'
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'bg-card/70 text-foreground hover:bg-muted',
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
          <p className="text-muted-foreground py-12 text-center">
            {t('blogFilterByTag')}: <strong>{activeTag}</strong> — 0 posts
          </p>
        )}
      </div>
    </BackgroundSection>
  )
}
