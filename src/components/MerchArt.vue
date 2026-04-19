<template>
  <svg viewBox="0 0 120 100" width="100%" height="100%" style="display:block" preserveAspectRatio="xMidYMid meet">
    <defs>
      <pattern :id="`hatch-${sku}`" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="4" stroke="var(--ink)" stroke-opacity="0.14" stroke-width="1.2"/>
      </pattern>
    </defs>

    <!-- subtle background hatch -->
    <rect width="120" height="100" :fill="`url(#hatch-${sku})`"/>

    <g :stroke="stroke" :fill="fill" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round" font-family="JetBrains Mono, monospace">

      <!-- BRL-01 · Proof Set: open tin, 6 coins in 2×3 grid (top view) -->
      <g v-if="sku === 'BRL-01'">
        <rect x="16" y="18" width="88" height="64" rx="3" :fill="panel" :stroke="stroke"/>
        <rect x="20" y="22" width="80" height="56" rx="2" fill="none" stroke-opacity="0.5"/>
        <g>
          <g v-for="(c, i) in 6" :key="i"
             :transform="`translate(${33 + (i % 3) * 27}, ${36 + Math.floor(i / 3) * 24})`">
            <circle r="8.5" :fill="coin" :stroke="stroke"/>
            <circle r="6" fill="none" :stroke="stroke" stroke-opacity="0.55"/>
            <text y="2" text-anchor="middle" font-size="6" :fill="stroke">{{ [1,2,5,10,20,50][i] }}</text>
          </g>
        </g>
        <text x="60" y="92" text-anchor="middle" font-size="5" :fill="stroke" letter-spacing="2" opacity="0.7">PROOF SET Nº 01</text>
      </g>

      <!-- BRL-02 · Tee -->
      <g v-if="sku === 'BRL-02'">
        <path d="M32 26 L50 18 Q60 24 70 18 L88 26 L82 40 L74 36 L74 84 L46 84 L46 36 L38 40 Z"
              :fill="panel" :stroke="stroke"/>
        <path d="M50 18 Q60 30 70 18" fill="none" :stroke="stroke" stroke-opacity="0.55"/>
        <circle cx="60" cy="58" r="9" fill="none" :stroke="stroke"/>
        <circle cx="60" cy="58" r="6" fill="none" :stroke="stroke" stroke-opacity="0.6"/>
        <text x="60" y="60" text-anchor="middle" font-size="5" :fill="stroke" letter-spacing="1">BRAL</text>
        <text x="60" y="78" text-anchor="middle" font-size="3.5" :fill="stroke" opacity="0.55" letter-spacing="1.5">LOSHULT FOUNDRY</text>
      </g>

      <!-- BRL-03 · Mint Apron (canvas) -->
      <g v-if="sku === 'BRL-03'">
        <path d="M44 22 L76 22 L82 34 L82 84 L38 84 L38 34 Z" :fill="panel" :stroke="stroke"/>
        <path d="M60 22 L44 10 M60 22 L76 10" fill="none" :stroke="stroke"/>
        <rect x="46" y="46" width="12" height="14" fill="none" :stroke="stroke"/>
        <rect x="62" y="46" width="12" height="14" fill="none" :stroke="stroke"/>
        <line x1="38" y1="66" x2="82" y2="66" :stroke="stroke" stroke-opacity="0.4"/>
        <text x="60" y="79" text-anchor="middle" font-size="4" :fill="stroke" letter-spacing="1.5" opacity="0.6">MINT · FOUNDRY</text>
      </g>

      <!-- BRL-04 · Ledger Book -->
      <g v-if="sku === 'BRL-04'">
        <rect x="26" y="18" width="68" height="66" :fill="panel" :stroke="stroke"/>
        <line x1="34" y1="18" x2="34" y2="84" :stroke="stroke"/>
        <line v-for="n in 7" :key="n" x1="42" :y1="30 + n * 6" x2="86" :y2="30 + n * 6"
              :stroke="stroke" stroke-opacity="0.45"/>
        <rect x="48" y="22" width="40" height="8" fill="none" :stroke="stroke" stroke-opacity="0.6"/>
        <text x="68" y="28" text-anchor="middle" font-size="4.5" :fill="stroke" letter-spacing="2">LEDGER Nº 01</text>
      </g>

      <!-- BRL-05 · Coin Capsule, Brass (profile) -->
      <g v-if="sku === 'BRL-05'">
        <ellipse cx="60" cy="50" rx="34" ry="32" :fill="panel" :stroke="stroke"/>
        <ellipse cx="60" cy="50" rx="28" ry="26" fill="none" :stroke="stroke" stroke-opacity="0.55"/>
        <circle cx="60" cy="50" r="14" :fill="coin" :stroke="stroke"/>
        <circle cx="60" cy="50" r="10" fill="none" :stroke="stroke" stroke-opacity="0.55"/>
        <text x="60" y="53" text-anchor="middle" font-size="8" :fill="stroke">B</text>
        <line x1="26" y1="50" x2="94" y2="50" :stroke="stroke" stroke-opacity="0.25"/>
        <text x="60" y="92" text-anchor="middle" font-size="4" :fill="stroke" letter-spacing="1.5" opacity="0.6">AIRTIGHT · BRASS</text>
      </g>

      <!-- BRL-06 · Foundry Patch -->
      <g v-if="sku === 'BRL-06'">
        <circle cx="60" cy="50" r="34" :fill="panel" :stroke="stroke" stroke-dasharray="2 2"/>
        <circle cx="60" cy="50" r="30" fill="none" :stroke="stroke"/>
        <g transform="translate(60 50)">
          <polygon points="0,-16 4,-5 15,-5 6,2 10,13 0,6 -10,13 -6,2 -15,-5 -4,-5" :fill="coin" :stroke="stroke"/>
        </g>
        <text x="60" y="26" text-anchor="middle" font-size="4" :fill="stroke" letter-spacing="3">BANCO · BRAL</text>
        <text x="60" y="80" text-anchor="middle" font-size="4" :fill="stroke" letter-spacing="3">FOUNDRY</text>
      </g>

      <!-- BRL-07 · Coin Wallet, Full-Grain (open) -->
      <g v-if="sku === 'BRL-07'">
        <rect x="14" y="24" width="92" height="52" rx="3" :fill="panel" :stroke="stroke"/>
        <line x1="60" y1="24" x2="60" y2="76" :stroke="stroke" stroke-opacity="0.5" stroke-dasharray="1.5 1.5"/>
        <!-- six coin slots -->
        <g>
          <g v-for="(c, i) in 6" :key="i"
             :transform="`translate(${22 + (i % 3) * 14}, ${36 + Math.floor(i / 3) * 16})`">
            <path d="M0 0 A 6 6 0 0 0 12 0 L 12 6 L 0 6 Z" :fill="coin" :stroke="stroke"/>
          </g>
        </g>
        <!-- bill sleeve -->
        <rect x="68" y="34" width="32" height="32" fill="none" :stroke="stroke" stroke-opacity="0.55"/>
        <line x1="74" y1="42" x2="94" y2="42" :stroke="stroke" stroke-opacity="0.35"/>
        <line x1="74" y1="48" x2="94" y2="48" :stroke="stroke" stroke-opacity="0.35"/>
        <!-- embossed seal -->
        <circle cx="84" cy="58" r="5" fill="none" :stroke="stroke" stroke-opacity="0.7"/>
        <text x="84" y="60" text-anchor="middle" font-size="3.2" :fill="stroke" letter-spacing="0.5">B·B</text>
        <!-- stitch -->
        <rect x="17" y="27" width="86" height="46" rx="2" fill="none" :stroke="stroke" stroke-opacity="0.6" stroke-dasharray="1.2 1.8"/>
        <text x="60" y="88" text-anchor="middle" font-size="4" :fill="stroke" letter-spacing="1.5" opacity="0.6">FULL-GRAIN · SADDLE-STITCH</text>
      </g>

      <!-- BRL-08 · Zippo, Engraved -->
      <g v-if="sku === 'BRL-08'">
        <rect x="44" y="18" width="32" height="64" rx="3" :fill="panel" :stroke="stroke"/>
        <line x1="44" y1="30" x2="76" y2="30" :stroke="stroke"/>
        <line x1="44" y1="32" x2="76" y2="32" :stroke="stroke" stroke-opacity="0.45"/>
        <!-- hinge -->
        <circle cx="44" cy="31" r="1.2" :fill="stroke"/>
        <circle cx="76" cy="31" r="1.2" :fill="stroke"/>
        <!-- engraved seal -->
        <circle cx="60" cy="54" r="10" fill="none" :stroke="stroke"/>
        <circle cx="60" cy="54" r="7" fill="none" :stroke="stroke" stroke-opacity="0.55"/>
        <text x="60" y="56" text-anchor="middle" font-size="5" :fill="stroke" letter-spacing="0.5">B·B</text>
        <!-- brushed lines -->
        <g stroke-opacity="0.22">
          <line v-for="n in 6" :key="n" :x1="46 + n * 4" y1="72" :x2="46 + n * 4" y2="80" :stroke="stroke"/>
        </g>
        <!-- flame wisp -->
        <path d="M60 14 Q 63 10 60 6 Q 57 10 60 14 Z" :fill="coin" :stroke="stroke"/>
        <text x="60" y="92" text-anchor="middle" font-size="4" :fill="stroke" letter-spacing="1.5" opacity="0.6">WINDPROOF · ENGRAVED</text>
      </g>

      <!-- sku badge -->
      <text x="6" y="96" font-size="4.5" :fill="stroke" opacity="0.45" letter-spacing="1.5">{{ sku }}</text>
    </g>
  </svg>
</template>

<script setup>
defineProps({
  sku: { type: String, required: true },
})

const stroke = 'var(--ink)'
const fill = 'none'
const panel = 'var(--paper)'
const coin = 'var(--alu, #d9d6cf)'
</script>
