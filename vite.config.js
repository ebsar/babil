import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue(), react()],
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
})
