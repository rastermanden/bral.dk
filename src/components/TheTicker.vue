<template>
  <div style="background:var(--ink);color:var(--paper);border-top:1px solid var(--ink);border-bottom:1px solid var(--ink);overflow:hidden;padding:10px 0;font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.15em;text-transform:uppercase">
    <div class="marquee-track">
      <span>{{ line }}</span>
      <span>{{ line }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import tickerData from '../data/ticker.json'

const line = computed(() => tickerData.join('   ✦   '))
</script>
