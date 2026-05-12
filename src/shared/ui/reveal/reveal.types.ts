import type { ComponentPropsWithoutRef } from 'react'

/**
 * Direction the element animates in from.
 */
export type RevealDirection = 'top' | 'bottom' | 'left' | 'right' | 'none'

export type UseRevealOnViewOptions = {
  /**
   * Skip the observer and render immediately visible.
   * Use for above-the-fold content or in tests.
   */
  disabled?: boolean
  /**
   * Reveal once and never hide again, or re-hide when scrolled out of view and
   * re-reveal on re-entry.
   */
  once?: boolean
  /**
   * IntersectionObserver rootMargin. Negative bottom shrinks the trigger zone,
   * making reveals start later.
   */
  rootMargin?: string
  /**
   * Fraction of the element that must be visible before reveal starts.
   */
  threshold?: number
}

export type RevealOptions = UseRevealOnViewOptions & {
  /** Animation direction. Default: 'bottom'. */
  direction?: RevealDirection
  /** Delay before the transition starts, in milliseconds. */
  delayMs?: number
  /** Tailwind duration class. Default: 'duration-700'. */
  duration?: string
}

export type RevealProps = ComponentPropsWithoutRef<'div'> & RevealOptions

export type RevealSectionProps = ComponentPropsWithoutRef<'section'> &
  RevealOptions
