<template>
  <footer style="padding:56px 48px 32px;background:var(--ink);color:var(--paper)">
    <div style="display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:48px">
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
        <div v-for="it in items" :key="it" style="font-size:12px;padding:4px 0;opacity:0.85;cursor:pointer">{{ it }} ▸</div>
      </div>
    </div>

    <div style="display:flex;justify-content:space-between;margin-top:48px;padding-top:22px;border-top:1px solid rgba(233,229,219,0.2);font-size:10px;letter-spacing:0.15em;text-transform:uppercase;opacity:0.6">
      <span>© MMXXVI · Banco·Bral · Loshult Foundry, Småland SE</span>
      <span>Redemption window · Sat 19:00–23:00 CET</span>
      <span>In Aluminum We Trust</span>
    </div>
  </footer>
</template>

<script setup>
import TheSeal from './TheSeal.vue'

const navGroups = [
  ['Institution', ['Manifesto', 'Governance', 'Annual Report', 'Audits']],
  ['Currency',    ['Denominations', 'Exchange Rate', 'Reserves', 'Redemption']],
  ['Foundry',     ['Mint Schedule', 'Branch Charters', 'Counterfeit Reports', 'Contact']],
]
</script>
