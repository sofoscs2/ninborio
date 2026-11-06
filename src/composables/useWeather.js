import { reactive } from 'vue';
import { LAT, LNG, beaufort, compass } from '../lib/util.js';

/* Open-Meteo forecast + sea (no key needed). One shared state: the hero chips and the weather card both read it. */
const WMO = {
  0: ['☀️', 'Καθαρός ουρανός'], 1: ['🌤️', 'Κυρίως αίθριος'], 2: ['⛅', 'Λίγα σύννεφα'], 3: ['☁️', 'Συννεφιά'],
  45: ['🌫️', 'Ομίχλη'], 48: ['🌫️', 'Ομίχλη'], 51: ['🌦️', 'Ψιχάλα'], 53: ['🌦️', 'Ψιχάλα'], 55: ['🌧️', 'Ψιχάλα'],
  61: ['🌦️', 'Ασθενής βροχή'], 63: ['🌧️', 'Βροχή'], 65: ['🌧️', 'Δυνατή βροχή'], 71: ['🌨️', 'Χιόνι'], 73: ['🌨️', 'Χιόνι'], 75: ['❄️', 'Χιόνι'],
  80: ['🌦️', 'Μπόρες'], 81: ['🌧️', 'Μπόρες'], 82: ['⛈️', 'Ισχυρές μπόρες'], 95: ['⛈️', 'Καταιγίδα'], 96: ['⛈️', 'Καταιγίδα'], 99: ['⛈️', 'Καταιγίδα'],
};
const wmo = (code) => WMO[code] || ['🌡️', ''];
const hhmm = (iso) => (iso ? iso.slice(11, 16) : '—');

const fresh = () => ({
  icon: '⛅', desc: 'φόρτωση…', temp: '—°', feels: '—', sea: '—', wind: '—', wave: '—', rise: '—', set: '—', days: [],
  chipAir: '—°', chipSea: '—°', chipSun: '—',
});
const state = reactive(fresh());
let started = false;

export function useWeather() {
  return state;
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
    const cur = w.current, d = w.daily, info = wmo(cur.weather_code);
    state.icon = info[0]; state.desc = info[1];
    state.temp = Math.round(cur.temperature_2m) + '°';
    state.feels = Math.round(cur.apparent_temperature) + '°';
    state.wind = beaufort(cur.wind_speed_10m) + ' Bf ' + compass(cur.wind_direction_10m);
    state.rise = hhmm(d.sunrise[0]); state.set = hhmm(d.sunset[0]);
    state.chipAir = Math.round(cur.temperature_2m) + '°';
    state.chipSun = hhmm(d.sunset[0]);
    if (s && s.current) {
      if (s.current.sea_surface_temperature != null) state.sea = state.chipSea = Math.round(s.current.sea_surface_temperature) + '°';
      if (s.current.wave_height != null) state.wave = s.current.wave_height.toFixed(1) + ' μ';
    }
    const fmt = new Intl.DateTimeFormat('el-GR', { weekday: 'short' });
    state.days = d.time.map((t, k) => ({
      name: k === 0 ? 'Σήμερα' : fmt.format(new Date(t + 'T12:00')),
      icon: wmo(d.weather_code[k])[0],
      temps: Math.round(d.temperature_2m_max[k]) + '° / ' + Math.round(d.temperature_2m_min[k]) + '°',
    }));
  }).catch(() => { state.desc = 'Η πρόγνωση δεν είναι διαθέσιμη τώρα'; });
}
