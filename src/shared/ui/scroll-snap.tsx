// Scroll snap setup:
// 1. Add data-app-header="true" to the sticky header, or define
//    --header-height in CSS as a fallback offset.
// 2. Wrap each target block with <ScrollSnapSection id="...">.
// 3. Call useOneTimeScrollSnap() once in the page component.
// The hook listens for user scroll, waits until scrolling settles, then animates
// to the nearest unsnapped section. Each section snaps only once per page mount.
import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef, useEffect, useRef } from 'react'

type ScrollSnapClassName = string | false | null | undefined

export type ScrollSnapDirection = 'down' | 'both'

export type ScrollSnapSectionProps = ComponentPropsWithoutRef<'section'> & {
  snapOffset?: number
}

export type UseOneTimeScrollSnapOptions = {
  animationDurationMs?: number
  direction?: ScrollSnapDirection
  enabled?: boolean
  headerOffset?: number | (() => number)
  selector?: string
  settleDelayMs?: number
  snapThreshold?: number
}

const scrollSnapSectionAttribute = 'data-scroll-snap-section'
const scrollSnapSectionOffsetAttribute = 'data-scroll-snap-offset'
const appHeaderSelector = '[data-app-header="true"]'

export const scrollSnapSectionSelector = '[data-scroll-snap-section="true"]'

export const scrollSnapContainerClassName =
  'scroll-smooth scroll-pt-[var(--header-height)]'

function joinClassNames(...classNames: ScrollSnapClassName[]) {
  return classNames.filter(Boolean).join(' ')
}

export function getScrollSnapContainerClassName(className?: string) {
  return joinClassNames(
    'h-[calc(100svh-var(--header-height))] overflow-y-auto overflow-x-hidden overscroll-contain scroll-smooth',
    className,
  )
}

export function getScrollSnapSectionClassName(className?: string) {
  return joinClassNames(
    'min-h-[calc(100svh-var(--header-height))] scroll-mt-[var(--header-height)]',
    className,
  )
}

export const ScrollSnapSection = forwardRef<
  HTMLElement,
  ScrollSnapSectionProps
>(function ScrollSnapSectionBase({ className, snapOffset = 5, ...props }, ref) {
  return (
    <section
      ref={ref}
      className={getScrollSnapSectionClassName(className)}
      {...{
        [scrollSnapSectionAttribute]: 'true',
        [scrollSnapSectionOffsetAttribute]: snapOffset,
      }}
      {...props}
    />
  )
})

export const ScrollSnapContainer = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<'div'>
>(function ScrollSnapContainerBase({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={getScrollSnapContainerClassName(className)}
      {...props}
    />
  )
})

export function useOneTimeScrollSnap({
  animationDurationMs = 850,
  direction = 'down',
  enabled = true,
  headerOffset,
  selector = scrollSnapSectionSelector,
  settleDelayMs = 180,
  snapThreshold = 0.42,
}: UseOneTimeScrollSnapOptions = {}) {
  const snappedIdsRef = useRef(new Set<string>())
  const scrollTimeoutRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const isSnappingRef = useRef(false)
  const animationDirectionRef = useRef<'down' | 'up' | null>(null)
  const previousScrollBehaviorRef = useRef<string | null>(null)
  const lastScrollYRef = useRef(0)
  const scrollDirectionRef = useRef<'down' | 'up'>('down')
  const touchStartYRef = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      return
    }

    const getHeaderOffset = () => {
      if (typeof headerOffset === 'function') {
        return headerOffset()
      }

      if (typeof headerOffset === 'number') {
        return headerOffset
      }

      const header = document.querySelector<HTMLElement>(appHeaderSelector)
      const measuredHeaderHeight = header?.getBoundingClientRect().height ?? 0

      if (measuredHeaderHeight > 0) {
        return measuredHeaderHeight
      }

      const value = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--header-height')

      return Number.parseFloat(value) || 0
    }

    const getSectionSnapOffset = (section: HTMLElement) => {
      const value = section.getAttribute(scrollSnapSectionOffsetAttribute)

      if (!value) {
        return 0
      }

      const offset = Number.parseFloat(value)

      return Number.isFinite(offset) ? offset : 0
    }

    const easeInOutCubic = (progress: number) => {
      return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2
    }

    const finishSnapAnimation = () => {
      if (previousScrollBehaviorRef.current != null) {
        document.documentElement.style.scrollBehavior =
          previousScrollBehaviorRef.current
        previousScrollBehaviorRef.current = null
      }

      animationFrameRef.current = null
      animationDirectionRef.current = null
      isSnappingRef.current = false
      lastScrollYRef.current = window.scrollY
    }

    const cancelSnapAnimation = () => {
      if (animationFrameRef.current != null) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }

      finishSnapAnimation()
    }

    const cancelDownwardSnap = () => {
      if (isSnappingRef.current && animationDirectionRef.current === 'down') {
        cancelSnapAnimation()
      }
    }

    const animateScrollTo = (targetTop: number) => {
      const startTop = window.scrollY
      const distance = targetTop - startTop

      if (Math.abs(distance) < 2) {
        window.scrollTo(0, targetTop)
        isSnappingRef.current = false
        return
      }

      const startedAt = performance.now()
      animationDirectionRef.current = distance > 0 ? 'down' : 'up'
      previousScrollBehaviorRef.current =
        document.documentElement.style.scrollBehavior
      document.documentElement.style.scrollBehavior = 'auto'

      const step = (timestamp: number) => {
        const elapsed = timestamp - startedAt
        const progress = Math.min(elapsed / animationDurationMs, 1)
        const easedProgress = easeInOutCubic(progress)

        window.scrollTo(0, startTop + distance * easedProgress)

        if (progress < 1) {
          animationFrameRef.current = window.requestAnimationFrame(step)
          return
        }

        finishSnapAnimation()
      }

      animationFrameRef.current = window.requestAnimationFrame(step)
    }

    lastScrollYRef.current = window.scrollY

    const getNearestUnsnappedSection = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(selector),
      ).filter(
        (section) => section.id && !snappedIdsRef.current.has(section.id),
      )

      if (sections.length === 0) {
        return null
      }

      const headerOffsetPx = getHeaderOffset()
      const threshold = window.innerHeight * snapThreshold
      const scrollDirection = scrollDirectionRef.current

      return sections.reduce<{
        distance: number
        section: HTMLElement
      } | null>((nearest, section) => {
        const snapOffset = getSectionSnapOffset(section)
        const offsetFromSnapPoint =
          section.getBoundingClientRect().top - headerOffsetPx - snapOffset
        const wouldSnapDown = offsetFromSnapPoint > 0

        if (scrollDirection === 'up' && wouldSnapDown) {
          return nearest
        }

        if (scrollDirection === 'down' && offsetFromSnapPoint < 0) {
          return nearest
        }

        const distance = Math.abs(offsetFromSnapPoint)

        if (distance > threshold) {
          return nearest
        }

        if (!nearest || distance < nearest.distance) {
          return { distance, section }
        }

        return nearest
      }, null)?.section
    }

    const snapNearestSection = () => {
      if (isSnappingRef.current) {
        return
      }

      if (direction === 'down' && scrollDirectionRef.current === 'up') {
        return
      }

      const section = getNearestUnsnappedSection()

      if (!section) {
        return
      }

      snappedIdsRef.current.add(section.id)
      isSnappingRef.current = true

      animateScrollTo(
        window.scrollY +
          section.getBoundingClientRect().top -
          getHeaderOffset() -
          getSectionSnapOffset(section),
      )
    }

    const queueSnap = () => {
      if (isSnappingRef.current) {
        return
      }

      const currentScrollY = window.scrollY

      if (currentScrollY !== lastScrollYRef.current) {
        scrollDirectionRef.current =
          currentScrollY > lastScrollYRef.current ? 'down' : 'up'
        lastScrollYRef.current = currentScrollY
      }

      if (scrollTimeoutRef.current != null) {
        window.clearTimeout(scrollTimeoutRef.current)
      }

      if (direction === 'down' && scrollDirectionRef.current === 'up') {
        return
      }

      scrollTimeoutRef.current = window.setTimeout(
        snapNearestSection,
        settleDelayMs,
      )
    }

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY < 0) {
        cancelDownwardSnap()
      }
    }

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches.item(0)
      touchStartYRef.current = touch ? touch.clientY : null
    }

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches.item(0)
      const startY = touchStartYRef.current

      if (!touch || startY == null) {
        return
      }

      if (touch.clientY - startY > 8) {
        cancelDownwardSnap()
      }
    }

    const onTouchEnd = () => {
      touchStartYRef.current = null
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowUp', 'PageUp', 'Home'].includes(event.key)) {
        cancelDownwardSnap()
      }
    }

    window.addEventListener('scroll', queueSnap, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('scroll', queueSnap)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKeyDown)

      if (scrollTimeoutRef.current != null) {
        window.clearTimeout(scrollTimeoutRef.current)
      }

      cancelSnapAnimation()
    }
  }, [
    animationDurationMs,
    direction,
    enabled,
    headerOffset,
    selector,
    settleDelayMs,
    snapThreshold,
  ])
}
