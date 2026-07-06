import type { BlogPostSummary } from '../types/blog'
import { cn } from '#/shared/utils'

export type BlogTableOfContentsProps = {
  className?: string
  items: BlogPostSummary['tableOfContents']
  locale: BlogPostSummary['locale']
}

export function BlogTableOfContents({
  className,
  items,
  locale,
}: BlogTableOfContentsProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <nav
      aria-label={locale === 'sr' ? 'Sadržaj' : 'Table of contents'}
      className={cn(
        'border-l border-slate-200 pl-5 dark:border-slate-800 lg:sticky lg:top-28',
        className,
      )}
    >
      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        {locale === 'sr' ? 'Sadržaj' : 'Table of Contents'}
      </h2>
      <ol className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              className={cn(
                'block text-sm leading-5 text-slate-600 transition-colors hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-300',
                item.level === 3 && 'pl-4',
              )}
              href={`#${item.id}`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
