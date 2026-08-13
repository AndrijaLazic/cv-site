import { useTranslation } from 'react-i18next'
import { ArrowUpRight, FileText } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '#/shared/ui/brand-icons'
import type { ReactNode } from 'react'

export function ContactPage() {
  const { t } = useTranslation('common')

  const contactLinks: ContactLinkProps[] = [
    {
      href: 'https://www.linkedin.com/in/andrija-lazic-dev/',
      label: t('contact.linkedin'),
      description: t('contact.linkedinDescription'),
      external: true,
      icon: <LinkedInIcon className="h-5 w-5" />,
    },
    {
      href: 'https://github.com/AndrijaLazic',
      label: t('contact.github'),
      description: t('contact.githubDescription'),
      external: true,
      icon: <GitHubIcon className="h-5 w-5" />,
    },
    {
      href: '/docs/Andrija_Lazic_Resume.docx',
      label: t('contact.resume'),
      description: t('contact.resumeDescription'),
      external: false,
      format: t('contact.resumeFormat'),
      icon: <FileText className="h-5 w-5" />,
    },
  ]

  const profileItems = [
    { label: t('contact.focusLabel'), value: t('contact.focusValue') },
    { label: t('contact.locationLabel'), value: t('contact.locationValue') },
    { label: t('contact.stackLabel'), value: t('contact.stackValue') },
  ]

  return (
    <section className="flex-1 bg-(--color-bg)">
      <div className="page-wrap px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Left: editorial intro (7 columns) */}
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-(--color-muted)">
              {t('contact.kicker')}
            </p>
            <h1 className="mt-3 max-w-2xl text-balance text-4xl leading-[1.05] font-semibold tracking-tight text-(--color-text) sm:text-5xl lg:text-6xl">
              {t('contact.title')}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-(--color-muted) sm:text-lg sm:leading-8">
              {t('contact.description')}
            </p>

            <dl className="mt-10 border-t border-(--color-border)">
              {profileItems.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-1 border-b border-(--color-border) py-4 sm:flex-row sm:items-baseline sm:gap-4"
                >
                  <dt className="text-sm font-semibold text-(--color-text) sm:w-40 sm:shrink-0">
                    {item.label}
                  </dt>
                  <dd className="text-sm leading-6 text-(--color-muted)">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: ruled contact links (5 columns) */}
          <div className="lg:col-span-5">
            <ul className="border-t border-(--color-border)">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <ContactLink {...link} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

type ContactLinkProps = {
  href: string
  label: string
  description: string
  external: boolean
  format?: string
  icon: ReactNode
}

function ContactLink({
  href,
  label,
  description,
  external,
  format,
  icon,
}: ContactLinkProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="group flex items-start justify-between gap-6 border-b border-(--color-border) py-6 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-[3px] focus-visible:ring-offset-(--color-bg)"
    >
      <span
        className="mt-1 h-5 w-5 shrink-0 text-(--color-muted) transition-colors duration-150 group-hover:text-(--color-primary)"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xl leading-snug font-semibold text-(--color-text) underline-offset-4 transition-colors duration-150 group-hover:text-(--color-primary) group-hover:underline sm:text-2xl">
          {label}
        </span>
        <span className="mt-1.5 block text-sm leading-6 text-(--color-muted)">
          {description}
        </span>
        {format ? (
          <span className="mt-2 block text-xs font-semibold tracking-[0.14em] text-(--color-muted) uppercase">
            {format}
          </span>
        ) : null}
      </span>
      <ArrowUpRight
        className="mt-1 h-5 w-5 shrink-0 text-(--color-muted) transition-colors duration-150 group-hover:text-(--color-primary)"
        aria-hidden="true"
      />
    </a>
  )
}
