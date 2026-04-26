import type { CSSProperties } from 'react'
import type { BlogImageContent } from '#/features/blog/types/blog'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

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
}: BlogImageContent) {
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
    <img src={src} alt={alt} loading="lazy" style={imageStyle} />
  )

  return (
    <div style={wrapperStyle}>
      {zoomable ? <Zoom>{imageElement}</Zoom> : imageElement}
    </div>
  )
}
