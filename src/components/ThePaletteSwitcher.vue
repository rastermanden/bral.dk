<template>
  <div class="palette-switcher" :class="{ expanded }" @mouseenter="expanded = true" @mouseleave="expanded = false">
    <button
      class="palette-toggle"
      :aria-label="expanded ? 'Close palette switcher' : 'Change color palette'"
      @click="expanded = !expanded"
    >
      <span class="palette-dot active-dot" :style="{ background: palettes.find(p => p.id === current)?.accent }" />
      <span v-if="expanded" class="palette-label mono upper">Palette</span>
    </button>
    <Transition name="palette-panel">
      <div v-if="expanded" class="palette-options">
        <button
          v-for="p in palettes"
          :key="p.id"
          class="palette-option"
          :class="{ active: current === p.id }"
          :title="p.name"
          :aria-label="`Switch to ${p.name} palette`"
          :aria-pressed="current === p.id"
          @click="select(p.id)"
        >
          <span class="palette-swatch" :style="{ background: p.paper, border: `1px solid ${p.ink}` }">
            <span class="palette-swatch-ink" :style="{ background: p.ink }" />
            <span class="palette-swatch-accent" :style="{ background: p.accent }" />
          </span>
          <span class="palette-name mono upper">{{ p.name }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const palettes = [
  { id: 'treasury', name: 'Treasury',     paper: '#e9e5db', ink: '#1a1714', accent: '#c3410b' },
  { id: 'midnight', name: 'Midnight',     paper: '#141210', ink: '#e9e5db', accent: '#d4a418' },
  { id: 'foundry',  name: 'Foundry',      paper: '#d9d3c4', ink: '#161414', accent: '#6e2d1e' },
  { id: 'verdigris',name: 'Verdigris',    paper: '#e9e5db', ink: '#1a1714', accent: '#2a6b5e' },
]

const current = ref(localStorage.getItem('bral-palette') || 'treasury')
const expanded = ref(false)

applyPalette(current.value)

function select(id) {
  current.value = id
  applyPalette(id)
  localStorage.setItem('bral-palette', id)
  expanded.value = false
}

function applyPalette(id) {
  const el = document.documentElement
  if (id === 'treasury') {
    el.removeAttribute('data-palette')
  } else {
    el.setAttribute('data-palette', id)
  }
}
</script>

<style scoped>
.palette-switcher {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.palette-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--ink);
  color: var(--paper);
  border: 1px solid var(--ink);
  padding: 8px 10px;
  cursor: pointer;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  transition: background 0.15s;
}
.palette-toggle:hover { background: var(--accent); border-color: var(--accent); }

.active-dot {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.palette-label { font-size: 9px; letter-spacing: 0.2em; }

.palette-options {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;
}

.palette-option {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--ink);
  color: var(--paper);
  border: 1px solid transparent;
  padding: 7px 10px;
  cursor: pointer;
  font-family: 'JetBrains Mono', monospace;
  transition: border-color 0.15s, background 0.15s;
}
.palette-option:hover { border-color: var(--accent); }
.palette-option.active { border-color: var(--accent); background: var(--accent); }

.palette-swatch {
  width: 24px;
  height: 16px;
  display: flex;
  flex-shrink: 0;
  overflow: hidden;
}
.palette-swatch-ink {
  flex: 1;
}
.palette-swatch-accent {
  width: 6px;
  flex-shrink: 0;
}

.palette-name { font-size: 9px; letter-spacing: 0.2em; white-space: nowrap; }

/* Transitions */
.palette-panel-enter-active, .palette-panel-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.palette-panel-enter-from, .palette-panel-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
