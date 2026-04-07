import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import type { ThemeMode } from '#/features/theme/ThemeContext'
import { resolveSupportedLanguage } from '#/features/i18n/languages'
import type { SupportedLanguage } from '#/features/i18n/languages'

import { LANGUAGE_COOKIE_KEY, THEME_COOKIE_KEY } from './cookies'

const defaultTheme: ThemeMode = 'dark'

function resolveThemeMode(theme?: string): ThemeMode {
  return theme === 'light' || theme === 'dark' ? theme : defaultTheme
}

export type InitialPreferences = {
  language: SupportedLanguage
  theme: ThemeMode
}

export const loadInitialPreferences = createServerFn({ method: 'GET' }).handler(
  (): InitialPreferences => {
    const language = resolveSupportedLanguage(getCookie(LANGUAGE_COOKIE_KEY))
    const theme = resolveThemeMode(getCookie(THEME_COOKIE_KEY))

    return {
      language,
      theme,
    }
  },
)
