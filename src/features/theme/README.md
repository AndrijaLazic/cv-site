# theme

This folder provides dark/light theme state, startup hydration safety, and UI controls.

## How it works

- [`ThemeContext.tsx`](./ThemeContext.tsx) exposes `ThemeProvider` and `useTheme()`.
- Theme mode is `light | dark` and is stored in `localStorage` under the `theme` key.
- On provider mount, initial mode is resolved in this order:
  1. Stored value in `localStorage`
  2. System preference (`prefers-color-scheme`)
  3. Fallback to `dark`
- `applyTheme(mode)` updates:
  - `<html>` classes (`light` / `dark`)
  - `data-theme` attribute
  - `color-scheme` style

## SSR and no-flash initialization

- [`theme-init-script.ts`](./theme-init-script.ts) exports `THEME_INIT_SCRIPT`.
- The script is injected in the root `<head>` before React hydration, so the correct theme is applied immediately and avoids theme flash.

## Toggle UI

- [`ThemeToggle.tsx`](./ThemeToggle.tsx) uses `useTheme()` and switches to the opposite mode.
- Labels are localized with `react-i18next` keys from the `common` namespace.
