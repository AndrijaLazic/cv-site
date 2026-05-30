import type { PostMeta } from '#/features/blog/types/blog'

export const meta: PostMeta = {
  slug: 'htec-backend-internship',
  locale: 'sr',
  title: 'Moja Backend Praksa u HTEC-u',
  author: 'Andrija Lazic',
  summary:
    'Pogled na moje iskustvo kao backend intern u HTEC-u — enterprise Java aplikacija.',
  publishedDate: '2026-04-12',
  coverImage: {
    src: '/blog/htec-backend-internship/htec-internship-kragujevac.webp',
    alt: 'HTEC praksa u Kragujevcu',
    fit: 'cover',
    bgColor: '#e2e8f0',
    position: 'center 40%',
    aspectRatio: '16/9',
  },
  tags: ['Spring Boot', 'Docker', 'Backend razvoj', 'Praksa'],
}
