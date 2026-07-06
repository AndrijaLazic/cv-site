import type { PostMeta } from '#/features/blog/types/blog'

export const meta: PostMeta = {
  slug: 'digitalleather-backend-engineering',
  locale: 'en',
  title: 'DevOps Engineering at DigitalLeather',
  author: 'Andrija Lazic',
  summary:
    'Infrastructure, deployment automation, CI/CD, Docker, Nginx, and production reliability work at DigitalLeather.',
  publishedDate: '2026-04-12',
  coverImage: {
    src: '/blog/digitalleather-backend-engineering/digitalleather-logo.webp',
    alt: 'DigitalLeather logo',
    fit: 'contain',
    bgColor: 'black',
    position: 'center',
    aspectRatio: '16/9',
  },
  tags: [
    'Docker',
    'Docker Compose',
    'GitHub Actions',
    'Nginx',
    'Linux',
    'CI/CD',
  ],
}
