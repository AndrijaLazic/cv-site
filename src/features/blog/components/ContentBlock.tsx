import type React from 'react'
import { cn } from '#/shared/utils'
import { createHeadingId } from '../tableOfContents'

export type ContentBlockProps = {
  id?: string
  title?: string
  className?: string
  children: React.ReactNode
}

export function ContentBlock({
  id,
  title,
  className,
  children,
}: ContentBlockProps) {
  const sectionId = id ?? (title ? createHeadingId(title) : undefined)

  return (
    <section
      id={sectionId}
      className={cn(
        'my-12 scroll-mt-28 border-t border-(--article-line) pt-8 first:mt-0 first:border-t-0 first:pt-0',
        className,
      )}
    >
      {title && (
        <h2 className="mb-4 text-2xl font-semibold leading-tight tracking-[-0.025em] text-(--article-ink)">
          {title}
        </h2>
      )}
      {children}
    </section>
  )
}
