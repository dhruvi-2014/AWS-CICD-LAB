#!/usr/bin/env bash
set -euo pipefail
systemctl stop coffee-supplier.service 2>/dev/null || true
systemctl stop customer-microservice.service 2>/dev/null || true
