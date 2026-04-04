import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import ThemeToggle from '#/features/theme/ThemeToggle'
import LanguageSwitcher from '#/features/i18n/LanguageSwitcher'

export default function Header() {
  const { t } = useTranslation('common')

  return (
    <header className="sticky top-0 z-50 border-b border-(--line) bg-(--header-bg) px-4 backdrop-blur-lg">
      <nav
        className="page-wrap flex items-center gap-3 py-3 sm:py-4"
        aria-label="Main navigation"
      >
        <div className="min-w-0 flex-1 overflow-x-auto">
          <div className="flex min-w-max items-center gap-1.5 text-sm font-semibold sm:gap-2">
            <a href="/#about" className="nav-link whitespace-nowrap">
              {t('nav.about')}
            </a>
            <a href="/#experience" className="nav-link whitespace-nowrap">
              {t('nav.experience')}
            </a>
            <a href="/#education" className="nav-link whitespace-nowrap">
              {t('nav.education')}
            </a>
            <Link
              to="/contact"
              className="nav-link whitespace-nowrap"
              activeProps={{
                className: 'nav-link is-active whitespace-nowrap',
              }}
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
