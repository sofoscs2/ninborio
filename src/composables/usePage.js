import { useHead } from '@unhead/vue';

// Title, description and share preview of a page
export function usePage({ path, title, description, image = '/assets/img/og-nimborio.jpg' }) {
  const url = 'https://nimborio.com' + path;
  useHead({
    title: title + ' · Νημποριό Εύβοιας',
    meta: [
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title + ' · Νημποριό Εύβοιας' },
      { property: 'og:description', content: description },
      { property: 'og:image', content: 'https://nimborio.com' + image },
      { property: 'og:url', content: url },
    ],
    link: [{ rel: 'canonical', href: url }],
  });
}
