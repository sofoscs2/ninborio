<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import 'leaflet/dist/leaflet.css';
import SiteLayout from '../components/SiteLayout.vue';
import WaveEdge from '../components/WaveEdge.vue';
import { usePage } from '../composables/usePage.js';

/* "Γύρω" as a compass over a satellite map: Νημποριό is point 0 in the centre, the map and the
   places turn together, and zooming shows the bay up close or the whole area. Places outside
   the circle sit on its edge, pointing the way. The visitor turns the dial by dragging, with the
   arrow keys, or with the phone's own compass. */
usePage({
  path: '/gyro1/',
  title: 'Γύρω από τον κόλπο',
  description: 'Μια πυξίδα πάνω σε δορυφορικό χάρτη, με κέντρο το Νημποριό: εξωκλήσια, παραλίες, Δρακόσπιτα, η Ακρόπολη των Στύρων, τα αρχαία λατομεία και τα γύρω χωριά, με απόσταση και κατεύθυνση.',
});

const CENTER = { lat: 38.122518, lng: 24.213387, map: 'https://maps.app.goo.gl/Up8x8kMWxW1JgAwk9' };
const PLACES = [
  { n: 1, ico: '⛪', name: 'Αϊ-Γιάννης', lat: 38.1148394, lng: 24.2085693, map: 'https://maps.app.goo.gl/ZHLTSn2pzEB8L6bU8', text: 'Το ξωκλήσι του Αγίου Ιωάννη, στη νότια άκρη του όρμου. Στο πανηγύρι του, από παλιά, κατεβαίνουν και οι γείτονες από τα γύρω χωριά.' },
  { n: 2, ico: '⛪', name: 'Προφήτης Ηλίας', lat: 38.12357, lng: 24.213037, map: 'https://maps.app.goo.gl/QpMnrM9wiWiy7FEF6', text: 'Το εξωκλήσι δίπλα στο κύμα. Στο πλακόστρωτο προαύλιό του στήνονται τα καλοκαιρινά γλέντια και οι χοροί.' },
  { n: 3, ico: '🏖️', name: 'Παραλία Ντούκα', lat: 38.128115, lng: 24.205537, map: 'https://maps.app.goo.gl/ARGL8uts35CUvMdWA', text: 'Μικρή παραλία στη βορειοδυτική άκρη του όρμου, για όσους θέλουν λίγη απομόνωση.' },
  { n: 4, ico: '🌲', name: 'Παραλία Πεύκο', lat: 38.117904, lng: 24.212381, map: 'https://maps.app.goo.gl/iPM4nEnHhnRff4P99', text: 'Ήσυχη ακρογιαλιά στη νότια πλευρά του κόλπου.' },
  { n: 5, ico: '🪨', name: 'Δρακόσπιτο Καψάλων', lat: 38.1247824, lng: 24.2451776, map: 'https://maps.app.goo.gl/Sech82wz1j8kK8fY8', text: 'Ένα από τα πέτρινα «σπίτια των δράκων», στον λόφο πάνω από τα Κάψαλα, το πιο κοντινό στον κόλπο.' },
  { n: 6, ico: '🏛️', name: 'Ακρόπολη Στύρων', lat: 38.145187, lng: 24.2603794, map: 'https://maps.app.goo.gl/QH2UWvcoXUWKLfxA7', text: 'Τα απομεινάρια της αρχαίας ακρόπολης, ψηλά στον λόφο του Αγίου Νικολάου, με ρωμαϊκά λατομεία στις πλαγιές.' },
  { n: 7, ico: '🪨', name: 'Δρακόσπιτα Στύρων', lat: 38.1528867, lng: 24.263595, map: 'https://maps.app.goo.gl/GUkDij5qs5U8VJVP9', text: 'Η πιο γνωστή ομάδα Δρακόσπιτων της περιοχής: ογκόλιθοι στημένοι ο ένας πάνω στον άλλον, με στέγες από πλάκες που κλείνουν σαν πυραμίδα.' },
  { n: 8, ico: '⚓', name: 'Νέα Στύρα', lat: 38.1795427, lng: 24.208438, map: 'https://maps.app.goo.gl/94yH6wDpcfQwVzuXA', text: 'Το λιμάνι όπου δένει το φέρι από την Αγία Μαρίνα, και το πιο κοντινό μεγάλο χωριό για ψώνια.' },
  { n: 9, ico: '🏘️', name: 'Στύρα', lat: 38.1558335, lng: 24.2418252, map: 'https://maps.app.goo.gl/pKysBhBKGe4aRt366', text: 'Το ορεινό χωριό, με την πλατεία του και θέα προς τα νησάκια των Πεταλιών.' },
  { n: 10, ico: '⛴️', name: 'Μαρμάρι', lat: 38.0491517, lng: 24.3217397, map: 'https://maps.app.goo.gl/DaiirEd4qvzz9Qum7', text: 'Το λιμάνι με το φέρι για τη Ραφήνα, νοτιοανατολικά του κόλπου.' },
  { n: 11, ico: '⛏️', name: 'Αρχαία λατομεία', lat: 38.130028, lng: 24.223043, map: 'https://maps.app.goo.gl/UvCmbbtjsovX6hF96', text: 'Εδώ βγαίνει από την αρχαιότητα η Στυρία λίθος. Ανάμεσα στα ίχνη της εξόρυξης κείτεται ακόμα ένας κίονας.' },
];

/* ---------- geometry ---------- */
const RAD = Math.PI / 180;
function measure(p) {
  const φ1 = CENTER.lat * RAD, φ2 = p.lat * RAD, dφ = φ2 - φ1, dλ = (p.lng - CENTER.lng) * RAD;
  const a = Math.sin(dφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(dλ / 2) ** 2;
  const km = 2 * 6371 * Math.asin(Math.sqrt(a));
  const deg = (Math.atan2(Math.sin(dλ) * Math.cos(φ2), Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(dλ)) / RAD + 360) % 360;
  return { km, deg };
}
// Web Mercator, the same projection as the map tiles: pixels at zoom z
function project(lat, lng, z) {
  const size = 256 * 2 ** z, s = Math.sin(lat * RAD);
  return [((lng + 180) / 360) * size, (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * size];
}
const DIRS = ['Β', 'ΒΑ', 'Α', 'ΝΑ', 'Ν', 'ΝΔ', 'Δ', 'ΒΔ'];
const DIR_NAMES = ['βόρεια', 'βορειοανατολικά', 'ανατολικά', 'νοτιοανατολικά', 'νότια', 'νοτιοδυτικά', 'δυτικά', 'βορειοδυτικά'];
const dirIndex = (deg) => Math.round(deg / 45) % 8;
const fmtKm = (km) => (km < 1 ? Math.round(km * 100) * 10 + ' μ.' : km.toFixed(1).replace('.', ',') + ' χλμ');
const fmtRing = (km) => (km < 1 ? km * 1000 + ' μ.' : km + ' χλμ');

// numbers 1…11 go from the nearest place to the furthest
const BASE = PLACES.map((p) => {
  const { km, deg } = measure(p);
  return { ...p, km, deg, dir: DIRS[dirIndex(deg)], dirName: DIR_NAMES[dirIndex(deg)] };
}).sort((a, b) => a.km - b.km).map((p, i) => ({ ...p, n: i + 1 }));
const NEAR = BASE.filter((p) => p.km < 1.5).sort((a, b) => a.km - b.km);
const FAR = BASE.filter((p) => p.km >= 1.5).sort((a, b) => a.km - b.km);
const TICKS = Array.from({ length: 72 }, (_, i) => i * 5);

/* ---------- zoom: the dial is 960 units across; the map below it is `width` pixels across ---------- */
const ZMIN = 10, ZMAX = 17.5, Z0 = 14.75;
const zoom = ref(Z0);
const width = ref(640);
const UNITS = 960, EDGE = 380; // places further than EDGE units sit on this inner rim
const k = computed(() => UNITS / width.value); // dial units per screen pixel
// the bay view: the same area whatever the size of the compass on screen (Z0 is for a 640px dial)
const zBay = computed(() => Z0 + Math.log2(width.value / 640));
const C0 = computed(() => project(CENTER.lat, CENTER.lng, zoom.value));
const VIEW = computed(() => BASE.map((p) => {
  const [px, py] = project(p.lat, p.lng, zoom.value);
  let x = (px - C0.value[0]) * k.value, y = (py - C0.value[1]) * k.value;
  const r = Math.hypot(x, y), edge = r > EDGE;
  if (edge) { x = (x / r) * EDGE; y = (y / r) * EDGE; }
  return { ...p, x, y, r: Math.min(r, EDGE), edge };
}));
// places so close to point 0 that their dots would sit on it (and on each other) are hidden;
// point 0 then shows how many, and clicking it zooms back into the bay
const CLUSTER_R = 36;
const HIDDEN = computed(() => VIEW.value.filter((p) => !p.edge && p.r < CLUSTER_R && !(selected.value && selected.value.n === p.n)));
const VISIBLE = computed(() => VIEW.value.filter((p) => !HIDDEN.value.includes(p)));
function openCluster() {
  if (!HIDDEN.value.length) return;
  selected.value = null;
  zoomTo(zBay.value);
}
const pxPerKm = computed(() => (256 * 2 ** zoom.value) / (40075.016686 * Math.cos(CENTER.lat * RAD)));
const RINGS = computed(() => [0.1, 0.25, 0.5, 1, 2, 5, 10, 20]
  .map((km) => ({ km, r: km * pxPerKm.value * k.value, label: fmtRing(km) }))
  .filter((ring) => ring.r > 45 && ring.r < EDGE - 10));
// a small arrow just outside a place on the rim, pointing the way to it
function arrowPath(p) {
  const ux = p.x / EDGE, uy = p.y / EDGE, b = EDGE + 22, t = EDGE + 40, w = 9;
  return `M ${ux * t} ${uy * t} L ${ux * b - uy * w} ${uy * b + ux * w} L ${ux * b + uy * w} ${uy * b - ux * w} Z`;
}
const clampZoom = (z) => Math.min(ZMAX, Math.max(ZMIN, z));
// a smooth zoom to `target` (stops if the visitor zooms by hand meanwhile)
let zoomRun = 0;
function zoomTo(target, ms = 650) {
  const run = ++zoomRun, from = zoom.value, to = clampZoom(target), t0 = performance.now();
  if (Math.abs(to - from) < 0.01) return;
  const step = (now) => {
    if (run !== zoomRun) return;
    const t = Math.min(1, (now - t0) / ms), e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
    zoom.value = from + (to - from) * e;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
function zoomBy(d) { zoomRun++; zoom.value = clampZoom(Math.round((zoom.value + d) * 4) / 4); }
// zoom in or out so the place sits about three quarters of the way to the edge
function zoomToFit(p) {
  const need = (EDGE * 0.75) / k.value / p.km; // pixels per km
  zoomTo(Math.log2((need * 40075.016686 * Math.cos(CENTER.lat * RAD)) / 256));
}

/* ---------- turning the dial ---------- */
const heading = ref(0);          // which way the visitor faces (degrees, not wrapped, so turns stay short)
const animate = ref(true);
const selected = ref(null);
const facing = computed(() => ((heading.value % 360) + 360) % 360);
const ahead = computed(() => {
  let best = null, gap = 16;
  for (const p of BASE) {
    const d = Math.abs(((p.deg - facing.value + 540) % 360) - 180);
    if (d < gap || (d === gap && best && p.km < best.km)) { gap = d; best = p; }
  }
  return best;
});
const shown = computed(() => selected.value || ahead.value);
const shownPos = computed(() => shown.value && VIEW.value.find((p) => p.n === shown.value.n));

function turnTo(deg) {
  const diff = ((deg - facing.value + 540) % 360) - 180; // shortest way round
  animate.value = true;
  heading.value += diff;
}
function pick(p) {
  selected.value = p;
  zoomToFit(p);
  if (!live.value) turnTo(p.deg);
}

// drag to turn, pinch or wheel to zoom
const svg = ref(null);
const pointers = new Map();
let drag = null, pinch = null;
function angleAt(e) {
  const b = svg.value.getBoundingClientRect();
  return Math.atan2(e.clientX - (b.left + b.width / 2), -(e.clientY - (b.top + b.height / 2))) / RAD;
}
const spread = () => { const [a, b] = [...pointers.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };
function down(e) {
  if (e.target.closest('.cp-place, .cp-center.cluster')) return;
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  svg.value.setPointerCapture(e.pointerId);
  if (pointers.size === 2) { drag = null; pinch = { d: spread(), z: zoom.value }; return; }
  if (live.value) return;
  drag = { a: angleAt(e), h: heading.value, moved: false };
  animate.value = false;
}
function move(e) {
  if (!pointers.has(e.pointerId)) return;
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (pinch && pointers.size === 2) {
    zoomRun++; zoom.value = clampZoom(pinch.z + Math.log2(spread() / pinch.d));
    return;
  }
  if (!drag) return;
  const d = ((angleAt(e) - drag.a + 540) % 360) - 180;
  if (Math.abs(d) > 1) drag.moved = true;
  heading.value = drag.h - d; // dragging the dial clockwise turns you to face further left
}
function up(e) {
  pointers.delete(e.pointerId);
  if (pointers.size < 2) pinch = null;
  if (drag && drag.moved) selected.value = null;
  drag = null;
}
let wheelAt = 0;
function wheel(e) {
  e.preventDefault();
  const now = Date.now();
  if (now - wheelAt < 120) return;
  wheelAt = now;
  zoomBy(e.deltaY < 0 ? 0.5 : -0.5);
}
function key(e) {
  if (e.key === '+' || e.key === '=') { e.preventDefault(); zoomBy(0.5); return; }
  if (e.key === '-' || e.key === '_') { e.preventDefault(); zoomBy(-0.5); return; }
  const step = { ArrowLeft: -10, ArrowRight: 10, ArrowUp: -2, ArrowDown: 2 }[e.key];
  if (!step || live.value) return;
  e.preventDefault();
  selected.value = null;
  animate.value = true;
  heading.value += step;
}

// the phone's compass
const canLive = ref(false); // decided in the browser, after the page has loaded
const live = ref(false);
const liveNote = ref('');
function onOrient(e) {
  let h = null;
  if (typeof e.webkitCompassHeading === 'number') h = e.webkitCompassHeading;             // iPhone
  else if (e.absolute && typeof e.alpha === 'number') h = (360 - e.alpha) % 360;          // Android
  if (h === null) return;
  animate.value = false;
  const diff = ((h - facing.value + 540) % 360) - 180;
  heading.value += diff;
  liveNote.value = '';
}
async function toggleLive() {
  if (live.value) { stopLive(); return; }
  try {
    const D = window.DeviceOrientationEvent;
    if (D && typeof D.requestPermission === 'function' && (await D.requestPermission()) !== 'granted') {
      liveNote.value = 'Χωρίς άδεια, η πυξίδα δεν μπορεί να ακολουθήσει το κινητό.'; return;
    }
  } catch { liveNote.value = 'Η πυξίδα του κινητού δεν είναι διαθέσιμη.'; return; }
  selected.value = null;
  live.value = true;
  liveNote.value = 'Κρατήστε το κινητό οριζόντια και στρίψτε αργά γύρω σας.';
  addEventListener('deviceorientationabsolute', onOrient);
  addEventListener('deviceorientation', onOrient);
}
function stopLive() {
  live.value = false;
  liveNote.value = '';
  removeEventListener('deviceorientationabsolute', onOrient);
  removeEventListener('deviceorientation', onOrient);
}

/* ---------- the satellite map under the dial ---------- */
const disc = ref(null), mapEl = ref(null);
let map = null, resize = null;
onMounted(async () => {
  canLive.value = 'DeviceOrientationEvent' in window && matchMedia('(pointer: coarse)').matches;
  width.value = disc.value.offsetWidth || 640;
  zoom.value = clampZoom(zBay.value);
  resize = new ResizeObserver(() => { width.value = disc.value.offsetWidth || width.value; if (map) map.invalidateSize(false); });
  resize.observe(disc.value);
  const L = (await import('leaflet')).default;
  map = L.map(mapEl.value, {
    center: [CENTER.lat, CENTER.lng], zoom: zoom.value, zoomSnap: 0, zoomControl: false, attributionControl: false,
    dragging: false, touchZoom: false, scrollWheelZoom: false, doubleClickZoom: false, boxZoom: false, keyboard: false, zoomAnimation: false,
  });
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, maxNativeZoom: 18 }).addTo(map);
});
watch(zoom, (z) => { if (map) map.setView([CENTER.lat, CENTER.lng], z, { animate: false }); });
onBeforeUnmount(() => { stopLive(); if (resize) resize.disconnect(); if (map) map.remove(); });

const turnStyle = computed(() => ({ transform: `rotate(${-heading.value}deg)`, transition: animate.value ? 'transform .7s cubic-bezier(.3,.7,.3,1)' : 'none' }));
const uprightStyle = (p) => ({ transform: `rotate(${heading.value}deg)`, transformOrigin: `${p.x}px ${p.y}px`, transition: animate.value ? 'transform .7s cubic-bezier(.3,.7,.3,1)' : 'none' });

/* Where each name goes, for the way the dial is turned now: names point inwards near the rim and
   outwards near the centre; a name that would cover another moves to the other side of its dot,
   or a little up or down. */
const labels = computed(() => {
  const placed = [], out = {};
  const screen = VIEW.value.map((p) => {
    const a = Math.atan2(p.x, -p.y) - facing.value * RAD;
    return { p, sx: p.r * Math.sin(a), sy: -p.r * Math.cos(a), w: p.name.length * 8.3 + 8 };
  });
  const box = (it, side, dy) => {
    const x0 = side === 'start' ? it.sx + 24 : it.sx - 24 - it.w;
    return { x0, x1: x0 + it.w, y0: it.sy + dy - 15, y1: it.sy + dy + 11 };
  };
  const hits = (b, self) => placed.some((o) => b.x0 < o.x1 && b.x1 > o.x0 && b.y0 < o.y1 && b.y1 > o.y0)
    || screen.some((q) => q !== self && q.sx > b.x0 - 14 && q.sx < b.x1 + 14 && q.sy > b.y0 - 14 && q.sy < b.y1 + 14)
    || b.x0 < -470 || b.x1 > 470;
  for (const it of [...screen].sort((u, v) => u.p.km - v.p.km)) {
    // close to point 0 there is no room for names: show only the number, unless it is the chosen place
    // places on the rim show only their number and arrow, too
    if ((it.p.r < 75 || it.p.edge) && !(shown.value && shown.value.n === it.p.n)) { out[it.p.n] = { hide: true, anchor: 'start', dx: 0, dy: 0 }; continue; }
    const first = it.p.r > 280 ? (it.sx > 0 ? 'end' : 'start') : (it.sx >= 0 ? 'start' : 'end');
    const other = first === 'start' ? 'end' : 'start';
    let pick = null;
    for (const [side, dy] of [[first, 0], [other, 0], [first, -24], [first, 24], [other, -24], [other, 24]]) {
      const b = box(it, side, dy);
      if (!hits(b, it)) { pick = { side, dy, b }; break; }
    }
    pick = pick || { side: first, dy: 0, b: box(it, first, 0) };
    placed.push(pick.b);
    out[it.p.n] = { anchor: pick.side, dx: pick.side === 'start' ? 24 : -24, dy: pick.dy };
  }
  return out;
});
</script>

<template>
  <SiteLayout>
    <section class="page-hero gyro-hero">
      <div class="wrap">
        <p class="kicker">Γύρω από τον κόλπο</p>
        <h1>Στρίψτε την <em>πυξίδα</em></h1>
        <p>Στο κέντρο είναι το Νημποριό. Γυρίστε τον δίσκο, ή αφήστε το κινητό σας να τον γυρίσει, και κάντε ζουμ για να δείτε τι βρίσκεται προς κάθε μεριά: εξωκλήσια, παραλίες, Δρακόσπιτα, αρχαία και χωριά.</p>
      </div>
      <WaveEdge />
    </section>

    <main id="main" class="hs">
      <section class="hs-sec cp-sec">
        <div class="wrap cp-grid">
          <div class="cp-stage">
            <div class="cp-facing" aria-hidden="true"><span>μπροστά σας · {{ DIRS[dirIndex(facing)] }} {{ Math.round(facing) }}°</span></div>
            <div ref="disc" class="cp-disc">
              <div class="cp-mapclip">
                <div ref="mapEl" class="cp-map" :style="turnStyle"></div>
                <div class="cp-shade"></div>
              </div>
              <svg ref="svg" class="cp-svg" viewBox="-480 -480 960 960" role="application" tabindex="0"
                aria-label="Πυξίδα πάνω σε δορυφορικό χάρτη, με κέντρο το Νημποριό. Τα βέλη τη γυρίζουν, τα + και − κάνουν ζουμ."
                @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="up" @wheel="wheel" @keydown="key">
                <g class="cp-dial" :style="turnStyle">
                  <circle r="470" class="cp-rim" />
                  <circle v-for="ring in RINGS" :key="ring.km" :r="ring.r" class="cp-ring" />
                  <text v-for="ring in RINGS" :key="'l' + ring.km" :x="6" :y="-ring.r - 6" class="cp-ring-label">{{ ring.label }}</text>
                  <line v-for="t in TICKS" :key="t" :x1="0" :y1="-470" :x2="0" :y2="t % 45 === 0 ? -440 : t % 15 === 0 ? -452 : -460" :transform="`rotate(${t})`" class="cp-tick" :class="{ major: t % 45 === 0 }" />
                  <g v-for="(d, i) in DIRS" :key="d" :transform="`rotate(${i * 45})`">
                    <text x="0" y="-412" class="cp-dir" :class="{ north: i === 0 }" :transform="`rotate(${heading - i * 45}, 0, -412)`">{{ d }}</text>
                  </g>
                  <line v-if="shownPos" x1="0" y1="0" :x2="shownPos.x" :y2="shownPos.y" class="cp-ray" />
                  <g v-for="p in VISIBLE" :key="p.n" class="cp-place" :class="{ on: shown && shown.n === p.n, edge: p.edge }" role="button" tabindex="0"
                    :aria-label="`${p.name}, ${fmtKm(p.km)} ${p.dirName}`" @click="pick(p)" @keydown.enter.prevent="pick(p)" @keydown.space.prevent="pick(p)">
                    <path v-if="p.edge" :d="arrowPath(p)" class="cp-arrow" />
                    <g :style="uprightStyle(p)">
                      <circle :cx="p.x" :cy="p.y" r="17" class="cp-dot" />
                      <text :x="p.x" :y="p.y + 4.5" class="cp-num">{{ p.n }}</text>
                      <text v-if="!labels[p.n].hide" :x="p.x + labels[p.n].dx" :y="p.y + 6 + labels[p.n].dy" class="cp-name" :text-anchor="labels[p.n].anchor">{{ p.name }}<tspan v-if="p.edge" class="cp-far"> · {{ fmtKm(p.km) }}</tspan></text>
                    </g>
                  </g>
                </g>
                <g class="cp-center" :class="{ cluster: HIDDEN.length }" :role="HIDDEN.length ? 'button' : null" :tabindex="HIDDEN.length ? 0 : null"
                  :aria-label="HIDDEN.length ? `Ζουμ στον κόλπο: ${HIDDEN.length} ακόμα μέρη κοντά στο Νημποριό` : null"
                  @click="openCluster" @keydown.enter.prevent="openCluster" @keydown.space.prevent="openCluster">
                  <circle r="20" class="cp-zero" />
                  <text y="7" class="cp-zero-n">0</text>
                  <g v-if="HIDDEN.length" class="cp-badge">
                    <circle cx="22" cy="-22" r="17" />
                    <text x="22" y="-16">+{{ HIDDEN.length }}</text>
                  </g>
                </g>
              </svg>
              <div class="cp-zoom" role="group" aria-label="Ζουμ">
                <button type="button" aria-label="Μεγέθυνση" :disabled="zoom >= ZMAX" @click="zoomBy(0.75)">+</button>
                <button type="button" aria-label="Σμίκρυνση" :disabled="zoom <= ZMIN" @click="zoomBy(-0.75)">−</button>
              </div>
            </div>
            <div class="cp-tools">
              <button type="button" class="btn btn-ghost-dark" @click="selected = null; turnTo(0)">⬆ Βορράς πάνω</button>
              <button type="button" class="btn btn-ghost-dark" @click="zoomTo(ZMIN)">🔭 Όλη η περιοχή</button>
              <button v-if="canLive" type="button" class="btn btn-sun" :aria-pressed="String(live)" @click="toggleLive">{{ live ? '✋ Σταμάτημα' : '🧭 Με την πυξίδα του κινητού' }}</button>
            </div>
            <p class="cp-hint">{{ liveNote || (HIDDEN.length ? 'Πατήστε το 0 για να δείτε ξανά τα μέρη μέσα στον κόλπο.' : 'Σύρετε τον δίσκο για να τον γυρίσετε. Ζουμ με τα + και −, τη ροδέλα ή με δύο δάχτυλα.') }}</p>
            <p class="cp-credit">Δορυφορική εικόνα: Esri, Maxar, Earthstar Geographics</p>
          </div>

          <aside class="cp-panel" aria-live="polite">
            <div class="hs-card cp-card">
              <template v-if="shown">
                <p class="cp-card-kicker">{{ selected ? 'Επιλεγμένο σημείο' : 'Μπροστά σας' }}</p>
                <h2><span aria-hidden="true">{{ shown.ico }}</span> {{ shown.name }}</h2>
                <p class="cp-meta"><b>{{ fmtKm(shown.km) }}</b> {{ shown.dirName }} · {{ Math.round(shown.deg) }}°</p>
                <p>{{ shown.text }}</p>
                <a class="btn btn-sun" :href="shown.map" target="_blank" rel="noopener">📍 Στους Χάρτες Google</a>
              </template>
              <template v-else>
                <p class="cp-card-kicker">Μπροστά σας</p>
                <h2><span aria-hidden="true">🌊</span> Ανοιχτή θάλασσα ή βουνό</h2>
                <p>Προς τα εκεί δεν έχουμε σημειώσει κάποιο μέρος. Γυρίστε τον δίσκο ή διαλέξτε ένα σημείο από τη λίστα.</p>
                <a class="btn btn-ghost-dark" :href="CENTER.map" target="_blank" rel="noopener">📍 Το Νημποριό στους Χάρτες Google</a>
              </template>
            </div>

            <div class="cp-lists">
              <h3>Μέσα στον κόλπο</h3>
              <ul class="cp-list">
                <li v-for="p in NEAR" :key="p.n"><button type="button" :class="{ on: shown && shown.n === p.n }" @click="pick(p)">
                  <span class="cp-li-n">{{ p.n }}</span><span class="cp-li-name">{{ p.ico }} {{ p.name }}</span><span class="cp-li-d">{{ fmtKm(p.km) }} · {{ p.dir }}</span>
                </button></li>
              </ul>
              <h3>Πιο μακριά</h3>
              <ul class="cp-list">
                <li v-for="p in FAR" :key="p.n"><button type="button" :class="{ on: shown && shown.n === p.n }" @click="pick(p)">
                  <span class="cp-li-n">{{ p.n }}</span><span class="cp-li-name">{{ p.ico }} {{ p.name }}</span><span class="cp-li-d">{{ fmtKm(p.km) }} · {{ p.dir }}</span>
                </button></li>
              </ul>
              <p class="hs-note">Οι αποστάσεις είναι σε ευθεία γραμμή από την αμμουδιά του Νημποριού. Όσα μέρη δεν χωρούν στον κύκλο φαίνονται στην άκρη του, με ένα βελάκι προς την κατεύθυνσή τους.</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  </SiteLayout>
</template>
