import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  proxy: {
    '/socket': 'http://localhost:3000/',
  },
})
