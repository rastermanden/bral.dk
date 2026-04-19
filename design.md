# BRAL — Design Reference

**Banco·Bral** is a mock-serious central bank website for an aluminum coin currency, struck by six friends from melted beer cans in Loshult, Småland. The tone is institutional and deadpan; the aesthetic is brutalist monospace with engraved-coin ornamentation.

---

## Visual Identity

| Token         | Value       | Use                              |
|---------------|-------------|----------------------------------|
| `--paper`     | `#e9e5db`   | Page background, main surfaces   |
| `--paper-2`   | `#d9d3c4`   | Offset panels, inset backgrounds |
| `--ink`       | `#1a1714`   | Text, borders, dark sections     |
| `--accent`    | `#c3410b`   | Oxidized orange — highlights, CTAs, stamp |
| `--alu`       | `#b8b3ab`   | Aluminum mid-tone                |
| `--alu-dark`  | `#6f6b63`   | Coin edge shading                |
| `--alu-light` | `#e4e1d9`   | Subtle fills                     |

**Fonts:**
- `JetBrains Mono` — primary body and UI (monospace)
- `Instrument Serif` — display headings and large numbers (serif italic)
- `Space Grotesk` — auxiliary sans (used sparingly)

**Body texture:** repeating 40px grid lines at 8% ink opacity, giving a ledger-paper feel.

---

## Sections (in order)

1. **Header** — `TheHeader.vue` · logo seal + nav + Redeem CTA
2. **Ticker** — `TheTicker.vue` · scrolling marquee of live stats; items in `src/data/ticker.json`
3. **Hero** — `TheHero.vue` · spinning coin + manifesto tagline + 4 live stats strip
4. **Manifesto** — `TheManifesto.vue` · 7 Articles of the Aluminum Standard; text in `src/data/articles.json`
5. **Exchange** — `TheExchange.vue` · Bral↔Beer calculator + historical rate chart; rates in `src/data/rates.json`
6. **Denominations** — `TheDenominations.vue` · 6 coin types, interactive specimen sheet; data in `src/data/denominations.json`
7. **Reserves** — `TheReserves.vue` · bar charts + can-wall vault visualization; hardcoded totals (update as needed)
8. **Schedule** — `TheSchedule.vue` · upcoming mint events; data in `src/data/schedule.json`
9. **Mint Roster** — `TheMembers.vue` · 6 member cards + stats + certificate; data in `src/data/members.json`
10. **Treasury Shop** — `TheMerch.vue` · 6 products priced in Bral; data in `src/data/merch.json`
11. **Footer** — `TheFooter.vue` · Banco·Bral wordmark + nav columns

---

## Data Files (all in `src/data/`)

| File                 | Purpose                                      | Update when…                            |
|----------------------|----------------------------------------------|-----------------------------------------|
| `members.json`       | Six minters — name, role, stats, motto, img  | Someone joins, stats change, photo added|
| `denominations.json` | Six coin specs — value, diameter, mass, edge | New denomination minted                 |
| `schedule.json`      | Upcoming mint events                         | Each mint season                        |
| `merch.json`         | Shop products — SKU, name, price, desc       | New merch added or prices change        |
| `articles.json`      | Manifesto articles I–VII                     | The charter is amended                  |
| `rates.json`         | Historical exchange rate per quarter         | Each new quarter                        |
| `ticker.json`        | Marquee ticker items                         | Announcements, seasonal copy            |

---

## Key Components

### `TheCoin.vue`
Renders an SVG aluminum coin from a denomination object. Props: `denom` (object), `size` (px). Used in Hero, Denominations section.

### `TheSeal.vue`
SVG stamp seal (B with tick marks). Prop: `size` (px). Used in Header, Members, Footer.

### `SectionHead.vue`
Shared section header layout. Props: `eyebrow`, `title`, `subtitle`.

---

## Adding Real Photos

### Hero coin
Place the coin photo at `public/img/coin.jpg`. Update `TheHero.vue` to replace the `<TheCoin>` with:
```html
<div class="coin-spin" style="width:340px;height:340px;border-radius:50%;overflow:hidden">
  <img src="/img/coin.jpg" alt="Bral coin" style="width:100%;height:100%;object-fit:cover" />
</div>
```

### Member portraits
Place photos at `public/img/<id>.jpg` (e.g. `mkl.jpg`, `trk.jpg`, …). The `img` field in `members.json` already points to `/img/mkl.jpg` etc. Images are rendered grayscale with a duotone orange overlay in `TheMembers.vue`.

Photo dimensions: square crop works best. Minimum 400×400px.

---

## Palettes (future feature)
The design has four palette variants defined in the prototype. If needed, implement a palette switcher using CSS custom property overrides:

| Name          | `--paper`   | `--ink`     | `--accent`  |
|---------------|-------------|-------------|-------------|
| Treasury      | `#e9e5db`   | `#1a1714`   | `#c3410b`   |
| Midnight Vault| `#141210`   | `#e9e5db`   | `#d4a418`   |
| Foundry       | `#d9d3c4`   | `#161414`   | `#6e2d1e`   |
| Verdigris     | `#e9e5db`   | `#1a1714`   | `#2a6b5e`   |

---

## Known Placeholders
- **Hero coin**: SVG coin renders until `public/img/coin.jpg` is placed
- **Member portraits**: show as blank until `public/img/<id>.jpg` photos are added
- **Merch images**: hatched SVG placeholders — replace with real product photos by adding `<img>` tags in `TheMerch.vue`
- **Reserves numbers** (`TheReserves.vue`): sourced from `src/data/stats.json` — update `canReserve`, `circulating`, `heldByMint`, `ingotsInFoundry` there.

---

## Dev Commands
```bash
npm run dev      # start dev server (localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview production build
```
