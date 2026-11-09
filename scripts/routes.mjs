// Builds src/data/routes.json: the 3 ways from central Athens (Σύνταγμα) to Νημποριό, for the map on /prosvasi/.
// Car legs come from the OSRM route planner, ferry lines from OpenStreetMap (both © OpenStreetMap contributors).
// Run again only if a route changes:  npm run routes
import fs from 'node:fs';

const UA = { 'User-Agent': 'nimborio-site-build/1.0' };
const P = {
  athens:     [37.97552, 23.73495], // Πλατεία Συντάγματος
  agiaMarina: [38.18075, 24.05951], // λιμάνι Αγίας Μαρίνας
  neaStyra:   [38.17989, 24.20719], // λιμάνι Νέων Στύρων
  rafina:     [38.02410, 24.01102], // λιμάνι Ραφήνας
  marmari:    [38.04882, 24.31730], // λιμάνι Μαρμαρίου
  bridge:     [38.44455, 23.59066], // Υψηλή Γέφυρα Ευρίπου, Χαλκίδα
  nimborio:   [38.12099, 24.21774], // Νημποριό (Nimporio, 340 15), the village point on OpenStreetMap
};
const FERRY_WAYS = { agiaMarina: 27532530, rafina: 46050040 }; // OSM ferry lines

const round = ([lat, lng]) => [+lat.toFixed(5), +lng.toFixed(5)];

// Douglas–Peucker: drop points that change the line by less than ~10 m
function simplify(pts, tol = 0.0001) {
  if (pts.length < 3) return pts;
  const [a, b] = [pts[0], pts.at(-1)];
  let max = 0, idx = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const [y, x] = pts[i], [y1, x1] = a, [y2, x2] = b;
    const d = Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1) / (Math.hypot(y2 - y1, x2 - x1) || 1e-12);
    if (d > max) { max = d; idx = i; }
  }
  if (max <= tol) return [a, b];
  return simplify(pts.slice(0, idx + 1), tol).slice(0, -1).concat(simplify(pts.slice(idx), tol));
}

async function drive(...stops) {
  const coords = stops.map(([lat, lng]) => `${lng},${lat}`).join(';');
  const u = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson&continue_straight=false`;
  const j = await fetch(u, { headers: UA }).then((r) => r.json());
  if (j.code !== 'Ok') throw new Error('OSRM: ' + j.code + ' ' + (j.message || ''));
  const r = j.routes[0];
  const line = simplify(r.geometry.coordinates.map(([lng, lat]) => [lat, lng])).map(round);
  return { mode: 'car', km: Math.round(r.distance / 1000), min: Math.round(r.duration / 60), line };
}

async function ferryLines() {
  const q = `[out:json][timeout:60];way(id:${Object.values(FERRY_WAYS).join(',')});out geom;`;
  const j = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST', headers: { ...UA, 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'data=' + encodeURIComponent(q),
  }).then((r) => r.json());
  const byId = Object.fromEntries(j.elements.map((w) => [w.id, w.geometry.map((g) => round([g.lat, g.lon]))]));
  return byId;
}
// the ferry line, pointing away from the given port
const from = (line, port) => {
  const d = (p) => Math.hypot(p[0] - port[0], p[1] - port[1]);
  return d(line[0]) <= d(line.at(-1)) ? line : [...line].reverse();
};
const pause = () => new Promise((r) => setTimeout(r, 1200));

const ferries = await ferryLines();
const out = { updated: new Date().toISOString().slice(0, 10), start: round(P.athens), end: round(P.nimborio), routes: {} };

const a1 = await drive(P.athens, P.agiaMarina); await pause();
const a2 = await drive(P.neaStyra, P.nimborio); await pause();
out.routes.agiaMarina = { legs: [a1, { mode: 'ferry', min: 45, line: from(ferries[FERRY_WAYS.agiaMarina], P.agiaMarina) }, a2] };

const r1 = await drive(P.athens, P.rafina); await pause();
const r2 = await drive(P.marmari, P.nimborio); await pause();
out.routes.rafina = { legs: [r1, { mode: 'ferry', min: 60, line: from(ferries[FERRY_WAYS.rafina], P.rafina) }, r2] };

// by road only: through the high bridge of Chalkida and central Evia
const c1 = await drive(P.athens, P.bridge); await pause();
const c2 = await drive(P.bridge, P.nimborio);
out.routes.chalkida = { legs: [c1, c2] };

fs.writeFileSync('src/data/routes.json', JSON.stringify(out));
for (const [k, r] of Object.entries(out.routes)) {
  console.log(k.padEnd(11), r.legs.map((l) => `${l.mode} ${l.km ?? ''}${l.km != null ? 'km ' : ''}${l.min}′ (${l.line.length} pts)`).join(' + '));
}
console.log('size', fs.statSync('src/data/routes.json').size, 'bytes');
