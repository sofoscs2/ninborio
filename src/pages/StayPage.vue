<script setup>
import { useHead } from '@unhead/vue';
import SiteLayout from '../components/SiteLayout.vue';
import WaveEdge from '../components/WaveEdge.vue';

useHead({
  title: 'Διαμονή & Φαγητό · Νημποριό Εύβοιας',
  meta: [{ name: 'description', content: 'Ταβέρνες, beach bar και καταλύματα μέσα στον κόλπο του Νημποριού, στη νότια Εύβοια.' }],
  link: [{ rel: 'canonical', href: 'https://nimborio.com/diamoni-fagito/' }],
});

const map = (q) => 'https://www.google.com/maps/search/?api=1&query=' + q;
const FOOD = [
  ['Ψαροταβέρνα', 'Χρυσή Ακτή', 'Πάνω στο κύμα, με θέα όλο τον κόλπο. Φρέσκο ψάρι και θαλασσινά.', 'Χρυσή+Ακτή+Νημποριό+Εύβοια'],
  ['Ταβέρνα', 'Ο Βασίλης', 'Κρεατικά και σπιτικά μαγειρευτά. Έχει και studios από πάνω.', 'Ταβέρνα+Βασίλης+Νημποριό+Εύβοια'],
  ['Ταβέρνα', 'Οι Ελιές', 'Μικρό μενού με μαγειρευτά της ημέρας. Ψάρι κατόπιν συνεννόησης.', 'Ταβέρνα+Ελιές+Νημποριό+Εύβοια'],
  ['Beach bar', 'Η καντίνα της παραλίας', 'Ξαπλώστρες, καφές, ποτό και κάτι γρήγορο, κυρίως το καλοκαίρι.', 'Νημποριό+Εύβοια+παραλία'],
];
const ROOMS = [
  ['Σπίτια δίπλα στη θάλασσα', 'Sea Reflections Nimborio', 'Ανεξάρτητα, καινούργια σπίτια πάνω στο κύμα.', 'Sea+Reflections+Nimborio'],
  ['Βίλες με πισίνα', 'Idylle Villas', 'Ιδιωτικές βίλες με πισίνα και θέα στον κόλπο, για μεγάλες παρέες.', 'Idylle+Villas+Nimborio'],
  ['Διαμερίσματα', 'Victoria Boutique Apartments', 'Προσεγμένα διαμερίσματα μέσα στον οικισμό.', 'Victoria+Boutique+Apartments+Nimborio'],
  ['Διαμερίσματα', 'Asteria Apartments', 'Άνετα διαμερίσματα κοντά στην παραλία.', 'Asteria+Apartments+Nimborio'],
  ['Studios', 'Vasilis Studios', 'Απλά δωμάτια πάνω από την ταβέρνα «Ο Βασίλης».', 'Vasilis+Studios+Nimborio'],
];
</script>

<template>
  <SiteLayout>
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker" style="color:var(--sun)">Νημποριό · Νότια Εύβοια</p>
        <h1>Πού θα μείνετε, πού θα φάτε</h1>
        <p>Ό,τι λειτουργεί μέσα στον κόλπο: ταβέρνες, ένα beach bar και καταλύματα κοντά στη θάλασσα. Πατήστε «Χάρτης» για τη θέση, τις ώρες και το τηλέφωνο.</p>
      </div>
      <WaveEdge />
    </section>

    <main id="main">
      <section class="food" id="fagito" style="padding-top:40px">
        <div class="wrap">
          <p class="kicker">Φαγητό</p>
          <h2>Ταβέρνες &amp; beach bar</h2>
          <div class="biz-grid">
            <article v-for="[type, name, text, q] in FOOD" :key="name" class="biz">
              <span class="type">{{ type }}</span><h3>{{ name }}</h3><p>{{ text }} <span class="todo">[δική σας περιγραφή]</span></p>
              <div class="links"><a :href="map(q)" target="_blank" rel="noopener">Χάρτης</a></div>
            </article>
          </div>
        </div>
      </section>

      <section class="rooms" id="diamoni" style="padding-top:0">
        <div class="wrap">
          <p class="kicker">Διαμονή</p>
          <h2>Μέσα στον κόλπο</h2>
          <div class="biz-grid">
            <article v-for="[type, name, text, q] in ROOMS" :key="name" class="biz">
              <span class="type">{{ type }}</span><h3>{{ name }}</h3><p>{{ text }} <span class="todo">[δική σας περιγραφή]</span></p>
              <div class="links"><a :href="map(q)" target="_blank" rel="noopener">Χάρτης</a></div>
            </article>
          </div>
          <p class="intro">Υπάρχουν και άλλα μικρότερα καταλύματα και σπίτια μέσω Airbnb και Booking. Οι τιμές και οι ώρες αλλάζουν, γι' αυτό επιβεβαιώστε πριν την επίσκεψη.</p>
          <p>Έχετε επιχείρηση στον κόλπο; <a href="https://www.facebook.com/Nimborio/" target="_blank" rel="noopener">Στείλτε μας μήνυμα στο Facebook</a>.</p>
        </div>
      </section>
    </main>
  </SiteLayout>
</template>
