#!/bin/bash
set -e
cd "$(dirname "$0")/.."
echo "========================================"
echo " YouTube Analytics MCP Setup"
echo "========================================"
npm ci
npm run build
echo ""
echo "Build complete. Entry point is build/index.js."
