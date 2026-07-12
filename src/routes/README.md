# routes

This folder defines TanStack Router file-based routes for pages and APIs.

## How it works

- Each file exports a `Route` created with `createFileRoute(...)` (or `createRootRoute(...)` for root).
- `($locale)` is an organizational route group and does not affect URLs.
- `{-$locale}/route.tsx` validates the optional shared `en | sr` locale parameter. A missing locale resolves to English.
- Shared child routes map to localized URLs:
  - `($locale)/{-$locale}/index.tsx` -> `/` or `/sr`
  - `($locale)/{-$locale}/contact.tsx` -> `/contact` or `/sr/contact`
  - `($locale)/{-$locale}/blog/index.tsx` -> `/blog` or `/sr/blog`
  - `($locale)/{-$locale}/blog/$slug.tsx` -> `/blog/:slug` or `/sr/blog/:slug`
- Route `head()` functions define page metadata (title, description, Open Graph tags).

## Root route

- [`__root.tsx`](./__root.tsx) is the app shell:
  - Injects global CSS
  - Loads initial `language` + `theme` from cookies via a server function
  - Boots i18n (`#/features/i18n/config`) and applies request language in the root loader
  - Sets `<html lang/class/data-theme/color-scheme>` from loader data for hydration-safe SSR
  - Wraps content with `ThemeProvider initialMode={theme}`
  - Renders shared layout (`Header`, `Footer`)

## Infrastructure routes

Non-localized endpoints such as `sitemap.xml.ts` remain at the route root.
