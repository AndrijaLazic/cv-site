import { createFileRoute } from '@tanstack/react-router'
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
  validateSearch: (search: Record<string, unknown>) => ({
    tag: typeof search.tag === 'string' ? search.tag : undefined,
  }),
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
  return <BlogListView posts={Route.useLoaderData()} />
}
