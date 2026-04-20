<template>
  <section id="schedule" class="rule-b sched-section">
    <SectionHead
      eyebrow="§ 05"
      title="The Mint Schedule"
      subtitle="Striking occurs Saturdays, weather permitting. Unscheduled strikes are Commemorative and require unanimous Governor consent."
    />
    <div style="margin-top:48px;border:1px solid var(--ink)">
      <div class="sched-header mono upper" style="font-size:10px;letter-spacing:0.2em;background:var(--ink);color:var(--paper)">
        <span class="sched-date">Date</span>
        <span class="sched-event">Event</span>
        <span class="sched-delta">Reserve Δ</span>
        <span class="sched-notes">Notes</span>
        <span class="sched-status" style="text-align:right">Status</span>
      </div>
      <div
        v-for="(s, i) in schedule"
        :key="s.date"
        class="lift sched-row"
        :style="{
          borderTop: i > 0 ? '1px solid var(--ink)' : 'none',
          background: s.status === 'upcoming' ? 'var(--paper-2)' : 'transparent'
        }"
      >
        <span class="mono sched-date" style="font-size:12px">{{ s.date }}</span>
        <span class="serif sched-event" style="font-size:20px;letter-spacing:-0.01em;line-height:1.15">{{ s.event }}</span>
        <span class="mono sched-delta" style="color:var(--accent)">{{ s.reserve }}</span>
        <span class="sched-notes" style="opacity:0.9">{{ s.notes }}</span>
        <span
          class="mono upper sched-status"
          :style="{ fontSize:'10px', letterSpacing:'0.2em', textAlign:'right', color: s.status === 'upcoming' ? 'var(--accent)' : 'inherit' }"
        >{{ s.status === 'upcoming' ? '◆ ' : '' }}{{ s.status }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHead from './SectionHead.vue'
import schedule from '../data/schedule.json'
</script>

<style scoped>
.sched-section { padding: 80px 48px; }

.sched-header,
.sched-row {
  display: grid;
  grid-template-columns: 120px 1.6fr 130px 1.5fr 110px;
  padding: 12px 20px;
  gap: 16px;
  align-items: center;
  font-size: 13px;
}
.sched-row { padding: 20px; }

@media (max-width: 1024px) {
  .sched-section { padding: 60px 32px; }
  .sched-header,
  .sched-row {
    grid-template-columns: 100px 1.6fr 110px 1.2fr 90px;
    gap: 12px;
  }
}
@media (max-width: 768px) {
  .sched-section { padding: 60px 24px; }
  .sched-header,
  .sched-row {
    grid-template-columns: 90px 1fr 90px;
    grid-template-rows: auto auto auto;
    gap: 2px 10px;
    padding: 12px 16px;
  }
  .sched-date   { grid-column: 1; grid-row: 1 / 3; align-self: start; }
  .sched-event  { grid-column: 2; grid-row: 1; }
  .sched-status { grid-column: 3; grid-row: 1 / 3; align-self: start; }
  .sched-delta  { grid-column: 2; grid-row: 2; font-size: 11px; display: block; }
  .sched-notes  { grid-column: 2; grid-row: 3; font-size: 11px; display: block; }
  .sched-header .sched-delta,
  .sched-header .sched-notes { display: none; }
  .sched-row { padding: 16px; }
}
@media (max-width: 640px) {
  .sched-section { padding: 48px 20px; }
  .sched-header,
  .sched-row {
    grid-template-columns: 80px 1fr auto;
    gap: 2px 8px;
    padding: 10px 14px;
  }
  .sched-delta  { font-size: 10px !important; }
  .sched-notes  { font-size: 10px !important; }
  .sched-event  { font-size: 15px !important; }
}
</style>
