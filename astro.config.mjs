import { defineConfig } from 'astro/config'
import { resolve } from 'path'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  server: {
    host: true,
    cors: true,
    port: 8080
  },
  vite: {
    alias: {
      '@/*': resolve(process.cwd(), './src/*'),
      '@sass/*': resolve(process.cwd(), './src/sass/*'),
      '@icons/*': resolve(process.cwd(), './src/icons/*'),
      '@components/*': resolve(process.cwd(), './src/components/*'),
      '@layouts/*': resolve(process.cwd(), './src/layouts/*'),
      '@pages/*': resolve(process.cwd(), './src/pages/*'),
      '@data/*': resolve(process.cwd(), './src/data/*')
    }
  },
  integrations: [react()]
})
