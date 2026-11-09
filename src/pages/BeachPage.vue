<script setup>
import SiteLayout from '../components/SiteLayout.vue';
import WaveEdge from '../components/WaveEdge.vue';
import { usePage } from '../composables/usePage.js';

usePage({
  path: '/paralia/',
  title: 'Η παραλία',
  description: 'Η παραλία του Νημποριού στη νότια Εύβοια: απάνεμος όρμος με άμμο σε όλη του την έκταση, ρηχά νερά για παιδιά, βυθός με ανεμώνες και ψάρια, πηγές μέσα στη θάλασσα και μια κρυφή παραλία στο τέλος του μονοπατιού.',
  image: '/assets/img/gallery/o-kolpos.webp',
});

const CHAPTERS = [
  ['ormos', 'Ο όρμος'], ['giati', 'Έξι λόγοι'], ['vythos', 'Κάτω από το νερό'], ['kryfi', 'Η κρυφή παραλία'],
  ['limanaki', 'Το λιμανάκι'], ['piges', 'Πηγές'],
];

const FACTS = [
  ['Ακτή', 'Άμμος', 'σε όλο το μήκος του όρμου'],
  ['Βάθος', 'Ρηχά', 'βαθαίνει σιγά σιγά'],
  ['Κοιτάζει', 'Δυτικά', 'προς τον Μαραθώνα'],
  ['Αέρας', 'Απάνεμο', 'οι λόφοι κόβουν το μελτέμι'],
  ['Από Αθήνα', '~2 ώρες', 'οδικώς ή με το πλοίο'],
];

const FEATURES = [
  ['f-sand', '🏖️', 'Παιχνίδι στα ρηχά', 'Η άμμος μπαίνει απαλά στο νερό και ο βυθός αργεί να χαθεί κάτω από τα πόδια. Οι μικροί κολυμβητές παίζουν με ασφάλεια και οι γονείς χαλαρώνουν.'],
  ['f-wind', '🍃', 'Ήρεμο νερό', 'Όταν το μελτέμι σηκώνει κύμα στα ανοιχτά, εδώ η θάλασσα μένει λάδι: ο κόλπος κάθεται χαμηλά, πίσω από ένα τόξο από βουνοπλαγιές.'],
  ['f-reef', '🐟', 'Μια βόλτα με μάσκα', 'Πάνω από την άμμο κολυμπούν μπαρμπούνια και γλώσσες, ενώ στις βραχώδεις άκρες οι ανεμώνες κλείνουν μόλις τις πλησιάσεις.'],
  ['f-sun', '💧', 'Δροσιά από τον βυθό', 'Σε μερικά σημεία αναβλύζει γλυκό νερό από τον πάτο, και μέσα στο μπάνιο νιώθεις ξαφνικά ένα κρύο ρεύμα γύρω σου.'],
  ['f-deep', '🐐', 'Ο κολπίσκος του μονοπατιού', 'Πάρτε το μονοπάτι προς τα βορειοδυτικά και θα φτάσετε σε μια ακρογιαλιά όπου συντροφιά σας κάνουν μόνο τα κατσίκια.'],
  ['f-calm', '🌿', 'Χώρος για όλους', 'Χωρίς μεγάλες μονάδες και χωρίς φασαρία: ακόμα και στην καρδιά του καλοκαιριού βρίσκεις μια γωνιά της αμμουδιάς για την πετσέτα σου.'],
];

const SOURCES = [
  ['Βικιπαίδεια: «Νιμπορειό Εύβοιας»', 'https://el.wikipedia.org/wiki/%CE%9D%CE%B9%CE%BC%CF%80%CE%BF%CF%81%CE%B5%CE%B9%CF%8C_%CE%95%CF%8D%CE%B2%CE%BF%CE%B9%CE%B1%CF%82'],
  ['Fosonline: «Νημποριό: Ένας παράδεισος δύο ώρες από την Αθήνα»', 'https://www.fosonline.gr/travel/article/182428/nimporio-enas-paradeisos-dyo-ores-apo-tin-athina'],
  ['Μηχανή του Χρόνου: «Νημποριό, το ψαροχώρι με τα Δρακόσπιτα και το αρχαίο λατομείο»', 'https://www.mixanitouxronou.gr/nimporio-to-psarochori-me-ta-drakospita-kai-to-archaio-latomeio-kindyneyei-na-ginei-aioliko-parko/'],
  ['iefimerida: «Νημπορειό Εύβοιας»', 'https://www.iefimerida.gr/travel/nimporeio-eyboias-exotiko-mantri-paralia'],
  ['Travelstyle: «Νημποριό: Ένας μαγικός κόλπος στην Εύβοια»', 'https://www.travelstyle.gr/nimporio-enas-magikos-kolpos-stin-eyvoia-me-pentakathara-galana-nera/'],
  ['Ghetto Magazine: «Νημποριό: Η παραλία με την καταγάλανη θάλασσα»', 'https://ghettomagazine.gr/nhmporio-h-paralia-me-thn-katagalanh-thalassa-sthn-opoia-bgainoun-phges/'],
];
</script>

<template>
  <SiteLayout>
    <section class="page-hero paralia-hero">
      <div class="wrap">
        <p class="kicker">Η παραλία</p>
        <h1>Χρυσή άμμος, γαλάζια νερά, <em>λίγος αέρας</em></h1>
        <p>Ένας μεγάλος, βαθύς και απάνεμος όρμος με άμμο από άκρη σε άκρη, νερά που μένουν ρηχά για πολλά μέτρα και έναν βυθό που αξίζει τη μάσκα. Δύο ώρες από την Αθήνα, και όμως ήσυχος σαν να είναι πολύ πιο μακριά.</p>
        <nav class="hs-chapters" aria-label="Ενότητες">
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
            <p class="kicker">Ο όρμος</p>
            <h2>Ένας κόλπος <em>κρυμμένος στους λόφους</em></h2>
            <p>Το Νημποριό βρίσκεται στη νότια Εύβοια, μεταξύ Στύρων και Μαρμαρίου, με τον Μαραθώνα ακριβώς στην απέναντι ακτή. Το λένε και <strong>Μπόρια</strong>. Είναι μια βαθιά, πλατιά εσοχή της ακτής στα Πεταλιά, με το στόμιο στραμμένο στη δύση και στις ακτές της Αττικής απέναντι.</p>
            <p>Από τις πλαγιές τρέχουν ρέματα που ανοίγουν σε μικρά, ίσια χωράφια λίγο πριν από το κύμα, και μπροστά τους ξεκινά η αμμουδιά. Στα ρηχά το νερό είναι σχεδόν διάφανο, ενώ λίγο πιο έξω σκουραίνει σε ένα βαθύ μπλε.</p>
            <p>Τα καθαρά νερά και ο ανέγγιχτος χαρακτήρας του τράβηξαν από νωρίς φυσιολάτρες, ακόμα και γνωστά πρόσωπα: λέγεται ότι εδώ ερχόταν και η Μαρία Κάλλας. Οι πρώτοι επισκέπτες έφταναν με καΐκι, γιατί δρόμος δεν υπήρχε, και μερικοί έρχονται ακόμα και σήμερα από τη θάλασσα.</p>
          </div>
          <figure class="hs-figure">
            <img src="/assets/img/gallery/o-kolpos.webp" alt="Ο κόλπος του Νημποριού με τα γαλαζοπράσινα νερά και τους λόφους γύρω του" width="1800" height="1151" loading="lazy">
            <figcaption>Ο κόλπος του Νημποριού. Αρχείο Συλλόγου.</figcaption>
          </figure>
        </div>
      </section>

      <!-- why here -->
      <section class="beach hs-sec" id="giati">
        <div class="wrap">
          <p class="kicker">Τι το κάνει ξεχωριστό</p>
          <h2>Έξι λόγοι <em>να βουτήξετε εδώ</em></h2>
          <div class="features beach-features">
            <article v-for="[tone, ico, t, s] in FEATURES" :key="t" class="feature" :class="tone"><span>{{ ico }}</span><h3>{{ t }}</h3><p>{{ s }}</p></article>
          </div>
        </div>
      </section>

      <!-- under water -->
      <section class="hs-sec hs-dark" id="vythos">
        <div class="wrap hs-split">
          <div>
            <p class="kicker">Κάτω από το νερό</p>
            <h2>Ανεμώνες, μπαρμπούνια <em>και γλυκό νερό</em></h2>
            <p>Η άμμος συνεχίζει μέσα στη θάλασσα σε όλη την έκταση του όρμου, και ο βυθός κατεβαίνει ομαλά, χωρίς απότομα σκαλοπάτια. Γι' αυτό το Νημποριό είναι από τις πιο ασφαλείς παραλίες για παιδιά και για όσους δεν κολυμπούν καλά.</p>
            <p>Με μια μάσκα ο βυθός ζωντανεύει: θαλάσσιες ανεμώνες που μαζεύονται μόλις πλησιάσεις, πολλά είδη ψαριών, ανάμεσά τους μπαρμπούνια και γλώσσες στην άμμο, και στα βράχια των άκρων αχινοί.</p>
            <p>Το πιο παράξενο είναι οι <strong>πηγές</strong>: σε σημεία του όρμου βγαίνει γλυκό νερό από τον βυθό. Θα το καταλάβετε από τη στιγμή που το νερό γύρω σας γίνεται ξαφνικά πιο δροσερό, ακόμα και στο κατακαλόκαιρο.</p>
            <p class="beach-tip">Για τα βράχια στις άκρες, πάρτε παπουτσάκια θαλάσσης.</p>
          </div>
          <figure class="hs-figure">
            <img src="/assets/img/gallery/petres-kai-nera.webp" alt="Πέτρες κάτω από διάφανα, καθαρά νερά" width="1200" height="800" loading="lazy">
            <figcaption>Πέτρες και καθαρά νερά στην άκρη του όρμου.</figcaption>
          </figure>
        </div>
      </section>

      <!-- hidden beach -->
      <section class="hs-sec hs-sand" id="kryfi">
        <div class="wrap hs-split hs-photo-right">
          <div>
            <p class="kicker">Η κρυφή παραλία</p>
            <h2>Στο τέλος <em>του μονοπατιού</em></h2>
            <p>Εκεί που τελειώνει η κεντρική αμμουδιά ξεκινά ένα μονοπάτι προς τα βορειοδυτικά, ανάμεσα σε πέτρες και θάμνους. Οδηγεί σε έναν μικρότερο κολπίσκο με εξίσου γαλάζια νερά, όπου δρόμος δεν φτάνει.</p>
            <p>Εκεί, αντί για λουόμενους, συνήθως θα βρείτε κατσίκια και πρόβατα να ξεκουράζονται στη σκιά από μικρά δέντρα, ανάμεσα σε ξερολιθιές και σε ένα παλιό μαντρί. Ένα σκηνικό σχεδόν εξωτικό, για ένα μπάνιο εντελώς διαφορετικό.</p>
            <p class="beach-tip">Πάρτε μαζί σας νερό, καπέλο και κλειστά παπούτσια για το μονοπάτι.</p>
          </div>
          <figure class="hs-figure">
            <img src="/assets/img/gallery/monopati.webp" alt="Πέτρινο μονοπάτι ανάμεσα σε θάμνους" width="1200" height="800" loading="lazy">
            <figcaption>Πέτρινο μονοπάτι γύρω από τον κόλπο.</figcaption>
          </figure>
        </div>
      </section>

      <!-- the little harbour -->
      <section class="hs-sec" id="limanaki">
        <div class="wrap hs-split">
          <div>
            <p class="kicker">Το λιμανάκι</p>
            <h2>Ίχνη από <em>το λατομείο</em></h2>
            <p>Ο οικισμός που βλέπετε στα ψηλά γεννήθηκε την εποχή του λατομείου, όταν η πέτρα του λόφου μεταφερόταν πάνω σε ράγες. Τα χωράφια γύρω ανήκαν σε ανθρώπους από τα Κάψαλα, που καλλιεργούσαν εδώ τα μποστάνια τους.</p>
            <p>Στο λιμανάκι θα δείτε <strong>τρία μικρά πέτρινα καμαράκια</strong>, χτισμένα για τις ανάγκες του λατομείου, που αργότερα τα χρησιμοποιούσαν οι ψαράδες. Λίγο πιο πέρα στέκει το πιο γραφικό σημείο του κόλπου: ένα <strong>σπίτι μέσα στη θάλασσα</strong>, φτιαγμένο για να προσφέρει νερό και καφέ στους εργάτες του λατομείου.</p>
            <p>Για δεκαετίες ο όρμος ήταν το απάγκιο των ψαράδων των Νέων Στύρων, που έβρισκαν εδώ καταφύγιο όταν χαλούσε ο καιρός. Και το εκκλησάκι του <strong>Προφήτη Ηλία</strong> είναι χτισμένο, ασυνήθιστα, κοντά στη θάλασσα και όχι σε κορυφή βουνού, όπως αλλού στην Ελλάδα.</p>
            <p><RouterLink to="/istoria/">Η ιστορία του κόλπου →</RouterLink></p>
          </div>
          <figure class="hs-figure beach-tall">
            <img src="/assets/img/gallery/spiti-sto-kyma.webp" alt="Σπίτι δίπλα στο κύμα" width="800" height="1200" loading="lazy">
            <figcaption>Σπίτι δίπλα στο κύμα.</figcaption>
          </figure>
        </div>
      </section>

      <!-- sources -->
      <section class="hs-sec hs-sources-sec" id="piges">
        <div class="wrap">
          <aside class="hs-card hs-sources">
            <h3>Πηγές</h3>
            <ul>
              <li v-for="[t, u] in SOURCES" :key="u"><a :href="u" target="_blank" rel="noopener">{{ t }}</a></li>
            </ul>
            <p class="hs-note">Έχετε ωραίες φωτογραφίες από την παραλία ή τον βυθό; <a href="https://m.me/Nimborio" target="_blank" rel="noopener">Στείλτε μας μήνυμα</a>.</p>
          </aside>
        </div>
      </section>
    </main>
  </SiteLayout>
</template>
