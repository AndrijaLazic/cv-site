import { memo } from 'react'
import { useTheme } from './ThemeContext'
import { THEME_LABELS, THEME_SWATCHES } from './ThemeContext'
import type { ThemeMode } from './ThemeContext'
import { cn } from '#/shared/utils'

const THEMES: ThemeMode[] = [
  'midnight-editor',
  'graphite-neon',
  'paper-terminal',
]

function ThemeSelectorView() {
  const { mode, setMode } = useTheme()

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-(--chip-line) bg-(--chip-bg) px-1.5 py-1 shadow-[0_8px_22px_rgba(30,90,72,0.08)]"
      role="group"
      aria-label="Select theme"
    >
      {THEMES.map((theme) => {
        const isActive = mode === theme
        const swatch = THEME_SWATCHES[theme]
        const label = THEME_LABELS[theme]

        return (
          <button
            key={theme}
            type="button"
            onClick={() => setMode(theme)}
            title={label}
            aria-label={`Set theme: ${label}`}
            aria-pressed={isActive}
            className={cn(
              'relative h-5 w-5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
              isActive
                ? 'scale-110 ring-2 ring-offset-1 ring-offset-(--chip-bg)'
                : 'opacity-70 hover:opacity-100 hover:scale-105',
            )}
            style={{
              backgroundColor: swatch,
              border:
                theme === 'paper-terminal'
                  ? '1px solid #cbd5e1'
                  : '1px solid rgba(255,255,255,0.12)',
              ['--tw-ring-color' as string]:
                theme === 'midnight-editor'
                  ? '#4F8CFF'
                  : theme === 'graphite-neon'
                    ? '#A78BFA'
                    : '#2563EB',
            }}
          />
        )
      })}
    </div>
  )
}

const ThemeSelector = memo(ThemeSelectorView)
export default ThemeSelector
