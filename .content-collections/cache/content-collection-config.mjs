// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

// src/features/i18n/languages.ts
var languageRegistry = {
  en: {
    labelKey: "language.en"
  },
  sr: {
    labelKey: "language.sr"
  }
};
var supportedLanguages = Object.freeze(
  Object.keys(languageRegistry)
);
var supportedLanguageSet = new Set(supportedLanguages);

// content-collections.ts
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
function toCollectionSuffix(language) {
  return language.charAt(0).toUpperCase() + language.slice(1);
}
function defineLocalizedCollections(baseName, baseDirectory, schema) {
  return supportedLanguages.map(
    (language) => defineCollection({
      name: `${baseName}${toCollectionSuffix(language)}`,
      directory: `${baseDirectory}/${language}`,
      include: "**/*.md",
      schema
    })
  );
}
var content = [
  ...defineLocalizedCollections("jobs", "content/jobs", jobSchema),
  ...defineLocalizedCollections(
    "educations",
    "content/education",
    educationSchema
  )
];
var content_collections_default = defineConfig({
  content
});
export {
  content_collections_default as default
};
