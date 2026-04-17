import type { PostMeta } from '#/features/blog/types/blog'

export const meta: PostMeta = {
  slug: 'htec-long-cover-test',
  locale: 'en',
  title: 'HTEC Long Cover Test',
  author: 'Andrija Lazic',
  summary:
    'Test post for validating long-format cover image framing in blog cards and post header.',
  publishedDate: '2026-04-17',
  coverImage: {
    src: '/blog/htec-backend-internship/htec-internship-kragujevac-long.webp',
    alt: 'HTEC internship team photo in Kragujevac (long format)',
    fit: 'cover',
    bgColor: '#e2e8f0',
    position: 'center',
    aspectRatio: '16/9',
  },
  tags: ['Test', 'Cover Image', 'HTEC'],
}
