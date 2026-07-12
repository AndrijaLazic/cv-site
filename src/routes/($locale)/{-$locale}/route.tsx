import {
  Outlet,
  createFileRoute,
  notFound,
  redirect,
} from '@tanstack/react-router'
import { isSupportedLanguage } from '#/features/i18n/languages'

export const Route = createFileRoute('/($locale)/{-$locale}')({
  beforeLoad: ({ location, params }) => {
    if (params.locale === 'en') {
      throw redirect({
        href: location.href.replace(/^\/en(?=\/|$)/, '') || '/',
      })
    }
    if (params.locale && !isSupportedLanguage(params.locale)) throw notFound()
  },
  component: Outlet,
})
