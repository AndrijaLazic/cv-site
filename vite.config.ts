import fs from 'node:fs'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { defineConfig, loadEnv } from 'vite'
import type { Plugin } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import { visualizer } from 'rollup-plugin-visualizer'

function resolveOptionalFilePath(filePath?: string) {
  if (!filePath) {
    return undefined
  }

  const normalizedPath = filePath.trim()

  if (!normalizedPath) {
    return undefined
  }

  return path.resolve(process.cwd(), normalizedPath)
}

function readHttpsConfig(env: Record<string, string>) {
  const certPath = resolveOptionalFilePath(
    env.VITE_HTTPS_CERT_PATH || env.DEV_HTTPS_CERT_PATH,
  )
  const keyPath = resolveOptionalFilePath(
    env.VITE_HTTPS_KEY_PATH || env.DEV_HTTPS_KEY_PATH,
  )

  if (!certPath && !keyPath) {
    return undefined
  }

  if (!certPath || !keyPath) {
    throw new Error(
      'Both VITE_HTTPS_CERT_PATH and VITE_HTTPS_KEY_PATH must be set to enable HTTPS (DEV_* names are still accepted as fallback).',
    )
  }

  if (!fs.existsSync(certPath)) {
    throw new Error(`HTTPS certificate file not found: ${certPath}`)
  }

  if (!fs.existsSync(keyPath)) {
    throw new Error(`HTTPS key file not found: ${keyPath}`)
  }

  return {
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath),
  }
}

function rawBlogMdxContent() {
  return {
    name: 'raw-blog-mdx-content',
    enforce: 'pre' as const,
    load(id: string) {
      const [filePath, query] = id.split('?')

      if (
        query !== 'raw' ||
        !filePath.endsWith('.mdx') ||
        !filePath.includes('/content/blog/')
      ) {
        return null
      }

      return `export default ${JSON.stringify(fs.readFileSync(filePath, 'utf8'))}`
    },
  }
}

function blogPostSourceManifest(): Plugin {
  const virtualModuleId = 'virtual:blog-post-sources'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return {
    name: 'blog-post-source-manifest',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }

      return null
    },
    load(id: string) {
      if (id !== resolvedVirtualModuleId) {
        return null
      }

      const root = process.cwd()
      const blogContentDir = path.join(root, 'content', 'blog')
      const sources: Record<string, string> = {}

      for (const filePath of findPostFiles(blogContentDir)) {
        this.addWatchFile(filePath)
        const relativePath = path
          .relative(root, filePath)
          .split(path.sep)
          .join('/')
        sources[`/${relativePath}`] = fs.readFileSync(filePath, 'utf8')
      }

      return `export default ${JSON.stringify(sources)}`
    },
  }
}

function findPostFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return []
  }

  const files: string[] = []

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...findPostFiles(entryPath))
    } else if (entry.name === 'post.mdx') {
      files.push(entryPath)
    }
  }

  return files
}

async function openSourceInEditor(
  filePath: string,
  lineNumber?: string,
  columnNumber?: string,
) {
  const lineAndColumn = [lineNumber, columnNumber].filter(Boolean)
  const target = [filePath, ...lineAndColumn].join(':')

  try {
    await new Promise<void>((resolve, reject) => {
      execFile('code', ['--goto', target], (error) => {
        if (error) {
          reject(error)
          return
        }
        resolve()
      })
    })
  } catch {
    const launch = (await import('launch-editor')).default
    launch(target)
  }
}

const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const usePolling = env.VITE_USE_POLLING === 'true'
  const rawPollInterval = env.VITE_WATCH_POLL_INTERVAL
  const pollInterval = Number(
    rawPollInterval.length > 0 ? rawPollInterval : '120',
  )

  return {
    server: {
      allowedHosts: true,
      https: readHttpsConfig(env),
      watch: usePolling
        ? {
            usePolling: true,
            interval: Number.isFinite(pollInterval) ? pollInterval : 120,
          }
        : undefined,
    },
    plugins: [
      devtools({
        editor: {
          name: 'VSCode Remote CLI',
          open: openSourceInEditor,
        },
      }),
      tsconfigPaths({ projects: ['./tsconfig.json'] }),
      tailwindcss(),
      tanstackStart(),
      rawBlogMdxContent(),
      blogPostSourceManifest(),
      {
        enforce: 'pre',
        ...mdx({
          include: /\.mdx$/,
          providerImportSource: '@mdx-js/react',
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypePrettyCode,
              {
                theme: { dark: 'github-dark', light: 'github-light' },
                keepBackground: false,
              },
            ],
          ],
        }),
      },
      viteReact(),
      visualizer({
        filename: 'dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
  }
})

export default config
