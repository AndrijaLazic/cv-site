import type { ComponentProps, ReactNode } from 'react'

import { cn } from '#/shared/utils'

type CodeTokenVariant =
  | 'keyword'
  | 'identifier'
  | 'property'
  | 'function'
  | 'string'
  | 'punctuation'

const codeTokenColors: Record<CodeTokenVariant, string> = {
  keyword: 'var(--color-primary)',
  identifier: 'var(--color-text)',
  property: 'var(--color-accent)',
  function: 'var(--color-accent)',
  string: 'oklch(0.74 0.16 55)',
  punctuation: 'var(--color-muted)',
}

function CodeSnippet({ className, children, ...props }: ComponentProps<'pre'>) {
  return (
    <pre
      className={cn(
        'select-none overflow-hidden font-mono text-[0.6rem] leading-relaxed',
        className,
      )}
      {...props}
    >
      <code>{children}</code>
    </pre>
  )
}

function CodeLine({
  number,
  children,
  className,
}: {
  number: number
  children?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex gap-2', className)}>
      <span
        className="select-none"
        style={{
          color: 'var(--color-muted)',
          opacity: 0.45,
          minWidth: '0.75rem',
        }}
      >
        {number}
      </span>
      <span>{children}</span>
    </div>
  )
}

function CodeToken({
  variant,
  children,
}: {
  variant: CodeTokenVariant
  children: ReactNode
}) {
  return <span style={{ color: codeTokenColors[variant] }}>{children}</span>
}

export { CodeLine, CodeSnippet, CodeToken }
export type { CodeTokenVariant }
