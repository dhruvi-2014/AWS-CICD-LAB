#!/bin/bash
set -eux
apt-get update -y
apt-get install -y curl git build-essential
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
useradd --system --create-home --shell /bin/bash appuser || true
mkdir -p /opt/coffee-supplier
chown -R appuser:appuser /opt/coffee-supplier
