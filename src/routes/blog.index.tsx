import { Link, createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import * as contentCollections from '../../.content-collections/generated/index.js'
import type { SupportedLanguage } from '#/features/i18n/config'
import {
  resolveSupportedLanguage,
  supportedLanguages,
} from '#/features/i18n/config'
import { publicConfig } from '#/shared/config/public-env'
import { Badge } from '#/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '#/shared/ui/card'

type ContentCollections = typeof contentCollections
type BlogPost = ContentCollections[keyof ContentCollections][number] & {
  title: string
  slug: string
  summary: string
  publishedDate: string
  coverImage?: string
  tags: string[]
}

function toCollectionSuffix(language: SupportedLanguage) {
  return `${language.charAt(0).toUpperCase()}${language.slice(1)}s`
}

function getLocalizedBlogs(language: SupportedLanguage) {
  const key =
    `allBlogs${toCollectionSuffix(language)}` as keyof ContentCollections
  const collection = contentCollections[key]
  return (Array.isArray(collection) ? collection : []) as Array<BlogPost>
}

const blogsByLanguage = Object.fromEntries(
  supportedLanguages.map((language) => [language, getLocalizedBlogs(language)]),
) as Record<SupportedLanguage, Array<BlogPost>>

export const Route = createFileRoute('/blog/')({
  component: BlogList,
  head: () => {
    const canonicalUrl = `${publicConfig.siteUrl}/blog`

    return {
      meta: [
        {
          title: 'Blog | Andrija Lazic',
        },
        {
          name: 'description',
          content:
            'Technical blog by Andrija Lazic — experiments, findings, and insights from backend engineering, AI, and DevOps.',
        },
        {
          property: 'og:title',
          content: 'Blog | Andrija Lazic',
        },
        {
          property: 'og:description',
          content:
            'Technical blog by Andrija Lazic — experiments, findings, and insights from backend engineering, AI, and DevOps.',
        },
        {
          property: 'og:url',
          content: canonicalUrl,
        },
        {
          property: 'og:type',
          content: 'website',
        },
      ],
      links: [
        {
          rel: 'canonical',
          href: canonicalUrl,
        },
      ],
    }
  },
})

function BlogList() {
  const { t, i18n } = useTranslation('resume')
  const activeLanguage = resolveSupportedLanguage(
    i18n.resolvedLanguage ?? i18n.language,
  )
  const posts = blogsByLanguage[activeLanguage]

  const sortedPosts = [...posts].sort(
    (a, b) => Date.parse(b.publishedDate) - Date.parse(a.publishedDate),
  )

  return (
    <main className="px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">
            {t('blogTitle')}
          </h1>
          <p className="text-base text-slate-600 sm:text-lg dark:text-slate-400">
            {t('blogSubtitle')}
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {sortedPosts.map((post) => (
            <article key={post.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group block"
              >
                <Card className="border-slate-200/85 bg-white/80 shadow-md backdrop-blur-xs transition-shadow group-hover:shadow-lg dark:border-slate-700/75 dark:bg-slate-900/70">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="aspect-[16/9] w-full rounded-t-xl object-cover"
                      loading="lazy"
                    />
                  ) : null}
                  <CardHeader className="space-y-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <CardTitle className="text-lg font-semibold text-slate-900 group-hover:text-cyan-700 sm:text-xl dark:text-slate-100 dark:group-hover:text-cyan-300">
                        {post.title}
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className="shrink-0 text-xs font-medium sm:text-sm"
                      >
                        <time dateTime={post.publishedDate}>
                          {post.publishedDate}
                        </time>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
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
                    <p className="text-sm font-medium text-cyan-700 dark:text-cyan-400">
                      {t('blogReadMore')} →
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
