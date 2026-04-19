<template>
  <section id="hammer" class="rule-b hammer-section" style="background:var(--ink);color:var(--paper)">
    <div class="hammer-header">
      <div>
        <div style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:var(--accent);margin-bottom:12px">§ 08</div>
        <h2 class="serif" style="font-size:clamp(40px,5vw,72px);margin:0;line-height:0.95;letter-spacing:-0.02em;font-weight:400">The Bral Hammer</h2>
      </div>
      <div class="hammer-subtitle" style="max-width:360px;font-size:12px;line-height:1.6;opacity:0.7">
        Custom-made striking instrument of the Banco·Bral. Each coin bears its mark. Not for sale; not for loan.
      </div>
    </div>

    <div class="hammer-grid" style="margin-top:56px;align-items:start">

      <!-- Hammer illustration / photo -->
      <div>
        <div class="mono upper" style="font-size:10px;letter-spacing:0.2em;opacity:0.6;margin-bottom:12px">Technical Drawing · Elevation</div>
        <div style="border:1px solid var(--paper);padding:24px;position:relative;background:rgba(233,229,219,0.03)">
          <img
            :src="base + 'img/hammer.jpg'"
            alt="The Bral Hammer"
            class="hammer-photo"
            @error="photoErr = true"
            :style="{ display: photoErr ? 'none' : 'block' }"
          />
          <!-- SVG drawing shown when no photo -->
          <svg v-if="photoErr" viewBox="0 0 520 300" width="100%" style="display:block">
            <defs>
              <pattern id="hgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(233,229,219,0.06)" stroke-width="0.5"/>
              </pattern>
              <!-- Hatching for handle -->
              <pattern id="wood" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
                <line x1="0" y1="0" x2="0" y2="4" stroke="rgba(26,23,20,0.25)" stroke-width="1"/>
              </pattern>
            </defs>
            <rect width="520" height="300" fill="url(#hgrid)"/>

            <!-- Hammer head body -->
            <rect x="70" y="110" width="200" height="80" rx="3"
              fill="var(--alu)" stroke="var(--paper)" stroke-width="1.5" opacity="0.85"/>
            <!-- Head chamfer lines -->
            <line x1="70" y1="124" x2="270" y2="124" stroke="var(--alu-dark)" stroke-width="1.5" opacity="0.5"/>
            <line x1="70" y1="176" x2="270" y2="176" stroke="var(--alu-dark)" stroke-width="1.5" opacity="0.5"/>
            <!-- Striking face -->
            <rect x="70" y="110" width="22" height="80" rx="2"
              fill="var(--alu-dark)" stroke="var(--paper)" stroke-width="1" opacity="0.95"/>
            <!-- Strike face cross-mark -->
            <line x1="81" y1="125" x2="81" y2="175" stroke="var(--accent)" stroke-width="0.8" opacity="0.6" stroke-dasharray="3,3"/>
            <line x1="73" y1="150" x2="90" y2="150" stroke="var(--accent)" stroke-width="0.8" opacity="0.6" stroke-dasharray="3,3"/>
            <!-- Peen (wedge end) -->
            <polygon points="270,118 298,142 270,182"
              fill="var(--alu-dark)" stroke="var(--paper)" stroke-width="1" opacity="0.9"/>
            <!-- Eye (handle hole) -->
            <ellipse cx="165" cy="150" rx="16" ry="10"
              fill="rgba(26,23,20,0.6)" stroke="var(--paper)" stroke-width="1" opacity="0.9"/>

            <!-- Handle -->
            <rect x="157" y="160" width="16" height="115" rx="3"
              fill="#c8b596" stroke="var(--paper)" stroke-width="1.2" opacity="0.92"/>
            <!-- Wood grain -->
            <line x1="160" y1="170" x2="161" y2="272" stroke="rgba(26,23,20,0.18)" stroke-width="1"/>
            <line x1="165" y1="168" x2="166" y2="273" stroke="rgba(26,23,20,0.1)" stroke-width="0.5"/>
            <line x1="170" y1="170" x2="171" y2="272" stroke="rgba(26,23,20,0.18)" stroke-width="1"/>
            <!-- Handle wrap -->
            <rect x="156" y="252" width="18" height="8" rx="1"
              fill="rgba(233,229,219,0.15)" stroke="var(--paper)" stroke-width="0.8"/>
            <rect x="156" y="262" width="18" height="8" rx="1"
              fill="rgba(233,229,219,0.15)" stroke="var(--paper)" stroke-width="0.8"/>

            <!-- Dimension: head width -->
            <line x1="70" y1="96" x2="270" y2="96" stroke="rgba(233,229,219,0.35)" stroke-width="0.6"/>
            <line x1="70" y1="92" x2="70" y2="100" stroke="rgba(233,229,219,0.35)" stroke-width="0.6"/>
            <line x1="270" y1="92" x2="270" y2="100" stroke="rgba(233,229,219,0.35)" stroke-width="0.6"/>
            <text x="170" y="90" text-anchor="middle" fill="rgba(233,229,219,0.5)"
              font-family="JetBrains Mono" font-size="9" letter-spacing="0.05em">264 mm</text>

            <!-- Dimension: head height -->
            <line x1="318" y1="110" x2="318" y2="190" stroke="rgba(233,229,219,0.35)" stroke-width="0.6"/>
            <line x1="314" y1="110" x2="322" y2="110" stroke="rgba(233,229,219,0.35)" stroke-width="0.6"/>
            <line x1="314" y1="190" x2="322" y2="190" stroke="rgba(233,229,219,0.35)" stroke-width="0.6"/>
            <text x="330" y="154" fill="rgba(233,229,219,0.5)"
              font-family="JetBrains Mono" font-size="9" letter-spacing="0.05em">80 mm</text>

            <!-- Dimension: handle length -->
            <line x1="340" y1="160" x2="340" y2="275" stroke="rgba(233,229,219,0.35)" stroke-width="0.6"/>
            <line x1="336" y1="160" x2="344" y2="160" stroke="rgba(233,229,219,0.35)" stroke-width="0.6"/>
            <line x1="336" y1="275" x2="344" y2="275" stroke="rgba(233,229,219,0.35)" stroke-width="0.6"/>
            <text x="352" y="222" fill="rgba(233,229,219,0.5)"
              font-family="JetBrains Mono" font-size="9" letter-spacing="0.05em">360 mm</text>

            <!-- Labels -->
            <text x="81" y="105" text-anchor="middle" fill="var(--accent)"
              font-family="JetBrains Mono" font-size="8" letter-spacing="0.15em" opacity="0.8">FACE</text>
            <text x="170" y="153" text-anchor="middle" dominant-baseline="middle"
              fill="rgba(233,229,219,0.25)" font-family="JetBrains Mono" font-size="8" letter-spacing="0.1em">HEAD</text>
            <text x="165" y="235" text-anchor="middle" fill="rgba(233,229,219,0.4)"
              font-family="JetBrains Mono" font-size="7" letter-spacing="0.12em">BB·H·001</text>
          </svg>

          <div style="display:flex;gap:24px;margin-top:14px;font-size:10px;opacity:0.5" class="mono upper">
            <span>── Aluminum head</span>
            <span>── Hardwood haft</span>
            <span style="color:var(--accent)">── Strike axis</span>
          </div>
        </div>
      </div>

      <!-- Registry + specs -->
      <div>
        <div class="mono upper" style="font-size:10px;letter-spacing:0.2em;opacity:0.6;margin-bottom:18px">Registry Entry</div>

        <div style="border:1px solid var(--paper);padding:22px 20px;margin-bottom:20px;position:relative">
          <div class="mono upper" style="font-size:8px;letter-spacing:0.25em;opacity:0.5;margin-bottom:6px">Instrument Designation</div>
          <div class="serif" style="font-size:clamp(22px,2.5vw,32px);line-height:1.1;letter-spacing:-0.02em">
            BANCO·BRAL<br/>STRIKING HAMMER
          </div>
          <div class="mono upper" style="font-size:9px;letter-spacing:0.2em;color:var(--accent);margin-top:10px">Reg. No. BB·H·001</div>
          <div class="stamp" style="position:absolute;right:-8px;bottom:-10px;background:var(--ink)">Active</div>
        </div>

        <div
          v-for="spec in specs"
          :key="spec.label"
          style="display:flex;justify-content:space-between;align-items:baseline;padding:10px 0;border-bottom:1px solid rgba(233,229,219,0.12)"
        >
          <div class="mono upper" style="font-size:10px;letter-spacing:0.15em;opacity:0.5">{{ spec.label }}</div>
          <div class="serif" style="font-size:18px">{{ spec.value }}</div>
        </div>

        <div style="border:1px solid var(--paper);padding:16px 18px;margin-top:24px;font-size:11.5px;line-height:1.75;opacity:0.8">
          <strong class="upper" style="letter-spacing:0.2em;font-size:10px;opacity:1">Provenance Note</strong><br>
          Custom-made by members of Banco·Bral for the sole purpose of striking and embossing Bral denominations.
          The head is cast from repurposed aluminum stock and fitted to a turned hardwood handle.
          Considered the primary instrument of the mint; irreplaceable.
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const base = import.meta.env.BASE_URL
const photoErr = ref(true)

const specs = [
  { label: 'Material',      value: 'Aluminum / Hardwood' },
  { label: 'Head Mass',     value: '~820 g' },
  { label: 'Total Length',  value: '420 mm' },
  { label: 'Strike Face',   value: '18 × 80 mm' },
  { label: 'Finish',        value: 'Raw / Unpolished' },
  { label: 'Commissioned',  value: 'MMXXIV' },
  { label: 'Status',        value: 'In Active Use' },
]
</script>

<style scoped>
.hammer-section { padding: 80px 48px; }
.hammer-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
}
.hammer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 48px;
}
.hammer-photo {
  width: 100%;
  height: auto;
  display: block;
  filter: grayscale(1) contrast(1.2);
}

@media (max-width: 1024px) {
  .hammer-section { padding: 60px 32px; }
  .hammer-grid { gap: 32px; }
}
@media (max-width: 768px) {
  .hammer-section { padding: 60px 24px; }
  .hammer-header { flex-direction: column; align-items: flex-start; }
  .hammer-subtitle { text-align: left !important; max-width: 100% !important; }
  .hammer-grid { grid-template-columns: 1fr; gap: 32px; }
}
@media (max-width: 640px) {
  .hammer-section { padding: 48px 20px; }
}
</style>
