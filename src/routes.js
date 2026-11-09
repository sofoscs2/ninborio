import { OLD_HOME_PARTS } from './lib/menus.js';
import { SHOW_UPDATES, SHOW_STAY } from './lib/options.js';

export const routes = [
  {
    path: '/',
    component: () => import('./pages/HomePage.vue'),
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
  { path: '/gyro1/', component: () => import('./pages/GyroCompassPage.vue') },
  { path: '/prosvasi/', component: () => import('./pages/AccessPage.vue') },
  // "Διαμονή & Φαγητό" can be hidden in src/lib/options.js
  ...(SHOW_STAY ? [{ path: '/diamoni-fagito/', component: () => import('./pages/StayPage.vue') }] : []),
  { path: '/fotografies/', component: () => import('./pages/GalleryPage.vue') },
  // "Ενημερώσεις" can be hidden in src/lib/options.js; its addresses then lead to the home page
  ...(SHOW_UPDATES ? [
    { path: '/enimeroseis/', component: () => import('./pages/NewsPage.vue') },
    { path: '/enimeroseis/:slug/', component: () => import('./pages/PostPage.vue') },
  ] : []),
  { path: '/syllogos/', component: () => import('./pages/AssociationPage.vue') },
  { path: '/xrisima/', component: () => import('./pages/UsefulPage.vue') },
  { path: '/:rest(.*)*', redirect: '/' },
];
