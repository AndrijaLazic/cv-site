# Project Guidelines

## Tech Stack

- **Framework**: TanStack Start (React 19, Vite 7, SSR)
- **Routing**: TanStack Router — file-based in `src/routes/`
- **Styling**: Tailwind CSS 4 + `tailwindcss-animate`, custom dark mode via `@custom-variant dark`
- **UI components**: Radix primitives in `src/shared/ui/` (shadcn/ui style with CVA + `cn()`)
- **Content**: `@content-collections/core` — markdown in `content/{jobs,education}/{en,sr}/`
- **i18n**: i18next + react-i18next, languages: `en`, `sr`. Translations in `src/features/i18n/locales/`
- **AI chat**: TanStack AI with Anthropic/OpenAI/Gemini/Ollama backends, SSE streaming via `/api/resume-chat`
- **Testing**: Vitest + Testing Library
- **Linting**: ESLint (TanStack config) + Prettier

## Build and Test

```bash
npm run dev        # Dev server on :3000
npm run build      # Production build
npm run test       # Vitest
npm run lint       # ESLint
npm run format     # Prettier check
npm run check      # Prettier write + ESLint fix
```

## Architecture

```
src/
  routes/          # TanStack file-based routes (pages + API handlers)
  features/        # Feature modules (i18n, resume, theme, layout)
  shared/ui/       # Reusable UI primitives (badge, card, checkbox, etc.)
content/           # Markdown content collections per language
```

- Feature code is organized by domain under `src/features/`
- Path aliases: `#/*` and `@/*` both map to `./src/*`
- API routes live alongside page routes (e.g., `api.resume-chat.ts`)

## Conventions

- Use `cn()` from `src/shared/utils.ts` for merging Tailwind classes
- UI components use CVA (class-variance-authority) for variants
- Content collections are duplicated per language (`en/`, `sr/`), schemas defined in `content-collections.ts`
- Dark mode uses class strategy (`.dark` on root)
- Strict TypeScript (`strict: true`, no unused locals/params)
- Dev container: Debian bookworm + Node 25 (see `docker/dev/`)
