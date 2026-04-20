<template>
  <header class="site-header rule-b">
    <a href="#" class="header-brand" aria-label="Banco·Bral — home">
      <TheSeal :size="28" />
      <strong style="letter-spacing:0.3em">BANCO·BRAL</strong>
    </a>
    <span class="header-tagline">Est. MMXXIV · Loshult, Småland</span>
    <nav class="header-nav" aria-label="Primary navigation">
      <a href="#manifesto">Manifesto</a>
      <a href="#rate">Exchange</a>
      <a href="#mint">Denominations</a>
      <a href="#reserves">Reserves</a>
      <a href="#address">Address</a>
      <a href="#schedule">Schedule</a>
      <a href="#shop">Shop</a>
      <a href="#governors">Governors</a>
      <a href="#hammer">Hammer</a>
      <a href="#newsletter">Communiqué</a>
    </nav>
    <a href="#manifesto" class="btn btn-ghost header-cta" style="padding:6px 10px;font-size:10px;flex-shrink:0">Redeem ▸</a>

    <!-- Hamburger button (mobile only) -->
    <button
      class="hamburger"
      :aria-expanded="menuOpen"
      aria-label="Toggle navigation menu"
      @click="menuOpen = !menuOpen"
    >
      <span class="hamburger-bar" :class="{ open: menuOpen }" />
      <span class="hamburger-bar" :class="{ open: menuOpen }" />
      <span class="hamburger-bar" :class="{ open: menuOpen }" />
    </button>
  </header>

  <!-- Mobile menu overlay -->
  <Transition name="menu">
    <div v-if="menuOpen" class="mobile-menu" @click.self="menuOpen = false">
      <nav aria-label="Mobile navigation">
        <a href="#manifesto" @click="menuOpen = false">Manifesto</a>
        <a href="#rate"      @click="menuOpen = false">Exchange</a>
        <a href="#mint"      @click="menuOpen = false">Denominations</a>
        <a href="#reserves"  @click="menuOpen = false">Reserves</a>
        <a href="#address"   @click="menuOpen = false">Address</a>
        <a href="#schedule"  @click="menuOpen = false">Schedule</a>
        <a href="#shop"      @click="menuOpen = false">Shop</a>
        <a href="#governors" @click="menuOpen = false">Governors</a>
        <a href="#hammer"      @click="menuOpen = false">Hammer</a>
        <a href="#newsletter" @click="menuOpen = false">Communiqué</a>
      </nav>
      <a href="#manifesto" class="btn mobile-menu-cta" @click="menuOpen = false">Redeem ▸</a>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TheSeal from './TheSeal.vue'

const menuOpen = ref(false)

function onKeydown(e) {
  if (e.key === 'Escape') menuOpen.value = false
}
onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
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
  position: sticky;
  top: 0;
  z-index: 100;
}
.header-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  text-decoration: none;
  color: inherit;
}
.header-tagline { opacity: 0.78; white-space: nowrap; }
.header-nav {
  margin-left: auto;
  display: flex;
  gap: 22px;
  flex-wrap: nowrap;
}
.header-nav a { white-space: nowrap; }

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  flex-shrink: 0;
}
.hamburger-bar {
  display: block;
  width: 22px;
  height: 1.5px;
  background: var(--ink);
  transition: transform 0.2s ease, opacity 0.2s ease;
  transform-origin: center;
}
.hamburger-bar:nth-child(1).open { transform: translateY(6.5px) rotate(45deg); }
.hamburger-bar:nth-child(2).open { opacity: 0; }
.hamburger-bar:nth-child(3).open { transform: translateY(-6.5px) rotate(-45deg); }

/* Mobile menu */
.mobile-menu {
  position: fixed;
  inset: 0;
  top: 53px;
  background: var(--paper);
  z-index: 99;
  border-top: 1px solid var(--ink);
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  gap: 0;
}
.mobile-menu nav {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.mobile-menu nav a {
  font-size: 13px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--ink);
  text-decoration: none;
  padding: 18px 0;
  border-bottom: 1px solid var(--ink);
  opacity: 0.85;
  transition: opacity 0.15s;
}
.mobile-menu nav a:first-child { border-top: 1px solid var(--ink); }
.mobile-menu nav a:hover { opacity: 1; }
.mobile-menu-cta {
  margin-top: 28px;
  width: 100%;
  justify-content: center;
  font-size: 11px;
}

/* Transition */
.menu-enter-active, .menu-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.menu-enter-from, .menu-leave-to { opacity: 0; transform: translateY(-8px); }

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
  .header-cta { display: none; }
  .hamburger { display: flex; margin-left: auto; }
}
</style>
