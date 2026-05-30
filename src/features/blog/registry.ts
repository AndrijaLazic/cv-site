import type { ComponentType } from 'react'
import type { SupportedLanguage } from '#/app/i18n/languages'
import type { BlogPostDetail, BlogPostSummary, PostMeta } from './types/blog'
import { resolvePostImages } from './postImages'

type MdxModule = {
  default: ComponentType
}

// Metadata is eagerly loaded so SEO head generation and sitemap data stay synchronous.
const metaModules = import.meta.glob<{ meta: PostMeta }>(
  '/content/blog/**/meta.ts',
  {
    eager: true,
  },
)

// Post content modules stay lazy and are loaded only when a blog post route requests them.
const postModules = import.meta.glob<MdxModule>('/content/blog/**/post.mdx')

function parseContentPath(
  filePath: string,
): { articleFolder: string; locale: SupportedLanguage } | null {
  const match = filePath.match(
    /\/content\/blog\/([^/]+)\/([^/]+)\/(?:meta\.ts|post\.mdx)$/,
  )
  if (!match) return null
  return { articleFolder: match[1], locale: match[2] as SupportedLanguage }
}

function buildIndex() {
  const summaryByLocaleSlug = new Map<string, BlogPostSummary>()
  const slugByArticleLocale = new Map<string, string>()
  const postLoaderByLocaleSlug = new Map<string, () => Promise<MdxModule>>()

  for (const [filePath, module] of Object.entries(metaModules)) {
    const parsed = parseContentPath(filePath)
    if (!parsed) continue
    const key = `${parsed.locale}:${module.meta.slug}`
    summaryByLocaleSlug.set(key, resolvePostImages(module.meta))
    slugByArticleLocale.set(
      `${parsed.articleFolder}:${parsed.locale}`,
      module.meta.slug,
    )
  }

  for (const [filePath, loadModule] of Object.entries(postModules)) {
    const parsed = parseContentPath(filePath)
    if (!parsed) continue
    const slug = slugByArticleLocale.get(
      `${parsed.articleFolder}:${parsed.locale}`,
    )
    if (!slug) continue
    const key = `${parsed.locale}:${slug}`
    postLoaderByLocaleSlug.set(key, loadModule)
  }

  return { summaryByLocaleSlug, postLoaderByLocaleSlug }
}

const { summaryByLocaleSlug, postLoaderByLocaleSlug } = buildIndex()

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

export function getRegistryBlogPostMeta(
  locale: SupportedLanguage,
  slug: string,
): BlogPostSummary | undefined {
  return summaryByLocaleSlug.get(`${locale}:${slug}`)
}

export async function loadRegistryBlogPost(
  locale: SupportedLanguage,
  slug: string,
): Promise<BlogPostDetail | undefined> {
  const key = `${locale}:${slug}`
  const summary = summaryByLocaleSlug.get(key)
  const loadModule = postLoaderByLocaleSlug.get(key)

  if (!summary || !loadModule) {
    return undefined
  }

  return {
    ...summary,
    content: {
      format: 'compiled-mdx',
      collection: 'blog',
      locale,
      slug,
    },
  }
}

// Backward-compatible exports kept during refactor.
export function getAllPostMetas(locale: SupportedLanguage): PostMeta[] {
  return getRegistryBlogPostSummaries(locale)
}

export function getPostMeta(
  locale: SupportedLanguage,
  slug: string,
): PostMeta | undefined {
  return getRegistryBlogPostMeta(locale, slug)
}

export async function getPostComponent(
  locale: SupportedLanguage,
  slug: string,
): Promise<ComponentType | undefined> {
  const loadModule = postLoaderByLocaleSlug.get(`${locale}:${slug}`)
  if (!loadModule) {
    return undefined
  }

  const module = await loadModule()
  return module.default
}
