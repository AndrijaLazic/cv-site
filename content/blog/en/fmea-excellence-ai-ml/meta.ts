import type { PostMeta } from '#/features/blog/types/blog'

export const meta: PostMeta = {
  slug: 'fmea-excellence-ai-ml',
  locale: 'en',
  title: 'AI and Machine Learning at FMEA Excellence',
  author: 'Andrija Lazic',
  summary:
    'Building intelligent forecasting and prediction systems for risk evaluation and decision-making.',
  publishedDate: '2026-04-21',
  coverImage: {
    src: '/blog/fmea-excellence/fmea-excellence-logo.webp',
    alt: 'FMEA Excellence logo',
    fit: 'contain',
    bgColor: 'black',
    position: 'center',
    aspectRatio: '16/9',
    padding: '5%',
  },
  tags: ['Python', 'FastAPI', 'Machine Learning', 'Scikit-learn', 'AI'],
}
