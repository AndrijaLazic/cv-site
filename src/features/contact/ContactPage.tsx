import { useTranslation } from 'react-i18next'
import type { ComponentType } from 'react'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  FileText,
  MapPin,
  MessageSquare,
  Send,
  Sparkles,
} from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '#/shared/ui/brand-icons'
import { BackgroundSection } from '#/shared/ui/background-section'
import { Badge } from '#/shared/ui/badge'
import { cn } from '#/shared/utils'

export function ContactPage() {
  const { t } = useTranslation('common')
  const contactLinks = [
    {
      href: 'https://www.linkedin.com/in/andrija-lazic-dev/',
      label: t('contact.linkedin'),
      description: t('contact.linkedinDescription'),
      icon: LinkedInIcon,
      primary: true,
    },
    {
      href: 'https://github.com/AndrijaLazic',
      label: t('contact.github'),
      description: t('contact.githubDescription'),
      icon: GitHubIcon,
      primary: false,
    },
    {
      href: '/docs/Andrija_Lazic_Resume.docx',
      label: t('contact.resume'),
      description: t('contact.resumeDescription'),
      icon: FileText,
      primary: false,
    },
  ]
  const profileItems = [
    {
      icon: BriefcaseBusiness,
      label: t('contact.focusLabel'),
      value: t('contact.focusValue'),
    },
    {
      icon: MapPin,
      label: t('contact.locationLabel'),
      value: t('contact.locationValue'),
    },
  ]

  return (
    <BackgroundSection
      variant="mesh-blobs"
      className="flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:py-18"
    >
      <section className="relative z-10 mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <div className="flex min-h-[32rem] flex-col justify-between rounded-2xl border border-(--color-border) bg-(--color-card)/92 p-6 shadow-[0_26px_80px_-46px_rgba(15,23,42,0.8)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="border border-(--color-accent)/30 bg-(--color-accent)/12 px-3 py-1 text-(--color-accent)">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {t('contact.availability')}
              </Badge>
              <span className="font-mono text-xs tracking-[0.16em] text-(--color-muted) uppercase">
                {t('contact.kicker')}
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl leading-tight font-extrabold text-(--color-text) sm:text-5xl lg:text-6xl">
                {t('contact.title')}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-(--color-muted) sm:text-lg">
                {t('contact.description')}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {profileItems.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="rounded-xl border border-(--color-border) bg-(--color-surface-soft)/70 p-4"
                >
                  <Icon
                    className="mb-4 h-5 w-5 text-(--color-accent)"
                    aria-hidden="true"
                  />
                  <p className="text-xs font-semibold tracking-[0.14em] text-(--color-muted) uppercase">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-(--color-text)">
                    {item.value}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-2xl border border-(--color-border) bg-(--color-card)/92 p-5 shadow-[0_18px_60px_-42px_rgba(15,23,42,0.78)] backdrop-blur-xl sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-(--color-primary) text-(--color-button-text)">
                <Send className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-(--color-text)">
                  {t('contact.channelsTitle')}
                </h2>
                <p className="text-sm text-(--color-muted)">
                  {t('contact.channelsDescription')}
                </p>
              </div>
            </div>

            <div className="grid gap-3">
              {contactLinks.map((link) => (
                <ContactLink key={link.href} {...link} />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-(--color-border) bg-(--color-card)/92 p-5 shadow-[0_18px_60px_-42px_rgba(15,23,42,0.78)] backdrop-blur-xl sm:p-6">
            <div className="flex gap-4">
              <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-(--color-accent)/30 bg-(--color-accent)/12 text-(--color-accent)">
                <MessageSquare className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-(--color-text)">
                  {t('contact.replyTitle')}
                </h2>
                <p className="text-sm leading-6 text-(--color-muted)">
                  {t('contact.replyDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BackgroundSection>
  )
}

type ContactLinkProps = {
  href: string
  label: string
  description: string
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  primary: boolean
}

function ContactLink({
  href,
  label,
  description,
  icon: Icon,
  primary,
}: ContactLinkProps) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className={cn(
        'group/contact-link flex items-center gap-4 rounded-xl border p-4 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)',
        primary
          ? 'border-(--color-primary) bg-(--color-button) text-(--color-button-text) shadow-[0_14px_32px_-22px_var(--color-primary)]'
          : 'border-(--color-border) bg-(--color-surface) text-(--color-text) hover:border-(--color-primary) hover:bg-(--link-bg-hover)',
      )}
    >
      <span
        className={cn(
          'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border',
          primary
            ? 'border-white/18 bg-white/12 text-(--color-button-text)'
            : 'border-(--color-border) bg-(--color-surface-soft) text-(--color-accent)',
        )}
      >
        <Icon className="h-5 w-5" aria-hidden={true} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold">{label}</span>
        <span
          className={cn(
            'mt-1 block text-sm leading-5',
            primary ? 'text-(--color-button-text)/78' : 'text-(--color-muted)',
          )}
        >
          {description}
        </span>
      </span>
      <ArrowUpRight
        className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover/contact-link:-translate-y-0.5 group-hover/contact-link:translate-x-0.5"
        aria-hidden="true"
      />
    </a>
  )
}
