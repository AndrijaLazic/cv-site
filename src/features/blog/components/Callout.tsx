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
    classes:
      'border-blue-300/60 bg-blue-50/70 text-blue-900 dark:border-blue-700/50 dark:bg-blue-950/40 dark:text-blue-200',
  },
  tip: {
    icon: Lightbulb,
    classes:
      'border-emerald-300/60 bg-emerald-50/70 text-emerald-900 dark:border-emerald-700/50 dark:bg-emerald-950/40 dark:text-emerald-200',
  },
  warning: {
    icon: TriangleAlert,
    classes:
      'border-amber-300/60 bg-amber-50/70 text-amber-900 dark:border-amber-700/50 dark:bg-amber-950/40 dark:text-amber-200',
  },
  danger: {
    icon: OctagonX,
    classes:
      'border-red-300/60 bg-red-50/70 text-red-900 dark:border-red-800/50 dark:bg-red-950/40 dark:text-red-200',
  },
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const { icon: Icon, classes } = config[type]

  return (
    <div
      className={cn(
        'my-6 rounded-lg border border-l-4 px-4 py-3 text-sm',
        classes,
      )}
    >
      <div className="flex items-center gap-2">
        <Icon className="size-4 shrink-0" />
        {title && <span className="font-semibold">{title}</span>}
      </div>
      <div className="prose prose-sm dark:prose-invert mt-1 max-w-none text-current">
        {children}
      </div>
    </div>
  )
}
