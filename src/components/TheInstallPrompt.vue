<template>
  <!-- Trigger button (rendered in header via teleport) -->
  <Teleport to="body" v-if="showButton">
    <button
      class="install-fab"
      :class="{ pulse: shouldPulse }"
      @click="open"
      aria-label="Save Banco·Bral to your home screen"
    >
      <span class="install-fab-coin" aria-hidden="true">
        <TheCoin :denom="oneBral" :size="22" />
      </span>
      <span class="install-fab-text">
        <span class="install-fab-eyebrow">Save to home</span>
        <span class="install-fab-title">Pin the Standard</span>
      </span>
      <span class="install-fab-arrow" aria-hidden="true">▾</span>
    </button>
  </Teleport>

  <!-- Modal -->
  <Teleport to="body">
    <Transition name="install">
      <div v-if="modalOpen" class="install-backdrop" @click.self="close" role="dialog" aria-modal="true" aria-labelledby="install-heading">
        <div class="install-card">
          <button class="install-close" @click="close" aria-label="Close">×</button>

          <div class="install-coin-stage" aria-hidden="true">
            <div class="install-coin-rays"></div>
            <div class="install-coin-spin">
              <TheCoin :denom="oneBral" :size="168" />
            </div>
            <div class="install-coin-shadow"></div>
          </div>

          <div class="install-stamp">Official Communiqué № {{ communique }}</div>

          <h2 id="install-heading" class="install-heading serif">
            Pin the Aluminum Standard<br>to your home screen
          </h2>

          <p class="install-lede">
            A Bral, a beer, and the ledger — always one tap away.
            No app store. No middlemen. No filler.
          </p>

          <!-- Native install (Chrome / Edge / Android) -->
          <template v-if="canPrompt">
            <button class="btn install-cta" @click="triggerNativeInstall">
              <span>Install Banco·Bral</span>
              <span class="install-cta-arrow">▸</span>
            </button>
            <p class="install-fineprint">Installs instantly. Runs full-screen. Works offline for your convenience.</p>
          </template>

          <!-- iOS Safari -->
          <template v-else-if="isIOS">
            <ol class="install-steps">
              <li>
                <span class="install-step-num">I</span>
                <span class="install-step-body">
                  Tap the <strong>Share</strong> button
                  <svg class="install-step-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 3v12M8 7l4-4 4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  in the Safari toolbar.
                </span>
              </li>
              <li>
                <span class="install-step-num">II</span>
                <span class="install-step-body">
                  Scroll and choose <strong>Add to Home Screen</strong>
                  <svg class="install-step-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="4" y="4" width="16" height="16" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M12 8v8M8 12h8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>.
                </span>
              </li>
              <li>
                <span class="install-step-num">III</span>
                <span class="install-step-body">Confirm with <strong>Add</strong>. The Bral now rests on your home screen.</span>
              </li>
            </ol>
          </template>

          <!-- Fallback (Firefox desktop, already installed paths) -->
          <template v-else>
            <p class="install-fallback">
              Your browser will handle the pinning. Look for <em>Install</em> or
              <em>Add to Home Screen</em> in its menu — the coin settles in as soon as you confirm.
            </p>
            <button class="btn btn-ghost install-cta" @click="close">Understood</button>
          </template>

          <div class="install-seal">
            <span class="install-seal-line"></span>
            <span class="install-seal-mark">BANCO · BRAL · EST. MMXXIV</span>
            <span class="install-seal-line"></span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import TheCoin from './TheCoin.vue'
import denominations from '../data/denominations.json'

const deferredPrompt = ref(null)
const modalOpen      = ref(false)
const isIOS          = ref(false)
const isStandalone   = ref(false)
const dismissed      = ref(false)

const oneBral = computed(() => denominations.find(d => d.value === 1) || denominations[0])

// A tongue-in-cheek rotating communique number based on the day of the year.
const communique = computed(() => {
  const d = new Date()
  const start = new Date(d.getFullYear(), 0, 0)
  const day = Math.floor((d - start) / 86400000)
  return String(day).padStart(3, '0') + '-' + String(d.getFullYear()).slice(2)
})

const canPrompt = computed(() => !!deferredPrompt.value)

const showButton = computed(() => {
  if (isStandalone.value) return false   // already installed
  if (dismissed.value)    return false   // user said no recently
  return canPrompt.value || isIOS.value  // actionable on this platform
})

// Pulse the button the first time it becomes available.
const shouldPulse = ref(false)

function detectPlatform() {
  const ua = navigator.userAgent || ''
  const iOSCheck = /iPad|iPhone|iPod/.test(ua) && !window.MSStream
  isIOS.value = iOSCheck
  isStandalone.value =
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
}

function checkDismissed() {
  try {
    const ts = parseInt(localStorage.getItem('bral.installDismissedAt') || '0', 10)
    if (!ts) return
    // Re-offer after 14 days.
    const fortnight = 14 * 24 * 60 * 60 * 1000
    if (Date.now() - ts < fortnight) dismissed.value = true
  } catch { /* private mode — ignore */ }
}

function onBeforeInstall(e) {
  e.preventDefault()
  deferredPrompt.value = e
  shouldPulse.value = true
  setTimeout(() => (shouldPulse.value = false), 6000)
}

function onInstalled() {
  deferredPrompt.value = null
  isStandalone.value = true
  modalOpen.value = false
}

function onKey(e) {
  if (e.key === 'Escape' && modalOpen.value) close()
}

function open() {
  modalOpen.value = true
  shouldPulse.value = false
}

function close() {
  modalOpen.value = false
  try { localStorage.setItem('bral.installDismissedAt', String(Date.now())) } catch {}
}

async function triggerNativeInstall() {
  const p = deferredPrompt.value
  if (!p) return
  p.prompt()
  try {
    const choice = await p.userChoice
    if (choice?.outcome === 'accepted') {
      deferredPrompt.value = null
      modalOpen.value = false
    }
  } catch { /* user cancelled */ }
}

onMounted(() => {
  detectPlatform()
  checkDismissed()
  window.addEventListener('beforeinstallprompt', onBeforeInstall)
  window.addEventListener('appinstalled', onInstalled)
  document.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  window.removeEventListener('beforeinstallprompt', onBeforeInstall)
  window.removeEventListener('appinstalled', onInstalled)
  document.removeEventListener('keydown', onKey)
})
</script>

<style scoped>
/* -------- Floating trigger button -------- */
.install-fab {
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 95;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px 8px 10px;
  background: var(--paper);
  color: var(--ink);
  border: 1px solid var(--ink);
  border-radius: 2px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 3px 3px 0 var(--ink);
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}
.install-fab:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0 var(--ink);
  background: var(--paper-2);
}
.install-fab:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0 var(--ink);
}
.install-fab-coin {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}
.install-fab-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.1;
}
.install-fab-eyebrow {
  font-size: 8px;
  letter-spacing: 0.22em;
  opacity: 0.55;
}
.install-fab-title {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
}
.install-fab-arrow {
  font-size: 10px;
  opacity: 0.6;
  margin-left: 2px;
}

/* One-time attention pulse */
@keyframes installPulse {
  0%, 100% { box-shadow: 3px 3px 0 var(--ink), 0 0 0 0 rgba(195, 65, 11, 0.45); }
  50%      { box-shadow: 3px 3px 0 var(--ink), 0 0 0 12px rgba(195, 65, 11, 0); }
}
.install-fab.pulse { animation: installPulse 1.6s ease-out 3; }

@media (max-width: 640px) {
  .install-fab {
    left: 12px;
    bottom: 12px;
    padding: 7px 11px 7px 8px;
  }
  .install-fab-eyebrow { display: none; }
  .install-fab-title   { font-size: 10px; }
}

/* -------- Modal backdrop -------- */
.install-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(26, 23, 20, 0.55);
  backdrop-filter: blur(6px) saturate(140%);
  -webkit-backdrop-filter: blur(6px) saturate(140%);
}

/* -------- Modal card -------- */
.install-card {
  position: relative;
  max-width: 460px;
  width: 100%;
  background: var(--paper);
  color: var(--ink);
  border: 1px solid var(--ink);
  padding: 36px 32px 26px;
  box-shadow: 12px 12px 0 var(--ink);
  background-image:
    repeating-linear-gradient(0deg,  transparent 0 39px, var(--grid-line) 39px 40px),
    repeating-linear-gradient(90deg, transparent 0 39px, var(--grid-line) 39px 40px);
  max-height: calc(100vh - 48px);
  overflow-y: auto;
}

.install-close {
  position: absolute;
  top: 8px;
  right: 10px;
  background: transparent;
  border: none;
  color: var(--ink);
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  padding: 4px 10px;
  opacity: 0.55;
  transition: opacity 0.15s;
}
.install-close:hover { opacity: 1; }

/* -------- Coin stage -------- */
.install-coin-stage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  margin: -4px auto 10px;
}
.install-coin-rays {
  position: absolute;
  inset: 0;
  background:
    conic-gradient(
      from 0deg,
      transparent 0deg 20deg,
      rgba(195, 65, 11, 0.10) 20deg 22deg,
      transparent 22deg 40deg,
      rgba(195, 65, 11, 0.10) 40deg 42deg,
      transparent 42deg 80deg,
      rgba(195, 65, 11, 0.08) 80deg 82deg,
      transparent 82deg
    );
  -webkit-mask: radial-gradient(circle at 50% 50%, transparent 64px, #000 68px, #000 120px, transparent 140px);
          mask: radial-gradient(circle at 50% 50%, transparent 64px, #000 68px, #000 120px, transparent 140px);
  animation: raySpin 22s linear infinite;
}
@keyframes raySpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.install-coin-spin {
  position: relative;
  animation: coinFloat 5s ease-in-out infinite;
  filter: drop-shadow(0 14px 18px rgba(26, 23, 20, 0.35));
  transform-origin: 50% 50%;
}
.install-coin-spin > :deep(svg) {
  animation: coinTilt 9s linear infinite;
  transform-origin: 50% 50%;
}
@keyframes coinFloat {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}
@keyframes coinTilt {
  0%   { transform: rotateZ(-3deg); }
  50%  { transform: rotateZ(3deg); }
  100% { transform: rotateZ(-3deg); }
}
.install-coin-shadow {
  position: absolute;
  bottom: 8px;
  left: 50%;
  width: 140px;
  height: 12px;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at center, rgba(26,23,20,0.35), rgba(26,23,20,0) 70%);
  animation: shadowBreathe 5s ease-in-out infinite;
}
@keyframes shadowBreathe {
  0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.7; }
  50%      { transform: translateX(-50%) scale(0.8); opacity: 0.5; }
}

/* -------- Stamp -------- */
.install-stamp {
  display: inline-block;
  border: 2px solid var(--accent);
  color: var(--accent);
  padding: 3px 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  transform: rotate(-2deg);
  font-weight: 700;
  margin-bottom: 16px;
}

/* -------- Typography -------- */
.install-heading {
  font-family: 'Instrument Serif', serif;
  font-size: 30px;
  line-height: 1.08;
  margin: 0 0 12px;
  letter-spacing: -0.01em;
}
.install-lede {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  line-height: 1.55;
  opacity: 0.78;
  margin: 0 0 22px;
}

/* -------- CTA -------- */
.install-cta {
  width: 100%;
  justify-content: space-between;
  font-size: 12px;
  padding: 14px 18px;
  letter-spacing: 0.18em;
}
.install-cta-arrow {
  font-size: 14px;
  transition: transform 0.15s ease;
}
.install-cta:hover .install-cta-arrow { transform: translateX(3px); }
.install-fineprint {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.5;
  text-align: center;
  margin: 10px 0 0;
}

/* -------- iOS Steps -------- */
.install-steps {
  list-style: none;
  margin: 4px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.install-steps li {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 12px 14px;
  border: 1px solid var(--ink);
  background: var(--paper);
}
.install-step-num {
  font-family: 'Instrument Serif', serif;
  font-size: 22px;
  line-height: 1;
  font-style: italic;
  color: var(--accent);
  min-width: 24px;
}
.install-step-body {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  line-height: 1.5;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
}
.install-step-body strong {
  font-weight: 600;
  padding: 0 2px;
  background: var(--paper-2);
}
.install-step-icon {
  width: 16px;
  height: 16px;
  vertical-align: middle;
  color: var(--accent);
  margin: 0 2px;
}

.install-fallback {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  line-height: 1.55;
  margin: 0 0 16px;
  opacity: 0.8;
}
.install-fallback em {
  font-style: normal;
  padding: 1px 4px;
  background: var(--paper-2);
  border: 1px solid var(--ink);
}

/* -------- Bottom seal -------- */
.install-seal {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 22px;
  padding-top: 16px;
  border-top: 1px dashed var(--ink);
  opacity: 0.5;
}
.install-seal-line { flex: 1; height: 1px; background: var(--ink); opacity: 0.4; }
.install-seal-mark {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
}

/* -------- Transition -------- */
.install-enter-active, .install-leave-active {
  transition: opacity 0.28s ease;
}
.install-enter-active .install-card,
.install-leave-active .install-card {
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.28s ease;
}
.install-enter-from, .install-leave-to { opacity: 0; }
.install-enter-from .install-card {
  transform: translateY(18px) scale(0.96);
  opacity: 0;
}
.install-leave-to .install-card {
  transform: translateY(6px) scale(0.99);
  opacity: 0;
}

@media (max-width: 480px) {
  .install-card {
    padding: 28px 20px 20px;
    box-shadow: 6px 6px 0 var(--ink);
  }
  .install-heading { font-size: 26px; }
  .install-coin-stage { height: 180px; }
}
</style>
