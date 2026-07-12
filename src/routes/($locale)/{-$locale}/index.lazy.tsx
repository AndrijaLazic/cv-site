import { createLazyFileRoute } from '@tanstack/react-router'
import { ResumeHomePage } from '#/features/resume/home/ResumeHomePage'
import { publicConfig } from '#/shared/config/public-env'

export const Route = createLazyFileRoute('/($locale)/{-$locale}/')({
  component: HomePage,
})

function HomePage() {
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
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResumeHomePage />
    </>
  )
}
