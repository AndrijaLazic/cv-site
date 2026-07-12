import { createFileRoute } from '@tanstack/react-router'
import { BlogPostView } from '#/features/blog/BlogPostView'
import {
  getBlogPostMeta,
  getTranslationGroup,
  loadBlogPost,
} from '#/features/blog/api'
import { resolveSupportedLanguage } from '#/features/i18n/languages'
import { publicConfig } from '#/shared/config/public-env'

export const Route = createFileRoute('/($locale)/{-$locale}/blog/$slug')({
  component: BlogPostPage,
  loader: ({ params }) =>
    loadBlogPost(resolveSupportedLanguage(params.locale), params.slug),
  head: ({ params }) => {
    const locale = resolveSupportedLanguage(params.locale)
    const post = getBlogPostMeta(locale, params.slug)
    const canonicalUrl = `${publicConfig.siteUrl}${locale === 'en' ? '' : '/sr'}/blog/${params.slug}`
    const title = post
      ? `${post.title} | Andrija Lazic`
      : 'Blog | Andrija Lazic'
    const description = post?.summary ?? 'Blog post by Andrija Lazic.'
    const meta: Array<Record<string, string>> = [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:type', content: 'article' },
    ]
    if (post?.coverImage.src) {
      meta.push({
        property: 'og:image',
        content: post.coverImage.src.startsWith('http')
          ? post.coverImage.src
          : `${publicConfig.siteUrl}${post.coverImage.src}`,
      })
    }
    const links: Array<Record<string, string>> = [
      { rel: 'canonical', href: canonicalUrl },
    ]
    const translations = post ? getTranslationGroup(post.articleId) : undefined
    for (const [language, slug] of translations ?? []) {
      links.push({
        rel: 'alternate',
        href: `${publicConfig.siteUrl}${language === 'en' ? '' : '/sr'}/blog/${slug}`,
        hrefLang: language,
      })
    }
    const englishSlug = translations?.get('en')
    if (englishSlug) {
      links.push({
        rel: 'alternate',
        href: `${publicConfig.siteUrl}/blog/${englishSlug}`,
        hrefLang: 'x-default',
      })
    }
    return { meta, links }
  },
})

function BlogPostPage() {
  const post = Route.useLoaderData()
  const { locale } = Route.useParams()
  if (!post) {
    return (
      <section className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-6 py-12 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">404</p>
        <h1 className="mt-2 text-3xl font-semibold">
          {locale === 'sr' ? 'Post nije pronađen' : 'Post not found'}
        </h1>
      </section>
    )
  }
  return (
    <BlogPostView post={post} backTo={locale === 'sr' ? '/sr/blog' : '/blog'} />
  )
}
