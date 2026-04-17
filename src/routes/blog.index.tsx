import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useRef, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '#/shared/utils'
import { getAllPostMetas } from '#/features/blog/registry'
import {
  resolveSupportedLanguage,
  supportedLanguages,
} from '#/features/i18n/config'
import { PostCard } from '#/features/blog/components'
import type { SupportedLanguage } from '#/features/i18n/languages'
import type { PostMeta } from '#/features/blog/types/blog'
import { publicConfig } from '#/shared/config/public-env'

const allPostsByLanguage = Object.fromEntries(
  supportedLanguages.map((lang) => [lang, getAllPostMetas(lang)]),
) as Record<SupportedLanguage, PostMeta[]>

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

  const [carouselIndex, setCarouselIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const handleNext = useCallback(() => {
    setCarouselIndex((prev) => (prev + 1) % topPosts.length)
  }, [topPosts.length])

  const handlePrev = useCallback(() => {
    setCarouselIndex((prev) => (prev - 1 + topPosts.length) % topPosts.length)
  }, [topPosts.length])

  useEffect(() => {
    if (topPosts.length <= 1 || isHovered) return
    const timer = setInterval(handleNext, 5000)
    return () => clearInterval(timer)
  }, [topPosts.length, isHovered, handleNext])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX
    if (diff > 50) handleNext()
    else if (diff < -50) handlePrev()
    touchStartX.current = null
  }

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
    <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
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
          <section
            aria-label={t('blogLatestPost')}
            className="group relative w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
            >
              {topPosts.map((post) => (
                <div key={post.slug} className="w-full shrink-0">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="flex h-[clamp(26rem,62svh,44rem)] flex-col"
                  >
                    {/* Image fraction */}
                    <div
                      className="relative h-[60%] w-full overflow-hidden"
                      style={{
                        backgroundColor: post.coverImage?.bgColor ?? 'transparent',
                      }}
                    >
                      {post.coverImage ? (
                        <img
                          src={post.coverImage.src}
                          alt={post.coverImage.alt}
                          className="h-full w-full"
                          loading="lazy"
                          style={{
                            objectFit: post.coverImage.fit ?? 'cover',
                            objectPosition: post.coverImage.position ?? 'center',
                            display: 'block',
                          }}
                        />
                      ) : (
                        <div className="h-full w-full bg-slate-200 dark:bg-slate-700" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                      {/* Tags over image */}
                      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 text-white">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-cyan-600/80 px-2 py-0.5 text-xs font-medium backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Content fraction */}
                    <div className="flex h-[40%] flex-col justify-center bg-white p-4 sm:p-6 dark:bg-slate-800">
                      <time className="mb-2 text-xs text-slate-500 dark:text-slate-400">
                        {new Date(post.publishedDate).toLocaleDateString(
                          activeLanguage === 'sr' ? 'sr-RS' : 'en-US',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          },
                        )}
                      </time>
                      <h2 className="line-clamp-1 text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-100">
                        {post.title}
                      </h2>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                        {post.summary}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            {topPosts.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    handlePrev()
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-0 transition-opacity hover:bg-black/50 group-hover:opacity-100"
                  aria-label="Previous post"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNext()
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-0 transition-opacity hover:bg-black/50 group-hover:opacity-100"
                  aria-label="Next post"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                {/* Dots */}
                <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 sm:bottom-4">
                  {topPosts.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        setCarouselIndex(i)
                      }}
                      className={cn(
                        'h-2 w-2 rounded-full transition-colors',
                        i === carouselIndex
                          ? 'bg-cyan-500'
                          : 'bg-slate-300/50 hover:bg-slate-400',
                      )}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </section>
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
    </div>
  )
}
