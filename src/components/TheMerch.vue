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
        <!-- Product illustration -->
        <div style="aspect-ratio:1.2;background:var(--paper-2);margin-bottom:18px;position:relative;overflow:hidden;border:1px solid var(--ink)">
          <MerchArt :sku="item.sku" />
        </div>

        <div style="display:flex;justify-content:space-between;align-items:baseline">
          <div class="mono upper" style="font-size:9px;letter-spacing:0.2em;opacity:0.78">{{ item.sku }}</div>
          <div class="serif" style="font-size:32px;letter-spacing:-0.01em;color:var(--accent)">
            {{ item.price }}<span style="font-size:12px;opacity:0.78;margin-left:4px">bral</span>
          </div>
        </div>
        <div class="serif" style="font-size:24px;line-height:1.15;margin-top:6px">{{ item.name }}</div>
        <div style="font-size:11.5px;opacity:0.88;margin-top:6px;line-height:1.55">{{ item.desc }}</div>
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
import MerchArt from './MerchArt.vue'
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
