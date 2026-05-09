/*
  BTC DCA Calculator - Automated Daily Price Fetcher
  Fetches missing BTC price data from CoinGecko and updates btc-price-data.js
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
  apiUrl: 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range',
  userAgent: 'BTC-DCA-Calculator/1.0 (automationscript)'
};

// Fetch BTC price data for a date range from CoinGecko API
function fetchBtcPriceRange(fromTimestamp, toTimestamp) {
  return new Promise((resolve, reject) => {
    const url = new URL(CONFIG.apiUrl);
    url.searchParams.set('vs_currency', 'usd');
    url.searchParams.set('from', fromTimestamp);
    url.searchParams.set('to', toTimestamp);

    const options = {
      headers: { 'User-Agent': CONFIG.userAgent },
      timeout: 15000
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
          if (!json.prices || !Array.isArray(json.prices)) {
            reject(new Error('Invalid API response format'));
            return;
          }
          
          // Convert timestamps to dates and prices
          const priceData = {};
          json.prices.forEach(([timestamp, price]) => {
            const date = new Date(timestamp).toISOString().split('T')[0];
            priceData[date] = Math.round(price * 10) / 10;
          });
          
          resolve(priceData);
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
  if (fs.existsSync(CONFIG.dataFile)) {
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
  console.log('Checking for missing BTC price data...');

  try {
    const fileInfo = readExistingData();
    const existingDates = Object.keys(fileInfo.data);
    
    if (existingDates.length === 0) {
      console.error('Error: No existing price data found');
      process.exit(1);
    }

    // Find the latest date in existing data
    const latestDate = existingDates.sort().pop();
    console.log(`✓ Latest date in data: ${latestDate}`);

    // Calculate date range for missing data
    const latest = new Date(latestDate);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Set times to midnight UTC for accurate day calculation (avoid timezone issues)
    const latestStart = Date.UTC(latest.getFullYear(), latest.getMonth(), latest.getDate());
    const yesterdayStart = Date.UTC(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
    const tomorrowStart = Date.UTC(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate() + 1);

    // We want to fetch data for dates: (latestDate, yesterday] 
    // Which translates to timestamps: [latestStart + 1 day, yesterdayStart + 1 day)
    const fromTimestamp = (latestStart + (24 * 60 * 60 * 1000)) / 1000; // Start of next day after latest
    const toTimestamp = tomorrowStart / 1000; // Start of day after yesterday (exclusive)
    
    // Calculate number of days to fetch
    const timeDiff = toTimestamp * 1000 - fromTimestamp * 1000;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

    if (daysDiff <= 0) {
        console.log('✓ No missing data - you are up to date!');
        return;
    }

    console.log(`✓ Found ${daysDiff} missing day(s) from ${new Date(fromTimestamp * 1000).toISOString().split('T')[0]} to ${new Date((toTimestamp * 1000) - (24 * 60 * 60 * 1000)).toISOString().split('T')[0]}`);
    console.log(`✓ Fetching price data for ${daysDiff} day(s)...`);

    // Fetch the missing price data
    const newData = await fetchBtcPriceRange(fromTimestamp, toTimestamp);
    
    // Merge new data with existing data
    Object.keys(newData).forEach(date => {
      if (!fileInfo.data[date]) {
        fileInfo.data[date] = newData[date];
        console.log(`✓ Added price for ${date}: $${newData[date].toLocaleString()}`);
      }
    });

    // Create backup and write updated data
    createBackup();
    writeDataFile(fileInfo);

    const allDates = Object.keys(fileInfo.data).sort();
    console.log(`✓ Total price data points: ${allDates.length}`);
    console.log(`✓ Date range: ${allDates[0]} to ${allDates[allDates.length - 1]}`);

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