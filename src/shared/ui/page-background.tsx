import type { ReactNode } from 'react'
import { cn } from '#/shared/utils'

export const pageBackgroundClassName =
  'relative overflow-x-clip bg-[radial-gradient(circle_at_16%_10%,rgba(14,165,233,0.18),transparent_28%),radial-gradient(circle_at_88%_38%,rgba(99,102,241,0.12),transparent_32%),radial-gradient(circle_at_18%_78%,rgba(20,184,166,0.11),transparent_30%),linear-gradient(135deg,rgb(248,250,252),rgb(236,254,255)_42%,rgb(238,242,255))] dark:bg-[radial-gradient(circle_at_16%_10%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_88%_38%,rgba(129,140,248,0.13),transparent_34%),radial-gradient(circle_at_18%_78%,rgba(45,212,191,0.09),transparent_32%),linear-gradient(135deg,rgb(2,6,23),rgb(8,47,73)_46%,rgb(15,23,42))]'

export function PageBackground({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn(pageBackgroundClassName, className)}>
      <PageBackdrop />
      {children}
    </div>
  )
}

export function PageBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/28 blur-3xl dark:bg-cyan-500/22" />
      <div className="absolute top-[24rem] -left-24 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl dark:bg-sky-500/15" />
      <div className="absolute top-[38rem] -right-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/15" />
    </div>
  )
}
