import type { ComponentType } from 'react'
import type { SupportedLanguage } from '#/features/i18n/languages'
import type { BlogPostDetail, BlogPostSummary, PostMeta } from './types/blog'

// Eagerly loaded meta modules - keyed by path like "/content/blog/en/my-post/meta.ts"
const metaModules = import.meta.glob<{ meta: PostMeta }>(
  '/content/blog/**/meta.ts',
  { eager: true },
)

// Eagerly loaded MDX components
const postModules = import.meta.glob<{ default: ComponentType }>(
  '/content/blog/**/post.mdx',
  { eager: true },
)

function parseLocaleSlug(
  filePath: string,
): { locale: SupportedLanguage; slug: string } | null {
  // Path format: /content/blog/{locale}/{slug}/meta.ts or post.mdx
  const match = filePath.match(
    /\/content\/blog\/([^/]+)\/([^/]+)\/(?:meta\.ts|post\.mdx)$/,
  )
  if (!match) return null
  return { locale: match[1] as SupportedLanguage, slug: match[2] }
}

function buildIndex() {
  const summaryByLocaleSlug = new Map<string, BlogPostSummary>()
  const contentByLocaleSlug = new Map<string, BlogPostDetail['content']>()

  for (const [filePath, module] of Object.entries(metaModules)) {
    const parsed = parseLocaleSlug(filePath)
    if (!parsed) continue
    const key = `${parsed.locale}:${parsed.slug}`
    summaryByLocaleSlug.set(key, module.meta)
  }

  for (const [filePath, module] of Object.entries(postModules)) {
    const parsed = parseLocaleSlug(filePath)
    if (!parsed) continue
    const key = `${parsed.locale}:${parsed.slug}`
    contentByLocaleSlug.set(key, {
      format: 'compiled-mdx',
      Component: module.default,
    })
  }

  return { summaryByLocaleSlug, contentByLocaleSlug }
}

const { summaryByLocaleSlug, contentByLocaleSlug } = buildIndex()

export function getRegistryBlogPostSummaries(
  locale: SupportedLanguage,
): BlogPostSummary[] {
  return Array.from(summaryByLocaleSlug.entries())
    .filter(([key]) => key.startsWith(`${locale}:`))
    .map(([, summary]) => summary)
    .sort((a, b) => {
      const publishedDateSort =
        Date.parse(b.publishedDate) - Date.parse(a.publishedDate)
      if (publishedDateSort !== 0) {
        return publishedDateSort
      }

      return a.slug.localeCompare(b.slug)
    })
}

export function getRegistryBlogPost(
  locale: SupportedLanguage,
  slug: string,
): BlogPostDetail | undefined {
  const key = `${locale}:${slug}`
  const summary = summaryByLocaleSlug.get(key)
  const content = contentByLocaleSlug.get(key)

  if (!summary || !content) {
    return undefined
  }

  return { ...summary, content }
}

// Backward-compatible exports kept during refactor.
export function getAllPostMetas(locale: SupportedLanguage): PostMeta[] {
  return getRegistryBlogPostSummaries(locale)
}

export function getPostMeta(
  locale: SupportedLanguage,
  slug: string,
): PostMeta | undefined {
  return summaryByLocaleSlug.get(`${locale}:${slug}`)
}

export function getPostComponent(
  locale: SupportedLanguage,
  slug: string,
): ComponentType | undefined {
  const content = contentByLocaleSlug.get(`${locale}:${slug}`)
  if (!content || content.format !== 'compiled-mdx') {
    return undefined
  }

  return content.Component
}
