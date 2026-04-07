import { useTranslation } from 'react-i18next'
import { memo, useEffect, useRef, useState } from 'react'
import type { ComponentType } from 'react'
import { Check } from 'lucide-react'
import {
  LANGUAGE_COOKIE_KEY,
  setClientCookie,
} from '#/features/preferences/cookies'
import { supportedLanguages, resolveSupportedLanguage } from './languages'
import type { SupportedLanguage } from './languages'

type FlagIconProps = {
  className?: string
}

function UsFlagIcon({ className }: FlagIconProps) {
  return (
    <svg
      viewBox="0 0 32 22"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="32" height="22" rx="2.5" fill="#b22234" />
      <g fill="#ffffff">
        <rect y="1.7" width="32" height="1.7" />
        <rect y="5.1" width="32" height="1.7" />
        <rect y="8.5" width="32" height="1.7" />
        <rect y="11.9" width="32" height="1.7" />
        <rect y="15.3" width="32" height="1.7" />
        <rect y="18.7" width="32" height="1.7" />
      </g>
      <rect width="14" height="11.5" rx="1.5" fill="#3c3b6e" />
      <g fill="#ffffff">
        <circle cx="2.2" cy="2.2" r="0.55" />
        <circle cx="4.6" cy="2.2" r="0.55" />
        <circle cx="7" cy="2.2" r="0.55" />
        <circle cx="9.4" cy="2.2" r="0.55" />
        <circle cx="11.8" cy="2.2" r="0.55" />
        <circle cx="3.4" cy="3.9" r="0.55" />
        <circle cx="5.8" cy="3.9" r="0.55" />
        <circle cx="8.2" cy="3.9" r="0.55" />
        <circle cx="10.6" cy="3.9" r="0.55" />
        <circle cx="2.2" cy="5.6" r="0.55" />
        <circle cx="4.6" cy="5.6" r="0.55" />
        <circle cx="7" cy="5.6" r="0.55" />
        <circle cx="9.4" cy="5.6" r="0.55" />
        <circle cx="11.8" cy="5.6" r="0.55" />
        <circle cx="3.4" cy="7.3" r="0.55" />
        <circle cx="5.8" cy="7.3" r="0.55" />
        <circle cx="8.2" cy="7.3" r="0.55" />
        <circle cx="10.6" cy="7.3" r="0.55" />
        <circle cx="2.2" cy="9" r="0.55" />
        <circle cx="4.6" cy="9" r="0.55" />
        <circle cx="7" cy="9" r="0.55" />
        <circle cx="9.4" cy="9" r="0.55" />
        <circle cx="11.8" cy="9" r="0.55" />
      </g>
    </svg>
  )
}

function SerbiaFlagIcon({ className }: FlagIconProps) {
  return (
    <svg
      viewBox="0 0 32 22"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="32" height="22" rx="2.5" fill="#c6363c" />
      <rect y="7.33" width="32" height="7.34" fill="#0c4076" />
      <rect y="14.67" width="32" height="7.33" fill="#f4f4f5" />
      <rect x="6" y="6" width="3.2" height="10" rx="0.9" fill="#d1a53a" />
      <rect x="6.55" y="7" width="2.1" height="8" rx="0.6" fill="#f3d97a" />
    </svg>
  )
}

const languageMeta: Record<
  SupportedLanguage,
  {
    labelKey: `language.${SupportedLanguage}`
    Icon: ComponentType<FlagIconProps>
  }
> = {
  en: { labelKey: 'language.en', Icon: UsFlagIcon },
  sr: { labelKey: 'language.sr', Icon: SerbiaFlagIcon },
}

function LanguageSwitcher() {
  const { i18n, t } = useTranslation('common')
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const currentLang = resolveSupportedLanguage(
    i18n.resolvedLanguage ?? i18n.language,
  )
  const CurrentLanguageIcon = languageMeta[currentLang].Icon

  useEffect(() => {
    if (!isOpen) return
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onEscape)
    }
  }, [isOpen])

  function switchLanguage(nextLang: SupportedLanguage) {
    void i18n.changeLanguage(nextLang)
    document.documentElement.lang = nextLang
    setClientCookie(LANGUAGE_COOKIE_KEY, nextLang)
    setIsOpen(false)
  }

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={t('language.switchLabel', 'Switch language')}
        title={t('language.switchLabel', 'Switch language')}
        className="inline-flex size-10 items-center justify-center rounded-full border border-(--chip-line) bg-(--chip-bg) text-(--sea-ink) shadow-[0_8px_22px_rgba(30,90,72,0.08)] transition hover:-translate-y-0.5"
      >
        <CurrentLanguageIcon className="h-4 w-6 rounded-sm ring-1 ring-slate-900/10 dark:ring-slate-50/20" />
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-(--chip-line) bg-(--card-bg) p-1 shadow-[0_16px_30px_rgba(0,0,0,0.12)]"
        >
          {supportedLanguages.map((langKey) => {
            const lang = langKey
            const active = lang === currentLang
            const LanguageIcon = languageMeta[lang].Icon
            return (
              <button
                key={lang}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => switchLanguage(lang)}
                aria-label={t(languageMeta[lang].labelKey)}
                title={t(languageMeta[lang].labelKey)}
                className="flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-(--sea-ink) transition hover:bg-(--link-bg-hover)"
              >
                <LanguageIcon className="h-4 w-6 rounded-sm ring-1 ring-slate-900/10 dark:ring-slate-50/20" />
                {active ? (
                  <Check className="ml-auto h-4 w-4 text-(--sea-ink-soft)" />
                ) : null}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default memo(LanguageSwitcher)
