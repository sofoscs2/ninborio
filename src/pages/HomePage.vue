<script setup>
import { useHead } from '@unhead/vue';
import SiteLayout from '../components/SiteLayout.vue';
import HeroBay from '../components/home/HeroBay.vue';
import NewsFeed from '../components/home/NewsFeed.vue';
import NewsReader from '../components/home/NewsReader.vue';
import FireMap from '../components/home/FireMap.vue';
import EmyStation from '../components/home/EmyStation.vue';
import WeatherCard from '../components/home/WeatherCard.vue';
import { HOME_NAV, HOME_FOOTER } from '../lib/menus.js';

useHead({
  title: 'Νημποριό Εύβοιας · παραλία, νέα, καιρός, πώς θα έρθετε',
  meta: [
    { name: 'description', content: 'Το Νημποριό είναι ένας απάνεμος αμμουδερός κόλπος στη νότια Εύβοια, ανάμεσα σε Στύρα και Μαρμάρι, απέναντι από τον Μαραθώνα. Νέα, καιρός, διαμονή και φαγητό.' },
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

const PLACES = [
  ['village.webp', 900, 600, 'εδώ', 'Τα εξωκλήσια', 'Προφήτης Ηλίας, Άγιος Προκόπιος και Άγιος Ιωάννης. Ωραίες βόλτες με θέα στον κόλπο, ιδίως το απόγευμα.'],
  ['coast.webp', 900, 600, 'ΒΑ', 'Νέα Στύρα', 'Το λιμάνι με το πλοίο από την Αγία Μαρίνα. Μαγαζιά, σούπερ μάρκετ και φαρμακείο, το πιο κοντινό μεγάλο χωριό.'],
  ['../placeholder/map-day-1800.webp', 1800, 753, 'ΒΑ', 'Δρακόσπιτα Στύρων', 'Τρία μυστηριώδη κτίσματα από τεράστιες πέτρες, χωρίς συνδετικό υλικό. Λίγο περπάτημα στην ανηφόρα μετά τον χωματόδρομο.'],
  ['coves.webp', 900, 600, 'ΒΑ', 'Στύρα & Κάστρο των Αρμένων', 'Ορεινό χωριό με πλατεία και θέα στα νησάκια. Πιο ψηλά, τα ερείπια ενός μεσαιωνικού κάστρου.'],
  ['bay.webp', 900, 600, 'ΝΑ', 'Μαρμάρι', 'Λιμάνι με πλοία για τη Ραφήνα, ταβέρνες στο κύμα και μια όμορφη παραλιακή.'],
  ['beach.webp', 900, 600, 'ΝΑ', 'Κάρυστος & Όχη', 'Η έδρα του δήμου με το Κόκκινο Κάστρο. Από πάνω η Όχη και το πιο γνωστό Δρακόσπιτο της Εύβοιας.'],
].map(([img, w, h, dir, title, text]) => ({ src: img.startsWith('..') ? '/assets/img/placeholder/map-day-1800.webp' : '/assets/img/crops/' + img, w, h, dir, title, text }));
</script>

<template>
  <SiteLayout :nav="HOME_NAV" :footer="HOME_FOOTER" credits header-id="top">
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

      <!-- ============ BEACH ============ -->
      <section class="beach" id="paralia">
        <div class="wrap">
          <p class="kicker">Η παραλία</p>
          <h2>Χρυσή άμμος, γαλάζια νερά, <em>λίγος αέρας</em></h2>
          <p class="intro">Ο όρμος κοιτάζει δυτικά, προς την Αττική, και οι λόφοι γύρω του κόβουν το μελτέμι. Γι' αυτό το μπάνιο εδώ μένει ήρεμο ακόμη και τις μέρες που φυσάει στον υπόλοιπο κόλπο.</p>
          <div class="features">
            <article class="feature f-sand"><span>🏖️</span><h3>Αμμουδιά για όλους</h3><p>Μαλακή άμμος και ρηχά νερά στην αρχή. Ιδανική για μικρά παιδιά, κουβαδάκια και κάστρα.</p></article>
            <article class="feature f-wind"><span>🍃</span><h3>Απάνεμος όρμος</h3><p>Οι χαμηλοί λόφοι γύρω από τον κόλπο τον κάνουν από τους πιο προστατευμένους της νότιας Εύβοιας.</p></article>
            <article class="feature f-reef"><span>🤿</span><h3>Βυθός για μάσκα</h3><p>Τα νερά περνούν από τιρκουάζ σε βαθύ μπλε. Βράχια στις άκρες, ψαράκια, αχινοί και ανεμώνες.</p></article>
            <article class="feature f-calm"><span>🌿</span><h3>Χωρίς πολυκοσμία</h3><p>Λίγες ταβέρνες, λίγα σπίτια, κανένα μεγάλο ξενοδοχείο. Το μέρος κρατά τον ήσυχο χαρακτήρα του.</p></article>
          </div>
        </div>
      </section>

      <!-- ============ HISTORY ============ -->
      <section class="history" id="istoria">
        <div class="wrap">
          <p class="kicker">Λίγη ιστορία</p>
          <h2>Από «Νέο Εμπόριο» σε καλοκαιρινό καταφύγιο</h2>
          <ol class="timeline">
            <li><span class="era">Αρχαιότητα</span><h3>Η πέτρα του λόφου</h3><p>Στον λόφο βόρεια του όρμου σώζεται ένα παλιό, ανενεργό λατομείο. Η νότια Εύβοια δούλευε την πέτρα της από πολύ νωρίς.</p></li>
            <li><span class="era">Βυζάντιο</span><h3>Πώς πήρε το όνομα</h3><p>Η παράδοση λέει ότι το όνομα βγαίνει από το «Νέο Εμπόριο»: ένα μικρό λιμάνι, ένα σημείο για συναλλαγές.</p></li>
            <li><span class="era">Έως το 1950</span><h3>Περιβόλια και ψαράδες</h3><p>Λίγα πέτρινα καλύβια, περιβόλια κοντά στη θάλασσα και ένα μονοπάτι από τα Κάψαλα που κατέβαινε ως την ακτή, δίπλα στο νερό της πηγής.</p></li>
            <li><span class="era">1960s</span><h3>Οι πρώτοι επισκέπτες</h3><p>Αθηναίοι φυσιολάτρες στήνουν σκηνές στην αμμουδιά. Κρασί του τόπου, ψάρι στα κάρβουνα και νερό από το πηγάδι.</p></li>
            <li><span class="era">Αργότερα</span><h3>Ο Σύλλογος των οικιστών</h3><p>Με πρωτοβουλία του Συλλόγου έρχονται ρεύμα, τηλέφωνο, νερό από γεώτρηση και καλύτερος δρόμος. Στο προαύλιο του Προφήτη Ηλία γίνονται χοροί και εκθέσεις.</p></li>
            <li><span class="era">Σήμερα</span><h3>Ήσυχο, όπως πάντα</h3><p>Λίγες δεκάδες μόνιμοι κάτοικοι τον χειμώνα, πολλοί περισσότεροι το καλοκαίρι. Ανήκει στον Δήμο Καρύστου.</p></li>
          </ol>
        </div>
      </section>

      <!-- ============ AROUND ============ -->
      <section class="around" id="gyro">
        <div class="wrap">
          <p class="kicker">Γύρω από τον κόλπο</p>
          <h2>Εξωκλήσια, Δρακόσπιτα και λιμάνια</h2>
          <div class="places">
            <article v-for="p in PLACES" :key="p.title" class="place">
              <img :src="p.src" alt="" loading="lazy" :width="p.w" :height="p.h">
              <div><span class="dir">{{ p.dir }}</span><h3>{{ p.title }}</h3><p>{{ p.text }}</p></div>
            </article>
          </div>
          <p class="more-wrap"><RouterLink class="btn btn-sun" to="/fotografies/">📷 Δείτε όλες τις φωτογραφίες</RouterLink></p>
        </div>
      </section>

      <!-- ============ ACCESS ============ -->
      <section class="access" id="prosvasi">
        <div class="wrap">
          <p class="kicker">Περίπου 2 ώρες από την Αθήνα</p>
          <h2>Πώς θα έρθετε</h2>
          <ol class="route">
            <li><span class="step-ico">🚗</span><span class="step-tag">Οδικώς</span><h3>Αθήνα → Αγία Μαρίνα</h3><p>Προς Μαραθώνα και το λιμάνι της Αγίας Μαρίνας.</p></li>
            <li><span class="step-ico">⛴️</span><span class="step-tag">Πλοίο · 45′</span><h3>Αγία Μαρίνα → Νέα Στύρα</h3><p>Συχνά δρομολόγια όλη τη μέρα.</p></li>
            <li><span class="step-ico">🛣️</span><span class="step-tag">Οδικώς</span><h3>Νέα Στύρα → Κάψαλα</h3><p>Νότια, και μετά η κατηφόρα προς τον όρμο.</p></li>
            <li><span class="step-ico">🏖️</span><span class="step-tag">Φτάσατε</span><h3>Νημποριό</h3><p>Παρκάρετε, βγάλτε τα παπούτσια.</p></li>
          </ol>
          <div class="alt-routes">
            <p><strong>Από Ραφήνα:</strong> πλοίο για Μαρμάρι και μετά βόρεια, οδικώς, ως τον κόλπο.</p>
            <p><strong>Χωρίς πλοίο:</strong> από τη γέφυρα της Χαλκίδας, μέσω κεντρικής Εύβοιας. Πολύ μεγαλύτερη διαδρομή.</p>
            <p><strong>Δρομολόγια:</strong> ελέγξτε πριν ξεκινήσετε στο <a href="https://www.neastyraferries.gr/" target="_blank" rel="noopener">neastyraferries.gr</a>.</p>
          </div>
          <div class="map-embed">
            <iframe title="Χάρτης: Νημποριό Εύβοιας" loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=24.180%2C38.105%2C24.245%2C38.140&amp;layer=mapnik&amp;marker=38.1227%2C24.2122"></iframe>
          </div>
        </div>
      </section>

      <!-- ============ STAY & EAT teaser ============ -->
      <section class="stay">
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

      <!-- ============ FAQ ============ -->
      <section class="faq" id="erotiseis">
        <div class="wrap">
          <p class="kicker">Συχνές ερωτήσεις</p>
          <h2>Πριν ξεκινήσετε</h2>
          <details><summary>Πώς πάω στο Νημποριό από την Αθήνα;</summary><p>Οδικώς ως την Αγία Μαρίνα (Μαραθώνας), πλοίο περίπου 45 λεπτών για Νέα Στύρα και από εκεί νότια μέσω Κάψαλα. Συνολικά γύρω στις δύο ώρες.</p></details>
          <details><summary>Είναι κατάλληλη η παραλία για παιδιά;</summary><p>Ναι. Είναι αμμουδερή, ρηχή στην αρχή και προστατευμένη από τον αέρα.</p></details>
          <details><summary>Φυσάει το μελτέμι;</summary><p>Ο όρμος προστατεύεται από τους λόφους, οπότε συνήθως φυσάει πολύ λιγότερο από τις γύρω παραλίες.</p></details>
          <details><summary>Υπάρχουν μαγαζιά στον κόλπο;</summary><p>Λίγες ταβέρνες και ένα beach bar, κυρίως το καλοκαίρι. Για ψώνια, τα Νέα Στύρα είναι κοντά.</p></details>
          <details><summary>Πώς γράφεται σωστά;</summary><p>Θα το βρείτε ως Νημποριό, Νημπορειό, Νιμπορειό, Nimborio ή Nimporio. Όλα είναι ο ίδιος κόλπος της Εύβοιας, όχι το Εμπορειό της Σύμης ή της Χάλκης.</p></details>
        </div>
      </section>

    </main>
  </SiteLayout>
</template>
