import { useEffect, useMemo, useRef, useState } from 'react'
import { marked } from 'marked'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import * as contentCollections from '../../.content-collections/generated/index.js'

import { createFileRoute } from '@tanstack/react-router'
import type { SupportedLanguage } from '#/features/i18n/config'
import {
  resolveSupportedLanguage,
  supportedLanguages,
} from '#/features/i18n/config'
import { Badge } from '#/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '#/shared/ui/card'
import { Separator } from '#/shared/ui/separator'

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

export const Route = createFileRoute('/')({
  component: App,
  head: () => ({
    meta: [
      {
        title: 'Professional Resume — Backend Software Engineer',
      },
      {
        name: 'description',
        content:
          'Backend software engineer specializing in Spring Boot, Python, .NET, AI-oriented systems, and DevOps workflows. View work history, projects, skills, and education.',
      },
      {
        property: 'og:title',
        content: 'Professional Resume — Backend Software Engineer',
      },
      {
        property: 'og:description',
        content:
          'Backend software engineer specializing in Spring Boot, Python, .NET, AI-oriented systems, and DevOps workflows.',
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
    url: 'https://www.linkedin.com/in/andrija-lazic-dev/',
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
      const combined = `${education.school} ${education.summary} ${education.content}`.toLowerCase()

      if (combined.includes('bachelor') || combined.includes('diplom')) {
        return true
      }

      return education.tags.some((tag) => tag.toLowerCase().includes('bachelor'))
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

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY <= 0 || !shouldAutoScroll()) {
        return
      }

      event.preventDefault()
      scrollToExperience()
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

      if (deltaY <= 10 || !shouldAutoScroll()) {
        return
      }

      event.preventDefault()
      touchStartYRef.current = currentY
      scrollToExperience()
    }

    const onTouchEnd = () => {
      touchStartYRef.current = null
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (!['ArrowDown', 'PageDown', ' ', 'Spacebar'].includes(event.key)) {
        return
      }

      if (
        event.target instanceof HTMLElement &&
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)
      ) {
        return
      }

      if (!shouldAutoScroll()) {
        return
      }

      event.preventDefault()
      scrollToExperience()
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const onScroll = () => {
      setIsScrollHintVisible((previouslyVisible) => {
        if (!previouslyVisible) {
          return false
        }

        return window.scrollY < 32
      })
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
      <div className="min-h-full bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_42%),linear-gradient(to_bottom,rgb(248_250_252),rgb(241_245_249))] dark:bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_45%),linear-gradient(to_bottom,rgb(2_6_23),rgb(3_7_18))]">
        <main className="px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
          <div className="mx-auto max-w-5xl space-y-12 sm:space-y-14">
            <section
              id="about"
              aria-labelledby="about-heading"
              className="relative flex min-h-[calc(100svh-9rem)] flex-col justify-center space-y-5 scroll-mt-28 sm:space-y-6 sm:scroll-mt-32"
            >
              <Card className="border-slate-200/80 bg-white/70 shadow-lg backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/65 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3">
                <CardHeader className="space-y-3">
                  <p className="text-sm font-medium tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400">
                    {t('subtitle')}
                  </p>
                  <h1
                    id="about-heading"
                    className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl dark:text-slate-100"
                  >
                    {t('title')}
                  </h1>
                  <CardTitle className="text-xl text-slate-800 sm:text-2xl dark:text-slate-100">
                    {t('careerSummary')}
                  </CardTitle>
                  <Separator className="mt-2" />
                </CardHeader>
                <CardContent className="grid gap-6 pb-1 md:grid-cols-[1fr_auto] md:items-center">
                  <p className="text-base leading-relaxed text-slate-700 sm:text-lg dark:text-slate-300">
                    {t('careerSummaryText')}
                  </p>
                  <img
                    src="/headshot-on-white.jpg"
                    alt={t('headshot')}
                    className="h-44 w-36 rounded-2xl object-cover shadow-md ring-1 ring-slate-900/10 md:h-52 md:w-44 dark:ring-slate-100/10"
                    width="176"
                    height="208"
                    loading="eager"
                  />
                </CardContent>
              </Card>
              {isScrollHintVisible ? (
                <div className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center text-center text-slate-500 motion-safe:animate-pulse dark:text-slate-400">
                  <p className="text-base font-bold sm:text-lg">
                    {t('scrollHint')}
                  </p>
                  <ChevronDown
                    className="mt-1 size-5 sm:size-6"
                    aria-hidden="true"
                  />
                </div>
              ) : null}
            </section>
            <section
              id="experience"
              ref={experienceSectionRef}
              aria-labelledby="experience-heading"
              className="scroll-mt-28 space-y-5 sm:space-y-6 sm:scroll-mt-32"
            >
              <span id="work-experience-heading" className="sr-only" />
              <div className="space-y-2">
                <h2
                  id="experience-heading"
                  className="text-2xl font-semibold text-slate-900 sm:text-3xl dark:text-slate-100"
                >
                  {t('workExperience')}
                </h2>
                <p className="text-sm text-slate-600 sm:text-base dark:text-slate-400">
                  {t('experienceLeadIn')}
                </p>
              </div>

              <div className="space-y-4 sm:space-y-5">
                {sortedJobs.map((job) => (
                  <article
                    key={`${job.company}-${job.jobTitle}-${job.startDate}`}
                  >
                    <Card className="border-slate-200/85 bg-white/80 shadow-md backdrop-blur-xs transition-shadow hover:shadow-lg dark:border-slate-700/75 dark:bg-slate-900/70">
                      <CardHeader className="space-y-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="space-y-1.5">
                            <h3 className="text-lg font-semibold text-slate-900 sm:text-xl dark:text-slate-100">
                              {job.jobTitle}
                            </h3>
                            <p className="text-sm font-medium text-cyan-700 sm:text-base dark:text-cyan-300">
                              {job.company} · {job.location}
                            </p>
                          </div>

                          <Badge
                            variant="secondary"
                            className="text-xs font-medium sm:text-sm"
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

                      <CardContent className="space-y-4">
                        <p className="text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
                          {job.summary}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {job.tags.map((tag) => (
                            <Badge
                              key={`${job.jobTitle}-${tag}`}
                              variant="outline"
                              className="border-slate-300/70 bg-white/65 text-slate-700 dark:border-slate-600/70 dark:bg-slate-800/75 dark:text-slate-200"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {job.content && (
                          <div
                            className="prose prose-sm max-w-none text-slate-700 dark:prose-invert dark:text-slate-300"
                            dangerouslySetInnerHTML={{
                              __html: marked(job.content),
                            }}
                          />
                        )}
                      </CardContent>
                    </Card>
                  </article>
                ))}
              </div>
            </section>

            <section
              id="education"
              aria-labelledby="education-heading"
              className="scroll-mt-28 space-y-5 sm:space-y-6 sm:scroll-mt-32"
            >
              <div className="space-y-2">
                <h2
                  id="education-heading"
                  className="text-2xl font-semibold text-slate-900 sm:text-3xl dark:text-slate-100"
                >
                  {t('educationWithCertifications')}
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-5">
                {sortedEducations.map((education) => (
                  <article
                    key={`${education.school}-${education.startDate}`}
                    className="rounded-xl"
                  >
                    <Card className="border-slate-200/85 bg-white/80 shadow-md backdrop-blur-xs transition-shadow hover:shadow-lg dark:border-slate-700/75 dark:bg-slate-900/70">
                      <CardHeader className="space-y-3">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <h3 className="text-lg font-semibold text-slate-900 sm:text-xl dark:text-slate-100">
                            {education.school}
                          </h3>

                          <Badge
                            variant="secondary"
                            className="text-xs font-medium sm:text-sm"
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

                      <CardContent className="space-y-4">
                        <p className="text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
                          {education.summary}
                        </p>

                        {education.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {education.tags.map((tag) => (
                              <Badge
                                key={`${education.school}-${tag}`}
                                variant="outline"
                                className="border-slate-300/70 bg-white/65 text-slate-700 dark:border-slate-600/70 dark:bg-slate-800/75 dark:text-slate-200"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {education.content && (
                          <div
                            className="prose prose-sm max-w-none text-slate-700 dark:prose-invert dark:text-slate-300"
                            dangerouslySetInnerHTML={{
                              __html: marked(education.content),
                            }}
                          />
                        )}
                      </CardContent>
                    </Card>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}
