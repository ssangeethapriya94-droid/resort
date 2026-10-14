import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// In dev, forward /api calls to the Node server (npm run dev in /server).
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom', 'react-router'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:4000' },
  },
  legacy: {
    skipWebSocketTokenCheck: true,
  },
});

