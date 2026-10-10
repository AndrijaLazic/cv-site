import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from '@tanstack/react-router'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { resolveSupportedLanguage } from '#/features/i18n/config'
import type { SupportedLanguage } from '#/features/i18n/config'
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
import { HeroSection } from './HeroSection'

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
  const isInitialSnapDisabled = useInitialScrollSnapDisabled({
    historyKey: 'resume-home',
  })
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
          {/* Gradient strip: hero → experience background */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8"
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(to bottom, transparent, var(--color-bg))',
            }}
          />
        </div>
        <ExperienceIntroSection t={t} />
        <ExperienceSection t={t} jobs={sortedJobs} language={activeLanguage} />
        <EducationSection
          t={t}
          educations={sortedEducations}
          language={activeLanguage}
        />
        <ContactSection language={activeLanguage} />
      </BackgroundSection>
    </ScrollSnapPage>
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
      value: t('experienceIntroItValue'),
      description: t('experienceIntroItDescription'),
    },
    {
      value: t('experienceIntroAppsValue'),
      description: t('experienceIntroAppsDescription'),
    },
    {
      value: t('experienceIntroProjectsValue'),
      description: t('experienceIntroProjectsDescription'),
    },
  ]

  return (
    <ScrollSnapSection
      id="experience"
      fullHeight={false}
      className="relative w-full bg-(--color-bg)"
    >
      <div className="mx-auto w-full max-w-6xl px-3 min-[380px]:px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">{t('workExperience')}</h2>
        <div className="grid gap-10 border-t border-(--color-text) py-14 md:grid-cols-3 md:gap-16 md:py-24">
          {highlights.map((highlight, index) => (
            <Reveal key={highlight.value} delayMs={index * 120}>
              <p className="font-(family-name:--font-family-heading) text-6xl leading-none font-bold tracking-tight text-(--color-text) sm:text-[68px]">
                {highlight.value}
              </p>
              <p className="mt-3 max-w-xs text-base leading-7 text-(--color-text) sm:text-[17px]">
                {highlight.description}
              </p>
            </Reveal>
          ))}
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
  const Section = index === 0 ? ScrollSnapSection : 'section'

  return (
    <Section
      id={id}
      {...(index === 0 ? { fullHeight: false } : {})}
      className={cn(
        'relative w-full py-10 sm:py-14',
        index > 0 && 'border-t border-(--color-border)',
      )}
    >
      <Reveal className="w-full min-w-0">
        <JobCard t={t} job={job} language={language} />
      </Reveal>
    </Section>
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
  const productName = job.product?.name
  const showProductName =
    productName &&
    !productName.toLowerCase().startsWith(job.company.toLowerCase())
  const linkClassName =
    'inline-flex items-center gap-1.5 font-mono text-sm text-(--color-primary) underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)'

  return (
    <article className="grid w-full min-w-0 gap-5 md:grid-cols-[16rem_minmax(0,1fr)] md:gap-7">
      <div className="min-w-0 space-y-1 font-mono text-sm leading-6 text-(--color-muted) md:pt-0.5">
        <p className="flex flex-wrap gap-x-2">
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
        <p className="break-words">{job.location}</p>
      </div>

      <div className="min-w-0 space-y-6">
        <header className="space-y-2.5">
          <h3 className="text-3xl leading-tight font-bold tracking-tight break-words text-(--color-text) sm:text-4xl">
            {job.jobTitle}
          </h3>
          <p className="font-mono text-sm leading-6 break-words text-(--color-primary)">
            {job.company}
            {showProductName ? <> · {productName}</> : null}
          </p>
        </header>

        <p className="text-base leading-7 break-words text-(--color-text) sm:text-[17px]">
          {job.summary}
        </p>

        {selectedWorkItems.length > 0 ? (
          <ul className="list-disc space-y-2.5 pl-5 text-base leading-7 text-(--color-text) sm:text-[17px]">
            {selectedWorkItems.map((item) => (
              <li key={item} className="break-words">
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        {job.tags.length > 0 ? (
          <p className="font-mono text-xs leading-6 break-words text-(--color-muted) sm:text-[13px]">
            {job.tags.join(' / ')}
          </p>
        ) : null}

        {job.product?.websiteUrl || job.blogSlug ? (
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {job.product?.websiteUrl ? (
              <a
                href={job.product.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className={linkClassName}
              >
                {t('projectCheckOut')}
                <ExternalLink
                  aria-hidden="true"
                  className="size-3.5 shrink-0"
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
                className={linkClassName}
              >
                {t('blogReadMore')}
                <ArrowRight aria-hidden="true" className="size-3.5 shrink-0" />
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  )
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
  language,
}: {
  t: Translation
  educations: Array<ResumeEducation>
  language: SupportedLanguage
}) {
  return (
    <ScrollSnapSection
      id="education"
      fullHeight={false}
      className="relative w-full bg-(--color-bg)"
    >
      <div className="mx-auto w-full max-w-6xl px-3 min-[380px]:px-4 sm:px-6 lg:px-8">
        <div className="border-t border-(--color-text) pt-5 pb-12 sm:pb-16">
          <h2
            id="education-heading"
            className="font-mono text-sm leading-6 font-normal text-(--color-text)"
          >
            {t('educationWithCertifications')}
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-16">
            {educations.map((education, index) => (
              <EducationCard
                key={education.school}
                t={t}
                education={education}
                index={index}
                language={language}
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
  language,
}: {
  t: Translation
  education: ResumeEducation
  index: number
  language: SupportedLanguage
}) {
  const isSingleDate = education.startDate === education.endDate

  return (
    <Reveal delayMs={index * 120} className="min-w-0">
      <article className="space-y-2.5">
        <p className="font-mono text-[13px] leading-6 text-(--color-muted)">
          {education.periodLabel ? (
            education.periodLabel
          ) : isSingleDate ? (
            <time dateTime={education.startDate}>
              {formatResumeDate(education.startDate, language)}
            </time>
          ) : (
            <>
              <time dateTime={education.startDate}>
                {education.startDate.slice(0, 4)}
              </time>
              {' – '}
              {education.endDate ? (
                <time dateTime={education.endDate}>
                  {education.endDate.slice(0, 4)}
                </time>
              ) : (
                t('present')
              )}
            </>
          )}
        </p>
        <h3 className="text-2xl leading-7 font-bold tracking-tight text-(--color-text)">
          {education.school}
        </h3>
        <p className="text-base leading-7 whitespace-pre-line text-(--color-text) sm:text-[17px]">
          {education.summary}
        </p>
      </article>
    </Reveal>
  )
}

function ContactSection({ language }: { language: SupportedLanguage }) {
  const { t } = useTranslation('resume')

  return (
    <BackgroundSection
      id="contact"
      aria-labelledby="contact-heading"
      snap={{
        settledThreshold: {
          desktop: 0.75,
          mobile: 0.6,
        },
      }}
      className="flex w-full items-center justify-center border-t border-(--color-border) bg-(--color-bg)"
      contentClassName="relative mx-auto flex min-h-[calc(100svh-var(--header-height))] w-full max-w-6xl flex-col items-start justify-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <h2
        id="contact-heading"
        className="w-full text-[clamp(2.5rem,6.8vw,6rem)] leading-[1.08] font-bold tracking-[-0.05em]"
      >
        <span className="block text-balance text-(--color-text)">
          {t('contactHeadline')}
        </span>{' '}
        <span className="block text-balance text-(--article-accent)">
          {t('contactHeadlineHighlight')}
        </span>
      </h2>
      <Link
        to="/{-$locale}/contact"
        params={{ locale: language === 'en' ? undefined : language }}
        className="mt-8 inline-flex min-h-14 max-w-full items-center justify-center gap-3 rounded-xl bg-(--article-primary) px-5 py-4 font-mono text-base font-semibold text-(--article-primary-ink) active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--article-primary) sm:mt-12 sm:gap-4 sm:px-8 sm:py-5 sm:text-xl"
      >
        <span aria-hidden="true">&gt;</span>
        <span>{t('contactPrompt')}</span>
        <span
          aria-hidden="true"
          className="cursor-blink h-[1.1em] w-[0.5em] shrink-0 bg-current"
        />
      </Link>
    </BackgroundSection>
  )
}
