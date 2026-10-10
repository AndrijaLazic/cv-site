export const THEMES = [
  'forest-terminal',
  'plum-dusk',
  'midnight-indigo',
  'cloud-teal',
] as const

export type ThemeMode = (typeof THEMES)[number]

export const DEFAULT_THEME: ThemeMode = 'midnight-indigo'

export const THEME_LABELS: Record<ThemeMode, string> = {
  'forest-terminal': 'Forest Terminal',
  'plum-dusk': 'Plum Dusk',
  'midnight-indigo': 'Midnight Indigo',
  'cloud-teal': 'Cloud Teal',
}

export const THEME_SWATCHES: Record<ThemeMode, string> = {
  'forest-terminal': '#0b1210',
  'plum-dusk': '#14101a',
  'midnight-indigo': '#0f1020',
  'cloud-teal': '#f4f7fa',
}

export const THEME_PRIMARY_COLORS: Record<ThemeMode, string> = {
  'forest-terminal': '#3ddc97',
  'plum-dusk': '#ff7eb6',
  'midnight-indigo': '#7c83ff',
  'cloud-teal': '#0b7a75',
}

const LEGACY_THEMES = new Map<string, ThemeMode>([
  ['midnight-editor', 'forest-terminal'],
  ['graphite-neon', 'plum-dusk'],
  ['paper-terminal', 'cloud-teal'],
])

export function resolveThemeMode(theme?: string): ThemeMode {
  if (THEMES.some((mode) => mode === theme)) {
    return theme as ThemeMode
  }

  return LEGACY_THEMES.get(theme ?? '') ?? DEFAULT_THEME
}

export function isDarkTheme(mode: ThemeMode): boolean {
  return mode !== 'cloud-teal'
}
