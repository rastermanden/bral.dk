<template>
  <section id="shop" class="rule-b merch-section">
    <SectionHead
      eyebrow="§ 07"
      title="Treasury Shop"
      subtitle="All goods priced in Bral. Payable on site. Non-Bral transactions accepted at Governor's discretion."
    />
    <div class="merch-grid" style="margin-top:48px;border:1px solid var(--ink)">
      <div
        v-for="(item, i) in merch"
        :key="item.sku"
        class="lift merch-item"
        :style="{
          padding: '28px 28px 22px',
          borderRight: (i + 1) % 3 !== 0 && i !== merch.length - 1 ? '1px solid var(--ink)' : 'none',
          borderBottom: i < merch.length - (merch.length % 3 || 3) ? '1px solid var(--ink)' : 'none',
          background: 'var(--paper)', position: 'relative'
        }"
      >
        <!-- Placeholder image -->
        <div style="aspect-ratio:1.2;background:var(--paper-2);margin-bottom:18px;position:relative;overflow:hidden;border:1px solid var(--ink)">
          <svg viewBox="0 0 120 100" width="100%" height="100%" style="display:block">
            <defs>
              <pattern :id="`ms-${item.sku}`" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke="var(--ink)" stroke-opacity="0.15" stroke-width="2"/>
              </pattern>
            </defs>
            <rect width="120" height="100" :fill="`url(#ms-${item.sku})`" />
            <text x="60" y="55" text-anchor="middle" font-family="JetBrains Mono" font-size="6" fill="var(--ink)" opacity="0.55" letter-spacing="2">[ PRODUCT IMAGE ]</text>
            <text x="60" y="66" text-anchor="middle" font-family="JetBrains Mono" font-size="5" fill="var(--ink)" opacity="0.4" letter-spacing="1">{{ item.sku }}</text>
          </svg>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:baseline">
          <div class="mono upper" style="font-size:9px;letter-spacing:0.2em;opacity:0.55">{{ item.sku }}</div>
          <div class="serif" style="font-size:32px;letter-spacing:-0.01em;color:var(--accent)">
            {{ item.price }}<span style="font-size:12px;opacity:0.6;margin-left:4px">bral</span>
          </div>
        </div>
        <div class="serif" style="font-size:24px;line-height:1.15;margin-top:6px">{{ item.name }}</div>
        <div style="font-size:11.5px;opacity:0.7;margin-top:6px;line-height:1.55">{{ item.desc }}</div>
        <div style="margin-top:16px;display:flex;gap:10px">
          <button class="btn" style="padding:8px 12px;font-size:10px">Add to Cart</button>
          <button class="btn btn-ghost" style="padding:8px 12px;font-size:10px">Details</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHead from './SectionHead.vue'
import merch from '../data/merch.json'
</script>

<style scoped>
.merch-section { padding: 80px 48px; }
.merch-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
}

@media (max-width: 768px) {
  .merch-section { padding: 60px 24px; }
  .merch-grid { grid-template-columns: repeat(2, 1fr); }
  .merch-item { border-right: none !important; }
  .merch-item:nth-child(odd) { border-right: 1px solid var(--ink) !important; }
}
@media (max-width: 640px) {
  .merch-section { padding: 48px 20px; }
  .merch-grid { grid-template-columns: 1fr; }
  .merch-item { border-right: none !important; }
  .merch-item { border-bottom: 1px solid var(--ink) !important; }
}
</style>
