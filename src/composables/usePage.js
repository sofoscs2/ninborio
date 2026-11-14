import { useHead } from '@unhead/vue';
import { toEn } from '../lib/lang.js';

const SITE = 'https://nimborio.com';

// Links that tell search engines the page exists in Greek and in English (path is the Greek address)
export const langLinks = (path) => [
  { rel: 'alternate', hreflang: 'el', href: SITE + path },
  { rel: 'alternate', hreflang: 'en', href: SITE + toEn(path) },
  { rel: 'alternate', hreflang: 'x-default', href: SITE + path },
];

// Title, description and share preview of a page. `path` is the Greek address; en = the English page.
export function usePage({ path, title, description, image = '/assets/img/og-nimborio.jpg', en = false, fullTitle }) {
  const url = SITE + (en ? toEn(path) : path);
  const name = fullTitle || title + (en ? ' · Nimborio, Evia' : ' · Νημποριό Εύβοιας');
  useHead({
    title: name,
    meta: [
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: name },
      { property: 'og:description', content: description },
      { property: 'og:image', content: SITE + image },
      { property: 'og:url', content: url },
      { property: 'og:locale', content: en ? 'en_GB' : 'el_GR' },
    ],
    link: [{ rel: 'canonical', href: url }, ...langLinks(path)],
  });
}
