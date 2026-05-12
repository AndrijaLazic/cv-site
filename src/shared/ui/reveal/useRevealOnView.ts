import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'
import type { UseRevealOnViewOptions } from './reveal.types'

export function useRevealOnView<TElement extends HTMLElement = HTMLElement>({
  disabled = false,
  once = true,
  rootMargin = '0px 0px -10% 0px',
  threshold = 0.1,
}: UseRevealOnViewOptions = {}): {
  ref: RefObject<TElement | null>
  isVisible: boolean
} {
  const ref = useRef<TElement | null>(null)
  const [isVisible, setIsVisible] = useState(disabled)

  useEffect(() => {
    if (disabled) {
      setIsVisible(true)
      return
    }

    const element = ref.current

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
        if (entry.isIntersecting) {
          setIsVisible(true)

          if (once) {
            observer.unobserve(entry.target)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [disabled, once, rootMargin, threshold])

  useEffect(() => {
    if (!disabled) {
      setIsVisible(false)
    }
  }, [disabled])

  return { ref, isVisible }
}
