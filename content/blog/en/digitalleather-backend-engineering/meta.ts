import type { PostMeta } from '#/features/blog/types/blog'

export const meta: PostMeta = {
  slug: 'digitalleather-backend-engineering',
  locale: 'en',
  title: 'Backend Engineering at DigitalLeather',
  author: 'Andrija Lazic',
  summary:
    'Insights from working as a backend engineer at DigitalLeather — AI development, DevOps, and building scalable services.',
  publishedDate: '2026-04-12',
  coverImage: {
    src: '/blog/digitalleather-backend-engineering/digitalleather-logo.webp',
    alt: 'DigitalLeather logo',
    fit: 'contain',
    bgColor: '#f1f5f9',
    position: 'center',
    aspectRatio: '16/9',
  },
  tags: ['Spring Boot', 'Python', 'AI', 'DevOps', 'Backend Development'],
}
