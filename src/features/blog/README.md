# Blog Logic

## Content structure

```txt
content/blog/{locale}/{slug}/meta.ts
content/blog/{locale}/{slug}/post.mdx
```

`meta.ts` must export `meta: PostMeta` with:
`slug`, `locale`, `title`, `summary`, `publishedDate`, optional `coverImage`, `tags`.

## How posts are loaded

`src/features/blog/registry.ts` eagerly imports all blog files:

1. `meta.ts` via `import.meta.glob('/content/blog/**/meta.ts', { eager: true })`
2. `post.mdx` via `import.meta.glob('/content/blog/**/post.mdx', { eager: true })`

It indexes both by key: `locale:slug`.

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

## Add a new post (minimum)

1. Create `content/blog/en/<slug>/meta.ts`.
2. Create `content/blog/en/<slug>/post.mdx`.
3. Keep folder name and `meta.slug` identical.
4. Use `YYYY-MM-DD` for `publishedDate`.
5. Repeat for `sr` locale if needed.
