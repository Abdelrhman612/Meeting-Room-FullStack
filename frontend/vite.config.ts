import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import tailwindcss from '@tailwindcss/vite'
dotenv.config()
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
      
    }),
  ],
  server : {
    port : Number(process.env.PORT || 3000),
     proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      '/meetingHub': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        ws: true,
      }
    }
  }
})
