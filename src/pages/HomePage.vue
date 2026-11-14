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
import { useLang } from '../lib/lang.js';
import { langLinks } from '../composables/usePage.js';

const { en, t, href } = useLang();
useHead({
  title: t('Νημποριό Εύβοιας · παραλία, νέα, καιρός, πώς θα έρθετε', 'Nimborio, Evia · beach, news, weather, how to get here'),
  meta: [
    { name: 'description', content: en
      ? 'Nimborio is a sheltered sandy bay in south Evia, Greece, between Styra and Marmari, across the sea from Marathon. News, weather, ' + (SHOW_STAY ? 'places to stay and eat.' : 'how to get here and what to see around.')
      : 'Το Νημποριό είναι ένας απάνεμος αμμουδερός κόλπος στη νότια Εύβοια, ανάμεσα σε Στύρα και Μαρμάρι, απέναντι από τον Μαραθώνα. Νέα, καιρός, ' + (SHOW_STAY ? 'διαμονή και φαγητό.' : 'πρόσβαση και τι θα δείτε γύρω.') },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: t('Νημποριό Εύβοιας', 'Nimborio, Evia') },
    { property: 'og:description', content: t('Απάνεμος αμμουδερός κόλπος στη νότια Εύβοια, απέναντι από τον Μαραθώνα.', 'A sheltered sandy bay in south Evia, Greece, across the sea from Marathon.') },
    { property: 'og:image', content: 'https://nimborio.com/assets/img/og-nimborio.jpg' },
    { property: 'og:url', content: 'https://nimborio.com' + href('/') },
    { property: 'og:locale', content: en ? 'en_GB' : 'el_GR' },
  ],
  link: [
    { rel: 'canonical', href: 'https://nimborio.com' + href('/') },
    ...langLinks('/'),
    { rel: 'preload', as: 'image', href: '/assets/img/hero/bay-2000.webp', imagesrcset: '/assets/img/hero/bay-1200.webp 1200w, /assets/img/hero/bay-2000.webp 2000w, /assets/img/hero/bay-2800.webp 2800w', imagesizes: '100vw' },
  ],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      name: t('Νημποριό Εύβοιας', 'Nimborio, Evia'),
      alternateName: ['Nimborio', 'Nimporio', 'Νημποριό', 'Νημπορειό', 'Νιμπορειό'],
      description: t('Αμμουδερός, απάνεμος κόλπος στη νότια Εύβοια, ανάμεσα σε Στύρα και Μαρμάρι.', 'A sandy, sheltered bay in south Evia, Greece, between Styra and Marmari.'),
      geo: { '@type': 'GeoCoordinates', latitude: 38.1227, longitude: 24.2122 },
      address: { '@type': 'PostalAddress', addressLocality: t('Νημποριό', 'Nimborio'), addressRegion: t('Εύβοια', 'Evia'), addressCountry: 'GR' },
      sameAs: ['https://www.facebook.com/Nimborio/'],
    }),
  }],
});

const PARTS = (en ? [
  ['/paralia/', 'f-reef', '🏖️', 'Beach', 'Golden sand and shallow, sheltered water, perfect for children.'],
  ['/istoria/', 'f-wind', '📜', 'History', 'From the “New Market” of Byzantine times to today’s quiet retreat.'],
  ['/lofos/', 'f-sand', '⛰️', 'The hill', 'The wind farm, the ancient remains on the hill and what the Association asks for.'],
  ['/gyro1/', 'f-calm', '⛪', 'Around', 'Chapels, the Dragon Houses, Styra, Marmari and Karystos.'],
  ['/prosvasi/', 'f-deep', '⛴️', 'Getting here', 'A little over two hours from central Athens, by car and ferry.'],
] : [
  ['/paralia/', 'f-reef', '🏖️', 'Παραλία', 'Χρυσή άμμος, ρηχά και απάνεμα νερά, ιδανικά για παιδιά.'],
  ['/istoria/', 'f-wind', '📜', 'Ιστορία', 'Από το «Νέο Εμπόριο» στο σημερινό ήσυχο καταφύγιο.'],
  ['/lofos/', 'f-sand', '⛰️', 'Ο λόφος', 'Το αιολικό πάρκο, οι αρχαιότητες του λόφου και τα αιτήματα του Συλλόγου.'],
  ['/gyro1/', 'f-calm', '⛪', 'Γύρω', 'Εξωκλήσια, τα Δρακόσπιτα, Στύρα, Μαρμάρι και Κάρυστος.'],
  ['/prosvasi/', 'f-deep', '⛴️', 'Πρόσβαση', 'Λίγο πάνω από δύο ώρες από το κέντρο της Αθήνας, με αυτοκίνητο και φέρι.'],
]).map(([to, tone, icon, title, text]) => ({ to: href(to), tone, icon, title, text }));
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
                <p class="kicker">{{ t('Νέα από το Νημποριό', 'News from Nimborio') }}</p>
                <h2>{{ t('Τι γίνεται στον κόλπο', 'What’s happening in the bay') }}</h2>
              </div>
              <a class="btn btn-fb" href="https://www.facebook.com/Nimborio/" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21z"/></svg>
                {{ t('Ακολουθήστε μας', 'Follow us') }}
              </a>
            </div>
            <NewsFeed />
          </div>

          <aside class="hub-side" id="simera" :aria-label="t('Σήμερα στο Νημποριό', 'Today in Nimborio')">
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
          <p class="kicker">{{ t('Εξερευνήστε', 'Explore') }}</p>
          <h2>{{ t('Όλα για τον κόλπο', 'All about the bay') }}</h2>
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
