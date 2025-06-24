const fs = require('fs');
const path = require('path');

// Function to convert date format from MM/DD/YYYY to YYYY-MM-DD
function makeDate(dateStr) {
    const [month, day, year] = dateStr.split('/');
    return `"${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}": `;
}

// Function to clean price string (remove commas and convert to float)
function cleanPrice(priceStr) {
    return parseFloat(priceStr.replace(/,/g, ''));
}

// Function to create backup of existing file
function createBackup() {
    const outputPath = path.join(__dirname, '..', 'btc-price-data.js');
    const backupPath = path.join(__dirname, '..', 'btc-price-data.js.backup');
    
    if (fs.existsSync(outputPath)) {
        fs.copyFileSync(outputPath, backupPath);
        console.log("Backup created: btc-price-data.js.backup");
    }
}

// Main conversion function
function convertCsvToJs() {
    console.log("Converting...");
    
    // Create backup before overwriting
    createBackup();
    
    // Read the CSV file
    const csvPath = path.join(__dirname, 'Bitcoin Historical Data.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    
    // Split into lines and skip header
    const lines = csvContent.split('\n').filter(line => line.trim());
    const dataLines = lines.slice(1); // Skip header row
    
    // Build the price array string
    let priceArray = '';
    
    dataLines.forEach(line => {
        // Parse CSV line (handle quoted fields)
        const matches = line.match(/"([^"]*)"/g);
        if (matches && matches.length >= 2) {
            const date = matches[0].replace(/"/g, '');
            const price = matches[1].replace(/"/g, '');
            
            const formattedDate = makeDate(date);
            const cleanedPrice = cleanPrice(price);
            
            priceArray += `${formattedDate}${cleanedPrice},\n`;
        }
    });
    
    // Create the JavaScript code
    const jsCode1 = "// BTC Price Data - Date as key, Price as value\nconst btcPriceData = {\n";
    
    const jsCode2 = `

// Function to get price by date
function getBtcPrice(date) {
    return btcPriceData[date];
}

// Function to get all available dates
function getBtcDates() {
    return Object.keys(btcPriceData).sort();
}

// Function to get all data as array of objects (for compatibility with existing code)
function getBtcPriceArray() {
    return Object.entries(btcPriceData)
        .map(([date, price]) => ({ date, price }))
        .sort((a, b) => a.date.localeCompare(b.date));
}
`;
    
    // Combine all parts and write to file
    const outputPath = path.join(__dirname, '..', 'btc-price-data.js');
    const fullContent = jsCode1 + priceArray + "};" + jsCode2;
    
    fs.writeFileSync(outputPath, fullContent);
    
    console.log("Done.");
}

// Run the conversion
convertCsvToJs(); 