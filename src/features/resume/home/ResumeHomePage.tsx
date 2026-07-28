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
  Repeat2,
  Rocket,
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
              <span style={{ color: 'var(--color-primary)' }}>
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
              to="/{-$locale}/contact"
              params={{ locale: language === 'en' ? undefined : language }}
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

        {/* Right: code editor */}
        <Reveal
          delayMs={80}
          className="relative order-1 mx-auto flex w-full max-w-[18rem] flex-col items-center gap-2 md:order-2 md:w-[90%] md:max-w-[26rem] md:self-center md:justify-self-center"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-5 rounded-[2rem] opacity-80 blur-2xl md:-inset-7 md:rounded-[2.25rem]"
            style={{
              background:
                'radial-gradient(70% 72% at 52% 38%, color-mix(in srgb, var(--color-primary) 30%, transparent), color-mix(in srgb, var(--color-accent) 12%, transparent) 48%, transparent 76%)',
            }}
          />
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
  const impactItems = job.impact ?? []

  return (
    <Card className="group relative w-full max-w-full min-w-0 gap-0 overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-card) py-0 text-(--color-text) shadow-[0_30px_90px_-55px_color-mix(in_srgb,var(--color-primary)_45%,transparent)] transition-all duration-300 hover:border-(--color-primary) md:mx-auto">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(70% 52% at 100% 0%, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 58%), radial-gradient(52% 48% at 0% 100%, color-mix(in srgb, var(--color-primary) 14%, transparent), transparent 64%), linear-gradient(135deg, color-mix(in srgb, var(--color-surface-soft) 70%, var(--color-card)), var(--color-card) 48%, color-mix(in srgb, var(--color-bg) 42%, var(--color-card)))',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-px rounded-[15px] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-text)_8%,transparent),inset_0_0_48px_color-mix(in_srgb,var(--color-primary)_7%,transparent)]"
        aria-hidden="true"
      />

      <CardContent className="relative z-10 grid w-full min-w-0 p-0 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <aside className="flex min-w-0 flex-col gap-5 border-b border-(--color-border) p-4 sm:p-6 lg:gap-6 lg:border-b-0 lg:p-7">
          <div className="flex min-w-0 flex-col gap-4 min-[390px]:flex-row min-[390px]:items-start min-[390px]:justify-between lg:block lg:space-y-6">
            <BrandMark job={job} />

            <Badge
              variant="secondary"
              className="min-h-8 max-w-full shrink-0 gap-1.5 rounded-full border border-(--color-border) bg-(--color-surface-soft) px-3 py-1.5 text-xs font-semibold whitespace-normal text-(--color-muted) shadow-sm"
            >
              <Calendar className="h-3.5 w-3.5 text-(--color-primary)" />
              <time dateTime={job.startDate}>
                {formatResumeDate(job.startDate, language)}
              </time>{' '}
              -{' '}
              {job.endDate ? (
                <time dateTime={job.endDate}>
                  {formatResumeDate(job.endDate, language)}
                </time>
              ) : (
                t('present')
              )}
            </Badge>
          </div>

          <div className="min-w-0 space-y-4">
            <p className="flex min-w-0 items-center gap-2 text-xs font-bold break-words text-(--color-primary) uppercase">
              <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
              {job.company}
            </p>
            <div className="space-y-3">
              <div>
                <h3 className="text-3xl leading-tight font-extrabold break-words text-(--color-text) sm:text-4xl lg:text-[2.45rem]">
                  {job.jobTitle}
                </h3>
              </div>
              <p className="flex min-w-0 items-center gap-2 text-sm font-medium break-words text-(--color-muted)">
                <MapPin
                  className="h-4 w-4 shrink-0 text-(--color-accent)"
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1 break-words">
                  {job.location}
                </span>
              </p>
            </div>
          </div>

          <div className="min-w-0 border-l border-(--color-accent) py-1 pl-4">
            <p className="text-sm leading-6 font-semibold break-words text-(--color-text)">
              {job.product?.name ?? job.company}
            </p>
            <p className="mt-2 text-sm leading-6 break-words text-(--color-muted)">
              {job.summary}
            </p>
          </div>

          {job.product?.websiteUrl || job.blogSlug ? (
            <div className="flex flex-col gap-3">
              {job.product?.websiteUrl ? (
                <a
                  href={job.product.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group/project inline-flex h-12 w-full max-w-full items-center justify-center gap-2 rounded-xl border border-(--color-primary) bg-(--color-button) px-5 text-sm font-semibold text-(--color-button-text) shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) active:translate-y-0"
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
                  className="group/read-more inline-flex h-12 w-full max-w-full items-center justify-center gap-2 rounded-xl border border-(--color-border) bg-(--color-surface-soft) px-5 text-sm font-semibold text-(--color-text) shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-(--color-primary) hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) active:translate-y-0"
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
        </aside>

        <div className="min-w-0 space-y-5 p-4 sm:space-y-6 sm:p-6 lg:p-7">
          {job.tags.length > 0 ? (
            <section className="min-w-0">
              <SectionHeading
                icon={Layers3}
                label={t('techStack')}
                accentColor="var(--color-accent)"
              />
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:flex md:flex-wrap">
                {job.tags.map((tag) => {
                  const Icon = getTechIcon(tag)

                  return (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="h-11 w-full justify-start gap-2 rounded-xl border-(--color-border) bg-(--color-surface-soft) px-3 text-sm font-semibold text-(--color-text) shadow-sm transition-all duration-200 hover:border-(--color-primary) hover:brightness-105 md:w-auto"
                    >
                      <Icon
                        className="h-4 w-4 shrink-0 text-(--color-accent)"
                        aria-hidden="true"
                      />
                      {tag}
                    </Badge>
                  )
                })}
              </div>
            </section>
          ) : null}

          {selectedWorkItems.length > 0 ? (
            <section className="min-w-0 rounded-2xl border border-(--color-primary) bg-(--color-surface-soft) p-4 shadow-sm sm:p-5">
              <SectionHeading
                icon={CheckCircle2}
                label={t('selectedWork')}
                accentColor="var(--color-primary)"
              />
              <ul
                className={cn(
                  'mt-4 grid gap-3',
                  selectedWorkItems.length === 3
                    ? 'min-[960px]:grid-cols-3 min-[960px]:gap-0'
                    : 'sm:grid-cols-2',
                )}
              >
                {selectedWorkItems.map((item, itemIndex) => {
                  const { title, detail } = splitWorkItem(item)

                  return (
                    <li
                      key={item}
                      className={cn(
                        'flex gap-3 rounded-xl border border-(--color-border) bg-(--color-card) p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-(--color-primary) hover:brightness-105 sm:p-4',
                        selectedWorkItems.length === 3 &&
                          'min-[960px]:rounded-none min-[960px]:border-y-0 min-[960px]:border-r-0 min-[960px]:bg-transparent min-[960px]:px-5 min-[960px]:py-1 min-[960px]:hover:translate-y-0 min-[960px]:hover:brightness-100',
                        selectedWorkItems.length === 3 &&
                          itemIndex > 0 &&
                          'min-[960px]:border-l-(--color-border)',
                        selectedWorkItems.length === 3 &&
                          itemIndex === 0 &&
                          'min-[960px]:border-l-0 min-[960px]:pl-0',
                      )}
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-(--color-primary) bg-(--color-primary-soft) text-(--color-primary)">
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <strong className="block text-sm leading-6 font-bold break-words text-(--color-text)">
                          {title}
                        </strong>
                        {detail ? (
                          <span className="mt-1 block text-sm leading-6 break-words text-(--color-muted)">
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

          <ExperienceImpactList
            label={t('productImpact')}
            items={impactItems}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function BrandMark({ job }: { job: ResumeJob }) {
  const logoSrc = job.product?.logoSrc
  const logoAlt = job.product?.logoAlt ?? `${job.company} logo`
  const label = job.product?.name ?? job.company

  return (
    <div className="flex min-w-0 max-w-full items-center gap-4">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-(--color-border) bg-(--color-surface-soft) p-3 shadow-sm lg:h-28 lg:w-28">
        {logoSrc ? (
          <img
            src={logoSrc}
            alt={logoAlt}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
          />
        ) : (
          <span className="text-lg font-extrabold text-(--color-primary)">
            {getInitials(label)}
          </span>
        )}
      </div>
      <div className="min-w-0 lg:hidden">
        <p className="truncate text-sm font-bold text-(--color-text)">
          {label}
        </p>
        <p className="truncate text-xs text-(--color-muted)">{job.company}</p>
      </div>
    </div>
  )
}

function ExperienceImpactList({
  label,
  items,
}: {
  label: string
  items: Array<string>
}) {
  if (items.length === 0) {
    return null
  }

  return (
    <section className="min-w-0 border-t border-(--color-border) pt-5">
      <SectionHeading
        icon={ShieldCheck}
        label={label}
        accentColor="var(--color-accent)"
      />
      <ul className="mt-4 divide-y divide-(--color-border)">
        {items.map((item, index) => {
          const Icon = getImpactIcon(index)

          return (
            <li
              key={item}
              className="flex min-w-0 gap-3 py-4 first:pt-0 last:pb-0"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-(--color-accent) bg-(--color-primary-soft) text-(--color-accent)">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1 text-sm leading-6 break-words text-(--color-muted) sm:text-[0.95rem]">
                {item}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
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

function getImpactIcon(index: number): ExperienceIcon {
  return [Rocket, Repeat2, ShieldCheck][index] ?? ShieldCheck
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
        to="/{-$locale}/contact"
        params={{ locale: language === 'en' ? undefined : language }}
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
