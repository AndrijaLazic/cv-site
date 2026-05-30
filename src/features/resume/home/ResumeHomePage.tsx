import { useMemo } from 'react'
import { marked } from 'marked'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from '@tanstack/react-router'
import {
  Code2,
  FolderCheck,
  Mail,
  MonitorCog,
  Rocket,
  Sparkles,
} from 'lucide-react'
import { resolveSupportedLanguage } from '#/features/i18n/config'
import { Badge } from '#/shared/ui/badge'
import { Card, CardContent, CardHeader } from '#/shared/ui/card'
import {
  ScrollSnapPage,
  ScrollSnapSection,
  useInitialScrollSnapDisabled,
  useOneTimeScrollSnap,
} from '#/shared/ui/scroll-snap'
import { BackgroundSection } from '#/shared/ui/background-section'
import { CodeLine, CodeSnippet, CodeToken } from '#/shared/ui/code-snippet'
import { Reveal } from '#/shared/ui/reveal'
import { cn } from '#/shared/utils'
import {
  educationsByLanguage,
  jobsByLanguage,
  limitToSentences,
  sortEducations,
  sortJobs,
} from './data'
import type { ResumeEducation, ResumeJob } from './data'

type Translation = ReturnType<typeof useTranslation<'resume'>>['t']

export function ResumeHomePage() {
  const { t, i18n } = useTranslation('resume')
  const locationHash = useLocation({
    select: (location) => location.hash,
  })
  const activeLanguage = resolveSupportedLanguage(
    i18n.resolvedLanguage ?? i18n.language,
  )
  const jobs = jobsByLanguage[activeLanguage]
  const educations = educationsByLanguage[activeLanguage]

  const sortedJobs = useMemo(() => sortJobs(jobs), [jobs])
  const sortedEducations = useMemo(
    () => sortEducations(educations),
    [educations],
  )
  const isInitialSnapDisabled = useInitialScrollSnapDisabled()
  const isHashNavigationActive = Boolean(locationHash)

  useOneTimeScrollSnap({
    enabled: !isInitialSnapDisabled && !isHashNavigationActive,
    snapThreshold: 0.99,
    settleDelayMs: 300,
    snapCooldownMs: 300,
  })

  return (
    <ScrollSnapPage disabled={isInitialSnapDisabled}>
      <BackgroundSection variant="hero-gradient">
        {/* Hero wrapper — relative so the bottom gradient strip is full-bleed */}
        <div className="resume-hero-background relative isolate overflow-hidden">
          <div className="relative z-[1] px-4 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-6xl">
              <HeroSection t={t} />
            </div>
          </div>
          {/* Gradient strip: hero → ExperienceIntroSection color */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20"
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(to bottom, transparent, var(--color-surface-soft))',
            }}
          />
          <div
            className="resume-hero-fill-line pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px"
            aria-hidden="true"
          />
        </div>
        <ExperienceIntroSection t={t} />
        <ExperienceSection t={t} jobs={sortedJobs} />
        <EducationSection t={t} educations={sortedEducations} />
        <ContactSection />
      </BackgroundSection>
    </ScrollSnapPage>
  )
}

function HeroSection({ t }: { t: Translation }) {
  const heroSummary = limitToSentences(t('careerSummaryText'), 2)

  return (
    <ScrollSnapSection
      id="about"
      className="relative flex flex-col justify-center gap-6 py-5 sm:gap-8 sm:py-8 md:gap-10"
    >
      <div className="grid gap-6 sm:gap-8 md:grid-cols-[minmax(0,1fr)_minmax(24rem,30rem)] md:items-start md:gap-10">
        {/* Left: text content */}
        <div className="order-2 flex flex-col items-center gap-4 text-center sm:gap-5 md:order-1 md:items-start md:gap-7 md:pt-6 md:text-left">
          {/* <Reveal delayMs={0}>
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              <span
                className="font-mono text-xs font-semibold tracking-[0.18em] uppercase"
                style={{ color: 'var(--color-muted)' }}
              >
                {t('softwareDeveloper')}
              </span>
            </div>
          </Reveal> */}

          <Reveal delayMs={60}>
            <h1
              id="about-heading"
              className="text-balance text-3xl font-extrabold leading-[1.08] tracking-tight min-[380px]:text-[2.45rem] sm:text-5xl lg:text-[3.25rem]"
              style={{ color: 'var(--color-text)' }}
            >
              {t('heroTaglinePre')}{' '}
              <span style={{ color: 'var(--color-primary)' }}>
                {t('heroTaglineHighlight1')}
              </span>{' '}
              {t('heroTaglineMid')}{' '}
              <span
                style={{
                  background:
                    'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('heroTaglineHighlight2')}
              </span>
              .
            </h1>
          </Reveal>

          <Reveal delayMs={160}>
            <p
              className="text-pretty text-sm leading-relaxed sm:text-lg"
              style={{ color: 'var(--color-muted)' }}
            >
              {heroSummary}
            </p>
          </Reveal>

          <Reveal
            delayMs={260}
            className="flex w-full flex-col gap-3 sm:flex-row md:w-auto"
          >
            <a
              href="#experience"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl px-8 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 active:translate-y-0"
              style={{
                backgroundColor: 'var(--color-primary)',
                boxShadow:
                  '0 4px 18px 0 color-mix(in srgb, var(--color-primary) 40%, transparent)',
                ['--tw-ring-color' as string]: 'var(--color-primary)',
              }}
            >
              <Rocket className="h-4 w-4" aria-hidden="true" />
              {t('viewProjects')}
            </a>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-8 text-sm font-semibold transition hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 active:translate-y-0"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
                backgroundColor:
                  'color-mix(in srgb, var(--color-surface) 80%, transparent)',
                ['--tw-ring-color' as string]: 'var(--color-primary)',
              }}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {t('contactMe')}
            </Link>
          </Reveal>
        </div>

        {/* Right: photo + code editor */}
        <Reveal
          delayMs={80}
          className="relative order-1 mx-auto flex w-full max-w-[13.5rem] flex-col items-start gap-2 sm:max-w-[16rem] md:order-2 md:mx-0 md:w-[84%] md:max-w-none md:justify-self-end md:items-center"
        >
          <div className="relative w-full">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[2rem] opacity-80 blur-2xl md:-inset-7 md:rounded-[2.25rem]"
              style={{
                background:
                  'radial-gradient(70% 72% at 52% 38%, color-mix(in srgb, var(--color-primary) 30%, transparent), color-mix(in srgb, var(--color-accent) 12%, transparent) 48%, transparent 76%)',
              }}
            />
            <img
              src="/hero-headshot-placeholder.png"
              alt={t('headshot')}
              className="relative z-10 h-54 w-full rounded-[1.35rem] object-cover shadow-[0_20px_45px_-30px_rgba(15,23,42,0.95)] ring-1 ring-white/10 sm:h-88 md:h-72 md:rounded-[1.35rem] lg:h-76"
              width="480"
              height="304"
              loading="eager"
              onError={(event) => {
                event.currentTarget.onerror = null
                event.currentTarget.src = '/headshot-on-white.jpg'
              }}
            />
          </div>

          {/* Code editor card */}
          <div
            className="relative z-20 hidden w-full rounded-xl border p-3 shadow-xl backdrop-blur-sm sm:block md:p-4"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor:
                'color-mix(in srgb, var(--color-surface) 95%, transparent)',
            }}
          >
            <div className="mb-2 flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </div>
            <HeroCodeSnippet />
          </div>
        </Reveal>
      </div>
    </ScrollSnapSection>
  )
}

function HeroCodeSnippet() {
  return (
    <CodeSnippet
      className="leading-5 md:text-xs md:leading-6"
      aria-hidden="true"
    >
      <CodeLine number={1}>
        <CodeToken variant="keyword">const</CodeToken>{' '}
        <CodeToken variant="identifier">developer</CodeToken>{' '}
        <CodeToken variant="punctuation">=</CodeToken>{' '}
        <CodeToken variant="punctuation">{'{'}</CodeToken>
      </CodeLine>
      <CodeLine number={2}>
        {'    '}
        <CodeToken variant="property">name</CodeToken>
        <CodeToken variant="punctuation">:</CodeToken>{' '}
        <CodeToken variant="string">'Andrija Lazic'</CodeToken>
        <CodeToken variant="punctuation">,</CodeToken>
      </CodeLine>
      <CodeLine number={3}>
        {'    '}
        <CodeToken variant="property">role</CodeToken>
        <CodeToken variant="punctuation">:</CodeToken>{' '}
        <CodeToken variant="string">'Full Stack Developer'</CodeToken>
      </CodeLine>
      <CodeLine number={4}>
        <CodeToken variant="punctuation">{'};'}</CodeToken>
      </CodeLine>
    </CodeSnippet>
  )
}

function ExperienceSection({
  t,
  jobs,
}: {
  t: Translation
  jobs: Array<ResumeJob>
}) {
  return (
    <div className="relative w-full bg-(--color-bg)">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 sm:h-8"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to bottom, var(--color-surface-soft), var(--color-bg))',
        }}
      />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 sm:px-6 lg:px-10">
        {jobs.map((job, index) => (
          <JobSection
            key={`${job.company}-${job.jobTitle}-${job.startDate}`}
            t={t}
            job={job}
            index={index}
            id={`experience-${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

function ExperienceIntroSection({ t }: { t: Translation }) {
  const highlights = [
    {
      icon: MonitorCog,
      value: t('experienceIntroItValue'),
      label: t('experienceIntroItLabel'),
      description: t('experienceIntroItDescription'),
      className:
        'border-emerald-400/25 bg-emerald-500/10 text-emerald-300 shadow-emerald-500/10',
    },
    {
      icon: Code2,
      value: t('experienceIntroAppsValue'),
      label: t('experienceIntroAppsLabel'),
      description: t('experienceIntroAppsDescription'),
      className:
        'border-sky-400/25 bg-sky-500/10 text-sky-300 shadow-sky-500/10',
    },
    {
      icon: FolderCheck,
      value: t('experienceIntroProjectsValue'),
      label: t('experienceIntroProjectsLabel'),
      description: t('experienceIntroProjectsDescription'),
      className:
        'border-violet-400/25 bg-violet-500/10 text-violet-300 shadow-violet-500/10',
    },
  ]

  return (
    <ScrollSnapSection
      id="experience"
      className="relative z-10 flex w-full flex-col justify-center py-14 sm:py-18"
      style={{ backgroundColor: 'var(--color-surface-soft)' }}
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="mb-8 space-y-3 text-center sm:mb-10 md:text-left">
            <h2 className="text-4xl font-extrabold text-(--color-text) sm:text-5xl">
              {t('workExperience')}
            </h2>
            <p className="text-base font-semibold text-(--color-primary) sm:text-lg">
              {t('experienceLeadIn')}
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-6 text-(--color-muted) sm:text-base sm:leading-7 md:mx-0">
              {t('experienceIntroDescription')}
            </p>
          </div>
        </Reveal>

        <div className="grid w-full gap-4 md:grid-cols-3">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon

            return (
              <Reveal
                key={highlight.label}
                delayMs={index * 120}
                className="h-full"
              >
                <Card className="group h-full overflow-hidden border-(--color-border) bg-(--color-card) py-0 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-(--color-primary) hover:shadow-xl">
                  <CardContent className="relative flex h-full flex-col gap-5 p-6 sm:p-7">
                    <div className="flex h-24 items-center gap-4">
                      <div
                        className={cn(
                          'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border shadow-lg',
                          highlight.className,
                        )}
                      >
                        <Icon className="h-7 w-7" aria-hidden="true" />
                      </div>

                      <div className="min-w-0 space-y-1">
                        <p className="text-3xl font-extrabold tracking-tight text-(--color-text) sm:text-4xl">
                          {highlight.value}
                        </p>
                        <p className="text-sm font-semibold text-(--color-primary) sm:text-base">
                          {highlight.label}
                        </p>
                      </div>
                    </div>

                    <div className="h-px w-full bg-(--color-border)" />

                    <p className="text-sm leading-6 text-(--color-muted) sm:text-base sm:leading-7">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </div>
    </ScrollSnapSection>
  )
}

function JobSection({
  t,
  job,
  index,
  id,
}: {
  t: Translation
  job: ResumeJob
  index: number
  id: string
}) {
  return (
    <ScrollSnapSection
      id={id}
      className={cn(
        'relative z-10 flex w-full flex-col items-center justify-start pt-8 pb-16 sm:justify-center sm:py-20',
        index === 0 && 'pt-5 sm:pt-5',
      )}
      settledThreshold={
        index === 0
          ? { desktop: 0.9, mobile: 0.7 }
          : { desktop: 0.95, mobile: 0.95 }
      }
    >
      <Reveal className="relative flex w-full max-w-3xl flex-col items-center py-2 sm:py-4">
        <div className="relative z-30 w-full transition-transform duration-300">
          <JobCard t={t} job={job} />
        </div>
      </Reveal>
    </ScrollSnapSection>
  )
}

function JobCard({ t, job }: { t: Translation; job: ResumeJob }) {
  return (
    <Card className="group relative overflow-hidden border-[1.5px] border-(--color-border) bg-(--color-card) py-0 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-(--color-primary) hover:shadow-2xl md:mx-auto">
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 10%, transparent), transparent 48%, color-mix(in srgb, var(--color-accent) 5%, transparent))',
        }}
        aria-hidden="true"
      />
      <CardHeader className="relative z-10 space-y-3 border-b border-(--color-border) px-5 py-4 sm:space-y-4 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-2 text-center sm:flex-row sm:items-start sm:justify-between sm:gap-3 sm:text-left">
          <div className="flex-1 space-y-1.5">
            <h3 className="text-lg leading-tight font-bold text-(--color-text) sm:text-2xl">
              {job.jobTitle}
            </h3>
            <p className="text-sm font-semibold text-(--color-primary) sm:text-base">
              {job.company} · {job.location}
            </p>
          </div>

          <Badge
            variant="secondary"
            className="mx-auto shrink-0 rounded-full border border-(--color-border) bg-(--color-surface-soft) text-xs font-semibold text-(--color-muted) sm:mx-0 sm:self-start sm:text-sm"
          >
            <time>{job.startDate}</time> -{' '}
            {job.endDate ? <time>{job.endDate}</time> : t('present')}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-3 px-5 py-4 text-left sm:space-y-5 sm:px-6 sm:py-6">
        <p className="text-sm leading-6 font-medium text-(--color-muted) sm:text-base sm:leading-relaxed">
          {job.summary}
        </p>

        {job.content ? (
          <div
            className="prose prose-slate prose-sm max-w-none text-(--color-muted) dark:prose-invert sm:prose-base [&>p]:my-2 [&>ul]:my-0 [&>ul]:pl-5 [&>ul>li]:my-0"
            dangerouslySetInnerHTML={{ __html: marked(job.content) }}
          />
        ) : null}

        {job.blogSlug ? (
          <div className="mt-3 flex justify-center sm:mt-6">
            <Link
              to="/blog/$slug"
              params={{ slug: job.blogSlug }}
              className="group/read-more inline-flex h-10 items-center justify-center rounded-xl border border-(--color-primary) bg-(--color-button) px-5 text-sm font-semibold text-(--color-button-text) shadow-[0_10px_24px_-14px_var(--color-primary)] ring-1 ring-(--color-primary)/20 transition-all hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) sm:h-11 sm:px-6"
            >
              <Sparkles
                className="mr-2 h-4 w-4 text-(--color-button-text) transition-transform duration-500 group-hover/read-more:-rotate-12 group-hover/read-more:scale-110"
                aria-hidden="true"
              />
              {t('blogReadMore')}
            </Link>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

function EducationSection({
  t,
  educations,
}: {
  t: Translation
  educations: Array<ResumeEducation>
}) {
  return (
    <ScrollSnapSection
      id="education"
      className="relative flex w-full flex-col justify-center bg-(--color-bg) py-18 pt-5 sm:pt-5"
    >
      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-10">
        <div className="rounded-3xl border border-(--color-border) bg-(--color-card) p-7 shadow-[0_14px_35px_-30px_rgba(15,23,42,0.85)] backdrop-blur-sm sm:p-7">
          <div className="mb-6 space-y-2 sm:mb-8">
            <h2
              id="education-heading"
              className="text-2xl font-semibold text-(--color-text) sm:text-3xl"
            >
              {t('educationWithCertifications')}
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {educations.map((education, index) => (
              <EducationCard
                key={`${education.school}-${education.startDate}`}
                t={t}
                education={education}
                index={index}
                isLast={index === educations.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </ScrollSnapSection>
  )
}

function EducationCard({
  t,
  education,
  index,
  isLast,
}: {
  t: Translation
  education: ResumeEducation
  index: number
  isLast: boolean
}) {
  return (
    <Reveal delayMs={index * 150} className="relative pl-5 sm:pl-7">
      <span
        aria-hidden="true"
        className="absolute top-8 left-0 h-2.5 w-2.5 rounded-full bg-(--color-accent) ring-4 ring-(--color-accent)/15"
      />
      {!isLast ? (
        <span
          aria-hidden="true"
          className="absolute top-11 left-[4px] h-[calc(100%-0.75rem)] w-px"
          style={{
            background:
              'linear-gradient(to bottom, color-mix(in srgb, var(--color-accent) 55%, transparent), color-mix(in srgb, var(--color-border) 70%, transparent))',
          }}
        />
      ) : null}

      <Card className="border-(--color-border) bg-(--color-card) py-0 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-(--color-primary) hover:shadow-md">
        <CardHeader className="space-y-3 border-b border-(--color-border) py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <h3 className="text-lg font-semibold text-(--color-text) sm:text-xl">
              {education.school}
            </h3>

            <Badge
              variant="secondary"
              className="rounded-full border border-(--color-border) bg-(--color-surface-soft) text-xs font-medium text-(--color-muted) sm:text-sm"
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
          <p className="text-sm leading-relaxed text-(--color-muted) sm:text-base">
            {education.summary}
          </p>

          {education.content ? (
            <div
              className="prose prose-slate prose-sm max-w-none text-(--color-muted) dark:prose-invert [&>ul]:mt-2 [&>ul]:mb-0"
              dangerouslySetInnerHTML={{ __html: marked(education.content) }}
            />
          ) : null}
        </CardContent>
      </Card>
    </Reveal>
  )
}

function ContactSection() {
  return (
    <BackgroundSection
      id="contact"
      variant="sunset-gradient"
      snap={{
        settledThreshold: {
          desktop: 0.75,
          mobile: 0.6,
        },
      }}
      reveal={{ duration: 'duration-800' }}
      className="flex w-full items-center justify-center"
      contentClassName="relative mx-auto flex min-h-[calc(100svh-var(--header-height))] w-full max-w-5xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-10"
    >
      <h2
        className="max-w-3xl text-6xl leading-[0.92] font-extrabold tracking-normal text-balance sm:text-7xl md:text-8xl"
        style={{ color: 'var(--color-text)' }}
      >
        Let's build something great.
      </h2>
      <Link
        to="/contact"
        className="relative mt-6 inline-flex h-20 rotate-12 items-center justify-center rounded-xl border px-9 text-3xl font-extrabold shadow-2xl backdrop-blur-md transition hover:-translate-y-1 hover:rotate-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) active:translate-y-0 sm:mt-8 sm:h-24 sm:px-11 sm:text-4xl"
        style={{
          borderColor: 'var(--color-border)',
          backgroundColor: 'var(--color-button)',
          color: 'var(--color-button-text)',
          boxShadow:
            '0 24px 70px -30px color-mix(in srgb, var(--color-primary) 70%, transparent)',
        }}
      >
        <Mail className="mr-3 h-7 w-7 sm:h-9 sm:w-9" aria-hidden="true" />
        Say hi!
      </Link>
    </BackgroundSection>
  )
}
