import type { CSSProperties } from 'react'
import type { BlogImageContent } from '#/features/blog/types/blog'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { POST_CONTENT_IMAGE_SIZES } from '../contentImages'
import { ResponsiveImage } from './ResponsiveImage'

export function BlogImage({
  src,
  alt,
  fit = 'cover',
  position = 'center',
  bgColor = 'transparent',
  padding,
  aspectRatio = '16/9',
  rounded = false,
  zoomable = false,
  priority = false,
}: BlogImageContent & { priority?: boolean }) {
  const wrapperStyle: CSSProperties = {
    width: '100%',
    aspectRatio,
    backgroundColor: bgColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...(padding ? { padding } : {}),
    borderRadius: rounded ? '8px' : 0,
    overflow: 'hidden',
  }

  const imageStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: fit,
    objectPosition: position,
    display: 'block',
  }

  const imageElement = (
    <ResponsiveImage
      src={src}
      alt={alt}
      className="block h-full w-full"
      fetchPriority={priority ? 'high' : undefined}
      loading={priority ? 'eager' : 'lazy'}
      pictureClassName="block h-full w-full"
      sizes={POST_CONTENT_IMAGE_SIZES}
      style={imageStyle}
    />
  )

  return (
    <div style={wrapperStyle}>
      {zoomable ? <Zoom>{imageElement}</Zoom> : imageElement}
    </div>
  )
}
