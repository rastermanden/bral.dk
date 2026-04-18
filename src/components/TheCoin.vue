<template>
  <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" style="display:block" class="coin-plate">
    <defs>
      <radialGradient :id="`g-${denom.value}`" cx="40%" cy="35%" r="75%">
        <stop offset="0%" stop-color="#f2efe8" />
        <stop offset="55%" :stop-color="denom.color" />
        <stop offset="100%" stop-color="#77736c" />
      </radialGradient>
      <radialGradient :id="`gi-${denom.value}`" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stop-color="#d4cfc5" />
        <stop offset="100%" :stop-color="denom.color" />
      </radialGradient>
      <path
        :id="`arc-top-${denom.value}`"
        :d="`M ${r - (r - 12)} ${r} A ${r - 12} ${r - 12} 0 0 1 ${r + (r - 12)} ${r}`"
      />
      <path
        :id="`arc-bot-${denom.value}`"
        :d="`M ${r + (r - 12)} ${r} A ${r - 12} ${r - 12} 0 0 1 ${r - (r - 12)} ${r}`"
      />
    </defs>

    <!-- edge reeds -->
    <line
      v-if="denom.edge === 'reeded'"
      v-for="i in 64"
      :key="i"
      :x1="r + Math.cos(((i - 1) / 64) * Math.PI * 2) * (r - 1)"
      :y1="r + Math.sin(((i - 1) / 64) * Math.PI * 2) * (r - 1)"
      :x2="r + Math.cos(((i - 1) / 64) * Math.PI * 2) * (r - 5)"
      :y2="r + Math.sin(((i - 1) / 64) * Math.PI * 2) * (r - 5)"
      stroke="#6f6b63"
      stroke-width="0.6"
    />

    <!-- coin body -->
    <circle :cx="r" :cy="r" :r="r - 1" :fill="`url(#g-${denom.value})`" stroke="#8a857b" stroke-width="0.8" />
    <circle :cx="r" :cy="r" :r="r - 6" :fill="`url(#gi-${denom.value})`" stroke="#6f6b63" stroke-width="0.4" />

    <!-- inner ring dots -->
    <circle
      v-for="i in 40"
      :key="i"
      :cx="r + Math.cos(((i - 1) / 40) * Math.PI * 2) * (r - 10)"
      :cy="r + Math.sin(((i - 1) / 40) * Math.PI * 2) * (r - 10)"
      r="0.5"
      fill="#4a4741"
    />

    <!-- numeral -->
    <text
      :x="r" :y="r + size * 0.055"
      text-anchor="middle"
      font-family="Instrument Serif, serif"
      :font-size="size * 0.42"
      fill="#2a2724"
      style="letter-spacing: -0.02em"
    >{{ denom.value }}</text>

    <!-- arc labels -->
    <text font-family="JetBrains Mono, monospace" :font-size="size * 0.07" fill="#2a2724" letter-spacing="2">
      <textPath :href="`#arc-top-${denom.value}`" start-offset="50%" text-anchor="middle">BANCO · BRAL</textPath>
    </text>
    <text font-family="JetBrains Mono, monospace" :font-size="size * 0.07" fill="#2a2724" letter-spacing="2">
      <textPath :href="`#arc-bot-${denom.value}`" start-offset="50%" text-anchor="middle">A.D. {{ denom.year }}</textPath>
    </text>

    <!-- highlight -->
    <ellipse :cx="r * 0.7" :cy="r * 0.55" :rx="r * 0.45" :ry="r * 0.18" fill="white" opacity="0.15" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  denom: { type: Object, required: true },
  size:  { type: Number, default: 120 },
})

const r = computed(() => props.size / 2)
</script>
