<template>
  <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:32px">
    <div>
      <div style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:var(--accent);margin-bottom:12px">{{ eyebrow }}</div>
      <h2 class="serif" style="font-size:clamp(40px,5vw,72px);margin:0;line-height:0.95;letter-spacing:-0.02em;font-weight:400">{{ title }}</h2>
    </div>
    <div v-if="subtitle" style="max-width:360px;font-size:12px;line-height:1.6;opacity:0.7;text-align:right">
      {{ subtitle }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  eyebrow:  { type: String, required: true },
  title:    { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>
