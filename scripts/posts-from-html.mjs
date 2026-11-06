// Reads the news pages of the plain-HTML site (../nimborio/enimeroseis/) and writes src/data/posts.json.
// Run again after `npm run import-wp` in the plain-HTML site:  npm run posts
import fs from 'node:fs';
import path from 'node:path';

const SRC = path.resolve(process.argv[2] || '../nimborio/enimeroseis');
const OUT = path.resolve('src/data/posts.json');

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const pick = (html, re) => { const m = html.match(re); return m ? m[1] : ''; };
// relative links of the old pages → site addresses
const fix = (html) => html
  .replace(/(href|src)="\.\.\/\.\.\//g, '$1="/')
  .replace(/(href|src)="\.\.\/(?!\.)/g, '$1="/enimeroseis/');

const list = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8');
const hero = pick(list, /<section class="page-hero archive-hero">[\s\S]*?<p class="kicker"[^>]*>([^<]*)<\/p>/);

const cards = [...list.matchAll(/<article class="story[^"]*" data-cat="([^"]*)">([\s\S]*?)<\/article>/g)].map(([, cat, inner]) => {
  const img = inner.match(/<img src="([^"]*)"[^>]*width="(\d+)" height="(\d+)"/);
  return {
    slug: pick(inner, /<h3><a href="([^"/]+)\/"/),
    category: decode(cat),
    thumb: img ? { src: img[1].replace('../', '/'), w: +img[2], h: +img[3] } : null,
    excerpt: decode(pick(inner, /<p>([\s\S]*?)<\/p>/)),
  };
});

const posts = cards.map((c) => {
  const html = fs.readFileSync(path.join(SRC, c.slug, 'index.html'), 'utf8');
  const nav = pick(html, /<nav class="wrap art-nav"[^>]*>([\s\S]*?)<\/nav>/);
  const link = (cls) => {
    const m = nav.match(new RegExp(`<a class="${cls}" href="\\.\\./([^/]+)/"><span>[^<]*</span>([^<]*)</a>`));
    return m ? { slug: m[1], title: decode(m[2]) } : null;
  };
  return {
    ...c,
    title: decode(pick(html, /<section class="page-hero art-hero">[\s\S]*?<h1>([\s\S]*?)<\/h1>/)),
    description: decode(pick(html, /<meta name="description" content="([^"]*)"/)),
    ogImage: pick(html, /<meta property="og:image" content="([^"]*)"/),
    date: pick(html, /<time datetime="([^"]*)"/),
    dateText: pick(html, /<time datetime="[^"]*">([^<]*)<\/time>/),
    body: fix(pick(html, /<article class="wrap prose">([\s\S]*?)<\/article>/).trim()),
    prev: link('prev'),
    next: link('next'),
  };
});

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ kicker: decode(hero), posts }, null, 1));
console.log(`${posts.length} posts → ${path.relative(process.cwd(), OUT)}`);
