#!/bin/bash
# Automated daily BTC price update script
# Usage: ./update-btc-price.sh

cd "$(dirname "$0")"
node BTC-Price/fetchDailyPrice.js
