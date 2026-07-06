export type BlogTableOfContentsItem = {
  id: string
  title: string
  level: 2 | 3
}

const tocEntryPattern =
  /^(#{2,3})\s+(.+)$|<(?<component>ContentBlock|Section)\b[^>]*\btitle=(?:"([^"]+)"|'([^']+)'|\{"([^"]+)"\}|\{'([^']+)'\})/gm

export function createHeadingId(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function extractTableOfContents(
  source: string,
): BlogTableOfContentsItem[] {
  const ids = new Map<string, number>()
  const items: BlogTableOfContentsItem[] = []

  for (const match of source.matchAll(tocEntryPattern)) {
    const markdownMarker = getCapture(match, 1)
    const markdownTitle = getCapture(match, 2)
    const componentName = match.groups?.component
    const componentTitle =
      getCapture(match, 4) ??
      getCapture(match, 5) ??
      getCapture(match, 6) ??
      getCapture(match, 7)
    const title = cleanTitle(markdownTitle ?? componentTitle)

    if (!title) {
      continue
    }

    const baseId = createHeadingId(title)
    if (!baseId) {
      continue
    }

    const seenCount = ids.get(baseId) ?? 0
    ids.set(baseId, seenCount + 1)

    items.push({
      id: seenCount === 0 ? baseId : `${baseId}-${seenCount + 1}`,
      title,
      level: markdownMarker
        ? markdownMarker.length === 2
          ? 2
          : 3
        : componentName === 'ContentBlock'
          ? 2
          : 3,
    })
  }

  return items
}

function getCapture(match: RegExpMatchArray, index: number) {
  return Reflect.get(match, index) as string | undefined
}

function cleanTitle(title: string | undefined) {
  if (!title) {
    return ''
  }

  return title
    .replace(/\s+#*$/, '')
    .replace(/[`*_~]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim()
}
