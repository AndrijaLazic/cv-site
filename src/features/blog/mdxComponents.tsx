import type { MDXComponents } from 'mdx/types'
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
        'mb-5 mt-10 first:mt-0 text-3xl font-bold leading-tight tracking-[-0.03em] text-(--article-ink)',
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
        'mb-4 mt-12 scroll-mt-28 border-t border-(--article-line) pt-8 text-2xl font-semibold leading-tight tracking-[-0.025em] text-(--article-ink) first:border-t-0 first:pt-0',
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
        'mb-3 mt-9 scroll-mt-28 text-xl font-semibold leading-snug tracking-[-0.015em] text-(--article-ink)',
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
        'mb-2 mt-7 text-lg font-semibold text-(--article-ink)',
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn(
        'my-5 text-[1.03rem] leading-8 text-(--article-prose) first:mt-0 sm:text-[1.05rem]',
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn(
        'font-medium text-(--article-primary) underline decoration-(--article-primary) underline-offset-3 transition-colors hover:decoration-current focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--article-focus)',
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
        className={cn('h-auto max-w-full', className)}
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
        className={cn('my-6 h-auto max-w-full', className)}
        decoding={decoding ?? 'async'}
        loading={loading ?? 'lazy'}
        src={src}
      />
    ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        'my-5 ml-6 list-disc space-y-2 text-(--article-prose) marker:text-(--article-accent)',
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        'my-5 ml-6 list-decimal space-y-2 text-(--article-prose) marker:font-mono marker:text-(--article-accent)',
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn('pl-1 text-[1.03rem] leading-8', className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        'my-8 border-l-2 border-(--article-accent) pl-5 text-lg italic leading-8 text-(--article-muted)',
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn('my-10 border-(--article-line)', className)} {...props} />
  ),
  strong: ({ className, ...props }) => (
    <strong
      className={cn('font-semibold text-(--article-ink)', className)}
      {...props}
    />
  ),
  em: ({ className, ...props }) => (
    <em className={cn('italic', className)} {...props} />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        'my-7 overflow-x-auto border border-(--article-line) bg-(--article-code) p-4 text-sm text-(--article-code-ink)',
        className,
      )}
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
            'rounded-sm bg-(--article-inline-code) px-1.5 py-0.5 font-mono text-[0.9em] text-(--article-ink)',
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
      className={cn(
        'my-7 block w-full overflow-x-auto border-collapse text-sm',
        className,
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        'border border-(--article-line) bg-(--article-surface-soft) px-3 py-2.5 text-left font-semibold text-(--article-ink)',
        className,
      )}
      {...props}
    />
  ),
  tr: ({ className, ...props }) => (
    <tr
      className={cn('border-b border-(--article-line)', className)}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        'border border-(--article-line) px-3 py-2 text-(--article-prose)',
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
