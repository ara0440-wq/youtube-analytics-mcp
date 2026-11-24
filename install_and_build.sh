#!/bin/bash
set -e
cd "$(dirname "$0")/.."
echo "========================================"
echo " YouTube Analytics MCP - O'rnatish"
echo "========================================"
npm ci
npm run build
echo ""
echo "TAYYOR! build/index.js yaratildi."
