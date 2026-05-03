// Reveal setup:
// 1. Use <RevealSection> for the common section reveal.
// 2. Use useRevealOnFirstView() + getRevealClassName() for custom elements.
// The hook observes one element with IntersectionObserver and marks it visible
// the first time it enters the viewport. The default animation fades in from
// below, then settles upward into place. Reduced-motion users see it immediately.
import type { ComponentPropsWithoutRef } from 'react'
import { useEffect, useRef, useState } from 'react'

type RevealClassName = string | false | null | undefined

export type UseRevealOnFirstViewOptions = {
  disabled?: boolean
  initialVisible?: boolean
  rootMargin?: string
  threshold?: number
}

export type RevealClassNameOptions = {
  durationClassName?: string
}

export type RevealSectionProps = ComponentPropsWithoutRef<'section'> &
  UseRevealOnFirstViewOptions & {
    durationClassName?: string
    visibleClassName?: string
  }

const defaultRevealClassName =
  'translate-y-12 opacity-0 transition-[opacity,translate] ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100'

const defaultDurationClassName = 'duration-700'
const defaultVisibleClassName = 'translate-y-0 opacity-100'

function joinClassNames(...classNames: RevealClassName[]) {
  return classNames.filter(Boolean).join(' ')
}

export function useRevealOnFirstView<
  TElement extends HTMLElement = HTMLElement,
>({
  disabled = false,
  initialVisible = false,
  rootMargin = '0px 0px -12% 0px',
  threshold = 0.12,
}: UseRevealOnFirstViewOptions = {}) {
  const elementRef = useRef<TElement | null>(null)
  const [isVisible, setIsVisible] = useState(initialVisible || disabled)

  useEffect(() => {
    if (disabled || isVisible) {
      return
    }

    const element = elementRef.current

    if (!element) {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        setIsVisible(true)
        observer.unobserve(entry.target)
      },
      { rootMargin, threshold },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [disabled, isVisible, rootMargin, threshold])

  return { elementRef, isVisible }
}

export function getRevealClassName(
  className?: string,
  { durationClassName = defaultDurationClassName }: RevealClassNameOptions = {},
) {
  return joinClassNames(defaultRevealClassName, durationClassName, className)
}

export function RevealSection({
  className,
  disabled,
  durationClassName,
  initialVisible,
  rootMargin,
  threshold,
  visibleClassName = defaultVisibleClassName,
  ...props
}: RevealSectionProps) {
  const { elementRef, isVisible } = useRevealOnFirstView({
    disabled,
    initialVisible,
    rootMargin,
    threshold,
  })

  return (
    <section
      ref={elementRef}
      className={joinClassNames(
        getRevealClassName(className, { durationClassName }),
        isVisible && visibleClassName,
      )}
      {...props}
    />
  )
}
