<template>
  <header class="rule-b" style="padding:14px 24px;display:flex;align-items:center;gap:24px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;background:var(--paper)">
    <div style="display:flex;align-items:center;gap:10px">
      <TheSeal :size="28" />
      <strong style="letter-spacing:0.3em">BANCO·BRAL</strong>
    </div>
    <span style="opacity:0.55">Est. MMXXIV · Loshult, Småland</span>
    <nav style="margin-left:auto;display:flex;gap:22px">
      <a href="#manifesto">Manifesto</a>
      <a href="#rate">Exchange</a>
      <a href="#mint">Denominations</a>
      <a href="#reserves">Reserves</a>
      <a href="#schedule">Schedule</a>
      <a href="#shop">Shop</a>
    </nav>
    <a href="#manifesto" class="btn btn-ghost" style="padding:6px 10px;font-size:10px">Redeem ▸</a>
  </header>
</template>

<script setup>
import TheSeal from './TheSeal.vue'
</script>
