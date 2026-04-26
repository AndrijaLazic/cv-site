import type { ComponentType } from 'react'
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

export type BlogPostSummary = BlogPostMeta

export type BlogPostContent =
  | {
      format: 'compiled-mdx'
      Component: ComponentType
    }
  | {
      format: 'markdown-blocks'
      body: string
    }

export interface BlogPostDetail extends BlogPostSummary {
  content: BlogPostContent
}

export type PostMeta = BlogPostSummary
