import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enCommon from './locales/en/common.json'
import enResume from './locales/en/resume.json'
import srCommon from './locales/sr/common.json'
import srResume from './locales/sr/resume.json'

export const supportedLanguages = ['en', 'sr'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon, resume: enResume },
      sr: { common: srCommon, resume: srResume },
    },
    fallbackLng: 'en',
    supportedLngs: supportedLanguages,
    ns: ['common', 'resume'],
    defaultNS: 'common',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'language',
    },
    interpolation: { escapeValue: false },
  })

export default i18n
