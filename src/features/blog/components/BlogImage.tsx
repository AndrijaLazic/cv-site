import type { CSSProperties } from 'react'
import type { BlogImageContent } from '#/features/blog/types/blog'

export function BlogImage({
  src,
  alt,
  fit = 'cover',
  position = 'center',
  bgColor = 'transparent',
  padding,
  aspectRatio = '16/9',
  rounded = false,
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

  return (
    <div style={wrapperStyle}>
      <img src={src} alt={alt} loading="lazy" style={imageStyle} />
    </div>
  )
}
