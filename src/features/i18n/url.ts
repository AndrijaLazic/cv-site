import type { SupportedLanguage } from './languages'
import { publicConfig } from '#/shared/config/public-env'
import { defaultLanguage, isSupportedLanguage } from './languages'

export function getLocaleFromPath(path: string): SupportedLanguage {
  const match = path.match(/^\/([a-z]{2})(?:\/|$)/)
  if (match && isSupportedLanguage(match[1])) {
    return match[1]
  }
  return defaultLanguage
}

export function isSrPath(path: string): boolean {
  return getLocaleFromPath(path) === 'sr'
}

export function removeLocalePrefix(path: string): string {
  const match = path.match(/^\/([a-z]{2})(\/|$)/)
  if (match && isSupportedLanguage(match[1])) {
    const rest = path.slice(3)
    return rest || '/'
  }
  return path
}

export function localizePath(path: string, locale: SupportedLanguage): string {
  const cleanPath = removeLocalePrefix(path)
  if (locale === defaultLanguage) return cleanPath
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`
}

export function buildCanonical(
  locale: SupportedLanguage,
  path: string,
): string {
  const siteUrl = publicConfig.siteUrl
  const localized = localizePath(path, locale)
  return `${siteUrl}${localized.replace(/\/+$/, '')}`
}

export function buildHreflangLinks(
  pathByLocale: Partial<Record<SupportedLanguage, string>>,
): Array<{ rel: string; href: string; hrefLang: string }> {
  const siteUrl = publicConfig.siteUrl
  const links: Array<{ rel: string; href: string; hrefLang: string }> = []

  for (const [lang, langPath] of Object.entries(pathByLocale)) {
    if (!langPath) continue
    const localized = localizePath(langPath, lang as SupportedLanguage)
    const href =
      localized === '/'
        ? `${siteUrl}/`
        : `${siteUrl}${localized.replace(/\/+$/, '')}`
    links.push({ rel: 'alternate', href, hrefLang: lang })
  }

  const enPath = pathByLocale[defaultLanguage]
  if (enPath) {
    const href = `${siteUrl}${localizePath(enPath, defaultLanguage).replace(/\/+$/, '')}`
    links.push({ rel: 'alternate', href, hrefLang: 'x-default' })
  }

  return links
}
