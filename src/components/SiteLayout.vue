<script setup>
import SiteHeader from './SiteHeader.vue';
import SiteFooter from './SiteFooter.vue';
import { useReveal } from '../composables/useReveal.js';

defineProps({ nav: { type: Array, required: true }, footer: { type: Array, required: true }, credits: Boolean, headerId: String });
useReveal();
</script>

<template>
  <a class="skip" href="#main">Μετάβαση στο περιεχόμενο</a>
  <SiteHeader :links="nav" :id="headerId" />
  <slot />
  <SiteFooter :links="footer" :credits="credits" />
</template>
