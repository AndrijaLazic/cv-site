import { useTheme } from './ThemeContext'
import { useTranslation } from 'react-i18next'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const { mode, setMode } = useTheme()
  const { t } = useTranslation('common')
  const nextMode = mode === 'dark' ? 'light' : 'dark'
  const label = t('theme.setTo', 'Set theme to {{mode}}', {
    mode:
      nextMode === 'dark' ? t('theme.dark', 'Dark') : t('theme.light', 'Light'),
  })

  return (
    <button
      type="button"
      onClick={() => setMode(nextMode)}
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--sea-ink)] shadow-[0_8px_22px_rgba(30,90,72,0.08)] transition hover:-translate-y-0.5"
    >
      {mode === 'dark' ? (
        <Moon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Sun className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  )
}
