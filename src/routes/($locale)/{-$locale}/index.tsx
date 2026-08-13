import { createFileRoute } from '@tanstack/react-router'
import { resolveSupportedLanguage } from '#/features/i18n/languages'
import { publicConfig } from '#/shared/config/public-env'

const copy = {
  en: {
    title: 'Andrija Lazic | Software Engineer',
    description:
      'Software Developer with 6+ years of practical IT experience and 2+ years building web applications, deployment, and AI features.',
  },
  sr: {
    title: 'Andrija Lazic | Softverski Inženjer',
    description:
      'Software Developer sa 6+ godina praktičnog IT iskustva i 2+ godine rada na web aplikacijama, deployment procesima i AI funkcionalnostima.',
  },
} as const

export const Route = createFileRoute('/($locale)/{-$locale}/')({
  head: ({ params }) => {
    const locale = resolveSupportedLanguage(params.locale)
    const canonicalUrl =
      locale === 'en'
        ? `${publicConfig.siteUrl}/`
        : `${publicConfig.siteUrl}/sr`
    const pageCopy = copy[locale]

    return {
      meta: [
        { title: pageCopy.title },
        { name: 'description', content: pageCopy.description },
        { property: 'og:title', content: pageCopy.title },
        { property: 'og:description', content: pageCopy.description },
        { property: 'og:url', content: canonicalUrl },
        { property: 'og:type', content: 'profile' },
      ],
      links: [
        { rel: 'canonical', href: canonicalUrl },
        {
          rel: 'alternate',
          href: `${publicConfig.siteUrl}/`,
          hrefLang: 'en',
        },
        {
          rel: 'alternate',
          href: `${publicConfig.siteUrl}/sr`,
          hrefLang: 'sr',
        },
        {
          rel: 'alternate',
          href: `${publicConfig.siteUrl}/`,
          hrefLang: 'x-default',
        },
      ],
    }
  },
})
