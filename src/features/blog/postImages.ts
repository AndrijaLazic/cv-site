import type {
  BlogImageContent,
  BlogPostMeta,
  BlogPostSummary,
} from './types/blog'

export const DEFAULT_POST_HERO_IMAGE: BlogImageContent = {
  src: '/images/post-image-not-found.svg',
  alt: 'Image not found',
  fit: 'contain',
  position: 'center',
  bgColor: '#e2e8f0',
  padding: '1.5rem',
  aspectRatio: '16/9',
}

export function resolvePostImages(
  meta: BlogPostMeta,
): Omit<BlogPostSummary, 'tableOfContents'> {
  const heroImage =
    meta.heroImage ??
    meta.coverImage ??
    meta.socialImage ??
    DEFAULT_POST_HERO_IMAGE

  return {
    ...meta,
    heroImage,
    coverImage: meta.coverImage ?? heroImage,
    socialImage: meta.socialImage ?? heroImage,
  }
}
