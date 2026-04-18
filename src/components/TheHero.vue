<template>
  <section class="rule-b" style="position:relative;overflow:hidden">
    <div style="display:grid;grid-template-columns:1.4fr 1fr;min-height:620px">

      <!-- Left: text -->
      <div class="rule-r" style="padding:48px 48px 140px;position:relative">
        <div style="display:flex;gap:14px;align-items:baseline;margin-bottom:26px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase">
          <span style="color:var(--accent)">◆ Nº 001</span>
          <span style="opacity:0.55">— A Communiqué From The Treasury —</span>
        </div>

        <h1 class="serif" style="font-size:clamp(72px,9vw,156px);line-height:0.88;margin:0;letter-spacing:-0.035em;font-weight:400">
          One Bral,<br>
          <em style="font-style:italic;color:var(--accent)">one beer.</em><br>
          <span style="opacity:0.85">Forever.</span>
        </h1>

        <p style="max-width:540px;margin-top:32px;font-size:14px;line-height:1.65;font-family:'JetBrains Mono',monospace">
          BRAL is a hard currency struck by hand from melted lager cans in a backyard foundry in
          Loshult, Småland. Each coin is pegged one-to-one to the Nordic standard beer.
          The peg is absolute. The reserves are transparent. The mint operates on Saturdays,
          weather permitting.
        </p>

        <div style="display:flex;gap:12px;margin-top:28px">
          <a href="#rate" class="btn">Convert Currency ▸</a>
          <a href="#mint" class="btn btn-ghost">Inspect the Coin</a>
        </div>

        <!-- stamp + signature -->
        <div style="position:absolute;right:44px;top:120px;text-align:right">
          <div class="stamp">Ratified · MMXXIV</div>
          <div class="serif" style="margin-top:14px;font-style:italic;font-size:22px;opacity:0.7">M. Linnet</div>
          <div class="mono upper" style="font-size:9px;opacity:0.55;margin-top:2px">Governor, Banco·Bral</div>
        </div>

        <!-- stats strip -->
        <div style="position:absolute;left:0;right:0;bottom:0;border-top:1px solid var(--ink);display:grid;grid-template-columns:repeat(4,1fr);font-family:'JetBrains Mono',monospace">
          <div
            v-for="(stat, i) in heroStats"
            :key="stat.key"
            :style="{ padding:'14px 18px', borderLeft: i === 0 ? 'none' : '1px solid var(--ink)' }"
          >
            <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.55">{{ stat.key }}</div>
            <div class="serif" style="font-size:26px;line-height:1.1;margin-top:4px">
              {{ stat.value }}
            </div>
            <div style="font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:var(--accent);margin-top:2px">· {{ stat.sub }}</div>
          </div>
        </div>
      </div>

      <!-- Right: spinning coin -->
      <div style="background:var(--paper-2);position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden">
        <!-- crosshatch bg -->
        <svg width="100%" height="100%" style="position:absolute;inset:0;opacity:0.12">
          <defs>
            <pattern id="cross" width="14" height="14" patternUnits="userSpaceOnUse">
              <path d="M 14 0 L 0 0 0 14" fill="none" stroke="var(--ink)" stroke-width="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cross)" />
        </svg>

        <div class="coin-spin" style="filter:drop-shadow(0 20px 30px rgba(0,0,0,0.35));width:340px;height:340px;position:relative;display:flex;align-items:center;justify-content:center">
          <img src="/img/coin.jpg" alt="Bral coin" style="width:100%;height:100%;object-fit:cover;border-radius:50%" />
        </div>

        <!-- corner registration marks -->
        <div v-for="c in ['tl','tr','bl','br']" :key="c" :style="cornerStyle(c)">
          <div :style="cornerDotStyle(c)" />
        </div>

        <div style="position:absolute;bottom:18px;left:0;right:0;text-align:center;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;opacity:0.55">
          Fig. 001 — Ten Bral, obverse
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import stats from '../data/stats.json'

function fmt(n) { return n.toLocaleString('en-US') }

const heroStats = [
  { key: 'PEG',            value: '1.00 ⇋ 1 Beer',             sub: 'stable' },
  { key: 'IN CIRCULATION', value: `${fmt(stats.circulating)} ⊝`, sub: `as of ${stats.circulationAsOf}` },
  { key: 'CAN RESERVE',    value: `${fmt(stats.canReserve)} ░`,  sub: `${stats.purity}% pure` },
  { key: 'MINTERS',        value: `${stats.minters} licensed`,   sub: `since ${stats.establishedYear}` },
]

function cornerStyle(c) {
  return {
    position: 'absolute',
    [c.includes('t') ? 'top' : 'bottom']: '14px',
    [c.includes('l') ? 'left' : 'right']: '14px',
    width: '20px', height: '20px',
    borderTop:    c.includes('t') ? '1px solid var(--ink)' : 'none',
    borderBottom: c.includes('b') ? '1px solid var(--ink)' : 'none',
    borderLeft:   c.includes('l') ? '1px solid var(--ink)' : 'none',
    borderRight:  c.includes('r') ? '1px solid var(--ink)' : 'none',
  }
}

function cornerDotStyle(c) {
  return {
    position: 'absolute',
    [c.includes('t') ? 'top' : 'bottom']: '-1px',
    [c.includes('l') ? 'left' : 'right']: '-1px',
    width: '6px', height: '6px',
    background: 'var(--accent)',
  }
}
</script>
