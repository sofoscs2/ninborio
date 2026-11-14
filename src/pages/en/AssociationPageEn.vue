<script setup>
// English version of src/pages/AssociationPage.vue
import SiteLayout from '../../components/SiteLayout.vue';
import WaveEdge from '../../components/WaveEdge.vue';
import { usePage } from '../../composables/usePage.js';

usePage({
  path: '/syllogos/',
  en: true,
  title: 'The Association',
  description: 'The Cultural, Nature-Loving and Development Association of Nimborio Residents, Evia: its history, board, statutes and how to contact it.',
});
</script>

<template>
  <SiteLayout>
    <section class="page-hero syl-hero">
      <div class="wrap">
        <img class="logo" src="/assets/img/syllogos/logo.png" alt="Logo of the Nimborio Association" width="170" height="170">
        <div>
          <p class="kicker" style="color:var(--sun)">Since 1979</p>
          <h1>The Association</h1>
          <p>The Cultural – Nature-Loving – Development Association of Nimborio Residents, based in Nimborio, Evia.</p>
          <p><a class="btn btn-sun small" href="#ds">Board</a> <a class="btn btn-ghost small" href="#katastatiko">Statutes</a> <a class="btn btn-ghost small" href="#epikoinonia">Contact</a></p>
        </div>
      </div>
      <WaveEdge />
    </section>

    <main id="main">
      <section class="syl-sec" id="syllogos">
        <div class="wrap syl-two">
          <div class="prose">
            <p class="kicker">Who we are</p>
            <h2>A few words about <em>the Association</em></h2>
            <p>The first statutes of the association date from 18 November 1979. It began as the “Union of Residents and Landowners of Nimborio, Evia”. In 2014 that society was dissolved and a new one was founded, the “Cultural – Nature-Loving – Development Association of Nimborio Residents”, based in Nimborio, Evia.</p>
            <p>In the 1980s, and even more in the 1990s, building grew, and so did the lack of basic infrastructure. The association, which already existed, became very active. With great effort and with money from its own members, it laid the groundwork and connected Nimborio to the electricity (DEI) and telephone (OTE) networks. It drilled a well and built the local water network, which the municipality runs today. Together with the municipality it improved the roads, above all the main one, and it arranged regular rubbish collection.</p>
            <ul class="syl-timeline">
              <li><b>1979</b><span>First statutes: “Union of Residents and Landowners of Nimborio, Evia”.</span></li>
              <li><b>2014</b><span>New society: the Cultural – Nature-Loving – Development Association of Nimborio Residents.</span></li>
              <li><b>2023</b><span>New board (13 August).</span></li>
            </ul>
          </div>
          <figure>
            <img src="/assets/img/syllogos/molos.webp" alt="The jetty of Nimborio" width="859" height="568" loading="lazy">
            <figcaption>The jetty of Nimborio.</figcaption>
            <img src="/assets/img/syllogos/simaia.webp" alt="The Association’s flag above the sea" width="1200" height="731" loading="lazy" style="margin-top:18px">
            <figcaption>The Association’s flag.</figcaption>
          </figure>
        </div>
      </section>

      <section class="syl-sec" id="istoria">
        <div class="wrap syl-two">
          <div class="prose">
            <p class="kicker">Nimborio</p>
            <h2>The story of <em>the village</em></h2>
            <p>On the border between the old municipalities of Styra and Marmari lies a small seaside village with a particularly beautiful beach: Nimborio. The name comes from joining the Greek words for “new” and “trading post”.</p>
            <p>Nimborio is a small village around a bay in south Evia, between Styra and Marmari, with Marathon on the opposite shore. Since the 2011 local government reform it belongs to the Municipality of Karystos, and in the 2011 census it had 50 residents. Hills rise around it, crossed by streams and ravines. To the north is an abandoned quarry, and on the slopes around are three chapels: Profitis Ilias, Agios Prokopios and Agios Ioannis. The name recalls the time when the bay was the port of the mountain villages: a “new market”, as the Byzantines called it.</p>
            <p>In the early 1970s the visitors of Nimborio began to want better living conditions. The first houses were built almost makeshift, with enormous effort and serious shortages. In the 1980s, and even more in the 1990s, building grew, and so did the lack of basic infrastructure. Temporary solutions were generators, gas and oil lamps, and pipes laid on the ground that brought water to the houses from the springs in the hills. The main road was always rough, and the small ones were basic, kept up by the residents themselves.</p>
            <p>The natural beauty of Nimborio, its character “untouched” by modern life, the clean sea and its peace and quiet drew nature lovers from Athens, who came more and more often from the late 1950s and early 1960s. Life for them was simple and delightful: sleeping in a sleeping bag or a tent, local food and wine with no menu to choose from, ouzo by the waves with octopus or fried okra. Water from the well, even if it tasted brackish or was icy in the evening shower. Swimming, fishing and singing, with no radio or CDs, all together as one group of friends. There were also the “official” feasts, the small festivals of Profitis Ilias and Agios Ioannis, when people from the villages around came down with their food.</p>
            <p>The growing number of residents, and above all of children, mostly in the two summer months, led the Association to build up a lively cultural programme too. It all began with lessons in traditional and modern Greek dances in the courtyard of Profitis Ilias, which brought the place to life. There were exhibitions of folk art and photography, and volunteer parents taught the children plays, which they staged with great success and with beautiful sets and costumes. For the adults there are dinners and yearly dances, sometimes in Nimborio and sometimes in Athens.</p>
            <p class="tiny">Source: <a href="https://el.wikipedia.org/wiki/%CE%9D%CE%B9%CE%BC%CF%80%CE%BF%CF%81%CE%B5%CE%B9%CF%8C_%CE%95%CF%8D%CE%B2%CE%BF%CE%B9%CE%B1%CF%82" target="_blank" rel="noopener" hreflang="el">Wikipedia (Greek)</a></p>
          </div>
          <figure>
            <img src="/assets/img/syllogos/palio-nimporio.webp" alt="Old black-and-white photo of Nimborio" width="900" height="1205" loading="lazy">
            <figcaption>Old Nimborio. From the archive of Dimitris Sinekoglou.</figcaption>
            <img src="/assets/img/syllogos/xoroi.webp" alt="Children dancing in the courtyard in the evening" width="1200" height="900" loading="lazy" style="margin-top:18px">
            <figcaption>Dances and feasts of the Association.</figcaption>
          </figure>
        </div>
      </section>

      <section class="syl-sec" id="ds">
        <div class="wrap">
          <p class="kicker">Since 13 August 2023</p>
          <h2>The <em>board</em></h2>
          <p class="intro">On 13 August 2023 the new board of the Cultural Nature-Loving Development Association of Nimborio Residents met in Nimborio, as elected by the General Assembly held the same day, with a single item on the agenda: to assign its roles. After discussion, the members agreed unanimously on the following:</p>
          <ul class="board">
            <li><span>President</span><strong>Giannis Kapris</strong></li>
            <li><span>Vice-president</span><strong>Maria Myzithra</strong></li>
            <li><span>Secretary</span><strong>Angeliki Papageorgiou</strong></li>
            <li><span>Treasurer</span><strong>Voula Tsoli</strong></li>
            <li><span>Member</span><strong>Katerina Raptopoulou</strong></li>
            <li><span>Member</span><strong>Pantelis Pateniotis</strong></li>
            <li><span>Member</span><strong>Ilias Krasadakis</strong></li>
          </ul>
        </div>
      </section>

      <section class="syl-sec" id="katastatiko">
        <div class="wrap">
          <p class="kicker">Documents</p>
          <h2>Statutes</h2>
          <div class="doc-card">
            <span class="ico" aria-hidden="true">📜</span>
            <div><h3>Certified statutes of the Nimborio, Evia association</h3><p>Read the Association’s statutes (PDF in Greek, 3 MB).</p></div>
            <a class="btn btn-sun" href="/assets/docs/katastatiko-syllogou-nimboriou.pdf" target="_blank" rel="noopener" hreflang="el">Read them</a>
          </div>
        </div>
      </section>

      <section class="syl-sec" id="epikoinonia">
        <div class="wrap">
          <p class="kicker">Contact</p>
          <h2>Get in <em>touch</em></h2>
          <p class="intro">For questions, ideas, joining the Association or photos for the website, send us a message on the Association’s Facebook page.</p>
          <p><a class="btn btn-fb" href="https://m.me/Nimborio" target="_blank" rel="noopener">💬 Message on Facebook</a> <a class="btn btn-ghost-dark" href="https://www.facebook.com/Nimborio/" target="_blank" rel="noopener">Our page</a></p>
        </div>
      </section>
    </main>
  </SiteLayout>
</template>
