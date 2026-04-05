export const languageRegistry = {
  en: {
    labelKey: 'language.en',
  },
  sr: {
    labelKey: 'language.sr',
  },
} as const

export type SupportedLanguage = keyof typeof languageRegistry

export const defaultLanguage: SupportedLanguage = 'en'

export const supportedLanguages = Object.freeze(
  Object.keys(languageRegistry) as SupportedLanguage[],
)

const supportedLanguageSet = new Set<SupportedLanguage>(supportedLanguages)

export function isSupportedLanguage(
  language: string,
): language is SupportedLanguage {
  return supportedLanguageSet.has(language as SupportedLanguage)
}

export function resolveSupportedLanguage(
  language?: string | null,
): SupportedLanguage {
  if (!language) {
    return defaultLanguage
  }

  const baseLanguage = language.toLowerCase().split('-')[0]

  return isSupportedLanguage(baseLanguage) ? baseLanguage : defaultLanguage
}
