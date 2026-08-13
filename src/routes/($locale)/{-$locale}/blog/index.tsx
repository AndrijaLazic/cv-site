import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { BlogListView } from '#/features/blog/BlogListView'
import { getBlogPostSummaries } from '#/features/blog/api'
import { resolveSupportedLanguage } from '#/features/i18n/languages'
import { publicConfig } from '#/shared/config/public-env'

const descriptions = {
  en: 'Technical blog by Andrija Lazic — experiments, findings, and insights from backend engineering, AI, and DevOps.',
  sr: 'Tehnički blog Andrije Lazića — eksperimenti, otkrića i uvidi iz backend inženjeringa, AI-ja i DevOps-a.',
} as const

export const Route = createFileRoute('/($locale)/{-$locale}/blog/')({
  component: BlogIndexPage,
  validateSearch: (search: Record<string, unknown>) => {
    const tagValues = Array.isArray(search.tag) ? search.tag : [search.tag]
    const tags = tagValues.filter(
      (tag): tag is string => typeof tag === 'string' && tag.length > 0,
    )

    return { tag: tags.length > 0 ? tags : undefined }
  },
  loader: ({ params }) =>
    getBlogPostSummaries(resolveSupportedLanguage(params.locale)),
  head: ({ params }) => {
    const locale = resolveSupportedLanguage(params.locale)
    const canonicalUrl = `${publicConfig.siteUrl}${locale === 'en' ? '' : '/sr'}/blog`
    const description = descriptions[locale]
    return {
      meta: [
        { title: 'Blog | Andrija Lazic' },
        { name: 'description', content: description },
        { property: 'og:title', content: 'Blog | Andrija Lazic' },
        { property: 'og:description', content: description },
        { property: 'og:url', content: canonicalUrl },
        { property: 'og:type', content: 'website' },
      ],
      links: [
        { rel: 'canonical', href: canonicalUrl },
        {
          rel: 'alternate',
          href: `${publicConfig.siteUrl}/blog`,
          hrefLang: 'en',
        },
        {
          rel: 'alternate',
          href: `${publicConfig.siteUrl}/sr/blog`,
          hrefLang: 'sr',
        },
        {
          rel: 'alternate',
          href: `${publicConfig.siteUrl}/blog`,
          hrefLang: 'x-default',
        },
      ],
    }
  },
})

function BlogIndexPage() {
  const posts = Route.useLoaderData()
  const { tag } = Route.useSearch()
  const { locale } = Route.useParams()
  const navigate = useNavigate()

  function handleTagsChange(
    nextTags: string[],
    options?: { replace?: boolean },
  ) {
    void navigate({
      to: '/{-$locale}/blog',
      params: { locale },
      search: { tag: nextTags.length > 0 ? nextTags : undefined },
      replace: options?.replace ?? false,
    })
  }

  return (
    <BlogListView
      posts={posts}
      activeTags={tag ?? []}
      onTagsChange={handleTagsChange}
    />
  )
}
