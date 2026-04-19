<template>
  <header class="site-header rule-b">
    <div class="header-brand">
      <TheSeal :size="28" />
      <strong style="letter-spacing:0.3em">BANCO·BRAL</strong>
    </div>
    <span class="header-tagline">Est. MMXXIV · Loshult, Småland</span>
    <nav class="header-nav">
      <a href="#manifesto">Manifesto</a>
      <a href="#rate">Exchange</a>
      <a href="#mint">Denominations</a>
      <a href="#reserves">Reserves</a>
      <a href="#schedule">Schedule</a>
      <a href="#shop">Shop</a>
      <a href="#hammer">Hammer</a>
    </nav>
    <a href="#manifesto" class="btn btn-ghost header-cta" style="padding:6px 10px;font-size:10px;flex-shrink:0">Redeem ▸</a>
  </header>
</template>

<script setup>
import TheSeal from './TheSeal.vue'
</script>

<style scoped>
.site-header {
  padding: 14px 24px;
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: var(--paper);
}
.header-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.header-tagline { opacity: 0.55; white-space: nowrap; }
.header-nav {
  margin-left: auto;
  display: flex;
  gap: 22px;
  flex-wrap: nowrap;
}
.header-nav a { white-space: nowrap; }

@media (max-width: 1024px) {
  .header-nav { gap: 14px; }
}
@media (max-width: 768px) {
  .header-tagline { display: none; }
  .header-nav { gap: 10px; font-size: 10px; }
}
@media (max-width: 640px) {
  .site-header { gap: 16px; }
  .header-nav { display: none; }
  .header-cta { margin-left: auto; }
}
</style>
