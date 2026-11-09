<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';
import SiteLayout from '../components/SiteLayout.vue';
import WaveEdge from '../components/WaveEdge.vue';
import data from '../data/posts.json';

const route = useRoute(), router = useRouter();
const post = computed(() => data.posts.find((p) => p.slug === route.params.slug));
if (!post.value) router.replace('/enimeroseis/');

useHead(() => post.value && {
  title: post.value.title + ' · Νημποριό Εύβοιας',
  meta: [
    { name: 'description', content: post.value.description },
    { property: 'og:title', content: post.value.title },
    { property: 'og:type', content: 'article' },
    post.value.ogImage && { property: 'og:image', content: post.value.ogImage },
  ].filter(Boolean),
  link: [{ rel: 'canonical', href: `https://nimborio.com/enimeroseis/${post.value.slug}/` }],
});

/* photo viewer for the pictures inside the post */
const prose = ref(null), dlg = ref(null);
const links = ref([]);
const cur = ref(0);
const opened = ref(false); // no photo is loaded until the viewer is first opened
const shot = computed(() => (opened.value && links.value[cur.value]) || null);

function show(i) {
  cur.value = (i + links.value.length) % links.value.length;
  opened.value = true;
  if (!dlg.value.open) dlg.value.showModal();
}
// clicks inside the post text: open photos in the viewer, follow site links without reloading
function onProseClick(e) {
  const a = e.target.closest('a'); if (!a) return;
  const i = links.value.findIndex((l) => l.el === a);
  if (i >= 0) { e.preventDefault(); show(i); return; }
  const href = a.getAttribute('href') || '';
  if (href.startsWith('/') && !href.startsWith('/assets/') && !a.target) { e.preventDefault(); router.push(href); }
}
function onKey(e) {
  if (e.key === 'ArrowRight') show(cur.value + 1);
  else if (e.key === 'ArrowLeft') show(cur.value - 1);
}
let sx = null;
const onDown = (e) => { sx = e.clientX; };
function onUp(e) {
  if (sx === null) return;
  const dx = e.clientX - sx; sx = null;
  if (dx < -60) show(cur.value + 1); else if (dx > 60) show(cur.value - 1);
}
const onBackdrop = (e) => { if (e.target === dlg.value) dlg.value.close(); };

onMounted(() => {
  if (!prose.value) return;
  links.value = [...prose.value.querySelectorAll('a.art-img')].map((el) => ({ el, href: el.href, alt: (el.querySelector('img') || {}).alt || '' }));
});
</script>

<template>
  <SiteLayout v-if="post">
    <section class="page-hero art-hero">
      <div class="wrap">
        <p class="kicker" style="color:var(--sun)"><RouterLink to="/enimeroseis/">Ενημερώσεις</RouterLink> · {{ post.category }}</p>
        <h1>{{ post.title }}</h1>
        <p><time :datetime="post.date">{{ post.dateText }}</time> · Σύλλογος Νημποριού</p>
      </div>
      <WaveEdge />
    </section>
    <main id="main" class="article">
      <article class="wrap prose" ref="prose" v-html="post.body" @click="onProseClick"></article>
      <nav class="wrap art-nav" aria-label="Άλλες ενημερώσεις">
        <RouterLink v-if="post.prev" class="prev" :to="'/enimeroseis/' + post.prev.slug + '/'"><span>← Νεότερη</span>{{ post.prev.title }}</RouterLink>
        <span v-else></span>
        <RouterLink v-if="post.next" class="next" :to="'/enimeroseis/' + post.next.slug + '/'"><span>Παλαιότερη →</span>{{ post.next.title }}</RouterLink>
        <span v-else></span>
      </nav>
    </main>
    <dialog class="art-viewer" id="art-viewer" ref="dlg" aria-label="Φωτογραφία" @click="onBackdrop" @keydown="onKey" @pointerdown="onDown" @pointerup="onUp">
      <button class="lb-btn lb-close" id="av-close" aria-label="Κλείσιμο" @click="dlg.close()">✕</button>
      <button class="lb-btn lb-prev" id="av-prev" aria-label="Προηγούμενη" :hidden="links.length < 2" @click="show(cur - 1)">‹</button>
      <img id="av-img" :src="shot ? shot.href : null" :alt="shot ? shot.alt : ''">
      <button class="lb-btn lb-next" id="av-next" aria-label="Επόμενη" :hidden="links.length < 2" @click="show(cur + 1)">›</button>
      <p class="av-count" id="av-count">{{ links.length > 1 ? (cur + 1) + ' / ' + links.length : '' }}</p>
    </dialog>
  </SiteLayout>
</template>
