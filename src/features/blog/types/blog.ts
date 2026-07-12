import type { SupportedLanguage } from '#/features/i18n/languages'

export type ImageFit = 'cover' | 'contain' | 'fill' | 'scale-down' | 'none'

export type ImagePosition =
  | 'left top'
  | 'center top'
  | 'right top'
  | 'left center'
  | 'center'
  | 'right center'
  | 'left bottom'
  | 'center bottom'
  | 'right bottom'
  | (string & {})

export interface BlogImageContent {
  src: string
  alt: string
  fit?: ImageFit
  position?: ImagePosition
  bgColor?: string
  padding?: string
  aspectRatio?: string
  rounded?: boolean
  zoomable?: boolean
}

export interface BlogFaqItem {
  question: string
  answer: string
}

export interface BlogTableOfContentsItem {
  id: string
  title: string
  level: 2 | 3
}

export interface BlogPostMeta {
  articleId: string
  slug: string
  locale: SupportedLanguage
  title: string
  summary: string
  publishedDate: string
  author: string
  authorUrl?: string
  showTableOfContents?: boolean
  tags: string[]
  heroImage?: BlogImageContent
  coverImage?: BlogImageContent
  socialImage?: BlogImageContent
  faqItems?: BlogFaqItem[]
}

export interface BlogPostSummary extends Omit<
  BlogPostMeta,
  'heroImage' | 'coverImage' | 'socialImage'
> {
  heroImage: BlogImageContent
  coverImage: BlogImageContent
  socialImage: BlogImageContent
  tableOfContents: BlogTableOfContentsItem[]
}

export type BlogPostCollection = 'blog'

export type BlogPostContent =
  | {
      format: 'compiled-mdx'
      collection: BlogPostCollection
      locale: SupportedLanguage
      slug: string
    }
  | {
      format: 'markdown-blocks'
      body: string
    }

export interface BlogPostDetail extends BlogPostSummary {
  content: BlogPostContent
}

export type PostMeta = BlogPostMeta
