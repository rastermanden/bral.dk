#!/bin/bash
set -euo pipefail

# Only run in Claude Code web sessions.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# 1. Node dependencies.
if [ ! -d node_modules ] || [ package-lock.json -nt node_modules ] || [ package.json -nt node_modules ]; then
  npm install --no-audit --no-fund
fi

# 2. Playwright browser + OS libs for headless Chromium.
#    Prefer --with-deps (installs apt packages Chromium needs).
#    If that fails (e.g. broken third-party PPA), fall back to a plain
#    browser install so tests can still run when libs are already present.
if ! npx --yes playwright install --with-deps chromium; then
  echo "Warning: --with-deps failed, retrying without system deps..." >&2
  npx --yes playwright install chromium
fi
