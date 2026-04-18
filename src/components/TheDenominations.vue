<template>
  <section id="mint" class="rule-b" style="padding:80px 48px;position:relative">
    <SectionHead
      eyebrow="§ 03"
      title="The Denominations"
      subtitle="Six tenders, struck by hand. Diameter, mass, edge, and legend as specified by the Mint."
    />

    <div style="display:grid;grid-template-columns:1fr 1.3fr;gap:48px;margin-top:56px">

      <!-- Coin grid -->
      <div style="border:1px solid var(--ink);background:var(--paper-2)">
        <div style="display:grid;grid-template-columns:1fr 1fr">
          <button
            v-for="(d, i) in denoms"
            :key="d.value"
            @click="sel = d"
            class="lift"
            :style="{
              padding: '28px 20px',
              background: sel.value === d.value ? 'var(--paper)' : 'transparent',
              border: 'none',
              borderRight: i % 2 === 0 ? '1px solid var(--ink)' : 'none',
              borderBottom: i < 4 ? '1px solid var(--ink)' : 'none',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
              cursor: 'pointer', position: 'relative'
            }"
          >
            <div v-if="sel.value === d.value" style="position:absolute;top:8px;left:10px;width:6px;height:6px;background:var(--accent)" />
            <TheCoin :denom="d" :size="92" />
            <div class="serif" style="font-size:22px;margin-top:4px">{{ d.value }} <span style="opacity:0.5;font-size:14px">bral</span></div>
            <div class="mono upper" style="font-size:9px;letter-spacing:0.15em;opacity:0.6;text-align:center;white-space:normal;line-height:1.4">{{ d.name }}</div>
          </button>
        </div>
      </div>

      <!-- Detail -->
      <div style="position:relative">
        <div style="display:flex;align-items:flex-start;gap:30px">
          <div style="flex-shrink:0">
            <TheCoin :denom="sel" :size="220" />
            <div class="mono upper" style="font-size:9px;letter-spacing:0.2em;margin-top:10px;opacity:0.55;text-align:center">
              Obverse · actual size × 1.4
            </div>
          </div>
          <div style="flex:1">
            <div class="mono upper" style="font-size:10px;letter-spacing:0.2em;color:var(--accent)">Specimen · {{ sel.name }}</div>
            <div class="serif" style="font-size:72px;line-height:0.95;letter-spacing:-0.02em;margin:10px 0">
              {{ sel.value }}<span style="font-size:24px;opacity:0.5;margin-left:8px">bral</span>
            </div>

            <table class="mono" style="width:100%;font-size:11.5px;border-collapse:collapse;margin-top:18px">
              <tbody>
                <tr v-for="row in specsFor(sel)" :key="row[0]" style="border-top:1px solid var(--ink)">
                  <td style="padding:10px 8px 10px 0;text-transform:uppercase;font-size:10px;letter-spacing:0.15em;opacity:0.6;width:140px">{{ row[0] }}</td>
                  <td style="padding:10px 0">
                    <span v-if="row[0] === 'Redemption'">
                      <strong style="color:var(--accent)">{{ sel.value }}</strong> standard beer{{ sel.value === 1 ? '' : 's' }}
                    </span>
                    <span v-else>{{ row[1] }}</span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div style="margin-top:22px;display:flex;gap:10px">
              <a href="#schedule" class="btn">Acquire at next strike ▸</a>
              <button class="btn btn-ghost">Download spec sheet</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import SectionHead from './SectionHead.vue'
import TheCoin from './TheCoin.vue'
import denoms from '../data/denominations.json'

const sel = ref(denoms[2])

function specsFor(d) {
  return [
    ['Legend',      d.legend],
    ['Diameter',    `${d.diameter}.0 mm`],
    ['Mass',        `${d.mass} g`],
    ['Edge',        d.edge],
    ['Composition', 'Al 98.2% · Mg 1.1% · Mn 0.7%'],
    ['Year',        d.year],
    ['Mint mark',   'B· (Loshult Foundry)'],
    ['Circulation', `${Math.round(d.value * 17 + 40)} pcs`],
    ['Redemption',  ''],
  ]
}
</script>
