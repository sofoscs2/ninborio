<script setup>
import { useHead } from '@unhead/vue';
import SiteLayout from '../components/SiteLayout.vue';
import WaveEdge from '../components/WaveEdge.vue';

useHead({
  title: 'Χρήσιμες πληροφορίες & τηλέφωνα · Νημποριό Εύβοιας',
  meta: [{ name: 'description', content: 'Τηλέφωνα έκτακτης ανάγκης, Δήμος Καρύστου, λιμεναρχεία, νοσοκομείο και πυροσβεστική για το Νημποριό Εύβοιας.' }],
  link: [{ rel: 'canonical', href: 'https://nimborio.com/xrisima/' }],
});

const SOS = [
  ['112', 'Ευρωπαϊκός αριθμός έκτακτης ανάγκης', 'Δωρεάν, από κάθε κινητό, και χωρίς κάρτα SIM'],
  ['199', 'Πυροσβεστική', 'Φωτιά, διάσωση'],
  ['166', 'ΕΚΑΒ', 'Ασθενοφόρο'],
  ['100', 'Αστυνομία', ''],
  ['108', 'Λιμενικό', 'Έκτακτα στη θάλασσα'],
];
const PHONES = [
  ['Λιμεναρχείο Καρύστου', '+302224022227', '22240 22227'],
  ['Λιμεναρχείο Στύρων', '+302224041266', '22240 41266'],
  ['Νοσοκομείο Καρύστου', '+302224350100', '22243 50100'],
  ['Πυροσβεστική Καρύστου', '+302224026195', '22240 26195'],
];
</script>

<template>
  <SiteLayout>
    <section class="page-hero xr-hero">
      <div class="wrap">
        <p class="kicker" style="color:#fff3c4">Νημποριό · Νότια Εύβοια</p>
        <h1>Χρήσιμες πληροφορίες</h1>
        <p>Τηλέφωνα για ώρα ανάγκης και για τις υπηρεσίες της περιοχής. Πατήστε έναν αριθμό από το κινητό για να καλέσετε.</p>
      </div>
      <WaveEdge />
    </section>

    <main id="main">
      <section class="wrap" style="padding:36px 0 10px">
        <p class="kicker">Έκτακτη ανάγκη</p>
        <h2>Πρώτα <em>αυτά</em></h2>
        <ul class="phones sos">
          <li v-for="[num, name, note] in SOS" :key="num"><a class="big" :href="'tel:' + num">{{ num }}</a><strong>{{ name }}</strong><small v-if="note">{{ note }}</small></li>
        </ul>
        <p>Το καλοκαίρι, δείτε τον <RouterLink to="/#simera">χάρτη κινδύνου πυρκαγιάς της ημέρας</RouterLink> στην αρχική σελίδα.</p>
      </section>

      <section class="wrap" style="padding:30px 0 40px">
        <p class="kicker">Υπηρεσίες της περιοχής</p>
        <h2>Χρήσιμα <em>τηλέφωνα</em></h2>
        <ul class="phones">
          <li><strong>Γενική Γραμματεία Πολιτικής Προστασίας</strong><span class="big">213510931</span><small><span class="todo">[ελέγξτε τον αριθμό: έχει 9 ψηφία]</span> · <a href="https://civilprotection.gov.gr/" target="_blank" rel="noopener">civilprotection.gov.gr</a></small></li>
          <li><strong>Δήμος Καρύστου</strong><a class="big" href="tel:+302224350001">22243 50001</a><small><a href="http://www.dimoskarystou.gr" target="_blank" rel="noopener">dimoskarystou.gr</a></small></li>
          <li v-for="[name, tel, shown] in PHONES" :key="tel"><strong>{{ name }}</strong><a class="big" :href="'tel:' + tel">{{ shown }}</a></li>
        </ul>
        <p class="intro">Λείπει κάποιο τηλέφωνο ή άλλαξε; <a href="https://m.me/Nimborio" target="_blank" rel="noopener">Στείλτε μας μήνυμα</a>.</p>
      </section>
    </main>
  </SiteLayout>
</template>
