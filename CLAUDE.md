# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Banco·Bral** is a mock-serious central bank website for an aluminum coin currency struck by six friends from melted beer cans. The tone is institutional and deadpan; the aesthetic is brutalist monospace with engraved-coin ornamentation.

Single-page Vue 3 app built with Vite, tested with Playwright, deployed to GitHub Pages on push to `main`.

## Commands

```bash
npm run dev        # dev server at localhost:5173
npm run build      # production build → dist/
npm run preview    # preview production build
npm test           # Playwright E2E tests (mobile + tablet + desktop)
npm run test:ui    # Playwright in interactive UI mode
```

No lint step is configured.

Playwright tests run against port 5180 (separate from the dev server port 5173).

## Architecture

### Data-driven sections

All content is stored in `src/data/*.json` files — never hardcode content in components. The one exception is `TheReserves.vue`, which has hardcoded `cans = 2093` and `circulating = 584` (moving these to JSON is a known TODO).

| File | Purpose |
|------|---------|
| `members.json` | Six minters — name, role, stats, motto, img |
| `denominations.json` | Six coin specs — value, diameter, mass, edge |
| `schedule.json` | Upcoming mint events |
| `merch.json` | Shop products — SKU, name, price, desc |
| `articles.json` | Manifesto articles I–VII |
| `rates.json` | Historical exchange rate per quarter |
| `ticker.json` | Marquee ticker items |

### Component conventions

- All top-level section components are prefixed `The` (e.g., `TheHeader.vue`, `TheMembers.vue`).
- Helper components have no prefix (`SectionHead.vue`, `TheCoin.vue`, `TheSeal.vue`).
- All components use `<script setup>` (Composition API).
- Styles are scoped per component — use CSS variables for theming, not local color values.
- Each section manages its own interactivity locally; there is no global state store.

### Palette system

Four palette variants (Treasury, Midnight Vault, Foundry, Verdigris) are applied via `html[data-palette]`. All colors must be defined as CSS custom properties (`--paper`, `--ink`, `--accent`, `--alu`, etc.) so palette switching works. The active palette is persisted to `localStorage`.

### Styling conventions

- CSS variables for all design tokens — defined in `src/style.css`, overridden per palette.
- Utility classes available globally: `.serif`, `.mono`, `.sans`, `.upper`, `.tight`, `.stamp`, `.btn`, `.btn-ghost`, `.rule-t/b/l/r`.
- Responsive breakpoints: 640px, 768px, 1024px. Mobile-first.
- Font stack: JetBrains Mono (primary/monospace), Instrument Serif (display/headings), Space Grotesk (auxiliary).

### TheCoin component

`TheCoin.vue` generates an SVG aluminum coin from a denomination object. Props: `denom` (object from `denominations.json`), `size` (px). Used in Hero and Denominations sections.

### Member photos

Place portraits at `public/img/<id>.jpg` (e.g. `mkl.jpg`). The `img` field in `members.json` points to `/img/<id>.jpg`. Images are rendered grayscale with orange duotone overlay in `TheMembers.vue`. Square crop, minimum 400×400px.

## Testing

Playwright runs 3 projects in parallel: mobile (390×844), tablet (768×1024), desktop (1280×800). Tests verify no horizontal overflow, section visibility, responsive layout, and interactions. Screenshots are taken per viewport.

## Deployment

Push to `main` triggers `.github/workflows/deploy.yml`, which runs `npm ci && npm run build` and deploys `dist/` to GitHub Pages.
