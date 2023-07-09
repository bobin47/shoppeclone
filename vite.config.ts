import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()] as any,
  css: {
    devSourcemap: true
  },
  test: {
    environment: 'jsdom' // or 'jsdom', 'node'
  }
})
