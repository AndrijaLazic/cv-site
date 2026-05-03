import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useMemo, useState } from 'react'
import { cn } from '#/shared/utils'
import { getBlogPostSummaries } from '#/features/blog/api'
import {
  resolveSupportedLanguage,
  supportedLanguages,
} from '#/features/i18n/config'
import { HeroCarousel, PostCard } from '#/features/blog/components'
import type { SupportedLanguage } from '#/features/i18n/languages'
import type { BlogPostSummary } from '#/features/blog/types/blog'
import { publicConfig } from '#/shared/config/public-env'
import { PageBackground } from '#/shared/ui/page-background'

const allPostsByLanguage = Object.fromEntries(
  supportedLanguages.map((lang) => [lang, getBlogPostSummaries(lang)]),
) as Record<SupportedLanguage, BlogPostSummary[]>

export const Route = createFileRoute('/blog/')({
  component: BlogList,
  validateSearch: (search: Record<string, unknown>) => ({
    tag: typeof search.tag === 'string' ? search.tag : undefined,
  }),
  head: () => {
    const canonicalUrl = `${publicConfig.siteUrl}/blog`
    return {
      meta: [
        { title: 'Blog | Andrija Lazic' },
        {
          name: 'description',
          content:
            'Technical blog by Andrija Lazic — experiments, findings, and insights from backend engineering, AI, and DevOps.',
        },
        { property: 'og:title', content: 'Blog | Andrija Lazic' },
        {
          property: 'og:description',
          content:
            'Technical blog by Andrija Lazic — experiments, findings, and insights from backend engineering, AI, and DevOps.',
        },
        { property: 'og:url', content: canonicalUrl },
        { property: 'og:type', content: 'website' },
      ],
      links: [{ rel: 'canonical', href: canonicalUrl }],
    }
  },
})

function useScrollReveal(deps: unknown[]) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const articles = container.querySelectorAll<HTMLElement>(
      '[data-reveal="true"]',
    )
    articles.forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-4')
      el.classList.remove('opacity-100', 'translate-y-0')
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-4')
            entry.target.classList.add('opacity-100', 'translate-y-0')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.08 },
    )

    articles.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, deps)

  return containerRef
}

function BlogList() {
  const { t, i18n } = useTranslation('resume')
  const activeLanguage = resolveSupportedLanguage(
    i18n.resolvedLanguage ?? i18n.language,
  )
  const { tag: activeTag } = Route.useSearch()
  const navigate = useNavigate({ from: '/blog/' })
  const posts = allPostsByLanguage[activeLanguage]

  // Hero carousel - Top 3 newest posts (no tag filter)
  const topPosts = useMemo(() => {
    return [...posts]
      .sort(
        (a, b) =>
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime(),
      )
      .slice(0, 3)
  }, [posts])

  // Tags & Sorting
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach((p) => p.tags.forEach((tag) => tagSet.add(tag)))
    return Array.from(tagSet).sort()
  }, [posts])

  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')

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

  const gridRef = useScrollReveal([activeTag, activeLanguage, sortOrder])

  function handleTagClick(tag: string) {
    if (tag === activeTag) {
      void navigate({ search: {} })
    } else {
      void navigate({ search: { tag } })
    }
  }

  return (
    <PageBackground className="flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Page header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">
            {t('blogTitle')}
          </h1>
          <p className="text-base text-slate-600 sm:text-lg dark:text-slate-400">
            {t('blogSubtitle')}
          </p>
        </div>

        {/* Top - Hero Carousel */}
        {topPosts.length > 0 && !activeTag && (
          <HeroCarousel
            posts={topPosts}
            activeLanguage={activeLanguage}
            ariaLabel={t('blogLatestPost')}
          />
        )}

        {/* Filter & Sort Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {allTags.length > 0 && (
            <nav aria-label={t('blogFilterByTag')} className="flex-1">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void navigate({ search: {} })}
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

        {/* Post grid with scroll-reveal */}
        {filteredPosts.length > 0 ? (
          <div
            ref={gridRef}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredPosts.map((post, index) => {
              const isFirstRow = index < 3
              return (
                <article
                  key={`${post.slug}-${index}`}
                  data-reveal={isFirstRow ? undefined : 'true'}
                  className={cn(
                    'transition-all duration-500 ease-out',
                    isFirstRow ? 'opacity-100 translate-y-0' : '',
                  )}
                >
                  <PostCard post={post} />
                </article>
              )
            })}
          </div>
        ) : (
          <p className="py-12 text-center text-slate-500 dark:text-slate-400">
            {t('blogFilterByTag')}: <strong>{activeTag}</strong> — 0 posts
          </p>
        )}
      </div>
    </PageBackground>
  )
}
