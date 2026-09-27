#!/usr/bin/env bash
set -euo pipefail
id appuser >/dev/null 2>&1 || useradd --system --create-home --shell /bin/bash appuser
mkdir -p /opt/coffee-supplier/data
chown -R appuser:appuser /opt/coffee-supplier
cd /opt/coffee-supplier
sudo -u appuser npm ci --omit=dev
cd /opt/coffee-supplier/services/customer-service
sudo -u appuser npm ci --omit=dev
cat >/etc/systemd/system/coffee-supplier.service <<'UNIT'
[Unit]
Description=Coffee Supplier Web Application
After=network.target
[Service]
Type=simple
User=appuser
WorkingDirectory=/opt/coffee-supplier
Environment=NODE_ENV=production
Environment=PORT=8080
Environment=DB_FILE=/opt/coffee-supplier/data/coffee.db
ExecStart=/usr/bin/node /opt/coffee-supplier/src/server.js
Restart=always
RestartSec=3
[Install]
WantedBy=multi-user.target
UNIT
cat >/etc/systemd/system/customer-microservice.service <<'UNIT'
[Unit]
Description=Customer Microservice
After=network.target
[Service]
Type=simple
User=appuser
WorkingDirectory=/opt/coffee-supplier/services/customer-service
Environment=NODE_ENV=production
Environment=PORT=8081
ExecStart=/usr/bin/node /opt/coffee-supplier/services/customer-service/src/server.js
Restart=always
RestartSec=3
[Install]
WantedBy=multi-user.target
UNIT
systemctl daemon-reload
