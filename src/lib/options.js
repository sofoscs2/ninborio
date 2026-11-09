// Parts of the site that can be switched off without deleting them.
// After changing a switch, run `npm run build` and upload dist/ again.

// "Ενημερώσεις": the archive list (/enimeroseis/) and its 20 old posts.
// false = hidden: no menu item, no pages, and old links to it go to the home page.
export const SHOW_UPDATES = false;

// "Διαμονή & Φαγητό": the page /diamoni-fagito/ and its box on the home page.
// false = hidden: no menu item, no page, no box, and its address goes to the home page.
export const SHOW_STAY = false;
