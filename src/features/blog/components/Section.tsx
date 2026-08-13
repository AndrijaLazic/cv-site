import type { ReactNode } from 'react'
import { cn } from '#/shared/utils'
import { createHeadingId } from '../tableOfContents'

type SectionProps = {
  id?: string
  title?: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, children, className }: SectionProps) {
  const sectionId = id ?? (title ? createHeadingId(title) : undefined)

  return (
    <section id={sectionId} className={cn('scroll-mt-28 space-y-3', className)}>
      {title ? (
        <h3 className="text-xl font-semibold leading-snug tracking-[-0.015em] text-(--article-ink)">
          {title}
        </h3>
      ) : null}
      <div className="space-y-2">{children}</div>
    </section>
  )
}
