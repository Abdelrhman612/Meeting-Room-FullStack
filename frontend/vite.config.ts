import { defineConfig } from 'vite'
import dotenv from 'dotenv'
dotenv.config()
// https://vite.dev/config/
export default defineConfig({
server: {
  port: Number(process.env.PORT) || 3000,
}
})
