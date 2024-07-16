import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(() => {
  return {
    // base: env.mode === "production" ? "/transcript" : "/",
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          main: 'src/main.tsx'
        },
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name][extname]',
        },
      },
    },
  }
})
