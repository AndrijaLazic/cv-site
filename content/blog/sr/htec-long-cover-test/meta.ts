import type { PostMeta } from '#/features/blog/types/blog'

export const meta: PostMeta = {
  slug: 'htec-long-cover-test',
  locale: 'sr',
  title: 'HTEC Test Duge Naslovne Slike',
  author: 'Andrija Lazic',
  summary:
    'Test objava za proveru prikaza duge naslovne slike u karticama i zaglavlju blog posta.',
  publishedDate: '2026-04-17',
  coverImage: {
    src: '/blog/htec-backend-internship/htec-internship-kragujevac-long.webp',
    alt: 'HTEC timska fotografija u Kragujevcu (dugi format)',
    fit: 'cover',
    bgColor: '#e2e8f0',
    position: 'center',
    aspectRatio: '16/9',
  },
  tags: ['Test', 'Naslovna slika', 'HTEC'],
}
