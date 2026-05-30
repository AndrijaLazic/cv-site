import type { SupportedLanguage } from '#/app/i18n/languages'

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

export interface BlogPostMeta {
  slug: string
  locale: SupportedLanguage
  title: string
  summary: string
  publishedDate: string
  author: string
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
