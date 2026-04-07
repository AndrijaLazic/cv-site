import { Link, useLocation } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Menu, ArrowLeft } from 'lucide-react'
import { memo, useEffect, useState } from 'react'
import ThemeToggle from '#/features/theme/ThemeToggle'
import LanguageSwitcher from '#/features/i18n/LanguageSwitcher'

const HeaderControls = memo(function HeaderControlsView() {
  return (
    <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  )
})

function Header() {
  const { t } = useTranslation('common')
  const locationPathAndHash = useLocation({
    select: (location) => `${location.pathname}${location.hash}`,
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [locationPathAndHash])

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onEscape)
    }
  }, [isMenuOpen])

  return (
    <header
      className={`sticky top-0 z-50 border-b border-(--line) px-4 ${
        isMenuOpen
          ? 'bg-slate-50 dark:bg-slate-950'
          : 'bg-(--header-bg) backdrop-blur-lg'
      }`}
    >
      <nav
        className="page-wrap relative flex min-h-(--header-height) items-center justify-between gap-2 py-2.5 sm:gap-3 sm:py-3"
        aria-label="Main navigation"
      >
        <div className="flex items-center sm:hidden">
          <button
            type="button"
            className="relative z-70 inline-flex size-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {isMenuOpen ? (
              <ArrowLeft className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="hidden min-w-0 flex-1 sm:flex">
          <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto pb-1 text-sm font-semibold sm:gap-2">
            <Link
              to="/"
              hash="about"
              className="nav-link shrink-0"
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/"
              hash="experience"
              className="nav-link shrink-0"
            >
              {t('nav.experience')}
            </Link>
            <Link
              to="/"
              hash="education"
              className="nav-link shrink-0"
            >
              {t('nav.education')}
            </Link>
            <Link
              to="/contact"
              className="nav-link shrink-0"
              activeProps={{
                className: 'nav-link is-active shrink-0',
              }}
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>

        <HeaderControls />
      </nav>

      <div
        className={`fixed inset-0 z-60 transition-opacity duration-150 sm:hidden ${
          isMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden={!isMenuOpen}
      >
        <div
          id="mobile-nav-drawer"
          className={`fixed inset-y-0 left-0 z-70 h-screen w-[min(95vw,27rem)] border-r border-(--line) bg-slate-50 p-4 pt-[calc(var(--header-height)+0.75rem)] shadow-xl transition-transform duration-150 ease-out dark:bg-slate-950 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              hash="about"
              className="block rounded-lg px-4 py-3 text-base font-medium text-slate-900 transition-colors hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/"
              hash="experience"
              className="block rounded-lg px-4 py-3 text-base font-medium text-slate-900 transition-colors hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.experience')}
            </Link>
            <Link
              to="/"
              hash="education"
              className="block rounded-lg px-4 py-3 text-base font-medium text-slate-900 transition-colors hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.education')}
            </Link>
            <Link
              to="/contact"
              className="block rounded-lg px-4 py-3 text-base font-medium text-slate-900 transition-colors hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
              activeProps={{
                className:
                  'block rounded-lg bg-slate-100 px-4 py-3 text-base font-medium text-slate-900 dark:bg-slate-800 dark:text-slate-100',
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
