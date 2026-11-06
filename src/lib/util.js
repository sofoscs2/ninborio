export const LAT = 38.1227, LNG = 24.2122;
export const FB_PAGE = 'https://www.facebook.com/Nimborio/';

export const reduceMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
export const rand = (a, b) => a + Math.random() * (b - a);

export function store(key, val) { // localStorage that never throws
  try {
    if (val === undefined) return JSON.parse(localStorage.getItem(key));
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) { return null; }
}
export function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
export function beaufort(kmh) {
  const t = [1, 6, 12, 20, 29, 39, 50, 62, 75, 89, 103, 118];
  let b = 0;
  while (b < t.length && kmh >= t[b]) b++;
  return b;
}
export const compass = (deg) => ['Β', 'ΒΑ', 'Α', 'ΝΑ', 'Ν', 'ΝΔ', 'Δ', 'ΒΔ'][Math.round(deg / 45) % 8];

// Change the address bar without a page change and without losing Vue Router's own history state
export function setHash(hash) {
  history.replaceState(history.state, '', location.pathname + location.search + (hash || ''));
}
