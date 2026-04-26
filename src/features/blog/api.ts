import type { SupportedLanguage } from '#/features/i18n/languages'
import type { BlogPostDetail, BlogPostSummary } from './types/blog'
import { getRegistryBlogPost, getRegistryBlogPostSummaries } from './registry'

export function getBlogPostSummaries(
  locale: SupportedLanguage,
): BlogPostSummary[] {
  return getRegistryBlogPostSummaries(locale)
}

export function getBlogPost(
  locale: SupportedLanguage,
  slug: string,
): BlogPostDetail | undefined {
  return getRegistryBlogPost(locale, slug)
}
