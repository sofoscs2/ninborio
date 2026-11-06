<script setup>
import { onMounted } from 'vue';
import { useWeather, loadWeather } from '../../composables/useWeather.js';

const wx = useWeather();
onMounted(loadWeather);
</script>

<template>
  <article class="card weather" aria-live="polite">
    <header>
      <span class="wx-icon" id="wx-icon">{{ wx.icon }}</span>
      <div><strong id="wx-temp">{{ wx.temp }}</strong><span id="wx-desc">{{ wx.desc }}</span></div>
    </header>
    <dl class="stats">
      <div><dt>Αίσθηση</dt><dd id="wx-feels">{{ wx.feels }}</dd></div>
      <div><dt>Θάλασσα</dt><dd id="wx-sea">{{ wx.sea }}</dd></div>
      <div><dt>Άνεμος</dt><dd id="wx-wind">{{ wx.wind }}</dd></div>
      <div><dt>Κύμα</dt><dd id="wx-wave">{{ wx.wave }}</dd></div>
      <div><dt>Ανατολή</dt><dd id="wx-rise">{{ wx.rise }}</dd></div>
      <div><dt>Δύση</dt><dd id="wx-set">{{ wx.set }}</dd></div>
    </dl>
    <ol class="days" id="wx-days">
      <li v-for="d in wx.days" :key="d.name"><span>{{ d.name }}</span><b>{{ d.icon }}</b><span>{{ d.temps }}</span></li>
    </ol>
    <p class="source">Πρόγνωση: <a href="https://open-meteo.com/" rel="noopener">Open-Meteo</a></p>
  </article>
</template>
