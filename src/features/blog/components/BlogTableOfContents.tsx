import type { BlogPostSummary } from '../types/blog'
import { cn } from '#/shared/utils'

export type BlogTableOfContentsProps = {
  className?: string
  compact?: boolean
  items: BlogPostSummary['tableOfContents']
  locale: BlogPostSummary['locale']
}

export function BlogTableOfContents({
  className,
  compact = false,
  items,
  locale,
}: BlogTableOfContentsProps) {
  if (items.length === 0) {
    return null
  }

  const links = (
    <ol className="mt-3 space-y-1.5">
      {items.map((item, index) => (
        <li key={item.id}>
          <a
            className={cn(
              'group flex gap-2 rounded-sm py-1 text-sm leading-5 text-(--article-muted) transition-colors hover:text-(--article-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--article-focus)',
              item.level === 3 && 'pl-4',
            )}
            href={`#${item.id}`}
          >
            <span className="font-mono text-[0.65rem] text-(--article-faint) group-hover:text-(--article-accent)" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>{item.title}</span>
          </a>
        </li>
      ))}
    </ol>
  )

  if (compact) {
    return (
      <details className={cn('border border-(--article-line) bg-(--article-surface)', className)}>
        <summary className="flex min-h-11 cursor-pointer items-center px-4 font-mono text-xs font-semibold tracking-[0.12em] text-(--article-ink) uppercase marker:text-(--article-primary) focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-(--article-focus)">
          {locale === 'sr' ? 'Sadržaj' : 'Table of Contents'}
        </summary>
        <nav aria-label={locale === 'sr' ? 'Sadržaj' : 'Table of contents'} className="border-t border-(--article-line) px-4 pb-4">
          {links}
        </nav>
      </details>
    )
  }

  return (
    <nav
      aria-label={locale === 'sr' ? 'Sadržaj' : 'Table of contents'}
      className={cn(
        'border-l border-(--article-line) pl-5 lg:sticky lg:top-28',
        className,
      )}
    >
      <h2 className="font-mono text-[0.68rem] font-semibold tracking-[0.16em] text-(--article-muted) uppercase">
        {locale === 'sr' ? 'Sadržaj' : 'Table of Contents'}
      </h2>
      {links}
    </nav>
  )
}
