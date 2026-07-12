import { createFileRoute } from '@tanstack/react-router'
import { resolveSupportedLanguage } from '#/features/i18n/languages'
import { publicConfig } from '#/shared/config/public-env'

const copy = {
  en: {
    title: 'Andrija Lazic | Software Engineer',
    description:
      'Explore the professional resume of Andrija Lazic — software engineer with experience in Spring Boot, Python, .NET, AI, and DevOps. View work history, projects, and skills.',
  },
  sr: {
    title: 'Andrija Lazic | Softverski Inženjer',
    description:
      'Profesionalna biografija Andrije Lazića — softverski inženjer sa iskustvom u Spring Boot, Python, .NET, AI i DevOps-u. Pregled radnog iskustva, projekata i veština.',
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
