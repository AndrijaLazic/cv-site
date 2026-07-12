import type { SupportedLanguage } from '#/features/i18n/languages'
import type { ComponentType } from 'react'
import type { BlogPostDetail, BlogPostSummary } from './types/blog'
import {
  getPostComponent,
  getRegistryBlogPostMeta,
  getRegistryBlogPostSummaries,
  loadRegistryBlogPost,
  getTranslatedBlogSlug,
  getArticleIdBySlug,
  getTranslationGroup,
} from './registry'

export function getBlogPostSummaries(
  locale: SupportedLanguage,
): BlogPostSummary[] {
  return getRegistryBlogPostSummaries(locale)
}

export function getBlogPostMeta(
  locale: SupportedLanguage,
  slug: string,
): BlogPostSummary | undefined {
  return getRegistryBlogPostMeta(locale, slug)
}

export async function loadBlogPost(
  locale: SupportedLanguage,
  slug: string,
): Promise<BlogPostDetail | undefined> {
  return loadRegistryBlogPost(locale, slug)
}

export async function loadBlogPostComponent(
  locale: SupportedLanguage,
  slug: string,
): Promise<ComponentType | undefined> {
  return getPostComponent(locale, slug)
}

export { getTranslatedBlogSlug, getArticleIdBySlug, getTranslationGroup }
