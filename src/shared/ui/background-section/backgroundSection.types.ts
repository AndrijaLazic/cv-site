import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { RevealOptions } from '#/shared/ui/reveal'
import type {
  ResponsiveSnapThreshold,
  SnapAlign,
} from '#/shared/ui/scroll-snap'
import type { BackgroundVariant } from './backgroundPresets'

export type BackgroundSectionSnapOptions = {
  /** Scroll snap alignment. Default: 'start'. */
  align?: SnapAlign
  /** Whether the section should be at least viewport height. Default: true. */
  fullHeight?: boolean
  /** scrollSnapStop behavior. Default: 'always'. */
  snapStop?: 'normal' | 'always'
  /** Data attribute offset forwarded to the scroll snap handler. Default: 0. */
  snapOffset?: number
  /**
   * Per-section settled snap threshold. Values are viewport-height multipliers.
   */
  settledThreshold?: ResponsiveSnapThreshold
}

export type BackgroundSectionRevealOptions = RevealOptions

export type BackgroundSectionProps = Omit<
  ComponentPropsWithoutRef<'section'>,
  'children'
> & {
  /** Background variant from the preset catalogue. */
  variant?: BackgroundVariant
  /**
   * Enable animation for presets that support it (aurora, mesh-blobs).
   * Adds the .bg-animated class. Default: true.
   */
  animated?: boolean
  /**
   * Attach CSS scroll snap attributes.
   * Pass `true` for defaults or an options object for fine-grained control.
   */
  snap?: boolean | BackgroundSectionSnapOptions
  /**
   * Wrap children in a scroll-reveal animation.
   * Pass `true` for defaults or an options object for fine-grained control.
   */
  reveal?: boolean | BackgroundSectionRevealOptions
  /** Extra classes applied to the outer <section> element. */
  className?: string
  /**
   * Extra classes applied to the inner content wrapper.
   * Only used when `reveal` or `contentClassName` requires a wrapper.
   */
  contentClassName?: string
  children?: ReactNode
}
