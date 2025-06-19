Red [
    Title: "Convert .csv data from Investing.com to just Date,Price format"
    Interpreter: https://www.red-lang.org/
    Author: "Ralf"
    Date: 19-Jun-2025
    File: %Convertcsv.red
    Price-Source: https://www.investing.com/crypto/bitcoin/historical-data
    Purpose: {
        Historical price data from Investing.com has following format: 
        
        "Date","Price","Open","High","Low","Vol.","Change %"
        "19/06/2025","105,043.5","104,894.2","105,209.3","104,492.9","45.58K","0.14%"
        "18/06/2025","104,894.2","104,571.4","105,553.0","103,622.4","45.60K","0.32%"        
        
        This script converts it to the following format: Date,Price
        2025-06-19,105043.5
        2025-06-18,104894.2
        ...
        2015-01-02,315.2
        2015-01-01,314.9
        
        }
]

make-date: function [date [string!] /local d m y] [
    d: first split date "/"
    m: second split date "/"
    y: third split date "/"
    return rejoin [y "-" m "-" d]
]

str: ""
prices: load %"BTC-USD investingcom.csv"
print "Converting..."
foreach price next prices [
    append str reduce [make-date price/1 "," to-float (replace price/2 "," "") newline]
]

write %../BTC-USD.csv str
print "Done."