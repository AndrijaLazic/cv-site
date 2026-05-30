import { contentImageManifest } from './generated/contentImageManifest'
import type { ResponsiveContentImageEntry } from './generated/contentImageManifest'

const LOCAL_CONTENT_IMAGE_PATTERN = /^\/(blog|news)\//
const RESPONSIVE_FORMAT_ORDER = ['avif', 'webp'] as const
const contentImageFiles = import.meta.glob([
  '/public/blog/**/*.{avif,webp}',
  '/public/news/**/*.{avif,webp}',
  '/public/images/**/*.{avif,webp}',
])
const existingContentImagePaths = new Set(
  Object.keys(contentImageFiles).map((path) => path.replace('/public', '')),
)

type ResponsiveImageSource = {
  srcSet: string
  type: `image/${(typeof RESPONSIVE_FORMAT_ORDER)[number]}`
}

// Blog/news carousel hero images.
export const HERO_IMAGE_SIZES = '(min-width: 768px) 50vw, 100vw'

// Blog/news listing cards.
export const POST_CARD_IMAGE_SIZES =
  '(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw'

// Images inside blog/news posts, including MDX images and in-post carousels.
export const POST_CONTENT_IMAGE_SIZES =
  '(min-width: 1280px) 56rem, (min-width: 768px) calc(100vw - 4rem), 100vw'

function normalizeContentImagePath(src: string) {
  return src.split(/[?#]/, 1)[0]
}

function buildSource(
  entry: ResponsiveContentImageEntry | undefined,
  format: (typeof RESPONSIVE_FORMAT_ORDER)[number],
): ResponsiveImageSource | undefined {
  if (!entry) {
    return undefined
  }

  const variants = entry.formats[format]?.filter((variant) =>
    existingContentImagePaths.has(variant.src),
  )

  if (!variants || variants.length === 0) {
    return undefined
  }

  return {
    type: `image/${format}`,
    srcSet: variants
      .map((variant) => `${variant.src} ${variant.width}w`)
      .join(', '),
  }
}

export function getResponsiveContentImage(src: string) {
  const normalizedPath = normalizeContentImagePath(src)

  if (!LOCAL_CONTENT_IMAGE_PATTERN.test(normalizedPath)) {
    return undefined
  }

  return contentImageManifest[normalizedPath]
}

export function getResponsiveImageProps(src: string) {
  const entry = getResponsiveContentImage(src)

  return {
    height: entry?.height,
    sources: RESPONSIVE_FORMAT_ORDER.map((format) =>
      buildSource(entry, format),
    ).filter((source): source is ResponsiveImageSource => source !== undefined),
    width: entry?.width,
  }
}
