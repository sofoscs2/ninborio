<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import SiteLink from './SiteLink.vue';

defineProps({ links: { type: Array, required: true }, id: String });
const open = ref(false);
const scrolled = ref(false);
const onScroll = () => { scrolled.value = scrollY > 40; };
onMounted(() => { addEventListener('scroll', onScroll, { passive: true }); onScroll(); });
onBeforeUnmount(() => removeEventListener('scroll', onScroll));
function onNavClick(e) { if (e.target.tagName === 'A') open.value = false; }
</script>

<template>
  <header class="topbar" :class="{ scrolled }" :id="id">
    <RouterLink class="brand" to="/" aria-label="Νημποριό, αρχική" active-class="" exact-active-class="" :aria-current="null">
      <svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="15" r="8" fill="#ffb627"/><path d="M2 26c5-4 9-4 14 0s9 4 14 0 7-3 8-2v14H2z" fill="#14b8b0"/><path d="M2 32c5-4 9-4 14 0s9 4 14 0 7-3 8-2v8H2z" fill="#0a4d7a"/></svg>
      <span>Νημποριό</span>
    </RouterLink>
    <button class="menu-btn" :aria-expanded="String(open)" aria-controls="nav" @click="open = !open">Μενού</button>
    <nav id="nav" class="nav" :class="{ open }" @click="onNavClick">
      <SiteLink v-for="l in links" :key="l.href" :href="l.href" :current="l.current">{{ l.label }}</SiteLink>
    </nav>
  </header>
</template>
