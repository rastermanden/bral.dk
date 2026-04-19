import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [vue()],
    base: '/',
    server: {
      port: parseInt(env.VITE_DEV_PORT ?? '5173'),
      strictPort: true,
    },
  }
})
