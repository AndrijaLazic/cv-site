import type { PostMeta } from '#/features/blog/types/blog'

export const meta: PostMeta = {
  slug: 'fmea-excellence-ai-ml',
  locale: 'sr',
  title: 'FMEA Traditional i FMEA Excellence',
  author: 'Andrija Lazic',
  summary:
    'Rad na FMEA Traditional, FMEA Excellence, AI predikcijama, optimizaciji i javnom product website-u.',
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
  tags: ['Python', 'FastAPI', 'Mašinsko učenje', 'Scikit-learn', 'AI', 'FMEA'],
}
