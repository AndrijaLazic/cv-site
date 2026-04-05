import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/about')({
  component: About,
  head: () => ({
    meta: [
      {
        title: 'About — Professional Resume',
      },
      {
        name: 'description',
        content:
          'Learn more about this professional resume site built with TanStack Start.',
      },
      {
        property: 'og:title',
        content: 'About — Professional Resume',
      },
      {
        property: 'og:description',
        content:
          'Learn more about this professional resume site built with TanStack Start.',
      },
    ],
  }),
})

function About() {
  const { t } = useTranslation('common')

  return (
    <main className="page-wrap px-4 py-12">
      <article className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">{t('nav.about')}</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-(--sea-ink) sm:text-5xl">
          A small starter with room to grow.
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-(--sea-ink-soft)">
          TanStack Start gives you type-safe routing, server functions, and
          modern SSR defaults. Use this as a clean foundation, then layer in
          your own routes, styling, and add-ons.
        </p>
      </article>
    </main>
  )
}
