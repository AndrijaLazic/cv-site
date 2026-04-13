import type { ReactNode } from 'react'
import { cn } from '#/shared/utils'

type SectionProps = {
  id?: string
  title?: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, children, className }: SectionProps) {
  const sectionId = id ?? (title ? slugify(title) : undefined)

  return (
    <section id={sectionId} className={cn('scroll-mt-24 space-y-3', className)}>
      {title ? (
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
          {title}
        </h3>
      ) : null}
      <div className="space-y-2">{children}</div>
    </section>
  )
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
