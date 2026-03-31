import { useState, useMemo } from 'react'
import { marked } from 'marked'
import { useTranslation } from 'react-i18next'

import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '#/shared/ui/card'
import { Checkbox } from '#/shared/ui/checkbox'
import { Badge } from '#/shared/ui/badge'
import { Separator } from '#/shared/ui/separator'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '#/shared/ui/hover-card'

import ResumeAssistant from '#/features/resume/ResumeAssistant'
import { useLocalizedContent } from '#/features/resume/useLocalizedContent'

export const Route = createFileRoute('/')({
  component: App,
  head: () => ({
    meta: [
      {
        title: 'Professional Resume — Frontend Developer',
      },
      {
        name: 'description',
        content:
          'Experienced frontend developer specializing in React, TypeScript, and modern web technologies. View my work history, skills, and education.',
      },
      {
        property: 'og:title',
        content: 'Professional Resume — Frontend Developer',
      },
      {
        property: 'og:description',
        content:
          'Experienced frontend developer specializing in React, TypeScript, and modern web technologies.',
      },
      {
        property: 'og:type',
        content: 'profile',
      },
    ],
  }),
})

function PersonJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Your Name Here',
    jobTitle: 'Senior Frontend Developer',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    knowsAbout: [
      'React',
      'TypeScript',
      'JavaScript',
      'Frontend Development',
      'Web Development',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function App() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const { t } = useTranslation('resume')
  const { jobs, educations } = useLocalizedContent()

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    jobs.forEach((job) => {
      job.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [jobs])

  const filteredJobs = useMemo(() => {
    if (selectedTags.length === 0) return jobs
    return jobs.filter((job) =>
      selectedTags.some((tag) => job.tags.includes(tag)),
    )
  }, [selectedTags, jobs])

  return (
    <>
      <PersonJsonLd />
      <ResumeAssistant />
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <div className="flex">
          {/* Sidebar with filters */}
          <aside className="w-72 min-h-screen bg-white dark:bg-gray-900 border-r dark:border-gray-800 shadow-sm p-8 sticky top-0">
            <nav aria-label={t('skillsFilter')}>
              <h2 className="text-lg font-semibold mb-6 text-gray-900 dark:text-gray-100">
                {t('skillsFilter')}
              </h2>
              <div className="space-y-4">
                {allTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-3 group">
                    <Checkbox
                      id={tag}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTags([...selectedTags, tag])
                        } else {
                          setSelectedTags(selectedTags.filter((s) => s !== tag))
                        }
                      }}
                      className="data-[state=checked]:bg-blue-600"
                    />
                    <label
                      htmlFor={tag}
                      className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors cursor-pointer"
                    >
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 p-8 lg:p-12">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h1 className="text-5xl font-bold bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent">
                  {t('title')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {t('subtitle')}
                </p>
                <Separator className="mt-8" />
              </div>

              {/* Career Summary */}
              <Card className="border-0 shadow-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">
                    {t('careerSummary')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-8">
                    <p className="text-gray-700 dark:text-gray-300 flex-1 leading-relaxed">
                      {t('careerSummaryText')}
                    </p>
                    <img
                      src="/headshot-on-white.jpg"
                      alt={t('headshot')}
                      className="w-44 h-52 rounded-2xl object-cover shadow-md transition-transform hover:scale-105"
                      width="176"
                      height="208"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Work Experience */}
              <section
                aria-labelledby="work-experience-heading"
                className="space-y-6"
              >
                <h2
                  id="work-experience-heading"
                  className="text-3xl font-semibold text-gray-900 dark:text-gray-100"
                >
                  {t('workExperience')}
                </h2>
                <div className="space-y-6">
                  {filteredJobs.map((job) => (
                    <article
                      key={job.jobTitle}
                      className="border-0 shadow-md hover:shadow-lg transition-shadow rounded-xl bg-card text-card-foreground py-6"
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                              {job.jobTitle}
                            </h3>
                            <p className="text-blue-600 dark:text-blue-400 font-medium">
                              {job.company} - {job.location}
                            </p>
                          </div>
                          <Badge variant="secondary" className="text-sm">
                            <time>{job.startDate}</time> -{' '}
                            {job.endDate ? (
                              <time>{job.endDate}</time>
                            ) : (
                              t('present')
                            )}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                          {job.summary}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {job.tags.map((tag) => (
                            <HoverCard key={tag}>
                              <HoverCardTrigger>
                                <Badge
                                  variant="outline"
                                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                                >
                                  {tag}
                                </Badge>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-64">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {t('experienceWith', { tag })}
                                </p>
                              </HoverCardContent>
                            </HoverCard>
                          ))}
                        </div>
                        {job.content && (
                          <div
                            className="mt-6 text-gray-700 dark:text-gray-300 prose dark:prose-invert prose-sm max-w-none"
                            dangerouslySetInnerHTML={{
                              __html: marked(job.content),
                            }}
                          />
                        )}
                      </CardContent>
                    </article>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section
                aria-labelledby="education-heading"
                className="space-y-6"
              >
                <h2
                  id="education-heading"
                  className="text-3xl font-semibold text-gray-900 dark:text-gray-100"
                >
                  {t('education')}
                </h2>
                <div className="space-y-6">
                  {educations.map((education) => (
                    <article
                      key={education.school}
                      className="border-0 shadow-md hover:shadow-lg transition-shadow rounded-xl bg-card text-card-foreground py-6"
                    >
                      <CardHeader>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                          {education.school}
                        </h3>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {education.summary}
                        </p>
                        {education.content && (
                          <div
                            className="mt-6 text-gray-700 dark:text-gray-300 prose dark:prose-invert prose-sm max-w-none"
                            dangerouslySetInnerHTML={{
                              __html: marked(education.content),
                            }}
                          />
                        )}
                      </CardContent>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
