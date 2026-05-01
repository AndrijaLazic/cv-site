import { useEffect, useMemo, useState } from 'react'
import { marked } from 'marked'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { Briefcase, ChevronDown, Download, Mail, Sparkles } from 'lucide-react'
import { resolveSupportedLanguage } from '#/features/i18n/config'
import { Badge } from '#/shared/ui/badge'
import { Card, CardContent, CardHeader } from '#/shared/ui/card'
import {
  getScrollSnapSectionClassName,
  ScrollSnapSection,
  useOneTimeScrollSnap,
} from '#/shared/ui/scroll-snap'
import { cn } from '#/shared/utils'
import {
  educationsByLanguage,
  jobsByLanguage,
  limitToSentences,
  sortEducations,
  sortJobs,
} from './data'
import type { ResumeEducation, ResumeJob } from './data'
import {
  AnimatedSection,
  getRevealClassName,
  useRevealOnFirstView,
} from './reveal'

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
  useOneTimeScrollSnap({
    settleDelayMs: 0,
    snapThreshold: 0.97,
    animationDurationMs: 500,
  })

  return (
    <div className="relative overflow-x-clip px-4 sm:px-6 lg:px-10">
      <ResumeBackdrop />
      <div className="mx-auto max-w-5xl">
        <HeroSection t={t} isScrollHintVisible={isScrollHintVisible} />
        <ExperienceSection t={t} jobs={sortedJobs} />
        <EducationSection t={t} educations={sortedEducations} />
        <ContactSection />
      </div>
    </div>
  )
}

function ResumeBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/28 blur-3xl dark:bg-cyan-500/22" />
      <div className="absolute top-[24rem] -left-24 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl dark:bg-sky-500/15" />
      <div className="absolute top-[38rem] -right-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/15" />
    </div>
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
    <section
      id="about"
      className={getScrollSnapSectionClassName(
        'relative flex flex-col justify-center',
      )}
    >
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div className="order-2 space-y-6 md:order-1 md:space-y-8">
          <div className="space-y-4">
            <h1
              id="about-heading"
              className="text-balance text-center text-4xl font-extrabold tracking-tight text-slate-900 motion-safe:animate-appear-blur sm:text-5xl md:text-left lg:text-6xl dark:text-slate-100"
              style={{ animationDelay: '50ms', animationFillMode: 'both' }}
            >
              Andrija Lazic
            </h1>
            <div
              className="motion-safe:animate-appear-blur"
              style={{ animationDelay: '250ms', animationFillMode: 'both' }}
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
          style={{ animationDelay: '50ms', animationFillMode: 'both' }}
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
    </section>
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
    <div className="relative mx-auto w-full md:max-w-4xl">
      <div className="relative flex w-full flex-col items-center">
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
        'relative z-10 flex w-full flex-col items-center justify-center px-4 py-16 sm:px-6 sm:py-20',
        index === 0 && 'justify-start pt-24 sm:justify-center sm:pt-10',
      )}
    >
      {index === 0 ? (
        <AnimatedSection className="mb-8 space-y-2 text-center sm:mt-0">
          <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl dark:text-slate-100">
            {t('workExperience')}
          </h2>
          <p className="text-sm text-slate-600 sm:text-base dark:text-slate-400">
            {t('experienceLeadIn')}
          </p>
        </AnimatedSection>
      ) : null}

      <AnimatedSection className="relative flex w-full max-w-3xl flex-col items-center py-2 sm:py-4">
        <div className="relative z-30 w-full transition-transform duration-300">
          <JobCard t={t} job={job} />
        </div>
      </AnimatedSection>
    </ScrollSnapSection>
  )
}

function JobCard({ t, job }: { t: Translation; job: ResumeJob }) {
  return (
    <Card className="group relative overflow-hidden border-[1.5px] border-slate-200/80 bg-white/70 py-0 shadow-xl shadow-cyan-900/5 backdrop-blur-xl transition-all duration-500 hover:border-cyan-300/60 hover:shadow-2xl hover:shadow-cyan-900/10 md:mx-auto dark:border-slate-700/60 dark:bg-slate-900/70 dark:shadow-cyan-950/30 dark:hover:border-cyan-700/60">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-100/30 via-transparent to-blue-100/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-cyan-900/20 dark:to-blue-900/20"
        aria-hidden="true"
      />
      <CardHeader className="relative z-10 space-y-4 border-b border-slate-200/75 py-6 dark:border-slate-800/80">
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
            {job.endDate ? <time>{job.endDate}</time> : t('present')}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-5 py-6 text-left">
        <p className="text-base leading-relaxed font-medium text-slate-700 dark:text-slate-300">
          {job.summary}
        </p>

        {job.content ? (
          <div
            className="prose prose-slate prose-base max-w-none text-slate-600 dark:prose-invert dark:text-slate-300 [&>ul]:mt-2 [&>ul]:mb-0"
            dangerouslySetInnerHTML={{ __html: marked(job.content) }}
          />
        ) : null}

        <TagList tags={job.tags} idPrefix={job.jobTitle} centered />

        {job.blogSlug ? (
          <div className="mt-6 flex justify-center">
            <Link
              to="/blog/$slug"
              params={{ slug: job.blogSlug }}
              className="group inline-flex h-11 items-center justify-center rounded-xl bg-cyan-50/50 px-6 text-sm font-semibold text-cyan-900 shadow-sm ring-1 ring-cyan-200/50 transition-all hover:bg-cyan-100 hover:ring-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:bg-cyan-950/30 dark:text-cyan-100 dark:ring-cyan-800/40 dark:hover:bg-cyan-900/50 dark:hover:ring-cyan-700"
            >
              <Sparkles
                className="mr-2 h-4 w-4 text-cyan-500 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 dark:text-cyan-400"
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
  const { elementRef: eduListRef, isVisible: isEduListVisible } =
    useRevealOnFirstView()

  return (
    <ScrollSnapSection
      id="education"
      snapOffset={99}
      className="relative flex flex-col justify-center py-18"
    >
      <div className="rounded-3xl border border-(--line) bg-white/62 p-7 shadow-[0_14px_35px_-30px_rgba(15,23,42,0.85)] backdrop-blur-sm dark:bg-slate-950/55 sm:p-7">
        <div className="mb-6 space-y-2 sm:mb-8">
          <h2
            id="education-heading"
            className="text-2xl font-semibold text-slate-900 sm:text-3xl dark:text-slate-100"
          >
            {t('educationWithCertifications')}
          </h2>
        </div>

        <div className="space-y-4 sm:space-y-5" ref={eduListRef}>
          {educations.map((education, index) => (
            <EducationCard
              key={`${education.school}-${education.startDate}`}
              t={t}
              education={education}
              index={index}
              isVisible={isEduListVisible}
              isLast={index === educations.length - 1}
            />
          ))}
        </div>
      </div>
    </ScrollSnapSection>
  )
}

function EducationCard({
  t,
  education,
  index,
  isVisible,
  isLast,
}: {
  t: Translation
  education: ResumeEducation
  index: number
  isVisible: boolean
  isLast: boolean
}) {
  return (
    <article
      className={cn(
        'relative pl-5 sm:pl-7',
        getRevealClassName(),
        isVisible && 'translate-y-0 opacity-100',
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <span
        aria-hidden="true"
        className="absolute top-8 left-0 h-2.5 w-2.5 rounded-full bg-slate-500 ring-4 ring-slate-400/15 dark:bg-slate-300 dark:ring-slate-300/15"
      />
      {!isLast ? (
        <span
          aria-hidden="true"
          className="absolute top-11 left-[4px] h-[calc(100%-0.75rem)] w-px bg-gradient-to-b from-slate-400/45 to-slate-300/30 dark:from-slate-500/45 dark:to-slate-700/45"
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

          {education.content ? (
            <div
              className="prose prose-slate prose-sm max-w-none text-slate-700 dark:prose-invert dark:text-slate-300 [&>ul]:mt-2 [&>ul]:mb-0"
              dangerouslySetInnerHTML={{ __html: marked(education.content) }}
            />
          ) : null}

          {education.tags.length > 0 ? (
            <TagList tags={education.tags} idPrefix={education.school} />
          ) : null}
        </CardContent>
      </Card>
    </article>
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
            className="rounded-full border-slate-300/80 bg-white/80 text-slate-700 dark:border-slate-600/80 dark:bg-slate-800/80 dark:text-slate-200"
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
    <ScrollSnapSection
      id="contact"
      className="flex flex-col items-center justify-center py-14 pb-24 text-center"
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
    </ScrollSnapSection>
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
