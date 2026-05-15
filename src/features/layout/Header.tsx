import { Link, useLocation } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Menu, ArrowLeft } from 'lucide-react'
import { memo, useEffect, useState } from 'react'
import ThemeSelector from '#/features/theme/ThemeSelector'
import LanguageSwitcher from '#/features/i18n/LanguageSwitcher'

const HeaderControls = memo(function HeaderControlsView() {
  return (
    <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
      <LanguageSwitcher />
      <ThemeSelector />
    </div>
  )
})

const noActiveClassName = { className: '' }

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
      data-app-header="true"
      className={`sticky top-0 z-50 px-4 ${
        isMenuOpen
          ? 'bg-(--color-bg)'
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
            className="relative z-70 inline-flex size-10 items-center justify-center rounded-lg text-(--color-muted) transition-colors hover:bg-(--link-bg-hover) hover:text-(--color-text)"
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
              activeProps={noActiveClassName}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/"
              hash="experience"
              className="nav-link shrink-0"
              activeProps={noActiveClassName}
            >
              {t('nav.experience')}
            </Link>
            <Link
              to="/"
              hash="education"
              className="nav-link shrink-0"
              activeProps={noActiveClassName}
            >
              {t('nav.education')}
            </Link>
            <Link
              to="/blog"
              className="nav-link shrink-0"
              activeProps={noActiveClassName}
            >
              {t('nav.blog')}
            </Link>
            <Link
              to="/contact"
              className="nav-link shrink-0"
              activeProps={noActiveClassName}
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
          className={`fixed inset-y-0 left-0 z-70 h-screen w-[min(95vw,27rem)] border-r border-(--line) bg-(--color-bg) p-4 pt-[calc(var(--header-height)+0.75rem)] shadow-xl transition-transform duration-150 ease-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              hash="about"
              className="block rounded-lg px-4 py-3 text-base font-medium text-(--color-text) transition-colors hover:bg-(--link-bg-hover)"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/"
              hash="experience"
              className="block rounded-lg px-4 py-3 text-base font-medium text-(--color-text) transition-colors hover:bg-(--link-bg-hover)"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.experience')}
            </Link>
            <Link
              to="/"
              hash="education"
              className="block rounded-lg px-4 py-3 text-base font-medium text-(--color-text) transition-colors hover:bg-(--link-bg-hover)"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.education')}
            </Link>
            <Link
              to="/blog"
              className="block rounded-lg px-4 py-3 text-base font-medium text-(--color-text) transition-colors hover:bg-(--link-bg-hover)"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.blog')}
            </Link>
            <Link
              to="/contact"
              className="block rounded-lg px-4 py-3 text-base font-medium text-(--color-text) transition-colors hover:bg-(--link-bg-hover)"
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
