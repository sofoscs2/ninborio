<script setup>
import { reactive, onMounted, onBeforeUnmount } from 'vue';
import { beaufort, compass } from '../../lib/util.js';

/* EMY weather station Στύρα Ευβοίας (id 307): measurements every 5 min, last 24 hours */
const EMY_STATION = 'https://api.emy.gr/api/microstep/cities/307/measurements';
const st = reactive({ when: 'Φόρτωση μετρήσεων…', temp: '—°', range: '', hum: '—', wind: '—', gust: '—', pres: '—', rain: '—', dew: '—', area: '', line: '' });
const c1 = (v) => v.toFixed(1).replace('.', ',') + '°';
const TZ = { hourCycle: 'h23', timeZone: 'Europe/Athens' };

function loadStation() {
  fetch(EMY_STATION).then((r) => { if (!r.ok) throw 0; return r.json(); }).then((j) => {
    const all = (j.data && j.data.measurements) || [];
    const ms = all.filter((m) => m.temp != null);
    if (!ms.length) throw 0;
    const last = ms[ms.length - 1], when = new Date(last.datetime);
    const mins = Math.round((Date.now() - when) / 60000);
    const time = when.toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit', ...TZ });
    st.when = mins > 120
      ? 'Τελευταία μέτρηση: ' + when.toLocaleString('el-GR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', ...TZ }) + ' (ο σταθμός δεν στέλνει τώρα)'
      : 'Μέτρηση στις ' + time + (mins > 1 ? ' · πριν ' + mins + ' λεπτά' : '');
    st.temp = c1(last.temp);
    const temps = ms.map((m) => m.temp);
    const lo = Math.min(...temps), hi = Math.max(...temps);
    st.range = '24ωρο: ελάχιστη ' + c1(lo) + ' · μέγιστη ' + c1(hi);
    if (last.humidity != null) st.hum = Math.round(last.humidity) + '%';
    if (last.windSpeed != null) st.wind = beaufort(last.windSpeed * 3.6) + ' Bf' + (last.windSpeed >= 0.5 && last.windDirection != null ? ' ' + compass(last.windDirection) : '');
    if (last.windGust != null) st.gust = Math.round(last.windGust * 3.6) + ' χλμ/ώ';
    if (last.pressure != null) st.pres = Math.round(last.pressure) + ' hPa';
    if (last.dewPoint != null) st.dew = Math.round(last.dewPoint) + '°';
    // rain is reported per 5-minute reading: add up the whole day
    const rain = all.reduce((s, m) => s + (m.precipitation || 0), 0);
    st.rain = rain < 0.05 ? '0 mm' : rain.toFixed(1).replace('.', ',') + ' mm';
    // temperature line of the last 24 hours
    const t0 = new Date(ms[0].datetime).getTime(), span = (when.getTime() - t0) || 1, pad = (hi - lo) || 1;
    const pts = ms.map((m) => ((new Date(m.datetime).getTime() - t0) / span * 200).toFixed(1) + ',' + (46 - (m.temp - lo) / pad * 40).toFixed(1)).join(' ');
    st.area = pts + ' 200,50 0,50';
    st.line = pts;
  }).catch(() => { st.when = 'Οι μετρήσεις της ΕΜΥ δεν είναι διαθέσιμες τώρα.'; });
}

let timer;
onMounted(() => { loadStation(); timer = setInterval(loadStation, 10 * 60 * 1000); });
onBeforeUnmount(() => clearInterval(timer));
</script>

<template>
  <article class="card station" id="station" aria-live="polite">
    <header>
      <span class="badge st-badge">📡 ΕΜΥ · Μετεωρολογικός σταθμός</span>
      <h3>Στύρα Ευβοίας, τώρα</h3>
      <p class="st-when" id="st-when">{{ st.when }}</p>
    </header>
    <div class="st-now">
      <strong id="st-temp">{{ st.temp }}</strong>
      <svg class="st-spark" id="st-spark" viewBox="0 0 200 50" preserveAspectRatio="none" role="img" aria-label="Θερμοκρασία τελευταίου 24ώρου">
        <template v-if="st.line">
          <polyline :points="st.area" class="area"/>
          <polyline :points="st.line" class="line"/>
        </template>
      </svg>
    </div>
    <p class="st-range" id="st-range">{{ st.range }}</p>
    <dl class="stats">
      <div><dt>Υγρασία</dt><dd id="st-hum">{{ st.hum }}</dd></div>
      <div><dt>Άνεμος</dt><dd id="st-wind">{{ st.wind }}</dd></div>
      <div><dt>Ριπή</dt><dd id="st-gust">{{ st.gust }}</dd></div>
      <div><dt>Πίεση</dt><dd id="st-pres">{{ st.pres }}</dd></div>
      <div><dt>Βροχή 24ώρου</dt><dd id="st-rain">{{ st.rain }}</dd></div>
      <div><dt>Σημείο δρόσου</dt><dd id="st-dew">{{ st.dew }}</dd></div>
    </dl>
    <p class="source">Μετρήσεις: <a href="https://www.emy.gr/hnms-stations" target="_blank" rel="noopener">ΕΜΥ, Δίκτυο Σταθμών</a> · σταθμός στα 528 μ., 2 χλμ. από τον κόλπο</p>
  </article>
</template>
