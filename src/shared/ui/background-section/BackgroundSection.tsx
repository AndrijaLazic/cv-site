import { cn } from '#/shared/utils'
import { Reveal } from '#/shared/ui/reveal'
import { buildScrollSnapSectionProps } from '#/shared/ui/scroll-snap/scrollSnap.utils'
import { backgroundPresets } from './backgroundPresets'
import './backgrounds.css'
import type {
  BackgroundSectionProps,
  BackgroundSectionRevealOptions,
  BackgroundSectionSnapOptions,
} from './backgroundSection.types'

function resolveSnapOptions(snap: BackgroundSectionProps['snap']) {
  return snap === true ? {} : snap && typeof snap === 'object' ? snap : null
}

function resolveRevealOptions(reveal: BackgroundSectionProps['reveal']) {
  return reveal === true
    ? {}
    : reveal && typeof reveal === 'object'
      ? reveal
      : null
}

function buildBackgroundSnapProps(
  options: BackgroundSectionSnapOptions,
  className: string | undefined,
  style: BackgroundSectionProps['style'],
) {
  return buildScrollSnapSectionProps({
    className,
    fullHeight: options.fullHeight,
    snapAlign: options.align,
    snapOffset: options.snapOffset ?? 0,
    snapStop: options.snapStop,
    settledThreshold: options.settledThreshold,
    style,
  })
}

export function BackgroundSection({
  variant,
  animated = true,
  snap,
  reveal,
  className,
  contentClassName,
  children,
  id,
  style,
  ...props
}: BackgroundSectionProps) {
  const preset = variant ? backgroundPresets[variant] : null
  const shouldAnimate = animated && (preset?.supportsAnimation ?? false)
  const snapOpts = resolveSnapOptions(snap)
  const revealOpts = resolveRevealOptions(reveal)
  const baseClassName = [
    cn('relative overflow-hidden', className),
    preset?.sectionClassName,
    shouldAnimate ? 'bg-animated' : null,
  ]
    .filter(Boolean)
    .join(' ')
  const sectionProps = snapOpts
    ? buildBackgroundSnapProps(snapOpts, baseClassName, style)
    : {
        className: baseClassName,
        style,
      }

  return (
    <section id={id} {...sectionProps} {...props}>
      {preset?.overlays?.map((overlay, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={['absolute', overlay.className].filter(Boolean).join(' ')}
        />
      ))}

      {renderContent(revealOpts, contentClassName, children)}
    </section>
  )
}

function renderContent(
  revealOptions: BackgroundSectionRevealOptions | null,
  className: string | undefined,
  children: BackgroundSectionProps['children'],
) {
  if (revealOptions) {
    return (
      <Reveal {...revealOptions} className={className}>
        {children}
      </Reveal>
    )
  }

  if (className) {
    return <div className={className}>{children}</div>
  }

  return children
}
