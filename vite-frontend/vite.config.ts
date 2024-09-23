import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://nhan0204.github.io/StockPage',
  server: {
    host: 'localhost',
    port: 8001,
    proxy: {
      '/api': {
        target: 'https://financialmodelingprep.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  build: {
    outDir: 'build',
  },
  plugins: [react()],
})
