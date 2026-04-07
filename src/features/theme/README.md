# theme

This folder provides dark/light theme state, startup hydration safety, and UI controls.

## How it works

- [`ThemeContext.tsx`](./ThemeContext.tsx) exposes `ThemeProvider` and `useTheme()`.
- Theme mode is `light | dark` and is stored in cookie (`theme`).
- The initial mode is provided by the root route loader from cookie data, with `dark` as fallback.
- `applyTheme(mode)` updates:
  - `<html>` classes (`light` / `dark`)
  - `data-theme` attribute
  - `color-scheme` style

## Toggle UI

- [`ThemeToggle.tsx`](./ThemeToggle.tsx) uses `useTheme()` and switches to the opposite mode.
- Labels are localized with `react-i18next` keys from the `common` namespace.
