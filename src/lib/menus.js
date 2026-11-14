import { SHOW_UPDATES, SHOW_STAY } from './options.js';

// One menu for every page (top bar): [address, Greek label, English label]
const ITEMS = [
  ['/', 'Αρχική', 'Home'], ['/paralia/', 'Παραλία', 'Beach'], ['/istoria/', 'Ιστορία', 'History'], ['/lofos/', 'Ο λόφος', 'The hill'],
  ['/gyro1/', 'Γύρω', 'Around'], ['/prosvasi/', 'Πρόσβαση', 'Getting here'], ['/fotografies/', 'Φωτογραφίες', 'Photos'],
  ...(SHOW_STAY ? [['/diamoni-fagito/', 'Διαμονή & Φαγητό', 'Stay & eat']] : []),
  ...(SHOW_UPDATES ? [['/enimeroseis/', 'Ενημερώσεις', 'Updates']] : []), ['/syllogos/', 'Σύλλογος', 'Association'], ['/xrisima/', 'Χρήσιμα', 'Useful'],
];
export const MENU = ITEMS.map(([href, label, labelEn]) => ({ href, label, labelEn }));

// The menu item to mark for a Greek address (each archive post belongs to "Ενημερώσεις")
export const menuItemFor = (path) => (path.startsWith('/enimeroseis/') ? '/enimeroseis/' : path === '/gyro/' ? '/gyro1/' : path);

// Old links to parts of the home page (/#paralia …) now go to their own pages; #nea and #simera stay on the home page
export const OLD_HOME_PARTS = {
  '#paralia': '/paralia/', '#istoria': '/istoria/', '#gyro': '/gyro1/', '#prosvasi': '/prosvasi/',
};
