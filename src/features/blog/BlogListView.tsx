import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Calendar, Check, ChevronDown, SearchX, Tag } from 'lucide-react'
import { cn } from '#/shared/utils'
import { resolveSupportedLanguage } from '#/features/i18n/config'
import { HeroCarousel, PostCard } from '#/features/blog/components'
import type { BlogPostSummary } from '#/features/blog/types/blog'
import { BackgroundSection } from '#/shared/ui/background-section'

type BlogListViewProps = {
  posts: BlogPostSummary[]
  /** URL-backed tag filters (serialized in the ?tag= value). */
  activeTags: string[]
  /** Called when the tag filter changes; pass { replace: true } to normalize
   * the URL without polluting history. */
  onTagsChange: (tags: string[], options?: { replace?: boolean }) => void
}

export function BlogListView({
  posts,
  activeTags,
  onTagsChange,
}: BlogListViewProps) {
  const { t, i18n } = useTranslation('resume')
  const activeLanguage = resolveSupportedLanguage(
    i18n.resolvedLanguage ?? i18n.language,
  )

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach((p) => p.tags.forEach((tag) => tagSet.add(tag)))
    return Array.from(tagSet).sort()
  }, [posts])

  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')
  const [isSortOpen, setIsSortOpen] = useState(false)
  const sortMenuRef = useRef<HTMLDivElement>(null)

  /** Remove duplicate, unknown, or stale tags from the URL. */
  const effectiveTags = useMemo(() => {
    return Array.from(new Set(activeTags)).filter((tag) =>
      allTags.includes(tag),
    )
  }, [activeTags, allTags])

  useEffect(() => {
    const isNormalized =
      activeTags.length === effectiveTags.length &&
      activeTags.every((tag, index) => tag === effectiveTags[index])

    if (!isNormalized) {
      // Normalize the URL: replace the current entry so back/forward and
      // refresh behave predictably and no navigation loop can occur.
      onTagsChange(effectiveTags, { replace: true })
    }
  }, [activeTags, effectiveTags, onTagsChange])

  useEffect(() => {
    if (!isSortOpen) return

    const onPointerDown = (event: PointerEvent) => {
      if (!sortMenuRef.current?.contains(event.target as Node)) {
        setIsSortOpen(false)
      }
    }
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsSortOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onEscape)
    }
  }, [isSortOpen])

  const filteredPosts = useMemo(() => {
    const result = effectiveTags.length
      ? posts.filter((post) =>
          effectiveTags.every((tag) => post.tags.includes(tag)),
        )
      : [...posts]
    result.sort((a, b) => {
      const diff =
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime()
      return sortOrder === 'desc' ? diff : -diff
    })
    return result
  }, [posts, effectiveTags, sortOrder])

  const latestPosts = useMemo(() => {
    return [...posts]
      .sort(
        (a, b) =>
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime(),
      )
      .slice(0, 3)
  }, [posts])

  function handleTagClick(tag: string) {
    const nextTags = effectiveTags.includes(tag)
      ? effectiveTags.filter((selectedTag) => selectedTag !== tag)
      : [...effectiveTags, tag]
    onTagsChange(nextTags)
  }

  return (
    <BackgroundSection className="bg-background flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-2xl">
          <h1 className="font-heading text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            {t('blogTitle')}
          </h1>
          <p className="text-muted-foreground mt-2 text-base leading-7">
            {t('blogSubtitle')}
          </p>
        </header>

        {effectiveTags.length === 0 && latestPosts.length > 0 ? (
          <HeroCarousel posts={latestPosts} activeLanguage={activeLanguage} />
        ) : null}

        <section
          aria-label={t('blogFilterByTag')}
          className="border-border bg-card mt-8 rounded-xl border p-4 sm:p-5"
        >
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            {allTags.length > 0 && (
              <div className="min-w-0 flex-1">
                <div className="text-foreground flex items-center gap-2 text-sm font-medium">
                  <Tag
                    className="text-muted-foreground size-4"
                    aria-hidden="true"
                  />
                  {t('blogFilterByTag')}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onTagsChange([])}
                    aria-pressed={effectiveTags.length === 0}
                    className={cn(
                      'border-border focus-visible:ring-ring min-h-11 rounded-lg border px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                      effectiveTags.length === 0
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'bg-background text-foreground hover:border-primary hover:text-primary',
                    )}
                  >
                    {t('blogAllPosts')}
                  </button>
                  {allTags.map((tag) => {
                    const isActive = effectiveTags.includes(tag)
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagClick(tag)}
                        aria-pressed={isActive}
                        className={cn(
                          'border-border focus-visible:ring-ring min-h-11 rounded-lg border px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                          isActive
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'bg-background text-foreground hover:border-primary hover:text-primary',
                        )}
                      >
                        {tag}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="border-border mt-5 border-t pt-5 lg:mt-0 lg:ml-6 lg:w-64 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
              <label
                htmlFor="blog-sort-order"
                className="text-foreground mb-3 flex items-center gap-2 text-sm font-medium"
              >
                <Calendar
                  className="text-muted-foreground size-4"
                  aria-hidden="true"
                />
                {t('blogSortLabel')}
              </label>
              <div ref={sortMenuRef} className="relative">
                <button
                  id="blog-sort-order"
                  type="button"
                  onClick={() => setIsSortOpen((open) => !open)}
                  aria-haspopup="menu"
                  aria-expanded={isSortOpen}
                  className="border-border bg-background text-foreground hover:border-primary hover:text-primary focus-visible:ring-ring flex h-11 w-full items-center justify-between gap-2 rounded-lg border px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <span>
                    {sortOrder === 'desc'
                      ? t('blogNewest')
                      : t('blogOldest')}
                  </span>
                  <ChevronDown
                    className={cn(
                      'size-3 shrink-0 transition-transform duration-200',
                      isSortOpen && 'rotate-180',
                    )}
                    aria-hidden="true"
                  />
                </button>

                {isSortOpen ? (
                  <div
                    role="menu"
                    className="border-border bg-popover absolute top-full right-0 z-50 mt-2 w-full min-w-40 overflow-hidden rounded-lg border p-1 text-popover-foreground shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                  >
                    {(['desc', 'asc'] as const).map((order) => {
                      const isActive = sortOrder === order
                      return (
                        <button
                          key={order}
                          type="button"
                          role="menuitemradio"
                          aria-checked={isActive}
                          onClick={() => {
                            setSortOrder(order)
                            setIsSortOpen(false)
                          }}
                          className="hover:bg-muted flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors"
                        >
                          <span className="whitespace-nowrap">
                            {order === 'desc'
                              ? t('blogNewest')
                              : t('blogOldest')}
                          </span>
                          {isActive ? (
                            <Check
                              className="text-muted-foreground ml-auto size-4 shrink-0"
                              aria-hidden="true"
                            />
                          ) : null}
                        </button>
                      )
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {filteredPosts.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                locale={activeLanguage}
                className="bg-card border-border shadow-none backdrop-blur-none duration-150 group-hover:translate-y-0 group-hover:shadow-none group-hover:[&_picture_img]:scale-100 group-hover:[&_svg]:translate-x-0 group-hover:[&_svg]:translate-y-0 [&_picture_img]:transition-none"
              />
            ))}
          </div>
        ) : (
          <div className="border-border mt-8 flex flex-col items-start gap-3 border-b pb-8">
            <SearchX
              className="text-muted-foreground size-6"
              aria-hidden="true"
            />
            <div>
              <h2 className="font-heading text-foreground text-lg font-semibold">
                {t('blogEmptyTitle')}
              </h2>
              <p className="text-muted-foreground mt-1 max-w-md text-sm leading-6">
                {effectiveTags.length > 1
                  ? t('blogEmptyTagsDescription')
                  : effectiveTags.length === 1
                    ? t('blogEmptyDescription', { tag: effectiveTags[0] })
                    : t('blogEmptyNoPosts')}
              </p>
            </div>
            {effectiveTags.length > 0 && (
              <button
                type="button"
                onClick={() => onTagsChange([])}
                className="border-border bg-background text-foreground hover:border-primary hover:text-primary focus-visible:ring-ring min-h-10 rounded-md border px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {t('blogClearFilter')}
              </button>
            )}
          </div>
        )}
      </div>
    </BackgroundSection>
  )
}
