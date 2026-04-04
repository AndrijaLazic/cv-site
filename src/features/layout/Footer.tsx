import { GitHubIcon, LinkedInIcon } from '#/shared/ui/brand-icons'

export default function Footer() {
  return (
    <footer
      id="contacts"
      className="mt-20 border-t border-(--line) px-4 pb-14 pt-10 text-(--sea-ink-soft)"
    >
      <div className="page-wrap flex flex-col items-center gap-5 text-center">
        <div className="flex items-center justify-center gap-2">
          <a
            href="https://github.com/AndrijaLazic"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--line) text-(--sea-ink-soft) transition hover:bg-(--link-bg-hover) hover:text-(--sea-ink)"
          >
            <GitHubIcon aria-hidden="true" className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/andrija-lazic-dev/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--line) text-(--sea-ink-soft) transition hover:bg-(--link-bg-hover) hover:text-(--sea-ink)"
          >
            <LinkedInIcon aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
        <p className="m-0 text-sm">© 2026 Andrija Lazic. All rights reserved.</p>
      </div>
    </footer>
  )
}
