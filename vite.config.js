import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Accept tunnel hostnames (cloudflared, localtunnel) when sharing the dev server
    allowedHosts: true,
  },
})
