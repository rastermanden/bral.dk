<template>
  <section id="governors" class="rule-b gov-section">
    <SectionHead
      eyebrow="§ 07"
      title="Board of Governors"
      :subtitle="`Convenes quarterly. Quorum: ${data.charter.quorum}. Seat of record: ${data.charter.seat_of_record}.`"
    />

    <div class="gov-charter">
      <div class="gov-preamble">
        <div class="gov-eyebrow">Charter · Article of Standing</div>
        <p class="serif gov-pull">{{ data.charter.preamble }}</p>
      </div>

      <div class="gov-mandate">
        <div class="gov-eyebrow gov-eyebrow-muted">Mandate</div>
        <p class="gov-mandate-text">{{ data.charter.mandate }}</p>
      </div>

      <ol class="gov-clauses">
        <li
          v-for="(c, i) in data.charter.clauses"
          :key="c.num"
          class="gov-clause"
          :class="{ 'gov-clause-last-row': i >= data.charter.clauses.length - 2 }"
        >
          <div class="serif gov-clause-num">{{ c.num }}</div>
          <p class="gov-clause-text">{{ c.text }}</p>
        </li>
      </ol>
    </div>

    <div class="gov-roster">
      <div class="gov-row gov-row-head mono upper">
        <span class="gov-col-id">Seat</span>
        <span class="gov-col-name">Governor</span>
        <span class="gov-col-title">Title</span>
        <span class="gov-col-fn">Function</span>
        <span class="gov-col-type">Capacity</span>
      </div>
      <div
        v-for="g in data.roster"
        :key="g.id"
        class="gov-row"
        :class="{ 'gov-row-chair': g.minter_id === 'MKL' }"
      >
        <span class="mono gov-col-id">{{ g.id }}</span>
        <span class="serif gov-col-name">{{ g.name }}</span>
        <span class="mono upper gov-col-title">{{ g.title }}</span>
        <span class="serif gov-col-fn">{{ g.function }}</span>
        <span class="gov-col-type">
          <span class="gov-stamp" :class="`gov-stamp-${g.seat_type}`">
            {{ g.seat_type === 'minter' ? 'Ex Officio' : 'External' }}
          </span>
        </span>
      </div>
    </div>

    <div class="gov-footer">
      <div class="mono upper gov-footer-text">Filed · Minuted · Sealed</div>
      <TheSeal :size="36" />
    </div>
  </section>
</template>

<script setup>
import SectionHead from './SectionHead.vue'
import TheSeal from './TheSeal.vue'
import data from '../data/governors.json'
</script>

<style scoped>
.gov-section { padding: 80px 48px; background: var(--paper); }

.gov-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 14px;
}
.gov-eyebrow-muted { color: var(--ink); opacity: 0.78; margin-bottom: 10px; }

.gov-charter { margin-top: 48px; border: 1px solid var(--ink); }
.gov-preamble {
  padding: 40px 40px 32px;
  background: var(--paper-2);
  border-bottom: 1px solid var(--ink);
}
.gov-pull {
  font-size: clamp(22px, 2.4vw, 30px);
  line-height: 1.3;
  margin: 0;
  max-width: 64ch;
  font-style: italic;
  font-weight: 400;
}
.gov-mandate { padding: 28px 40px; border-bottom: 1px solid var(--ink); }
.gov-mandate-text { margin: 0; font-size: 13px; line-height: 1.7; max-width: 72ch; }

.gov-clauses {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.gov-clause {
  padding: 24px 32px;
  border-bottom: 1px solid var(--ink);
}
.gov-clause:nth-child(odd) { border-right: 1px solid var(--ink); }
.gov-clause-last-row { border-bottom: none; }
.gov-clause-num { font-size: 40px; line-height: 1; color: var(--accent); font-weight: 400; }
.gov-clause-text { margin: 10px 0 0; font-size: 12.5px; line-height: 1.65; }

.gov-roster { margin-top: 32px; border: 1px solid var(--ink); }
.gov-row {
  display: grid;
  grid-template-columns: 80px 1.4fr 1.3fr 1.8fr 110px;
  gap: 16px;
  padding: 18px 20px;
  align-items: center;
  border-top: 1px solid var(--ink);
}
.gov-row:first-child { border-top: none; }
.gov-row-head {
  background: var(--ink);
  color: var(--paper);
  padding: 12px 20px;
  font-size: 10px;
  letter-spacing: 0.22em;
}
.gov-row-chair { background: var(--paper-2); }
.gov-col-id { font-size: 11px; color: var(--accent); letter-spacing: 0.15em; }
.gov-row-head .gov-col-id { color: var(--paper); }
.gov-col-name { font-size: 22px; line-height: 1.1; letter-spacing: -0.01em; }
.gov-col-title { font-size: 10px; letter-spacing: 0.18em; opacity: 0.85; }
.gov-col-fn { font-size: 14px; font-style: italic; opacity: 0.9; }
.gov-col-type { text-align: right; }

.gov-stamp {
  display: inline-block;
  border: 1px solid var(--ink);
  padding: 3px 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
.gov-stamp-minter { background: var(--ink); color: var(--paper); }
.gov-stamp-external { background: var(--paper); color: var(--accent); border-color: var(--accent); }

.gov-footer {
  margin-top: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.gov-footer-text { font-size: 10px; letter-spacing: 0.22em; opacity: 0.78; }

@media (max-width: 1024px) {
  .gov-section { padding: 60px 32px; }
  .gov-row { grid-template-columns: 70px 1.2fr 1.2fr 1.6fr 100px; gap: 12px; }
}
@media (max-width: 768px) {
  .gov-section { padding: 60px 24px; }
  .gov-clauses { grid-template-columns: 1fr; }
  .gov-clause:nth-child(odd) { border-right: none; }
  .gov-clause { border-bottom: 1px solid var(--ink); }
  .gov-clause:last-child { border-bottom: none; }
  .gov-row, .gov-row-head {
    grid-template-columns: 60px 1fr auto;
    grid-template-rows: auto auto auto;
    gap: 4px 12px;
    padding: 16px;
  }
  .gov-col-id    { grid-column: 1; grid-row: 1 / 3; align-self: start; }
  .gov-col-name  { grid-column: 2; grid-row: 1; }
  .gov-col-title { grid-column: 2; grid-row: 2; }
  .gov-col-fn    { grid-column: 2; grid-row: 3; font-size: 12px; }
  .gov-col-type  { grid-column: 3; grid-row: 1 / 3; align-self: start; }
  .gov-row-head .gov-col-title,
  .gov-row-head .gov-col-fn { display: none; }
}
@media (max-width: 640px) {
  .gov-section { padding: 48px 20px; }
  .gov-preamble { padding: 28px 22px 22px; }
  .gov-mandate { padding: 22px; }
  .gov-clause { padding: 20px 22px; }
}
</style>
