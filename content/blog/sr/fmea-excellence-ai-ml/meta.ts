import type { PostMeta } from '#/features/blog/types/blog'

export const meta: PostMeta = {
  slug: 'fmea-excellence-ai-ml',
  locale: 'sr',
  title: 'AI i Mašinsko Učenje u FMEA Excellence',
  author: 'Andrija Lazic',
  summary:
    'Izgradnja inteligentnih sistema za predviđanje i evaluaciju rizika.',
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
  tags: ['Python', 'FastAPI', 'Mašinsko učenje', 'Scikit-learn', 'AI'],
}
