<template>
  <section id="newsletter" class="rule-b nl-section">
    <SectionHead
      eyebrow="§ 09"
      title="The Communiqué"
      subtitle="Irregular dispatches from the Governor's desk. Strike announcements, reserve audits, and monetary policy — direct to your inbox."
    />

    <div class="nl-body">

      <div class="nl-info">
        <div class="mono upper" style="font-size:10px;letter-spacing:0.2em;opacity:0.78;margin-bottom:20px">Dispatch Archive</div>
        <div
          v-for="issue in issues"
          :key="issue.id"
          class="nl-issue rule-b"
        >
          <div class="mono" style="font-size:10px;color:var(--accent);margin-bottom:4px">{{ issue.date }}</div>
          <div class="serif nl-issue-title">{{ issue.title }}</div>
          <div style="font-size:11.5px;line-height:1.6;opacity:0.85">{{ issue.summary }}</div>
        </div>
      </div>

      <div class="nl-form-wrap">
        <div class="nl-form-box">
          <div class="mono upper" style="font-size:10px;letter-spacing:0.2em;opacity:0.78;margin-bottom:20px">Subscribe to the Communiqué</div>

          <template v-if="!subscribed">
            <p style="font-size:12px;line-height:1.75;margin:0 0 24px;opacity:0.9">
              The Communiqué is issued at the Governor's discretion. Frequency: irregular.
              Content: authoritative. Unsubscribe at any time by written petition to the Board.
            </p>
            <form @submit.prevent="submit" class="nl-form" novalidate>
              <div class="nl-field">
                <label for="nl-email" class="mono upper" style="font-size:10px;letter-spacing:0.15em;opacity:0.78;display:block;margin-bottom:8px">
                  Email Address
                </label>
                <input
                  id="nl-email"
                  v-model="email"
                  type="email"
                  required
                  autocomplete="email"
                  placeholder="your@address.org"
                  class="nl-input mono"
                  :disabled="submitting"
                />
              </div>
              <div class="nl-field">
                <label for="nl-cadence" class="mono upper" style="font-size:10px;letter-spacing:0.15em;opacity:0.78;display:block;margin-bottom:8px">
                  Dispatch Frequency
                </label>
                <select id="nl-cadence" v-model="cadence" class="nl-select mono" :disabled="submitting">
                  <option value="immediate">Immediate — all announcements</option>
                  <option value="digest">Weekly digest</option>
                  <option value="quarterly">Quarterly report only</option>
                </select>
              </div>
              <button type="submit" class="btn nl-submit" :disabled="submitting">
                {{ submitting ? 'Processing…' : 'Submit Subscription Request' }} →
              </button>
            </form>
            <div style="font-size:10px;opacity:0.7;margin-top:16px;line-height:1.65">
              By subscribing you acknowledge the Banco·Bral privacy charter (Ref. BB·P·002)
              and consent to receive official monetary correspondence.
            </div>
          </template>

          <div v-else class="nl-confirmed" role="status" aria-live="polite">
            <div class="stamp" style="margin-bottom:24px;display:inline-block">Approved</div>
            <div class="serif" style="font-size:clamp(24px,2.5vw,36px);line-height:1.05;letter-spacing:-0.02em;margin-bottom:16px">
              Subscription Registered
            </div>
            <div style="font-size:12px;line-height:1.75;opacity:0.9">
              Your request has been logged and forwarded to the Governor's secretariat.
              Expect your first Communiqué at the next scheduled dispatch.
            </div>
            <div class="mono" style="font-size:10px;color:var(--accent);margin-top:20px;letter-spacing:0.12em">
              Ref. BB·NL·{{ refNum }}
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
import issues from '../data/newsletter.json'

const email = ref('')
const cadence = ref('immediate')
const submitting = ref(false)
const subscribed = ref(false)
const refNum = ref('')

function submit() {
  submitting.value = true
  setTimeout(() => {
    refNum.value = String(Math.floor(Math.random() * 9000) + 1000)
    subscribed.value = true
    submitting.value = false
  }, 900)
}
</script>

<style scoped>
.nl-section { padding: 80px 48px; }

.nl-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  margin-top: 56px;
  align-items: start;
}

.nl-issue {
  padding: 20px 0;
}
.nl-issue:first-child { border-top: 1px solid var(--rule); }

.nl-issue-title {
  font-size: clamp(18px, 1.8vw, 24px);
  line-height: 1.15;
  letter-spacing: -0.01em;
  margin: 4px 0 10px;
}

.nl-form-box {
  border: 1px solid var(--ink);
  padding: 32px 28px;
}

.nl-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.nl-field { display: flex; flex-direction: column; }

.nl-input,
.nl-select {
  background: transparent;
  border: 1px solid var(--ink);
  color: var(--ink);
  padding: 10px 12px;
  font-size: 12px;
  outline: none;
  width: 100%;
  appearance: none;
}
.nl-input::placeholder { opacity: 0.6; }
.nl-input:focus,
.nl-select:focus { border-color: var(--accent); }

.nl-submit {
  width: 100%;
  justify-content: center;
}

.nl-confirmed { display: flex; flex-direction: column; align-items: flex-start; }

@media (max-width: 1024px) {
  .nl-section { padding: 60px 32px; }
  .nl-body { gap: 40px; }
}
@media (max-width: 768px) {
  .nl-section { padding: 60px 24px; }
  .nl-body { grid-template-columns: 1fr; gap: 40px; }
}
@media (max-width: 640px) {
  .nl-section { padding: 48px 20px; }
  .nl-form-box { padding: 24px 20px; }
}
</style>
