import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    // Path is now relative to the 'frontend' directory (the new root)
    postcss: './postcss.config.js'
  }
})
