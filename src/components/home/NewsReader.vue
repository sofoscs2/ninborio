<script>
import { ref } from 'vue';

// The news feed opens a post here: openPost(story)
const current = ref(null);
const requests = ref(0);
export function openPost(p) { current.value = p; requests.value++; }
</script>

<script setup>
import { computed, watch, nextTick } from 'vue';
import { linkify, fmtDate } from '../../lib/fbPosts.js';
import { setHash, FB_PAGE } from '../../lib/util.js';
import { useLang } from '../../lib/lang.js';

const { en, t } = useLang();
const SHARE = t('Κοινοποίηση', 'Share');

const reader = ref(null), gallery = ref(null);
const galIndex = ref(0);
const shareLabel = ref(SHARE);
const many = computed(() => !!current.value && current.value.imgs.length > 1);
const text = computed(() => (current.value ? (current.value.body || '').split(/\n{1,}/).filter(Boolean).map((p) => '<p>' + linkify(p) + '</p>').join('') : ''));

watch(requests, async () => {
  galIndex.value = 0;
  await nextTick();
  if (gallery.value) gallery.value.scrollLeft = 0;
  if (!reader.value.open) reader.value.showModal();
  reader.value.scrollTop = 0;
});

function onClose() { if (/^#post-/.test(location.hash)) setHash('#nea'); }
function onBackdrop(e) { if (e.target === reader.value) reader.value.close(); } // click on the dark backdrop
function onGalScroll() {
  const g = gallery.value; if (!g) return;
  galIndex.value = Math.round(g.scrollLeft / (g.clientWidth || 1));
}
const galBy = (dir) => gallery.value.scrollBy({ left: dir * gallery.value.clientWidth });
function share() {
  const url = location.href, title = current.value ? current.value.title : '';
  if (navigator.share) { navigator.share({ title, url }).catch(() => {}); return; }
  (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(() => {
    shareLabel.value = t('Ο σύνδεσμος αντιγράφηκε ✓', 'Link copied ✓');
    setTimeout(() => { shareLabel.value = SHARE; }, 2500);
  }).catch(() => {});
}
</script>

<template>
  <!-- Reader for a single news post (opens inside the site) -->
  <dialog class="reader" id="reader" ref="reader" aria-labelledby="reader-title" @close="onClose" @click="onBackdrop">
    <button class="reader-close" id="reader-close" :aria-label="t('Κλείσιμο', 'Close')" @click="reader.close()">✕</button>
    <div class="reader-media">
      <div class="reader-gallery" id="reader-gallery" ref="gallery" @scroll.passive="onGalScroll">
        <img v-for="u in (current ? current.imgs : [])" :key="u" alt="" :src="u">
      </div>
      <button class="gal-btn prev" id="gal-prev" :aria-label="t('Προηγούμενη φωτογραφία', 'Previous photo')" :hidden="!many" @click="galBy(-1)">‹</button>
      <button class="gal-btn next" id="gal-next" :aria-label="t('Επόμενη φωτογραφία', 'Next photo')" :hidden="!many" @click="galBy(1)">›</button>
      <span class="gal-count" id="gal-count" :hidden="!many">{{ current ? (galIndex + 1) + ' / ' + current.imgs.length : '' }}</span>
    </div>
    <div class="reader-body">
      <time id="reader-date" :datetime="current && current.date ? current.date : null">{{ current ? fmtDate(current.date, en) : '' }}</time>
      <h2 id="reader-title">{{ current ? current.title : '' }}</h2>
      <div class="reader-text" id="reader-text" v-html="text"></div>
      <div class="reader-actions">
        <a class="btn btn-fb" id="reader-fb" target="_blank" rel="noopener" :href="current ? (current.url || FB_PAGE) : null">{{ current && current.type === 'video' ? t('▶ Δείτε το βίντεο στο Facebook', '▶ Watch the video on Facebook') : t('Δείτε στο Facebook', 'See it on Facebook') }}</a>
        <button class="btn btn-ghost-dark" id="reader-share" type="button" @click="share">{{ shareLabel }}</button>
      </div>
    </div>
  </dialog>
</template>
