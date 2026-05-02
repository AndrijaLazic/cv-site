import { createFileRoute } from '@tanstack/react-router'
import { publicConfig } from '#/shared/config/public-env'

export const Route = createFileRoute('/')({
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
