import { Link } from '@tanstack/react-router'
import { memo, useId, useRef, useState } from 'react'
import type { TouchEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '#/shared/utils'
import type { SupportedLanguage } from '#/features/i18n/languages'
import type { BlogPostSummary } from '#/features/blog/types/blog'
import { HERO_IMAGE_SIZES } from '../contentImages'
import { ResponsiveImage } from './ResponsiveImage'

type HeroCarouselProps = {
  posts: BlogPostSummary[]
  activeLanguage: SupportedLanguage
}

function HeroCarouselView({ posts, activeLanguage }: HeroCarouselProps) {
  const { t } = useTranslation('resume')
  const [carouselIndex, setCarouselIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const carouselId = useId()
  if (posts.length === 0) return null
  const activeIndex = carouselIndex % posts.length
  function moveSlide(direction: number) {
    setCarouselIndex(
      (index) => (index + direction + posts.length) % posts.length,
    )
  }
  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    if (touchStartX.current === null) return
    const distance = touchStartX.current - event.changedTouches[0].clientX
    if (Math.abs(distance) > 50) moveSlide(distance > 0 ? 1 : -1)
    touchStartX.current = null
  }
  return (
    <section
      aria-label={t('blogLatestPost')}
      aria-roledescription={t('blogCarousel')}
      className="touch-pan-y"
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX
      }}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => {
        touchStartX.current = null
      }}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="font-heading text-foreground text-xl font-semibold">
          {t('blogLatestPost')}
        </h2>
        <span
          className="text-muted-foreground font-mono text-xs tabular-nums"
          aria-live="polite"
          aria-atomic="true"
        >
          {String(activeIndex + 1).padStart(2, '0')} /{' '}
          {String(posts.length).padStart(2, '0')}
        </span>
      </div>
      <div className="border-border bg-card overflow-hidden rounded-[20px] border">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {posts.map((post, index) => {
              const isActive = index === activeIndex
              const params = {
                locale: activeLanguage === 'en' ? undefined : activeLanguage,
                slug: post.slug,
              }
              return (
                <article
                  key={post.slug}
                  id={`${carouselId}-slide-${index}`}
                  aria-hidden={!isActive}
                  inert={!isActive}
                  className="grid w-full min-w-0 shrink-0 md:grid-cols-2"
                >
                  <Link
                    to="/{-$locale}/blog/$slug"
                    params={params}
                    className="border-border bg-background focus-visible:ring-ring order-first block aspect-[7/3] min-w-0 overflow-hidden border-b focus-visible:ring-2 focus-visible:ring-inset focus-visible:outline-none md:order-last md:aspect-auto md:min-h-[400px] md:border-b-0 md:border-l"
                    style={{
                      backgroundColor: post.heroImage.bgColor,
                      padding: post.heroImage.padding,
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
                        objectFit: post.heroImage.fit ?? 'contain',
                        objectPosition: post.heroImage.position ?? 'center',
                      }}
                    />
                  </Link>
                  <div className="flex min-w-0 flex-col justify-center px-6 py-6 sm:p-10 lg:p-11">
                    <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs leading-6 tracking-wider uppercase">
                      <time dateTime={post.publishedDate}>
                        {new Date(post.publishedDate).toLocaleDateString(
                          activeLanguage === 'sr' ? 'sr-Latn-RS' : 'en-US',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            timeZone: 'UTC',
                          },
                        )}
                      </time>
                      {post.tags.length > 0 && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>
                            {post.tags.includes('AI') ? 'AI + ' : ''}
                            {post.tags[0]}
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="font-heading mt-3 text-2xl sm:mt-4 sm:text-3xl leading-[1.15] font-bold tracking-tight text-balance lg:text-4xl">
                      <Link
                        to="/{-$locale}/blog/$slug"
                        params={params}
                        className="text-foreground hover:text-primary focus-visible:ring-ring rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground mt-4 line-clamp-4 text-[15px] leading-[1.55] sm:mt-5 sm:text-base sm:leading-[1.65] lg:text-lg">
                      {post.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-secondary text-muted-foreground rounded-md px-2.5 py-1 font-mono text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to="/{-$locale}/blog/$slug"
                      params={params}
                      className="text-primary focus-visible:ring-ring mt-2 inline-flex min-h-11 sm:mt-5 w-fit items-center gap-1 rounded-sm text-sm font-semibold hover:underline focus-visible:ring-2 focus-visible:outline-none"
                    >
                      {t('blogReadWriteUp')} <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
        {posts.length > 1 && (
          <div className="border-border flex min-h-[60px] items-center justify-between gap-4 border-t px-5 sm:px-6">
            <div
              className="flex items-center"
              role="group"
              aria-label={t('blogCarousel')}
            >
              {posts.map((post, index) => (
                <button
                  key={post.slug}
                  type="button"
                  onClick={() => setCarouselIndex(index)}
                  className="focus-visible:ring-ring flex min-h-11 min-w-6 items-center justify-center rounded-sm px-1.5 focus-visible:ring-2 focus-visible:outline-none"
                  aria-controls={`${carouselId}-slide-${index}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  aria-label={t('carouselGoToSlide', { index: index + 1 })}
                >
                  <span
                    className={cn(
                      'bg-muted-foreground/35 h-2.5 w-2.5 rounded-full',
                      index === activeIndex && 'bg-primary w-7',
                    )}
                  />
                </button>
              ))}
            </div>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => moveSlide(-1)}
                aria-label={t('blogPreviousPost')}
                className="border-border text-foreground hover:border-primary hover:text-primary focus-visible:ring-ring flex size-11 items-center justify-center rounded-xl border transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => moveSlide(1)}
                aria-label={t('blogNextPost')}
                className="border-border text-foreground hover:border-primary hover:text-primary focus-visible:ring-ring flex size-11 items-center justify-center rounded-xl border transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
export const HeroCarousel = memo(HeroCarouselView)
