#!/bin/sh
set -eu

# Named volumes are created as root. Codex stores SQLite state in CODEX_HOME and
# OpenCode needs a writable config directory for the RTK plugin.
OPENCODE_CONFIG_DIR="$HOME/.config/opencode"
OPENCODE_HOST_CONFIG_DIR="$HOME/.config/opencode-host"
RTK_DATA_DIR="$XDG_DATA_HOME/rtk"

mkdir -p "$CODEX_HOME" "$XDG_CONFIG_HOME" "$OPENCODE_CONFIG_DIR" "$RTK_DATA_DIR" /workspace/node_modules "$XDG_CACHE_HOME" "$XDG_STATE_HOME"

# Docker creates the parents of nested volume mounts as root. Chromium uses the
# XDG config directory for Crashpad even when Playwright puts its profile in
# /tmp, and exits during launch if it cannot create that state.
chown devuser:devuser "$XDG_CONFIG_HOME" "$XDG_DATA_HOME"

# Retain host OpenCode credentials/preferences without granting the container
# write access to the host config. RTK is installed after this copy so its plugin
# is always present and current in the writable volume.
if [ -d "$OPENCODE_HOST_CONFIG_DIR" ]; then
  cp -a "$OPENCODE_HOST_CONFIG_DIR"/. "$OPENCODE_CONFIG_DIR"/
fi

chown -R devuser:devuser "$CODEX_HOME" "$OPENCODE_CONFIG_DIR" "$RTK_DATA_DIR" /workspace/node_modules "$XDG_CACHE_HOME" "$XDG_STATE_HOME"

# Configure RTK against the persistent state volumes. Codex receives its global
# instruction file and OpenCode receives the command-rewrite plugin.
gosu devuser rtk init -g --codex
gosu devuser rtk init -g --opencode

# The container has its own persistent Codex home, so keep its Playwright MCP
# entry pointed at the native binary instead of the host's Docker-backed entry.
gosu devuser codex mcp remove playwright >/dev/null 2>&1 || true
gosu devuser codex mcp add playwright -- \
  /usr/local/bin/playwright-mcp \
  --headless \
  --browser chromium \
  --no-sandbox \
  --isolated

exec gosu devuser "$@"
