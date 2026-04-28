import type { ComponentPropsWithoutRef } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { marked } from 'marked'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight,
  ChevronDown,
  Briefcase,
  Download,
  Mail,
} from 'lucide-react'
import * as contentCollections from '../../.content-collections/generated/index.js'

import { createFileRoute, Link } from '@tanstack/react-router'
import type { SupportedLanguage } from '#/features/i18n/config'
import {
  resolveSupportedLanguage,
  supportedLanguages,
} from '#/features/i18n/config'
import { publicConfig } from '#/shared/config/public-env'
import { Badge } from '#/shared/ui/badge'
import { Card, CardContent, CardHeader } from '#/shared/ui/card'
import { cn } from '#/shared/utils'

type ContentCollections = typeof contentCollections
type ResumeCollectionItem = ContentCollections[keyof ContentCollections][number]
type ResumeJob = Extract<ResumeCollectionItem, { company: string }>
type ResumeEducation = Extract<ResumeCollectionItem, { school: string }>
type CollectionPrefix = 'allJobs' | 'allEducations'
type CollectionItem<TPrefix extends CollectionPrefix> =
  TPrefix extends 'allJobs' ? ResumeJob : ResumeEducation

function toCollectionSuffix(language: SupportedLanguage) {
  return `${language.charAt(0).toUpperCase()}${language.slice(1)}s`
}

function getLocalizedCollection<TPrefix extends CollectionPrefix>(
  prefix: TPrefix,
  language: SupportedLanguage,
) {
  const key =
    `${prefix}${toCollectionSuffix(language)}` as keyof ContentCollections
  const collection = contentCollections[key]

  return (Array.isArray(collection) ? collection : []) as Array<
    CollectionItem<TPrefix>
  >
}

const jobsByLanguage = Object.fromEntries(
  supportedLanguages.map((language) => [
    language,
    getLocalizedCollection('allJobs', language),
  ]),
) as Record<SupportedLanguage, Array<ResumeJob>>

const educationsByLanguage = Object.fromEntries(
  supportedLanguages.map((language) => [
    language,
    getLocalizedCollection('allEducations', language),
  ]),
) as Record<SupportedLanguage, Array<ResumeEducation>>

function parseDate(value?: string) {
  if (!value) {
    return Number.NEGATIVE_INFINITY
  }

  const parsed = Date.parse(value)

  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed
}

function limitToSentences(text: string, sentenceLimit: number) {
  const normalizedText = text.trim()

  if (normalizedText.length === 0) {
    return normalizedText
  }

  const sentences = normalizedText.match(/[^.!?]+[.!?]+|[^.!?]+$/g)

  if (!sentences || sentences.length <= sentenceLimit) {
    return normalizedText
  }

  return sentences
    .slice(0, sentenceLimit)
    .map((sentence) => sentence.trim())
    .join(' ')
}

function useRevealOnFirstView() {
  const elementRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current

    if (!element) {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        setIsVisible(true)
        observer.unobserve(entry.target)
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return { elementRef, isVisible }
}

function getRevealClassName(className?: string) {
  return cn(
    'translate-y-8 opacity-0 transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100',
    className,
  )
}

function AnimatedSection({
  className,
  ...props
}: ComponentPropsWithoutRef<'section'>) {
  const { elementRef, isVisible } = useRevealOnFirstView()

  return (
    <section
      ref={elementRef}
      className={cn(
        getRevealClassName(className),
        isVisible && 'translate-y-0 opacity-100',
      )}
      {...props}
    />
  )
}

function AnimatedArticle({
  className,
  ...props
}: ComponentPropsWithoutRef<'article'>) {
  const { elementRef, isVisible } = useRevealOnFirstView()

  return (
    <article
      ref={elementRef}
      className={cn(
        getRevealClassName(className),
        isVisible && 'translate-y-0 opacity-100',
      )}
      {...props}
    />
  )
}

export const Route = createFileRoute('/')({
  component: App,
  head: () => ({
    meta: [
      {
        title: 'Andrija Lazic | Software Engineer',
      },
      {
        name: 'description',
        content:
          'Explore the professional resume of Andrija Lazic — software engineer with experience in Spring Boot, Python, .NET, AI, and DevOps. View work history, projects, and skills.',
      },
      {
        property: 'og:title',
        content: 'Andrija Lazic | Software Engineer',
      },
      {
        property: 'og:description',
        content:
          'Explore the professional resume of Andrija Lazic — software engineer with experience in Spring Boot, Python, .NET, AI, and DevOps. View work history, projects, and skills.',
      },
      {
        property: 'og:url',
        content: `${publicConfig.siteUrl}/`,
      },
      {
        property: 'og:type',
        content: 'profile',
      },
    ],
  }),
})

function PersonJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Andrija Lazic',
    jobTitle: 'Backend Software Engineer',
    url: publicConfig.siteUrl,
    sameAs: [
      'https://www.linkedin.com/in/andrija-lazic-dev/',
      'https://github.com/AndrijaLazic',
    ],
    knowsAbout: [
      'Spring Boot',
      'Python',
      '.NET',
      'Node.js',
      'Docker',
      'DevOps',
      'Machine Learning',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Faculty of Natural Sciences and Mathematics',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function App() {
  const { t, i18n } = useTranslation('resume')
  const activeLanguage = resolveSupportedLanguage(
    i18n.resolvedLanguage ?? i18n.language,
  )
  const jobs = jobsByLanguage[activeLanguage]
  const educations = educationsByLanguage[activeLanguage]
  const didAutoScrollRef = useRef(false)
  const isJobSnapScrollingRef = useRef(false)
  const jobSnapTimeoutRef = useRef<number | null>(null)
  const jobSectionRefs = useRef<Array<HTMLElement | null>>([])
  const touchStartYRef = useRef<number | null>(null)
  const experienceSectionRef = useRef<HTMLElement | null>(null)
  const [isScrollHintVisible, setIsScrollHintVisible] = useState(true)

  const sortedJobs = useMemo(() => {
    return [...jobs].sort((a, b) => {
      const aIsOngoing = !a.endDate
      const bIsOngoing = !b.endDate

      if (aIsOngoing && !bIsOngoing) {
        return -1
      }

      if (!aIsOngoing && bIsOngoing) {
        return 1
      }

      if (aIsOngoing && bIsOngoing) {
        return parseDate(b.startDate) - parseDate(a.startDate)
      }

      const endDateSort = parseDate(b.endDate) - parseDate(a.endDate)

      if (endDateSort !== 0) {
        return endDateSort
      }

      return parseDate(b.startDate) - parseDate(a.startDate)
    })
  }, [jobs])

  const sortedEducations = useMemo(() => {
    const isBachelorEntry = (education: ResumeEducation) => {
      const combined =
        `${education.school} ${education.summary} ${education.content}`.toLowerCase()

      if (combined.includes('bachelor') || combined.includes('diplom')) {
        return true
      }

      return education.tags.some((tag) =>
        tag.toLowerCase().includes('bachelor'),
      )
    }

    return [...educations].sort((a, b) => {
      const aIsBachelor = isBachelorEntry(a)
      const bIsBachelor = isBachelorEntry(b)

      if (aIsBachelor && !bIsBachelor) {
        return -1
      }

      if (!aIsBachelor && bIsBachelor) {
        return 1
      }

      const aDate = parseDate(a.endDate ?? a.startDate)
      const bDate = parseDate(b.endDate ?? b.startDate)

      if (aDate !== bDate) {
        return bDate - aDate
      }

      return a.school.localeCompare(b.school)
    })
  }, [educations])
  const heroSummary = limitToSentences(t('careerSummaryText'), 2)

  useEffect(() => {
    jobSectionRefs.current = jobSectionRefs.current.slice(0, sortedJobs.length)
  }, [sortedJobs.length])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const shouldAutoScroll = () => {
      if (didAutoScrollRef.current) {
        return false
      }

      if (
        window.location.hash.length > 0 &&
        window.location.hash !== '#about'
      ) {
        return false
      }

      if (window.scrollY > 24) {
        return false
      }

      if (!experienceSectionRef.current) {
        return false
      }

      return true
    }

    const scrollToExperience = () => {
      if (!shouldAutoScroll()) {
        return
      }

      didAutoScrollRef.current = true
      experienceSectionRef.current?.scrollIntoView({
        block: 'start',
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      })
    }

    const getActiveJobSectionIndex = () => {
      const viewportMiddle = window.innerHeight / 2
      let activeIndex = -1
      let closestDistance = Number.POSITIVE_INFINITY

      jobSectionRefs.current.forEach((section, index) => {
        if (!section) {
          return
        }

        const rect = section.getBoundingClientRect()
        const sectionMiddle = rect.top + rect.height / 2
        const distance = Math.abs(sectionMiddle - viewportMiddle)

        if (distance < closestDistance) {
          activeIndex = index
          closestDistance = distance
        }
      })

      return activeIndex
    }

    const isExperienceTimelineInView = () => {
      return jobSectionRefs.current.some((section) => {
        if (!section) {
          return false
        }

        const rect = section.getBoundingClientRect()

        return rect.top < window.innerHeight * 0.72 && rect.bottom > 120
      })
    }

    const scrollToJobSection = (direction: 1 | -1) => {
      if (
        isJobSnapScrollingRef.current ||
        shouldAutoScroll() ||
        !isExperienceTimelineInView()
      ) {
        return false
      }

      const activeIndex = getActiveJobSectionIndex()

      if (activeIndex < 0) {
        return false
      }

      const nextSection = jobSectionRefs.current[activeIndex + direction]

      if (!nextSection) {
        return false
      }

      isJobSnapScrollingRef.current = true
      nextSection.scrollIntoView({
        block: 'start',
        behavior: prefersReducedMotion || direction === -1 ? 'auto' : 'smooth',
      })

      if (jobSnapTimeoutRef.current) {
        window.clearTimeout(jobSnapTimeoutRef.current)
      }

      jobSnapTimeoutRef.current = window.setTimeout(() => {
        isJobSnapScrollingRef.current = false
      }, prefersReducedMotion || direction === -1 ? 0 : 700)

      return true
    }

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches.item(0)
      touchStartYRef.current = touch ? touch.clientY : null
    }

    const onTouchMove = (event: TouchEvent) => {
      const startY = touchStartYRef.current
      const touch = event.touches.item(0)

      if (startY == null || touch == null) {
        return
      }

      const currentY = touch.clientY

      const deltaY = startY - currentY

      if (deltaY > 10 && shouldAutoScroll()) {
        event.preventDefault()
        touchStartYRef.current = currentY
        scrollToExperience()
        return
      }

      if (Math.abs(deltaY) > 24 && scrollToJobSection(deltaY > 0 ? 1 : -1)) {
        event.preventDefault()
        touchStartYRef.current = currentY
      }
    }

    const onTouchEnd = () => {
      touchStartYRef.current = null
    }

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY > 0 && shouldAutoScroll()) {
        event.preventDefault()
        scrollToExperience()
        return
      }

      if (
        Math.abs(event.deltaY) > 8 &&
        scrollToJobSection(event.deltaY > 0 ? 1 : -1)
      ) {
        event.preventDefault()
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      const isDownKey = ['ArrowDown', 'PageDown', ' ', 'Spacebar'].includes(
        event.key,
      )
      const isUpKey = ['ArrowUp', 'PageUp'].includes(event.key)

      if (!isDownKey && !isUpKey) {
        return
      }

      if (
        event.target instanceof HTMLElement &&
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)
      ) {
        return
      }

      if (isDownKey && shouldAutoScroll()) {
        event.preventDefault()
        scrollToExperience()
        return
      }

      if (scrollToJobSection(isDownKey ? 1 : -1)) {
        event.preventDefault()
      }
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)

      if (jobSnapTimeoutRef.current) {
        window.clearTimeout(jobSnapTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const onScroll = () => {
      setIsScrollHintVisible((isVisible) => isVisible && window.scrollY < 40)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      <PersonJsonLd />
      <div className="relative overflow-hidden px-4 sm:px-6 lg:px-10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/28 blur-3xl dark:bg-cyan-500/22" />
          <div className="absolute top-[24rem] -left-24 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl dark:bg-sky-500/15" />
          <div className="absolute top-[38rem] -right-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/15" />
        </div>
        <div className="mx-auto max-w-5xl">
          <AnimatedSection
            id="about"
            className="relative flex min-h-[calc(100svh-var(--header-height))] snap-start snap-always flex-col justify-center"
          >
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div className="order-2 space-y-6 md:order-1 md:space-y-8">
                <div className="space-y-4">
                  <h1
                    id="about-heading"
                    className="text-balance text-center text-4xl font-extrabold tracking-tight text-slate-900 motion-safe:animate-appear-blur sm:text-5xl md:text-left lg:text-6xl dark:text-slate-100"
                    style={{
                      animationDelay: '100ms',
                      animationFillMode: 'both',
                    }}
                  >
                    Andrija Lazic
                  </h1>
                  <div
                    className="motion-safe:animate-appear-blur"
                    style={{
                      animationDelay: '250ms',
                      animationFillMode: 'both',
                    }}
                  >
                    <Badge
                      variant="outline"
                      className="mx-auto flex w-fit rounded-full border-cyan-200/70 bg-cyan-50/70 px-3 py-1 text-sm tracking-[0.14em] text-cyan-700 uppercase dark:border-cyan-800/60 dark:bg-cyan-950/40 dark:text-cyan-200 md:mx-0"
                    >
                      {t('subtitle')}
                    </Badge>
                  </div>
                </div>

                <h2
                  className="text-center text-xl font-medium text-slate-800 motion-safe:animate-appear-blur sm:text-2xl dark:text-slate-200 md:text-left"
                  style={{ animationDelay: '400ms', animationFillMode: 'both' }}
                >
                  {t('careerSummary')}
                </h2>

                <p
                  className="text-pretty text-center text-base leading-relaxed text-slate-600 motion-safe:animate-appear-blur sm:text-lg dark:text-slate-400 md:text-left"
                  style={{ animationDelay: '550ms', animationFillMode: 'both' }}
                >
                  {heroSummary}
                </p>

                <div
                  className="flex flex-col justify-center gap-4 motion-safe:animate-appear-blur sm:flex-row md:justify-start"
                  style={{ animationDelay: '700ms', animationFillMode: 'both' }}
                >
                  <a
                    href="#experience"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-cyan-600 px-8 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(8,145,178,0.39)] transition-colors hover:-translate-y-0.5 hover:bg-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 dark:bg-cyan-600 dark:text-white dark:hover:bg-cyan-500"
                  >
                    <Briefcase className="mr-2 h-5 w-5" />
                    Experience
                  </a>
                  <a
                    href="/CV_Andrija_Lazic.pdf"
                    download
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-8 text-sm font-medium text-slate-900 shadow-sm transition-colors hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-50"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download CV
                  </a>
                </div>
              </div>

              <div
                className="relative order-1 mx-auto w-fit motion-safe:animate-appear-blur md:order-2 md:mx-0"
                style={{ animationDelay: '850ms', animationFillMode: 'both' }}
              >
                <div
                  aria-hidden="true"
                  className="absolute -inset-2 rounded-[1.75rem] bg-gradient-to-b from-cyan-300/55 via-white/20 to-blue-300/55 blur-sm dark:from-cyan-500/30 dark:via-transparent dark:to-blue-600/25"
                />
                <img
                  src="/headshot-on-white.jpg"
                  alt={t('headshot')}
                  className="relative h-[22rem] w-[16rem] rounded-[1.35rem] object-cover shadow-[0_20px_45px_-30px_rgba(15,23,42,0.95)] ring-1 ring-slate-900/10 dark:ring-slate-100/15 md:h-[26rem] md:w-[19rem]"
                  width="292"
                  height="374"
                  loading="eager"
                />
              </div>
            </div>
            {isScrollHintVisible ? (
              <div className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-slate-200/70 bg-white/75 px-4 py-2 text-slate-600 shadow-sm backdrop-blur-sm motion-safe:animate-pulse dark:border-slate-700/80 dark:bg-slate-900/75 dark:text-slate-300 sm:flex">
                <p className="text-sm font-semibold">{t('scrollHint')}</p>
                <ChevronDown className="size-4" aria-hidden="true" />
              </div>
            ) : null}
          </AnimatedSection>

          <div
            className="relative mx-auto w-full md:max-w-4xl"
            id="experience"
            ref={experienceSectionRef}
          >
            <div className="relative flex flex-col items-center w-full">
              {/* Dotted connecting line */}
              <div
                className="absolute bottom-0 left-1/2 top-44 w-0 -translate-x-1/2 border-l-4 border-dotted border-cyan-500/30 dark:border-cyan-400/20 sm:top-40"
                aria-hidden="true"
              />

              {sortedJobs.map((job, index) => (
                <section
                  key={`${job.company}-${job.jobTitle}-${job.startDate}`}
                  ref={(section) => {
                    jobSectionRefs.current[index] = section
                  }}
                  className={cn(
                    'relative z-10 flex min-h-[calc(100svh-var(--header-height))] w-full snap-start snap-always flex-col items-center px-4 py-10 sm:px-6',
                    index === 0 ? 'justify-start pt-16' : 'justify-center',
                  )}
                >
                  {index === 0 ? (
                    <AnimatedSection className="mb-8 space-y-2 text-center">
                      <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl dark:text-slate-100">
                        {t('workExperience')}
                      </h2>
                      <p className="text-sm text-slate-600 sm:text-base dark:text-slate-400">
                        {t('experienceLeadIn')}
                      </p>
                    </AnimatedSection>
                  ) : null}

                  <div className="relative flex w-full max-w-3xl flex-col items-center">
                    {/* The dot itself */}
                    <div
                      aria-hidden="true"
                      className="absolute left-1/2 top-0 z-20 hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500 ring-4 ring-white md:top-1/2 md:block dark:bg-cyan-400 dark:ring-slate-950"
                    />

                    <AnimatedSection className="relative z-30 w-full transition-transform duration-300">
                      <Card className="border-slate-200/90 bg-white/95 py-0 shadow-lg backdrop-blur-sm hover:shadow-xl md:mx-auto dark:border-slate-700/70 dark:bg-slate-900/95">
                        <CardHeader className="space-y-4 border-b border-slate-200/75 py-6 dark:border-slate-800/80">
                          <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
                            <div className="flex-1 space-y-1.5">
                              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50">
                                {job.jobTitle}
                              </h3>
                              <p className="text-base font-semibold text-cyan-700 dark:text-cyan-400">
                                {job.company} · {job.location}
                              </p>
                            </div>

                            <Badge
                              variant="secondary"
                              className="mx-auto shrink-0 rounded-full bg-slate-100/80 text-sm font-semibold text-slate-700 sm:mx-0 sm:self-start dark:bg-slate-800/80 dark:text-slate-200"
                            >
                              <time>{job.startDate}</time> -{' '}
                              {job.endDate ? (
                                <time>{job.endDate}</time>
                              ) : (
                                t('present')
                              )}
                            </Badge>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-5 py-6 text-left">
                          <p className="text-base leading-relaxed font-medium text-slate-700 dark:text-slate-300">
                            {job.summary}
                          </p>

                          {job.content && (
                            <div
                              className="prose prose-slate prose-base max-w-none text-slate-600 dark:prose-invert dark:text-slate-300 [&>ul]:mb-0 [&>ul]:mt-2"
                              dangerouslySetInnerHTML={{
                                __html: marked(job.content),
                              }}
                            />
                          )}

                          <div className="pt-4">
                            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                              {job.tags.map((tag) => (
                                <Badge
                                  key={`${job.jobTitle}-${tag}`}
                                  variant="outline"
                                  className="rounded-full border-slate-300/80 bg-white/80 text-slate-700 dark:border-slate-600/80 dark:bg-slate-800/80 dark:text-slate-200"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {job.blogSlug && (
                            <div className="mt-6 flex justify-center sm:justify-start">
                              <Link
                                to="/blog/$slug"
                                params={{ slug: job.blogSlug }}
                                className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-100 px-6 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                              >
                                {t('blogReadMore')}
                                <ArrowRight
                                  className="ml-2 h-4 w-4"
                                  aria-hidden="true"
                                />
                              </Link>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </AnimatedSection>
                  </div>
                </section>
              ))}
            </div>
          </div>

          <AnimatedSection
            id="education"
            className="flex min-h-[calc(100svh-var(--header-height))] snap-start snap-always flex-col justify-center py-14"
          >
            <div className="rounded-3xl border border-(--line) bg-white/62 p-5 shadow-[0_14px_35px_-30px_rgba(15,23,42,0.85)] backdrop-blur-sm dark:bg-slate-950/55 sm:p-7">
              <div className="mb-6 space-y-2 sm:mb-8">
                <h2
                  id="education-heading"
                  className="text-2xl font-semibold text-slate-900 sm:text-3xl dark:text-slate-100"
                >
                  {t('educationWithCertifications')}
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-5">
                {sortedEducations.map((education, index) => (
                  <AnimatedArticle
                    key={`${education.school}-${education.startDate}`}
                    className="relative pl-5 sm:pl-7"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-8 h-2.5 w-2.5 rounded-full bg-slate-500 ring-4 ring-slate-400/15 dark:bg-slate-300 dark:ring-slate-300/15"
                    />
                    {index < sortedEducations.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="absolute left-[4px] top-11 h-[calc(100%-0.75rem)] w-px bg-gradient-to-b from-slate-400/45 to-slate-300/30 dark:from-slate-500/45 dark:to-slate-700/45"
                      />
                    ) : null}
                    <Card className="border-slate-200/90 bg-white/88 py-0 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700/70 dark:bg-slate-900/82">
                      <CardHeader className="space-y-3 border-b border-slate-200/75 py-5 dark:border-slate-800/80">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <h3 className="text-lg font-semibold text-slate-900 sm:text-xl dark:text-slate-100">
                            {education.school}
                          </h3>

                          <Badge
                            variant="secondary"
                            className="rounded-full bg-slate-100 text-xs font-medium text-slate-700 sm:text-sm dark:bg-slate-800 dark:text-slate-200"
                          >
                            <time>{education.startDate}</time> -{' '}
                            {education.endDate ? (
                              <time>{education.endDate}</time>
                            ) : (
                              t('present')
                            )}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4 py-5">
                        <p className="text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
                          {education.summary}
                        </p>

                        {education.content && (
                          <div
                            className="prose prose-slate prose-sm max-w-none text-slate-700 dark:prose-invert dark:text-slate-300 [&>ul]:mb-0 [&>ul]:mt-2"
                            dangerouslySetInnerHTML={{
                              __html: marked(education.content),
                            }}
                          />
                        )}

                        {education.tags.length > 0 && (
                          <div className="pt-2">
                            <div className="flex flex-wrap gap-2">
                              {education.tags.map((tag) => (
                                <Badge
                                  key={`${education.school}-${tag}`}
                                  variant="outline"
                                  className="rounded-full border-slate-300/70 bg-white/65 text-slate-700 dark:border-slate-600/70 dark:bg-slate-800/75 dark:text-slate-200"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </AnimatedArticle>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection
            id="contact"
            className="flex min-h-[calc(100svh-var(--header-height))] snap-start snap-always flex-col items-center justify-center py-14 pb-24 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
              Let's build something great.
            </h2>
            <p className="mb-8 max-w-xl text-lg text-slate-600 dark:text-slate-400">
              I'm always open to discussing product design work or partnership
              opportunities. Feel free to reach out.
            </p>
            <Link
              to="/contact"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-cyan-600 px-8 text-base font-semibold text-white shadow-[0_4px_14px_0_rgba(8,145,178,0.39)] transition-colors hover:-translate-y-0.5 hover:bg-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 dark:bg-cyan-600 dark:text-white dark:hover:bg-cyan-500"
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Me
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </>
  )
}
