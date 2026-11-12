<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { rand, reduceMotion } from '../../lib/util.js';
import { useWeather, loadWeather } from '../../composables/useWeather.js';

const wx = useWeather();
const phase = ref('day');      // dawn · day · golden · dusk · night
const choice = ref('auto');    // which button is pressed
const ripples = ref([]), glitter = ref([]), lights = ref([]);
const mediaStyle = reactive({}), copyStyle = reactive({});

const BUTTONS = [
  ['auto', '⏱️', 'Τώρα', 'Τώρα'], ['dawn', '🌄', 'Αυγή', 'Αυγή'], ['day', '☀️', 'Μέρα', 'Μέρα'],
  ['golden', '🌇', 'Δύση', 'Ηλιοβασίλεμα'], ['night', '🌙', 'Νύχτα', 'Νύχτα'],
];
const vars = (o) => ({ '--d': o.d, '--delay': o.delay, '--o': o.o });

// the real sun at Nimborio (sky.js), or ?phase=night for previews
function autoPhase() {
  const forced = new URLSearchParams(location.search).get('phase');
  return forced || (window.NimSky ? window.NimSky.phaseAt(new Date()) : 'day');
}
function choose(p) {
  choice.value = p;
  phase.value = p === 'auto' ? autoPhase() : p;
}

let timer, ticking = false;
function onScroll() {
  if (ticking) return; ticking = true;
  requestAnimationFrame(() => {
    const s = Math.min(scrollY, innerHeight);
    mediaStyle.transform = `translateY(${s * 0.35}px)`;
    copyStyle.transform = `translateY(${s * 0.15}px)`;
    copyStyle.opacity = String(1 - s / innerHeight * 1.2);
    ticking = false;
  });
}

onMounted(() => {
  loadWeather(); // air, sea and sunset chips
  // Ripples: short bright arcs drifting over the water
  ripples.value = Array.from({ length: 70 }, () => {
    const x = rand(700, 2850), y = rand(640, 1500), w = rand(30, 90);
    return { d: `M${x} ${y} q${w / 2} ${-w / 6} ${w} 0`, sw: rand(2, 4.5).toFixed(1), style: vars({ d: rand(5, 10).toFixed(1) + 's', delay: (-rand(0, 10)).toFixed(1) + 's', o: rand(0.15, 0.45).toFixed(2) }) };
  });
  // Sun glitter: tiny twinkling highlights, denser in a band across the open sea
  glitter.value = Array.from({ length: 90 }, () => {
    const band = Math.random() < 0.6;
    const cx = band ? rand(1500, 2800) : rand(800, 2800), cy = band ? rand(950, 1350) : rand(650, 1500);
    return { cx: cx.toFixed(0), cy: cy.toFixed(0), r: rand(4, 11).toFixed(1), style: vars({ d: rand(1.6, 3.6).toFixed(1) + 's', delay: (-rand(0, 4)).toFixed(1) + 's', o: rand(0.5, 1).toFixed(2) }) };
  });
  // Village lights at night: main village by the beach and the houses on the slope
  const clusters = [
    { cx: 1250, cy: 530, rx: 140, ry: 55, n: 34 }, { cx: 880, cy: 690, rx: 190, ry: 80, n: 30 },
    { cx: 1500, cy: 470, rx: 120, ry: 50, n: 10 }, { cx: 1650, cy: 260, rx: 250, ry: 60, n: 8 },
  ];
  lights.value = clusters.flatMap((k) => Array.from({ length: k.n }, () => {
    const a = rand(0, Math.PI * 2), r = Math.sqrt(Math.random());
    return { cx: (k.cx + Math.cos(a) * r * k.rx).toFixed(0), cy: (k.cy + Math.sin(a) * r * k.ry).toFixed(0), r: rand(7, 15).toFixed(1), style: { '--d': rand(2, 5).toFixed(1) + 's', '--delay': (-rand(0, 5)).toFixed(1) + 's' } };
  }));

  choose(new URLSearchParams(location.search).get('phase') || 'auto');
  timer = setInterval(() => { if (choice.value === 'auto') phase.value = autoPhase(); }, 60000); // follow the real sun
  if (!reduceMotion()) addEventListener('scroll', onScroll, { passive: true });
});
onBeforeUnmount(() => { clearInterval(timer); removeEventListener('scroll', onScroll); });
</script>

<template>
  <section class="hero" :data-phase="phase" :data-locked="choice === 'auto' ? null : '1'" aria-label="Ο κόλπος του Νημποριού από ψηλά">
    <div class="hero-media" :style="mediaStyle">
      <img class="hero-img" src="/assets/img/hero/bay-2000.webp"
           srcset="/assets/img/hero/bay-1200.webp 1200w, /assets/img/hero/bay-2000.webp 2000w, /assets/img/hero/bay-2800.webp 2800w"
           sizes="100vw" width="2800" height="1500" alt="Ο κόλπος του Νημποριού από ψηλά: η αμμουδιά, ο οικισμός και τα βουνά της νότιας Εύβοιας">
      <div class="hero-tint" aria-hidden="true"></div>

      <!-- Overlay drawn on the same 2800×1500 frame as the photo -->
      <svg class="hero-fx" viewBox="0 0 2800 1500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <clipPath id="sea">
            <polygon points="2800,537 2567,600 2330,660 2100,680 1900,690 1760,650 1500,612 1213,598 1100,650 960,740 870,800 820,870 790,960 700,1020 650,1075 700,1110 860,1090 1030,1130 1000,1200 900,1280 760,1360 720,1420 780,1440 950,1395 1100,1380 1080,1450 1070,1500 2800,1500"/>
          </clipPath>
          <radialGradient id="glint"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
          <radialGradient id="sun-gold"><stop offset="0" stop-color="#fff1c4" stop-opacity=".95"/><stop offset=".25" stop-color="#ffc35a" stop-opacity=".75"/><stop offset=".6" stop-color="#ff9a3c" stop-opacity=".35"/><stop offset="1" stop-color="#ff8030" stop-opacity="0"/></radialGradient>
          <radialGradient id="lamp"><stop offset="0" stop-color="#fff6c8"/><stop offset=".35" stop-color="#ffc85a" stop-opacity=".9"/><stop offset="1" stop-color="#ff9a2e" stop-opacity="0"/></radialGradient>
          <radialGradient id="puff"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".6" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
          <radialGradient id="shade"><stop offset="0" stop-color="#001a2c" stop-opacity=".5"/><stop offset="1" stop-color="#001a2c" stop-opacity="0"/></radialGradient>
          <g id="cloud">
            <ellipse cx="0" cy="0" rx="260" ry="120" fill="url(#puff)"/>
            <ellipse cx="190" cy="-40" rx="210" ry="110" fill="url(#puff)"/>
            <ellipse cx="-170" cy="30" rx="190" ry="90" fill="url(#puff)"/>
            <ellipse cx="60" cy="60" rx="240" ry="80" fill="url(#puff)"/>
          </g>
          <g id="cloud-shadow">
            <ellipse cx="0" cy="0" rx="300" ry="140" fill="url(#shade)"/>
            <ellipse cx="200" cy="-30" rx="230" ry="120" fill="url(#shade)"/>
          </g>
          <!-- small boat seen from above, bow pointing to +x -->
          <g id="boat">
            <path class="wake" d="M-24 0 L-260 -46 M-24 0 L-260 46" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>
            <path class="wake" d="M-30 0 L-180 0" stroke="#fff" stroke-width="9" opacity=".5" stroke-linecap="round"/>
            <path d="M-26 -11 Q10 -12 30 0 Q10 12 -26 11 Z" fill="#fff"/>
            <rect x="-14" y="-6" width="16" height="12" rx="3" fill="#1d6fa3"/>
          </g>
          <g id="sailboat">
            <path class="wake" d="M-20 0 L-170 -26 M-20 0 L-170 26" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M-22 -8 Q8 -9 24 0 Q8 9 -22 8 Z" fill="#fff"/>
            <path d="M-8 0 L14 0 L-4 -34 Z" fill="currentColor" opacity=".95"/>
          </g>
          <g id="gull"><path d="M-22 0 Q-11 -10 0 0 Q11 -10 22 0" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></g>
        </defs>

        <!-- sea: sun glitter, ripples, moon path -->
        <g clip-path="url(#sea)">
          <g class="ripples"><path v-for="(p, i) in ripples" :key="i" :d="p.d" :stroke-width="p.sw" :style="p.style"/></g>
          <g class="glitter"><circle v-for="(c, i) in glitter" :key="i" :cx="c.cx" :cy="c.cy" :r="c.r" :style="c.style"/></g>
          <ellipse class="sunpath" cx="1900" cy="1020" rx="820" ry="330" fill="url(#sun-gold)" transform="rotate(-10 1900 1020)"/>
          <ellipse class="moonpath" cx="2050" cy="1180" rx="160" ry="420" fill="url(#glint)"/>
        </g>

        <!-- boats -->
        <g class="mover mover-1"><g transform="rotate(-166)"><use href="#boat"/></g></g>
        <g class="mover mover-2"><g transform="rotate(-26)"><use href="#sailboat"/></g></g>
        <g class="mover mover-3"><g transform="rotate(-164)"><use href="#sailboat"/></g></g>
        <g class="mover mover-4"><g transform="rotate(-13)"><use href="#sailboat"/></g></g>

        <!-- village lights (shown at night) -->
        <g class="lights"><circle v-for="(l, i) in lights" :key="i" :cx="l.cx" :cy="l.cy" :r="l.r" :style="l.style"/></g>

        <!-- cloud shadows on land/sea, then clouds -->
        <g class="clouds">
          <g class="cloud c1"><use href="#cloud-shadow" x="160" y="220"/><use href="#cloud"/></g>
          <g class="cloud c2"><use href="#cloud-shadow" x="160" y="220"/><use href="#cloud" transform="scale(.75)"/></g>
          <g class="cloud c3"><use href="#cloud-shadow" x="160" y="220"/><use href="#cloud" transform="scale(1.1)"/></g>
        </g>

        <!-- gulls -->
        <g class="gulls"><g class="gull g1"><use href="#gull"/></g><g class="gull g2"><use href="#gull" transform="scale(.8)"/></g><g class="gull g3"><use href="#gull" transform="scale(.65)"/></g></g>
      </svg>
    </div>

    <div class="hero-copy" :style="copyStyle">
      <p class="eyebrow">Νότια Εύβοια · Κόλπος Πεταλιών</p>
      <h1>Νημποριό</h1>
      <p class="lead">Με το Σύλλογο Οικιστών κρατάμε την ομορφιά του κόλπου ζωντανή</p>
      <div class="chips" aria-live="polite">
        <span class="chip" id="chip-air">🌡️ <b>{{ wx.chipAir }}</b> αέρας</span>
        <span class="chip" id="chip-sea">🌊 <b>{{ wx.chipSea }}</b> θάλασσα</span>
        <span class="chip" id="chip-sun">🌅 δύση <b>{{ wx.chipSun }}</b></span>
      </div>
      <div class="cta">
        <RouterLink class="btn btn-sun" to="/prosvasi/">Πώς θα έρθετε</RouterLink>
        <a class="btn btn-ghost" href="#nea">Τα νέα μας</a>
      </div>
    </div>

    <div class="phase-switch" role="group" aria-label="Δες τον κόλπο σε άλλη ώρα">
      <button v-for="[p, ico, label, title] in BUTTONS" :key="p" :data-phase="p" :aria-pressed="String(choice === p)" :title="title" @click="choose(p)">{{ ico }}<span>{{ label }}</span></button>
    </div>
    <p class="credit">Εικόνα: δορυφορική λήψη <span class="todo">[πηγή/άδεια χρήσης]</span></p>
    <svg class="wave-edge" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40 C240 90 480 0 720 30 S1200 80 1440 30 V80 H0Z"/></svg>
  </section>
</template>
