import type { ComponentPropsWithoutRef } from 'react'

/**
 * Native CSS scroll-snap-type strictness.
 * - mandatory: browser should always snap to a snap point.
 * - proximity: browser snaps only when close enough to a snap point.
 */
export type SnapType = 'mandatory' | 'proximity'

/**
 * Native CSS scroll-snap-align values supported by this UI layer.
 */
export type SnapAlign = 'start' | 'center' | 'end'

/**
 * Direction used by the custom one-time snap assistant.
 * - down: only assist downward scrolling.
 * - both: assist downward and upward scrolling.
 */
export type ScrollSnapDirection = 'down' | 'both'

/**
 * Viewport-height multiplier used to decide whether a section is close enough
 * to complete a snap after regular scrolling settles. When direct wheel/touch
 * snapping uses its larger reach, a custom value also caps that reach for this
 * section. A number applies to all breakpoints; an object can tune desktop and
 * mobile independently.
 */
export type ResponsiveSnapThreshold =
  | number
  | {
      desktop?: number
      mobile?: number
    }

export type ScrollSnapPageProps = ComponentPropsWithoutRef<'div'> & {
  snapType?: SnapType
  disabled?: boolean
  /** CSS length used as scroll-padding-top to account for the sticky header. */
  headerOffset?: string
}

export type ScrollSnapSectionOptions = {
  /** Gives the section at least one viewport of height minus the header. */
  fullHeight?: boolean
  snapAlign?: SnapAlign
  /** Extra pixel offset subtracted by the JS snap assistant for this section. */
  snapOffset?: number
  snapStop?: 'normal' | 'always'
  settledThreshold?: ResponsiveSnapThreshold
}

export type ScrollSnapSectionProps = ComponentPropsWithoutRef<'section'> &
  ScrollSnapSectionOptions

export type UseOneTimeScrollSnapOptions = {
  animationDurationMs?: number
  direction?: ScrollSnapDirection
  enabled?: boolean
  /** Override the measured sticky-header offset in pixels. */
  headerOffset?: number | (() => number)
  /** Selector for elements marked as snap targets. */
  selector?: string
  /** Wait time after scroll settles before the assistant completes a snap. */
  settleDelayMs?: number
  /** Lockout after a programmatic snap to prevent chained accidental snaps. */
  snapCooldownMs?: number
  /** Viewport-height multiplier for direct wheel/touch assisted snapping. */
  snapThreshold?: number
}

export type UseInitialScrollSnapDisabledOptions = {
  enabled?: boolean
  scrollProgressThreshold?: number
}
