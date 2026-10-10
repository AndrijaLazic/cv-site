import { Link } from '@tanstack/react-router'
import { ArrowDown, ArrowUpRight, Code2, Github } from 'lucide-react'
import type { useTranslation } from 'react-i18next'
import type { SupportedLanguage } from '#/features/i18n/config'
import { ScrollSnapSection } from '#/shared/ui/scroll-snap'
import { CodeLine, CodeSnippet, CodeToken } from '#/shared/ui/code-snippet'
import { limitToSentences } from './data'

type Translation = ReturnType<typeof useTranslation<'resume'>>['t']

export function HeroSection({
  t,
  language,
}: {
  t: Translation
  language: SupportedLanguage
}) {
  const locale = language === 'en' ? undefined : language

  return (
    <ScrollSnapSection
      id="about"
      aria-labelledby="about-heading"
      className="relative flex flex-col justify-center gap-12 py-12 sm:gap-16 sm:py-16 lg:gap-20 lg:py-20"
    >
      <div className="grid min-w-0 items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
        <div className="min-w-0">
          <h1
            id="about-heading"
            className="max-w-2xl text-balance text-[2.5rem] leading-[1.08] font-bold tracking-[-0.045em] text-(--color-text) sm:text-5xl xl:text-[3.75rem]"
          >
            {t('heroTaglinePre')}{' '}
            <span className="text-(--color-primary)">
              {t('heroTaglineHighlight1')}
            </span>{' '}
            {t('heroTaglineMid')}{' '}
            <span className="text-(--color-primary)">
              {t('heroTaglineHighlight2')}
            </span>
            .
          </h1>
          <p className="mt-6 max-w-lg text-pretty text-base leading-7 text-(--color-muted) sm:mt-8 sm:text-lg sm:leading-8">
            {limitToSentences(t('careerSummaryText'), 2)}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <Link
              to="/{-$locale}/contact"
              params={{ locale }}
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-(--article-primary) px-6 py-3 text-sm font-semibold text-(--article-primary-ink) transition-opacity duration-150 hover:opacity-90 active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary) motion-reduce:transition-none"
            >
              {t('contactMe')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href="https://github.com/AndrijaLazic"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-(--color-muted) px-6 py-3 text-sm font-semibold text-(--color-text) transition-colors duration-150 hover:bg-(--link-bg-hover) active:bg-(--color-surface-soft) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary) motion-reduce:transition-none"
            >
              <Github className="size-4" aria-hidden="true" />
              {t('viewGitHub')}
            </a>
          </div>
        </div>

        <div
          className="relative mx-auto w-full min-w-0 max-w-lg lg:max-w-none"
          aria-hidden="true"
        >
          <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,var(--color-primary-soft),transparent_70%)] opacity-70" />
          <div className="relative overflow-hidden rounded-xl border border-(--article-line) bg-(--color-surface) shadow-xl shadow-(--color-primary-soft)/20">
            <div className="flex items-center justify-between gap-3 border-b border-(--article-line) bg-(--color-surface-soft) px-5 py-4">
              <div className="flex items-center gap-2 font-mono text-xs text-(--color-text)">
                <Code2 className="size-4 text-(--color-primary)" />
                developer.ts
              </div>
              <div className="flex gap-1.5">
                <span className="size-2 rounded-full bg-(--color-muted)/40" />
                <span className="size-2 rounded-full bg-(--color-muted)/40" />
                <span className="size-2 rounded-full bg-(--color-primary)" />
              </div>
            </div>
            <div className="px-4 py-7 sm:px-6 sm:py-9">
              <HeroCodeSnippet />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center border-t border-(--color-border) pt-5 text-sm">
        <Link
          to="/{-$locale}"
          params={{ locale }}
          hash="experience"
          className="inline-flex min-h-11 items-center gap-3 rounded-sm text-(--color-text) transition-colors duration-150 hover:text-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary) motion-reduce:transition-none"
        >
          {t('workExperience')}
          <ArrowDown className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </ScrollSnapSection>
  )
}

function HeroCodeSnippet() {
  return (
    <CodeSnippet className="text-[11px] leading-7 min-[380px]:text-xs sm:text-[13px] [&_code]:block">
      <CodeLine number={1}>
        <CodeToken variant="keyword">const</CodeToken>{' '}
        <CodeToken variant="identifier">developer</CodeToken>{' '}
        <CodeToken variant="punctuation">{'= {'}</CodeToken>
      </CodeLine>
      <CodeLine number={2}>
        {'  '}
        <CodeToken variant="property">name</CodeToken>
        <CodeToken variant="punctuation">: </CodeToken>
        <span className="text-(--article-primary)">'Andrija Lazic'</span>
        <CodeToken variant="punctuation">,</CodeToken>
      </CodeLine>
      <CodeLine number={3}>
        {'  '}
        <CodeToken variant="property">role</CodeToken>
        <CodeToken variant="punctuation">: </CodeToken>
        <span className="text-(--article-primary)">'Software Engineer'</span>
        <CodeToken variant="punctuation">,</CodeToken>
      </CodeLine>
      <CodeLine number={4}>
        {'  '}
        <CodeToken variant="property">focus</CodeToken>
        <CodeToken variant="punctuation">: [</CodeToken>
      </CodeLine>
      {['Backend', 'AI', 'DevOps'].map((focus, index) => (
        <CodeLine key={focus} number={index + 5}>
          {'    '}
          <span className="text-(--article-primary)">'{focus}'</span>
          {index < 2 && <CodeToken variant="punctuation">,</CodeToken>}
        </CodeLine>
      ))}
      <CodeLine number={8}>
        {'  '}
        <CodeToken variant="punctuation">],</CodeToken>
      </CodeLine>
      <CodeLine number={9}>
        {'  '}
        <CodeToken variant="property">location</CodeToken>
        <CodeToken variant="punctuation">: </CodeToken>
        <span className="text-(--article-primary)">'Serbia'</span>
      </CodeLine>
      <CodeLine number={10}>
        <CodeToken variant="punctuation">{'}'}</CodeToken>
      </CodeLine>
    </CodeSnippet>
  )
}
