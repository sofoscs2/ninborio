<script setup>
import { ref, reactive, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { useHead } from '@unhead/vue';
import SiteLayout from '../components/SiteLayout.vue';
import WaveEdge from '../components/WaveEdge.vue';
import { GALLERY_NAV, GALLERY_FOOTER } from '../lib/menus.js';
import { setHash } from '../lib/util.js';

useHead({
  title: 'Φωτογραφίες · Νημποριό Εύβοιας',
  meta: [{ name: 'description', content: 'Ο κόλπος του Νημποριού σε φωτογραφίες: η αμμουδιά, η θάλασσα, ο οικισμός και η φύση γύρω του.' }],
  link: [{ rel: 'canonical', href: 'https://nimborio.com/fotografies/' }],
});

/* Photo gallery with a full-screen viewer and zoom. The photos are listed in /assets/data/gallery.json. */
const IMG = '/assets/img/gallery/';
const ALL = 'Όλες';
const photos = ref([]);
const failed = ref(false);
const filter = ref(ALL);

const cats = computed(() => {
  const counts = {};
  photos.value.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1; });
  return [[ALL, photos.value.length], ...Object.entries(counts)];
});
const list = computed(() => photos.value.filter((p) => filter.value === ALL || p.category === filter.value));
const hasPlaceholders = computed(() => photos.value.some((p) => p.placeholder));

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
  return [p.date, p.credit ? '📷 ' + p.credit : '', p.placeholder ? 'προσωρινή φωτογραφία' : '', p.w ? p.w + '×' + p.h : ''].filter(Boolean).join(' · ');
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
    photos.value = data.photos || [];
    openFromHash();
  }).catch(() => { failed.value = true; });
  addEventListener('hashchange', openFromHash);
  addEventListener('resize', onResize);
});
onBeforeUnmount(() => { removeEventListener('hashchange', openFromHash); removeEventListener('resize', onResize); });
</script>

<template>
  <SiteLayout :nav="GALLERY_NAV" :footer="GALLERY_FOOTER">
    <section class="page-hero gallery-hero">
      <div class="wrap">
        <p class="kicker" style="color:var(--sun)">Νημποριό · Νότια Εύβοια</p>
        <h1>Ο κόλπος σε φωτογραφίες</h1>
        <p>Θάλασσα, άμμος και φως από το Νημποριό. Πατήστε μια φωτογραφία για να τη δείτε μεγάλη και να κάνετε ζουμ στις λεπτομέρειες.</p>
      </div>
      <WaveEdge />
    </section>

    <main id="main" class="gallery-page">
      <div class="wrap">
        <p class="demo-note" id="gal-placeholder-note" :hidden="!hasPlaceholders">Προσωρινές φωτογραφίες: θα αντικατασταθούν με πραγματικές φωτογραφίες του κόλπου.</p>
        <div class="gal-toolbar">
          <div class="filters" id="filters" role="group" aria-label="Κατηγορίες">
            <button v-for="([c, n], i) in cats" :key="c" :class="'chip-btn cat-' + (i % 6)" :aria-pressed="String(c === filter)" :data-cat="c" @click="filter = c">{{ c }} <span>{{ n }}</span></button>
          </div>
          <span class="gal-total" id="gal-total">{{ photos.length ? list.length + (list.length === 1 ? ' φωτογραφία' : ' φωτογραφίες') : '' }}</span>
        </div>
        <ul class="masonry" id="masonry" aria-live="polite">
          <li v-if="failed" class="gal-empty">Οι φωτογραφίες δεν φορτώθηκαν. Δοκιμάστε ξανά σε λίγο.</li>
          <li v-for="(p, i) in list" :key="p.file">
            <a class="tile" :href="'#photo-' + p.file" :data-i="i" @click.prevent="open(i)">
              <img :src="IMG + p.file + '-thumb.webp'" :alt="p.title" loading="lazy" :width="p.w || 640" :height="p.h || 480">
              <span class="tile-info"><span class="tag">{{ p.category }}</span><strong>{{ p.title }}</strong></span>
              <span v-if="p.placeholder" class="ph-badge">προσωρινή</span>
              <span class="zoom-hint" aria-hidden="true">⤢</span>
            </a>
          </li>
        </ul>
        <p class="gal-cta">Έχετε ωραίες φωτογραφίες από το Νημποριό; <a href="https://www.facebook.com/Nimborio/" target="_blank" rel="noopener">Στείλτε τες μας στο Facebook</a> και θα τις ανεβάσουμε με το όνομά σας.</p>
      </div>
    </main>

    <!-- full-screen viewer -->
    <dialog class="lightbox" id="lightbox" ref="lb" aria-label="Προβολή φωτογραφίας" @close="onClose" @keydown="onKey">
      <div class="lb-stage" id="lb-stage" ref="stage" :class="{ zoomed: z.s > 1.01 }"
           @wheel.prevent="onWheel" @dblclick="onDbl" @pointerdown="down" @pointermove="move" @pointerup="end" @pointercancel="end">
        <img id="lb-img" ref="img" :alt="photo ? photo.title : ''" draggable="false" :src="photo ? IMG + photo.file + '.webp' : null" :style="imgStyle" @load="loading = false">
        <div class="lb-spinner" id="lb-spinner" aria-hidden="true" :hidden="!loading"></div>
      </div>
      <button class="lb-btn lb-close" id="lb-close" aria-label="Κλείσιμο (Esc)" @click="close">✕</button>
      <button class="lb-btn lb-prev" id="lb-prev" aria-label="Προηγούμενη (←)" :hidden="list.length < 2" @click="open(current - 1)">‹</button>
      <button class="lb-btn lb-next" id="lb-next" aria-label="Επόμενη (→)" :hidden="list.length < 2" @click="open(current + 1)">›</button>
      <div class="lb-tools">
        <button class="lb-btn small" id="lb-zoom-out" aria-label="Σμίκρυνση (−)" @click="zoomAt(z.s / 1.6, 0, 0)">−</button>
        <span id="lb-zoom-level">{{ Math.round(z.s * 100) }}%</span>
        <button class="lb-btn small" id="lb-zoom-in" aria-label="Μεγέθυνση (+)" @click="zoomAt(z.s * 1.6, 0, 0)">+</button>
        <button class="lb-btn small wide" id="lb-zoom-fit" aria-label="Προσαρμογή στην οθόνη (0)" @click="resetZoom">Όλη</button>
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
