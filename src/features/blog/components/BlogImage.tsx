import { cn } from '#/shared/utils'

type BlogImageProps = {
  src: string
  alt: string
  caption?: string
  className?: string
  priority?: boolean
}

export function BlogImage({
  src,
  alt,
  caption,
  className,
  priority = false,
}: BlogImageProps) {
  return (
    <figure className={cn('my-6', className)}>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className="w-full rounded-xl object-cover"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm italic text-slate-500 dark:text-slate-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
