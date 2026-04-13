import { cn } from '#/shared/utils'

type BlogVideoProps = {
  src: string
  title?: string
  caption?: string
  className?: string
}

function extractYoutubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/)
  return match ? match[1] : null
}

function extractVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/)
  return match ? match[1] : null
}

export function BlogVideo({ src, title, caption, className }: BlogVideoProps) {
  const ytId = extractYoutubeId(src)
  const vimeoId = extractVimeoId(src)

  return (
    <figure className={cn('my-6', className)}>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
        {ytId ? (
          <iframe
            src={`https://www.youtube.com/embed/${ytId}`}
            title={title ?? 'YouTube video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        ) : vimeoId ? (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}`}
            title={title ?? 'Vimeo video'}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <video
            controls
            src={src}
            title={title}
            className="absolute inset-0 size-full object-cover"
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm italic text-slate-500 dark:text-slate-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
