import path from 'node:path'
import vm from 'node:vm'
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { format } from 'prettier'
import sharp from 'sharp'
import prettierConfig from '../prettier.config.js'

const rootDir = process.cwd()
const publicDir = path.join(rootDir, 'public')
const manifestPath = path.join(
  rootDir,
  'src',
  'features',
  'blog',
  'generated',
  'contentImageManifest.ts',
)

const sourceDirectories = [
  path.join(publicDir, 'blog'),
  path.join(publicDir, 'news'),
  path.join(publicDir, 'images'),
]

const targetWidths = [360, 640, 960, 1280, 1600]
const inputExtensions = new Set(['.avif', '.jpeg', '.jpg', '.png', '.webp'])
const generatedVariantPattern = /\.w\d+\.(avif|webp)$/i
const outputFormats = ['avif', 'webp']
const cliArgs = process.argv.slice(2)
const allowUpscaling =
  cliArgs.includes('--allow-upscaling') ||
  ['1', 'true', 'yes'].includes(
    String(process.env.ALLOW_UPSCALING ?? '').toLowerCase(),
  )

function parseTargetArgs() {
  const targets = []

  for (const arg of cliArgs) {
    if (arg === '--allow-upscaling') {
      continue
    }

    if (arg.startsWith('--scope=')) {
      targets.push(
        ...arg
          .slice('--scope='.length)
          .split(',')
          .map((scope) => scope.trim())
          .filter(Boolean),
      )
      continue
    }

    if (arg.startsWith('--path=')) {
      targets.push(arg.slice('--path='.length))
      continue
    }

    if (arg.startsWith('--paths=')) {
      targets.push(
        ...arg
          .slice('--paths='.length)
          .split(',')
          .map((targetPath) => targetPath.trim())
          .filter(Boolean),
      )
      continue
    }

    if (arg.startsWith('-')) {
      throw new Error(`Unknown option: ${arg}`)
    }

    targets.push(arg)
  }

  return targets
}

function resolveTargetPath(targetPath) {
  const normalizedTarget = targetPath.replaceAll('\\', '/').replace(/^\/+/, '')
  const resolvedPath = path.isAbsolute(targetPath)
    ? path.normalize(targetPath)
    : normalizedTarget.startsWith('public/')
      ? path.join(rootDir, normalizedTarget)
      : path.join(publicDir, normalizedTarget)

  if (path.relative(publicDir, resolvedPath).startsWith('..')) {
    throw new Error(`Target path must be inside public/: ${targetPath}`)
  }

  return resolvedPath
}

async function pathExists(filePath) {
  try {
    await stat(filePath)
    return true
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'ENOENT') {
        return false
      }
    }

    throw error
  }
}

async function collectSourceImageTargets(targetPaths) {
  const sourceImages = []

  for (const targetPath of targetPaths) {
    let targetStat

    try {
      targetStat = await stat(targetPath)
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error) {
        if (error.code === 'ENOENT') {
          throw new Error(`Target path does not exist: ${targetPath}`)
        }
      }

      throw error
    }

    if (targetStat.isDirectory()) {
      sourceImages.push(...(await collectSourceImages(targetPath)))
      continue
    }

    if (!targetStat.isFile()) {
      continue
    }

    const extension = path.extname(targetPath).toLowerCase()
    const fileName = path.basename(targetPath)

    if (
      inputExtensions.has(extension) &&
      !generatedVariantPattern.test(fileName)
    ) {
      sourceImages.push(targetPath)
    }
  }

  return sourceImages
}

function dedupePaths(filePaths) {
  return Array.from(
    new Set(filePaths.map((filePath) => path.normalize(filePath))),
  )
}

async function collectSourceImages(directoryPath) {
  let directoryEntries

  try {
    directoryEntries = await readdir(directoryPath, { withFileTypes: true })
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'ENOENT') {
        return []
      }
    }

    throw error
  }

  const filePaths = []

  for (const directoryEntry of directoryEntries) {
    const entryPath = path.join(directoryPath, directoryEntry.name)

    if (directoryEntry.isDirectory()) {
      filePaths.push(...(await collectSourceImages(entryPath)))
      continue
    }

    if (!directoryEntry.isFile()) {
      continue
    }

    const extension = path.extname(directoryEntry.name).toLowerCase()
    if (!inputExtensions.has(extension)) {
      continue
    }

    if (generatedVariantPattern.test(directoryEntry.name)) {
      continue
    }

    filePaths.push(entryPath)
  }

  return filePaths
}

function toPublicPath(filePath) {
  return `/${path.relative(publicDir, filePath).split(path.sep).join('/')}`
}

function toVariantPath(sourcePath, width, format) {
  const parsedPath = path.parse(sourcePath)

  return path.join(parsedPath.dir, `${parsedPath.name}.w${width}.${format}`)
}

async function serializeManifest(manifestEntries) {
  const manifestSource = [
    "export type ResponsiveContentImageFormat = 'avif' | 'webp'",
    '',
    'export type ResponsiveContentImageVariant = {',
    '  src: string',
    '  width: number',
    '}',
    '',
    'export type ResponsiveContentImageEntry = {',
    '  width: number',
    '  height: number',
    '  formats: Partial<',
    '    Record<ResponsiveContentImageFormat, ResponsiveContentImageVariant[]>',
    '  >',
    '}',
    '',
    'export const contentImageManifest: Record<string, ResponsiveContentImageEntry> =',
    `${JSON.stringify(manifestEntries, null, 2)}`,
    '',
  ].join('\n')

  return await format(manifestSource, {
    ...prettierConfig,
    parser: 'typescript',
  })
}

function getSortedManifestEntries(manifestEntries) {
  return Object.fromEntries(
    Object.entries(manifestEntries).sort(([left], [right]) =>
      left.localeCompare(right),
    ),
  )
}

async function loadExistingManifestEntries() {
  try {
    const manifestSource = await readFile(manifestPath, 'utf8')
    const declaration = 'export const contentImageManifest'
    const declarationIndex = manifestSource.indexOf(declaration)
    const assignmentIndex =
      declarationIndex === -1
        ? -1
        : manifestSource.indexOf('=', declarationIndex + declaration.length)

    if (assignmentIndex === -1) {
      return {}
    }

    const manifestExpression = manifestSource.slice(assignmentIndex + 1).trim()

    return vm.runInNewContext(`(${manifestExpression})`)
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'ENOENT') {
        return {}
      }
    }

    console.warn(`Could not read existing image manifest: ${error.message}`)
    return {}
  }
}

async function optimizeImage(sourcePath) {
  const sourceImage = sharp(sourcePath).rotate()
  const metadata = await sourceImage.metadata()

  if (!metadata.width || !metadata.height) {
    console.warn(`Skipping ${sourcePath}: missing image dimensions.`)
    return null
  }

  const candidateWidths = allowUpscaling
    ? targetWidths
    : targetWidths.filter((width) => width <= metadata.width)

  const manifestEntry = {
    width: metadata.width,
    height: metadata.height,
    formats: {},
  }

  for (const format of outputFormats) {
    const variants = []

    for (const width of candidateWidths) {
      const outputPath = toVariantPath(sourcePath, width, format)

      await sharp(sourcePath)
        .rotate()
        .resize({
          width,
          withoutEnlargement: !allowUpscaling,
        })
        [format](
          format === 'avif'
            ? { quality: 55, effort: 4 }
            : { quality: 75, effort: 4 },
        )
        .toFile(outputPath)

      variants.push({ src: toPublicPath(outputPath), width })
    }

    if (variants.length > 0) {
      manifestEntry.formats[format] = variants
    }
  }

  return [toPublicPath(sourcePath), manifestEntry]
}

async function buildManifestEntry(sourcePath) {
  const sourceImage = sharp(sourcePath).rotate()
  const metadata = await sourceImage.metadata()

  if (!metadata.width || !metadata.height) {
    console.warn(`Skipping ${sourcePath}: missing image dimensions.`)
    return null
  }

  const candidateWidths = allowUpscaling
    ? targetWidths
    : targetWidths.filter((width) => width <= metadata.width)

  const manifestEntry = {
    width: metadata.width,
    height: metadata.height,
    formats: {},
  }

  for (const format of outputFormats) {
    const variants = []

    for (const width of candidateWidths) {
      const outputPath = toVariantPath(sourcePath, width, format)

      if (await pathExists(outputPath)) {
        variants.push({ src: toPublicPath(outputPath), width })
      }
    }

    if (variants.length > 0) {
      manifestEntry.formats[format] = variants
    }
  }

  return [toPublicPath(sourcePath), manifestEntry]
}

async function main() {
  const targetArgs = parseTargetArgs()
  const manifestSourceImages = dedupePaths(
    (
      await Promise.all(
        sourceDirectories.map((directory) => collectSourceImages(directory)),
      )
    ).flat(),
  )
  const sourceImages =
    targetArgs.length > 0
      ? dedupePaths(
          await collectSourceImageTargets(targetArgs.map(resolveTargetPath)),
        )
      : manifestSourceImages

  const manifestEntries =
    targetArgs.length > 0 ? await loadExistingManifestEntries() : {}
  let generatedVariantCount = 0

  for (const sourcePath of sourceImages) {
    const optimizedImage = await optimizeImage(sourcePath)

    if (!optimizedImage) {
      continue
    }

    const [publicSourcePath, manifestEntry] = optimizedImage
    manifestEntries[publicSourcePath] = manifestEntry
    generatedVariantCount += Object.values(manifestEntry.formats).reduce(
      (total, variants) => total + variants.length,
      0,
    )
  }

  for (const sourcePath of manifestSourceImages) {
    const publicSourcePath = toPublicPath(sourcePath)

    if (publicSourcePath in manifestEntries) {
      continue
    }

    const manifestImage = await buildManifestEntry(sourcePath)

    if (!manifestImage) {
      continue
    }

    const [, manifestEntry] = manifestImage

    if (Object.keys(manifestEntry.formats).length > 0) {
      manifestEntries[publicSourcePath] = manifestEntry
    }
  }

  const sortedManifestEntries = getSortedManifestEntries(manifestEntries)

  await mkdir(path.dirname(manifestPath), { recursive: true })
  await writeFile(manifestPath, await serializeManifest(sortedManifestEntries))

  console.info(
    `Optimized ${sourceImages.length} images into ${generatedVariantCount} variants${allowUpscaling ? ' with upscaling enabled' : ''}.`,
  )
  if (targetArgs.length > 0) {
    console.info(`Targets: ${targetArgs.join(', ')}`)
  }
  console.info(`Updated ${path.relative(rootDir, manifestPath)}.`)
}

await main()
