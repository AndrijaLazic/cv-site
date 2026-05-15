import { memo, useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Moon, Sun } from 'lucide-react'
import { cn } from '#/shared/utils'
import { THEME_LABELS, isDarkTheme, useTheme } from './ThemeContext'
import type { ThemeMode } from './ThemeContext'

const THEMES: ThemeMode[] = [
  'midnight-editor',
  'graphite-neon',
  'paper-terminal',
]

function ThemeIcon({
  mode,
  className,
}: {
  mode: ThemeMode
  className?: string
}) {
  return isDarkTheme(mode) ? (
    <Moon className={className} aria-hidden="true" />
  ) : (
    <Sun className={className} aria-hidden="true" />
  )
}

function ThemeSelectorView() {
  const { mode, setMode } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

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

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={`Theme: ${THEME_LABELS[mode]}`}
        title={`Theme: ${THEME_LABELS[mode]}`}
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-(--chip-line) bg-(--chip-bg) px-3 text-(--sea-ink) shadow-[0_8px_22px_rgba(30,90,72,0.08)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)"
      >
        <ThemeIcon mode={mode} className="h-4 w-4 shrink-0" />
        <span className="hidden text-sm font-medium sm:inline">
          {THEME_LABELS[mode]}
        </span>
        <ChevronDown
          className={cn(
            'h-3 w-3 shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 min-w-40 overflow-hidden rounded-2xl border border-(--chip-line) bg-(--card-bg) p-1 shadow-[0_16px_30px_rgba(0,0,0,0.14)]"
        >
          {THEMES.map((theme) => {
            const isActive = mode === theme
            return (
              <button
                key={theme}
                type="button"
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => {
                  setMode(theme)
                  setIsOpen(false)
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-(--sea-ink) transition hover:bg-(--link-bg-hover)"
              >
                <ThemeIcon
                  mode={theme}
                  className="h-4 w-4 shrink-0 text-(--sea-ink-soft)"
                />
                <span className="whitespace-nowrap">{THEME_LABELS[theme]}</span>
                {isActive ? (
                  <Check
                    className="ml-auto h-4 w-4 shrink-0 text-(--sea-ink-soft)"
                    aria-hidden="true"
                  />
                ) : null}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

const ThemeSelector = memo(ThemeSelectorView)
export default ThemeSelector
