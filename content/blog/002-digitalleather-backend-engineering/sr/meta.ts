import type { PostMeta } from '#/features/blog/types/blog'

export const meta: PostMeta = {
  slug: 'digitalleather-backend-engineering',
  locale: 'sr',
  title: 'DevOps Inženjering u DigitalLeather-u',
  author: 'Andrija Lazic',
  authorUrl: 'https://www.linkedin.com/in/andrija-lazic-dev/',
  summary:
    'Infrastruktura, deployment automatizacija, CI/CD, Docker, Nginx i pouzdanost produkcije u DigitalLeather-u.',
  coverImage: {
    src: '/blog/digitalleather-backend-engineering/digitalleather-logo.webp',
    alt: 'DigitalLeather logo',
    fit: 'contain',
    bgColor: 'black',
    position: 'center',
    aspectRatio: '16/9',
  },
  publishedDate: '2026-04-12',
  tags: [
    'Docker',
    'Docker Compose',
    'GitHub Actions',
    'Nginx',
    'Linux',
    'CI/CD',
  ],
}
