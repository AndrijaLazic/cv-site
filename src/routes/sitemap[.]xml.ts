import { createFileRoute } from '@tanstack/react-router'
import * as contentCollections from '../../.content-collections/generated/index.js'
import { publicConfig } from '#/shared/config/public-env'

function getBlogSlugs(): string[] {
  const blogs = contentCollections.allBlogsEns
  if (!Array.isArray(blogs)) return []
  return blogs.map((post: { slug: string }) => post.slug)
}

function buildSitemap(): string {
  const siteUrl = publicConfig.siteUrl
  const blogSlugs = getBlogSlugs()

  const staticPages = [
    { loc: `${siteUrl}/`, priority: '1.0', changefreq: 'weekly' },
    { loc: `${siteUrl}/contact`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${siteUrl}/blog`, priority: '0.8', changefreq: 'weekly' },
  ]

  const blogPages = blogSlugs.map((slug) => ({
    loc: `${siteUrl}/blog/${slug}`,
    priority: '0.6',
    changefreq: 'monthly' as const,
  }))

  const allPages = [...staticPages, ...blogPages]

  const urls = allPages
    .map(
      (page) => `  <url>
    <loc>${page.loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () => {
        const xml = buildSitemap()
        return new Response(xml, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
          },
        })
      },
    },
  },
})
