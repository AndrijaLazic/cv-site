import { Link, useLocation } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Menu, ArrowLeft } from 'lucide-react'
import { memo, useEffect, useState } from 'react'
import ThemeSelector from '#/features/theme/ThemeSelector'
import LanguageSwitcher from '#/features/i18n/LanguageSwitcher'
import { getLocaleFromPath } from '#/features/i18n/url'

const HeaderControls = memo(function HeaderControlsView({
  className = '',
}: {
  className?: string
}) {
  return (
    <div className={`flex shrink-0 items-center gap-1.5 sm:gap-2 ${className}`}>
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

  const pathname = useLocation({
    select: (location) => location.pathname,
  })
  const currentLocale = getLocaleFromPath(pathname)
  const routeLocale = currentLocale === 'en' ? undefined : currentLocale

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
        isMenuOpen ? 'bg-(--color-bg)' : 'bg-(--header-bg) backdrop-blur-lg'
      }`}
    >
      <nav
        className="page-wrap relative flex min-h-(--header-height) items-center justify-between gap-2 py-1.5 sm:gap-3 sm:py-3"
        aria-label="Main navigation"
      >
        {/* Mobile Left: Menu Button */}
        <div className="flex flex-1 items-center justify-start lg:hidden">
          <button
            type="button"
            className="relative z-70 inline-flex size-9 items-center justify-center rounded-lg text-(--color-muted) transition-colors hover:bg-(--link-bg-hover) hover:text-(--color-text) sm:size-10"
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

        {/* Desktop Left: Logo */}
        <div className="hidden flex-1 shrink-0 items-center gap-2 lg:flex">
          <Link
            to="/{-$locale}"
            params={{ locale: routeLocale }}
            className="inline-flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            activeProps={noActiveClassName}
          >
            <span className="font-mono text-xl font-bold text-[var(--color-primary)]">
              {'</>'}
            </span>
            <span className="text-lg font-semibold text-(--color-text)">
              Andrija Lazic
            </span>
          </Link>
        </div>

        {/* Mobile Center: Title */}
        <div className="flex shrink-0 gap-2 items-center justify-center font-semibold text-(--color-text) lg:hidden">
          <Link
            to="/{-$locale}"
            params={{ locale: routeLocale }}
            className="inline-flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            activeProps={noActiveClassName}
          >
            <span className="font-mono text-lg font-bold text-[var(--color-primary)] sm:text-xl">
              {'</> '}
            </span>
            <span className="text-base font-semibold text-(--color-text) sm:text-lg">
              Andrija Lazic
            </span>
          </Link>
        </div>

        {/* Desktop Center: Nav */}
        <div className="hidden shrink-0 lg:block">
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link
              to="/{-$locale}"
              params={{ locale: routeLocale }}
              hash="about"
              className="nav-link shrink-0 transition-colors hover:text-(--color-text) text-muted-foreground"
              activeProps={noActiveClassName}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/{-$locale}"
              params={{ locale: routeLocale }}
              hash="experience"
              className="nav-link shrink-0 transition-colors hover:text-(--color-text) text-muted-foreground"
              activeProps={noActiveClassName}
            >
              {t('nav.experience')}
            </Link>
            <Link
              to="/{-$locale}"
              params={{ locale: routeLocale }}
              hash="education"
              className="nav-link shrink-0 transition-colors hover:text-(--color-text) text-muted-foreground"
              activeProps={noActiveClassName}
            >
              {t('nav.education')}
            </Link>
            <Link
              to="/{-$locale}/blog"
              params={{ locale: routeLocale }}
              search={{ tag: undefined }}
              className="nav-link shrink-0 transition-colors hover:text-(--color-text) text-muted-foreground"
              activeProps={noActiveClassName}
            >
              {t('nav.blog')}
            </Link>
            <Link
              to="/{-$locale}/contact"
              params={{ locale: routeLocale }}
              className="nav-link shrink-0 transition-colors hover:text-(--color-text) text-muted-foreground"
              activeProps={noActiveClassName}
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>

        {/* Desktop Right: Controls */}
        <div className="flex flex-1 items-center justify-end">
          <HeaderControls className="hidden lg:flex" />
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-60 transition-opacity duration-150 lg:hidden ${
          isMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden={!isMenuOpen}
      >
        <div
          id="mobile-nav-drawer"
          className={`fixed inset-y-0 left-0 z-70 flex h-screen w-[min(95vw,27rem)] flex-col border-r border-(--line) bg-(--color-bg) shadow-xl transition-transform duration-150 ease-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          {/* Drawer Header matching the screenshot */}
          <div className="flex flex-col border-b border-border/10 pb-4 pt-[calc(var(--header-height)-1rem)] px-6">
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-semibold text-muted-foreground">
                {t('nav.menu', 'Menu')}
              </span>
              <HeaderControls className="flex" />
            </div>
          </div>

          <div className="flex flex-col gap-1 p-4 px-6 overflow-y-auto">
            <Link
              to="/{-$locale}"
              params={{ locale: routeLocale }}
              hash="about"
              className="block rounded-lg py-3 text-base font-bold text-(--color-text) transition-colors hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/{-$locale}"
              params={{ locale: routeLocale }}
              hash="experience"
              className="block rounded-lg py-3 text-base font-bold text-(--color-text) transition-colors hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.experience')}
            </Link>
            <Link
              to="/{-$locale}"
              params={{ locale: routeLocale }}
              hash="education"
              className="block rounded-lg py-3 text-base font-bold text-(--color-text) transition-colors hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.education')}
            </Link>
            <Link
              to="/{-$locale}/blog"
              params={{ locale: routeLocale }}
              search={{ tag: undefined }}
              className="block rounded-lg py-3 text-base font-bold text-(--color-text) transition-colors hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.blog')}
            </Link>
            <Link
              to="/{-$locale}/contact"
              params={{ locale: routeLocale }}
              className="block rounded-lg py-3 text-base font-bold text-(--color-text) transition-colors hover:text-blue-400"
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
