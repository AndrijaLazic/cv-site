const fallbackBackendUrl = 'http://localhost:3000'

function resolveBackendUrl(value?: string) {
  if (!value) {
    return fallbackBackendUrl
  }

  const trimmedValue = value.trim()

  return trimmedValue.length > 0 ? trimmedValue : fallbackBackendUrl
}

export const publicConfig = {
  backendUrl: resolveBackendUrl(import.meta.env.VITE_BACKEND_URL),
} as const

export type PublicConfig = typeof publicConfig
