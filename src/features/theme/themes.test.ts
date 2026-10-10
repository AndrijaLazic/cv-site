import { describe, expect, it } from 'vitest'
import { DEFAULT_THEME, THEMES, isDarkTheme, resolveThemeMode } from './themes'

describe('saved theme preferences', () => {
  it.each(THEMES)('keeps a saved %s selection', (theme) => {
    expect(resolveThemeMode(theme)).toBe(theme)
  })

  it.each([
    ['midnight-editor', 'forest-terminal'],
    ['graphite-neon', 'plum-dusk'],
    ['paper-terminal', 'cloud-teal'],
  ])('migrates %s to %s', (previous, next) => {
    expect(resolveThemeMode(previous)).toBe(next)
  })

  it.each([undefined, '', 'unknown', 'toString', 'constructor'])(
    'defaults invalid or missing preference %s',
    (theme) => {
      expect(resolveThemeMode(theme)).toBe(DEFAULT_THEME)
    },
  )

  it('classifies dark and light palettes for SSR and browser controls', () => {
    expect(isDarkTheme('forest-terminal')).toBe(true)
    expect(isDarkTheme('plum-dusk')).toBe(true)
    expect(isDarkTheme('midnight-indigo')).toBe(true)
    expect(isDarkTheme('cloud-teal')).toBe(false)
  })
})
