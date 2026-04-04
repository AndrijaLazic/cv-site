import { useEffect, useMemo, useRef, useState } from 'react'
import { marked } from 'marked'
import { useTranslation } from 'react-i18next'
import {
  allEducationsEns,
  allEducationsSrs,
  allJobsEns,
  allJobsSrs,
} from '../../.content-collections/generated/index.js'

import { createFileRoute } from '@tanstack/react-router'
import { supportedLanguages } from '#/features/i18n/config'
import { Badge } from '#/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '#/shared/ui/card'
import { Separator } from '#/shared/ui/separator'

const sectionOrder = ['about', 'experience', 'education'] as const
type SectionId = (typeof sectionOrder)[number]
type ResumeLanguage = (typeof supportedLanguages)[number]

type ResumeJob = {
  jobTitle: string
  summary: string
  startDate: string
  endDate?: string
  company: string
  location: string
  tags: string[]
  content: string
}

type ResumeEducation = {
  school: string
  summary: string
  startDate: string
  endDate?: string
  tags: string[]
  content: string
}

const fallbackLanguage: ResumeLanguage = 'en'

const jobsByLanguage = {
  en: allJobsEns,
  sr: allJobsSrs,
} as const satisfies Record<ResumeLanguage, ReadonlyArray<ResumeJob>>

const educationsByLanguage = {
  en: allEducationsEns,
  sr: allEducationsSrs,
} as const satisfies Record<ResumeLanguage, ReadonlyArray<ResumeEducation>>

function resolveResumeLanguage(language: string): ResumeLanguage {
  const baseLanguage = language.toLowerCase().split('-')[0]

  if ((supportedLanguages as readonly string[]).includes(baseLanguage)) {
    return baseLanguage as ResumeLanguage
  }

  return fallbackLanguage
}

function parseDate(value?: string) {
  if (!value) {
    return Number.NEGATIVE_INFINITY
  }

  const parsed = Date.parse(value)

  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed
}

function getSectionIndexFromHash(hash: string) {
  const normalizedHash = hash.replace('#', '')
  const id =
    normalizedHash === 'work-experience-heading' ? 'experience' : normalizedHash

  return sectionOrder.indexOf(id as SectionId)
}

export const Route = createFileRoute('/')({
  component: App,
  head: () => ({
    meta: [
      {
        title: 'Professional Resume — Frontend Developer',
      },
      {
        name: 'description',
        content:
          'Experienced frontend developer specializing in React, TypeScript, and modern web technologies. View my work history, skills, and education.',
      },
      {
        property: 'og:title',
        content: 'Professional Resume — Frontend Developer',
      },
      {
        property: 'og:description',
        content:
          'Experienced frontend developer specializing in React, TypeScript, and modern web technologies.',
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
    jobTitle: 'Software Engineer',
    url: 'https://www.linkedin.com/in/andrija-lazic-dev/',
    knowsAbout: ['React', 'Python', 'Devops'],
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
  const activeLanguage = resolveResumeLanguage(
    i18n.resolvedLanguage ?? i18n.language,
  )
  const jobs = jobsByLanguage[activeLanguage]
  const educations = educationsByLanguage[activeLanguage]

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

  const totalSections = sectionOrder.length
  const [visibleSectionCount, setVisibleSectionCount] = useState(1)
  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const revealSectionByHash = () => {
      const sectionIndex = getSectionIndexFromHash(window.location.hash)

      if (sectionIndex < 0) {
        return
      }

      setVisibleSectionCount((current) =>
        Math.max(current, Math.min(sectionIndex + 1, totalSections)),
      )
    }

    revealSectionByHash()
    window.addEventListener('hashchange', revealSectionByHash)

    return () => {
      window.removeEventListener('hashchange', revealSectionByHash)
    }
  }, [totalSections])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (visibleSectionCount >= totalSections) {
      return
    }

    if (!('IntersectionObserver' in window)) {
      setVisibleSectionCount(totalSections)
      return
    }

    const trigger = loadMoreTriggerRef.current

    if (!trigger) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (!entry.isIntersecting) {
          return
        }

        setVisibleSectionCount((current) =>
          Math.min(current + 1, totalSections),
        )
        observer.disconnect()
      },
      {
        root: null,
        rootMargin: '0px 0px 220px 0px',
        threshold: 0.15,
      },
    )

    observer.observe(trigger)

    return () => {
      observer.disconnect()
    }
  }, [totalSections, visibleSectionCount])

  const showExperience = visibleSectionCount >= 2
  const showEducation = visibleSectionCount >= 3

  return (
    <>
      <PersonJsonLd />
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_42%),linear-gradient(to_bottom,rgb(248_250_252),rgb(241_245_249))] dark:bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_45%),linear-gradient(to_bottom,rgb(2_6_23),rgb(3_7_18))]">
        <main className="px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
          <div className="mx-auto max-w-5xl space-y-8 sm:space-y-10">
            <section
              id="about"
              aria-labelledby="about-heading"
              className="scroll-mt-28 space-y-5 sm:space-y-6 sm:scroll-mt-32"
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
            </section>

            {showExperience && (
              <section
                id="experience"
                aria-labelledby="experience-heading"
                className="scroll-mt-28 space-y-5 sm:space-y-6 sm:scroll-mt-32 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3"
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
                    Project highlights are included under each role.
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
            )}

            {showEducation && (
              <section
                id="education"
                aria-labelledby="education-heading"
                className="scroll-mt-28 space-y-5 sm:space-y-6 sm:scroll-mt-32 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3"
              >
                <div className="space-y-2">
                  <h2
                    id="education-heading"
                    className="text-2xl font-semibold text-slate-900 sm:text-3xl dark:text-slate-100"
                  >
                    {t('education')} & Certifications
                  </h2>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  {educations.map((education) => (
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
            )}

            {visibleSectionCount < totalSections && (
              <div
                ref={loadMoreTriggerRef}
                className="flex items-center justify-center py-1 sm:py-3"
              >
                <p className="rounded-full border border-slate-300/80 bg-white/75 px-3 py-1.5 text-center text-xs text-slate-600 backdrop-blur-sm sm:px-4 sm:text-sm dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-400">
                  Scroll to reveal the next section.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
