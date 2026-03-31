import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

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

const jobsEn = defineCollection({
  name: 'jobsEn',
  directory: 'content/jobs/en',
  include: '**/*.md',
  schema: jobSchema,
})

const jobsSr = defineCollection({
  name: 'jobsSr',
  directory: 'content/jobs/sr',
  include: '**/*.md',
  schema: jobSchema,
})

const educationsEn = defineCollection({
  name: 'educationsEn',
  directory: 'content/education/en',
  include: '**/*.md',
  schema: educationSchema,
})

const educationsSr = defineCollection({
  name: 'educationsSr',
  directory: 'content/education/sr',
  include: '**/*.md',
  schema: educationSchema,
})

export default defineConfig({
  collections: [jobsEn, jobsSr, educationsEn, educationsSr],
})
