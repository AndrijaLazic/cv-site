import { createFileRoute } from '@tanstack/react-router'
import { ResumeHomePage } from '#/features/resume/home/ResumeHomePage'
import { publicConfig } from '#/shared/config/public-env'

export const Route = createFileRoute('/')({
  component: App,
  head: () => ({
    meta: [
      {
        title: 'Andrija Lazic | Software Engineer',
      },
      {
        name: 'description',
        content:
          'Explore the professional resume of Andrija Lazic — software engineer with experience in Spring Boot, Python, .NET, AI, and DevOps. View work history, projects, and skills.',
      },
      {
        property: 'og:title',
        content: 'Andrija Lazic | Software Engineer',
      },
      {
        property: 'og:description',
        content:
          'Explore the professional resume of Andrija Lazic — software engineer with experience in Spring Boot, Python, .NET, AI, and DevOps. View work history, projects, and skills.',
      },
      {
        property: 'og:url',
        content: `${publicConfig.siteUrl}/`,
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
    name: 'Andrija Lazic',
    jobTitle: 'Backend Software Engineer',
    url: publicConfig.siteUrl,
    sameAs: [
      'https://www.linkedin.com/in/andrija-lazic-dev/',
      'https://github.com/AndrijaLazic',
    ],
    knowsAbout: [
      'Spring Boot',
      'Python',
      '.NET',
      'Node.js',
      'Docker',
      'DevOps',
      'Machine Learning',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Faculty of Natural Sciences and Mathematics',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function App() {
  return (
    <>
      <PersonJsonLd />
      <ResumeHomePage />
    </>
  )
}
