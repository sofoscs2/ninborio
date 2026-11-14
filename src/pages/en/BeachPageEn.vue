<script setup>
// English version of src/pages/BeachPage.vue: same layout, English text
import SiteLayout from '../../components/SiteLayout.vue';
import WaveEdge from '../../components/WaveEdge.vue';
import { usePage } from '../../composables/usePage.js';

usePage({
  path: '/paralia/',
  en: true,
  title: 'The beach',
  description: 'The beach of Nimborio in south Evia, Greece: a sheltered bay with sand all the way along, shallow water for children, sea anemones and fish, fresh-water springs in the sea and a hidden beach at the end of a path.',
  image: '/assets/img/gallery/o-kolpos.webp',
});

const CHAPTERS = [
  ['ormos', 'The bay'], ['giati', 'Six reasons'], ['vythos', 'Under the water'], ['kryfi', 'The hidden beach'],
  ['limanaki', 'The little harbour'], ['piges', 'Sources'],
];

const FACTS = [
  ['Shore', 'Sand', 'all along the bay'],
  ['Depth', 'Shallow', 'gets deeper slowly'],
  ['Faces', 'West', 'towards Marathon'],
  ['Wind', 'Sheltered', 'the hills block the meltemi'],
  ['From Athens', '~2 hours', 'by road or by ferry'],
];

const FEATURES = [
  ['f-sand', '🏖️', 'Play in the shallows', 'The sand slopes gently into the water and the seabed stays under your feet for a long way. Little swimmers play safely and parents can relax.'],
  ['f-wind', '🍃', 'Calm water', 'When the summer meltemi wind raises waves out at sea, the water here stays flat: the bay sits low, behind an arc of hillsides.'],
  ['f-reef', '🐟', 'A swim with a mask', 'Red mullet and sole swim over the sand, and on the rocky ends of the bay the sea anemones close as soon as you come near.'],
  ['f-sun', '💧', 'Cool water from below', 'In a few places fresh water rises from the seabed, and while you swim you suddenly feel a cold current around you.'],
  ['f-deep', '🐐', 'The cove at the end of the path', 'Take the path to the north-west and you reach a small shore where your only company is the goats.'],
  ['f-calm', '🌿', 'Room for everyone', 'No big hotels and no noise: even in high summer there is a corner of the beach for your towel.'],
];

const SOURCES = [
  ['Wikipedia (Greek): “Νιμπορειό Εύβοιας”', 'https://el.wikipedia.org/wiki/%CE%9D%CE%B9%CE%BC%CF%80%CE%BF%CF%81%CE%B5%CE%B9%CF%8C_%CE%95%CF%8D%CE%B2%CE%BF%CE%B9%CE%B1%CF%82'],
  ['Fosonline (Greek): “Nimborio: a paradise two hours from Athens”', 'https://www.fosonline.gr/travel/article/182428/nimporio-enas-paradeisos-dyo-ores-apo-tin-athina'],
  ['Mixani tou Xronou (Greek): “Nimborio, the fishing village with the Dragon Houses and the ancient quarry”', 'https://www.mixanitouxronou.gr/nimporio-to-psarochori-me-ta-drakospita-kai-to-archaio-latomeio-kindyneyei-na-ginei-aioliko-parko/'],
  ['iefimerida (Greek): “Nimporeio, Evia”', 'https://www.iefimerida.gr/travel/nimporeio-eyboias-exotiko-mantri-paralia'],
  ['Travelstyle (Greek): “Nimborio: a magical bay in Evia”', 'https://www.travelstyle.gr/nimporio-enas-magikos-kolpos-stin-eyvoia-me-pentakathara-galana-nera/'],
  ['Ghetto Magazine (Greek): “Nimborio: the beach with the deep blue sea and springs”', 'https://ghettomagazine.gr/nhmporio-h-paralia-me-thn-katagalanh-thalassa-sthn-opoia-bgainoun-phges/'],
];
</script>

<template>
  <SiteLayout>
    <section class="page-hero paralia-hero">
      <div class="wrap">
        <p class="kicker">The beach</p>
        <h1>Golden sand, blue water, <em>little wind</em></h1>
        <p>A large, deep and sheltered bay with sand from end to end, water that stays shallow for many metres and a seabed worth a mask. Two hours from Athens, and yet as quiet as if it were much further away.</p>
        <nav class="hs-chapters" aria-label="Sections">
          <a v-for="[id, label] in CHAPTERS" :key="id" :href="'#' + id">{{ label }}</a>
        </nav>
      </div>
      <WaveEdge />
    </section>

    <main id="main" class="hs">
      <!-- facts -->
      <section class="hs-facts-wrap">
        <div class="wrap">
          <ul class="hs-facts five">
            <li v-for="[k, v, s] in FACTS" :key="k"><span>{{ k }}</span><b>{{ v }}</b><small v-if="s">{{ s }}</small></li>
          </ul>
        </div>
      </section>

      <!-- the bay -->
      <section class="hs-sec" id="ormos">
        <div class="wrap hs-split hs-photo-right">
          <div>
            <p class="kicker">The bay</p>
            <h2>A bay <em>hidden in the hills</em></h2>
            <p>Nimborio lies in south Evia, between Styra and Marmari, with Marathon right on the opposite shore. People also call it <strong>Boria</strong>. It is a deep, wide inlet of the coast on the Gulf of Petalioi, its mouth facing west towards the coast of Attica.</p>
            <p>Streams run down the slopes and open into small, flat fields just before the waves, and in front of them the sandy beach begins. In the shallows the water is almost clear; a little further out it darkens to a deep blue.</p>
            <p>The clean water and untouched character drew nature lovers early on, even well-known people: it is said that Maria Callas came here too. The first visitors arrived by boat, because there was no road, and some still come by sea today.</p>
          </div>
          <figure class="hs-figure">
            <img src="/assets/img/gallery/o-kolpos.webp" alt="The bay of Nimborio with its turquoise water and the hills around it" width="1800" height="1151" loading="lazy">
            <figcaption>The bay of Nimborio. Association archive.</figcaption>
          </figure>
        </div>
      </section>

      <!-- why here -->
      <section class="beach hs-sec" id="giati">
        <div class="wrap">
          <p class="kicker">What makes it special</p>
          <h2>Six reasons <em>to swim here</em></h2>
          <div class="features beach-features">
            <article v-for="[tone, ico, t, s] in FEATURES" :key="t" class="feature" :class="tone"><span>{{ ico }}</span><h3>{{ t }}</h3><p>{{ s }}</p></article>
          </div>
        </div>
      </section>

      <!-- under water -->
      <section class="hs-sec hs-dark" id="vythos">
        <div class="wrap hs-split">
          <div>
            <p class="kicker">Under the water</p>
            <h2>Anemones, red mullet <em>and fresh water</em></h2>
            <p>The sand continues into the sea all along the bay, and the seabed slopes down smoothly, with no sudden steps. That makes Nimborio one of the safest beaches for children and for those who are not strong swimmers.</p>
            <p>With a mask the seabed comes alive: sea anemones that pull in as soon as you come near, many kinds of fish, among them red mullet and sole on the sand, and sea urchins on the rocks at the ends of the bay.</p>
            <p>The strangest thing is the <strong>springs</strong>: in parts of the bay fresh water comes up from the seabed. You will notice it the moment the water around you suddenly turns cooler, even in the middle of summer.</p>
            <p class="beach-tip">For the rocks at the ends, bring water shoes.</p>
          </div>
          <figure class="hs-figure">
            <img src="/assets/img/gallery/petres-kai-nera.webp" alt="Stones under clear, clean water" width="1200" height="800" loading="lazy">
            <figcaption>Stones and clear water at the edge of the bay.</figcaption>
          </figure>
        </div>
      </section>

      <!-- hidden beach -->
      <section class="hs-sec hs-sand" id="kryfi">
        <div class="wrap hs-split hs-photo-right">
          <div>
            <p class="kicker">The hidden beach</p>
            <h2>At the end <em>of the path</em></h2>
            <p>Where the main beach ends, a path starts towards the north-west, between stones and bushes. It leads to a smaller cove with water just as blue, where no road reaches.</p>
            <p>There, instead of swimmers, you will usually find goats and sheep resting in the shade of small trees, among dry-stone walls and an old sheepfold. An almost exotic setting, for a completely different swim.</p>
            <p class="beach-tip">Take water, a hat and closed shoes for the path.</p>
          </div>
          <figure class="hs-figure">
            <img src="/assets/img/gallery/monopati.webp" alt="A stone path between bushes" width="1200" height="800" loading="lazy">
            <figcaption>A stone path around the bay.</figcaption>
          </figure>
        </div>
      </section>

      <!-- the little harbour -->
      <section class="hs-sec" id="limanaki">
        <div class="wrap hs-split">
          <div>
            <p class="kicker">The little harbour</p>
            <h2>Traces of <em>the quarry</em></h2>
            <p>The village you see up the slope was born in the days of the quarry, when the stone of the hill was carried down on rails. The fields around belonged to people from Kapsala, who grew their vegetables here.</p>
            <p>At the little harbour you will see <strong>three small stone vaulted huts</strong>, built for the quarry and later used by fishermen. A little further on stands the most picturesque spot in the bay: a <strong>house in the sea</strong>, built to offer water and coffee to the quarry workers.</p>
            <p>For decades the bay was the shelter of the fishermen of Nea Styra, who found refuge here when the weather turned. And the little church of <strong>Profitis Ilias</strong> (the Prophet Elijah) is built, unusually, close to the sea and not on a mountain top as elsewhere in Greece.</p>
            <p><RouterLink to="/en/istoria/">The history of the bay →</RouterLink></p>
          </div>
          <figure class="hs-figure beach-tall">
            <img src="/assets/img/gallery/spiti-sto-kyma.webp" alt="A house by the waves" width="800" height="1200" loading="lazy">
            <figcaption>A house by the waves.</figcaption>
          </figure>
        </div>
      </section>

      <!-- sources -->
      <section class="hs-sec hs-sources-sec" id="piges">
        <div class="wrap">
          <aside class="hs-card hs-sources">
            <h3>Sources</h3>
            <ul>
              <li v-for="[t, u] in SOURCES" :key="u"><a :href="u" target="_blank" rel="noopener" hreflang="el">{{ t }}</a></li>
            </ul>
            <p class="hs-note">Do you have nice photos of the beach or the seabed? <a href="https://m.me/Nimborio" target="_blank" rel="noopener">Send us a message</a>.</p>
          </aside>
        </div>
      </section>
    </main>
  </SiteLayout>
</template>
