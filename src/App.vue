<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { isEn } from './lib/lang.js';

const route = useRoute();
useHead({ htmlAttrs: { lang: computed(() => (isEn(route.path) ? 'en' : 'el')) } });
</script>

<template>
  <!-- each page mounts fresh, like opening a new page on the plain-HTML site -->
  <RouterView :key="$route.path" />
</template>
