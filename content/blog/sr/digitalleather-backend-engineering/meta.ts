import type { PostMeta } from '#/features/blog/types/blog'

export const meta: PostMeta = {
  slug: 'digitalleather-backend-engineering',
  locale: 'sr',
  title: 'Backend Inženjering u DigitalLeather',
  author: 'Andrija Lazic',
  summary:
    'Uvidi iz rada kao backend inženjer u DigitalLeather-u — razvoj AI, DevOps i izgradnja skalabilnih servisa.',
  coverImage: {
    src: '/blog/digitalleather-backend-engineering/digitalleather-logo.webp',
    alt: 'DigitalLeather logo',
    fit: 'contain',
    bgColor: 'black',
    position: 'center',
    aspectRatio: '16/9',
  },
  publishedDate: '2026-04-12',
  tags: ['Spring Boot', 'Python', 'AI', 'DevOps', 'Backend razvoj'],
}
