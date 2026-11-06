<script setup>
import { ref, computed } from 'vue';
import { useHead } from '@unhead/vue';
import SiteLayout from '../components/SiteLayout.vue';
import WaveEdge from '../components/WaveEdge.vue';
import { subNav, SUB_FOOTER } from '../lib/menus.js';
import data from '../data/posts.json';

useHead({
  title: 'Ενημερώσεις του Συλλόγου · Νημποριό Εύβοιας',
  meta: [{ name: 'description', content: 'Ανακοινώσεις, δράσεις και αγώνες του Συλλόγου Οικιστών Νημποριού Εύβοιας.' }],
  link: [{ rel: 'canonical', href: 'https://nimborio.com/enimeroseis/' }],
});

const posts = data.posts;
// category buttons in the order they first appear, with their counts
const cats = computed(() => {
  const counts = {};
  posts.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1; });
  return Object.entries(counts);
});
const cat = ref('');
const shownPosts = computed(() => posts.map((p) => ({ ...p, show: !cat.value || p.category === cat.value })));
const firstShown = computed(() => shownPosts.value.find((p) => p.show));
</script>

<template>
  <SiteLayout :nav="subNav('/enimeroseis/')" :footer="SUB_FOOTER">
    <section class="page-hero archive-hero">
      <div class="wrap">
        <p class="kicker" style="color:var(--sun)">{{ data.kicker }}</p>
        <h1>Ενημερώσεις</h1>
        <p>Οι ανακοινώσεις, οι δράσεις και οι αγώνες του Συλλόγου, όπως δημοσιεύτηκαν στο παλιό nimborio.com. Τα πιο πρόσφατα νέα είναι <RouterLink to="/#nea" style="color:#fff">στην αρχική σελίδα</RouterLink>.</p>
      </div>
      <WaveEdge />
    </section>
    <main id="main">
      <section class="wrap archive">
        <div class="gal-toolbar">
          <div class="filters" id="arch-filters" role="group" aria-label="Κατηγορίες">
            <button class="chip-btn cat-0" :aria-pressed="String(cat === '')" data-cat="" @click="cat = ''">Όλες <span>{{ posts.length }}</span></button>
            <button v-for="([c, n], i) in cats" :key="c" :class="'chip-btn cat-' + ((i % 5) + 1)" :aria-pressed="String(cat === c)" :data-cat="c" @click="cat = c">{{ c }} <span>{{ n }}</span></button>
          </div>
        </div>
        <div class="fb-feed archive-list" id="arch-list">
          <article v-for="p in shownPosts" :key="p.slug" class="story" :class="{ featured: p === firstShown }" :data-cat="p.category" :hidden="!p.show">
            <div class="pic"><img v-if="p.thumb" :src="p.thumb.src" alt="" loading="lazy" :width="p.thumb.w" :height="p.thumb.h"></div>
            <div class="txt">
              <div class="meta"><span class="tag">{{ p.category }}</span><time :datetime="p.date">{{ p.dateText }}</time></div>
              <h3><RouterLink :to="'/enimeroseis/' + p.slug + '/'">{{ p.title }}</RouterLink></h3>
              <p>{{ p.excerpt }}</p>
              <span class="readmore">Διαβάστε →</span>
            </div>
          </article>
        </div>
      </section>
    </main>
  </SiteLayout>
</template>
