/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL?: string
  readonly VITE_SITE_URL?: string
  readonly VITE_USE_POLLING?: 'true' | 'false'
  readonly VITE_WATCH_POLL_INTERVAL?: string
  readonly VITE_HTTPS_CERT_PATH?: string
  readonly VITE_HTTPS_KEY_PATH?: string
  readonly DEV_HTTPS_CERT_PATH?: string
  readonly DEV_HTTPS_KEY_PATH?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.mdx' {
  import type { ComponentType } from 'react'

  const MDXComponent: ComponentType
  export default MDXComponent
}
