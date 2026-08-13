import { Info, Lightbulb, OctagonX, TriangleAlert } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '#/shared/utils'

type CalloutProps = {
  type?: 'info' | 'warning' | 'tip' | 'danger'
  title?: string
  children: ReactNode
}

const config = {
  info: {
    icon: Info,
    classes: 'border-(--article-primary) bg-(--article-primary-soft) text-(--article-ink)',
  },
  tip: {
    icon: Lightbulb,
    classes: 'border-(--article-accent) bg-(--article-accent-soft) text-(--article-ink)',
  },
  warning: {
    icon: TriangleAlert,
    classes: 'border-(--article-warning) bg-(--article-warning-soft) text-(--article-ink)',
  },
  danger: {
    icon: OctagonX,
    classes: 'border-(--article-danger) bg-(--article-danger-soft) text-(--article-ink)',
  },
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const { icon: Icon, classes } = config[type]

  return (
    <div
      className={cn(
        'my-7 border border-l-2 px-4 py-4 text-sm leading-6',
        classes,
      )}
    >
      <div className="flex items-center gap-2">
        <Icon className="size-4 shrink-0" aria-hidden="true" />
        {title && <span className="font-semibold">{title}</span>}
      </div>
      <div className="mt-1 max-w-none text-current [&_p]:my-2 [&_a]:text-current [&_a]:decoration-current">
        {children}
      </div>
    </div>
  )
}
