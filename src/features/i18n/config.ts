import i18n from 'i18next'
import type { Resource } from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { LANGUAGE_COOKIE_KEY } from '#/features/preferences/cookies'

import {
  defaultLanguage,
  isSupportedLanguage,
  supportedLanguages,
} from './languages'

type LocaleModule = {
  default: Record<string, unknown>
}

const localeModules = import.meta.glob<LocaleModule>('./locales/*/*.json', {
  eager: true,
})

const resources = Object.entries(localeModules).reduce<Resource>(
  (accumulator, [filePath, localeModule]) => {
    const match = filePath.match(/^\.\/locales\/([^/]+)\/([^/]+)\.json$/)

    if (!match) {
      return accumulator
    }

    const [, language, namespace] = match

    if (!isSupportedLanguage(language)) {
      return accumulator
    }

    const languageResources = (accumulator[language] ??= {})
    languageResources[namespace] = localeModule.default

    return accumulator
  },
  {},
)

const namespaceSet = new Set<string>()

for (const languageResources of Object.values(resources)) {
  for (const namespace of Object.keys(languageResources)) {
    namespaceSet.add(namespace)
  }
}

const namespaces = namespaceSet.size > 0 ? Array.from(namespaceSet) : ['common']
const defaultNamespace = namespaces.includes('common')
  ? 'common'
  : namespaces[0]

const i18nInitialization = i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: defaultLanguage,
    supportedLngs: supportedLanguages,
    ns: namespaces,
    defaultNS: defaultNamespace,
    detection: {
      order: ['htmlTag', 'cookie'],
      caches: ['cookie'],
      lookupCookie: LANGUAGE_COOKIE_KEY,
      cookieMinutes: 60 * 24 * 365,
      cookieOptions: {
        path: '/',
        sameSite: 'lax',
      },
    },
    interpolation: { escapeValue: false },
  })

export const i18nReady = i18nInitialization.then(() => undefined)

export {
  defaultLanguage,
  isSupportedLanguage,
  resolveSupportedLanguage,
  supportedLanguages,
  type SupportedLanguage,
} from './languages'

export default i18n
