import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
      },
      manifest: {
        name: 'Бухучет Онлайн',
        short_name: 'БухучетОнлайн',
        description: 'Профессиональные бухгалтерские услуги для ИП и ООО',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})
