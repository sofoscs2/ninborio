<script setup>
// English version of src/pages/HistoryPage.vue
import SiteLayout from '../../components/SiteLayout.vue';
import WaveEdge from '../../components/WaveEdge.vue';
import { usePage } from '../../composables/usePage.js';

usePage({
  path: '/istoria/',
  en: true,
  title: 'The history of Nimborio',
  description: 'The history of Nimborio, Evia: the name, the Styrian stone and the ancient quarry, the Dragon Houses, the first nature lovers, the residents’ association and the fight to protect the hill.',
  image: '/assets/img/syllogos/palio-nimporio.webp',
});

const CHAPTERS = [
  ['onoma', 'The name'], ['archaiotita', 'Antiquity'], ['drakospita', 'Dragon Houses'], ['neoteroi', 'Recent centuries'],
  ['fysiolatres', 'The first visitors'], ['oikistes', 'Residents & Association'], ['kalokairia', 'Summers'],
  ['xronologio', 'Timeline'], ['piges', 'Sources'],
];

const FACTS = [
  ['Old name', 'Animborio'],
  ['Permanent residents', '37', '2021 census'],
  ['Altitude', '33 m'],
  ['Municipality', 'Karystos', 'Styra district'],
  ['Post code', '340 15', 'phone area code 22240'],
  ['Sea', 'Gulf of Petalioi', 'South Euboean Gulf'],
];

const FINDS = [
  ['⚱️', 'Ancient graves', 'on the old path that led down to the beach'],
  ['⛏️', 'The quarry', 'north of the bay, with clear marks of digging and carving'],
  ['🏛️', 'A column', 'lying on the ground, carved in the quarry, with a view over the whole bay'],
  ['🪨', 'A Dragon House', 'on a hill a little above the village'],
];

const DRAKO = [
  ['No foundations', 'The stones stand straight on the ground of the slope.'],
  ['No mortar', 'Huge slabs, one on top of another, are held in balance by large boulders as counterweights.'],
  ['A stone “pyramid” for a roof', 'The slabs step inwards little by little until they close, with a precision that still impresses.'],
  ['Unknown date', 'We know neither when they were built nor who built them. Whoever it was understood building very well.'],
];

const OLD_DAYS = [
  ['⛺', 'Sleeping in a tent or a sleeping bag, by the sea'],
  ['🍷', 'Whatever the land gave: local wine and food with no menu'],
  ['🐙', 'Ouzo with your feet in the water and the meze of the day, octopus or okra'],
  ['🪣', 'Water from the well: a little brackish to drink, ice cold for the evening shower'],
  ['🎣', 'Swimming, fishing and singing with friends, with no radio'],
  ['⛪', 'The feasts of Profitis Ilias and Agios Ioannis, with the neighbours from the villages'],
];

const WORKS = [
  ['💡', 'Electricity', 'Connection to the DEI power network: the end of generators and oil lamps.'],
  ['☎️', 'Telephone', 'Connection to the OTE telephone network.'],
  ['🚰', 'Water', 'A well and a local water network, run today by the Municipality of Karystos.'],
  ['🛣️', 'Road', 'Improvements, mostly to the main road, together with the municipality.'],
  ['♻️', 'Cleaning', 'Regular rubbish collection.'],
];

const TIMELINE = [
  ['Homeric times', 'The Abantes and Styra', 'The wider area is the land of the Abantes, who according to Homer fought at Troy. Neighbouring Styra is already named in the epics.'],
  ['Classical era', 'The Styrian stone', 'Styra joins the Athenian alliance and fights at Salamis and in the Sicilian Expedition. At Nimborio the local stone is quarried and worked.'],
  ['Roman times', 'Quarries on the hill', 'Quarries work on the slopes of the hill of Agios Nikolaos; on its top stands the Acropolis of Styra.'],
  ['Byzantium', 'The “New Market”', 'The bay becomes the little port of the mountain villages. That, tradition says, is where its name comes from.'],
  ['A century ago', 'The Zappas house', 'The only permanent house in the bay, right on the sea. Around it, a few stone huts for gardeners and fishermen.'],
  ['Late 1950s – 1960s', 'The first tents', 'Nature lovers from Athens discover the bay and come back every summer.'],
  ['Around 1970', 'The first houses', 'The first holiday homes are built, almost makeshift. A plan for a hotel goes nowhere.'],
  ['1979', 'The first statutes', 'The “Union of Residents and Landowners of Nimborio, Evia” is founded.'],
  ['1980s – 1990s', 'Electricity, phone, water', 'More houses, very little infrastructure. The Association brings power, telephone and a water network.'],
  ['2014', 'A new society', 'The Association continues as the Cultural – Nature-Loving – Development Association of Nimborio Residents.'],
  ['April 2020', 'The wind farm licence', 'A licence is given for a wind farm in the Municipality of Karystos, with dozens of turbines around the bay.'],
  ['November 2021', 'A visit to the hill', 'At the Association’s request, the Central Archaeological Council visits Nimborio before deciding.'],
];

const SOURCES = [
  ['Wikipedia (Greek): “Νιμπορειό Εύβοιας”', 'https://el.wikipedia.org/wiki/%CE%9D%CE%B9%CE%BC%CF%80%CE%BF%CF%81%CE%B5%CE%B9%CF%8C_%CE%95%CF%8D%CE%B2%CE%BF%CE%B9%CE%B1%CF%82'],
  ['Mixani tou Xronou (Greek): “Nimborio, the fishing village with the Dragon Houses and the ancient quarry”', 'https://www.mixanitouxronou.gr/nimporio-to-psarochori-me-ta-drakospita-kai-to-archaio-latomeio-kindyneyei-na-ginei-aioliko-parko/'],
  ['Travelstyle (Greek): “Nimborio: a magical bay in Evia”', 'https://www.travelstyle.gr/nimporio-enas-magikos-kolpos-stin-eyvoia-me-pentakathara-galana-nera/'],
];
</script>

<template>
  <SiteLayout>
    <section class="page-hero istoria-hero">
      <div class="wrap">
        <p class="kicker">A little history</p>
        <h1>From the Styrian stone to a <em>summer retreat</em></h1>
        <p>A shelter for fishermen, an ancient quarry, the mysterious Dragon Houses and a group of Athenians who pitched their tents here. The story of a small bay in south Evia.</p>
        <nav class="hs-chapters" aria-label="Chapters">
          <a v-for="[id, label] in CHAPTERS" :key="id" :href="'#' + id">{{ label }}</a>
        </nav>
      </div>
      <WaveEdge />
    </section>

    <main id="main" class="hs">
      <!-- facts -->
      <section class="hs-facts-wrap">
        <div class="wrap">
          <ul class="hs-facts">
            <li v-for="[k, v, s] in FACTS" :key="k"><span>{{ k }}</span><b>{{ v }}</b><small v-if="s">{{ s }}</small></li>
          </ul>
        </div>
      </section>

      <!-- name -->
      <section class="hs-sec" id="onoma">
        <div class="wrap hs-split">
          <div>
            <p class="kicker">The name</p>
            <h2>A “new market” <em>by the sea</em></h2>
            <p>In the mountains above the bay there were small villages from early times, and they needed a place to reach the sea. That place was the sheltered bay below: boats moored there and goods were traded there. Tradition says the Byzantines called it “Neo Emporio”, a new port for trade, and that the name of today comes from that.</p>
            <p>The older form of the name is <strong>Animborio</strong>, and the bay is still marked on maps as “Ormos Animboriou” (Animborio Bay). Today it is usually said without the first “A”.</p>
          </div>
          <aside class="hs-card">
            <h3>How you will find it written</h3>
            <p class="hs-tags"><span>Νημποριό</span><span>Νημπορειό</span><span>Νιμπορειό</span><span>Ανημπορειό</span><span>Nimborio</span><span>Nimporio</span></p>
            <p class="hs-note">They are all the same bay. Don’t confuse it with Emborio on Symi or Halki.</p>
          </aside>
        </div>
      </section>

      <!-- antiquity -->
      <section class="hs-sec hs-sand" id="archaiotita">
        <div class="wrap hs-split">
          <div>
            <p class="kicker">Antiquity</p>
            <h2>The stone of Styra <em>and the Abantes</em></h2>
            <p>Nimborio sits in a key position: on the South Euboean Gulf, facing north-east Attica, next to Styra. The wider area was the land of the <strong>Abantes</strong>, who according to Homer went to Troy; they were famous for their courage and fought hand to hand, spears in hand. Neighbouring <strong>Styra</strong> later joined the Athenian alliance and took part in the naval battle of Salamis and in the Sicilian Expedition.</p>
            <p>If Styra went down in history for its wars, Nimborio did for its stone. Here the so-called <strong>Styrian stone</strong> was quarried and worked, and historians speak of trade in white-green marble of excellent quality, and in purple-dye shells, which gave the precious purple dye. A common view holds that slaves from Caria worked in the quarries.</p>
            <p>No proper excavations have ever been made, and no archaeological site has yet been marked out. But the hill is full of signs from that time. The Ephorate of Antiquities of Evia has written that its remains show how old and how continuous the quarrying, working and trade of stone was here, and that they need protection now.</p>
          </div>
          <aside class="hs-card">
            <h3>What has been found on the hill</h3>
            <ul class="hs-finds">
              <li v-for="[ico, t, s] in FINDS" :key="t"><span aria-hidden="true">{{ ico }}</span><div><b>{{ t }}</b><small>{{ s }}</small></div></li>
            </ul>
            <p class="hs-note">A little further north, the hill of Agios Nikolaos has the Acropolis of Styra on its top, and Roman quarries and Dragon Houses on its slopes: a group of monuments unique in Greece.</p>
          </aside>
        </div>
      </section>

      <!-- drakospita -->
      <section class="hs-sec hs-dark" id="drakospita">
        <div class="wrap">
          <p class="kicker">The Dragon Houses</p>
          <h2>Houses for dragons <em>or lookouts?</em></h2>
          <div class="hs-split">
            <div>
              <p>In south Evia, 23 strange buildings made of huge stones have stood for thousands of years. People named them <strong>Drakospita</strong>, the Dragon Houses, because only dragons, they said, could lift such rocks. Most are around Styra; the best known and most perfectly built is on the top of Mount Ochi, above Karystos.</p>
              <p>They were not built where people lived, but on steep slopes with wide views. That is why many believe they were used to watch over the area. One of them stands on a hill a little above Nimborio; some historians link it to Heracles, the protector of quarrymen.</p>
              <p><RouterLink class="btn btn-sun" to="/en/gyro1/">How to visit them →</RouterLink></p>
            </div>
            <ul class="hs-drako">
              <li v-for="[t, s] in DRAKO" :key="t"><b>{{ t }}</b><span>{{ s }}</span></li>
            </ul>
          </div>
        </div>
      </section>

      <!-- modern times -->
      <section class="hs-sec" id="neoteroi">
        <div class="wrap hs-split hs-photo-right">
          <div>
            <p class="kicker">Recent centuries</p>
            <h2>Gardens, fishermen <em>and a path</em></h2>
            <p>For centuries Nimborio was a poor place with a few fields and animals. There were hardly any permanent houses: only the seaside house of the <strong>Zappas</strong> family, which has stood here for more than a century, and a few stone huts where the people who worked the small gardens lived, along with the few local fishermen.</p>
            <p>For decades the bay was <strong>the shelter of the fishermen of Nea Styra</strong>: when the weather turned, they found refuge here behind the hills, as sailors most likely did since ancient times.</p>
            <p>To reach the sea you walked down from Kapsala, along a narrow pass lined with oleanders and myrtles. Later a narrow dirt road was opened from Kapsala to the hills, and visitors slowly grew in number.</p>
          </div>
          <figure class="hs-figure">
            <img src="/assets/img/syllogos/palio-nimporio.webp" alt="Old black-and-white photo: a family in front of a two-storey stone house by the sea" width="900" height="1205" loading="lazy">
            <figcaption>Nimborio in the old days. Association archive.</figcaption>
          </figure>
        </div>
      </section>

      <!-- first visitors -->
      <section class="hs-sec hs-sea" id="fysiolatres">
        <div class="wrap hs-split">
          <div>
            <p class="kicker">Late 1950s – 1960s</p>
            <h2>The first <em>nature lovers</em></h2>
            <p>From the late 1950s the beauty of the bay, its clean water and its quiet drew Athenians who loved nature. It was a place almost untouched by modern life, and that is exactly why they came more and more often.</p>
            <p>Life was simple: whatever the land had, whatever the sea brought, and a big group of friends singing their own songs. On feast days the people of the villages around came down too, bringing food with them.</p>
          </div>
          <ul class="hs-days" aria-label="What a summer was like back then">
            <li v-for="[ico, t] in OLD_DAYS" :key="t"><span aria-hidden="true">{{ ico }}</span>{{ t }}</li>
          </ul>
        </div>
      </section>

      <!-- settlers & association -->
      <section class="hs-sec" id="oikistes">
        <div class="wrap">
          <p class="kicker">1970 – today</p>
          <h2>From generators <em>to the grid</em></h2>
          <div class="hs-split">
            <div>
              <p>As the visitors became regular summer residents, they wanted a few comforts. Around 1970 there was briefly business interest in a hotel, which went nowhere. The first houses were built almost makeshift.</p>
              <p>In the 1980s, and even more in the 1990s, many new houses were built, but the infrastructure lagged behind. The solutions were temporary: generators for power, gas and oil lamps for light, and hoses on the ground bringing water from the springs in the hills. The main road was always difficult, and the residents kept up the small roads themselves.</p>
              <p>That is when the <strong>residents’ association</strong>, already founded (its first statutes date from 1979), stepped forward. With a lot of work and with its members’ own money, it changed daily life in the bay.</p>
            </div>
            <div class="hs-works">
              <div v-for="[ico, t, s] in WORKS" :key="t" class="hs-work"><span aria-hidden="true">{{ ico }}</span><b>{{ t }}</b><small>{{ s }}</small></div>
            </div>
          </div>
        </div>
      </section>

      <!-- summers -->
      <section class="hs-sec hs-sand" id="kalokairia">
        <div class="wrap hs-split hs-photo-right">
          <div>
            <p class="kicker">Culture</p>
            <h2>Dance, theatre <em>and a radio station</em></h2>
            <p>In summer, and above all in July and August, the bay filled with families and children. So the Association began to organise cultural events too.</p>
            <p>It all started with lessons in traditional and modern Greek dances in the courtyard of <strong>Profitis Ilias</strong>. Then came exhibitions of folk art and photography, and children’s plays with sets and costumes made by volunteer parents. For the grown-ups there are dinners and the yearly dance, sometimes in Nimborio and sometimes in Athens.</p>
            <p>There is also something you won’t easily find elsewhere: a small <strong>radio station</strong> for the bay, set up by one resident on his own initiative and at his own cost, which for years has come on air now and then to entertain the people of Nimborio.</p>
            <p><RouterLink to="/en/syllogos/">More about the Association →</RouterLink></p>
          </div>
          <figure class="hs-figure">
            <img src="/assets/img/syllogos/xoroi.webp" alt="Children and adults dancing in the paved courtyard, with the sea at dusk behind" width="1200" height="900" loading="lazy">
            <figcaption>Dancing in the courtyard, looking over the bay.</figcaption>
          </figure>
        </div>
      </section>

      <!-- timeline -->
      <section class="hs-sec history" id="xronologio">
        <div class="wrap">
          <p class="kicker">Timeline</p>
          <h2>Nimborio <em>through time</em></h2>
          <ol class="timeline">
            <li v-for="[era, t, s] in TIMELINE" :key="era"><span class="era">{{ era }}</span><h3>{{ t }}</h3><p>{{ s }}</p></li>
          </ol>
        </div>
      </section>

      <!-- sources -->
      <section class="hs-sec hs-sources-sec" id="piges">
        <div class="wrap">
          <aside class="hs-card hs-sources">
            <h3>Sources</h3>
            <ul>
              <li v-for="[t, u] in SOURCES" :key="u"><a :href="u" target="_blank" rel="noopener" hreflang="el">{{ t }}</a></li>
              <li>Announcements and archive of the Nimborio Residents’ Association</li>
            </ul>
            <p class="hs-note">Do you know something about the history of the bay, or have old photos? <a href="https://m.me/Nimborio" target="_blank" rel="noopener">Send us a message</a>.</p>
          </aside>
        </div>
      </section>
    </main>
  </SiteLayout>
</template>
