import { useMemo } from 'react'
import { marked } from 'marked'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from '@tanstack/react-router'
import {
  ArrowUpRight,
  Box,
  Building2,
  Calendar,
  CheckCircle2,
  Code2,
  Database,
  FolderCheck,
  GitBranch,
  Github,
  Layers3,
  Lock,
  Mail,
  MapPin,
  MonitorCog,
  Network,
  Server,
  ShieldCheck,
  Terminal,
  Workflow,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { resolveSupportedLanguage } from '#/features/i18n/config'
import type { SupportedLanguage } from '#/features/i18n/config'
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
        <div className="relative isolate overflow-hidden">
          <div className="relative z-[1] px-4 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-6xl">
              <HeroSection t={t} language={activeLanguage} />
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
        </div>
        <ExperienceIntroSection t={t} />
        <ExperienceSection t={t} jobs={sortedJobs} language={activeLanguage} />
        <EducationSection t={t} educations={sortedEducations} />
        <ContactSection language={activeLanguage} />
      </BackgroundSection>
    </ScrollSnapPage>
  )
}

function HeroSection({
  t,
  language,
}: {
  t: Translation
  language: SupportedLanguage
}) {
  const heroSummary = limitToSentences(t('careerSummaryText'), 2)

  return (
    <ScrollSnapSection
      id="about"
      className="relative flex flex-col justify-center gap-6 py-5 sm:gap-8 sm:py-8 md:gap-10"
    >
      <div className="grid gap-7 sm:gap-8 md:grid-cols-[minmax(0,1fr)_minmax(24rem,30rem)] md:items-start md:gap-10">
        {/* Left: text content */}
        <div className="order-2 md:order-1 flex flex-col items-center gap-5 text-center sm:gap-6 md:items-start md:gap-8 md:text-left">
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

          <Reveal disabled>
            <h1
              id="about-heading"
              className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-[3.25rem]"
              style={{ color: 'var(--color-text)' }}
            >
              {t('heroTaglinePre')}{' '}
              <span style={{ color: 'var(--color-primary)' }}>
                {t('heroTaglineHighlight1')}
              </span>{' '}
              {t('heroTaglineMid')}{' '}
              <span style={{ color: 'var(--color-primary)' }}>
                {t('heroTaglineHighlight2')}
              </span>
              .
            </h1>
          </Reveal>

          <Reveal disabled>
            <p
              className="text-pretty text-sm leading-relaxed sm:text-lg md:max-w-[36rem]"
              style={{ color: 'var(--color-muted)' }}
            >
              {heroSummary}
            </p>
          </Reveal>

          <Reveal
            disabled
            className="flex w-full flex-col gap-3 sm:flex-row md:w-auto"
          >
            <Link
              to="/{-$locale}/contact"
              params={{ locale: language === 'en' ? undefined : language }}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg px-7 text-sm font-semibold transition-colors duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)"
              style={{
                backgroundColor: 'var(--color-button)',
                // Use the page background color as button text: the default
                // --color-button-text pairing (white on --color-button) is only
                // ~3.2:1 in midnight-editor, while the page background color
                // passes WCAG AA (>=4.5:1) in all three themes.
                color: 'var(--color-bg)',
              }}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {t('contactMe')}
            </Link>
            <a
              href="https://github.com/AndrijaLazic"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border px-7 text-sm font-semibold transition-colors duration-150 hover:bg-(--link-bg-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text)',
              }}
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              {t('viewGitHub')}
            </a>
          </Reveal>
        </div>

        {/* Right: code editor */}
        <Reveal
          disabled
          className="order-1 md:order-2 mx-auto flex w-full max-w-[18rem] flex-col items-center md:w-[90%] md:max-w-[26rem] md:self-center md:justify-self-center"
        >
          <div
            aria-hidden="true"
            className="w-full rounded-lg border border-(--color-border) bg-(--color-surface) p-4"
          >
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
        <CodeToken variant="string">'Software Engineer & DevOps'</CodeToken>
        <CodeToken variant="punctuation">,</CodeToken>
      </CodeLine>
      <CodeLine number={4}>
        {'    '}
        <CodeToken variant="property">location</CodeToken>
        <CodeToken variant="punctuation">:</CodeToken>{' '}
        <CodeToken variant="string">'Serbia'</CodeToken>
      </CodeLine>
      <CodeLine number={5}>
        <CodeToken variant="punctuation">{'};'}</CodeToken>
      </CodeLine>
    </CodeSnippet>
  )
}

function ExperienceSection({
  t,
  jobs,
  language,
}: {
  t: Translation
  jobs: Array<ResumeJob>
  language: SupportedLanguage
}) {
  return (
    <div className="relative w-full overflow-x-hidden bg-(--color-bg)">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 sm:h-8"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to bottom, var(--color-surface-soft), var(--color-bg))',
        }}
      />
      <div className="relative mx-auto flex w-full max-w-6xl min-w-0 flex-col items-center px-3 min-[380px]:px-4 sm:px-6 lg:px-8">
        {jobs.map((job, index) => (
          <JobSection
            key={`${job.company}-${job.jobTitle}-${job.startDate}`}
            t={t}
            job={job}
            index={index}
            id={`experience-${index + 1}`}
            language={language}
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
  language,
}: {
  t: Translation
  job: ResumeJob
  index: number
  id: string
  language: SupportedLanguage
}) {
  const className = cn(
    'relative z-10 flex w-full flex-col items-center justify-start pt-8 pb-16 sm:justify-center sm:py-20',
    index === 0 && 'mt-6 pt-5 sm:mt-8 sm:pt-5',
  )
  const content = (
    <Reveal className="relative flex w-full max-w-6xl min-w-0 flex-col items-center py-2 sm:py-4">
      <div className="relative z-30 w-full min-w-0 transition-transform duration-300">
        <JobCard t={t} job={job} language={language} />
      </div>
    </Reveal>
  )

  if (index !== 0) {
    return (
      <section id={id} className={className}>
        <div
          className="mb-6 h-px w-full bg-(--color-border) sm:mb-8"
          aria-hidden="true"
        />
        {content}
      </section>
    )
  }

  return (
    <ScrollSnapSection
      id={id}
      className={className}
      settledThreshold={{ desktop: 0.9, mobile: 0.7 }}
    >
      {content}
    </ScrollSnapSection>
  )
}

function JobCard({
  t,
  job,
  language,
}: {
  t: Translation
  job: ResumeJob
  language: SupportedLanguage
}) {
  const selectedWorkItems =
    job.selectedWork ?? getJobContentPreviewItems(job.content)

  return (
    <article className="grid w-full min-w-0 gap-4 md:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] md:gap-8">
      {/* Dates — muted uppercase rail on desktop, stacked above details on mobile */}
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold tracking-[0.14em] uppercase text-(--color-muted) md:pt-2">
          <Calendar
            className="h-3.5 w-3.5 shrink-0 text-(--color-accent)"
            aria-hidden="true"
          />
          <time dateTime={job.startDate}>
            {formatResumeDate(job.startDate, language)}
          </time>
          <span aria-hidden="true">–</span>
          {job.endDate ? (
            <time dateTime={job.endDate}>
              {formatResumeDate(job.endDate, language)}
            </time>
          ) : (
            <span>{t('present')}</span>
          )}
        </p>
      </div>

      {/* Details */}
      <div className="min-w-0 space-y-5 sm:space-y-6">
        <header className="min-w-0 space-y-3">
          <div className="flex min-w-0 flex-wrap items-center gap-4">
            <BrandMark job={job} />
            <div className="min-w-0 flex-1 space-y-1.5">
              <h3 className="text-2xl leading-tight font-extrabold break-words text-(--color-text) sm:text-3xl lg:text-4xl">
                {job.jobTitle}
              </h3>
              <p className="flex min-w-0 items-center gap-1.5 text-xs font-bold tracking-[0.16em] uppercase text-(--color-primary)">
                <Building2
                  className="h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="min-w-0 truncate">{job.company}</span>
              </p>
            </div>
          </div>
          <p className="flex min-w-0 items-center gap-2 text-sm font-medium text-(--color-muted)">
            <MapPin
              className="h-4 w-4 shrink-0 text-(--color-accent)"
              aria-hidden="true"
            />
            <span className="min-w-0 break-words">{job.location}</span>
          </p>
        </header>

        <div className="min-w-0 border-l-2 border-(--color-accent) py-0.5 pl-4">
          <p className="text-sm leading-6 font-semibold break-words text-(--color-text)">
            {job.product?.name ?? job.company}
          </p>
          <p className="mt-1 text-sm leading-6 break-words text-(--color-muted)">
            {job.summary}
          </p>
        </div>

        {job.tags.length > 0 ? (
          <section className="min-w-0">
            <SectionHeading
              icon={Layers3}
              label={t('techStack')}
              accentColor="var(--color-accent)"
            />
            <ul className="mt-3 flex flex-wrap gap-2">
              {job.tags.map((tag) => {
                const Icon = getTechIcon(tag)

                return (
                  <li key={tag}>
                    <Badge
                      variant="outline"
                      className="h-8 gap-1.5 rounded-full border-(--color-accent)/35 bg-(--color-accent)/10 px-3 text-xs font-semibold text-(--color-accent) transition-colors duration-200 hover:border-(--color-accent)/60"
                    >
                      <Icon
                        className="h-3.5 w-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      {tag}
                    </Badge>
                  </li>
                )
              })}
            </ul>
          </section>
        ) : null}

        {selectedWorkItems.length > 0 ? (
          <section className="min-w-0">
            <SectionHeading
              icon={CheckCircle2}
              label={t('selectedWork')}
              accentColor="var(--color-primary)"
            />
            <ul className="mt-3 space-y-3">
              {selectedWorkItems.map((item) => {
                const { title, detail } = splitWorkItem(item)

                return (
                  <li key={item} className="flex min-w-0 gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--color-primary-soft) text-(--color-primary)">
                      <CheckCircle2
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <strong className="block text-sm leading-6 font-semibold break-words text-(--color-text)">
                        {title}
                      </strong>
                      {detail ? (
                        <span className="mt-0.5 block text-sm leading-6 break-words text-(--color-muted)">
                          {detail}
                        </span>
                      ) : null}
                    </span>
                  </li>
                )
              })}
            </ul>
          </section>
        ) : null}

        {job.product?.websiteUrl || job.blogSlug ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {job.product?.websiteUrl ? (
              <a
                href={job.product.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="group/project inline-flex h-12 w-full max-w-full items-center justify-center gap-2 rounded-xl border border-(--color-primary) bg-(--color-button) px-5 text-sm font-semibold text-(--color-button-text) shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) active:translate-y-0 sm:w-auto"
              >
                {t('projectCheckOut')}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover/project:translate-x-0.5 group-hover/project:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            ) : null}

            {job.blogSlug ? (
              <Link
                to="/{-$locale}/blog/$slug"
                params={{
                  locale: language === 'en' ? undefined : language,
                  slug: job.blogSlug,
                }}
                className="group/read-more inline-flex h-12 w-full max-w-full items-center justify-center gap-2 rounded-xl border border-(--color-border) bg-(--color-surface-soft) px-5 text-sm font-semibold text-(--color-text) shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-(--color-primary) hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) active:translate-y-0 sm:w-auto"
              >
                {t('blogReadMore')}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover/read-more:translate-x-0.5 group-hover/read-more:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  )
}

function BrandMark({ job }: { job: ResumeJob }) {
  const logoSrc = job.product?.logoSrc
  const logoAlt = job.product?.logoAlt ?? `${job.company} logo`
  const label = job.product?.name ?? job.company

  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-(--color-border) bg-(--color-surface-soft) p-2 shadow-sm">
      {logoSrc ? (
        <img
          src={logoSrc}
          alt={logoAlt}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      ) : (
        <span className="text-base font-extrabold text-(--color-primary)">
          {getInitials(label)}
        </span>
      )}
    </div>
  )
}

type ExperienceIcon = LucideIcon

function SectionHeading({
  icon: Icon,
  label,
  accentColor = 'var(--color-primary)',
}: {
  icon: ExperienceIcon
  label: string
  accentColor?: string
}) {
  return (
    <h4
      className="flex items-center gap-2 text-xs font-bold uppercase"
      style={{ color: accentColor }}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </h4>
  )
}

function getTechIcon(tag: string): ExperienceIcon {
  const normalizedTag = tag.toLowerCase()

  if (normalizedTag.includes('github')) {
    return Github
  }

  if (normalizedTag.includes('ci/cd') || normalizedTag.includes('pipeline')) {
    return Workflow
  }

  if (normalizedTag.includes('docker') || normalizedTag.includes('compose')) {
    return Box
  }

  if (normalizedTag.includes('nginx') || normalizedTag.includes('vps')) {
    return Server
  }

  if (normalizedTag.includes('ssl') || normalizedTag.includes('tls')) {
    return Lock
  }

  if (normalizedTag.includes('linux')) {
    return Terminal
  }

  if (normalizedTag.includes('mysql')) {
    return Database
  }

  if (normalizedTag.includes('keycloak')) {
    return ShieldCheck
  }

  if (normalizedTag.includes('rabbit')) {
    return Network
  }

  if (normalizedTag.includes('spring') || normalizedTag.includes('fastapi')) {
    return GitBranch
  }

  return Code2
}

function splitWorkItem(item: string) {
  const splitPattern =
    /\s+(for|with|across|through|including|from|to|using)\s+/i
  const match = splitPattern.exec(item)

  if (!match || match.index < 12) {
    return {
      title: item,
      detail: '',
    }
  }

  return {
    title: item.slice(0, match.index).replace(/[.,]$/, ''),
    detail: item.slice(match.index).trim(),
  }
}

function getJobContentPreviewItems(content: string, itemLimit = 4) {
  const lines = content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const listItems = lines.filter((line) => /^[-*]\s+/.test(line))

  if (listItems.length > 0) {
    return listItems
      .slice(0, itemLimit)
      .map((item) => item.replace(/^[-*]\s+/, ''))
  }

  const preview = limitToSentences(content, 2)

  return preview ? [preview] : []
}

function getInitials(label: string) {
  return label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
}

function formatResumeDate(value: string, language: SupportedLanguage) {
  const parsed = new Date(`${value}T00:00:00.000Z`)

  if (Number.isNaN(parsed.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat(language === 'sr' ? 'sr-Latn-RS' : 'en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsed)
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
              className="prose prose-slate prose-sm max-w-none text-(--color-muted) dark:prose-invert [&>ul]:mt-2 [&>ul]:mb-0 [&>ul]:list-disc [&>ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: marked(education.content) }}
            />
          ) : null}
        </CardContent>
      </Card>
    </Reveal>
  )
}

function ContactSection({ language }: { language: SupportedLanguage }) {
  return (
    <BackgroundSection
      id="contact"
      snap={{
        settledThreshold: {
          desktop: 0.75,
          mobile: 0.6,
        },
      }}
      reveal={{ duration: 'duration-200' }}
      className="flex w-full items-center justify-center border-t border-(--color-border) bg-(--color-bg)"
      contentClassName="relative mx-auto flex min-h-[calc(100svh-var(--header-height))] w-full max-w-5xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-10"
    >
      <h2
        className="max-w-3xl text-balance text-4xl leading-tight font-bold sm:text-5xl"
        style={{ color: 'var(--color-text)' }}
      >
        Let's build something great.
      </h2>
      <Link
        to="/{-$locale}/contact"
        params={{ locale: language === 'en' ? undefined : language }}
        className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg border px-6 text-sm font-semibold transition-colors duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg) sm:mt-8"
        style={{
          borderColor: 'var(--color-button)',
          backgroundColor: 'var(--color-button)',
          color: 'var(--color-bg)',
        }}
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        Say hi!
      </Link>
    </BackgroundSection>
  )
}
