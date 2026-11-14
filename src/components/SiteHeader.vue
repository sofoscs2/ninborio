<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import SiteLink from './SiteLink.vue';
import { useLang, toEn, toEl } from '../lib/lang.js';

defineProps({ links: { type: Array, required: true }, id: String });
const route = useRoute();
const { en, t, href } = useLang();
// the same page in the other language (keeps the part of the page, e.g. #ds)
const other = computed(() => ({ path: en ? toEl(route.path) : toEn(route.path), hash: route.hash }));
const open = ref(false);
const scrolled = ref(false);
const onScroll = () => { scrolled.value = scrollY > 40; };
onMounted(() => { addEventListener('scroll', onScroll, { passive: true }); onScroll(); });
onBeforeUnmount(() => removeEventListener('scroll', onScroll));
function onNavClick(e) { if (e.target.tagName === 'A') open.value = false; }
</script>

<template>
  <header class="topbar" :class="{ scrolled }" :id="id">
    <RouterLink class="brand" :to="href('/')" :aria-label="t('Νημποριό, αρχική', 'Nimborio, home')" active-class="" exact-active-class="" :aria-current="null">
      <svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="15" r="8" fill="#ffb627"/><path d="M2 26c5-4 9-4 14 0s9 4 14 0 7-3 8-2v14H2z" fill="#14b8b0"/><path d="M2 32c5-4 9-4 14 0s9 4 14 0 7-3 8-2v8H2z" fill="#0a4d7a"/></svg>
      <span>{{ t('Νημποριό', 'Nimborio') }}</span>
    </RouterLink>
    <div class="top-tools">
      <RouterLink class="lang-btn" :to="other" :hreflang="en ? 'el' : 'en'" :lang="en ? 'el' : 'en'"
        :aria-label="en ? 'Ελληνικά' : 'English'" :title="en ? 'Ελληνικά' : 'English'" active-class="" exact-active-class="">{{ en ? 'ΕΛ' : 'EN' }}</RouterLink>
      <button class="menu-btn" :aria-expanded="String(open)" aria-controls="nav" @click="open = !open">{{ t('Μενού', 'Menu') }}</button>
    </div>
    <nav id="nav" class="nav" :class="{ open }" @click="onNavClick">
      <SiteLink v-for="l in links" :key="l.href" :href="l.href" :current="l.current">{{ l.label }}</SiteLink>
    </nav>
  </header>
</template>
