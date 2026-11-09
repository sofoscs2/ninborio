<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import SiteHeader from './SiteHeader.vue';
import SiteFooter from './SiteFooter.vue';
import { useReveal } from '../composables/useReveal.js';
import { MENU, menuItemFor } from '../lib/menus.js';

defineProps({ credits: Boolean, headerId: String });
const route = useRoute();
const links = computed(() => {
  const here = menuItemFor(route.path);
  return MENU.map((l) => ({ ...l, current: l.href === here }));
});
useReveal();
</script>

<template>
  <a class="skip" href="#main">Μετάβαση στο περιεχόμενο</a>
  <SiteHeader :links="links" :id="headerId" />
  <slot />
  <SiteFooter :links="MENU" :credits="credits" />
</template>
