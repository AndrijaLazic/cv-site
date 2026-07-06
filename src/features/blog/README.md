# Blog Logic

## Content structure

```txt
content/blog/{article-folder}/{locale}/meta.ts
content/blog/{article-folder}/{locale}/post.mdx
```

`article-folder` uses the shared `NNN-canonical-slug` folder for all translations.
The public route URL is controlled by `meta.slug`, not by the folder name.

`meta.ts` must export `meta: PostMeta` with:
`slug`, `locale`, `title`, `summary`, `publishedDate`, `author`, `tags`, optional `authorUrl`, optional `coverImage`, optional `socialImage`, optional `faqItems`, and optional `showTableOfContents`.

`showTableOfContents` defaults to visible. Set `showTableOfContents: false` in `meta.ts` to hide the article table of contents for a specific post.

## How posts are loaded

`src/features/blog/registry.ts` eagerly imports all blog files:

1. `meta.ts` via `import.meta.glob('/content/blog/**/meta.ts', { eager: true })`
2. `post.mdx` via `import.meta.glob('/content/blog/**/post.mdx')`

It indexes both by key: `locale:slug`.
`slug` is read from `meta.slug`, so translated posts can live in one shared article folder while keeping locale-specific URLs.

Main functions:

1. `getAllPostMetas(locale)` - locale posts sorted by newest date.
2. `getPostMeta(locale, slug)` - single post metadata.
3. `getPostComponent(locale, slug)` - compiled MDX component.

## Route behavior

1. `src/routes/blog.index.tsx`
   - Resolves active language from i18n.
   - Renders cards from `getAllPostMetas(activeLanguage)`.
2. `src/routes/blog.$slug.tsx`
   - Resolves active language.
   - Loads both meta + MDX component by `slug`.
   - Uses `socialImage` for share metadata when present, otherwise falls back to `coverImage`.
   - If one is missing, shows "Post not found".
   - Renders MDX via `<MdxRenderer Component={PostComponent} />`.

## MDX rendering

`MdxRenderer` uses `MDXProvider` with `mdxComponents`, so markdown tags and custom components share consistent styling.

Available custom MDX components:

1. `Section`
2. `Callout`
3. `BlogImage`
4. `BlogVideo`
5. `TwoColumn`
6. `BlogCode`
7. `ImageCarousel`

## Responsive images

Blog/news/images assets use a generated responsive manifest plus a blog `ResponsiveImage` component.

- Source folders scanned by the optimizer:
  - `public/blog/**`
  - `public/news/**`
  - `public/images/**`
- Generated variants:
  - `<name>.w360.avif|webp`
  - `<name>.w640.avif|webp`
  - `<name>.w960.avif|webp`
  - `<name>.w1280.avif|webp`
  - `<name>.w1600.avif|webp`
- Manifest output:
  - `src/features/blog/generated/contentImageManifest.ts`

Run optimization after adding or replacing images:

```bash
npm run optimize:images
```

Scope filtering is also supported:

```bash
npm run optimize:images -- blog
npm run optimize:images -- news
npm run optimize:images -- images
npm run optimize:images -- --scope=blog,news,images
npm run optimize:images:blog
npm run optimize:images:news
npm run optimize:images:images
```

The command also refreshes the manifest used by:

- `src/features/blog/contentImages.ts`
- `src/features/blog/components/ResponsiveImage.tsx`
- MDX `img` rendering and blog/news cards/carousels

## Add a new post (minimum)

1. Create `content/blog/<NNN-canonical-slug>/en/meta.ts`.
2. Create `content/blog/<NNN-canonical-slug>/en/post.mdx`.
3. Set `meta.slug` to the public URL slug for that locale.
4. Use `YYYY-MM-DD` for `publishedDate`.
5. Add any new images under `public/blog/<asset-folder>/`. Asset folders are URL-facing and do not need the numeric content prefix.
6. Run `npm run optimize:images` and commit generated variants + manifest updates.
7. Repeat under `content/blog/<NNN-canonical-slug>/sr/` if needed.
