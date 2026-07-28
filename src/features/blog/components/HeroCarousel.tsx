import { Link } from '@tanstack/react-router'
import { memo, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '#/shared/utils'
import type { SupportedLanguage } from '#/features/i18n/languages'
import type { BlogPostSummary } from '#/features/blog/types/blog'
import { HERO_IMAGE_SIZES } from '../contentImages'
import { ResponsiveImage } from './ResponsiveImage'

type HeroCarouselProps = {
  posts: BlogPostSummary[]
  activeLanguage: SupportedLanguage
  ariaLabel: string
}

const HERO_POST_TITLE_LINE_CLAMP_CLASS = 'line-clamp-3'

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
      className="border-border/50 bg-card/40 group relative w-full overflow-hidden rounded-2xl border p-2 shadow-xl backdrop-blur-xl md:rounded-3xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-tr from-primary/5 via-transparent to-accent/5" />

      <div className="border-border bg-card relative z-10 w-full overflow-hidden rounded-lg border shadow-inner md:rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
        >
          {posts.map((post) => (
            <div key={post.slug} className="w-full shrink-0">
              <Link
                to="/{-$locale}/blog/$slug"
                params={{
                  locale: activeLanguage === 'en' ? undefined : activeLanguage,
                  slug: post.slug,
                }}
                className="relative flex h-auto flex-col focus-visible:outline-none md:h-[clamp(26rem,62svh,44rem)] md:flex-row"
              >
                <div
                  className="border-border/80 bg-muted/50 relative aspect-[16/11] w-full shrink-0 overflow-hidden border-b sm:aspect-video md:h-full md:w-1/2 md:border-r md:border-b-0"
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
                <div className="bg-card flex min-h-0 flex-col justify-center p-5 pb-12 sm:p-8 sm:pb-14 md:h-full md:w-1/2 md:pb-8">
                  <time className="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
                    {new Date(post.publishedDate).toLocaleDateString(
                      activeLanguage === 'sr' ? 'sr-Latn-RS' : 'en-US',
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
                      'text-foreground group-hover:text-primary mb-3 text-xl leading-tight font-extrabold transition-colors sm:mb-4 sm:text-3xl lg:text-4xl',
                    )}
                  >
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed font-medium sm:text-base">
                    {post.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5 md:hidden">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="border-border bg-muted text-muted-foreground rounded-full border px-2 py-0.5 text-[9px] font-semibold tracking-wide uppercase"
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
            className="border-border bg-background/70 text-foreground hover:bg-muted focus-visible:ring-ring absolute top-1/2 left-3 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-colors focus-visible:ring-2 focus-visible:outline-none sm:left-4 sm:size-11"
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
            className="border-border bg-background/70 text-foreground hover:bg-muted focus-visible:ring-ring absolute top-1/2 right-3 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-colors focus-visible:ring-2 focus-visible:outline-none sm:right-4 sm:size-11"
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
                  'focus-visible:ring-ring h-2.5 rounded-full transition-all focus-visible:ring-2 focus-visible:outline-none',
                  i === carouselIndex
                    ? 'ring-background w-7 bg-primary shadow-sm shadow-primary/30 ring-1'
                    : 'bg-muted-foreground/60 hover:bg-muted-foreground w-2.5',
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
