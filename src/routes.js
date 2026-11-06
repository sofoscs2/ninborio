export const routes = [
  { path: '/', component: () => import('./pages/HomePage.vue') },
  { path: '/diamoni-fagito/', component: () => import('./pages/StayPage.vue') },
  { path: '/fotografies/', component: () => import('./pages/GalleryPage.vue') },
  { path: '/enimeroseis/', component: () => import('./pages/NewsPage.vue') },
  { path: '/enimeroseis/:slug/', component: () => import('./pages/PostPage.vue') },
  { path: '/syllogos/', component: () => import('./pages/AssociationPage.vue') },
  { path: '/xrisima/', component: () => import('./pages/UsefulPage.vue') },
  { path: '/:rest(.*)*', redirect: '/' },
];
