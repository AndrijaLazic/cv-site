import type { PostMeta } from '#/features/blog/types/blog'

export const meta: PostMeta = {
  slug: 'htec-backend-internship',
  locale: 'en',
  title: 'My Backend Internship at HTEC',
  author: 'Andrija Lazic',
  summary:
    'A look at my experience as a backend intern at HTEC — building enterprise Java application.',
  publishedDate: '2026-04-12',
  coverImage: {
    src: '/blog/htec-backend-internship/htec-internship-kragujevac.webp',
    alt: 'HTEC internship office in Kragujevac',
    fit: 'cover',
    bgColor: '#e2e8f0',
    position: 'center 40%',
    aspectRatio: '16/9',
  },
  tags: ['Spring Boot', 'Docker', 'Backend Development', 'Internship'],
}
