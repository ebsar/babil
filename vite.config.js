import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

function searchVerificationPlugin(googleToken, bingToken) {
  return {
    name: 'search-engine-verification',
    transformIndexHtml() {
      const tags = []

      if (googleToken) {
        tags.push({
          tag: 'meta',
          attrs: { name: 'google-site-verification', content: googleToken },
          injectTo: 'head',
        })
      }

      if (bingToken) {
        tags.push({
          tag: 'meta',
          attrs: { name: 'msvalidate.01', content: bingToken },
          injectTo: 'head',
        })
      }

      return tags
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      react(),
      searchVerificationPlugin(
        env.GOOGLE_SITE_VERIFICATION?.trim(),
        env.BING_SITE_VERIFICATION?.trim(),
      ),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        input: {
          home: fileURLToPath(new URL('./index.html', import.meta.url)),
          english: fileURLToPath(new URL('./en/index.html', import.meta.url)),
          spanish: fileURLToPath(new URL('./es/index.html', import.meta.url)),
          bosnian: fileURLToPath(new URL('./bs/index.html', import.meta.url)),
        },
      },
    },
  }
})
