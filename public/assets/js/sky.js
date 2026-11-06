/* Time of day at Nimborio: decides how the hero looks (dawn, day, golden, dusk, night).
   Loaded before main.js so the right look is there from the first paint. */
(function () {
  var LAT = 38.1227, LNG = 24.2122, RAD = Math.PI / 180;

  // Sun height above the horizon in degrees (low-precision solar position, good to ~1°).
  function sunElevation(date) {
    var d = date.getTime() / 864e5 + 2440587.5 - 2451545.0; // days since J2000
    var g = (357.529 + 0.98560028 * d) * RAD;
    var q = 280.459 + 0.98564736 * d;
    var L = (q + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * RAD;
    var e = (23.439 - 0.00000036 * d) * RAD;
    var ra = Math.atan2(Math.cos(e) * Math.sin(L), Math.cos(L));
    var dec = Math.asin(Math.sin(e) * Math.sin(L));
    var gmst = (18.697374558 + 24.06570982441908 * d) % 24;
    var ha = (gmst * 15 + LNG) * RAD - ra;
    var phi = LAT * RAD;
    return Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(ha)) / RAD;
  }

  function phaseAt(date) {
    var el = sunElevation(date);
    var morning = sunElevation(new Date(date.getTime() + 6e5)) > el; // sun rising?
    if (el < -6) return 'night';
    if (el < 1) return morning ? 'dawn' : 'dusk';
    if (el < 12) return morning ? 'dawn' : 'golden';
    return 'day';
  }

  window.NimSky = { sunElevation: sunElevation, phaseAt: phaseAt };

  var hero = document.currentScript && document.querySelector('.hero');
  var forced = new URLSearchParams(location.search).get('phase'); // e.g. ?phase=night for previews
  function apply() {
    var h = document.querySelector('.hero');
    if (h && !h.dataset.locked) h.dataset.phase = forced || phaseAt(new Date());
  }
  if (hero) apply(); else document.addEventListener('DOMContentLoaded', apply);
  window.NimSky.apply = apply;
})();
