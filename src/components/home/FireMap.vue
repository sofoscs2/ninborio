<script setup>
import { ref, onMounted } from 'vue';
import { store } from '../../lib/util.js';

/* Daily fire-risk map (civilprotection.gov.gr).
   The file is named by forecast date (YYMMDD.jpg) inside a folder for the month it was
   uploaded (YYYY-MM), usually the day before. We try tomorrow, today and the past week. */
const HOME = 'https://civilprotection.gov.gr/';
const dateText = ref('Αναζήτηση του τελευταίου χάρτη…');
const hit = ref(null);

const pad = (n) => (n < 10 ? '0' : '') + n;
function fireCandidates() {
  const list = [], seen = {}, base = new Date(); base.setHours(12, 0, 0, 0);
  for (let off = 1; off >= -7; off--) {
    const d = new Date(base); d.setDate(d.getDate() + off);
    const name = String(d.getFullYear()).slice(2) + pad(d.getMonth() + 1) + pad(d.getDate()) + '.jpg';
    [0, -1, -2].forEach((back) => {
      const up = new Date(d); up.setDate(up.getDate() + back);
      const url = `${HOME}sites/default/files/${up.getFullYear()}-${pad(up.getMonth() + 1)}/${name}`;
      if (!seen[url]) { seen[url] = 1; list.push({ url, date: new Date(d), offset: off }); }
    });
  }
  return list;
}
function tryImage(url) {
  return new Promise((ok, fail) => {
    const img = new Image(), t = setTimeout(() => { img.src = ''; fail(); }, 8000);
    img.onload = () => { clearTimeout(t); img.naturalWidth > 50 ? ok(url) : fail(); };
    img.onerror = () => { clearTimeout(t); fail(); };
    img.src = url;
  });
}
function show(h) {
  const day = new Intl.DateTimeFormat('el-GR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(h.date));
  const label = h.offset === 1 ? 'Πρόβλεψη για αύριο, ' : h.offset === 0 ? 'Πρόβλεψη για σήμερα, ' : 'Τελευταίος διαθέσιμος χάρτης: ';
  dateText.value = label + day;
  hit.value = h;
}
onMounted(() => {
  const today = new Date().toDateString(), cached = store('nim-firemap');
  if (cached && cached.day === today) {
    if (cached.hit) show(cached.hit); else dateText.value = 'Δεν υπάρχει πρόσφατος χάρτης';
    return;
  }
  const list = fireCandidates();
  let k = 0;
  (function next() {
    if (k >= list.length) { dateText.value = 'Δεν υπάρχει πρόσφατος χάρτης'; store('nim-firemap', { day: today, hit: null }); return; }
    const c = list[k++];
    tryImage(c.url).then(() => {
      const h = { url: c.url, date: c.date.getTime(), offset: c.offset };
      store('nim-firemap', { day: today, hit: h }); show(h);
    }, next);
  })();
});
</script>

<template>
  <article class="card firemap" id="firemap">
    <header>
      <span class="badge">🔥 Πολιτική Προστασία</span>
      <h3>Κίνδυνος πυρκαγιάς</h3>
      <p class="fm-date" id="fm-date">{{ dateText }}</p>
    </header>
    <a class="fm-link" id="fm-link" :href="hit ? hit.url : HOME" target="_blank" rel="noopener">
      <img id="fm-img" alt="Χάρτης πρόβλεψης κινδύνου πυρκαγιάς της Γενικής Γραμματείας Πολιτικής Προστασίας" :src="hit ? hit.url : null" :hidden="!hit">
      <span v-if="!hit" class="fm-empty" id="fm-empty">Ο χάρτης εκδίδεται καθημερινά την αντιπυρική περίοδο (Μάιος–Οκτώβριος).</span>
    </a>
    <!-- an older map: say when new ones come out -->
    <span v-if="hit && hit.offset < 0" class="fm-empty" id="fm-empty">Νέοι χάρτες εκδίδονται καθημερινά την αντιπυρική περίοδο (Μάιος–Οκτώβριος).</span>
    <p class="source">Πηγή: <a :href="HOME" target="_blank" rel="noopener">civilprotection.gov.gr</a></p>
  </article>
</template>
