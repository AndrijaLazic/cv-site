# i18n

This folder contains client-side internationalization setup and language switching.

## How it works

- [`config.ts`](./config.ts) initializes `i18next` with `react-i18next` and browser language detection.
- Supported languages are `en` and `sr` (`supportedLanguages`), with `en` as fallback.
- Namespaces are `common` and `resume`, loaded from `locales/{en,sr}/{common,resume}.json`.
- Language detection checks `localStorage` first (`language` key), then browser language.
- Importing `#/features/i18n/config` once (done in the root route) boots i18n for the app.

## Language switcher

- [`LanguageSwitcher.tsx`](./LanguageSwitcher.tsx) reads the active language from `i18n.resolvedLanguage`.
- On change, it calls `i18n.changeLanguage(nextLang)` and updates `<html lang="...">`.
- The selected language is persisted automatically through i18next detection cache (`localStorage`).

## Adding a language

1. Add locale JSON files under `locales/<lang>/`.
2. Extend `supportedLanguages` and `resources` in `config.ts`.
3. Add metadata in `LanguageSwitcher.tsx` (`languageMeta`).
