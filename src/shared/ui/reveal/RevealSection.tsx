import { cn } from '#/shared/utils'
import type { RevealSectionProps } from './reveal.types'
import { DEFAULT_REVEAL_DURATION, buildRevealClassName } from './reveal.utils'
import { useRevealOnView } from './useRevealOnView'

export function RevealSection({
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
}: RevealSectionProps) {
  const { ref, isVisible } = useRevealOnView<HTMLElement>({
    disabled,
    once,
    rootMargin,
    threshold,
  })

  return (
    <section
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
