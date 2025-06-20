Red [
    Title: "Convert .csv data from Investing.com to JavaScript object"
    Interpreter: https://www.red-lang.org/
    Author: "Ralf"
    Date: 19-Jun-2025
    File: %Convertcsv.red
    Price-Source: https://www.investing.com/crypto/bitcoin/historical-data
    Purpose: comment [
        Historical price data from Investing.com has following format: 
        
        "Date","Price","Open","High","Low","Vol.","Change %"
        "19/06/2025","105,043.5","104,894.2","105,209.3","104,492.9","45.58K","0.14%"
        "18/06/2025","104,894.2","104,571.4","105,553.0","103,622.4","45.60K","0.32%"       
        
        This script converts it to the following format: 

        // BTC Price Data - Date as key, Price as value 
        const btcPriceData = { 
        "2025-06-19": 105043.5,
        "2025-06-18": 104894.2,        
        ...
        }

    ]

priceArray: ""
jsCode1: "// BTC Price Data - Date as key, Price as value ^/ const btcPriceData = { ^/" 

jsCode2: {

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
}

make-date: function [date [string!] /local d m y] [
    d: first split date "/"
    m: second split date "/"
    y: third split date "/"
    return rejoin [{"} y {-} m {-} d {": }]
]

str: ""
prices: load %"BTC-USD investingcom.csv"
print "Converting..."
foreach price next prices [
    append priceArray reduce [make-date price/1  to-float (replace price/2 "," "") "," "^/"]
]

print jsCode1
print jsCode2
write %../btc-price-data.js rejoin [jsCode1 (priceArray) "};" jsCode2 ]
print "Done."