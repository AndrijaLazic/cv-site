import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'
import { supportedLanguages } from './src/features/i18n/languages'

const jobSchema = z.object({
  jobTitle: z.string(),
  summary: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  company: z.string(),
  location: z.string(),
  tags: z.array(z.string()),
  content: z.string(),
})

const educationSchema = z.object({
  school: z.string(),
  summary: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  tags: z.array(z.string()),
  content: z.string(),
})

const blogSchema = z.object({
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  publishedDate: z.string(),
  coverImage: z.string().optional(),
  tags: z.array(z.string()),
  content: z.string(),
})

function toCollectionSuffix(language: string) {
  return language.charAt(0).toUpperCase() + language.slice(1)
}

function defineLocalizedCollections<TSchema extends z.ZodTypeAny>(
  baseName: string,
  baseDirectory: string,
  schema: TSchema,
) {
  return supportedLanguages.map((language) =>
    defineCollection({
      name: `${baseName}${toCollectionSuffix(language)}`,
      directory: `${baseDirectory}/${language}`,
      include: '**/*.md',
      schema,
    }),
  )
}

const content = [
  ...defineLocalizedCollections('jobs', 'content/jobs', jobSchema),
  ...defineLocalizedCollections(
    'educations',
    'content/education',
    educationSchema,
  ),
  ...defineLocalizedCollections('blogs', 'content/blog', blogSchema),
]

export default defineConfig({
  content,
})
