import { createFileRoute } from '@tanstack/react-router'
import { ContactPage } from '#/features/contact/ContactPage'
import { resolveSupportedLanguage } from '#/features/i18n/languages'
import { publicConfig } from '#/shared/config/public-env'

const descriptions = {
  en: 'Reach out to Andrija Lazic — available via email, GitHub, and LinkedIn for backend engineering opportunities and collaborations.',
  sr: 'Kontaktirajte Andriju Lazića putem imejla, GitHub-a ili LinkedIn-a za poslovne prilike i saradnju.',
} as const

export const Route = createFileRoute('/($locale)/{-$locale}/contact')({
  component: ContactPage,
  head: ({ params }) => {
    const locale = resolveSupportedLanguage(params.locale)
    const canonicalUrl = `${publicConfig.siteUrl}${locale === 'en' ? '' : '/sr'}/contact`
    const title =
      locale === 'sr' ? 'Kontakt | Andrija Lazic' : 'Contact | Andrija Lazic'
    const description = descriptions[locale]
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: canonicalUrl },
      ],
      links: [
        { rel: 'canonical', href: canonicalUrl },
        {
          rel: 'alternate',
          href: `${publicConfig.siteUrl}/contact`,
          hrefLang: 'en',
        },
        {
          rel: 'alternate',
          href: `${publicConfig.siteUrl}/sr/contact`,
          hrefLang: 'sr',
        },
        {
          rel: 'alternate',
          href: `${publicConfig.siteUrl}/contact`,
          hrefLang: 'x-default',
        },
      ],
    }
  },
})
