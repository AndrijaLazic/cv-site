import { memo } from 'react'
import { useTheme } from './ThemeContext'
import { isDarkTheme } from './ThemeContext'
import { Moon, Sun } from 'lucide-react'
import type { ThemeMode } from './ThemeContext'

function ThemeToggle() {
  const { mode, setMode } = useTheme()
  const nextMode: ThemeMode = isDarkTheme(mode)
    ? 'paper-terminal'
    : 'graphite-neon'
  const label = isDarkTheme(mode)
    ? 'Switch to light theme'
    : 'Switch to dark theme'

  return (
    <button
      type="button"
      onClick={() => setMode(nextMode)}
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--chip-line) bg-(--chip-bg) text-(--sea-ink) shadow-[0_8px_22px_rgba(30,90,72,0.08)] transition hover:-translate-y-0.5"
    >
      {isDarkTheme(mode) ? (
        <Moon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Sun className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  )
}

export default memo(ThemeToggle)
