#!/usr/bin/env bash
set -euo pipefail
curl --fail --silent http://127.0.0.1:8080/health >/dev/null
curl --fail --silent http://127.0.0.1:8081/health >/dev/null
echo "Application validation passed."
