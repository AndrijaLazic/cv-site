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
import { THEMES, THEME_SWATCHES, isDarkTheme } from './themes'
import type { ThemeMode } from './themes'

export { THEME_LABELS, THEME_SWATCHES, isDarkTheme } from './themes'
export type { ThemeMode } from './themes'

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
    ...THEMES,
  )
  root.classList.add(mode)
  root.classList.add(dark ? 'dark' : 'light')
  root.setAttribute('data-theme', mode)
  root.style.colorScheme = dark ? 'dark' : 'light'
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_SWATCHES[mode])
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
