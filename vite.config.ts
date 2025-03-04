import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    open: true,
    port: 0
  },
  build: {
    outDir: 'dist'
  }
})
