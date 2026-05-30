import { Link } from '@tanstack/react-router'
import { memo, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '#/shared/utils'
import type { SupportedLanguage } from '#/app/i18n/languages'
import type { BlogPostSummary } from '#/features/blog/types/blog'
import type { PostDetailRouteTo } from '#/features/blog/types/routes'
import { HERO_IMAGE_SIZES } from '../contentImages'
import { ResponsiveImage } from './ResponsiveImage'

type HeroCarouselProps = {
  posts: BlogPostSummary[]
  activeLanguage: SupportedLanguage
  ariaLabel: string
  postRouteTo?: PostDetailRouteTo
}

const HERO_POST_TITLE_LINE_CLAMP_CLASS = 'line-clamp-3'

function HeroCarouselView({
  posts,
  activeLanguage,
  ariaLabel,
  postRouteTo = '/blog/$slug',
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
      className="group relative w-full overflow-hidden rounded-2xl md:rounded-3xl border border-slate-200/50 bg-white/5 p-2 backdrop-blur-xl shadow-xl dark:border-slate-800/50 dark:bg-slate-900/40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-tr from-primary/5 via-transparent to-accent/5" />

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg md:rounded-xl shadow-inner relative w-full overflow-hidden z-10">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
        >
          {posts.map((post) => (
            <div key={post.slug} className="w-full shrink-0">
              <Link
                to={postRouteTo}
                params={{ slug: post.slug }}
                className="relative flex h-auto flex-col focus-visible:outline-none md:h-[clamp(26rem,62svh,44rem)] md:flex-row"
              >
                <div
                  className="relative aspect-[16/11] w-full shrink-0 overflow-hidden border-b border-slate-200/80 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 sm:aspect-video md:h-full md:w-1/2 md:border-r md:border-b-0"
                  style={{
                    backgroundColor: post.heroImage.bgColor ?? 'transparent',
                    ...(post.heroImage.padding
                      ? { padding: post.heroImage.padding }
                      : {}),
                    ...(post.heroImage.rounded ? { borderRadius: '8px' } : {}),
                  }}
                >
                  <ResponsiveImage
                    src={post.heroImage.src}
                    alt={post.heroImage.alt}
                    className="block h-full w-full"
                    loading="lazy"
                    pictureClassName="block h-full w-full"
                    sizes={HERO_IMAGE_SIZES}
                    style={{
                      objectFit: post.heroImage.fit ?? 'cover',
                      objectPosition: post.heroImage.position ?? 'center',
                      display: 'block',
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 hidden flex-wrap gap-2 text-white md:flex">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-primary-foreground/40 bg-primary/80 px-3 py-1 text-[10px] font-semibold tracking-wider text-primary-foreground uppercase shadow-sm backdrop-blur-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex min-h-0 flex-col justify-center bg-white p-5 pb-12 sm:p-8 sm:pb-14 md:h-full md:w-1/2 md:pb-8 dark:bg-slate-950">
                  <time className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    {new Date(post.publishedDate).toLocaleDateString(
                      activeLanguage === 'sr' ? 'sr-RS' : 'en-US',
                      {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      },
                    )}
                  </time>
                  <h2
                    className={cn(
                      HERO_POST_TITLE_LINE_CLAMP_CLASS,
                      'mb-3 text-xl leading-tight font-extrabold text-slate-900 transition-colors group-hover:text-primary sm:mb-4 sm:text-3xl lg:text-4xl dark:text-white',
                    )}
                  >
                    {post.title}
                  </h2>
                  <p className="line-clamp-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                    {post.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5 md:hidden">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-600 dark:border-slate-700/70 dark:bg-slate-900 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {posts.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              handlePrev()
            }}
            className="absolute left-3 top-1/2 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-slate-950/55 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-slate-950/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:left-4 sm:size-11"
            aria-label="Previous post"
          >
            <ChevronLeft className="size-5 sm:size-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              handleNext()
            }}
            className="absolute right-3 top-1/2 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-slate-950/55 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-slate-950/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:right-4 sm:size-11"
            aria-label="Next post"
          >
            <ChevronRight className="size-5 sm:size-6" aria-hidden="true" />
          </button>
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2 pt-2 sm:bottom-4 sm:pt-0">
            {posts.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setCarouselIndex(i)
                }}
                className={cn(
                  'h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80',
                  i === carouselIndex
                    ? 'w-7 bg-primary shadow-sm shadow-primary/30 ring-1 ring-white/80'
                    : 'w-2.5 bg-white/70 hover:bg-white dark:bg-slate-500/70 dark:hover:bg-slate-300',
                )}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === carouselIndex ? 'true' : undefined}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export const HeroCarousel = memo(HeroCarouselView)
