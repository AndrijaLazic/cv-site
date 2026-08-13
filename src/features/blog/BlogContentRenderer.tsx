import { lazy, Suspense, useMemo } from 'react'
import { loadBlogPostComponent } from './api'
import { MdxRenderer } from './MdxRenderer'
import type { BlogPostContent } from './types/blog'

type BlogContentRendererProps = {
  content: BlogPostContent
}

function MdxLoadingState() {
  return (
    <div className="space-y-4 py-2" role="status" aria-label="Loading article content">
      <div className="h-5 w-full animate-pulse bg-(--article-loading)" />
      <div className="h-5 w-11/12 animate-pulse bg-(--article-loading)" />
      <div className="h-5 w-4/5 animate-pulse bg-(--article-loading)" />
    </div>
  )
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

        return { default: Component ?? EmptyMdxContent }
      }),
    [content.locale, content.slug],
  )

  return (
    <Suspense fallback={<MdxLoadingState />}>
      <MdxRenderer Component={MdxComponent} />
    </Suspense>
  )
}

function EmptyMdxContent() {
  return null
}

export function BlogContentRenderer({ content }: BlogContentRendererProps) {
  if (content.format === 'compiled-mdx') {
    return <CompiledMdxRenderer content={content} />
  }

  // Markdown blocks are reserved for a future CMS-backed adapter.
  return null
}
