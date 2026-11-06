<script setup>
import { ref, onMounted } from 'vue';
import SiteLink from './SiteLink.vue';

defineProps({ links: { type: Array, required: true }, credits: Boolean });
const year = ref(2026);
onMounted(() => { year.value = new Date().getFullYear(); });
</script>

<template>
  <footer class="footer">
    <svg class="wave-top" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40 C240 0 480 90 720 50 S1200 0 1440 50 V0 H0Z"/></svg>
    <div class="wrap footer-grid">
      <div>
        <p class="f-brand">Νημποριό</p>
        <p>Νότια Εύβοια · 38.1227° Β, 24.2122° Α</p>
      </div>
      <nav aria-label="Υποσέλιδο">
        <SiteLink v-for="l in links" :key="l.href" :href="l.href">{{ l.label }}</SiteLink>
      </nav>
      <div>
        <a class="btn btn-fb small" href="https://www.facebook.com/Nimborio/" target="_blank" rel="noopener">Facebook</a>
        <p v-if="credits" class="tiny">Καιρός: Open-Meteo · Χάρτης: © OpenStreetMap · Κίνδυνος πυρκαγιάς: ΓΓΠΠ</p>
        <p class="tiny">© <span id="year">{{ year }}</span> nimborio.com</p>
      </div>
    </div>
  </footer>
</template>
