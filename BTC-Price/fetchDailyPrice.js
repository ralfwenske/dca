/*
  BTC DCA Calculator - Automated Daily Price Fetcher
  Fetches latest BTC price from CoinGecko and updates btc-price-data.js
  Copyright (c) 2024 Ralf Wenske
  MIT License - see LICENSE file for details
*/

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const CONFIG = {
  dataFile: path.join(__dirname, '..', 'btc-price-data.js'),
  backupFile: path.join(__dirname, '..', 'btc-price-data.js.backup'),
  apiUrl: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_last_updated_at=true',
  userAgent: 'BTC-DCA-Calculator/1.0 (automationscript)'
};

// Fetch BTC price from CoinGecko API
function fetchBtcPrice() {
  return new Promise((resolve, reject) => {
    const url = new URL(CONFIG.apiUrl);
    const options = {
      headers: { 'User-Agent': CONFIG.userAgent },
      timeout: 10000
    };

    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`API request failed: ${res.statusCode} ${res.statusMessage}`));
          return;
        }
        try {
          const json = JSON.parse(data);
          const bitcoin = json.bitcoin;
          if (!bitcoin || !bitcoin.usd) {
            reject(new Error('Invalid API response format'));
            return;
          }
          resolve({
            price: Math.round(bitcoin.usd * 10) / 10,
            date: new Date(bitcoin.last_updated_at * 1000).toISOString().split('T')[0]
          });
        } catch (e) {
          reject(new Error('Failed to parse API response: ' + e.message));
        }
      });
    });

    req.on('error', (e) => reject(new Error('Network error: ' + e.message)));
    req.on('timeout', () => { req.destroy(); reject(new Error('Request timeout')); });
    req.end();
  });
}

// Create backup of existing file
function createBackup() {
    fs.copyFileSync(CONFIG.dataFile, CONFIG.backupFile);
    console.log('✓ Backup created: btc-price-data.js.backup');
  }
}

// Read existing price data from the JavaScript file
function readExistingData() {
  if (!fs.existsSync(CONFIG.dataFile)) {
    return { prefix: '', dataStart: 'const btcPriceData = {', dataEnd: '};', suffix: '', data: {} };
  }

  const content = fs.readFileSync(CONFIG.dataFile, 'utf8');

  // Find the start of the data object
  const startMatch = content.match(/const\s+btcPriceData\s*=\s*\{/);
  if (!startMatch) {
    console.error('Error: Could not find btcPriceData object in file');
    process.exit(1);
  }

  const dataStart = startMatch[0];
  const dataStartIdx = startMatch.index;
  const prefix = content.substring(0, dataStartIdx);

  // Find opening brace position
  const openBraceIdx = dataStartIdx + dataStart.indexOf('{');

  // Find matching closing brace
  let braceCount = 1;
  let endIdx = -1;
  for (let i = openBraceIdx + 1; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') braceCount--;
    if (braceCount === 0) {
      endIdx = i;
      break;
    }
  }

  if (endIdx === -1) {
    console.error('Error: Could not find matching closing brace');
    process.exit(1);
  }

  const dataBlock = content.substring(dataStartIdx, endIdx + 1);
  const suffix = content.substring(endIdx + 1);

  // Parse existing data
  const data = {};
  const lineRegex = /"([^"]+)":\s*([\d.]+)\s*,?/g;
  let lineMatch;
  while ((lineMatch = lineRegex.exec(dataBlock)) !== null) {
    data[lineMatch[1]] = parseFloat(lineMatch[2]);
  }

  return { prefix, dataStart, dataEnd: '};', suffix, data };
}

// Write updated data to file
function writeDataFile(fileInfo) {
  const { prefix, dataStart, dataEnd, suffix, data } = fileInfo;

  const sortedDates = Object.keys(data).sort((a, b) => b.localeCompare(a));
  const lines = sortedDates.map(date => `  "${date}": ${data[date]},`);
  const dataBlock = `${dataStart}\n${lines.join('\n')}\n${dataEnd}`;

  let cleanedSuffix = suffix.replace(/^\s+/, '');
  if (!cleanedSuffix) {
    // Add default helper functions if none exist
    cleanedSuffix = '\n\n' + [
      '',
      '// Function to get price by date',
      'function getBtcPrice(date) {',
      '    return btcPriceData[date];',
      '}',
      '',
      '// Function to get all available dates',
      'function getBtcDates() {',
      '    return Object.keys(btcPriceData).sort();',
      '}',
      '',
      '// Function to get all data as array of objects (for compatibility with existing code)',
      'function getBtcPriceArray() {',
      '    return Object.entries(btcPriceData)',
      '        .map(([date, price]) => ({ date, price }))',
      '        .sort((a, b) => a.date.localeCompare(b.date));',
      '}'
    ].join('\n');
  } else {
    cleanedSuffix = '\n\n' + cleanedSuffix;
  }

  fs.writeFileSync(CONFIG.dataFile, prefix + dataBlock + cleanedSuffix, 'utf8');
  console.log(`✓ Updated ${CONFIG.dataFile}`);
}

// Main update function
async function updatePriceData() {
  console.log('Fetching latest BTC price...');

  try {
    const { price, date } = await fetchBtcPrice();
    console.log(`✓ Fetched price for ${date}: $${price.toLocaleString()}`);

    const fileInfo = readExistingData();

    if (fileInfo.data[date]) {
      const oldPrice = fileInfo.data[date];
      if (Math.abs(oldPrice - price) < 0.1) {
        console.log(`✓ Price for ${date} is already up to date ($${oldPrice})`);
      } else {
        console.log(`⚠ Price changed from $${oldPrice} to $${price}`);
        fileInfo.data[date] = price;
        createBackup();
        writeDataFile(fileInfo);
      }
    } else {
      console.log(`✓ Adding new price entry for ${date}`);
      createBackup();
      fileInfo.data[date] = price;
      writeDataFile(fileInfo);
    }

    const dates = Object.keys(fileInfo.data).sort();
    console.log(`✓ Total price data points: ${dates.length}`);
    console.log(`✓ Date range: ${dates[0]} to ${dates[dates.length - 1]}`);

  } catch (error) {
    console.error('Error updating price data:', error.message);
    process.exit(1);
  }
}

// Run
updatePriceData().then(() => {
  console.log('Done.');
  process.exit(0);
}).catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
