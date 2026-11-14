import { useRoute } from 'vue-router';

/* Two languages: Greek at /…, English at /en/…
   Every page mounts fresh (App.vue keys the page by its address), so the language of a page never
   changes while it is open: switching language opens the same page at its other address. */
export const isEn = (path) => path === '/en' || path.startsWith('/en/');
export const toEn = (path) => (isEn(path) ? path : '/en' + path);
export const toEl = (path) => (isEn(path) ? path.slice(3) || '/' : path);

export function useLang() {
  const en = isEn(useRoute().path);
  return {
    en,
    // t('Ελληνικά', 'English')
    t: (el, english) => (en ? english : el),
    // an address inside the site, in the language of this page
    href: (path) => (en && path.startsWith('/') ? toEn(path) : path),
    locale: en ? 'en-GB' : 'el-GR',
  };
}
