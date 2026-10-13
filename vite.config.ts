import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import siteHead from './vite-plugin-site-head';

// https://vitejs.dev/config/
export default defineConfig({
  // siteHead() fills the SEO/social/analytics tags in index.html from src/config/siteConfig.ts
  plugins: [react(), siteHead()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
