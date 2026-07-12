import type { ComponentType } from 'react'
import postSourceModules from 'virtual:blog-post-sources'
import type { SupportedLanguage } from '#/features/i18n/languages'
import type { BlogPostDetail, BlogPostSummary, PostMeta } from './types/blog'
import { resolvePostImages } from './postImages'
import { extractTableOfContents } from './tableOfContents'

type MdxModule = {
  default: ComponentType
}

const metaModules = import.meta.glob<{ meta: PostMeta }>(
  '/content/blog/**/meta.ts',
  {
    eager: true,
  },
)

const postModules = import.meta.glob<MdxModule>('/content/blog/**/post.mdx')

function parseContentPath(
  filePath: string,
): { articleFolder: string; locale: SupportedLanguage } | null {
  const match = filePath.match(
    /\/content\/blog\/([^/]+)\/([^/]+)\/(?:meta\.ts|post\.mdx)$/,
  )
  if (!match) return null
  const locale = match[2]
  if (locale !== 'en' && locale !== 'sr') return null
  return { articleFolder: match[1], locale }
}

function buildIndex() {
  const summaryByLocaleSlug = new Map<string, BlogPostSummary>()
  const slugByArticleLocale = new Map<string, string>()
  const postLoaderByLocaleSlug = new Map<string, () => Promise<MdxModule>>()
  const tocByArticleLocale = new Map<
    string,
    BlogPostSummary['tableOfContents']
  >()

  const articleIdByLocaleSlug = new Map<string, string>()
  const slugByArticleIdAndLocale = new Map<
    string,
    Map<SupportedLanguage, string>
  >()

  for (const [filePath, source] of Object.entries(postSourceModules)) {
    const parsed = parseContentPath(filePath)
    if (!parsed) continue
    tocByArticleLocale.set(
      `${parsed.articleFolder}:${parsed.locale}`,
      extractTableOfContents(source),
    )
  }

  for (const [filePath, module] of Object.entries(metaModules)) {
    const parsed = parseContentPath(filePath)
    if (!parsed) continue
    const key = `${parsed.locale}:${module.meta.slug}`

    if (summaryByLocaleSlug.has(key)) {
      throw new Error(
        `Duplicate slug "${module.meta.slug}" for locale "${parsed.locale}" in ${filePath}`,
      )
    }

    const articleLocaleKey = `${parsed.articleFolder}:${parsed.locale}`
    const existingArticleSlug = slugByArticleLocale.get(articleLocaleKey)
    if (existingArticleSlug) {
      throw new Error(
        `Duplicate article/locale combination for ${articleLocaleKey} in ${filePath}`,
      )
    }

    summaryByLocaleSlug.set(key, {
      ...resolvePostImages(module.meta),
      tableOfContents:
        tocByArticleLocale.get(`${parsed.articleFolder}:${parsed.locale}`) ??
        [],
    })
    slugByArticleLocale.set(articleLocaleKey, module.meta.slug)
    articleIdByLocaleSlug.set(key, module.meta.articleId)

    let localeMap = slugByArticleIdAndLocale.get(module.meta.articleId)
    if (!localeMap) {
      localeMap = new Map()
      slugByArticleIdAndLocale.set(module.meta.articleId, localeMap)
    }
    if (localeMap.has(parsed.locale)) {
      throw new Error(
        `Duplicate articleId "${module.meta.articleId}" for locale "${parsed.locale}" in ${filePath}`,
      )
    }
    localeMap.set(parsed.locale, module.meta.slug)
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

  return {
    summaryByLocaleSlug,
    postLoaderByLocaleSlug,
    articleIdByLocaleSlug,
    slugByArticleIdAndLocale,
  }
}

const {
  summaryByLocaleSlug,
  postLoaderByLocaleSlug,
  articleIdByLocaleSlug,
  slugByArticleIdAndLocale,
} = buildIndex()

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

export function getTranslatedBlogSlug(
  articleId: string,
  targetLocale: SupportedLanguage,
): string | undefined {
  return slugByArticleIdAndLocale.get(articleId)?.get(targetLocale)
}

export function getArticleIdBySlug(
  locale: SupportedLanguage,
  slug: string,
): string | undefined {
  return articleIdByLocaleSlug.get(`${locale}:${slug}`)
}

export function getTranslationGroup(
  articleId: string,
): Map<SupportedLanguage, string> | undefined {
  return slugByArticleIdAndLocale.get(articleId)
}

export function getRegistrySlugByArticleIdAndLocale(
  articleId: string,
  locale: SupportedLanguage,
): string | undefined {
  return slugByArticleIdAndLocale.get(articleId)?.get(locale)
}

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
