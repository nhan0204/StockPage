import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://nhan0204.github.io/StockPage',
  server: {
    host: 'localhost',
    port: 8001,
  },
  build: {
    outDir: 'build',
  },
  plugins: [react()],
})
