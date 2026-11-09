<script setup>
import SiteLayout from '../components/SiteLayout.vue';
import WaveEdge from '../components/WaveEdge.vue';
import { usePage } from '../composables/usePage.js';

usePage({
  path: '/gyro/',
  title: 'Γύρω από τον κόλπο',
  description: 'Τι θα δείτε γύρω από το Νημποριό Εύβοιας: εξωκλήσια, τα Δρακόσπιτα των Στύρων, Νέα Στύρα, Μαρμάρι και Κάρυστος.',
});

const PLACES = [
  ['/assets/img/crops/village.webp', 900, 600, 'εδώ', 'Τα εξωκλήσια', 'Προφήτης Ηλίας, Άγιος Προκόπιος και Άγιος Ιωάννης. Ωραίες βόλτες με θέα στον κόλπο, ιδίως το απόγευμα.'],
  ['/assets/img/crops/coast.webp', 900, 600, 'ΒΑ', 'Νέα Στύρα', 'Το λιμάνι με το πλοίο από την Αγία Μαρίνα. Μαγαζιά, σούπερ μάρκετ και φαρμακείο, το πιο κοντινό μεγάλο χωριό.'],
  ['/assets/img/placeholder/map-day-1800.webp', 1800, 753, 'ΒΑ', 'Δρακόσπιτα Στύρων', 'Τρία μυστηριώδη κτίσματα από τεράστιες πέτρες, χωρίς συνδετικό υλικό. Λίγο περπάτημα στην ανηφόρα μετά τον χωματόδρομο.'],
  ['/assets/img/crops/coves.webp', 900, 600, 'ΒΑ', 'Στύρα & Κάστρο των Αρμένων', 'Ορεινό χωριό με πλατεία και θέα στα νησάκια. Πιο ψηλά, τα ερείπια ενός μεσαιωνικού κάστρου.'],
  ['/assets/img/crops/bay.webp', 900, 600, 'ΝΑ', 'Μαρμάρι', 'Λιμάνι με πλοία για τη Ραφήνα, ταβέρνες στο κύμα και μια όμορφη παραλιακή.'],
  ['/assets/img/crops/beach.webp', 900, 600, 'ΝΑ', 'Κάρυστος & Όχη', 'Η πρωτεύουσα του δήμου, με το μεσαιωνικό Κόκκινο Κάστρο από πάνω της. Ψηλότερα, στην Όχη, στέκει το πιο φημισμένο από τα Δρακόσπιτα.'],
].map(([src, w, h, dir, title, text]) => ({ src, w, h, dir, title, text }));
</script>

<template>
  <SiteLayout>
    <section class="page-hero gyro-hero">
      <div class="wrap">
        <p class="kicker">Γύρω από τον κόλπο</p>
        <h1>Εξωκλήσια, Δρακόσπιτα και λιμάνια</h1>
        <p>Βόλτες και εκδρομές λίγα χιλιόμετρα από το Νημποριό, προς τα Στύρα στα βόρεια και την Κάρυστο στα νότια.</p>
      </div>
      <WaveEdge />
    </section>

    <main id="main">
      <section class="around" id="gyro">
        <div class="wrap">
          <div class="places">
            <article v-for="p in PLACES" :key="p.title" class="place">
              <img :src="p.src" alt="" loading="lazy" :width="p.w" :height="p.h">
              <div><span class="dir">{{ p.dir }}</span><h3>{{ p.title }}</h3><p>{{ p.text }}</p></div>
            </article>
          </div>
          <p class="more-wrap"><RouterLink class="btn btn-sun" to="/fotografies/">📷 Δείτε όλες τις φωτογραφίες</RouterLink></p>
        </div>
      </section>
    </main>
  </SiteLayout>
</template>
