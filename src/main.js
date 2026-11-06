import { ViteSSG } from 'vite-ssg';
import App from './App.vue';
import { routes } from './routes.js';
import './styles/site.css';

// #post-… (news reader) and #photo-… (gallery viewer) open a window instead of scrolling
const OVERLAY = /^#(post|photo)-/;

export const createApp = ViteSSG(App, {
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved;
    if (to.hash) {
      if (OVERLAY.test(to.hash)) return false;
      // scrollIntoView respects the CSS scroll-padding under the sticky top bar
      return new Promise((done) => setTimeout(() => {
        const el = document.getElementById(decodeURIComponent(to.hash.slice(1)));
        if (el) el.scrollIntoView({ behavior: to.path === from.path ? 'smooth' : 'auto' });
        done(false);
      }, 0));
    }
    return to.path === from.path ? false : { top: 0 };
  },
});
