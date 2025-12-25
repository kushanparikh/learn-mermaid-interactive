// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // Enable React for interactive components (like the code editor)
  integrations: [
    react(),
    tailwind(),
  ],
  
  // For GitHub Pages deployment
  // Change 'learn-mermaid-interactive' to your repo name
  site: 'https://kushanparikh.github.io',
  base: '/learn-mermaid-interactive',
  
  // Output static HTML files (perfect for GitHub Pages)
  output: 'static',
});
