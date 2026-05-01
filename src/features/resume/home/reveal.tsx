import type { ComponentPropsWithoutRef } from 'react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '#/shared/utils'

export function useRevealOnFirstView() {
  const elementRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
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
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return { elementRef, isVisible }
}

export function getRevealClassName(className?: string) {
  return cn(
    'translate-y-8 opacity-0 transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100',
    className,
  )
}

export function AnimatedSection({
  className,
  ...props
}: ComponentPropsWithoutRef<'section'>) {
  const { elementRef, isVisible } = useRevealOnFirstView()

  return (
    <section
      ref={elementRef}
      className={cn(
        getRevealClassName(className),
        isVisible && 'translate-y-0 opacity-100',
      )}
      {...props}
    />
  )
}
