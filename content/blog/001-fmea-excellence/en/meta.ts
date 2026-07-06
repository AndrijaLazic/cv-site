import type { PostMeta } from '#/features/blog/types/blog'

export const meta: PostMeta = {
  slug: 'fmea-excellence-ai-ml',
  locale: 'en',
  title: 'FMEA Traditional and FMEA Excellence',
  author: 'Andrija Lazic',
  summary:
    'Work on FMEA Traditional, FMEA Excellence, AI-assisted prediction, optimization, and the public product website.',
  publishedDate: '2026-04-21',
  coverImage: {
    src: '/blog/fmea-excellence/fmea-excellence-logo.webp',
    alt: 'FMEA Excellence logo',
    fit: 'contain',
    bgColor: 'black',
    position: 'center',
    aspectRatio: '16/9',
    padding: '0 5%',
  },
  tags: ['Python', 'FastAPI', 'Machine Learning', 'Scikit-learn', 'AI', 'FMEA'],
}
