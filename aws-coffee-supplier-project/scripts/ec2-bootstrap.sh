#!/usr/bin/env bash
set -euo pipefail
sudo apt-get update -y
sudo apt-get install -y curl git build-essential
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo mkdir -p /opt/coffee-supplier
sudo chown -R "$USER":"$USER" /opt/coffee-supplier
echo "EC2 bootstrap complete. Clone the repository into /opt/coffee-supplier and install dependencies."
