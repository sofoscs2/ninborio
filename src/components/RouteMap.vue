<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import 'leaflet/dist/leaflet.css';

/* Map of the routes from Athens to Νημποριό. All routes are drawn; the chosen one is bold and the map zooms to it.
   Leaflet only runs in the browser, so it is loaded when the map appears. */
const props = defineProps({
  data: { type: Object, required: true },   // src/data/routes.json
  options: { type: Array, required: true }, // [{ key, color, ports: [[name, [lat, lng]], …] }]
  selected: { type: String, required: true },
});
const emit = defineEmits(['select']);
const el = ref(null);
const hasFerry = computed(() => props.data.routes[props.selected].legs.some((l) => l.mode === 'ferry'));
let L, map, layers = {}, portLayer;

function draw() {
  for (const g of Object.values(layers)) g.remove();
  layers = {};
  for (const o of props.options) {
    const on = o.key === props.selected;
    const g = L.layerGroup();
    for (const leg of props.data.routes[o.key].legs) {
      const ferry = leg.mode === 'ferry';
      if (on) L.polyline(leg.line, { color: '#fff', weight: ferry ? 7 : 10, opacity: .9, interactive: false }).addTo(g);
      L.polyline(leg.line, {
        color: o.color, weight: on ? (ferry ? 4 : 6) : 3, opacity: on ? 1 : .45, dashArray: ferry ? (on ? '2 10' : '2 8') : null, lineCap: 'round',
      }).on('click', () => emit('select', o.key)).addTo(g);
    }
    layers[o.key] = g;
  }
  // the chosen route on top
  for (const o of props.options) if (o.key !== props.selected) layers[o.key].addTo(map);
  layers[props.selected].addTo(map);

  if (portLayer) portLayer.remove();
  portLayer = L.layerGroup().addTo(map);
  const o = props.options.find((x) => x.key === props.selected);
  for (const [name, at] of o.ports) {
    L.circleMarker(at, { radius: 6, color: o.color, weight: 3, fillColor: '#fff', fillOpacity: 1 })
      .bindTooltip(name, { direction: 'top', offset: [0, -6], className: 'rm-tip' }).addTo(portLayer);
  }
  const pts = props.data.routes[props.selected].legs.flatMap((l) => l.line);
  map.flyToBounds(L.latLngBounds(pts), { padding: [80, 50], duration: .8 });
}

onMounted(async () => {
  L = (await import('leaflet')).default;
  const touch = matchMedia('(pointer: coarse)').matches;
  map = L.map(el.value, { scrollWheelZoom: false, dragging: !touch, tap: false, zoomSnap: .25, attributionControl: true });
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18, attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> · διαδρομές: OSRM',
  }).addTo(map);
  map.attributionControl.setPrefix(false);
  // labels sit above the dots, so they are not cut at the edges of the map
  const narrow = el.value.offsetWidth < 600;
  const end = (at, name, big) => L.circleMarker(at, { radius: big ? 10 : 8, color: '#fff', weight: 3, fillColor: big ? '#ffb627' : '#0a4d7a', fillOpacity: 1 })
    .bindTooltip(name, { permanent: true, direction: 'top', offset: [0, -10], className: 'rm-tip rm-end' }).addTo(map);
  end(props.data.start, narrow ? 'Αθήνα' : 'Αθήνα (Σύνταγμα)', false);
  end(props.data.end, 'Νημποριό, 340 15', true);
  map.fitBounds(L.latLngBounds(props.data.routes[props.selected].legs.flatMap((l) => l.line)), { padding: [80, 50] });
  draw();
});
watch(() => props.selected, () => { if (map) draw(); });
onBeforeUnmount(() => { if (map) map.remove(); });
</script>

<template>
  <div class="route-map">
    <div ref="el" class="rm-canvas" role="img" aria-label="Χάρτης με τη διαδρομή από την Αθήνα ως το Νημποριό"></div>
    <p class="rm-legend">
      <span><i class="rm-car"></i>με το αυτοκίνητο</span>
      <span v-if="hasFerry"><i class="rm-ferry"></i>με το πλοίο</span>
      <span class="rm-hint">Οι άλλες διαδρομές φαίνονται αχνά· πατήστε μία για να τη διαλέξετε.</span>
    </p>
  </div>
</template>
