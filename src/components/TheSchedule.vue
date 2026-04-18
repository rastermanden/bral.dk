<template>
  <section id="schedule" class="rule-b" style="padding:80px 48px">
    <SectionHead
      eyebrow="§ 05"
      title="The Mint Schedule"
      subtitle="Striking occurs Saturdays, weather permitting. Unscheduled strikes are Commemorative and require unanimous Governor consent."
    />
    <div style="margin-top:48px;border:1px solid var(--ink)">
      <div class="mono upper" style="display:grid;grid-template-columns:120px 1.6fr 130px 1.5fr 110px;padding:12px 20px;font-size:10px;letter-spacing:0.2em;background:var(--ink);color:var(--paper);gap:16px">
        <span>Date</span>
        <span>Event</span>
        <span>Reserve Δ</span>
        <span>Notes</span>
        <span style="text-align:right">Status</span>
      </div>
      <div
        v-for="(s, i) in schedule"
        :key="s.date"
        class="lift"
        :style="{
          display: 'grid',
          gridTemplateColumns: '120px 1.6fr 130px 1.5fr 110px',
          padding: '20px',
          borderTop: i > 0 ? '1px solid var(--ink)' : 'none',
          alignItems: 'center',
          fontSize: '13px',
          gap: '16px',
          background: s.status === 'upcoming' ? 'var(--paper-2)' : 'transparent'
        }"
      >
        <span class="mono" style="font-size:12px">{{ s.date }}</span>
        <span class="serif" style="font-size:20px;letter-spacing:-0.01em;line-height:1.15">{{ s.event }}</span>
        <span class="mono" style="color:var(--accent)">{{ s.reserve }}</span>
        <span style="opacity:0.75">{{ s.notes }}</span>
        <span class="mono upper" :style="{ fontSize:'10px', letterSpacing:'0.2em', textAlign:'right', color: s.status === 'upcoming' ? 'var(--accent)' : 'inherit' }">
          {{ s.status === 'upcoming' ? '◆ ' : '' }}{{ s.status }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHead from './SectionHead.vue'
import schedule from '../data/schedule.json'
</script>
