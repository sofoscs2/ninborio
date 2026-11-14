import { OLD_HOME_PARTS } from './lib/menus.js';
import { SHOW_UPDATES, SHOW_STAY } from './lib/options.js';

const Home = () => import('./pages/HomePage.vue');
const Around = () => import('./pages/GyroCompassPage.vue');
const Access = () => import('./pages/AccessPage.vue');
const Gallery = () => import('./pages/GalleryPage.vue');

export const routes = [
  {
    path: '/',
    component: Home,
    // old links such as /#paralia or /#prosvasi open the part's own page (news and today stay on the home page)
    beforeEnter(to) {
      if (OLD_HOME_PARTS[to.hash]) return { path: OLD_HOME_PARTS[to.hash], query: to.query, replace: true };
    },
  },
  { path: '/paralia/', component: () => import('./pages/BeachPage.vue') },
  {
    path: '/istoria/',
    component: () => import('./pages/HistoryPage.vue'),
    // the hill story moved to its own page
    beforeEnter(to) { if (to.hash === '#lofos') return { path: '/lofos/', replace: true }; },
  },
  { path: '/lofos/', component: () => import('./pages/HillPage.vue') },
  { path: '/gyro/', component: () => import('./pages/AroundPage.vue') },
  // the compass version of Γύρω; it will replace /gyro/ later
  { path: '/gyro1/', component: Around },
  { path: '/prosvasi/', component: Access },
  // "Διαμονή & Φαγητό" can be hidden in src/lib/options.js
  ...(SHOW_STAY ? [{ path: '/diamoni-fagito/', component: () => import('./pages/StayPage.vue') }] : []),
  { path: '/fotografies/', component: Gallery },
  // "Ενημερώσεις" can be hidden in src/lib/options.js; its addresses then lead to the home page
  ...(SHOW_UPDATES ? [
    { path: '/enimeroseis/', component: () => import('./pages/NewsPage.vue') },
    { path: '/enimeroseis/:slug/', component: () => import('./pages/PostPage.vue') },
  ] : []),
  { path: '/syllogos/', component: () => import('./pages/AssociationPage.vue') },
  { path: '/xrisima/', component: () => import('./pages/UsefulPage.vue') },

  /* ---------- English: the same addresses under /en/ ----------
     Pages with long texts have their own English file (src/pages/en/); the others show both languages. */
  { path: '/en/', component: Home },
  { path: '/en/paralia/', component: () => import('./pages/en/BeachPageEn.vue') },
  { path: '/en/istoria/', component: () => import('./pages/en/HistoryPageEn.vue') },
  { path: '/en/lofos/', component: () => import('./pages/en/HillPageEn.vue') },
  { path: '/en/gyro1/', component: Around },
  { path: '/en/gyro/', redirect: '/en/gyro1/' },
  { path: '/en/prosvasi/', component: Access },
  { path: '/en/fotografies/', component: Gallery },
  { path: '/en/syllogos/', component: () => import('./pages/en/AssociationPageEn.vue') },
  { path: '/en/xrisima/', component: () => import('./pages/en/UsefulPageEn.vue') },
  { path: '/en', redirect: '/en/' },
  // English pages that don't exist (hidden parts, old posts) lead to the English home page
  { path: '/en/:rest(.*)*', redirect: '/en/' },

  { path: '/:rest(.*)*', redirect: '/' },
];
