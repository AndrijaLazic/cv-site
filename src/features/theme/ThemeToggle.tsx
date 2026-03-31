import { useTheme } from './ThemeContext'
import { useTranslation } from 'react-i18next'

export default function ThemeToggle() {
  const { mode, setMode } = useTheme()
  const { t } = useTranslation('common')

  function toggleMode() {
    const nextMode =
      mode === 'light' ? 'dark' : mode === 'dark' ? 'auto' : 'light'
    setMode(nextMode)
  }

  const label =
    mode === 'auto'
      ? t('theme.autoLabel', 'Theme: auto (system)')
      : t('theme.modeLabel', 'Theme: {{mode}}', { mode })

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={label}
      title={label}
      className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm font-semibold text-[var(--sea-ink)] shadow-[0_8px_22px_rgba(30,90,72,0.08)] transition hover:-translate-y-0.5"
    >
      {mode === 'auto'
        ? t('theme.auto', 'Auto')
        : mode === 'dark'
          ? t('theme.dark', 'Dark')
          : t('theme.light', 'Light')}
    </button>
  )
}
