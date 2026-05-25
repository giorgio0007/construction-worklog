#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "→ Stopping containers..."
docker compose down --remove-orphans 2>/dev/null || true

kill_orphans() {
  local pattern=$1
  local pids

  pids=$(pgrep -f "$pattern" 2>/dev/null || true)
  if [ -n "$pids" ]; then
    echo "→ Killing orphaned: $pattern"
    sudo kill -9 $pids 2>/dev/null || kill -9 $pids 2>/dev/null || true
  fi
}

for port in 3003 5174; do
  if ss -tln | grep -q ":${port} "; then
    echo "→ Port ${port} is busy"
    kill_orphans "docker-proxy.*host-port ${port}"
  fi
done

kill_orphans 'node /app/node_modules/.bin/vite --host 0.0.0.0'
kill_orphans 'node /app/node_modules/.bin/nest start --watch'

sleep 1

if ss -tln | grep -qE ':(3003|5174) '; then
  echo ""
  echo "Ports still busy. Run manually:"
  echo "  sudo systemctl restart docker"
  echo "  ./scripts/docker-up.sh"
  exit 1
fi

echo "→ Starting..."
exec docker compose up --build "$@"
