import { createFileRoute } from '@tanstack/react-router'
import { getBlogPostSummaries } from '#/features/blog/api'
import { publicConfig } from '#/shared/config/public-env'

type SitemapUrl = {
  loc: string
  priority: string
  changefreq: string
  alternates: Array<{ hreflang: string; href: string }>
}

function xmlEscape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildMultilingualSitemap(): string {
  const siteUrl = publicConfig.siteUrl

  const enPosts = getBlogPostSummaries('en')
  const srPosts = getBlogPostSummaries('sr')

  const enPostByArticleId = new Map<string, (typeof enPosts)[number]>()
  for (const post of enPosts) {
    enPostByArticleId.set(post.articleId, post)
  }

  const srPostByArticleId = new Map<string, (typeof srPosts)[number]>()
  for (const post of srPosts) {
    srPostByArticleId.set(post.articleId, post)
  }

  const allArticleIds = new Set<string>()
  for (const post of enPosts) allArticleIds.add(post.articleId)
  for (const post of srPosts) allArticleIds.add(post.articleId)

  const staticPages: SitemapUrl[] = [
    {
      loc: `${siteUrl}/`,
      priority: '1.0',
      changefreq: 'weekly',
      alternates: [
        { hreflang: 'en', href: `${siteUrl}/` },
        { hreflang: 'sr', href: `${siteUrl}/sr` },
        { hreflang: 'x-default', href: `${siteUrl}/` },
      ],
    },
    {
      loc: `${siteUrl}/contact`,
      priority: '0.7',
      changefreq: 'monthly',
      alternates: [
        { hreflang: 'en', href: `${siteUrl}/contact` },
        { hreflang: 'sr', href: `${siteUrl}/sr/contact` },
        { hreflang: 'x-default', href: `${siteUrl}/contact` },
      ],
    },
    {
      loc: `${siteUrl}/blog`,
      priority: '0.8',
      changefreq: 'weekly',
      alternates: [
        { hreflang: 'en', href: `${siteUrl}/blog` },
        { hreflang: 'sr', href: `${siteUrl}/sr/blog` },
        { hreflang: 'x-default', href: `${siteUrl}/blog` },
      ],
    },
  ]

  const blogUrls: SitemapUrl[] = []

  for (const articleId of allArticleIds) {
    const enPost = enPostByArticleId.get(articleId)
    const srPost = srPostByArticleId.get(articleId)

    if (enPost) {
      const alternates: SitemapUrl['alternates'] = [
        { hreflang: 'en', href: `${siteUrl}/blog/${enPost.slug}` },
      ]
      if (srPost) {
        alternates.push({
          hreflang: 'sr',
          href: `${siteUrl}/sr/blog/${srPost.slug}`,
        })
      }
      alternates.push({
        hreflang: 'x-default',
        href: `${siteUrl}/blog/${enPost.slug}`,
      })

      blogUrls.push({
        loc: `${siteUrl}/blog/${enPost.slug}`,
        priority: '0.6',
        changefreq: 'monthly',
        alternates,
      })
    }

    if (srPost) {
      const srAlternates: SitemapUrl['alternates'] = [
        { hreflang: 'sr', href: `${siteUrl}/sr/blog/${srPost.slug}` },
      ]
      if (enPost) {
        srAlternates.push({
          hreflang: 'en',
          href: `${siteUrl}/blog/${enPost.slug}`,
        })
      }
      srAlternates.push({
        hreflang: 'x-default',
        href: `${siteUrl}/blog/${enPost?.slug ?? srPost.slug}`,
      })

      blogUrls.push({
        loc: `${siteUrl}/sr/blog/${srPost.slug}`,
        priority: '0.6',
        changefreq: 'monthly',
        alternates: srAlternates,
      })
    }
  }

  const allUrls = [...staticPages, ...blogUrls]

  const urlsXml = allUrls
    .map((url) => {
      const alternatesXml = url.alternates
        .map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${xmlEscape(alt.href)}" />`,
        )
        .join('\n')

      return `  <url>
    <loc>${xmlEscape(url.loc)}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
${alternatesXml}
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlsXml}
</urlset>`
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () => {
        const xml = buildMultilingualSitemap()
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
