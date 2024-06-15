import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Quote/",


  preview: {
    port: 8080,
    strictPort: true,
   },
  //  if you make this code work the image will appear in githubpages not on localservar
   server: {
    port: 8080,
    strictPort: true,
    host: true,
  }
    // origin: "http://0.0.0.0:8080",
})