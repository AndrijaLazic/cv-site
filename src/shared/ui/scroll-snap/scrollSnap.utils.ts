import type { CSSProperties } from 'react'
import { cn } from '#/shared/utils'
import type {
  ResponsiveSnapThreshold,
  ScrollSnapSectionOptions,
  SnapAlign,
} from './scrollSnap.types'

// Data attributes are the contract between rendered snap sections and the
// useOneTimeScrollSnap hook. Keeping the names centralized avoids drift between
// ScrollSnapSection, BackgroundSection, and the DOM query logic.
export const scrollSnapSectionAttribute = 'data-scroll-snap-section'
export const scrollSnapSectionOffsetAttribute = 'data-scroll-snap-offset'
export const scrollSnapSettledThresholdAttribute =
  'data-scroll-snap-settled-threshold'
export const scrollSnapSettledThresholdDesktopAttribute =
  'data-scroll-snap-settled-threshold-desktop'
export const scrollSnapSettledThresholdMobileAttribute =
  'data-scroll-snap-settled-threshold-mobile'
export const appHeaderSelector = '[data-app-header="true"]'
export const scrollSnapSectionSelector = `[${scrollSnapSectionAttribute}="true"]`

// Matches ScrollSnapPage's default header offset. The Tailwind class is useful
// for CSS-driven scrollIntoView/hash navigation; the inline style is the native
// CSS scroll snap value used by the browser.
const scrollSnapMarginTop = 'var(--header-height)'

const SNAP_ALIGN_CLASS: Record<SnapAlign, string> = {
  start: 'snap-start',
  center: 'snap-center',
  end: 'snap-end',
}

type BuildScrollSnapSectionPropsOptions = ScrollSnapSectionOptions & {
  className?: string
  style?: CSSProperties
}

export function getResponsiveSnapThresholdValues(
  threshold: ResponsiveSnapThreshold | undefined,
) {
  if (typeof threshold === 'number') {
    return {
      desktop: threshold,
      mobile: threshold,
    }
  }

  return {
    desktop: threshold?.desktop,
    mobile: threshold?.mobile,
  }
}

/**
 * Builds all props needed for a DOM element to become a snap target.
 *
 * This is intentionally shared by ScrollSnapSection and BackgroundSection so
 * both components emit the same classes, inline snap styles, and data
 * attributes consumed by the one-time snap hook.
 */
export function buildScrollSnapSectionProps({
  className,
  fullHeight = true,
  snapAlign = 'start',
  snapOffset,
  snapStop = 'always',
  settledThreshold,
  style,
}: BuildScrollSnapSectionPropsOptions) {
  const settledThresholdValues =
    getResponsiveSnapThresholdValues(settledThreshold)

  return {
    className: cn(
      SNAP_ALIGN_CLASS[snapAlign],
      fullHeight && 'min-h-[calc(100svh-var(--header-height))]',
      'scroll-mt-(--header-height)',
      className,
    ),
    [scrollSnapSectionAttribute]: 'true',
    // snapOffset and settled thresholds are read by the JS assistant; native CSS
    // scroll snapping ignores them.
    [scrollSnapSectionOffsetAttribute]: snapOffset,
    [scrollSnapSettledThresholdDesktopAttribute]:
      settledThresholdValues.desktop,
    [scrollSnapSettledThresholdMobileAttribute]: settledThresholdValues.mobile,
    style: {
      ...style,
      scrollSnapAlign: snapAlign,
      scrollSnapStop: snapStop,
      scrollMarginTop: scrollSnapMarginTop,
    },
  }
}

/**
 * Converts simple CSS lengths to pixels for header offset measurement.
 * The hook only needs px/rem/em because --header-height is expected to use one
 * of those units in this design system.
 */
export function getCssLengthInPx(value: string) {
  const trimmedValue = value.trim()
  const numericValue = Number.parseFloat(trimmedValue)

  if (!Number.isFinite(numericValue)) {
    return 0
  }

  if (trimmedValue.endsWith('rem')) {
    const rootFontSize = Number.parseFloat(
      window.getComputedStyle(document.documentElement).fontSize,
    )

    return Number.isFinite(rootFontSize)
      ? numericValue * rootFontSize
      : numericValue
  }

  if (trimmedValue.endsWith('em')) {
    const bodyFontSize = Number.parseFloat(
      window.getComputedStyle(document.body).fontSize,
    )

    return Number.isFinite(bodyFontSize)
      ? numericValue * bodyFontSize
      : numericValue
  }

  return numericValue
}

/**
 * Absolute document Y position for a snap target.
 */
export function getDocumentTop(element: HTMLElement) {
  return element.getBoundingClientRect().top + window.scrollY
}

/**
 * Returns 0..1 page scroll progress. Used only for initial-load protection so a
 * restored/history scroll position does not get immediately pulled to a section.
 */
export function getPageScrollProgress() {
  const pageHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
  )
  const scrollableHeight = Math.max(pageHeight - window.innerHeight, 0)

  if (scrollableHeight === 0) {
    return 0
  }

  return window.scrollY / scrollableHeight
}
