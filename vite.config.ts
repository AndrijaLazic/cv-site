import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import contentCollections from '@content-collections/vite'

const usePolling = process.env.VITE_USE_POLLING === 'true'
const pollInterval = Number(process.env.VITE_WATCH_POLL_INTERVAL ?? '120')

const config = defineConfig({
  server: {
    allowedHosts: true,
    watch: usePolling
      ? {
          usePolling: true,
          interval: Number.isFinite(pollInterval) ? pollInterval : 120,
        }
      : undefined,
  },
  plugins: [
    devtools(),
    contentCollections(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
