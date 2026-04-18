<template>
  <section id="reserves" class="rule-b" style="padding:80px 48px;background:var(--ink);color:var(--paper)">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:32px">
      <div>
        <div style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:var(--accent);margin-bottom:12px">§ 04</div>
        <h2 class="serif" style="font-size:clamp(40px,5vw,72px);margin:0;line-height:0.95;letter-spacing:-0.02em;font-weight:400">The Reserves</h2>
      </div>
      <div style="max-width:360px;font-size:12px;line-height:1.6;opacity:0.7;text-align:right">
        Last audited 2026.03.14 by E. Sørensen, non-Minter. Full reserve statement available upon redemption.
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:56px;align-items:start">

      <!-- Bar charts -->
      <div>
        <div v-for="b in bars" :key="b.label" style="margin-bottom:22px">
          <div style="display:flex;justify-content:space-between;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:6px">
            <span>{{ b.label }}</span>
            <span class="serif" style="font-size:18px;letter-spacing:normal">
              {{ fmt(b.value) }}<span style="opacity:0.5"> / {{ fmt(b.max) }}</span>
            </span>
          </div>
          <div style="height:22px;border:1px solid var(--paper);background:rgba(233,229,219,0.04);position:relative;display:flex">
            <div
              v-for="j in 40"
              :key="j"
              :style="{
                flex: 1,
                background: (j - 1) / 40 < b.value / b.max ? b.fill : 'transparent',
                borderRight: j < 40 ? '1px solid rgba(233,229,219,0.2)' : 'none'
              }"
            />
          </div>
        </div>

        <div style="border:1px solid var(--paper);padding:16px 18px;margin-top:28px;font-size:11.5px;line-height:1.7">
          <strong class="upper" style="letter-spacing:0.2em;font-size:10px">Reserve Policy</strong><br>
          The Treasury commits to maintaining a reserve ratio of no less than <strong>3 : 1</strong>
          (unmelted cans to struck bral). Current ratio:
          <span class="serif" style="font-size:32px;margin-left:8px;color:var(--accent)">{{ ratio }} : 1</span>
        </div>
      </div>

      <!-- Can wall -->
      <div>
        <div class="mono upper" style="font-size:10px;letter-spacing:0.2em;opacity:0.6;margin-bottom:12px">Vault Elevation · 1 cell ≈ 10 cans</div>
        <div style="border:1px solid var(--paper);padding:10px">
          <div style="display:grid;grid-template-columns:repeat(20,1fr);gap:3px">
            <div
              v-for="i in 220"
              :key="i"
              :style="{
                aspectRatio: '0.62',
                background: i <= Math.ceil(cans / 10) ? ((i % 7 === 0) ? 'var(--accent)' : 'var(--alu)') : 'transparent',
                border: '1px solid rgba(233,229,219,0.25)',
                opacity: i <= Math.ceil(cans / 10) ? 0.75 : 0.15,
              }"
            />
          </div>
        </div>
        <div class="mono" style="font-size:10px;margin-top:10px;display:flex;justify-content:space-between;opacity:0.6">
          <span>0</span><span>1,000</span><span>2,000</span><span>3,000 cans</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import stats from '../data/stats.json'

const cans        = stats.canReserve
const circulating = stats.circulating
const held        = stats.heldByMint

const ratio = (cans / circulating).toFixed(2)

const bars = [
  { label: 'Unmelted Cans (strategic)', value: cans,                max: 3000, fill: 'var(--paper)' },
  { label: 'Ingots in Foundry',         value: stats.ingotsInFoundry, max: 100,  fill: 'var(--accent)' },
  { label: 'Struck & in Circulation',   value: circulating,         max: 2000, fill: 'var(--alu-dark)' },
  { label: 'Held by Mint (reserve)',    value: held,                max: 2000, fill: 'var(--alu)' },
]

function fmt(n) { return n.toLocaleString('en-US') }
</script>
