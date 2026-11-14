<script setup>
import { useRoute } from 'vue-router';
import SiteHeader from './SiteHeader.vue';
import SiteFooter from './SiteFooter.vue';
import { useReveal } from '../composables/useReveal.js';
import { MENU, menuItemFor } from '../lib/menus.js';
import { useLang, toEl } from '../lib/lang.js';

defineProps({ credits: Boolean, headerId: String });
const route = useRoute();
const { en, t, href } = useLang();
const here = menuItemFor(toEl(route.path));
const links = MENU.map((l) => ({ href: href(l.href), label: en ? l.labelEn : l.label, current: l.href === here }));
useReveal();
</script>

<template>
  <a class="skip" href="#main">{{ t('Μετάβαση στο περιεχόμενο', 'Skip to content') }}</a>
  <SiteHeader :links="links" :id="headerId" />
  <slot />
  <SiteFooter :credits="credits" />
</template>
