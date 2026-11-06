import { onMounted, onBeforeUnmount } from 'vue';
import { reduceMotion } from '../lib/util.js';

const SELECTOR = '.card, .feature, .timeline li, .place, .route li, .stay-box, .faq details, .biz';

// Fade sections in as they scroll into view (same as the plain-HTML site)
export function useReveal() {
  let io = null;
  onMounted(() => {
    if (!('IntersectionObserver' in window) || reduceMotion()) return;
    io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll(SELECTOR).forEach((el, n) => {
      el.classList.add('reveal');
      el.style.transitionDelay = (n % 4) * 80 + 'ms';
      io.observe(el);
    });
  });
  onBeforeUnmount(() => io && io.disconnect());
}
