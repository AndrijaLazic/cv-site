import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Mail } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '#/shared/ui/card'
import { GitHubIcon, LinkedInIcon } from '#/shared/ui/brand-icons'

export const Route = createFileRoute('/contact')({
  component: Contact,
  head: () => ({
    meta: [
      {
        title: 'Contact - Professional Resume',
      },
      {
        name: 'description',
        content:
          'Get in touch with Andrija Lazic via email, GitHub, or LinkedIn.',
      },
      {
        property: 'og:title',
        content: 'Contact - Professional Resume',
      },
      {
        property: 'og:description',
        content:
          'Get in touch with Andrija Lazic via email, GitHub, or LinkedIn.',
      },
    ],
  }),
})

function Contact() {
  const { t } = useTranslation('common')

  return (
    <main className="px-4 py-10 sm:px-6 sm:py-14">
      <section className="mx-auto w-full max-w-3xl">
        <Card className="border-slate-200/80 bg-white/75 shadow-lg backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/65">
          <CardHeader className="space-y-3">
            <p className="text-sm font-medium tracking-[0.12em] text-slate-500 uppercase dark:text-slate-400">
              {t('contact.kicker')}
            </p>
            <CardTitle className="text-3xl leading-tight font-bold text-slate-900 sm:text-4xl dark:text-slate-100">
              {t('contact.title')}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg dark:text-slate-300">
              {t('contact.description')}
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="https://github.com/AndrijaLazic"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300/80 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                <GitHubIcon aria-hidden="true" className="h-4 w-4" />
                {t('contact.github')}
              </a>

              <a
                href="https://www.linkedin.com/in/andrija-lazic-dev/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300/80 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                <LinkedInIcon aria-hidden="true" className="h-4 w-4" />
                {t('contact.linkedin')}
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
