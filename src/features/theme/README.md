# theme

This folder provides dark/light theme state, startup hydration safety, and UI controls.

## How it works

- [`ThemeContext.tsx`](./ThemeContext.tsx) exposes `ThemeProvider` and `useTheme()`.
- [`themes.ts`](./themes.ts) defines Forest Terminal, Plum Dusk, and Midnight Indigo (dark), and Cloud Teal (light).
- The selected theme is stored in the `theme` cookie and read by the root route loader before rendering. Midnight Indigo is the default.
- Old cookies migrate automatically: Midnight Editor → Forest Terminal, Graphite Neon → Plum Dusk, Paper Terminal → Cloud Teal.
- `applyTheme(mode)` updates:
  - `<html>` classes (`light` / `dark`)
  - `data-theme` attribute
  - `color-scheme` style

## Toggle UI

- [`ThemeSelector.tsx`](./ThemeSelector.tsx) lists all four palettes, with moon/sun icons colored using each palette's primary color.
- [`ThemeToggle.tsx`](./ThemeToggle.tsx) uses `useTheme()` and switches to the opposite mode.
- The toggle switches between Cloud Teal and Midnight Indigo.

## Palette tokens

The theme blocks in [`styles.css`](../../styles.css) use the seven palette values from `dev_site_palettes_round_two.html` and Midnight Indigo from `dev_site_palettes.html`. The first accent maps to primary actions; the second accent maps to secondary highlights. Shared semantic tokens derive blog surfaces, syntax colors, navigation, scrollbars, and UI primitives from those values.
