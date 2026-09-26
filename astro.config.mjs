// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://sushanttare.netlify.app',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  server: { host: '0.0.0.0', port: 4321 },
  build: { inlineStylesheets: 'auto' },
  vite: {
    plugins: [tailwindcss()],
    build: { sourcemap: false },
  },
});
