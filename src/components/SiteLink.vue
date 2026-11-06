<script setup>
// "#part" stays a plain link on the same page; everything else goes through Vue Router
defineProps({ href: { type: String, required: true }, current: Boolean });
</script>

<template>
  <a v-if="href.startsWith('#')" :href="href" :aria-current="current ? 'page' : null"><slot /></a>
  <RouterLink v-else :to="href" :aria-current="current ? 'page' : null" active-class="" exact-active-class=""><slot /></RouterLink>
</template>
