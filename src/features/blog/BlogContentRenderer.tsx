import { lazy, Suspense, useMemo } from 'react'
import { loadBlogPostComponent } from './api'
import { MdxRenderer } from './MdxRenderer'
import type { BlogPostContent } from './types/blog'

type BlogContentRendererProps = {
  content: BlogPostContent
}

function MissingMdxContent() {
  return null
}

function CompiledMdxRenderer({
  content,
}: {
  content: Extract<BlogPostContent, { format: 'compiled-mdx' }>
}) {
  const MdxComponent = useMemo(
    () =>
      lazy(async () => {
        const Component = await loadBlogPostComponent(
          content.locale,
          content.slug,
        )

        return { default: Component ?? MissingMdxContent }
      }),
    [content.locale, content.slug],
  )

  return (
    <Suspense fallback={null}>
      <MdxRenderer Component={MdxComponent} />
    </Suspense>
  )
}

export function BlogContentRenderer({ content }: BlogContentRendererProps) {
  if (content.format === 'compiled-mdx') {
    return <CompiledMdxRenderer content={content} />
  }

  // Markdown blocks are reserved for a future CMS-backed adapter.
  return null
}
