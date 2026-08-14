import { Link } from '@tanstack/react-router'
import { memo, useEffect, useId, useRef, useState } from 'react'
import type { TouchEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '#/shared/utils'
import type { SupportedLanguage } from '#/features/i18n/languages'
import type { BlogPostSummary } from '#/features/blog/types/blog'
import { Badge } from '#/shared/ui/badge'
import { HERO_IMAGE_SIZES } from '../contentImages'
import { ResponsiveImage } from './ResponsiveImage'

type HeroCarouselProps = {
  posts: BlogPostSummary[]
  activeLanguage: SupportedLanguage
}

const HERO_POST_TITLE_LINE_CLAMP_CLASS = 'line-clamp-3'
const AUTO_ROTATE_INTERVAL_MS = 5000

function formatPublishedDate(date: string, locale: SupportedLanguage) {
  return new Date(date).toLocaleDateString(
    locale === 'sr' ? 'sr-Latn-RS' : 'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  )
}

function HeroCarouselView({ posts, activeLanguage }: HeroCarouselProps) {
  const { t } = useTranslation('resume')
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [autoplayReset, setAutoplayReset] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const carouselId = useId()

  useEffect(() => {
    setCarouselIndex(0)
  }, [posts])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (posts.length <= 1 || prefersReducedMotion) {
      return
    }

    const timer = window.setTimeout(() => {
      setCarouselIndex((prev) => (prev + 1) % posts.length)
    }, AUTO_ROTATE_INTERVAL_MS)

    return () => window.clearTimeout(timer)
  }, [autoplayReset, carouselIndex, posts.length, prefersReducedMotion])

  function handleNext() {
    setCarouselIndex((prev) => (prev + 1) % posts.length)
  }

  function handlePrev() {
    setCarouselIndex((prev) => (prev - 1 + posts.length) % posts.length)
  }

  function handleSlideSelect(index: number) {
    setCarouselIndex(index)
    setAutoplayReset((prev) => prev + 1)
  }

  function handleTouchStart(e: TouchEvent<HTMLElement>) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: TouchEvent<HTMLElement>) {
    if (touchStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX
    if (diff > 50) handleNext()
    else if (diff < -50) handlePrev()
    touchStartX.current = null
  }

  if (posts.length === 0) return null

  const activeIndex = Math.min(carouselIndex, posts.length - 1)

  return (
    <section
      aria-label={t('blogLatestPost')}
      aria-roledescription={t('blogCarousel')}
      className="mt-8 touch-pan-y"
      onTouchCancel={() => {
        touchStartX.current = null
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
    >
      <div className="border-border bg-card overflow-hidden rounded-lg border">
        <div className="border-border flex min-h-14 items-center justify-between gap-4 border-b px-4 sm:px-5">
          <h2 className="font-heading text-foreground text-xl font-semibold">
            {t('blogLatestPost')}
          </h2>
        </div>

        <div aria-live="polite" className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {posts.map((post, index) => {
              const isActive = index === activeIndex
              const slideId = `${carouselId}-slide-${index}`

              return (
                <article
                  key={post.slug}
                  id={slideId}
                  aria-hidden={!isActive}
                  inert={!isActive}
                  className="grid w-full shrink-0 min-w-0 md:grid-cols-2"
                >
                  <Link
                    to="/{-$locale}/blog/$slug"
                    params={{
                      locale:
                        activeLanguage === 'en' ? undefined : activeLanguage,
                      slug: post.slug,
                    }}
                    className="border-border bg-muted block aspect-[16/10] min-w-0 overflow-hidden border-b focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-inset focus-visible:outline-none md:min-h-80 md:border-r md:border-b-0"
                    style={{
                      backgroundColor: post.heroImage.bgColor ?? 'transparent',
                      ...(post.heroImage.padding
                        ? { padding: post.heroImage.padding }
                        : {}),
                      ...(post.heroImage.rounded
                        ? { borderRadius: '8px' }
                        : {}),
                    }}
                  >
                    <ResponsiveImage
                      src={post.heroImage.src}
                      alt={post.heroImage.alt}
                      className="block h-full w-full"
                      loading={isActive ? 'eager' : 'lazy'}
                      pictureClassName="block h-full w-full"
                      sizes={HERO_IMAGE_SIZES}
                      style={{
                        objectFit: post.heroImage.fit ?? 'cover',
                        objectPosition: post.heroImage.position ?? 'center',
                      }}
                    />
                  </Link>

                  <div className="flex min-w-0 flex-col justify-center p-4 sm:p-6 md:p-8">
                    <time
                      dateTime={post.publishedDate}
                      className="text-muted-foreground text-sm"
                    >
                      {formatPublishedDate(post.publishedDate, activeLanguage)}
                    </time>
                    <h3
                      className={cn(
                        HERO_POST_TITLE_LINE_CLAMP_CLASS,
                        'font-heading mt-3 text-2xl leading-tight font-semibold text-balance sm:text-3xl',
                      )}
                    >
                      <Link
                        to="/{-$locale}/blog/$slug"
                        params={{
                          locale:
                            activeLanguage === 'en'
                              ? undefined
                              : activeLanguage,
                          slug: post.slug,
                        }}
                        className="text-foreground hover:text-primary focus-visible:ring-ring rounded-sm underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground mt-3 line-clamp-4 text-sm leading-6 sm:text-base sm:leading-7">
                      {post.summary}
                    </p>
                    {post.tags.length > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="border-border text-muted-foreground bg-muted/40"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {posts.length > 1 ? (
          <div className="border-border border-t p-3 sm:px-5">
            <div
              aria-label={t('blogCarousel')}
              className="flex flex-wrap items-center justify-center gap-2"
              role="group"
            >
              {posts.map((post, index) => (
                <button
                  key={post.slug}
                  type="button"
                  onClick={() => handleSlideSelect(index)}
                  className={cn(
                    'border-border bg-background text-foreground hover:border-primary hover:text-primary focus-visible:ring-ring inline-flex size-11 items-center justify-center rounded-lg border text-sm font-medium transition-colors motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                    index === activeIndex &&
                      'border-primary bg-primary text-primary-foreground',
                  )}
                  aria-controls={`${carouselId}-slide-${index}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  aria-label={t('carouselGoToSlide', { index: index + 1 })}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export const HeroCarousel = memo(HeroCarouselView)
