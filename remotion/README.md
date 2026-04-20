# Banco·Bral — Remotion

Self-contained Remotion project used to render short institutional video clips
for the Banco·Bral site. Kept separate from the Vue app so the main build and
dependency tree are unaffected.

## Usage

```bash
cd remotion
npm install
npm run studio            # live preview at http://localhost:3000
npm run render            # renders out/governors-address.mp4
npm run render:still      # renders a still frame for thumbnails
```

## Compositions

| ID                  | Duration | Purpose                                          |
|---------------------|----------|--------------------------------------------------|
| `GovernorsAddress`  | 8s @ 30fps (1920×1080) | Deadpan Q2 2026 quarterly address bumper. |

## Design tokens

Colors match `src/style.css` (Treasury palette):

- paper   `#e9e5db`
- ink     `#1a1714`
- accent  `#c3410b`
- alu     `#b8b3ab`

Typography uses the site's Google Fonts — JetBrains Mono and Instrument Serif.
