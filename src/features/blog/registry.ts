import type { ComponentType } from 'react'
import type { SupportedLanguage } from '#/features/i18n/languages'
import type { PostMeta } from './types/blog'

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
  // Path format: /content/blog/{locale}/{slug}/meta.ts
  const match = filePath.match(/\/content\/blog\/([^/]+)\/([^/]+)\/meta\.ts$/)
  if (!match) return null
  return { locale: match[1] as SupportedLanguage, slug: match[2] }
}

function buildIndex() {
  const metaByLocaleSlug = new Map<string, PostMeta>()
  const componentByLocaleSlug = new Map<string, ComponentType>()

  for (const [filePath, module] of Object.entries(metaModules)) {
    const parsed = parseLocaleSlug(filePath)
    if (!parsed) continue
    const key = `${parsed.locale}:${parsed.slug}`
    metaByLocaleSlug.set(key, module.meta)
  }

  for (const [filePath, module] of Object.entries(postModules)) {
    const match = filePath.match(
      /\/content\/blog\/([^/]+)\/([^/]+)\/post\.mdx$/,
    )
    if (!match) continue
    const key = `${match[1]}:${match[2]}`
    componentByLocaleSlug.set(key, module.default)
  }

  return { metaByLocaleSlug, componentByLocaleSlug }
}

const { metaByLocaleSlug, componentByLocaleSlug } = buildIndex()

export function getAllPostMetas(locale: SupportedLanguage): PostMeta[] {
  return Array.from(metaByLocaleSlug.entries())
    .filter(([key]) => key.startsWith(`${locale}:`))
    .map(([, meta]) => meta)
    .sort((a, b) => {
      const publishedDateSort =
        Date.parse(b.publishedDate) - Date.parse(a.publishedDate)
      if (publishedDateSort !== 0) {
        return publishedDateSort
      }

      return a.slug.localeCompare(b.slug)
    })
}

export function getPostMeta(
  locale: SupportedLanguage,
  slug: string,
): PostMeta | undefined {
  return metaByLocaleSlug.get(`${locale}:${slug}`)
}

export function getPostComponent(
  locale: SupportedLanguage,
  slug: string,
): ComponentType | undefined {
  return componentByLocaleSlug.get(`${locale}:${slug}`)
}
