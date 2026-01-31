import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import tailwindcss from '@tailwindcss/vite'
dotenv.config()
// https://vite.dev/config/
export default defineConfig({
   plugins: [
    tailwindcss(),
  ],
server: {
  port: Number(process.env.PORT) || 3000,
}
})
