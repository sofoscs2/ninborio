<script setup>
// English version of src/pages/UsefulPage.vue
import SiteLayout from '../../components/SiteLayout.vue';
import WaveEdge from '../../components/WaveEdge.vue';
import { usePage } from '../../composables/usePage.js';

usePage({
  path: '/xrisima/',
  en: true,
  title: 'Useful information',
  fullTitle: 'Useful information & phone numbers · Nimborio, Evia',
  description: 'Emergency numbers, the Municipality of Karystos, port authorities, hospital and fire service for Nimborio, Evia.',
});

const SOS = [
  ['112', 'European emergency number', 'Free, from any mobile phone, even without a SIM card. Answered in English.'],
  ['199', 'Fire service', 'Fire, rescue'],
  ['166', 'Ambulance (EKAV)', ''],
  ['100', 'Police', ''],
  ['108', 'Coast Guard', 'Emergencies at sea'],
];
const PHONES = [
  ['Karystos Port Authority', '+302224022227', '+30 22240 22227'],
  ['Styra Port Authority', '+302224041266', '+30 22240 41266'],
  ['Karystos Hospital', '+302224350100', '+30 22243 50100'],
  ['Karystos Fire Service', '+302224026195', '+30 22240 26195'],
];
</script>

<template>
  <SiteLayout>
    <section class="page-hero xr-hero">
      <div class="wrap">
        <p class="kicker" style="color:#fff3c4">Nimborio · South Evia</p>
        <h1>Useful information</h1>
        <p>Phone numbers for emergencies and for the local services. Tap a number on your phone to call it.</p>
      </div>
      <WaveEdge />
    </section>

    <main id="main">
      <section class="wrap" style="padding:36px 0 10px">
        <p class="kicker">Emergencies</p>
        <h2>These <em>first</em></h2>
        <ul class="phones sos">
          <li v-for="[num, name, note] in SOS" :key="num"><a class="big" :href="'tel:' + num">{{ num }}</a><strong>{{ name }}</strong><small v-if="note">{{ note }}</small></li>
        </ul>
        <p>In summer, see <RouterLink to="/en/#simera">today’s fire risk map</RouterLink> on the home page.</p>
      </section>

      <section class="wrap" style="padding:30px 0 40px">
        <p class="kicker">Local services</p>
        <h2>Useful <em>numbers</em></h2>
        <ul class="phones">
          <li><strong>General Secretariat for Civil Protection</strong><span class="big">213510931</span><small><span class="todo">[check the number: it has 9 digits]</span> · <a href="https://civilprotection.gov.gr/" target="_blank" rel="noopener">civilprotection.gov.gr</a></small></li>
          <li><strong>Municipality of Karystos</strong><a class="big" href="tel:+302224350001">+30 22243 50001</a><small><a href="http://www.dimoskarystou.gr" target="_blank" rel="noopener">dimoskarystou.gr</a> (in Greek)</small></li>
          <li v-for="[name, tel, shown] in PHONES" :key="tel"><strong>{{ name }}</strong><a class="big" :href="'tel:' + tel">{{ shown }}</a></li>
        </ul>
        <p class="intro">Is a number missing or out of date? <a href="https://m.me/Nimborio" target="_blank" rel="noopener">Send us a message</a>.</p>
      </section>
    </main>
  </SiteLayout>
</template>
