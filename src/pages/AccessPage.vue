<script setup>
import { ref, computed, onMounted } from 'vue';
import SiteLayout from '../components/SiteLayout.vue';
import WaveEdge from '../components/WaveEdge.vue';
import RouteMap from '../components/RouteMap.vue';
import { usePage } from '../composables/usePage.js';
import { setHash } from '../lib/util.js';
import { useLang } from '../lib/lang.js';
import ROUTES from '../data/routes.json';

const { en, t } = useLang();
usePage({
  path: '/prosvasi/',
  en,
  title: t('Πώς θα έρθετε', 'How to get here'),
  description: t('Τρεις τρόποι να έρθετε στο Νημποριό Εύβοιας από την Αθήνα: με το πλοίο Αγία Μαρίνα – Νέα Στύρα, με το πλοίο Ραφήνα – Μαρμάρι ή οδικώς από τη γέφυρα της Χαλκίδας.',
    'Three ways to get to Nimborio, Evia from Athens: by ferry from Agia Marina to Nea Styra, by ferry from Rafina to Marmari, or by road over the bridge at Chalkida.'),
});

/* The three ways, with the numbers from src/data/routes.json (made by `npm run routes`) */
// Destination: the village as Google names it. "Nimporio, 340 15" or the exact position make Google pick a
// rental business nearby; "Νιμπορειό 340 15" lands on the village itself (checked in Google Maps).
const DESTINATION = 'Νιμπορειό 340 15', ATHENS = ROUTES.start.join(',');
const gmaps = (...via) => 'https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=' + ATHENS + '&destination=' + encodeURIComponent(DESTINATION) +
  (via.length ? '&waypoints=' + encodeURIComponent(via.join('|')) : '');

const OPTIONS = en ? [
  {
    key: 'agiaMarina', hash: 'agia-marina', color: '#ff6b4a', badge: 'The most common',
    name: 'Via Agia Marina', via: 'Ferry Agia Marina – Nea Styra',
    ports: [['Agia Marina port', [38.18075, 24.05951]], ['Nea Styra port', [38.17989, 24.20719]]],
    steps: [
      ['🚗', 'By road', 'Athens → Agia Marina', 'North-east, through Marathon, to the little port where the ferry leaves.'],
      ['⛴️', 'Ferry', 'Agia Marina → Nea Styra', 'Frequent sailings all day.'],
      ['🛣️', 'By road', 'Nea Styra → Kapsala', 'South, then the road down to the bay.'],
      ['🏖️', 'You’re here', 'Nimborio', 'Park, and take your shoes off.'],
    ],
    note: 'The shortest sea crossing, with the most sailings in a day.',
    ferryLink: ['Timetable: neastyraferries.gr', 'https://www.neastyraferries.gr/'],
    maps: gmaps('38.18075,24.05951', '38.17989,24.20719'),
  },
  {
    key: 'rafina', hash: 'rafina', color: '#7b5cff',
    name: 'Via Rafina – Marmari', via: 'Ferry Rafina – Marmari',
    ports: [['Rafina port', [38.0241, 24.01102]], ['Marmari port', [38.04882, 24.3173]]],
    steps: [
      ['🚗', 'By road', 'Athens → Rafina', 'East, to the port of Rafina.'],
      ['⛴️', 'Ferry', 'Rafina → Marmari', 'Fewer sailings in a day: check the times before you set off.'],
      ['🛣️', 'By road', 'Marmari → Nimborio', 'North, towards Styra, then the road down to the bay.'],
      ['🏖️', 'You’re here', 'Nimborio', 'Park, and take your shoes off.'],
    ],
    note: 'A good choice if you start from the southern or eastern suburbs of Athens, close to Rafina.',
    ferryLink: ['Timetable: Ferryhopper', 'https://www.ferryhopper.com/en/ferry-routes/direct/rafina-marmari'],
    maps: gmaps('38.0241,24.01102', '38.04882,24.3173'),
  },
  {
    key: 'chalkida', hash: 'chalkida', color: '#2e8b57',
    name: 'Via Chalkida', via: 'By road, no ferry',
    ports: [['High bridge of Evripos', [38.44455, 23.59066]]],
    steps: [
      ['🚗', 'Motorway', 'Athens → Chalkida', 'The Athens – Lamia motorway and the turn-off for Chalkida.'],
      ['🌉', 'Bridge', 'Evripos bridge', 'You cross onto Evia over the high bridge.'],
      ['🛣️', 'By road', 'Chalkida → Styra', 'South, through Eretria and Aliveri, then on to the bay.'],
      ['🏖️', 'You’re here', 'Nimborio', 'Park, and take your shoes off.'],
    ],
    note: 'The longest way, but it doesn’t depend on ferries: useful when strong wind stops the boats.',
    ferryLink: null,
    maps: gmaps('38.44455,23.59066'),
  },
] : [
  {
    key: 'agiaMarina', hash: 'agia-marina', color: '#ff6b4a', badge: 'Η πιο συνηθισμένη',
    name: 'Μέσω Αγίας Μαρίνας', via: 'Πλοίο Αγία Μαρίνα – Νέα Στύρα',
    ports: [['Λιμάνι Αγίας Μαρίνας', [38.18075, 24.05951]], ['Λιμάνι Νέων Στύρων', [38.17989, 24.20719]]],
    steps: [
      ['🚗', 'Οδικώς', 'Αθήνα → Αγία Μαρίνα', 'Βορειοανατολικά, μέσω Μαραθώνα, ως το λιμανάκι απ’ όπου φεύγει το φέρι.'],
      ['⛴️', 'Πλοίο', 'Αγία Μαρίνα → Νέα Στύρα', 'Συχνά δρομολόγια όλη τη μέρα.'],
      ['🛣️', 'Οδικώς', 'Νέα Στύρα → Κάψαλα', 'Νότια, και μετά η κατηφόρα προς τον όρμο.'],
      ['🏖️', 'Φτάσατε', 'Νημποριό', 'Παρκάρετε, βγάλτε τα παπούτσια.'],
    ],
    note: 'Η πιο σύντομη θαλάσσια διαδρομή, με τα περισσότερα δρομολόγια μέσα στη μέρα.',
    ferryLink: ['Δρομολόγια: neastyraferries.gr', 'https://www.neastyraferries.gr/'],
    maps: gmaps('38.18075,24.05951', '38.17989,24.20719'),
  },
  {
    key: 'rafina', hash: 'rafina', color: '#7b5cff',
    name: 'Μέσω Ραφήνας – Μαρμαρίου', via: 'Πλοίο Ραφήνα – Μαρμάρι',
    ports: [['Λιμάνι Ραφήνας', [38.0241, 24.01102]], ['Λιμάνι Μαρμαρίου', [38.04882, 24.3173]]],
    steps: [
      ['🚗', 'Οδικώς', 'Αθήνα → Ραφήνα', 'Ανατολικά, ως το λιμάνι της Ραφήνας.'],
      ['⛴️', 'Πλοίο', 'Ραφήνα → Μαρμάρι', 'Λιγότερα δρομολόγια μέσα στη μέρα: δείτε τις ώρες πριν ξεκινήσετε.'],
      ['🛣️', 'Οδικώς', 'Μαρμάρι → Νημποριό', 'Βόρεια, προς τα Στύρα, και μετά η κατηφόρα προς τον όρμο.'],
      ['🏖️', 'Φτάσατε', 'Νημποριό', 'Παρκάρετε, βγάλτε τα παπούτσια.'],
    ],
    note: 'Καλή επιλογή αν ξεκινάτε από τα νότια ή τα ανατολικά προάστια, που είναι κοντά στη Ραφήνα.',
    ferryLink: ['Δρομολόγια: Ferryhopper', 'https://www.ferryhopper.com/el/ferry-routes/direct/rafina-marmari'],
    maps: gmaps('38.0241,24.01102', '38.04882,24.3173'),
  },
  {
    key: 'chalkida', hash: 'chalkida', color: '#2e8b57',
    name: 'Μέσω Χαλκίδας', via: 'Οδικώς, χωρίς πλοίο',
    ports: [['Υψηλή Γέφυρα Ευρίπου', [38.44455, 23.59066]]],
    steps: [
      ['🚗', 'Εθνική οδός', 'Αθήνα → Χαλκίδα', 'Εθνική Οδός Αθηνών – Λαμίας και η διακλάδωση για Χαλκίδα.'],
      ['🌉', 'Γέφυρα', 'Γέφυρα Ευρίπου', 'Περνάτε στην Εύβοια από την Υψηλή Γέφυρα.'],
      ['🛣️', 'Οδικώς', 'Χαλκίδα → Στύρα', 'Νότια, μέσω Ερέτριας και Αλιβερίου, και μετά προς τον όρμο.'],
      ['🏖️', 'Φτάσατε', 'Νημποριό', 'Παρκάρετε, βγάλτε τα παπούτσια.'],
    ],
    note: 'Η μεγαλύτερη διαδρομή, αλλά δεν εξαρτάται από πλοία: χρήσιμη όταν τα πλοία δεν πλέουν λόγω αέρα.',
    ferryLink: null,
    maps: gmaps('38.44455,23.59066'),
  },
];

// minutes → "45′", "1 ώρα 10′", "2 ώρες" (English: "45 min", "1 h 10 min", "2 h")
const fmt = (m) => {
  const h = Math.floor(m / 60), r = m % 60;
  if (en) return h ? h + ' h' + (r ? ' ' + r + ' min' : '') : r + ' min';
  if (!h) return r + '′';
  return h + (h === 1 ? ' ώρα' : ' ώρες') + (r ? ' ' + r + '′' : '');
};
const KM = t('χλμ', 'km');
const r5 = (m) => Math.round(m / 5) * 5;
const VIEW = OPTIONS.map((o) => {
  const legs = ROUTES.routes[o.key].legs;
  const car = legs.filter((l) => l.mode === 'car'), ferry = legs.find((l) => l.mode === 'ferry');
  const total = r5(legs.reduce((n, l) => n + l.min, 0));
  // the tag above each step: distance and time of that leg
  const here = t('Φτάσατε', 'You’re here');
  const tags = o.key === 'chalkida'
    ? [`${car[0].km} ${KM} · ${fmt(r5(car[0].min))}`, t('Χωρίς πλοίο', 'No ferry'), `${car[1].km} ${KM} · ${fmt(r5(car[1].min))}`, here]
    : [`${car[0].km} ${KM} · ${fmt(r5(car[0].min))}`, t('Πλοίο · ', 'Ferry · ') + fmt(ferry.min), `${car[1].km} ${KM} · ${fmt(r5(car[1].min))}`, here];
  return {
    ...o, total: fmt(total), km: car.reduce((n, l) => n + l.km, 0), ferry: ferry ? fmt(ferry.min) : null,
    steps: o.steps.map(([ico, , title, text], k) => ({ ico, tag: tags[k], title, text })),
  };
});

const choice = ref('agiaMarina');
const current = computed(() => VIEW.find((o) => o.key === choice.value));
function choose(key) {
  choice.value = key;
  setHash('#' + VIEW.find((o) => o.key === key).hash);
}
// arrow keys move between the three choices
function onKey(e, k) {
  const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
  if (!d) return;
  e.preventDefault();
  const next = VIEW[(k + d + VIEW.length) % VIEW.length];
  choose(next.key);
  document.getElementById('tab-' + next.hash)?.focus();
}
onMounted(() => {
  const o = VIEW.find((x) => '#' + x.hash === location.hash);
  if (o) choice.value = o.key;
});
</script>

<template>
  <SiteLayout credits>
    <section class="page-hero prosvasi-hero">
      <div class="wrap">
        <p class="kicker">{{ t('Από το κέντρο της Αθήνας', 'From central Athens') }}</p>
        <h1>{{ t('Πώς θα έρθετε', 'How to get here') }}</h1>
        <p>{{ t('Τρεις τρόποι: με το πλοίο από την Αγία Μαρίνα ή από τη Ραφήνα, ή οδικώς από τη γέφυρα της Χαλκίδας. Διαλέξτε έναν για να δείτε τη διαδρομή στον χάρτη.', 'Three ways: by ferry from Agia Marina or from Rafina, or by road over the bridge at Chalkida. Choose one to see the route on the map.') }}</p>
      </div>
      <WaveEdge />
    </section>

    <main id="main">
      <section class="access" id="prosvasi">
        <div class="wrap">
          <div class="route-tabs" role="tablist" :aria-label="t('Τρόποι να έρθετε', 'Ways to get here')">
            <button v-for="(o, k) in VIEW" :key="o.key" :id="'tab-' + o.hash" type="button" role="tab" class="route-tab"
              :style="{ '--rc': o.color }" :aria-selected="String(choice === o.key)" :tabindex="choice === o.key ? 0 : -1"
              aria-controls="route-panel" @click="choose(o.key)" @keydown="onKey($event, k)">
              <span class="rt-num">{{ k + 1 }}</span>
              <span class="rt-txt">
                <strong>{{ o.name }}</strong>
                <small>{{ o.via }}</small>
              </span>
              <span class="rt-time">~{{ o.total }}</span>
              <span v-if="o.badge" class="rt-badge">{{ o.badge }}</span>
            </button>
          </div>

          <div id="route-panel" class="route-panel" role="tabpanel" :aria-labelledby="'tab-' + current.hash" :style="{ '--rc': current.color }">
            <ul class="route-facts">
              <li><span>{{ t('Συνολικά', 'In total') }}</span><b>{{ t('περίπου', 'about') }} {{ current.total }}</b></li>
              <li><span>{{ t('Με το αυτοκίνητο', 'By car') }}</span><b>{{ current.km }} {{ KM }}</b></li>
              <li><span>{{ t('Με το πλοίο', 'By ferry') }}</span><b>{{ current.ferry || t('καθόλου', 'none') }}</b></li>
            </ul>

            <ol class="route">
              <li v-for="s in current.steps" :key="s.title"><span class="step-ico">{{ s.ico }}</span><span class="step-tag">{{ s.tag }}</span><h3>{{ s.title }}</h3><p>{{ s.text }}</p></li>
            </ol>

            <RouteMap :data="ROUTES" :options="VIEW" :selected="choice" @select="choose" />

            <div class="route-foot">
              <p>{{ current.note }}</p>
              <div class="route-links">
                <a class="btn btn-sun" :href="current.maps" target="_blank" rel="noopener">📍 {{ t('Οδηγίες στο Google Maps', 'Directions in Google Maps') }}</a>
                <a v-if="current.ferryLink" class="btn btn-ghost-dark" :href="current.ferryLink[1]" target="_blank" rel="noopener">⛴️ {{ current.ferryLink[0] }}</a>
              </div>
            </div>
            <p class="route-small">{{ t('Οι χρόνοι είναι υπολογισμοί χωρίς κίνηση και χωρίς την αναμονή στο λιμάνι. Ελέγξτε πάντα τα δρομολόγια των πλοίων πριν ξεκινήσετε, ιδίως τις μέρες με δυνατό αέρα.', 'Times are estimates without traffic and without waiting at the port. Always check the ferry times before you set off, especially on windy days.') }}</p>
          </div>
        </div>
      </section>
    </main>
  </SiteLayout>
</template>
