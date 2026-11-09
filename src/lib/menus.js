import { SHOW_UPDATES, SHOW_STAY } from './options.js';

// One menu for every page (top bar and footer)
export const MENU = [
  ['/', 'Αρχική'], ['/paralia/', 'Παραλία'], ['/istoria/', 'Ιστορία'], ['/lofos/', 'Ο λόφος'],
  ['/gyro1/', 'Γύρω'], ['/prosvasi/', 'Πρόσβαση'], ['/fotografies/', 'Φωτογραφίες'], ...(SHOW_STAY ? [['/diamoni-fagito/', 'Διαμονή & Φαγητό']] : []),
  ...(SHOW_UPDATES ? [['/enimeroseis/', 'Ενημερώσεις']] : []), ['/syllogos/', 'Σύλλογος'], ['/xrisima/', 'Χρήσιμα'],
].map(([href, label]) => ({ href, label }));

// The menu item to mark for an address (each archive post belongs to "Ενημερώσεις")
export const menuItemFor = (path) => (path.startsWith('/enimeroseis/') ? '/enimeroseis/' : path === '/gyro/' ? '/gyro1/' : path);

// Old links to parts of the home page (/#paralia …) now go to their own pages; #nea and #simera stay on the home page
export const OLD_HOME_PARTS = {
  '#paralia': '/paralia/', '#istoria': '/istoria/', '#gyro': '/gyro1/', '#prosvasi': '/prosvasi/',
};
