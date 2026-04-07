# routes

This folder defines TanStack Router file-based routes for pages and APIs.

## How it works

- Each file exports a `Route` created with `createFileRoute(...)` (or `createRootRoute(...)` for root).
- File names map to URL paths:
  - `index.tsx` -> `/`
  - `about.tsx` -> `/about`
  - `api.resume-chat.ts` -> `/api/resume-chat` (server handler)
- Route `head()` functions define page metadata (title, description, Open Graph tags).

## Root route

- [`__root.tsx`](./__root.tsx) is the app shell:
  - Injects global CSS
  - Loads initial `language` + `theme` from cookies via a server function
  - Boots i18n (`#/features/i18n/config`) and applies request language in the root loader
  - Sets `<html lang/class/data-theme/color-scheme>` from loader data for hydration-safe SSR
  - Wraps content with `ThemeProvider initialMode={theme}`
  - Renders shared layout (`Header`, `Footer`)

## API routes

- API routes live next to page routes and use the route `server.handlers` API.
- [`api.resume-chat.ts`](./api.resume-chat.ts) handles `POST`, selects an AI provider, and streams SSE responses via `toServerSentEventsResponse`.
