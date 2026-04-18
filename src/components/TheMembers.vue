<template>
  <section id="members" class="rule-b" style="padding:80px 48px;background:var(--paper-2)">
    <SectionHead
      eyebrow="§ 06"
      title="The Mint Roster"
      subtitle="Six signatories of the Aluminum Accord. Each licensed to strike; each subject to audit."
    />

    <!-- Member tabs -->
    <div style="display:grid;grid-template-columns:repeat(6,1fr);margin-top:48px;border:1px solid var(--ink)">
      <button
        v-for="(m, i) in members"
        :key="m.id"
        @click="selIdx = i"
        :style="{
          background: selIdx === i ? 'var(--ink)' : 'var(--paper)',
          color:      selIdx === i ? 'var(--paper)' : 'var(--ink)',
          border: 'none',
          borderRight: i < 5 ? '1px solid var(--ink)' : 'none',
          padding: '20px 16px', cursor: 'pointer', textAlign: 'left'
        }"
      >
        <!-- portrait -->
        <div style="aspect-ratio:1;background:var(--paper-2);margin-bottom:12px;position:relative;overflow:hidden;border:1px solid var(--ink)">
          <img
            :src="base + m.img.replace(/^\//, '')"
            :alt="m.name"
            :style="{
              width:'100%', height:'100%', objectFit:'cover',
              filter: selIdx === i
                ? 'grayscale(1) contrast(1.25) brightness(1.05)'
                : 'grayscale(1) contrast(1.15) brightness(0.95)',
              display: 'block'
            }"
            @error="e => e.target.style.display = 'none'"
          />
          <!-- duotone overlay -->
          <div :style="{
            position:'absolute', inset:0,
            background: selIdx === i
              ? 'linear-gradient(180deg,rgba(195,65,11,0.18),rgba(26,23,20,0.55))'
              : 'linear-gradient(180deg,rgba(195,65,11,0.05),rgba(26,23,20,0.08))',
            mixBlendMode: 'multiply', pointerEvents: 'none'
          }" />
          <!-- ID badge -->
          <div :style="{
            position:'absolute', top:'6px', left:'6px',
            fontFamily: 'JetBrains Mono,monospace', fontSize:'9px', letterSpacing:'0.2em', fontWeight:600,
            color:      selIdx === i ? 'var(--ink)'   : 'var(--paper)',
            background: selIdx === i ? 'var(--paper)' : 'var(--ink)',
            padding: '2px 6px'
          }">{{ m.id }}</div>
          <!-- active dot -->
          <div v-if="selIdx === i" style="position:absolute;bottom:6px;right:6px;width:8px;height:8px;background:var(--accent)" />
        </div>

        <div class="mono upper" style="font-size:9px;letter-spacing:0.2em;opacity:0.6">{{ m.role }}</div>
        <div class="serif" style="font-size:20px;line-height:1.1;margin-top:4px">{{ m.name.split(' ')[0] }}</div>
      </button>
    </div>

    <!-- Detail panels -->
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;border:1px solid var(--ink);border-top:none">

      <!-- Bio -->
      <div class="rule-r" style="padding:32px">
        <div class="mono upper" style="font-size:10px;letter-spacing:0.2em;color:var(--accent)">Licensed Minter · {{ sel.id }}</div>
        <div class="serif" style="font-size:44px;line-height:1;margin:10px 0;letter-spacing:-0.02em">{{ sel.name }}</div>
        <div class="mono upper" style="font-size:10px;letter-spacing:0.2em;opacity:0.6;margin-top:6px">{{ sel.role }}</div>
        <div class="serif" style="font-size:22px;font-style:italic;margin-top:22px;opacity:0.85">"{{ sel.motto }}"</div>
      </div>

      <!-- Stats -->
      <div class="rule-r" style="padding:32px">
        <div class="mono upper" style="font-size:10px;letter-spacing:0.2em;opacity:0.6;margin-bottom:18px">Statistics, to Date</div>
        <div v-for="[label, val, max] in statsFor(sel)" :key="label" style="margin-bottom:16px">
          <div style="display:flex;justify-content:space-between;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:4px">
            <span>{{ label }}</span>
            <span class="serif" style="font-size:18px">{{ val }}</span>
          </div>
          <div style="height:8px;background:var(--paper);border:1px solid var(--ink)">
            <div :style="{ height:'100%', width: `${(val / max) * 100}%`, background:'var(--accent)' }" />
          </div>
        </div>
      </div>

      <!-- Certificate -->
      <div style="padding:32px">
        <div class="mono upper" style="font-size:10px;letter-spacing:0.2em;opacity:0.6;margin-bottom:18px">Certification of Authority</div>
        <div style="border:1px solid var(--ink);padding:22px 20px;background:var(--paper);position:relative">
          <div class="serif" style="font-size:22px;line-height:1.2;font-style:italic;margin-bottom:14px">
            Let it be known that <strong style="font-style:normal">{{ sel.name }}</strong> is duly licensed to strike, assay, and countersign Bral coin in the name of the Banco·Bral.
          </div>
          <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:18px">
            <div>
              <div class="serif" style="font-style:italic;font-size:18px">M. Linnet</div>
              <div class="mono upper" style="font-size:8px;letter-spacing:0.2em;opacity:0.55">Governor</div>
            </div>
            <TheSeal :size="44" />
          </div>
          <div class="stamp" style="position:absolute;right:-8px;bottom:-10px;background:var(--paper)">Active · {{ sel.id }}</div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
const base = import.meta.env.BASE_URL
import SectionHead from './SectionHead.vue'
import TheSeal from './TheSeal.vue'
import members from '../data/members.json'

const selIdx = ref(0)
const sel    = computed(() => members[selIdx.value])

function statsFor(m) {
  return [
    ['Coins Minted',      m.minted, 200],
    ['Currently Held',    m.held,    80],
    ['Cans Contributed',  m.cans,   500],
  ]
}
</script>
