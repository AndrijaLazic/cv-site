#!/usr/bin/env bash

# Fail fast on any error, unset variable, or failed pipeline segment.
set -euo pipefail

# Default restrictive permissions for anything the script creates.
umask 027

SCRIPT_DIR="$(CDPATH='' cd -- "$(dirname -- "$0")" && pwd)"
COMPOSE_FILE="$SCRIPT_DIR/docker/stage/docker-compose.yml"
ENV_FILE="$SCRIPT_DIR/docker/stage/.env"

cd "$SCRIPT_DIR"

# Build the --env-file flag when an env file is present.
ENV_FILE_ARG=()
if [[ -f "$ENV_FILE" ]]; then
  ENV_FILE_ARG=(--env-file "$ENV_FILE")
fi

# Rebuild and restart the application container in detached mode.
docker compose -f "$COMPOSE_FILE" "${ENV_FILE_ARG[@]}" up -d --build --remove-orphans

# Remove dangling images left behind by rebuilt layers.
docker image prune -f