// Menu and footer links of each page, as on the plain-HTML site
const L = (href, label, current = false) => ({ href, label, current });
const mark = (list, here) => list.map((l) => ({ ...l, current: l.href === here }));

export const HOME_NAV = [
  L('#nea', 'Νέα'), L('#simera', 'Σήμερα'), L('#paralia', 'Παραλία'), L('#istoria', 'Ιστορία'), L('#gyro', 'Γύρω'), L('#prosvasi', 'Πρόσβαση'),
  L('/fotografies/', 'Φωτογραφίες'), L('/diamoni-fagito/', 'Διαμονή & Φαγητό'), L('/enimeroseis/', 'Ενημερώσεις'), L('/syllogos/', 'Σύλλογος'), L('/xrisima/', 'Χρήσιμα'),
];
export const HOME_FOOTER = [
  L('#paralia', 'Παραλία'), L('#nea', 'Νέα'), L('#prosvasi', 'Πρόσβαση'), L('/fotografies/', 'Φωτογραφίες'), L('/diamoni-fagito/', 'Διαμονή & Φαγητό'),
  L('/enimeroseis/', 'Ενημερώσεις'), L('/syllogos/', 'Σύλλογος'), L('/xrisima/', 'Χρήσιμα'),
];

// News, association and useful-info pages (here = the page you are on)
export const subNav = (here) => mark([
  L('/', 'Αρχική'), L('/#nea', 'Νέα'), L('/fotografies/', 'Φωτογραφίες'), L('/diamoni-fagito/', 'Διαμονή & Φαγητό'),
  L('/enimeroseis/', 'Ενημερώσεις'), L('/syllogos/', 'Σύλλογος'), L('/xrisima/', 'Χρήσιμα'),
], here);
export const SUB_FOOTER = [
  L('/', 'Αρχική'), L('/enimeroseis/', 'Ενημερώσεις'), L('/syllogos/', 'Σύλλογος'), L('/xrisima/', 'Χρήσιμα'), L('/fotografies/', 'Φωτογραφίες'),
];

export const STAY_NAV = [
  L('/', 'Αρχική'), L('/#nea', 'Νέα'), L('/#simera', 'Σήμερα'), L('/fotografies/', 'Φωτογραφίες'), L('#fagito', 'Φαγητό'), L('#diamoni', 'Διαμονή'),
  L('/enimeroseis/', 'Ενημερώσεις'), L('/syllogos/', 'Σύλλογος'), L('/xrisima/', 'Χρήσιμα'),
];
export const STAY_FOOTER = [
  L('/', 'Αρχική'), L('/#nea', 'Νέα'), L('/#prosvasi', 'Πρόσβαση'), L('/fotografies/', 'Φωτογραφίες'), L('/enimeroseis/', 'Ενημερώσεις'), L('/syllogos/', 'Σύλλογος'), L('/xrisima/', 'Χρήσιμα'),
];

export const GALLERY_NAV = [
  L('/', 'Αρχική'), L('/#nea', 'Νέα'), L('/#simera', 'Σήμερα'), L('/fotografies/', 'Φωτογραφίες', true), L('/diamoni-fagito/', 'Διαμονή & Φαγητό'),
  L('/enimeroseis/', 'Ενημερώσεις'), L('/syllogos/', 'Σύλλογος'), L('/xrisima/', 'Χρήσιμα'),
];
export const GALLERY_FOOTER = [
  L('/', 'Αρχική'), L('/#nea', 'Νέα'), L('/fotografies/', 'Φωτογραφίες'), L('/diamoni-fagito/', 'Διαμονή & Φαγητό'), L('/enimeroseis/', 'Ενημερώσεις'), L('/syllogos/', 'Σύλλογος'), L('/xrisima/', 'Χρήσιμα'),
];
