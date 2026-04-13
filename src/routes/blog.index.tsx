import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useMemo } from 'react'
import { getAllPostMetas } from '#/features/blog/registry'
import {
  resolveSupportedLanguage,
  supportedLanguages,
} from '#/features/i18n/config'
import type { SupportedLanguage } from '#/features/i18n/languages'
import type { PostMeta } from '#/features/blog/types'
import { publicConfig } from '#/shared/config/public-env'
import { Badge } from '#/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '#/shared/ui/card'

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

function PostCard({
  post,
  featured = false,
}: {
  post: PostMeta
  featured?: boolean
}) {
  return (
    <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block">
      <Card className="border-slate-200/85 bg-white/80 shadow-md backdrop-blur-xs transition-shadow group-hover:shadow-lg dark:border-slate-700/75 dark:bg-slate-900/70">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className={`w-full rounded-t-xl object-cover ${featured ? 'aspect-[21/9] sm:aspect-video' : 'aspect-video'}`}
            loading={featured ? 'eager' : 'lazy'}
          />
        ) : null}
        <CardHeader className="space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <CardTitle
              className={`font-semibold text-slate-900 group-hover:text-cyan-700 dark:text-slate-100 dark:group-hover:text-cyan-300 ${featured ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}
            >
              {post.title}
            </CardTitle>
            <Badge
              variant="secondary"
              className="shrink-0 text-xs font-medium sm:text-sm"
            >
              <time dateTime={post.publishedDate}>{post.publishedDate}</time>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p
            className={`leading-relaxed text-slate-700 dark:text-slate-300 ${featured ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}
          >
            {post.summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={`${post.slug}-${tag}`}
                variant="outline"
                className="border-slate-300/70 bg-white/65 text-slate-700 dark:border-slate-600/70 dark:bg-slate-800/75 dark:text-slate-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function BlogList() {
  const { t, i18n } = useTranslation('resume')
  const activeLanguage = resolveSupportedLanguage(
    i18n.resolvedLanguage ?? i18n.language,
  )
  const { tag: activeTag } = Route.useSearch()
  const navigate = useNavigate({ from: '/blog/' })
  const posts = allPostsByLanguage[activeLanguage]

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach((p) => p.tags.forEach((tag) => tagSet.add(tag)))
    return Array.from(tagSet).sort()
  }, [posts])

  const filteredPosts = useMemo(
    () => (activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts),
    [posts, activeTag],
  )

  const featuredPost = activeTag ? null : (filteredPosts[0] ?? null)
  const gridPosts = activeTag ? filteredPosts : filteredPosts.slice(1)

  const gridRef = useScrollReveal([activeTag, activeLanguage])

  function handleTagClick(tag: string) {
    if (tag === activeTag) {
      void navigate({ search: {} })
    } else {
      void navigate({ search: { tag } })
    }
  }

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Page header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">
            {t('blogTitle')}
          </h1>
          <p className="text-base text-slate-600 sm:text-lg dark:text-slate-400">
            {t('blogSubtitle')}
          </p>
        </div>

        {/* Featured post (latest, only when no tag filter) */}
        {featuredPost && (
          <section aria-label={t('blogLatestPost')}>
            <article>
              <PostCard post={featuredPost} featured />
            </article>
          </section>
        )}

        {/* Tag filter bar */}
        {allTags.length > 0 && (
          <nav aria-label={t('blogFilterByTag')}>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void navigate({ search: {} })}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors sm:text-sm ${
                  !activeTag
                    ? 'border-cyan-600 bg-cyan-600 text-white dark:border-cyan-500 dark:bg-cyan-500'
                    : 'border-slate-300 bg-white/70 text-slate-700 hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300'
                }`}
              >
                {t('blogAllPosts')}
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors sm:text-sm ${
                    activeTag === tag
                      ? 'border-cyan-600 bg-cyan-600 text-white dark:border-cyan-500 dark:bg-cyan-500'
                      : 'border-slate-300 bg-white/70 text-slate-700 hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </nav>
        )}

        {/* Post grid with scroll-reveal */}
        {gridPosts.length > 0 && (
          <div ref={gridRef} className="grid gap-5 sm:grid-cols-2">
            {gridPosts.map((post) => (
              <article
                key={post.slug}
                data-reveal="true"
                className="transition-all duration-500 ease-out"
              >
                <PostCard post={post} />
              </article>
            ))}
          </div>
        )}

        {filteredPosts.length === 0 && (
          <p className="py-12 text-center text-slate-500 dark:text-slate-400">
            {t('blogFilterByTag')}: <strong>{activeTag}</strong> — 0 posts
          </p>
        )}
      </div>
    </div>
  )
}
