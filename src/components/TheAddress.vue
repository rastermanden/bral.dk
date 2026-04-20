<template>
  <section id="address" class="address-section rule-b">
    <SectionHead
      eyebrow="§ 04"
      title="The Address"
      subtitle="Quarterly communiqué from the Governor's desk. Reserve position, provenance, and ceremonial remarks on the state of the Aluminum Standard."
    />

    <div class="address-stage">
      <figure class="address-frame">
        <span class="addr-corner tl" aria-hidden="true"></span>
        <span class="addr-corner tr" aria-hidden="true"></span>
        <span class="addr-corner bl" aria-hidden="true"></span>
        <span class="addr-corner br" aria-hidden="true"></span>

        <video
          ref="videoEl"
          class="address-video"
          :src="videoSrc"
          :poster="posterSrc"
          muted
          loop
          playsinline
          preload="metadata"
          @click="toggle"
          @play="playing = true"
          @pause="playing = false"
        ></video>

        <button
          v-show="!playing"
          class="addr-play"
          type="button"
          aria-label="Play the Governor's Quarterly Address"
          @click="toggle"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
            <polygon points="6,4 20,12 6,20" fill="currentColor" />
          </svg>
        </button>

        <figcaption class="addr-caption mono upper">
          BB · COMM · 01 — Q2 · MMXXVI
        </figcaption>
      </figure>

      <aside class="address-meta">
        <div class="addr-row">
          <div class="addr-key">Reference</div>
          <div class="addr-val">BB·COMM·01</div>
        </div>
        <div class="addr-row">
          <div class="addr-key">Session</div>
          <div class="addr-val">Q2 · MMXXVI</div>
        </div>
        <div class="addr-row">
          <div class="addr-key">Duration</div>
          <div class="addr-val">00:08</div>
        </div>
        <div class="addr-row">
          <div class="addr-key">Format</div>
          <div class="addr-val">1920 × 1080</div>
        </div>
        <div class="addr-row">
          <div class="addr-key">Audit</div>
          <div class="addr-val">{{ stats.lastAudit }}</div>
        </div>
        <div class="addr-row">
          <div class="addr-key">Auditor</div>
          <div class="addr-val">{{ stats.auditor }}</div>
        </div>
        <p class="addr-note">
          Addresses are struck ceremonially each quarter and deposited in the
          Bank's video vault. Content is authoritative; imagery is archival.
        </p>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import SectionHead from './SectionHead.vue'
import stats from '../data/stats.json'

const videoSrc = `${import.meta.env.BASE_URL}video/governors-address.mp4`
const posterSrc = `${import.meta.env.BASE_URL}video/governors-address.png`

const videoEl = ref(null)
const playing = ref(false)

function toggle() {
  const v = videoEl.value
  if (!v) return
  if (v.paused) v.play()
  else v.pause()
}
</script>

<style scoped>
.address-section {
  padding: 80px 48px;
  background: var(--paper);
}

.address-stage {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(260px, 1fr);
  gap: 48px;
  margin-top: 56px;
  align-items: start;
}

.address-frame {
  position: relative;
  aspect-ratio: 16 / 9;
  width: 100%;
  margin: 0;
  background: var(--paper-2);
  border: 1px solid var(--ink);
  overflow: hidden;
}

.address-video {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  cursor: pointer;
  background: var(--paper-2);
}

.addr-corner {
  position: absolute;
  width: 16px;
  height: 16px;
  border-top: 2px solid var(--accent);
  border-left: 2px solid var(--accent);
  pointer-events: none;
  z-index: 2;
}
.addr-corner.tl { top: 6px;    left: 6px; }
.addr-corner.tr { top: 6px;    right: 6px;    transform: rotate(90deg); }
.addr-corner.bl { bottom: 6px; left: 6px;    transform: rotate(-90deg); }
.addr-corner.br { bottom: 6px; right: 6px;    transform: rotate(180deg); }

.addr-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: var(--paper);
  color: var(--ink);
  border: 2px solid var(--ink);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 4px;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  z-index: 3;
}
.addr-play:hover {
  background: var(--accent);
  color: var(--paper);
  border-color: var(--accent);
}

.addr-caption {
  position: absolute;
  bottom: 10px;
  right: 14px;
  font-size: 10px;
  letter-spacing: 0.28em;
  color: var(--paper);
  mix-blend-mode: difference;
  pointer-events: none;
  z-index: 2;
}

.address-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  line-height: 1.6;
}

.addr-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--rule);
}
.addr-row:first-child { border-top: 1px solid var(--rule); }

.addr-key {
  text-transform: uppercase;
  letter-spacing: 0.18em;
  opacity: 0.72;
}
.addr-val {
  text-align: right;
  letter-spacing: 0.08em;
}

.addr-note {
  font-size: 11.5px;
  line-height: 1.7;
  opacity: 0.85;
  margin: 24px 0 0;
}

@media (max-width: 1024px) {
  .address-section { padding: 60px 32px; }
  .address-stage { grid-template-columns: 1fr; gap: 32px; }
}
@media (max-width: 640px) {
  .address-section { padding: 48px 20px; }
  .addr-play { width: 64px; height: 64px; }
}
</style>
