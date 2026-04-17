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
  aspectRatio?: string
  rounded?: boolean
}

export interface BlogPostMeta {
  slug: string
  locale: SupportedLanguage
  title: string
  summary: string
  publishedDate: string
  author: string
  tags: string[]
  coverImage?: BlogImageContent
}

export type PostMeta = BlogPostMeta
