import type { SupportedLanguage } from '#/features/i18n/languages'

export type PostMeta = {
  slug: string
  locale: SupportedLanguage
  title: string
  summary: string
  publishedDate: string
  coverImage?: string
  tags: string[]
}
