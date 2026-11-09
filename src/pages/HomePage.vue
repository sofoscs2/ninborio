<script setup>
import { useHead } from '@unhead/vue';
import SiteLayout from '../components/SiteLayout.vue';
import { SHOW_STAY } from '../lib/options.js';
import HeroBay from '../components/home/HeroBay.vue';
import NewsFeed from '../components/home/NewsFeed.vue';
import NewsReader from '../components/home/NewsReader.vue';
import FireMap from '../components/home/FireMap.vue';
import EmyStation from '../components/home/EmyStation.vue';
import WeatherCard from '../components/home/WeatherCard.vue';

useHead({
  title: 'Νημποριό Εύβοιας · παραλία, νέα, καιρός, πώς θα έρθετε',
  meta: [
    { name: 'description', content: 'Το Νημποριό είναι ένας απάνεμος αμμουδερός κόλπος στη νότια Εύβοια, ανάμεσα σε Στύρα και Μαρμάρι, απέναντι από τον Μαραθώνα. Νέα, καιρός, ' + (SHOW_STAY ? 'διαμονή και φαγητό.' : 'πρόσβαση και τι θα δείτε γύρω.') },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'Νημποριό Εύβοιας' },
    { property: 'og:description', content: 'Απάνεμος αμμουδερός κόλπος στη νότια Εύβοια, απέναντι από τον Μαραθώνα.' },
    { property: 'og:image', content: 'https://nimborio.com/assets/img/og-nimborio.jpg' },
    { property: 'og:url', content: 'https://nimborio.com/' },
  ],
  link: [
    { rel: 'canonical', href: 'https://nimborio.com/' },
    { rel: 'preload', as: 'image', href: '/assets/img/hero/bay-2000.webp', imagesrcset: '/assets/img/hero/bay-1200.webp 1200w, /assets/img/hero/bay-2000.webp 2000w, /assets/img/hero/bay-2800.webp 2800w', imagesizes: '100vw' },
  ],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      name: 'Νημποριό Εύβοιας',
      alternateName: ['Nimborio', 'Nimporio', 'Νημπορειό', 'Νιμπορειό'],
      description: 'Αμμουδερός, απάνεμος κόλπος στη νότια Εύβοια, ανάμεσα σε Στύρα και Μαρμάρι.',
      geo: { '@type': 'GeoCoordinates', latitude: 38.1227, longitude: 24.2122 },
      address: { '@type': 'PostalAddress', addressLocality: 'Νημποριό', addressRegion: 'Εύβοια', addressCountry: 'GR' },
      sameAs: ['https://www.facebook.com/Nimborio/'],
    }),
  }],
});

const PARTS = [
  ['/paralia/', 'f-reef', '🏖️', 'Παραλία', 'Χρυσή άμμος, ρηχά και απάνεμα νερά, ιδανικά για παιδιά.'],
  ['/istoria/', 'f-wind', '📜', 'Ιστορία', 'Από το «Νέο Εμπόριο» στο σημερινό ήσυχο καταφύγιο.'],
  ['/lofos/', 'f-sand', '⛰️', 'Ο λόφος', 'Το αιολικό πάρκο, οι αρχαιότητες του λόφου και τα αιτήματα του Συλλόγου.'],
  ['/gyro1/', 'f-calm', '⛪', 'Γύρω', 'Εξωκλήσια, τα Δρακόσπιτα, Στύρα, Μαρμάρι και Κάρυστος.'],
  ['/prosvasi/', 'f-deep', '⛴️', 'Πρόσβαση', 'Λίγο πάνω από δύο ώρες από το κέντρο της Αθήνας, με αυτοκίνητο και φέρι.'],
].map(([to, tone, icon, title, text]) => ({ to, tone, icon, title, text }));
</script>

<template>
  <SiteLayout credits header-id="top">
    <HeroBay />

    <main id="main">

      <!-- ============ NEWS HUB: Facebook news (main) + fire map + weather ============ -->
      <section class="hub" id="nea">
        <div class="wrap hub-grid">
          <div class="hub-main">
            <div class="news-head">
              <div>
                <p class="kicker">Νέα από το Νημποριό</p>
                <h2>Τι γίνεται στον κόλπο</h2>
              </div>
              <a class="btn btn-fb" href="https://www.facebook.com/Nimborio/" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21z"/></svg>
                Ακολουθήστε μας
              </a>
            </div>
            <NewsFeed />
          </div>

          <aside class="hub-side" id="simera" aria-label="Σήμερα στο Νημποριό">
            <FireMap />
            <EmyStation />
            <WeatherCard />
          </aside>
        </div>
      </section>

      <NewsReader />

      <!-- ============ THE OTHER PAGES ============ -->
      <section class="explore" id="exerevniste">
        <div class="wrap">
          <p class="kicker">Εξερευνήστε</p>
          <h2>Όλα για τον κόλπο</h2>
          <div class="features">
            <RouterLink v-for="p in PARTS" :key="p.to" class="feature" :class="p.tone" :to="p.to">
              <span>{{ p.icon }}</span><h3>{{ p.title }}</h3><p>{{ p.text }}</p><b class="go" aria-hidden="true">→</b>
            </RouterLink>
          </div>
        </div>
      </section>

      <!-- ============ STAY & EAT teaser ============ -->
      <section v-if="SHOW_STAY" class="stay">
        <div class="wrap stay-box">
          <div>
            <p class="kicker">Διαμονή &amp; Φαγητό</p>
            <h2>Πού θα μείνετε, πού θα φάτε</h2>
            <p>Ψαροταβέρνες πάνω στο κύμα, μαγειρευτά, ένα beach bar και καταλύματα μέσα στον κόλπο.</p>
            <RouterLink class="btn btn-sun" to="/diamoni-fagito/">Δείτε όλα τα μέρη</RouterLink>
          </div>
          <ul class="stay-icons" aria-hidden="true"><li>🐟</li><li>🍷</li><li>🏡</li><li>☀️</li></ul>
        </div>
      </section>

    </main>
  </SiteLayout>
</template>
