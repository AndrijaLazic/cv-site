import { useEffect, useMemo, useState } from 'react'
import { marked } from 'marked'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { ChevronDown, ExternalLink, Mail, Sparkles } from 'lucide-react'
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
  const isScrollHintVisible = useScrollHintVisible()
  const isInitialSnapDisabled = useInitialScrollSnapDisabled()
  useOneTimeScrollSnap({
    enabled: !isInitialSnapDisabled,
    settleDelayMs: 0,
    snapThreshold: 0.95,
    animationDurationMs: 500,
  })

  return (
    <ScrollSnapPage disabled={isInitialSnapDisabled}>
      <BackgroundSection variant="radial-layered">
        <div className="px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <HeroSection t={t} isScrollHintVisible={isScrollHintVisible} />
          </div>
        </div>
        <ExperienceSection t={t} jobs={sortedJobs} />
        <EducationSection t={t} educations={sortedEducations} />
        <ContactSection />
      </BackgroundSection>
    </ScrollSnapPage>
  )
}

function HeroSection({
  t,
  isScrollHintVisible,
}: {
  t: Translation
  isScrollHintVisible: boolean
}) {
  const heroSummary = limitToSentences(t('careerSummaryText'), 2)

  return (
    <ScrollSnapSection
      id="about"
      className="relative flex flex-col justify-center"
    >
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div className="order-2 space-y-6 md:order-1 md:space-y-8">
          <div className="space-y-3">
            <Reveal delayMs={0}>
              <p
                className="font-mono text-sm tracking-widest"
                style={{ color: 'var(--color-muted)' }}
              >
                {t('heroIntro')}{' '}
                <span className="cursor-blink" aria-hidden="true">
                  _
                </span>
              </p>
            </Reveal>

            <Reveal delayMs={50}>
              <h1
                id="about-heading"
                className="text-balance text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-left lg:text-6xl"
                style={{ color: 'var(--color-text)' }}
              >
                Andrija Lazic
              </h1>
            </Reveal>

            <Reveal delayMs={150}>
              <p
                className="text-center text-base font-semibold tracking-[0.12em] uppercase md:text-left"
                style={{ color: 'var(--color-accent)' }}
              >
                {t('subtitle')}
              </p>
            </Reveal>
          </div>

          <Reveal delayMs={250}>
            <p
              className="text-pretty text-center text-base leading-relaxed sm:text-lg md:text-left"
              style={{ color: 'var(--color-muted)' }}
            >
              {heroSummary}
            </p>
          </Reveal>

          <Reveal
            delayMs={350}
            className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start"
          >
            <a
              href="#experience"
              className="inline-flex h-11 items-center justify-center rounded-xl px-8 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 active:translate-y-0"
              style={{
                backgroundColor: 'var(--color-primary)',
                boxShadow:
                  '0 4px 18px 0 color-mix(in srgb, var(--color-primary) 40%, transparent)',
                ['--tw-ring-color' as string]: 'var(--color-primary)',
              }}
            >
              View Projects
            </a>
            <a
              href="https://github.com/AndrijaLazic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-8 text-sm font-semibold transition hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 active:translate-y-0"
              style={{
                borderColor: 'var(--color-primary)',
                color: 'var(--color-primary)',
                backgroundColor:
                  'color-mix(in srgb, var(--color-primary) 8%, transparent)',
                ['--tw-ring-color' as string]: 'var(--color-primary)',
              }}
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              View GitHub
            </a>
          </Reveal>
        </div>

        <Reveal
          delayMs={100}
          className="relative order-1 mx-auto w-fit md:order-2 md:mx-0"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-2 rounded-[1.75rem] blur-sm"
            style={{
              background:
                'linear-gradient(to bottom, color-mix(in srgb, var(--color-primary) 40%, transparent), color-mix(in srgb, var(--color-accent) 30%, transparent))',
            }}
          />
          <img
            src="/headshot-on-white.jpg"
            alt={t('headshot')}
            className="relative h-[22rem] w-[16rem] rounded-[1.35rem] object-cover shadow-[0_20px_45px_-30px_rgba(15,23,42,0.95)] ring-1 ring-white/10 md:h-[26rem] md:w-[19rem]"
            width="292"
            height="374"
            loading="eager"
          />
        </Reveal>
      </div>

      {isScrollHintVisible ? (
        <div
          className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border px-4 py-2 shadow-sm backdrop-blur-sm motion-safe:animate-pulse sm:flex"
          style={{
            borderColor: 'var(--line)',
            backgroundColor:
              'color-mix(in srgb, var(--color-surface) 80%, transparent)',
            color: 'var(--color-muted)',
          }}
        >
          <p className="text-sm font-semibold">{t('scrollHint')}</p>
          <ChevronDown className="size-4" aria-hidden="true" />
        </div>
      ) : null}
    </ScrollSnapSection>
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
    <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 sm:px-6 lg:px-10">
      {jobs.map((job, index) => (
        <JobSection
          key={`${job.company}-${job.jobTitle}-${job.startDate}`}
          t={t}
          job={job}
          index={index}
          id={index === 0 ? 'experience' : `experience-${index + 1}`}
        />
      ))}
    </div>
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
    >
      {index === 0 ? (
        <Reveal className="mb-8 space-y-2 text-center sm:mt-0">
          <h2 className="text-4xl font-extrabold text-(--color-text) sm:text-5xl">
            {t('workExperience')}
          </h2>
          <p className="text-sm text-(--color-muted) sm:text-base">
            {t('experienceLeadIn')}
          </p>
        </Reveal>
      ) : null}

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
      <CardHeader className="relative z-10 space-y-4 border-b border-(--color-border) py-6">
        <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          <div className="flex-1 space-y-1.5">
            <h3 className="text-xl font-bold text-(--color-text) sm:text-2xl">
              {job.jobTitle}
            </h3>
            <p className="text-base font-semibold text-(--color-primary)">
              {job.company} · {job.location}
            </p>
          </div>

          <Badge
            variant="secondary"
            className="mx-auto shrink-0 rounded-full border border-(--color-border) bg-(--color-surface-soft) text-sm font-semibold text-(--color-muted) sm:mx-0 sm:self-start"
          >
            <time>{job.startDate}</time> -{' '}
            {job.endDate ? <time>{job.endDate}</time> : t('present')}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-5 py-6 text-left">
        <p className="text-base leading-relaxed font-medium text-(--color-muted)">
          {job.summary}
        </p>

        {job.content ? (
          <div
            className="prose prose-slate prose-base max-w-none text-(--color-muted) dark:prose-invert [&>ul]:mt-2 [&>ul]:mb-0"
            dangerouslySetInnerHTML={{ __html: marked(job.content) }}
          />
        ) : null}

        <TagList tags={job.tags} idPrefix={job.jobTitle} centered />

        {job.blogSlug ? (
          <div className="mt-6 flex justify-center">
            <Link
              to="/blog/$slug"
              params={{ slug: job.blogSlug }}
              className="group/read-more inline-flex h-11 items-center justify-center rounded-xl border border-(--color-primary) bg-(--color-button) px-6 text-sm font-semibold text-(--color-button-text) shadow-[0_10px_24px_-14px_var(--color-primary)] ring-1 ring-(--color-primary)/20 transition-all hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)"
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
      className="relative flex w-full flex-col justify-center py-18 pt-5 sm:pt-5"
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

          {education.tags.length > 0 ? (
            <TagList tags={education.tags} idPrefix={education.school} />
          ) : null}
        </CardContent>
      </Card>
    </Reveal>
  )
}

function TagList({
  tags,
  idPrefix,
  centered = false,
}: {
  tags: Array<string>
  idPrefix: string
  centered?: boolean
}) {
  return (
    <div className="pt-4">
      <div
        className={cn(
          'flex flex-wrap gap-2',
          centered && 'justify-center sm:justify-start',
        )}
      >
        {tags.map((tag) => (
          <Badge
            key={`${idPrefix}-${tag}`}
            variant="outline"
            className="rounded-full border-(--color-border) bg-(--color-surface-soft) text-(--color-muted)"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}

function ContactSection() {
  return (
    <BackgroundSection
      id="contact"
      snap={{ settledThreshold: { desktop: 0.8 } }}
      reveal={{ duration: 'duration-600' }}
      className="flex w-full items-center justify-center ring-y ring-(--color-border)"
      style={{
        background:
          'radial-gradient(circle at 22% 20%, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 32%), radial-gradient(circle at 82% 70%, color-mix(in srgb, var(--color-primary) 24%, transparent), transparent 34%), linear-gradient(135deg, var(--color-surface), var(--color-bg))',
      }}
      contentClassName="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-4 py-14 pb-24 text-center sm:px-6 lg:px-10"
    >
      <h2 className="mb-4 text-3xl font-bold tracking-tight text-(--color-text) sm:text-4xl">
        Let's build something great.
      </h2>
      <p className="mb-8 max-w-xl text-lg text-(--color-muted)">
        I'm always open to discussing product design work or partnership
        opportunities. Feel free to reach out.
      </p>
      <Link
        to="/contact"
        className="inline-flex h-12 items-center justify-center rounded-xl bg-(--color-button) px-8 text-base font-semibold text-(--color-button-text) shadow-[0_4px_14px_0_color-mix(in_srgb,var(--color-primary)_38%,transparent)] transition-colors hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) active:translate-y-0 disabled:pointer-events-none disabled:opacity-50"
      >
        <Mail className="mr-2 h-5 w-5" />
        Contact Me
      </Link>
    </BackgroundSection>
  )
}

function useScrollHintVisible() {
  const [isScrollHintVisible, setIsScrollHintVisible] = useState(true)

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

  return isScrollHintVisible
}
