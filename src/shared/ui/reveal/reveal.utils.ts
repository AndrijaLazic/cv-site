import { cn } from '#/shared/utils'
import type { RevealDirection } from './reveal.types'

export const DEFAULT_REVEAL_DURATION = 'duration-700'

const TRANSITION_BASE =
  'transition-[opacity,translate] ease-out motion-reduce:!opacity-100 motion-reduce:!translate-y-0 motion-reduce:!translate-x-0'

const HIDDEN: Record<RevealDirection, string> = {
  top: 'opacity-0 -translate-y-12',
  bottom: 'opacity-0 translate-y-12',
  left: 'opacity-0 -translate-x-12',
  right: 'opacity-0 translate-x-12',
  none: 'opacity-0',
}

const VISIBLE = 'opacity-100 translate-y-0 translate-x-0'

export function buildRevealClassName(
  direction: RevealDirection,
  isVisible: boolean,
  duration: string = DEFAULT_REVEAL_DURATION,
): string {
  return cn(TRANSITION_BASE, duration, isVisible ? VISIBLE : HIDDEN[direction])
}
