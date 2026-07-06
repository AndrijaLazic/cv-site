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
        'my-11 scroll-mt-28 border-t border-slate-200/80 pt-8 first:mt-0 first:border-t-0 first:pt-0 dark:border-slate-800',
        className,
      )}
    >
      {title && (
        <h2 className="mb-4 text-2xl font-semibold leading-tight text-slate-950 dark:text-slate-50">
          {title}
        </h2>
      )}
      {children}
    </section>
  )
}
