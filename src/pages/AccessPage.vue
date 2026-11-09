<script setup>
import { ref, computed, onMounted } from 'vue';
import SiteLayout from '../components/SiteLayout.vue';
import WaveEdge from '../components/WaveEdge.vue';
import RouteMap from '../components/RouteMap.vue';
import { usePage } from '../composables/usePage.js';
import { setHash } from '../lib/util.js';
import ROUTES from '../data/routes.json';

usePage({
  path: '/prosvasi/',
  title: 'Πώς θα έρθετε',
  description: 'Τρεις τρόποι να έρθετε στο Νημποριό Εύβοιας από την Αθήνα: με το πλοίο Αγία Μαρίνα – Νέα Στύρα, με το πλοίο Ραφήνα – Μαρμάρι ή οδικώς από τη γέφυρα της Χαλκίδας.',
});

/* The three ways, with the numbers from src/data/routes.json (made by `npm run routes`) */
// Destination: the village as Google names it. "Nimporio, 340 15" or the exact position make Google pick a
// rental business nearby; "Νιμπορειό 340 15" lands on the village itself (checked in Google Maps).
const DESTINATION = 'Νιμπορειό 340 15', ATHENS = ROUTES.start.join(',');
const gmaps = (...via) => 'https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=' + ATHENS + '&destination=' + encodeURIComponent(DESTINATION) +
  (via.length ? '&waypoints=' + encodeURIComponent(via.join('|')) : '');

const OPTIONS = [
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

// minutes → "45′", "1 ώρα 10′", "2 ώρες"
const fmt = (m) => {
  const h = Math.floor(m / 60), r = m % 60;
  if (!h) return r + '′';
  return h + (h === 1 ? ' ώρα' : ' ώρες') + (r ? ' ' + r + '′' : '');
};
const r5 = (m) => Math.round(m / 5) * 5;
const VIEW = OPTIONS.map((o) => {
  const legs = ROUTES.routes[o.key].legs;
  const car = legs.filter((l) => l.mode === 'car'), ferry = legs.find((l) => l.mode === 'ferry');
  const total = r5(legs.reduce((n, l) => n + l.min, 0));
  // the tag above each step: distance and time of that leg
  const tags = o.key === 'chalkida'
    ? [`${car[0].km} χλμ · ${fmt(r5(car[0].min))}`, 'Χωρίς πλοίο', `${car[1].km} χλμ · ${fmt(r5(car[1].min))}`, 'Φτάσατε']
    : [`${car[0].km} χλμ · ${fmt(r5(car[0].min))}`, 'Πλοίο · ' + fmt(ferry.min), `${car[1].km} χλμ · ${fmt(r5(car[1].min))}`, 'Φτάσατε'];
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
        <p class="kicker">Από το κέντρο της Αθήνας</p>
        <h1>Πώς θα έρθετε</h1>
        <p>Τρεις τρόποι: με το πλοίο από την Αγία Μαρίνα ή από τη Ραφήνα, ή οδικώς από τη γέφυρα της Χαλκίδας. Διαλέξτε έναν για να δείτε τη διαδρομή στον χάρτη.</p>
      </div>
      <WaveEdge />
    </section>

    <main id="main">
      <section class="access" id="prosvasi">
        <div class="wrap">
          <div class="route-tabs" role="tablist" aria-label="Τρόποι να έρθετε">
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
              <li><span>Συνολικά</span><b>περίπου {{ current.total }}</b></li>
              <li><span>Με το αυτοκίνητο</span><b>{{ current.km }} χλμ</b></li>
              <li><span>Με το πλοίο</span><b>{{ current.ferry || 'καθόλου' }}</b></li>
            </ul>

            <ol class="route">
              <li v-for="s in current.steps" :key="s.title"><span class="step-ico">{{ s.ico }}</span><span class="step-tag">{{ s.tag }}</span><h3>{{ s.title }}</h3><p>{{ s.text }}</p></li>
            </ol>

            <RouteMap :data="ROUTES" :options="VIEW" :selected="choice" @select="choose" />

            <div class="route-foot">
              <p>{{ current.note }}</p>
              <div class="route-links">
                <a class="btn btn-sun" :href="current.maps" target="_blank" rel="noopener">📍 Οδηγίες στο Google Maps</a>
                <a v-if="current.ferryLink" class="btn btn-ghost-dark" :href="current.ferryLink[1]" target="_blank" rel="noopener">⛴️ {{ current.ferryLink[0] }}</a>
              </div>
            </div>
            <p class="route-small">Οι χρόνοι είναι υπολογισμοί χωρίς κίνηση και χωρίς την αναμονή στο λιμάνι. Ελέγξτε πάντα τα δρομολόγια των πλοίων πριν ξεκινήσετε, ιδίως τις μέρες με δυνατό αέρα.</p>
          </div>
        </div>
      </section>
    </main>
  </SiteLayout>
</template>
