<script setup>
import { onMounted } from 'vue';
import { useWeather, loadWeather } from '../../composables/useWeather.js';
import { useLang } from '../../lib/lang.js';

const { en, t } = useLang();
const wx = useWeather(en);
onMounted(loadWeather);
</script>

<template>
  <article class="card weather" aria-live="polite">
    <header>
      <span class="wx-icon" id="wx-icon">{{ wx.icon }}</span>
      <div><strong id="wx-temp">{{ wx.temp }}</strong><span id="wx-desc">{{ wx.desc }}</span></div>
    </header>
    <dl class="stats">
      <div><dt>{{ t('Αίσθηση', 'Feels like') }}</dt><dd id="wx-feels">{{ wx.feels }}</dd></div>
      <div><dt>{{ t('Θάλασσα', 'Sea') }}</dt><dd id="wx-sea">{{ wx.sea }}</dd></div>
      <div><dt>{{ t('Άνεμος', 'Wind') }}</dt><dd id="wx-wind">{{ wx.wind }}</dd></div>
      <div><dt>{{ t('Κύμα', 'Waves') }}</dt><dd id="wx-wave">{{ wx.wave }}</dd></div>
      <div><dt>{{ t('Ανατολή', 'Sunrise') }}</dt><dd id="wx-rise">{{ wx.rise }}</dd></div>
      <div><dt>{{ t('Δύση', 'Sunset') }}</dt><dd id="wx-set">{{ wx.set }}</dd></div>
    </dl>
    <ol class="days" id="wx-days">
      <li v-for="d in wx.days" :key="d.name"><span>{{ d.name }}</span><b>{{ d.icon }}</b><span>{{ d.temps }}</span></li>
    </ol>
    <p class="source">{{ t('Πρόγνωση', 'Forecast') }}: <a href="https://open-meteo.com/" rel="noopener">Open-Meteo</a></p>
  </article>
</template>
