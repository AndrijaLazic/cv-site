import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Footer from '#/features/layout/Footer'
import Header from '#/features/layout/Header'
import { loadInitialPreferences } from '#/features/preferences/preference.functions'
import { ThemeProvider } from '#/features/theme/ThemeContext'
import i18n, { i18nReady, resolveSupportedLanguage } from '#/features/i18n/config'

import appCss from '../styles.css?url'

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
        title: 'Professional Resume — Frontend Developer',
      },
      {
        name: 'description',
        content:
          'Professional resume of an experienced frontend developer specializing in React, TypeScript, and modern web technologies.',
      },
      {
        property: 'og:site_name',
        content: 'Professional Resume',
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

function RootDocument({ children }: { children: React.ReactNode }) {
  const { language, theme } = Route.useLoaderData()

  return (
    <html
      lang={language}
      className={theme}
      data-theme={theme}
      style={{ colorScheme: theme }}
    >
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased wrap-break-word min-h-screen flex flex-col selection:bg-rose-500/20">
        <ThemeProvider initialMode={theme}>
          <Header />
          <main className="flex-1 flex flex-col w-full">{children}</main>
          <Footer />
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
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
