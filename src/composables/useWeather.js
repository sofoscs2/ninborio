import { reactive, computed } from 'vue';
import { LAT, LNG, beaufort, compass } from '../lib/util.js';

/* Open-Meteo forecast + sea (no key needed). One shared download: the hero chips and the weather card
   both read it, each in the language of its page. */
const WMO = {
  0: ['☀️', 'Καθαρός ουρανός', 'Clear sky'], 1: ['🌤️', 'Κυρίως αίθριος', 'Mostly clear'], 2: ['⛅', 'Λίγα σύννεφα', 'Partly cloudy'], 3: ['☁️', 'Συννεφιά', 'Overcast'],
  45: ['🌫️', 'Ομίχλη', 'Fog'], 48: ['🌫️', 'Ομίχλη', 'Fog'], 51: ['🌦️', 'Ψιχάλα', 'Drizzle'], 53: ['🌦️', 'Ψιχάλα', 'Drizzle'], 55: ['🌧️', 'Ψιχάλα', 'Drizzle'],
  61: ['🌦️', 'Ασθενής βροχή', 'Light rain'], 63: ['🌧️', 'Βροχή', 'Rain'], 65: ['🌧️', 'Δυνατή βροχή', 'Heavy rain'], 71: ['🌨️', 'Χιόνι', 'Snow'], 73: ['🌨️', 'Χιόνι', 'Snow'], 75: ['❄️', 'Χιόνι', 'Snow'],
  80: ['🌦️', 'Μπόρες', 'Showers'], 81: ['🌧️', 'Μπόρες', 'Showers'], 82: ['⛈️', 'Ισχυρές μπόρες', 'Heavy showers'], 95: ['⛈️', 'Καταιγίδα', 'Thunderstorm'], 96: ['⛈️', 'Καταιγίδα', 'Thunderstorm'], 99: ['⛈️', 'Καταιγίδα', 'Thunderstorm'],
};
const wmo = (code) => WMO[code] || ['🌡️', '', ''];
const hhmm = (iso) => (iso ? iso.slice(11, 16) : '—');
const deg = (v) => (v == null ? '—°' : Math.round(v) + '°');

const raw = reactive({ status: 'loading', w: null, s: null }); // loading · ok · failed
let started = false;

// the weather in the words of one language
export function useWeather(en = false) {
  return computed(() => {
    const out = {
      icon: '⛅', desc: en ? 'loading…' : 'φόρτωση…', temp: '—°', feels: '—', sea: '—', wind: '—', wave: '—', rise: '—', set: '—', days: [],
      chipAir: '—°', chipSea: '—°', chipSun: '—',
    };
    if (raw.status === 'failed') out.desc = en ? 'The forecast is not available right now' : 'Η πρόγνωση δεν είναι διαθέσιμη τώρα';
    if (raw.status !== 'ok') return out;
    const { w, s } = raw, cur = w.current, d = w.daily, info = wmo(cur.weather_code);
    out.icon = info[0]; out.desc = en ? info[2] : info[1];
    out.temp = out.chipAir = deg(cur.temperature_2m);
    out.feels = deg(cur.apparent_temperature);
    out.wind = beaufort(cur.wind_speed_10m) + ' Bf ' + compass(cur.wind_direction_10m, en);
    out.rise = hhmm(d.sunrise[0]); out.set = out.chipSun = hhmm(d.sunset[0]);
    if (s && s.current) {
      if (s.current.sea_surface_temperature != null) out.sea = out.chipSea = deg(s.current.sea_surface_temperature);
      if (s.current.wave_height != null) out.wave = s.current.wave_height.toFixed(1) + (en ? ' m' : ' μ');
    }
    const fmt = new Intl.DateTimeFormat(en ? 'en-GB' : 'el-GR', { weekday: 'short' });
    out.days = d.time.map((t, k) => ({
      name: k === 0 ? (en ? 'Today' : 'Σήμερα') : fmt.format(new Date(t + 'T12:00')),
      icon: wmo(d.weather_code[k])[0],
      temps: Math.round(d.temperature_2m_max[k]) + '° / ' + Math.round(d.temperature_2m_min[k]) + '°',
    }));
    return out;
  });
}

export function loadWeather() {
  if (started) return;
  started = true;
  const q = `latitude=${LAT}&longitude=${LNG}&timezone=Europe%2FAthens`;
  const f = fetch(`https://api.open-meteo.com/v1/forecast?${q}` +
    '&current=temperature_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,weather_code' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&forecast_days=5').then((r) => r.json());
  const m = fetch(`https://marine-api.open-meteo.com/v1/marine?${q}&current=wave_height,sea_surface_temperature`)
    .then((r) => r.json()).catch(() => null);
  Promise.all([f, m]).then(([w, s]) => {
    if (!w || !w.current) throw 0;
    raw.w = w; raw.s = s; raw.status = 'ok';
  }).catch(() => { raw.status = 'failed'; });
}
