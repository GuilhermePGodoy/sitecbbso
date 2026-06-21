import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Durante o desenvolvimento, qualquer fetch para /api é redirecionado
    // para o back-end (Express na porta 3000). Assim o cookie do JWT
    // funciona como "mesma origem" e não há dor de cabeça com CORS.
    proxy: {
      '/api': 'http://localhost:3000',
      '/uploads': 'http://localhost:3000',
    },
  },
});
