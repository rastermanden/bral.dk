<template>
  <footer class="footer-wrap">
    <div class="footer-grid">
      <div>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
          <TheSeal :size="44" />
          <div>
            <div class="serif" style="font-size:30px;letter-spacing:-0.01em;line-height:1">Banco·Bral</div>
            <div class="mono upper" style="font-size:9px;letter-spacing:0.3em;opacity:0.6;margin-top:4px">The Aluminum Standard · Est. MMXXIV</div>
          </div>
        </div>
        <p style="font-size:11.5px;line-height:1.7;opacity:0.75;max-width:380px">
          Banco·Bral is an artisanal fiat issued by six licensed Minters in Loshult, Småland,
          pegged one-to-one to the Nordic standard beer. Not insured. Not intended for speculation.
          Absolutely for drinking.
        </p>
      </div>

      <div v-for="[heading, items] in navGroups" :key="heading">
        <div class="mono upper" style="font-size:9px;letter-spacing:0.3em;opacity:0.55;margin-bottom:14px">{{ heading }}</div>
        <a
          v-for="it in items"
          :key="it.label"
          :href="it.href"
          class="footer-nav-link"
        >{{ it.label }} ▸</a>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© MMXXVI · Banco·Bral · Loshult Foundry, Småland SE</span>
      <span>Redemption window · Sat 19:00–23:00 CET</span>
      <span>In Aluminum We Trust</span>
    </div>
  </footer>
</template>

<style scoped>
.footer-wrap {
  padding: 56px 48px 80px;
  background: var(--ink);
  color: var(--paper);
}
.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 48px;
}
.footer-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 48px;
  padding-top: 22px;
  border-top: 1px solid rgba(233, 229, 219, 0.2);
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  opacity: 0.6;
}
@media (max-width: 768px) {
  .footer-wrap { padding: 48px 24px 80px; }
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
}
.footer-nav-link {
  display: block;
  font-size: 12px;
  padding: 4px 0;
  opacity: 0.85;
  color: inherit;
  text-decoration: none;
  transition: opacity 0.15s;
}
.footer-nav-link:hover { opacity: 1; }

@media (max-width: 640px) {
  .footer-wrap { padding: 40px 20px 96px; }
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 8px;
  }
}
</style>

<script setup>
import TheSeal from './TheSeal.vue'

const navGroups = [
  ['Institution', [
    { label: 'Manifesto',    href: '#manifesto' },
    { label: 'Governance',   href: '#members' },
    { label: 'Annual Report',href: '#reserves' },
    { label: 'Audits',       href: '#reserves' },
  ]],
  ['Currency', [
    { label: 'Denominations',href: '#mint' },
    { label: 'Exchange Rate', href: '#rate' },
    { label: 'Reserves',     href: '#reserves' },
    { label: 'Redemption',   href: '#schedule' },
  ]],
  ['Foundry', [
    { label: 'Mint Schedule',        href: '#schedule' },
    { label: 'Branch Charters',      href: '#manifesto' },
    { label: 'Counterfeit Reports',  href: '#manifesto' },
    { label: 'Contact',              href: '#members' },
  ]],
]
</script>
