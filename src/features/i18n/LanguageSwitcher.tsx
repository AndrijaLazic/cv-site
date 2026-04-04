import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import type { SupportedLanguage } from './config'
import { supportedLanguages } from './config'

const languageMeta: Record<
  SupportedLanguage,
  { labelKey: `language.${SupportedLanguage}`; icon: string }
> = {
  en: { labelKey: 'language.en', icon: '🇺🇸' },
  sr: { labelKey: 'language.sr', icon: '🇷🇸' },
}

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation('common')
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const currentLang =
    supportedLanguages.find((lang) =>
      (i18n.resolvedLanguage ?? i18n.language).startsWith(lang)
    ) ?? 'en'

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
    i18n.changeLanguage(nextLang)
    document.documentElement.lang = nextLang
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
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--sea-ink)] shadow-[0_8px_22px_rgba(30,90,72,0.08)] transition hover:-translate-y-0.5"
      >
        <span aria-hidden="true">{languageMeta[currentLang].icon}</span>
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-[var(--chip-line)] bg-[var(--card-bg)] p-1 shadow-[0_16px_30px_rgba(0,0,0,0.12)]"
        >
          {supportedLanguages.map((lang) => {
            const active = lang === currentLang
            return (
              <button
                key={lang}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => switchLanguage(lang)}
                aria-label={t(languageMeta[lang].labelKey)}
                title={t(languageMeta[lang].labelKey)}
                className="flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-[var(--sea-ink)] transition hover:bg-[var(--link-bg-hover)]"
              >
                <span aria-hidden="true">{languageMeta[lang].icon}</span>
                {active ? (
                  <Check className="ml-auto h-4 w-4 text-[var(--sea-ink-soft)]" />
                ) : null}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
