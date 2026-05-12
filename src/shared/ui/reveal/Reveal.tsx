import { cn } from '#/shared/utils'
import type { RevealProps } from './reveal.types'
import { DEFAULT_REVEAL_DURATION, buildRevealClassName } from './reveal.utils'
import { useRevealOnView } from './useRevealOnView'

export function Reveal({
  className,
  delayMs,
  direction = 'bottom',
  disabled = false,
  duration = DEFAULT_REVEAL_DURATION,
  once = true,
  rootMargin,
  style,
  threshold,
  ...props
}: RevealProps) {
  const { ref, isVisible } = useRevealOnView<HTMLDivElement>({
    disabled,
    once,
    rootMargin,
    threshold,
  })

  return (
    <div
      ref={ref}
      className={cn(
        buildRevealClassName(direction, isVisible, duration),
        className,
      )}
      style={
        delayMs != null ? { ...style, transitionDelay: `${delayMs}ms` } : style
      }
      {...props}
    />
  )
}
