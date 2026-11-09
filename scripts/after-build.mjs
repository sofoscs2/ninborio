// Runs after `vite-ssg build`: tidies dist/ and applies the switches in src/lib/options.js
import fs from 'node:fs';
import { SHOW_UPDATES, SHOW_STAY } from '../src/lib/options.js';

fs.rmSync('dist/.vite', { recursive: true, force: true });

// Hidden parts: send their addresses (and old WordPress links that lead there) to the home page.
// 302 = temporary, so search engines keep the addresses for when a part is switched back on.
const hidden = [];
if (!SHOW_UPDATES) hidden.push(['Ενημερώσεις', 'SHOW_UPDATES', '^/enimeroseis(/.*)?$']);
if (!SHOW_STAY) hidden.push(['Διαμονή & Φαγητό', 'SHOW_STAY', '^/diamoni-fagito(/.*)?$']);

if (hidden.length) {
  fs.appendFileSync('dist/.htaccess', [
    '',
    '# BEGIN hidden-parts (src/lib/options.js: ' + hidden.map((h) => h[1] + ' = false').join(', ') + ')',
    '<IfModule mod_alias.c>',
    ...hidden.map((h) => `  RedirectMatch 302 ${h[2]} /`),
    '</IfModule>',
    '# END hidden-parts',
    '',
  ].join('\n'));
}
console.log('after-build: hidden ' + (hidden.map((h) => h[0]).join(', ') || 'nothing'));
