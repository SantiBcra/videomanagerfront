import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/ProgramaActualizado/Backend PHP',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Elimina el prefijo '/api' en las solicitudes
      }
    }
  }
});