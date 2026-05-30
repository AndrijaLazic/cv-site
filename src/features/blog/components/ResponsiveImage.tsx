import type { ComponentPropsWithoutRef } from 'react'
import { ResponsiveImage as SharedResponsiveImage } from '#/shared/ui/responsive-image'
import { getResponsiveImageProps } from '../contentImages'

type ResponsiveImageProps = Omit<
  ComponentPropsWithoutRef<'img'>,
  'alt' | 'src'
> & {
  alt: string
  pictureClassName?: string
  src: string
}

export function ResponsiveImage({
  alt,
  className,
  decoding = 'async',
  height,
  loading = 'lazy',
  pictureClassName,
  sizes,
  src,
  width,
  ...imgProps
}: ResponsiveImageProps) {
  const responsiveImage = getResponsiveImageProps(src)

  return (
    <SharedResponsiveImage
      {...imgProps}
      alt={alt}
      className={className}
      decoding={decoding}
      height={height ?? responsiveImage.height}
      loading={loading}
      pictureClassName={pictureClassName}
      sizes={sizes}
      sources={responsiveImage.sources}
      src={src}
      width={width ?? responsiveImage.width}
    />
  )
}
