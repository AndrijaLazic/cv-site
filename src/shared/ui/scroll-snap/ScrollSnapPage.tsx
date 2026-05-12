import { useEffect } from 'react'
import type { ScrollSnapPageProps } from './scrollSnap.types'

/**
 * Enables native vertical CSS scroll snap for a page while this component is
 * mounted.
 *
 * The browser only honors scroll snap reliably when the snapping styles live on
 * the actual scroll container. In this app the document is the scroll
 * container, so the effect writes to html, body, and document.scrollingElement.
 * The rendered div gets the same styles too, which keeps the component useful
 * if it is ever placed inside a custom scroll container.
 */
export function ScrollSnapPage({
  children,
  className,
  disabled = false,
  headerOffset = 'var(--header-height)',
  snapType = 'proximity',
  style,
  ...props
}: ScrollSnapPageProps) {
  useEffect(() => {
    if (disabled || typeof document === 'undefined') {
      return
    }

    const html = document.documentElement
    const body = document.body
    const scrollingElement = document.scrollingElement as HTMLElement | null
    const prevSnapType = html.style.scrollSnapType
    const prevPaddingTop = html.style.scrollPaddingTop
    const prevBodySnapType = body.style.scrollSnapType
    const prevBodyPaddingTop = body.style.scrollPaddingTop
    const prevScrollingSnapType = scrollingElement?.style.scrollSnapType
    const prevScrollingPaddingTop = scrollingElement?.style.scrollPaddingTop

    // scrollPaddingTop shifts the snap point below the sticky header, so a
    // snap-start section lands visually below the nav instead of underneath it.
    html.style.scrollSnapType = `y ${snapType}`
    html.style.scrollPaddingTop = headerOffset
    body.style.scrollSnapType = `y ${snapType}`
    body.style.scrollPaddingTop = headerOffset

    if (scrollingElement) {
      scrollingElement.style.scrollSnapType = `y ${snapType}`
      scrollingElement.style.scrollPaddingTop = headerOffset
    }

    return () => {
      // Restore only the inline styles this component touched. This avoids
      // leaking page-level snap behavior after route changes.
      html.style.scrollSnapType = prevSnapType
      html.style.scrollPaddingTop = prevPaddingTop
      body.style.scrollSnapType = prevBodySnapType
      body.style.scrollPaddingTop = prevBodyPaddingTop

      if (scrollingElement) {
        scrollingElement.style.scrollSnapType = prevScrollingSnapType ?? ''
        scrollingElement.style.scrollPaddingTop = prevScrollingPaddingTop ?? ''
      }
    }
  }, [disabled, headerOffset, snapType])

  return (
    <div
      className={className}
      style={
        disabled
          ? style
          : {
              ...style,
              // Mirrors the document styles for nested/custom scroll contexts.
              scrollSnapType: `y ${snapType}`,
              scrollPaddingTop: headerOffset,
            }
      }
      {...props}
    >
      {children}
    </div>
  )
}
