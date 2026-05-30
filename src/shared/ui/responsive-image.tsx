import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '#/shared/utils'

export type ResponsiveImageSource = {
  media?: string
  sizes?: string
  srcSet: string
  type?: string
}

export type ResponsiveImageProps = Omit<
  ComponentPropsWithoutRef<'img'>,
  'alt' | 'src'
> & {
  alt: string
  pictureClassName?: string
  pictureProps?: Omit<
    ComponentPropsWithoutRef<'picture'>,
    'children' | 'className'
  >
  sources?: readonly ResponsiveImageSource[]
  src: string
}

export function ResponsiveImage({
  alt,
  className,
  decoding = 'async',
  loading = 'lazy',
  pictureClassName,
  pictureProps,
  sizes,
  sources = [],
  src,
  ...imgProps
}: ResponsiveImageProps) {
  return (
    <picture {...pictureProps} className={cn('block', pictureClassName)}>
      {sources.map((source) => (
        <source
          key={`${source.media ?? ''}:${source.type ?? ''}:${source.srcSet}`}
          media={source.media}
          sizes={source.sizes ?? sizes}
          srcSet={source.srcSet}
          type={source.type}
        />
      ))}
      <img
        {...imgProps}
        alt={alt}
        className={className}
        decoding={decoding}
        loading={loading}
        sizes={sizes}
        src={src}
      />
    </picture>
  )
}
