import * as contentCollections from '../../../../.content-collections/generated/index.js'
import type { SupportedLanguage } from '#/features/i18n/config'
import { supportedLanguages } from '#/features/i18n/config'

type ContentCollections = typeof contentCollections
type ResumeCollectionItem = ContentCollections[keyof ContentCollections][number]
type CollectionPrefix = 'allJobs' | 'allEducations'

export type ResumeJob = Extract<ResumeCollectionItem, { company: string }>
export type ResumeEducation = Extract<ResumeCollectionItem, { school: string }>

type CollectionItem<TPrefix extends CollectionPrefix> =
  TPrefix extends 'allJobs' ? ResumeJob : ResumeEducation

function toCollectionSuffix(language: SupportedLanguage) {
  return `${language.charAt(0).toUpperCase()}${language.slice(1)}s`
}

function getLocalizedCollection<TPrefix extends CollectionPrefix>(
  prefix: TPrefix,
  language: SupportedLanguage,
) {
  const key =
    `${prefix}${toCollectionSuffix(language)}` as keyof ContentCollections
  const collection = contentCollections[key]

  return (Array.isArray(collection) ? collection : []) as Array<
    CollectionItem<TPrefix>
  >
}

export const jobsByLanguage = Object.fromEntries(
  supportedLanguages.map((language) => [
    language,
    getLocalizedCollection('allJobs', language),
  ]),
) as Record<SupportedLanguage, Array<ResumeJob>>

export const educationsByLanguage = Object.fromEntries(
  supportedLanguages.map((language) => [
    language,
    getLocalizedCollection('allEducations', language),
  ]),
) as Record<SupportedLanguage, Array<ResumeEducation>>

function parseDate(value?: string) {
  if (!value) {
    return Number.NEGATIVE_INFINITY
  }

  const parsed = Date.parse(value)

  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed
}

function isBachelorEntry(education: ResumeEducation) {
  const combined =
    `${education.school} ${education.summary} ${education.content}`.toLowerCase()

  if (combined.includes('bachelor') || combined.includes('diplom')) {
    return true
  }

  return education.tags.some((tag) => tag.toLowerCase().includes('bachelor'))
}

export function sortJobs(jobs: Array<ResumeJob>) {
  return [...jobs].sort((a, b) => {
    const aIsOngoing = !a.endDate
    const bIsOngoing = !b.endDate

    if (aIsOngoing && !bIsOngoing) {
      return -1
    }

    if (!aIsOngoing && bIsOngoing) {
      return 1
    }

    if (aIsOngoing && bIsOngoing) {
      return parseDate(b.startDate) - parseDate(a.startDate)
    }

    const endDateSort = parseDate(b.endDate) - parseDate(a.endDate)

    if (endDateSort !== 0) {
      return endDateSort
    }

    return parseDate(b.startDate) - parseDate(a.startDate)
  })
}

export function sortEducations(educations: Array<ResumeEducation>) {
  return [...educations].sort((a, b) => {
    const aIsBachelor = isBachelorEntry(a)
    const bIsBachelor = isBachelorEntry(b)

    if (aIsBachelor && !bIsBachelor) {
      return -1
    }

    if (!aIsBachelor && bIsBachelor) {
      return 1
    }

    const aDate = parseDate(a.endDate ?? a.startDate)
    const bDate = parseDate(b.endDate ?? b.startDate)

    if (aDate !== bDate) {
      return bDate - aDate
    }

    return a.school.localeCompare(b.school)
  })
}

export function limitToSentences(text: string, sentenceLimit: number) {
  const normalizedText = text.trim()

  if (normalizedText.length === 0) {
    return normalizedText
  }

  const sentences = normalizedText.match(/[^.!?]+[.!?]+|[^.!?]+$/g)

  if (!sentences || sentences.length <= sentenceLimit) {
    return normalizedText
  }

  return sentences
    .slice(0, sentenceLimit)
    .map((sentence) => sentence.trim())
    .join(' ')
}
