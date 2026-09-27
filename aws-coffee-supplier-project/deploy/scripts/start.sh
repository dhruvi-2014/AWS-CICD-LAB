#!/usr/bin/env bash
set -euo pipefail
mkdir -p /opt/coffee-supplier/data
chown -R appuser:appuser /opt/coffee-supplier/data
systemctl enable coffee-supplier.service customer-microservice.service
systemctl start coffee-supplier.service customer-microservice.service
