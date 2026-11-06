<script setup>
import { useHead } from '@unhead/vue';

useHead({ htmlAttrs: { lang: 'el' } });
</script>

<template>
  <!-- each page mounts fresh, like opening a new page on the plain-HTML site -->
  <RouterView :key="$route.path" />
</template>
