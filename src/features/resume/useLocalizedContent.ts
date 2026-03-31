import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  allJobsEns,
  allJobsSrs,
  allEducationsEns,
  allEducationsSrs,
} from 'content-collections'

export function useLocalizedContent() {
  const { i18n } = useTranslation()
  const lang = i18n.language

  const jobs = useMemo(() => (lang === 'sr' ? allJobsSrs : allJobsEns), [lang])

  const educations = useMemo(
    () => (lang === 'sr' ? allEducationsSrs : allEducationsEns),
    [lang],
  )

  return { jobs, educations, lang }
}
