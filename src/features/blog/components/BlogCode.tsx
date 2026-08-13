import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { cn } from '#/shared/utils'

type BlogCodeProps = {
  children: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
}

export function BlogCode({
  children,
  language,
  filename,
  showLineNumbers = false,
}: BlogCodeProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Ignore errors silently for now
    }
  }

  return (
    <div className="relative my-7 overflow-hidden border border-(--article-line) bg-(--article-code)">
      <div className="flex items-center justify-between gap-3 border-b border-(--article-line) bg-(--article-surface-soft) px-4 py-2.5 text-xs">
        <div className="flex min-w-0 gap-2 text-(--article-muted)">
          {language && (
            <span className="font-semibold uppercase tracking-wider">
              {language}
            </span>
          )}
          {filename && <span>{filename}</span>}
        </div>
        <button
          onClick={copyToClipboard}
          className="flex min-h-11 shrink-0 items-center gap-1.5 rounded-sm px-1 text-(--article-muted) transition-colors hover:text-(--article-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--article-focus)"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="size-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto p-4 text-sm text-(--article-code-ink)">
        <pre
          className={cn('font-mono', { 'show-line-numbers': showLineNumbers })}
          data-show-line-numbers={showLineNumbers}
        >
          <code>{children}</code>
        </pre>
      </div>
    </div>
  )
}
