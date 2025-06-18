// convert-yahoo-txt-to-csv.js
const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'BTC-USD from Yahoo.txt');
const outputFile = path.join(__dirname, 'BTC-USD.csv');

const raw = fs.readFileSync(inputFile, 'utf8');
const lines = raw.split('\n').map(line => line.trim()).filter(Boolean);

function parseDate(dateStr) {
  const months = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
  };
  const match = dateStr.match(/^([A-Za-z]{3}) (\d{1,2}), (\d{4})$/);
  if (!match) return dateStr;
  const [, mon, day, year] = match;
  return `${year}-${months[mon]}-${day.padStart(2, '0')}`;
}

// Fix the header: split on any whitespace (including tabs), then join with commas
const header = lines[0].split(/\s+/).join(',');
const csvRows = [header];

for (let i = 1; i < lines.length; i++) {
  let fields = lines[i].split(/\t+|\s{2,}/).map(f => f.trim()).filter(Boolean);
  if (fields.length < 7) continue;
  fields[0] = parseDate(fields[0]);
  for (let j = 1; j < fields.length; j++) {
    fields[j] = fields[j].replace(/,/g, '');
  }
  csvRows.push(fields.join(','));
}

fs.writeFileSync(outputFile, csvRows.join('\n'), 'utf8');
console.log(`Converted to ${outputFile}`);