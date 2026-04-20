# bral.dk

**Banco·Bral** — the mock-serious central bank of an aluminum coin currency
struck by six friends from melted beer cans. Institutional deadpan; brutalist
monospace aesthetic.

Single-page Vue 3 app built with Vite, tested with Playwright, deployed to
GitHub Pages on push to `main`.

## Commands

```bash
npm run dev        # dev server at localhost:5173
npm run build      # production build → dist/
npm run preview    # preview production build
npm test           # Playwright E2E tests (mobile + tablet + desktop)
npm run test:ui    # Playwright in interactive UI mode
```

Playwright runs against port 5180 (separate from dev's 5173). No lint step.

## Architecture

- **Content is data-driven** — `src/data/*.json` holds members, denominations,
  schedule, merch, articles, rates, ticker items, stats. Never hardcode
  content in components.
- **Section components** are prefixed `The` (e.g. `TheHeader.vue`,
  `TheMembers.vue`); helpers have no prefix (`TheCoin.vue`, `SectionHead.vue`).
- **Palettes** — four variants (Treasury, Midnight Vault, Foundry, Verdigris)
  applied via `html[data-palette]`; all colors are CSS custom properties
  defined in `src/style.css`. Active palette persists to `localStorage`.
- **Fonts** — JetBrains Mono (primary/mono), Instrument Serif (display),
  Space Grotesk (auxiliary). Mobile-first with breakpoints at 640/768/1024.

See `CLAUDE.md` for the full working notes.

## Video (Remotion)

Short institutional video clips (Governor's addresses, mint process loops,
annual-report bumpers) live in a self-contained Remotion 4 project under
`remotion/`. It has its own `package.json` and is isolated from the main Vue
build so it doesn't bloat the site bundle.

```bash
cd remotion
npm install
npm run studio            # live preview at http://localhost:3000
npm run render            # renders out/governors-address.mp4
npm run render:still      # single-frame PNG for thumbnails
```

Current compositions:

| ID                 | Spec                    | Purpose                                  |
|--------------------|-------------------------|------------------------------------------|
| `GovernorsAddress` | 8s @ 30fps · 1920×1080  | Q2 · MMXXVI quarterly-address bumper.    |

Compositions pull live figures from `src/data/stats.json` and use the Treasury
palette tokens so rendered clips stay in sync with the site.

## Deployment

Push to `main` triggers `.github/workflows/deploy.yml`, which runs
`npm ci && npm run build` and deploys `dist/` to GitHub Pages.
