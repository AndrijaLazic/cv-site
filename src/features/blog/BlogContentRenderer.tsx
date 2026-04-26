import { MdxRenderer } from './MdxRenderer'
import type { BlogPostContent } from './types/blog'

type BlogContentRendererProps = {
  content: BlogPostContent
}

export function BlogContentRenderer({ content }: BlogContentRendererProps) {
  if (content.format === 'compiled-mdx') {
    return <MdxRenderer Component={content.Component} />
  }

  // Markdown blocks are reserved for a future CMS-backed adapter.
  return null
}
