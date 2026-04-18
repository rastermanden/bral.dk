<template>
  <svg :width="size" :height="size" viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" stroke-width="1" />
    <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" stroke-width="0.5" />
    <text x="20" y="24" text-anchor="middle" font-family="Instrument Serif, serif" font-size="16" fill="currentColor">B</text>
    <line
      v-for="i in 24"
      :key="i"
      :x1="20 + Math.cos(((i - 1) / 24) * Math.PI * 2) * 17"
      :y1="20 + Math.sin(((i - 1) / 24) * Math.PI * 2) * 17"
      :x2="20 + Math.cos(((i - 1) / 24) * Math.PI * 2) * 18.5"
      :y2="20 + Math.sin(((i - 1) / 24) * Math.PI * 2) * 18.5"
      stroke="currentColor"
      stroke-width="0.6"
    />
  </svg>
</template>

<script setup>
defineProps({ size: { type: Number, default: 40 } })
</script>
