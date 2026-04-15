import type React from 'react'
import { cn } from '#/shared/utils'

export type ContentBlockProps = {
  title?: string
  className?: string
  children: React.ReactNode
}

export function ContentBlock({
  title,
  className,
  children,
}: ContentBlockProps) {
  return (
    <div
      className={cn(
        'my-8 rounded-xl border border-slate-200/85 bg-white/80 px-5 py-4 shadow-md backdrop-blur-sm dark:border-slate-700/75 dark:bg-slate-900/70 sm:px-6 sm:py-5',
        className,
      )}
    >
      {title && (
        <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}
