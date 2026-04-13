import type { MDXComponents } from '@mdx-js/react'
import type React from 'react'
import {
  BlogCode,
  BlogImage,
  BlogVideo,
  Callout,
  Section,
  TwoColumn,
} from './components'
import { cn } from '#/shared/utils'

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        'mb-4 mt-8 first:mt-0 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100',
        className,
      )}
      {...props}
    />
  ),
  h2: ({
    id,
    children,
    className,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      id={id}
      className={cn(
        'mb-3 mt-8 scroll-mt-24 text-2xl font-semibold text-slate-900 dark:text-slate-100',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({
    id,
    children,
    className,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      id={id}
      className={cn(
        'mb-2 mt-6 scroll-mt-24 text-xl font-semibold text-slate-800 dark:text-slate-200',
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        'mb-1 mt-4 text-lg font-semibold text-slate-800 dark:text-slate-200',
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn(
        'my-4 text-base leading-7 text-slate-700 first:mt-0 dark:text-slate-300',
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn(
        'text-cyan-700 underline underline-offset-2 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300',
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        'my-4 ml-6 list-disc space-y-1 text-slate-700 dark:text-slate-300',
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        'my-4 ml-6 list-decimal space-y-1 text-slate-700 dark:text-slate-300',
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn('text-base leading-7', className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        'my-6 border-l-4 border-slate-300 pl-4 italic text-slate-600 dark:border-slate-600 dark:text-slate-400',
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr
      className={cn('my-8 border-slate-200 dark:border-slate-700', className)}
      {...props}
    />
  ),
  strong: ({ className, ...props }) => (
    <strong
      className={cn(
        'font-semibold text-slate-900 dark:text-slate-100',
        className,
      )}
      {...props}
    />
  ),
  em: ({ className, ...props }) => (
    <em className={cn('italic', className)} {...props} />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn('my-6 overflow-x-auto rounded-xl p-4 text-sm', className)}
      {...props}
    />
  ),
  code: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLElement>) => {
    const isInline =
      !className?.includes('language-') &&
      !(props as Record<string, unknown>)['data-language']

    if (isInline) {
      return (
        <code
          className={cn(
            'rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800 dark:bg-slate-800 dark:text-slate-200',
            className,
          )}
          {...props}
        >
          {children}
        </code>
      )
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
  table: ({ className, ...props }) => (
    <table
      className={cn('my-6 w-full border-collapse text-sm', className)}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        'border border-slate-200 bg-slate-50 px-3 py-2 text-left font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100',
        className,
      )}
      {...props}
    />
  ),
  tr: ({ className, ...props }) => (
    <tr
      className={cn(
        'border-b border-slate-200 dark:border-slate-700',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        'border border-slate-200 px-3 py-2 text-slate-700 dark:border-slate-700 dark:text-slate-300',
        className,
      )}
      {...props}
    />
  ),
  Section,
  Callout,
  BlogImage,
  BlogVideo,
  TwoColumn,
  BlogCode,
}
