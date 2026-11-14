<script setup>
// English version of src/pages/HillPage.vue
import SiteLayout from '../../components/SiteLayout.vue';
import WaveEdge from '../../components/WaveEdge.vue';
import { usePage } from '../../composables/usePage.js';

usePage({
  path: '/lofos/',
  en: true,
  title: 'The fight for the hill',
  description: 'The wind farm planned on the hill of Nimborio with its ancient remains, the visit of the Central Archaeological Council in 2021 and what the Residents’ Association asks for.',
});
</script>

<template>
  <SiteLayout>
    <section class="page-hero lofos-hero">
      <div class="wrap">
        <h1>The fight <em>for the hill</em></h1>
      </div>
      <WaveEdge />
    </section>

    <main id="main" class="hs">
      <section class="hs-sec" id="lofos">
        <div class="wrap lofos-text">
          <p>In April 2020 the Greek Regulatory Authority for Energy licensed a large wind farm in the Municipality of Karystos: according to the Association, 66 wind turbines, 24 of them in and around Nimborio. The turbines would stand on the hill with the ancient remains; according to experts, the hill would be levelled and its archaeological wealth would be lost.</p>
          <p>The Central Archaeological Council (KAS) at first approved the project. The Ephorate of Antiquities of Evia, however, had asked years before for the hill to be marked out as an archaeological site, and its request had never been examined. Residents and local bodies also pointed out that the environmental impact study had been made before the great wildfires.</p>
          <p>Residents, archaeologists and associations objected, and the matter reached the Greek Parliament. In October 2021 the KAS postponed its decision, as the Association had asked, so that it could first visit the site. The full Council visited the hill on 26 November 2021.</p>
          <figure class="hs-figure lofos-figure">
            <img src="/assets/img/archive/2020-04-anemogennitries-view6.webp" alt="Aerial photo of the bay with 23 wind turbine positions marked on the peaks around it" width="1600" height="825" loading="lazy">
            <figcaption>The wind turbine positions around the bay, as presented by the Association in 2020.</figcaption>
          </figure>
          <div class="hs-card hs-asks">
            <h3>What the Association asks for</h3>
            <ol>
              <li>That the hill is marked out as an archaeological site at once, with zones of full protection.</li>
              <li>That no works are carried out on the archaeological site of Nimborio or on the Acropolis of Styra.</li>
              <li>That the decline of the monuments of Styra stops, and that the Ministry of Culture restores them and makes them known.</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  </SiteLayout>
</template>
