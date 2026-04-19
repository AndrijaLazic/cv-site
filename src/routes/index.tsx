import { useEffect, useMemo, useRef, useState } from 'react'
import { marked } from 'marked'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ChevronDown } from 'lucide-react'
import * as contentCollections from '../../.content-collections/generated/index.js'

import { createFileRoute, Link } from '@tanstack/react-router'
import type { SupportedLanguage } from '#/features/i18n/config'
import {
  resolveSupportedLanguage,
  supportedLanguages,
} from '#/features/i18n/config'
import { publicConfig } from '#/shared/config/public-env'
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
      <div className="relative overflow-hidden px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/28 blur-3xl dark:bg-cyan-500/22" />
          <div className="absolute top-[24rem] -left-24 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl dark:bg-sky-500/15" />
          <div className="absolute top-[38rem] -right-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/15" />
        </div>
        <div className="mx-auto max-w-5xl space-y-14 sm:space-y-16">
          <section
            id="about"
            aria-labelledby="about-heading"
            className="relative flex min-h-[calc(100svh-9rem)] flex-col justify-center scroll-mt-28 pb-14 sm:scroll-mt-32"
          >
            <Card className="relative overflow-hidden border-(--line) bg-white/78 py-0 shadow-[0_30px_80px_-55px_rgba(15,23,42,0.75)] backdrop-blur-xl dark:bg-slate-950/70 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent"
              />
              <CardContent className="grid gap-8 py-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                <div className="order-1 relative mx-auto w-fit md:order-2 md:mx-0">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-2 rounded-[1.75rem] bg-gradient-to-b from-cyan-300/55 via-white/20 to-blue-300/55 blur-sm dark:from-cyan-500/30 dark:via-transparent dark:to-blue-600/25"
                  />
                  <img
                    src="/headshot-on-white.jpg"
                    alt={t('headshot')}
                    className="relative h-[19.5rem] w-[14.3rem] rounded-[1.35rem] object-cover shadow-[0_20px_45px_-30px_rgba(15,23,42,0.95)] ring-1 ring-slate-900/10 md:h-[23.4rem] md:w-[18.2rem] dark:ring-slate-100/15"
                    width="292"
                    height="374"
                    loading="eager"
                  />
                </div>

                <div className="order-2 space-y-4 md:order-1 md:space-y-5">
                  <h1
                    id="about-heading"
                    className="text-balance text-center text-3xl font-bold text-slate-900 sm:text-4xl md:text-left lg:text-5xl dark:text-slate-100"
                  >
                    Andrija Lazic
                  </h1>
                  <Badge
                    variant="outline"
                    className="mx-auto flex w-fit rounded-full border-cyan-200/70 bg-cyan-50/70 px-3 py-1 text-[0.72rem] tracking-[0.14em] text-cyan-700 uppercase md:mx-0 dark:border-cyan-800/60 dark:bg-cyan-950/40 dark:text-cyan-200"
                  >
                    {t('subtitle')}
                  </Badge>
                  <Separator className="bg-gradient-to-r from-cyan-500/40 via-slate-300/60 to-transparent dark:from-cyan-400/30 dark:via-slate-700/80" />
                  <CardTitle className="text-xl text-slate-800 sm:text-2xl dark:text-slate-100">
                    {t('careerSummary')}
                  </CardTitle>
                  <p className="text-pretty text-base leading-relaxed text-slate-700 sm:text-lg dark:text-slate-300">
                    {heroSummary}
                  </p>
                </div>
              </CardContent>
            </Card>
            {isScrollHintVisible ? (
              <div className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-slate-200/70 bg-white/75 px-4 py-2 text-slate-600 shadow-sm backdrop-blur-sm motion-safe:animate-pulse dark:border-slate-700/80 dark:bg-slate-900/75 dark:text-slate-300 sm:flex">
                <p className="text-sm font-semibold">{t('scrollHint')}</p>
                <ChevronDown className="size-4" aria-hidden="true" />
              </div>
            ) : null}
          </section>
          <section
            id="experience"
            ref={experienceSectionRef}
            aria-labelledby="experience-heading"
            className="scroll-mt-28 sm:scroll-mt-32"
          >
            <div className="rounded-3xl border border-(--line) bg-white/62 p-5 shadow-[0_14px_35px_-30px_rgba(15,23,42,0.85)] backdrop-blur-sm dark:bg-slate-950/55 sm:p-7">
              <span id="work-experience-heading" className="sr-only" />
              <div className="mb-6 space-y-2 sm:mb-8">
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
                {sortedJobs.map((job, index) => (
                  <article
                    key={`${job.company}-${job.jobTitle}-${job.startDate}`}
                    className="relative pl-5 sm:pl-7"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-8 h-2.5 w-2.5 rounded-full bg-cyan-500 ring-4 ring-cyan-500/15 dark:bg-cyan-300 dark:ring-cyan-300/20"
                    />
                    {index < sortedJobs.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="absolute left-[4px] top-11 h-[calc(100%-0.75rem)] w-px bg-gradient-to-b from-cyan-400/55 to-slate-300/40 dark:from-cyan-300/45 dark:to-slate-700/50"
                      />
                    ) : null}
                    <Card className="border-slate-200/90 bg-white/88 py-0 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700/70 dark:bg-slate-900/82">
                      <CardHeader className="space-y-4 border-b border-slate-200/75 py-5 dark:border-slate-800/80">
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
                            className="rounded-full bg-slate-100 text-xs font-medium text-slate-700 sm:text-sm dark:bg-slate-800 dark:text-slate-200"
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

                      <CardContent className="space-y-4 py-5">
                        <p className="text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
                          {job.summary}
                        </p>

                        {job.content && (
                          <div
                            className="prose prose-sm prose-slate max-w-none text-slate-700 dark:prose-invert dark:text-slate-300 [&>ul]:mt-2 [&>ul]:mb-0"
                            dangerouslySetInnerHTML={{
                              __html: marked(job.content),
                            }}
                          />
                        )}

                        <div className="pt-2">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            {t('skillsFilter')}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {job.tags.map((tag) => (
                              <Badge
                                key={`${job.jobTitle}-${tag}`}
                                variant="outline"
                                className="rounded-full border-slate-300/70 bg-white/65 text-slate-700 dark:border-slate-600/70 dark:bg-slate-800/75 dark:text-slate-200"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {job.blogSlug && (
                          <Link
                            to="/blog/$slug"
                            params={{ slug: job.blogSlug }}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-700 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300"
                          >
                            {t('blogReadMore')}
                            <ArrowRight className="size-4" aria-hidden="true" />
                          </Link>
                        )}
                      </CardContent>
                    </Card>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            id="education"
            aria-labelledby="education-heading"
            className="scroll-mt-28 sm:scroll-mt-32"
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
                  <article
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
                            className="prose prose-sm prose-slate max-w-none text-slate-700 dark:prose-invert dark:text-slate-300 [&>ul]:mt-2 [&>ul]:mb-0"
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
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
