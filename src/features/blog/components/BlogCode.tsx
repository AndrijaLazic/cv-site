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
    <div className="relative my-6 overflow-hidden rounded-xl border border-slate-200/70 dark:border-slate-700/60">
      <div className="flex items-center justify-between bg-slate-100 px-4 py-2 text-xs dark:bg-slate-800">
        <div className="flex gap-2 text-slate-600 dark:text-slate-400">
          {language && (
            <span className="font-semibold uppercase tracking-wider">
              {language}
            </span>
          )}
          {filename && <span>{filename}</span>}
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
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
      <div className="overflow-x-auto bg-slate-950 p-4 text-sm text-slate-100 dark:bg-slate-900">
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
