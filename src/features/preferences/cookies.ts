export const LANGUAGE_COOKIE_KEY = 'language'
export const THEME_COOKIE_KEY = 'theme'

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365
const COOKIE_ATTRIBUTES = `max-age=${COOKIE_MAX_AGE_SECONDS}; path=/; samesite=lax`

export function getClientCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null
  }

  const cookiePrefix = `${name}=`
  const cookies = document.cookie.split(';')

  for (const cookie of cookies) {
    const trimmedCookie = cookie.trim()

    if (trimmedCookie.startsWith(cookiePrefix)) {
      return decodeURIComponent(trimmedCookie.slice(cookiePrefix.length))
    }
  }

  return null
}

export function setClientCookie(name: string, value: string): void {
  if (typeof document === 'undefined') {
    return
  }

  document.cookie = `${name}=${encodeURIComponent(value)}; ${COOKIE_ATTRIBUTES}`
}
