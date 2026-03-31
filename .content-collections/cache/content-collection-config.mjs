// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
var jobSchema = z.object({
  jobTitle: z.string(),
  summary: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  company: z.string(),
  location: z.string(),
  tags: z.array(z.string()),
  content: z.string()
});
var educationSchema = z.object({
  school: z.string(),
  summary: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  tags: z.array(z.string()),
  content: z.string()
});
var jobsEn = defineCollection({
  name: "jobsEn",
  directory: "content/jobs/en",
  include: "**/*.md",
  schema: jobSchema
});
var jobsSr = defineCollection({
  name: "jobsSr",
  directory: "content/jobs/sr",
  include: "**/*.md",
  schema: jobSchema
});
var educationsEn = defineCollection({
  name: "educationsEn",
  directory: "content/education/en",
  include: "**/*.md",
  schema: educationSchema
});
var educationsSr = defineCollection({
  name: "educationsSr",
  directory: "content/education/sr",
  include: "**/*.md",
  schema: educationSchema
});
var content_collections_default = defineConfig({
  collections: [jobsEn, jobsSr, educationsEn, educationsSr]
});
export {
  content_collections_default as default
};
