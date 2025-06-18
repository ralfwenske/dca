# BTC Dollar-Cost Averaging (DCA) Calculator

![Screenshot of BTC-DCA Calculator](screenshot.png)

*A sample simulation showing DCA results and performance chart for Bitcoin.*

A web application to visualize the results of a Bitcoin dollar-cost averaging (DCA) investment strategy using real historical price data. The app allows you to simulate what would have happened if you had regularly invested a fixed amount in Bitcoin over any period in the past.

## Features

- **Interactive DCA Simulation:**
  - Drag-and-drop date range slider for easy period selection
  - Set investment amount and interval (in weeks)
  - Real-time calculation updates as you adjust inputs
- **Historical Data:**
  - Uses daily close price data from Yahoo Finance (BTC-USD.csv)
  - No API keys or internet price fetches required
- **Modern UI:**
  - Clean, responsive grid layout for inputs and results
  - Large, interactive performance chart with BTC price overlay
  - Automatic resizing for desktop and mobile views
- **Results Display:**
  - Total invested, ROI, current value, and total BTC accumulated
  - Dynamic summary showing investment period and frequency
  - Results update automatically with any input change
- **About Modal:**
  - Clickable "About DCA" popup with a plain-language explanation
  - Language support (English, German)

## How to Use

1. Download daily BTC-USD price data as a CSV from Yahoo Finance ([instructions here](https://finance.yahoo.com/quote/BTC-USD/history/?period1=1410912000&period2=1749952879)).
2. Place the file as `BTC-USD.csv` in the app directory (same folder as `index.html`).
3. Open `index.html` in a modern web browser using a local web server (e.g. `python3 -m http.server`).
4. Use the slider or date inputs to select your investment period.
5. Enter your desired investment amount and interval.
6. Results and chart will update automatically as you make changes.
7. Click **About DCA** for an explanation of the strategy.

## Data Source

- **Price Data:** Daily close prices from [Yahoo Finance BTC-USD](https://finance.yahoo.com/quote/BTC-USD/history/?period1=1410912000&period2=1749952879)
- **CSV Format:**
  - The first row must be a header: `Date,Open,High,Low,Close,Adj_Close,Volume`
  - Dates must be in `YYYY-MM-DD` format

## Technologies Used

- HTML5, CSS3 (Tailwind CSS)
- JavaScript (ES6+)
- Chart.js (for data visualization)

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript
- Canvas API (for charts)

## License

This project is open source and available under the MIT License. 