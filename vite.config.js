import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Served from https://prajwalps2603.github.io/Livora/ on GitHub Pages
  base: '/Livora/',
  server: {
    // Accept tunnel hostnames (cloudflared, localtunnel) when sharing the dev server
    allowedHosts: true,
  },
})
