import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '#/shared/utils'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export type CarouselImage = {
  src: string
  alt: string
  caption?: string
  bgColor?: string
  padding?: string
  fit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none'
  position?: string
  zoomable?: boolean
}

export type ImageCarouselProps = {
  images: CarouselImage[]
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
        <div
          className="image-carousel-slide aspect-video w-full overflow-hidden rounded-xl shadow-md"
          style={{
            backgroundColor: img.bgColor,
            padding: img.padding,
          }}
        >
          {img.zoomable !== false ? (
            <Zoom>
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full rounded-xl"
                style={{
                  objectFit: img.fit ?? 'cover',
                  objectPosition: img.position ?? 'center',
                }}
              />
            </Zoom>
          ) : (
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full rounded-xl"
              style={{
                objectFit: img.fit ?? 'cover',
                objectPosition: img.position ?? 'center',
              }}
            />
          )}
        </div>
        {img.caption && (
          <figcaption className="mt-2 text-center text-sm italic text-slate-500 dark:text-slate-400">
            {img.caption}
          </figcaption>
        )}
      </figure>
    )
  }

  const currentCaption = images[currentIndex]?.caption

  return (
    <figure
      className={cn('w-full', className)}
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
      {/* Image track — overflow-hidden scoped to this element only */}
      <div className="relative w-full overflow-hidden rounded-xl shadow-md">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="image-carousel-slide aspect-video w-full shrink-0"
              style={{
                backgroundColor: img.bgColor,
                padding: img.padding,
              }}
            >
              {img.zoomable !== false ? (
                <Zoom>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full"
                    style={{
                      objectFit: img.fit ?? 'cover',
                      objectPosition: img.position ?? 'center',
                    }}
                  />
                </Zoom>
              ) : (
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full"
                  style={{
                    objectFit: img.fit ?? 'cover',
                    objectPosition: img.position ?? 'center',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Prev/Next buttons */}
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

        {/* Dots — inside image area, no overlap with caption */}
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

      {/* Caption rendered outside the overflow-hidden track */}
      {currentCaption && (
        <figcaption className="mt-2 text-center text-sm italic text-slate-500 dark:text-slate-400">
          {currentCaption}
        </figcaption>
      )}
    </figure>
  )
}
