import { esc } from './util.js';

/* Facebook posts shown in the site's own news design (?fb=site / ?fb=demo) */
const dateFmt = { el: new Intl.DateTimeFormat('el-GR', { day: 'numeric', month: 'long', year: 'numeric' }), en: new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) };
export const fmtDate = (d, en) => (d ? dateFmt[en ? 'en' : 'el'].format(new Date(d)) : '');

export function linkify(s) { // escaped text → links for URLs and #hashtags
  return esc(s)
    .replace(/https?:\/\/[^\s<]+/g, (u) => `<a href="${u}" target="_blank" rel="noopener">${u}</a>`)
    .replace(/(^|\s)#([\p{L}\p{N}_]+)/gu, (m, sp, tag) => `${sp}<a href="https://www.facebook.com/hashtag/${encodeURIComponent(tag)}" target="_blank" rel="noopener">#${tag}</a>`);
}

// A Facebook post has no title: use its first sentence/line as the headline.
export function splitPost(text, en) {
  text = (text || '').trim();
  if (!text) return { title: en ? 'Photos from Nimborio' : 'Φωτογραφίες από το Νημποριό', body: '' };
  const lines = text.split(/\n+/), first = lines[0].trim();
  let rest = lines.slice(1).join('\n'), title = first;
  if (first.length > 90) {
    const m = first.match(/^(.{20,90}?[.!;…])\s/);
    if (m) { title = m[1]; rest = first.slice(m[0].length) + (rest ? '\n' + rest : ''); }
    else { title = first.slice(0, first.lastIndexOf(' ', 80)) + '…'; rest = text; }
  }
  title = title.replace(/(^|\s)#[\p{L}\p{N}_]+/gu, '').trim() || (en ? 'News from Nimborio' : 'Νέα από το Νημποριό');
  return { title, body: rest.trim() };
}

function tagFor(p, en) {
  const h = (p.text || '').match(/#([\p{L}\p{N}_]{2,18})/u);
  if (h) return h[1].replace(/_/g, ' ');
  if (p.type === 'event') return en ? 'Event' : 'Εκδήλωση';
  if (p.type === 'video') return en ? 'Video' : 'Βίντεο';
  if ((p.images || []).length > 1) return en ? 'Photos' : 'Φωτογραφίες';
  return en ? 'News' : 'Νέα';
}

// everything a news card and the reader need
export function story(p, en) {
  const s = splitPost(p.text, en);
  return {
    ...p,
    title: s.title,
    body: s.body,
    imgs: p.images && p.images.length ? p.images : (p.image ? [p.image] : []),
    tag: tagFor(p, en),
    excerpt: (s.body || '').replace(/(^|\s)#[\p{L}\p{N}_]+/gu, ' ').replace(/\s+/g, ' ').trim(),
  };
}
