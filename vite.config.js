import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import posts from './src/data/posts.json' with { type: 'json' };

export default defineConfig({
  plugins: [vue()],
  ssgOptions: {
    // every page becomes a real HTML file: /fotografies/index.html, /enimeroseis/<slug>/index.html …
    dirStyle: 'nested',
    formatting: 'none',
    includedRoutes(paths) {
      return paths.filter((p) => !p.includes(':')).concat(posts.posts.map((p) => `/enimeroseis/${p.slug}/`));
    },
  },
});
