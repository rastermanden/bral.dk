<template>
  <section id="manifesto" class="rule-b manifesto-section">
    <SectionHead eyebrow="§ 01" title="The Manifesto" subtitle="Articles of the Aluminum Standard" />
    <div class="manifesto-grid" style="margin-top:48px;border-top:1px solid var(--ink)">
      <article
        v-for="(a, i) in articles"
        :key="a.num"
        :style="{
          padding: '28px 32px',
          borderBottom: '1px solid var(--ink)',
          borderRight: i % 2 === 0 ? '1px solid var(--ink)' : 'none',
          background: i === 0 ? 'var(--paper-2)' : 'transparent'
        }"
      >
        <div style="display:flex;justify-content:space-between;align-items:baseline">
          <div class="serif" style="font-size:48px;line-height:1;color:var(--accent)">{{ a.num }}</div>
          <div class="mono upper" style="font-size:10px;opacity:0.55">Article</div>
        </div>
        <h3 class="serif" style="font-size:28px;margin:12px 0 10px;font-weight:400">{{ a.title }}</h3>
        <p style="font-size:12.5px;line-height:1.7;margin:0;max-width:420px">{{ a.body }}</p>
      </article>

      <article class="signed-article" style="padding:28px 32px;display:flex;justify-content:space-between;align-items:center;background:var(--ink);color:var(--paper)">
        <div class="serif" style="font-size:28px;font-style:italic">— Signed, the Six —</div>
        <div class="mono upper signed-names" style="font-size:10px;letter-spacing:0.25em">M. LINNET · T. RANUM · K.O. MØLLER · U. SCHJØDT · M.B. JENSEN · S.K. POULSEN</div>
      </article>
    </div>
  </section>
</template>

<script setup>
import SectionHead from './SectionHead.vue'
import articles from '../data/articles.json'
</script>

<style scoped>
.manifesto-section {
  padding: 80px 48px;
  position: relative;
}
.manifesto-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}
.signed-article {
  grid-column: span 2;
  border-bottom: 1px solid var(--ink);
}

@media (max-width: 768px) {
  .manifesto-section { padding: 60px 24px; }
}
@media (max-width: 640px) {
  .manifesto-section { padding: 48px 20px; }
  .manifesto-grid { grid-template-columns: 1fr; }
  .signed-article {
    grid-column: span 1;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  .signed-names { font-size: 9px !important; letter-spacing: 0.15em !important; }
}
</style>
