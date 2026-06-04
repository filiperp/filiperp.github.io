#!/usr/bin/env bash
# One-time setup: point git at the versioned .githooks directory.
set -euo pipefail

cd "$(dirname "$0")/.."
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit
echo "✓ Git hooks installed. js/version.js will be stamped on every commit."
