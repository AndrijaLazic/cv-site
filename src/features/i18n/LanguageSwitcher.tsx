import { useTranslation } from 'react-i18next'
import type { SupportedLanguage } from './config'
import { supportedLanguages } from './config'

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation('common')

  const currentLang = i18n.language as SupportedLanguage
  const nextLang = currentLang === 'en' ? 'sr' : 'en'

  function switchLanguage() {
    i18n.changeLanguage(nextLang)
    document.documentElement.lang = nextLang
  }

  return (
    <button
      type="button"
      onClick={switchLanguage}
      aria-label={t('language.switchLabel', 'Switch language')}
      title={t('language.switchLabel', 'Switch language')}
      className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm font-semibold text-[var(--sea-ink)] shadow-[0_8px_22px_rgba(30,90,72,0.08)] transition hover:-translate-y-0.5"
    >
      {t(`language.${nextLang}`)}
    </button>
  )
}
