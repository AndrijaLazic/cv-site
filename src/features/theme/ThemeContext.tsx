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

export type ThemeMode = 'light' | 'dark'

interface ThemeContextValue {
  mode: ThemeMode
  resolvedTheme: 'light' | 'dark'
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(mode)
  root.setAttribute('data-theme', mode)
  root.style.colorScheme = mode
}

type ThemeProviderProps = {
  children: ReactNode
  initialMode: ThemeMode
}

export function ThemeProvider({ children, initialMode }: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(initialMode)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(
    initialMode,
  )

  useEffect(() => {
    setModeState(initialMode)
    applyTheme(initialMode)
    setResolvedTheme(initialMode)
  }, [initialMode])

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next)
    applyTheme(next)
    setResolvedTheme(next)
    setClientCookie(THEME_COOKIE_KEY, next)
  }, [])

  const contextValue = useMemo(
    () => ({ mode, resolvedTheme, setMode }),
    [mode, resolvedTheme, setMode],
  )

  return (
    <ThemeContext value={contextValue}>
      {children}
    </ThemeContext>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
