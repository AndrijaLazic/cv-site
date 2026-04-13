import React from 'react'
import type { ReactNode } from 'react'
import { cn } from '#/shared/utils'

type TwoColumnProps = {
  children: ReactNode
  className?: string
}

export function TwoColumn({ children, className }: TwoColumnProps) {
  const childArray = React.Children.toArray(children)
  const left = childArray[0]
  const right = childArray[1]

  return (
    <div
      className={cn('my-6 grid grid-cols-1 gap-4 sm:grid-cols-2', className)}
    >
      <div className="space-y-2">{left}</div>
      <div className="space-y-2">{right}</div>
    </div>
  )
}
