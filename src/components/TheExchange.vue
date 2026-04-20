<template>
  <section id="rate" class="rule-b exchange-section" style="background:var(--paper-2);position:relative">
    <SectionHead
      eyebrow="§ 02"
      title="The Exchange"
      subtitle="The peg is fixed. The chart, accordingly, is boring. We have left it on the wall regardless."
    />

    <div class="exchange-grid" style="margin-top:56px;border:1px solid var(--ink);background:var(--paper)">

      <!-- Calculator -->
      <div class="rule-r exchange-calc" style="padding:36px 40px">
        <div style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;opacity:0.78;margin-bottom:8px">Official Conversion Engine</div>
        <div class="serif" style="font-size:34px;line-height:1.1;letter-spacing:-0.01em;margin-bottom:28px">
          Convert between <em>Bral</em> and <em>Beer</em>.
        </div>

        <div role="group" aria-label="Conversion direction" style="display:flex;align-items:stretch;border:1px solid var(--ink);margin-bottom:20px">
          <button
            @click="mode = 'bralToBeer'"
            :aria-pressed="mode === 'bralToBeer'"
            :style="{ flex:1, padding:'12px', border:'none', background: mode==='bralToBeer' ? 'var(--ink)' : 'transparent', color: mode==='bralToBeer' ? 'var(--paper)' : 'var(--ink)', cursor:'pointer', fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase' }"
          >Bral ▸ Beer</button>
          <button
            @click="mode = 'beerToBral'"
            :aria-pressed="mode === 'beerToBral'"
            :style="{ flex:1, padding:'12px', border:'none', borderLeft:'1px solid var(--ink)', background: mode==='beerToBral' ? 'var(--ink)' : 'transparent', color: mode==='beerToBral' ? 'var(--paper)' : 'var(--ink)', cursor:'pointer', fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase' }"
          >Beer ▸ Bral</button>
        </div>

        <div style="border:1px solid var(--ink);padding:18px 20px;background:var(--paper-2);margin-bottom:14px">
          <label for="exchange-amount" style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.78;display:block">You deposit</label>
          <div style="display:flex;align-items:baseline;gap:12px">
            <input
              id="exchange-amount"
              type="number"
              :value="amount"
              @input="onAmountInput"
              min="0"
              step="1"
              :aria-label="`Amount in ${from}`"
              style="border:none;background:transparent;font-size:56px;width:100%;font-family:'Instrument Serif',serif;padding:0;color:var(--ink);min-width:0"
            />
            <div class="upper" style="font-size:14px;letter-spacing:0.2em">{{ from }}</div>
          </div>
        </div>

        <div aria-hidden="true" style="text-align:center;font-size:20px;opacity:0.78;margin:4px 0">↓</div>

        <div
          role="status"
          aria-live="polite"
          :aria-label="`${fmt(result)} ${to}`"
          style="border:1px solid var(--ink);padding:18px 20px;background:var(--ink);color:var(--paper)"
        >
          <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.78">You receive</div>
          <div style="display:flex;align-items:baseline;gap:12px">
            <div style="font-size:56px;font-family:'Instrument Serif',serif;width:100%;line-height:1.05">{{ fmt(result) }}</div>
            <div class="upper" style="font-size:14px;letter-spacing:0.2em">{{ to }}</div>
          </div>
          <div class="mono" style="font-size:10px;margin-top:8px;opacity:0.78;letter-spacing:0.08em">
            ≡ {{ fmt(result * 330) }} mL · {{ (result * 0.33).toFixed(2) }} L
          </div>
        </div>

        <div class="mono exchange-footer" style="font-size:10px;margin-top:14px;display:flex;justify-content:space-between;opacity:0.7">
          <span>Rate · 1.00000 · fixed</span>
          <span>Fee · 0.000 · gratis</span>
          <span class="exchange-footer-date">Quoted · {{ today }} 19:04 CET</span>
        </div>
      </div>

      <!-- Chart -->
      <div class="exchange-chart" style="padding:36px 40px;position:relative">
        <div style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;opacity:0.78;margin-bottom:8px">Historical Rate · BRAL / BEER</div>
        <div class="serif" style="font-size:34px;line-height:1.1;margin-bottom:28px">Stability, <em>by design</em>.</div>

        <svg viewBox="0 0 400 180" width="100%" height="200" style="border:1px solid var(--ink);background:var(--paper-2)">
          <g v-for="r in gridLines" :key="r">
            <line x1="40" x2="400" :y1="yPos(r)" :y2="yPos(r)" stroke="var(--ink)" stroke-width="0.3" :stroke-dasharray="r === 1 ? '0' : '2 2'" :opacity="r === 1 ? 0.9 : 0.3" />
            <text x="4" :y="yPos(r) + 3" font-size="8" font-family="JetBrains Mono" fill="var(--ink)" opacity="0.6">{{ r.toFixed(2) }}</text>
          </g>

          <path :d="linePath" fill="none" stroke="var(--accent)" stroke-width="1.6" />

          <g v-for="(pt, i) in chartPoints" :key="i">
            <circle :cx="pt.x" :cy="pt.y" r="2.5" fill="var(--accent)" />
            <text :x="pt.x" y="175" font-size="7.5" font-family="JetBrains Mono" text-anchor="middle" fill="var(--ink)" opacity="0.7">{{ pt.period }}</text>
            <text v-if="pt.note" :x="pt.x" :y="pt.y - 8" font-size="7" font-family="JetBrains Mono" text-anchor="middle" fill="var(--ink)" opacity="0.85">{{ pt.note }}</text>
          </g>
        </svg>

        <div class="mono" style="font-size:10px;margin-top:12px;opacity:0.7">
          † The Q3 25 deviation followed a regional aluminum-can shortage (the "Dry August"). Peg restored within 11 days by an emergency pull-tab strike.
        </div>

        <div style="display:grid;grid-template-columns:repeat(3,1fr);margin-top:22px;border:1px solid var(--ink)">
          <div v-for="(stat, i) in chartStats" :key="stat.label" :style="{ padding:'12px 14px', borderLeft: i===0 ? 'none' : '1px solid var(--ink)' }">
            <div style="font-size:9px;letter-spacing:0.15em;text-transform:uppercase;opacity:0.78">{{ stat.label }}</div>
            <div class="serif" style="font-size:22px;line-height:1.1;margin-top:2px">{{ stat.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import SectionHead from './SectionHead.vue'
import rates from '../data/rates.json'

const mode   = ref('bralToBeer')
const amount = ref(12)

const from   = computed(() => mode.value === 'bralToBeer' ? 'BRAL' : 'BEER')
const to     = computed(() => mode.value === 'bralToBeer' ? 'BEER' : 'BRAL')
const result = computed(() => Number.isFinite(amount.value) ? amount.value : 0)
const today  = new Date().toISOString().slice(0, 10)

function onAmountInput(e) {
  const raw = e.target.value
  if (raw === '' || raw === '-') { amount.value = 0; return }
  const n = Number(raw)
  amount.value = Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0
}

function fmt(n) {
  return Number.isFinite(n) ? n.toLocaleString('en-US') : '0'
}

const gridLines = [0.9, 0.95, 1.0, 1.05, 1.1]

function yPos(r) { return 180 - ((r - 0.9) / 0.2) * 160 - 10 }

const chartPoints = computed(() =>
  rates.map((r, i) => ({
    x:      40 + (i / (rates.length - 1)) * 350,
    y:      yPos(r.rate),
    period: r.period,
    note:   r.note,
  }))
)

const linePath = computed(() =>
  chartPoints.value.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`).join(' ')
)

const chartStats = [
  { label: '30D VOLATILITY',     value: '0.00%' },
  { label: 'DEVIATION EVENTS',   value: '1 / 24m' },
  { label: 'REDEMPTION SUCCESS', value: '100%' },
]
</script>

<style scoped>
.exchange-section { padding: 80px 48px; }
.exchange-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 0;
}

@media (max-width: 1024px) {
  .exchange-section { padding: 60px 32px; }
  .exchange-calc { padding: 28px 28px !important; }
  .exchange-chart { padding: 28px 28px !important; }
}
@media (max-width: 768px) {
  .exchange-section { padding: 60px 24px; }
  .exchange-grid { grid-template-columns: 1fr; }
  .exchange-calc { border-right: none !important; }
  .exchange-footer-date { display: none; }
}
@media (max-width: 640px) {
  .exchange-section { padding: 48px 20px; }
  .exchange-calc { padding: 24px 20px !important; }
  .exchange-chart { padding: 24px 20px !important; }
}
</style>
