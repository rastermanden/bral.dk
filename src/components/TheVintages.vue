<template>
  <section id="vintages" class="rule-b vintages-section">
    <SectionHead
      eyebrow="§ 03B"
      title="The Vintages"
      subtitle="One strike per calendar year. Each vintage is catalogued, sealed, and retired at year-end."
    />

    <div class="vintages-stack">
      <article
        v-for="v in vintages"
        :key="v.year"
        class="vintage"
        :class="{ 'is-scheduled': v.status === 'scheduled' }"
      >
        <!-- Meta column -->
        <div class="vintage-meta">
          <div class="vintage-status mono upper">
            <span class="status-mark">{{ v.status === 'scheduled' ? '◆' : '■' }}</span>
            {{ v.status === 'scheduled' ? 'Scheduled Strike' : 'Struck &amp; Sealed' }}
          </div>
          <div class="vintage-year serif">{{ v.year }}</div>
          <div class="mono upper vintage-roman">A.D. {{ v.roman }}</div>
          <h3 class="serif vintage-title">{{ v.title }}</h3>
          <p class="vintage-note">{{ v.note }}</p>

          <dl class="vintage-facts mono">
            <div class="fact">
              <dt>Mint window</dt>
              <dd>{{ v.minted }}</dd>
            </div>
            <div class="fact">
              <dt>Denominations</dt>
              <dd>{{ denomsFor(v.year).map(d => d.value + ' bral').join(' · ') || '—' }}</dd>
            </div>
            <div class="fact">
              <dt>Pieces struck</dt>
              <dd>{{ v.pieces === null ? '— pending —' : v.pieces + ' pcs' }}</dd>
            </div>
          </dl>
        </div>

        <!-- Art column -->
        <div class="vintage-art">
          <!-- 2025: actual coin photographs (obverse + reverse) -->
          <template v-if="v.year === 2025">
            <div class="photo-pair">
              <figure class="photo">
                <img :src="coinFront" alt="One Bral, 2025 — obverse" />
                <figcaption class="mono upper">Obverse · Naturklubben</figcaption>
              </figure>
              <figure class="photo">
                <img :src="coinBack" alt="One Bral, 2025 — reverse" />
                <figcaption class="mono upper">Reverse · Loshult 2025</figcaption>
              </figure>
            </div>
          </template>

          <!-- 2026: scheduled, dimmed preview + banner -->
          <template v-else-if="v.status === 'scheduled'">
            <div class="scheduled-wrap">
              <div class="coin-row dim">
                <TheCoin
                  v-for="d in denomsFor(v.year)"
                  :key="d.value"
                  :denom="d"
                  :size="150"
                />
              </div>
              <div class="scheduled-banner">
                <div class="mono upper banner-kicker">Next pour</div>
                <div class="serif banner-date">October 2026</div>
                <div class="mono upper banner-sub">Weather permitting · unanimous consent</div>
              </div>
            </div>
          </template>

          <!-- Default (2024): rendered SVG coins -->
          <template v-else>
            <div class="coin-row">
              <TheCoin
                v-for="d in denomsFor(v.year)"
                :key="d.value"
                :denom="d"
                :size="160"
              />
            </div>
          </template>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import SectionHead from './SectionHead.vue'
import TheCoin from './TheCoin.vue'
import vintages from '../data/vintages.json'
import denoms from '../data/denominations.json'

const coinFront = import.meta.env.BASE_URL + 'img/coin-front.png'
const coinBack  = import.meta.env.BASE_URL + 'img/coin-back.png'

function denomsFor(year) {
  return denoms.filter(d => d.year === year)
}
</script>

<style scoped>
.vintages-section { padding: 80px 48px; }

.vintages-stack {
  margin-top: 56px;
  border: 1px solid var(--ink);
  background: var(--paper-2);
}

.vintage {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 0;
  min-height: 380px;
}
.vintage + .vintage { border-top: 1px solid var(--ink); }

.vintage-meta {
  padding: 36px 40px;
  border-right: 1px solid var(--ink);
  display: flex;
  flex-direction: column;
}

.vintage-status {
  font-size: 10px;
  letter-spacing: 0.22em;
  display: flex;
  align-items: center;
  gap: 8px;
}
.is-scheduled .vintage-status,
.is-scheduled .status-mark { color: var(--accent); }

.vintage-year {
  font-size: clamp(72px, 10vw, 140px);
  line-height: 0.9;
  letter-spacing: -0.04em;
  margin: 8px 0 0;
}
.is-scheduled .vintage-year { opacity: 0.85; }

.vintage-roman {
  font-size: 10px;
  letter-spacing: 0.3em;
  opacity: 0.78;
  margin-top: 4px;
}

.vintage-title {
  font-size: 28px;
  font-style: italic;
  font-weight: 400;
  margin: 22px 0 10px;
}

.vintage-note {
  font-size: 12.5px;
  line-height: 1.65;
  max-width: 440px;
  margin: 0 0 22px;
}

.vintage-facts {
  margin-top: auto;
  border-top: 1px solid var(--ink);
  padding-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px 18px;
}
.fact { display: flex; flex-direction: column; gap: 4px; }
.fact dt {
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.78;
  margin: 0;
}
.fact dd {
  font-size: 12px;
  margin: 0;
}

.vintage-art {
  background: var(--paper);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 36px;
  position: relative;
}

.coin-row {
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.coin-row.dim { opacity: 0.35; filter: grayscale(0.2); }

.photo-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  width: 100%;
  max-width: 520px;
}
.photo {
  margin: 0;
  text-align: center;
}
.photo img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid var(--ink);
  background: var(--paper-2);
  filter: drop-shadow(0 12px 18px rgba(0,0,0,0.22));
}
.photo figcaption {
  font-size: 9px;
  letter-spacing: 0.22em;
  margin-top: 12px;
  opacity: 0.78;
}

.scheduled-wrap {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}
.scheduled-banner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(-2deg);
  background: var(--paper);
  border: 2px solid var(--accent);
  padding: 18px 28px;
  text-align: center;
  box-shadow: 4px 4px 0 var(--ink);
}
.banner-kicker {
  font-size: 9px;
  letter-spacing: 0.3em;
  color: var(--accent);
}
.banner-date {
  font-size: 44px;
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 4px 0 6px;
}
.banner-sub {
  font-size: 9px;
  letter-spacing: 0.18em;
  opacity: 0.78;
}

@media (max-width: 1024px) {
  .vintages-section { padding: 60px 32px; }
  .vintage-meta { padding: 32px; }
  .vintage-art { padding: 28px; }
  .coin-row { gap: 20px; }
  .photo-pair { gap: 20px; }
}

@media (max-width: 768px) {
  .vintages-section { padding: 60px 24px; }
  .vintage {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  .vintage-meta {
    border-right: none;
    border-bottom: 1px solid var(--ink);
    padding: 28px 24px;
  }
  .vintage-facts {
    grid-template-columns: 1fr 1fr;
  }
  .vintage-art {
    padding: 32px 24px;
    min-height: 260px;
  }
  .photo-pair { max-width: 360px; }
}

@media (max-width: 640px) {
  .vintages-section { padding: 48px 20px; }
  .vintage-meta { padding: 24px 20px; }
  .vintage-art { padding: 24px 20px; }
  .vintage-facts { grid-template-columns: 1fr; }
  .coin-row { gap: 14px; }
  .banner-date { font-size: 32px; }
}
</style>
