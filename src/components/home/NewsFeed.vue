<script setup>
import { ref, reactive, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { reduceMotion, FB_PAGE } from '../../lib/util.js';
import { story, fmtDate } from '../../lib/fbPosts.js';
import { openPost } from './NewsReader.vue';

/* News from the Facebook Page.
   Default: the latest posts from /api/facebook.php, shown in the site's own design (3 first, then 4 more each time).
   Fallback: Facebook's embedded posts from /assets/data/fb-posts.json.
   Previews: ?fb=demo (site design, example posts), ?fb=embeds (Facebook's embedded posts), ?fb=plugin (Facebook Page box). */
const FIRST = 3, STEP = 4;
const mode = ref('loading');            // loading · embeds · stories · plugin
const feed = ref(null);
const demo = ref(false);

/* ---------- Facebook embedded posts ---------- */
let EMBEDS = [];
const batches = ref([]);                // [{ id, width, urls }]: Facebook fills them in, Vue leaves them alone (v-memo)
const embedded = computed(() => batches.value.reduce((n, b) => n + b.urls.length, 0));
const batchEls = {};

function loadSdk() {
  if (window.FB) return Promise.resolve(window.FB);
  return new Promise((ok, fail) => {
    window.fbAsyncInit = () => { window.FB.init({ xfbml: false, version: 'v26.0' }); ok(window.FB); };
    const s = document.createElement('script');
    s.async = true; s.defer = true; s.crossOrigin = 'anonymous';
    s.src = 'https://connect.facebook.net/el_GR/sdk.js';
    s.onerror = fail;
    document.body.appendChild(s);
  });
}
async function embedMore() {
  const n = embedded.value;
  const urls = EMBEDS.slice(n, n + (n ? STEP : FIRST));
  const width = Math.max(350, Math.min(750, feed.value.clientWidth));
  const id = batches.value.length;
  batches.value.push({ id, width, urls });
  await nextTick();
  const FB = await loadSdk();
  FB.XFBML.parse(batchEls[id]);
}
function renderEmbeds(urls) {
  EMBEDS = urls;
  mode.value = 'embeds';
  return embedMore();
}
function postLinks() {
  return fetch('/api/facebook.php', { headers: { Accept: 'application/json' } })
    .then((r) => { if (!r.ok) throw 0; return r.json(); })
    .then((j) => { const u = (j.posts || []).map((p) => p.url).filter(Boolean); if (!u.length) throw 0; return u; })
    .catch(() => fetch('/assets/data/fb-posts.json').then((r) => r.json())
      .then((j) => { if (!j.posts || !j.posts.length) throw 0; return j.posts; }));
}

/* ---------- the site's own news design (?fb=site / ?fb=demo) ---------- */
const POSTS = ref([]);
const shown = ref(0);
const stories = computed(() => POSTS.value.slice(0, shown.value).map(story));
const visible = reactive(new Set());    // stories that have faded in
const motion = ref(false);

function showMore() {
  const from = shown.value;
  const next = POSTS.value.slice(from, from + (from ? STEP : FIRST));
  shown.value += next.length;
  next.forEach((p, k) => {
    if (!motion.value) visible.add(p.id);
    else setTimeout(() => visible.add(p.id), 60 + k * 90);
  });
}
function renderPosts(posts, isDemo) {
  POSTS.value = posts.map((p, i) => ({ ...p, id: String(p.id || i).replace(/[^\w-]/g, '') }));
  shown.value = 0;
  demo.value = !!isDemo;
  mode.value = 'stories';
  showMore();
  openFromHash();
}
function loadDemo() {
  return fetch('/assets/data/demo-posts.json').then((r) => r.json()).then((j) => renderPosts(j.posts, true));
}
function openFromHash() {
  const m = location.hash.match(/^#post-([\w-]+)$/);
  if (!m) return;
  const p = POSTS.value.find((x) => x.id === m[1]);
  if (p) openPost(story(p));
}

/* ---------- Facebook Page box ---------- */
const pluginSrc = 'https://www.facebook.com/plugins/page.php?href=' + encodeURIComponent(FB_PAGE) +
  '&tabs=timeline&width=500&height=620&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&locale=el_GR';
const renderPlugin = () => { mode.value = 'plugin'; };

const more = () => (mode.value === 'embeds' ? embedMore() : showMore());
const moreHidden = computed(() => {
  if (mode.value === 'embeds') return embedded.value >= EMBEDS.length;
  if (mode.value === 'stories') return shown.value >= POSTS.value.length;
  return true;
});

onMounted(() => {
  motion.value = !reduceMotion();
  addEventListener('hashchange', openFromHash);
  const isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  const fb = new URLSearchParams(location.search).get('fb');
  const embeds = () => postLinks().then(renderEmbeds).catch(renderPlugin);
  if (fb === 'plugin') return renderPlugin();
  if (fb === 'demo') return loadDemo().catch(renderPlugin);
  if (fb === 'embeds') return embeds();
  // Default: the latest posts in the site's own design. Without PHP (on this computer) it shows the
  // example posts; on the live site, if Facebook can't be reached, it falls back to Facebook's embedded posts.
  fetch('/api/facebook.php', { headers: { Accept: 'application/json' } })
    .then((r) => { if (!r.ok) throw 0; return r.json(); })
    .then((j) => { if (j && j.posts && j.posts.length) renderPosts(j.posts); else throw 0; })
    .catch(() => (isLocal ? loadDemo().catch(embeds) : embeds()));
});
onBeforeUnmount(() => removeEventListener('hashchange', openFromHash));
</script>

<template>
  <div class="fb-feed" :class="{ 'fb-embeds': mode === 'embeds' }" id="fb-feed" ref="feed" aria-live="polite">
    <template v-if="mode === 'loading'">
      <div class="fb-skeleton big"></div><div class="fb-skeleton"></div><div class="fb-skeleton"></div>
    </template>

    <template v-else-if="mode === 'embeds'">
      <div v-for="b in batches" :key="b.id" :ref="(el) => { if (el) batchEls[b.id] = el; }" v-memo="[b.id]">
        <div v-for="url in b.urls" :key="url" class="fb-post" :data-href="url" :data-width="String(b.width)" data-show-text="true">
          <blockquote :cite="url" class="fb-xfbml-parse-ignore"><a :href="url">Ανάρτηση στο Facebook</a></blockquote>
        </div>
      </div>
    </template>

    <template v-else-if="mode === 'stories'">
      <p v-if="demo" class="demo-note">Παράδειγμα: έτσι θα εμφανίζονται οι αναρτήσεις του Facebook όταν συνδεθεί η σελίδα. Τα κείμενα είναι δοκιμαστικά.</p>
      <article v-for="(p, k) in stories" :key="p.id" class="story" :class="{ featured: k === 0, reveal: motion, in: motion && visible.has(p.id) }">
        <div class="pic" :class="{ noimg: !p.imgs.length }">
          <img v-if="p.imgs.length" alt="" :loading="k === 0 ? 'eager' : 'lazy'" :src="p.imgs[0]">
          <template v-else>🌊</template>
          <span v-if="p.type === 'video'" class="play" aria-hidden="true">▶</span>
          <span v-if="p.imgs.length > 1" class="count">📷 {{ p.imgs.length }}</span>
        </div>
        <div class="txt">
          <div class="meta"><span class="tag">{{ p.tag }}</span><time v-if="p.date" :datetime="p.date">{{ fmtDate(p.date) }}</time></div>
          <h3><a :href="'#post-' + p.id">{{ p.title }}</a></h3>
          <p v-if="p.excerpt">{{ p.excerpt }}</p>
          <span class="readmore" aria-hidden="true">Διαβάστε περισσότερα →</span>
        </div>
      </article>
    </template>

    <div v-else class="fb-plugin">
      <iframe title="Οι αναρτήσεις της σελίδας Nimborio στο Facebook" loading="lazy" allow="encrypted-media" :src="pluginSrc"></iframe>
      <div><h3>Οι τελευταίες αναρτήσεις μας</h3><p>Φωτογραφίες, εκδηλώσεις και ό,τι νέο συμβαίνει στο Νημποριό, κατευθείαν από τη σελίδα μας στο Facebook.</p></div>
    </div>
  </div>
  <div class="more-wrap"><button class="btn btn-more" id="fb-more" :hidden="moreHidden" @click="more">Περισσότερα νέα</button></div>
</template>
