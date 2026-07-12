import { createContext, useContext } from 'react'
import type { SupportedLanguage } from './languages'

export const LocaleContext = createContext<SupportedLanguage>('en')

export function useLocale(): SupportedLanguage {
  return useContext(LocaleContext)
}
