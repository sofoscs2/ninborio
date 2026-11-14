import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import posts from './src/data/posts.json' with { type: 'json' };
import { SHOW_UPDATES } from './src/lib/options.js';

export default defineConfig({
  plugins: [vue()],
  ssgOptions: {
    // every page becomes a real HTML file: /fotografies/index.html, /enimeroseis/<slug>/index.html …
    dirStyle: 'nested',
    formatting: 'none',
    includedRoutes(paths, routes) {
      // addresses that only redirect (/en, /en/gyro/) get no page of their own
      const redirects = new Set(routes.filter((r) => r.redirect).map((r) => r.path));
      const pages = paths.filter((p) => !p.includes(':') && !redirects.has(p));
      return SHOW_UPDATES ? pages.concat(posts.posts.map((p) => `/enimeroseis/${p.slug}/`)) : pages;
    },
  },
});
