import { Link } from '@tanstack/react-router'
import { memo, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '#/shared/utils'
import type { SupportedLanguage } from '#/features/i18n/languages'
import type { PostMeta } from '#/features/blog/types/blog'

type HeroCarouselProps = {
  posts: PostMeta[]
  activeLanguage: SupportedLanguage
  ariaLabel: string
}

function HeroCarouselView({
  posts,
  activeLanguage,
  ariaLabel,
}: HeroCarouselProps) {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    setCarouselIndex(0)
  }, [posts])

  useEffect(() => {
    if (posts.length <= 1 || isHovered) return
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % posts.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [posts.length, isHovered])

  function handleNext() {
    setCarouselIndex((prev) => (prev + 1) % posts.length)
  }

  function handlePrev() {
    setCarouselIndex((prev) => (prev - 1 + posts.length) % posts.length)
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX
    if (diff > 50) handleNext()
    else if (diff < -50) handlePrev()
    touchStartX.current = null
  }

  return (
    <section
      aria-label={ariaLabel}
      className="group relative w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
      >
        {posts.map((post) => (
          <div key={post.slug} className="w-full shrink-0">
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="flex h-[clamp(26rem,62svh,44rem)] flex-col"
            >
              <div
                className="relative h-[60%] w-full overflow-hidden"
                style={{
                  backgroundColor: post.coverImage?.bgColor ?? 'transparent',
                  ...(post.coverImage?.padding
                    ? { padding: post.coverImage.padding }
                    : {}),
                  ...(post.coverImage?.rounded ? { borderRadius: '8px' } : {}),
                }}
              >
                {post.coverImage ? (
                  <img
                    src={post.coverImage.src}
                    alt={post.coverImage.alt}
                    className="h-full w-full"
                    loading="lazy"
                    style={{
                      objectFit: post.coverImage.fit ?? 'cover',
                      objectPosition: post.coverImage.position ?? 'center',
                      display: 'block',
                    }}
                  />
                ) : (
                  <div className="h-full w-full bg-slate-200 dark:bg-slate-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 text-white">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-cyan-600/80 px-2 py-0.5 text-xs font-medium backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex h-[40%] flex-col justify-center bg-white p-4 sm:p-6 dark:bg-slate-800">
                <time className="mb-2 text-xs text-slate-500 dark:text-slate-400">
                  {new Date(post.publishedDate).toLocaleDateString(
                    activeLanguage === 'sr' ? 'sr-RS' : 'en-US',
                    {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    },
                  )}
                </time>
                <h2 className="line-clamp-1 text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-100">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                  {post.summary}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {posts.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              handlePrev()
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-0 transition-opacity hover:bg-black/50 group-hover:opacity-100"
            aria-label="Previous post"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              handleNext()
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-0 transition-opacity hover:bg-black/50 group-hover:opacity-100"
            aria-label="Next post"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 sm:bottom-4">
            {posts.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setCarouselIndex(i)
                }}
                className={cn(
                  'h-2 w-2 rounded-full transition-colors',
                  i === carouselIndex
                    ? 'bg-cyan-500'
                    : 'bg-slate-300/50 hover:bg-slate-400',
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export const HeroCarousel = memo(HeroCarouselView)
