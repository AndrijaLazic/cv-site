import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react'
import type { ReactNode } from 'react'
import {
  THEME_COOKIE_KEY,
  setClientCookie,
} from '#/features/preferences/cookies'

export type ThemeMode = 'midnight-editor' | 'graphite-neon' | 'paper-terminal'

export const THEME_LABELS: Record<ThemeMode, string> = {
  'midnight-editor': 'Midnight Editor',
  'graphite-neon': 'Graphite Neon',
  'paper-terminal': 'Paper Terminal',
}

/** Swatches used by the theme picker — the dominant bg color of each theme */
export const THEME_SWATCHES: Record<ThemeMode, string> = {
  'midnight-editor': '#0B1020',
  'graphite-neon': '#111315',
  'paper-terminal': '#F8FAFC',
}

export function isDarkTheme(mode: ThemeMode): boolean {
  return mode !== 'paper-terminal'
}

interface ThemeContextValue {
  mode: ThemeMode
  resolvedTheme: 'light' | 'dark'
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement
  const dark = isDarkTheme(mode)
  root.classList.remove(
    'light',
    'dark',
    'midnight-editor',
    'graphite-neon',
    'paper-terminal',
  )
  root.classList.add(mode)
  root.classList.add(dark ? 'dark' : 'light')
  root.setAttribute('data-theme', mode)
  root.style.colorScheme = dark ? 'dark' : 'light'
}

type ThemeProviderProps = {
  children: ReactNode
  initialMode: ThemeMode
}

export function ThemeProvider({ children, initialMode }: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(initialMode)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(
    isDarkTheme(initialMode) ? 'dark' : 'light',
  )

  useEffect(() => {
    setModeState(initialMode)
    applyTheme(initialMode)
    setResolvedTheme(isDarkTheme(initialMode) ? 'dark' : 'light')
  }, [initialMode])

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next)
    applyTheme(next)
    setResolvedTheme(isDarkTheme(next) ? 'dark' : 'light')
    setClientCookie(THEME_COOKIE_KEY, next)
  }, [])

  const contextValue = useMemo(
    () => ({ mode, resolvedTheme, setMode }),
    [mode, resolvedTheme, setMode],
  )

  return <ThemeContext value={contextValue}>{children}</ThemeContext>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
