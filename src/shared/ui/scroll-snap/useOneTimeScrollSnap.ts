import { useEffect, useRef, useState } from 'react'
import type {
  UseInitialScrollSnapDisabledOptions,
  UseOneTimeScrollSnapOptions,
} from './scrollSnap.types'
import {
  appHeaderSelector,
  getCssLengthInPx,
  getDocumentTop,
  getPageScrollProgress,
  scrollSnapSectionOffsetAttribute,
  scrollSnapSectionSelector,
  scrollSnapSettledThresholdAttribute,
  scrollSnapSettledThresholdDesktopAttribute,
  scrollSnapSettledThresholdMobileAttribute,
} from './scrollSnap.utils'

// Shared lock across hook instances. If multiple pages/components mount the
// hook during transitions, only one programmatic snap can run at a time.
let sharedSnapLockUntil = 0

// If a section is already within this many pixels of its snap point, treat it as
// aligned. This prevents tiny scroll deltas from repeatedly re-triggering snaps.
const currentSnapPointTolerancePx = 8

// Direct wheel/touch input should be allowed to reach a farther upcoming
// section than a passive "scroll settled" check.
const directInputThresholdMultiplier = 1.35

// Default settled threshold is slightly under one viewport so the assistant only
// completes snaps when the user has clearly moved toward the next section.
const settledSnapThresholdMultiplier = 0.95
const initialScrollSnapDisableProgressThreshold = 0.2
// Client-side navigation keeps this history alive across page mounts.
const visitedPageScrollProgress = new Map<string, number>()

/**
 * Disables initial assisted snapping after the page has already been restored to
 * a meaningful scroll position. This protects browser history restoration and
 * deep scroll reloads from being pulled to the next snap target on mount.
 */
export function useInitialScrollSnapDisabled({
  enabled = true,
  historyKey,
  scrollProgressThreshold = initialScrollSnapDisableProgressThreshold,
}: UseInitialScrollSnapDisabledOptions = {}) {
  const [isDisabled, setIsDisabled] = useState(
    () =>
      enabled &&
      historyKey != null &&
      (visitedPageScrollProgress.get(historyKey) ?? 0) >
        scrollProgressThreshold,
  )

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      return
    }

    // Remember progress for the next visit without interrupting this visit's
    // normal snapping when the user first crosses the threshold.
    const rememberProgress = () => {
      if (historyKey != null) {
        visitedPageScrollProgress.set(
          historyKey,
          Math.max(
            visitedPageScrollProgress.get(historyKey) ?? 0,
            getPageScrollProgress(),
          ),
        )
      }
    }

    const updateDisabled = () => {
      rememberProgress()
      if (getPageScrollProgress() > scrollProgressThreshold) {
        setIsDisabled(true)
      }
    }

    updateDisabled()

    const animationFrameId = window.requestAnimationFrame(updateDisabled)
    const timeoutId = window.setTimeout(updateDisabled, 100)
    window.addEventListener('pageshow', updateDisabled)
    window.addEventListener('load', updateDisabled)
    window.addEventListener('scroll', rememberProgress, { passive: true })

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.clearTimeout(timeoutId)
      window.removeEventListener('pageshow', updateDisabled)
      window.removeEventListener('load', updateDisabled)
      window.removeEventListener('scroll', rememberProgress)
    }
  }, [enabled, historyKey, scrollProgressThreshold])

  return isDisabled
}

/**
 * Adds a small JS assistant on top of native CSS scroll snap.
 *
 * Native snap handles normal browser behavior. This hook adds one-time,
 * section-by-section completion: when the user scrolls close enough to an
 * unsnapped section, the hook animates exactly to that section, then records its
 * id so it will not be auto-snapped again in the same mount.
 */
export function useOneTimeScrollSnap({
  animationDurationMs = 750,
  direction = 'down',
  enabled = true,
  headerOffset,
  selector = scrollSnapSectionSelector,
  settleDelayMs = 0,
  snapCooldownMs = 100,
  snapThreshold = 0.99,
}: UseOneTimeScrollSnapOptions = {}) {
  const snappedIdsRef = useRef(new Set<string>())
  const scrollTimeoutRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const isSnappingRef = useRef(false)
  const previousScrollBehaviorRef = useRef<string | null>(null)
  const animationDirectionRef = useRef<'down' | 'up' | null>(null)
  const lastScrollYRef = useRef(0)
  const scrollDirectionRef = useRef<'down' | 'up'>('down')
  const touchStartYRef = useRef<number | null>(null)
  const touchSnapStartedRef = useRef(false)

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

    // On touch devices the browser's native CSS scroll-snap handles snapping
    // smoothly with full momentum. The JS-assisted snap fights that momentum
    // (via event.preventDefault on touchmove) and produces jerkiness, so we
    // leave it entirely to CSS snap on mobile.
    const isTouchDevice = window.matchMedia(
      '(hover: none) and (pointer: coarse)',
    ).matches

    if (isTouchDevice) {
      return
    }

    // Prefer an explicit offset, otherwise measure the sticky app header and
    // fall back to the CSS --header-height token. The larger value wins because
    // dynamic header layout can exceed the token during responsive states.
    const getHeaderOffset = () => {
      if (typeof headerOffset === 'function') {
        return headerOffset()
      }

      if (typeof headerOffset === 'number') {
        return headerOffset
      }

      const header = document.querySelector<HTMLElement>(appHeaderSelector)
      const measuredHeaderOffset = header
        ? Math.max(0, header.getBoundingClientRect().bottom)
        : 0
      const cssHeaderHeight = getCssLengthInPx(
        window
          .getComputedStyle(document.documentElement)
          .getPropertyValue('--header-height'),
      )

      return Math.max(measuredHeaderOffset, cssHeaderHeight)
    }

    // Per-section offsets allow a target to snap slightly above or below its
    // physical top without changing the section's layout.
    const getSectionSnapOffset = (section: HTMLElement) => {
      const offset = Number.parseFloat(
        section.getAttribute(scrollSnapSectionOffsetAttribute) ?? '',
      )

      return Number.isFinite(offset) ? offset : 0
    }

    const parseSnapThreshold = (value: string | null) => {
      const threshold = Number.parseFloat(value ?? '')

      return Number.isFinite(threshold) && threshold > 0 ? threshold : null
    }

    // Thresholds are viewport-height multipliers. A value of 0.8 means "complete
    // the snap when this target is within 80% of the viewport height."
    const getSectionCustomSettledSnapThreshold = (section: HTMLElement) => {
      const viewportThreshold = parseSnapThreshold(
        section.getAttribute(
          window.matchMedia('(min-width: 768px)').matches
            ? scrollSnapSettledThresholdDesktopAttribute
            : scrollSnapSettledThresholdMobileAttribute,
        ),
      )

      if (viewportThreshold != null) {
        return viewportThreshold
      }

      return parseSnapThreshold(
        section.getAttribute(scrollSnapSettledThresholdAttribute),
      )
    }

    const getSectionSettledSnapThreshold = (section: HTMLElement) => {
      return (
        getSectionCustomSettledSnapThreshold(section) ??
        settledSnapThresholdMultiplier
      )
    }

    // Positive result: target is below the snap point. Negative result: target
    // is above it. Zero means the section is aligned under the header.
    const getSectionOffsetFromSnapPoint = (
      section: HTMLElement,
      headerOffsetPx: number,
    ) => {
      return (
        getDocumentTop(section) -
        window.scrollY -
        headerOffsetPx -
        getSectionSnapOffset(section)
      )
    }

    // Used for direct wheel/touch input. If the current section is already
    // aligned, direct input gets a larger search range so the next section can
    // be selected immediately.
    const isAlignedToSnapPoint = () => {
      const headerOffsetPx = getHeaderOffset()

      return Array.from(document.querySelectorAll<HTMLElement>(selector)).some(
        (section) => {
          return (
            Math.abs(getSectionOffsetFromSnapPoint(section, headerOffsetPx)) <=
            currentSnapPointTolerancePx
          )
        },
      )
    }

    const easeInOutCubic = (progress: number) => {
      return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2
    }

    // Always restore scrollBehavior. The animation uses manual scrollTo calls,
    // so document-level smooth scrolling would otherwise double-ease movement.
    const finishSnapAnimation = () => {
      if (previousScrollBehaviorRef.current != null) {
        document.documentElement.style.scrollBehavior =
          previousScrollBehaviorRef.current
        previousScrollBehaviorRef.current = null
      }

      animationFrameRef.current = null
      animationDirectionRef.current = null
      isSnappingRef.current = false
      sharedSnapLockUntil = performance.now() + snapCooldownMs
      lastScrollYRef.current = window.scrollY
    }

    const cancelSnapAnimation = () => {
      if (animationFrameRef.current != null) {
        window.cancelAnimationFrame(animationFrameRef.current)
        finishSnapAnimation()
        return
      }

      if (isSnappingRef.current) {
        finishSnapAnimation()
      }
    }

    // requestAnimationFrame keeps the animation cancelable, which matters when
    // the user reverses direction while the assisted snap is still running.
    const animateScrollTo = (targetTop: number) => {
      const startTop = window.scrollY
      const distance = targetTop - startTop

      if (Math.abs(distance) < 2) {
        window.scrollTo(0, targetTop)
        finishSnapAnimation()
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

        window.scrollTo(0, startTop + distance * easeInOutCubic(progress))

        if (progress < 1) {
          animationFrameRef.current = window.requestAnimationFrame(step)
          return
        }

        finishSnapAnimation()
      }

      animationFrameRef.current = window.requestAnimationFrame(step)
    }

    // Finds the closest eligible section in the current scroll direction. A
    // section must have an id because ids are how the hook remembers which
    // sections have already received their one-time assisted snap.
    const getNearestUnsnappedSection = (directInput = false) => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(selector),
      ).filter(
        (section) => section.id && !snappedIdsRef.current.has(section.id),
      )

      if (sections.length === 0) {
        return null
      }

      const headerOffsetPx = getHeaderOffset()
      const useDirectInputRange = directInput && isAlignedToSnapPoint()

      return sections.reduce<{
        distance: number
        section: HTMLElement
      } | null>((nearest, section) => {
        const offsetFromSnapPoint = getSectionOffsetFromSnapPoint(
          section,
          headerOffsetPx,
        )

        // For direct wheel/touch input, ignore the currently aligned section and
        // anything behind the user's gesture direction.
        if (
          directInput &&
          scrollDirectionRef.current === 'down' &&
          offsetFromSnapPoint <= currentSnapPointTolerancePx
        ) {
          return nearest
        }

        if (
          directInput &&
          scrollDirectionRef.current === 'up' &&
          offsetFromSnapPoint >= -currentSnapPointTolerancePx
        ) {
          return nearest
        }

        if (scrollDirectionRef.current === 'up' && offsetFromSnapPoint > 0) {
          return nearest
        }

        if (scrollDirectionRef.current === 'down' && offsetFromSnapPoint < 0) {
          return nearest
        }

        const distanceFromSnapPoint = Math.abs(offsetFromSnapPoint)
        const customSettledThreshold =
          getSectionCustomSettledSnapThreshold(section)
        // Direct input normally uses a generous threshold so one wheel/touch
        // gesture can reach the next aligned section. Per-section thresholds
        // cap that reach when a target needs stricter snap timing.
        const thresholdMultiplier = useDirectInputRange
          ? Math.min(
              Math.max(snapThreshold, directInputThresholdMultiplier),
              customSettledThreshold ?? Number.POSITIVE_INFINITY,
            )
          : Math.min(snapThreshold, getSectionSettledSnapThreshold(section))
        const threshold = window.innerHeight * thresholdMultiplier

        if (distanceFromSnapPoint > threshold) {
          return nearest
        }

        if (!nearest || distanceFromSnapPoint < nearest.distance) {
          return { distance: distanceFromSnapPoint, section }
        }

        return nearest
      }, null)?.section
    }

    // Starts the programmatic snap if one eligible target is close enough. The
    // selected id is recorded before animation starts so repeated scroll events
    // during the animation cannot select the same target again.
    const snapNearestSection = (directInput = false) => {
      if (isSnappingRef.current || performance.now() < sharedSnapLockUntil) {
        return false
      }

      if (direction === 'down' && scrollDirectionRef.current === 'up') {
        return false
      }

      const section = getNearestUnsnappedSection(directInput)

      if (!section) {
        return false
      }

      if (scrollTimeoutRef.current != null) {
        window.clearTimeout(scrollTimeoutRef.current)
        scrollTimeoutRef.current = null
      }

      snappedIdsRef.current.add(section.id)
      isSnappingRef.current = true
      sharedSnapLockUntil = Number.POSITIVE_INFINITY

      animateScrollTo(
        getDocumentTop(section) -
          getHeaderOffset() -
          getSectionSnapOffset(section),
      )

      return true
    }

    // Passive scroll events are debounced. Once the user stops near a snap
    // target, the assistant completes the snap if it is within threshold.
    const queueSnap = () => {
      if (isSnappingRef.current || performance.now() < sharedSnapLockUntil) {
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

    // Upward wheel/touch/key input cancels a downward assisted animation so the
    // user keeps control if they reverse direction.
    const cancelDownwardSnap = () => {
      if (isSnappingRef.current && animationDirectionRef.current === 'down') {
        cancelSnapAnimation()
      }
    }

    // Wheel/touch handlers represent intentional direct input, so they can start
    // a snap immediately and prevent the native scroll only when a snap starts.
    const onWheel = (event: WheelEvent) => {
      if (event.deltaY < 0) {
        cancelDownwardSnap()
        return
      }

      if (event.defaultPrevented || event.ctrlKey || event.deltaY <= 0) {
        return
      }

      scrollDirectionRef.current = 'down'

      if (snapNearestSection(true) && event.cancelable) {
        event.preventDefault()
      }
    }

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches.item(0)
      touchStartYRef.current = touch ? touch.clientY : null
      touchSnapStartedRef.current = false
    }

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches.item(0)
      const startY = touchStartYRef.current

      if (!touch || startY == null) {
        return
      }

      if (touch.clientY - startY > 8) {
        cancelDownwardSnap()
        return
      }

      if (
        !touchSnapStartedRef.current &&
        startY - touch.clientY > 8 &&
        !event.defaultPrevented
      ) {
        scrollDirectionRef.current = 'down'

        if (snapNearestSection(true) && event.cancelable) {
          touchSnapStartedRef.current = true
          event.preventDefault()
        }
      }
    }

    const onTouchEnd = () => {
      touchStartYRef.current = null
      touchSnapStartedRef.current = false
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowUp', 'PageUp', 'Home'].includes(event.key)) {
        cancelDownwardSnap()
      }
    }

    lastScrollYRef.current = window.scrollY

    window.addEventListener('scroll', queueSnap, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('keydown', onKeyDown)

    return () => {
      // Clean up listeners and any pending animation/timer when the page
      // unmounts or the hook options change.
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
    snapCooldownMs,
    snapThreshold,
  ])
}
