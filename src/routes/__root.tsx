import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { Suspense, lazy, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import Footer from '#/features/layout/Footer'
import Header from '#/features/layout/Header'
import { loadInitialPreferences } from '#/features/preferences/preference.functions'
import { ThemeProvider } from '#/features/theme/ThemeContext'
import i18n, {
  i18nReady,
  resolveSupportedLanguage,
} from '#/features/i18n/config'
import { scrollSnapContainerClassName } from '#/shared/ui/scroll-snap'

import appCss from '../styles.css?url'

const AppDevtools = lazy(() =>
  import('#/features/devtools/AppDevtools').then((module) => ({
    default: module.AppDevtools,
  })),
)

export const Route = createRootRoute({
  loader: async () => {
    const preferences = await loadInitialPreferences()

    await i18nReady
    const currentLanguage = resolveSupportedLanguage(
      i18n.resolvedLanguage ?? i18n.language,
    )

    if (currentLanguage !== preferences.language) {
      await i18n.changeLanguage(preferences.language)
    }

    return preferences
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Andrija Lazic | Backend Software Engineer',
      },
      {
        name: 'description',
        content:
          'Andrija Lazic — backend software engineer specializing in Spring Boot, Python, .NET, AI systems, and DevOps. View resume, blog, and contact info.',
      },
      {
        name: 'author',
        content: 'Andrija Lazic',
      },
      {
        property: 'og:site_name',
        content: 'Andrija Lazic',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:locale',
        content: 'en_US',
      },
      {
        property: 'og:locale:alternate',
        content: 'sr_RS',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: ReactNode }) {
  const { language, theme } = Route.useLoaderData()
  const shouldRenderDevtools = useDeferredDevtools()

  return (
    <html
      lang={language}
      className={`${theme} ${scrollSnapContainerClassName}`}
      data-theme={theme}
      style={{ colorScheme: theme }}
    >
      <head>
        <HeadContent />
      </head>
      <body
        className={`font-sans antialiased wrap-break-word min-h-screen flex flex-col selection:bg-rose-500/20 ${scrollSnapContainerClassName}`}
      >
        <ThemeProvider initialMode={theme}>
          <Header />
          <main className="flex-1 flex flex-col w-full bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_42%),linear-gradient(to_bottom,rgb(248_250_252),rgb(241_245_249))] dark:bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_45%),linear-gradient(to_bottom,rgb(2_6_23),rgb(3_7_18))]">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        {shouldRenderDevtools ? (
          <Suspense fallback={null}>
            <AppDevtools />
          </Suspense>
        ) : null}
        <Scripts />
      </body>
    </html>
  )
}

function useDeferredDevtools() {
  const [shouldRenderDevtools, setShouldRenderDevtools] = useState(false)

  useEffect(() => {
    if (!import.meta.env.DEV) {
      return
    }

    const handle = window.setTimeout(() => {
      setShouldRenderDevtools(true)
    }, 1500)

    return () => {
      window.clearTimeout(handle)
    }
  }, [])

  return shouldRenderDevtools
}

function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-4 px-6 py-12 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
        404
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground">
        The page you requested does not exist or was moved.
      </p>
      <Link
        to="/"
        className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Back to home
      </Link>
    </section>
  )
}
