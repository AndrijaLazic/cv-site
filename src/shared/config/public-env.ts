const fallbackBackendUrl = 'http://localhost:3000'
const fallbackSiteUrl = 'https://gundra.dev'

function resolveBackendUrl(value?: string) {
  if (!value) {
    return fallbackBackendUrl
  }

  const trimmedValue = value.trim()

  return trimmedValue.length > 0 ? trimmedValue : fallbackBackendUrl
}

function resolveSiteUrl(value?: string) {
  if (!value) {
    return fallbackSiteUrl
  }

  const trimmedValue = value.trim()

  if (trimmedValue.length === 0) {
    return fallbackSiteUrl
  }

  return trimmedValue.replace(/\/+$/, '')
}

export const publicConfig = {
  backendUrl: resolveBackendUrl(import.meta.env.VITE_BACKEND_URL),
  siteUrl: resolveSiteUrl(import.meta.env.VITE_SITE_URL),
} as const

export type PublicConfig = typeof publicConfig
