import type { MDXComponents } from '@mdx-js/react'
import type React from 'react'
import {
  BlogCode,
  BlogImage,
  BlogVideo,
  Callout,
  Section,
  TwoColumn,
  ImageCarousel,
  ContentBlock,
  ResponsiveImage,
} from './components'
import { cn } from '#/shared/utils'
import { POST_CONTENT_IMAGE_SIZES } from './contentImages'

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        'mb-5 mt-10 first:mt-0 text-3xl font-bold leading-tight tracking-tight text-slate-950 dark:text-slate-50',
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
        'mb-4 mt-11 scroll-mt-28 border-t border-slate-200/80 pt-8 text-2xl font-semibold leading-tight text-slate-950 first:border-t-0 first:pt-0 dark:border-slate-800 dark:text-slate-50',
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
        'mb-3 mt-8 scroll-mt-28 text-xl font-semibold leading-snug text-slate-900 dark:text-slate-100',
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
        'my-5 text-[1.03rem] leading-8 text-slate-700 first:mt-0 dark:text-slate-300',
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn(
        'text-blue-700 underline underline-offset-2 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300',
        className,
      )}
      {...props}
    />
  ),
  img: ({ alt, className, loading, decoding, src, ...props }) =>
    typeof src === 'string' ? (
      <ResponsiveImage
        {...props}
        alt={alt ?? ''}
        className={cn('h-auto max-w-full rounded-xl', className)}
        decoding={decoding ?? 'async'}
        loading={loading ?? 'lazy'}
        pictureClassName="my-6 block"
        sizes={POST_CONTENT_IMAGE_SIZES}
        src={src}
      />
    ) : (
      <img
        {...props}
        alt={alt}
        className={cn('my-6 h-auto max-w-full rounded-xl', className)}
        decoding={decoding ?? 'async'}
        loading={loading ?? 'lazy'}
        src={src}
      />
    ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        'my-5 ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300',
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        'my-5 ml-6 list-decimal space-y-2 text-slate-700 dark:text-slate-300',
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn('text-[1.03rem] leading-8', className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        'my-7 border-l-4 border-slate-300 pl-5 text-lg italic leading-8 text-slate-600 dark:border-slate-600 dark:text-slate-400',
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
  ImageCarousel,
  ContentBlock,
}
