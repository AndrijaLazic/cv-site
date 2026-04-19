import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '#/shared/utils'

export type ImageCarouselProps = {
  images: { src: string; alt: string; caption?: string }[]
  interval?: number
  autoPlay?: boolean
  className?: string
}

export function ImageCarousel({
  images,
  interval = 4000,
  autoPlay = true,
  className,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    if (!autoPlay || isHovered || images.length <= 1) return

    const timer = setInterval(goToNext, interval)
    return () => clearInterval(timer)
  }, [autoPlay, isHovered, images.length, interval, goToNext])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrev()
    if (e.key === 'ArrowRight') goToNext()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return

    const diff = touchStartX.current - touchEndX.current
    if (diff > 50) goToNext()
    if (diff < -50) goToPrev()

    touchStartX.current = null
    touchEndX.current = null
  }

  if (images.length === 0) return null

  if (images.length === 1) {
    const img = images[0]
    return (
      <figure className={cn('w-full', className)}>
        <img
          src={img.src}
          alt={img.alt}
          className="aspect-video w-full rounded-xl object-cover shadow-md"
        />
        {img.caption && (
          <figcaption className="mt-2 text-center text-sm italic text-slate-500 dark:text-slate-400">
            {img.caption}
          </figcaption>
        )}
      </figure>
    )
  }

  return (
    <div
      className={cn(
        'relative w-full shadow-md rounded-xl overflow-hidden',
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Image carousel"
      role="region"
      aria-live="polite"
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="w-full shrink-0">
            <figure className="w-full">
              <img
                src={img.src}
                alt={img.alt}
                className="aspect-video w-full object-cover"
              />
              {img.caption && (
                <figcaption className="mt-2 text-center text-sm italic text-slate-500 dark:text-slate-400">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          </div>
        ))}
      </div>

      <button
        onClick={(e) => {
          e.preventDefault()
          goToPrev()
        }}
        className="absolute left-2 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-cyan-500"
        aria-label="Previous image"
      >
        <ChevronLeft className="size-5" />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault()
          goToNext()
        }}
        className="absolute right-2 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-cyan-500"
        aria-label="Next image"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.preventDefault()
              setCurrentIndex(i)
            }}
            className={cn(
              'size-2 rounded-full transition-colors',
              i === currentIndex ? 'bg-cyan-400' : 'bg-white/50',
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
