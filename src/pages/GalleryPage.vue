<script setup>
import { ref, reactive, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';
import SiteLayout from '../components/SiteLayout.vue';
import WaveEdge from '../components/WaveEdge.vue';
import { setHash } from '../lib/util.js';
import { useLang } from '../lib/lang.js';
import { usePage } from '../composables/usePage.js';

const { en, t } = useLang();
usePage({
  path: '/fotografies/',
  en,
  title: t('Φωτογραφίες', 'Photos'),
  description: t('Ο κόλπος του Νημποριού σε φωτογραφίες: η αμμουδιά, η θάλασσα, ο οικισμός και η φύση γύρω του.', 'The bay of Nimborio in photos: the beach, the sea, the village and the nature around it.'),
});

/* Photo gallery with a full-screen viewer and zoom. The photos are listed in /assets/data/gallery.json
   (title_en and category_en hold the English words). */
const IMG = '/assets/img/gallery/';
const ALL = t('Όλες', 'All');
const CREDITS_EN = { 'Αρχείο Συλλόγου Νημποριού': 'Nimborio Association archive', 'Αρχείο Δημήτρη Σινέκογλου': 'Dimitris Sinekoglou archive' };
const inLang = (p) => (en ? { ...p, title: p.title_en || p.title, category: p.category_en || p.category, credit: CREDITS_EN[p.credit] || p.credit } : p);
const photos = ref([]);
const failed = ref(false);
const filter = ref(ALL);

const cats = computed(() => {
  const counts = {};
  photos.value.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1; });
  return [[ALL, photos.value.length], ...Object.entries(counts)];
});
const list = computed(() => photos.value.filter((p) => filter.value === ALL || p.category === filter.value));

/* ---------- viewer ---------- */
const lb = ref(null), stage = ref(null), img = ref(null);
const current = ref(0);
const loading = ref(false);
const z = reactive({ s: 1, x: 0, y: 0 }), MAX = 6;
const anim = ref(false);
const swipe = ref(null);        // sideways drag while not zoomed
const opened = ref(false); // no photo is loaded until the viewer is first opened
const photo = computed(() => (opened.value && list.value[current.value]) || null);
const meta = computed(() => {
  const p = photo.value; if (!p) return '';
  return [p.date, p.credit ? '📷 ' + p.credit : '', p.placeholder ? t('προσωρινή φωτογραφία', 'temporary photo') : '', p.w ? p.w + '×' + p.h : ''].filter(Boolean).join(' · ');
});
const imgStyle = computed(() => ({
  transition: anim.value ? 'transform .25s ease' : 'none',
  transform: swipe.value != null ? `translateX(${swipe.value}px)` : `translate(${z.x}px,${z.y}px) scale(${z.s})`,
  opacity: loading.value ? 0 : 1,
}));

function open(i) {
  const n = list.value.length;
  current.value = (i + n) % n;
  opened.value = true;
  const p = list.value[current.value];
  resetZoom();
  loading.value = true;
  setHash('#photo-' + p.file);
  if (!lb.value.open) lb.value.showModal();
  nextTick(() => { if (img.value.complete && img.value.naturalWidth) loading.value = false; }); // same photo again: no new load event
  // preload neighbours so next/previous are instant
  [1, -1].forEach((d) => { const q = list.value[(current.value + d + n) % n]; if (q) new Image().src = IMG + q.file + '.webp'; });
}
const close = () => lb.value.close();
const onClose = () => setHash('');
function openFromHash() {
  const m = location.hash.match(/^#photo-(.+)$/); if (!m) return;
  const i = list.value.findIndex((p) => p.file === decodeURIComponent(m[1]));
  if (i >= 0) open(i);
}
function onKey(e) {
  if (e.key === 'ArrowRight') open(current.value + 1);
  else if (e.key === 'ArrowLeft') open(current.value - 1);
  else if (e.key === '+' || e.key === '=') zoomAt(z.s * 1.6, 0, 0);
  else if (e.key === '-') zoomAt(z.s / 1.6, 0, 0);
  else if (e.key === '0') resetZoom();
  else return;
  e.preventDefault();
}

/* zoom & pan: the photo is scaled around the stage centre; (x, y) is the pan offset */
function clamp() {
  const mx = Math.max(0, (img.value.offsetWidth * z.s - stage.value.clientWidth) / 2);
  const my = Math.max(0, (img.value.offsetHeight * z.s - stage.value.clientHeight) / 2);
  z.x = Math.min(mx, Math.max(-mx, z.x));
  z.y = Math.min(my, Math.max(-my, z.y));
}
// zoom to scale ns, keeping the point (px, py) (relative to the stage centre) still
function zoomAt(ns, px, py, noAnim) {
  ns = Math.min(MAX, Math.max(1, ns));
  z.x = px - (px - z.x) * (ns / z.s);
  z.y = py - (py - z.y) * (ns / z.s);
  z.s = ns;
  clamp(); anim.value = !noAnim;
}
function resetZoom() { z.s = 1; z.x = 0; z.y = 0; swipe.value = null; anim.value = true; }
function fromCentre(e) {
  const r = stage.value.getBoundingClientRect();
  return [e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2];
}
function onWheel(e) {
  const c = fromCentre(e);
  zoomAt(z.s * Math.exp(-e.deltaY * 0.0015), c[0], c[1], true);
}
function onDbl(e) {
  const c = fromCentre(e);
  if (z.s > 1.01) resetZoom(); else zoomAt(2.5, c[0], c[1]);
}

// pointer gestures: drag to pan (zoomed), swipe to change photo (not zoomed), pinch to zoom
const pts = new Map();
let start = null, pinch = null, moved = false;
function down(e) {
  stage.value.setPointerCapture(e.pointerId);
  pts.set(e.pointerId, [e.clientX, e.clientY]);
  moved = false;
  if (pts.size === 1) start = { x: e.clientX, y: e.clientY, zx: z.x, zy: z.y, onImg: e.target === img.value };
  if (pts.size === 2) {
    const a = [...pts.values()];
    pinch = { d: Math.hypot(a[0][0] - a[1][0], a[0][1] - a[1][1]), s: z.s };
  }
}
function move(e) {
  if (!pts.has(e.pointerId)) return;
  pts.set(e.pointerId, [e.clientX, e.clientY]);
  if (pts.size === 2 && pinch) {
    const a = [...pts.values()];
    const d = Math.hypot(a[0][0] - a[1][0], a[0][1] - a[1][1]);
    const mid = fromCentre({ clientX: (a[0][0] + a[1][0]) / 2, clientY: (a[0][1] + a[1][1]) / 2 });
    swipe.value = null;
    zoomAt(pinch.s * d / pinch.d, mid[0], mid[1], true);
    moved = true;
  } else if (start) {
    const dx = e.clientX - start.x, dy = e.clientY - start.y;
    if (Math.abs(dx) + Math.abs(dy) > 6) moved = true;
    anim.value = false;
    if (z.s > 1.01) { z.x = start.zx + dx; z.y = start.zy + dy; clamp(); }
    else swipe.value = dx;
  }
}
function end(e) {
  if (!pts.has(e.pointerId)) return;
  pts.delete(e.pointerId);
  if (pts.size < 2) pinch = null;
  if (pts.size === 0 && start) {
    const dx = e.clientX - start.x;
    if (z.s <= 1.01) {
      if (dx < -60) open(current.value + 1);
      else if (dx > 60) open(current.value - 1);
      else if (!moved && !start.onImg) close(); // click on the dark area closes
      else { swipe.value = null; anim.value = true; }
    }
    start = null;
  }
}
const onResize = () => { if (lb.value && lb.value.open) { clamp(); anim.value = false; } };

onMounted(() => {
  fetch('/assets/data/gallery.json').then((r) => r.json()).then((data) => {
    photos.value = (data.photos || []).map(inLang);
    openFromHash();
  }).catch(() => { failed.value = true; });
  addEventListener('hashchange', openFromHash);
  addEventListener('resize', onResize);
});
onBeforeUnmount(() => { removeEventListener('hashchange', openFromHash); removeEventListener('resize', onResize); });
</script>

<template>
  <SiteLayout>
    <section class="page-hero gallery-hero">
      <div class="wrap">
        <p class="kicker" style="color:var(--sun)">{{ t('Νημποριό · Νότια Εύβοια', 'Nimborio · South Evia') }}</p>
        <h1>{{ t('Ο κόλπος σε φωτογραφίες', 'The bay in photos') }}</h1>
        <p>{{ t('Θάλασσα, άμμος και φως από το Νημποριό. Πατήστε μια φωτογραφία για να τη δείτε μεγάλη και να κάνετε ζουμ στις λεπτομέρειες.', 'Sea, sand and light from Nimborio. Tap a photo to see it large and zoom in on the details.') }}</p>
      </div>
      <WaveEdge />
    </section>

    <main id="main" class="gallery-page">
      <div class="wrap">
        <div class="gal-toolbar">
          <div class="filters" id="filters" role="group" :aria-label="t('Κατηγορίες', 'Categories')">
            <button v-for="([c, n], i) in cats" :key="c" :class="'chip-btn cat-' + (i % 6)" :aria-pressed="String(c === filter)" :data-cat="c" @click="filter = c">{{ c }} <span>{{ n }}</span></button>
          </div>
          <span class="gal-total" id="gal-total">{{ photos.length ? list.length + (list.length === 1 ? t(' φωτογραφία', ' photo') : t(' φωτογραφίες', ' photos')) : '' }}</span>
        </div>
        <ul class="masonry" id="masonry" aria-live="polite">
          <li v-if="failed" class="gal-empty">{{ t('Οι φωτογραφίες δεν φορτώθηκαν. Δοκιμάστε ξανά σε λίγο.', 'The photos did not load. Please try again in a moment.') }}</li>
          <li v-for="(p, i) in list" :key="p.file">
            <a class="tile" :href="'#photo-' + p.file" :data-i="i" @click.prevent="open(i)">
              <img :src="IMG + p.file + '-thumb.webp'" :alt="p.title" loading="lazy" :width="p.w || 640" :height="p.h || 480">
              <span class="tile-info"><span class="tag">{{ p.category }}</span><strong>{{ p.title }}</strong></span>
              <span v-if="p.placeholder" class="ph-badge">{{ t('προσωρινή', 'temporary') }}</span>
              <span class="zoom-hint" aria-hidden="true">⤢</span>
            </a>
          </li>
        </ul>
        <p v-if="en" class="gal-cta">Do you have nice photos of Nimborio? <a href="https://www.facebook.com/Nimborio/" target="_blank" rel="noopener">Send them to us on Facebook</a> and we will add them with your name.</p>
        <p v-else class="gal-cta">Έχετε ωραίες φωτογραφίες από το Νημποριό; <a href="https://www.facebook.com/Nimborio/" target="_blank" rel="noopener">Στείλτε τες μας στο Facebook</a> και θα τις ανεβάσουμε με το όνομά σας.</p>
      </div>
    </main>

    <!-- full-screen viewer -->
    <dialog class="lightbox" id="lightbox" ref="lb" :aria-label="t('Προβολή φωτογραφίας', 'Photo viewer')" @close="onClose" @keydown="onKey">
      <div class="lb-stage" id="lb-stage" ref="stage" :class="{ zoomed: z.s > 1.01 }"
           @wheel.prevent="onWheel" @dblclick="onDbl" @pointerdown="down" @pointermove="move" @pointerup="end" @pointercancel="end">
        <img id="lb-img" ref="img" :alt="photo ? photo.title : ''" draggable="false" :src="photo ? IMG + photo.file + '.webp' : null" :style="imgStyle" @load="loading = false">
        <div class="lb-spinner" id="lb-spinner" aria-hidden="true" :hidden="!loading"></div>
      </div>
      <button class="lb-btn lb-close" id="lb-close" :aria-label="t('Κλείσιμο (Esc)', 'Close (Esc)')" @click="close">✕</button>
      <button class="lb-btn lb-prev" id="lb-prev" :aria-label="t('Προηγούμενη (←)', 'Previous (←)')" :hidden="list.length < 2" @click="open(current - 1)">‹</button>
      <button class="lb-btn lb-next" id="lb-next" :aria-label="t('Επόμενη (→)', 'Next (→)')" :hidden="list.length < 2" @click="open(current + 1)">›</button>
      <div class="lb-tools">
        <button class="lb-btn small" id="lb-zoom-out" :aria-label="t('Σμίκρυνση (−)', 'Zoom out (−)')" @click="zoomAt(z.s / 1.6, 0, 0)">−</button>
        <span id="lb-zoom-level">{{ Math.round(z.s * 100) }}%</span>
        <button class="lb-btn small" id="lb-zoom-in" :aria-label="t('Μεγέθυνση (+)', 'Zoom in (+)')" @click="zoomAt(z.s * 1.6, 0, 0)">+</button>
        <button class="lb-btn small wide" id="lb-zoom-fit" :aria-label="t('Προσαρμογή στην οθόνη (0)', 'Fit to screen (0)')" @click="resetZoom">{{ t('Όλη', 'Fit') }}</button>
      </div>
      <div class="lb-caption">
        <div>
          <span class="tag" id="lb-cat">{{ photo ? photo.category : '' }}</span>
          <strong id="lb-title">{{ photo ? photo.title : '' }}</strong>
          <span class="lb-meta" id="lb-meta">{{ meta }}</span>
        </div>
        <span class="lb-count" id="lb-count">{{ photo ? (current + 1) + ' / ' + list.length : '' }}</span>
      </div>
    </dialog>
  </SiteLayout>
</template>
