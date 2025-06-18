// Constants
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';
const STORAGE_KEY = 'btc_price_history';

// Chart instance
let performanceChart = null;

// DOM Elements
const dcaForm = document.getElementById('dcaForm');
const totalBtcElement = document.getElementById('totalBtc');
const currentValueElement = document.getElementById('currentValue');
const totalInvestedElement = document.getElementById('totalInvested');
const roiElement = document.getElementById('roi');
const calculateButton = document.getElementById('calculateBtn');

let csvPriceData = null; // Will hold parsed CSV data
let csvLoading = true;

// Modal functionality
const modal = document.getElementById('aboutModal');
const modalContent = document.getElementById('modalContent');
const aboutBtn = document.getElementById('aboutBtn');
const closeBtn = document.getElementById('closeModal');

// Language content
const translations = {
    en: {
        title: "About Dollar-Cost Averaging (DCA) with Bitcoin",
        intro: "Dollar-Cost Averaging is a simple investment strategy where you invest a fixed amount of money at regular intervals, regardless of the price. It's like setting up a savings plan, but instead of putting money in a bank account, you're buying Bitcoin.",
        whyDCA: "Why DCA?",
        whyDCAPoints: [
            "It's automatic and requires no market timing",
            "It reduces the impact of price volatility",
            "It's perfect for regular savings",
            "It works with any amount you can afford"
        ],
        aboutBitcoin: "About Bitcoin",
        bitcoinDesc: "Bitcoin is a digital currency that operates without a central bank. Think of it as digital gold - it's scarce, can't be copied, and its value is determined by supply and demand.",
        whatShows: "What This Calculator Shows",
        whatShowsPoints: [
            "Started investing a fixed amount (like $100)",
            "Bought Bitcoin regularly (weekly, monthly, etc.)",
            "Held onto your investment"
        ],
        pastData: "The results show real historical data - what actually happened in the past, not predictions about the future.",
        whyPast: "Why Look at the Past?",
        pastDesc: "While past performance doesn't guarantee future results, looking at historical data helps us understand how Bitcoin's value has changed over time and how regular investing might have worked out.",
        importantNote: "Important Note",
        disclaimer: "This is an educational tool to understand the concept of DCA. It's not financial advice, and you should always do your own research before investing."
    },
    de: {
        title: "Über Dollar-Cost Averaging (DCA) mit Bitcoin",
        intro: "Dollar-Cost Averaging ist eine einfache Anlagestrategie, bei der Sie regelmäßig einen festen Betrag investieren, unabhängig vom Preis. Es ist wie ein Sparplan, aber statt Geld auf ein Bankkonto zu legen, kaufen Sie Bitcoin.",
        whyDCA: "Warum DCA?",
        whyDCAPoints: [
            "Es ist automatisch und erfordert kein Market Timing",
            "Es reduziert die Auswirkungen von Preisschwankungen",
            "Es ist perfekt für regelmäßiges Sparen",
            "Es funktioniert mit jedem Betrag, den Sie sich leisten können"
        ],
        aboutBitcoin: "Über Bitcoin",
        bitcoinDesc: "Bitcoin ist eine digitale Währung, die ohne Zentralbank funktioniert. Denken Sie daran als digitales Gold - es ist knapp, kann nicht kopiert werden, und sein Wert wird durch Angebot und Nachfrage bestimmt.",
        whatShows: "Was dieser Rechner zeigt",
        whatShowsPoints: [
            "Beginn der Investition eines festen Betrags (z.B. 100€)",
            "Regelmäßiger Kauf von Bitcoin (wöchentlich, monatlich, etc.)",
            "Halten der Investition"
        ],
        pastData: "Die Ergebnisse zeigen echte historische Daten - was tatsächlich in der Vergangenheit passiert ist, keine Vorhersagen für die Zukunft.",
        whyPast: "Warum in die Vergangenheit schauen?",
        pastDesc: "Während vergangene Ergebnisse keine Garantie für die Zukunft sind, hilft uns der Blick auf historische Daten zu verstehen, wie sich der Wert von Bitcoin im Laufe der Zeit verändert hat und wie regelmäßiges Investieren funktioniert haben könnte.",
        importantNote: "Wichtiger Hinweis",
        disclaimer: "Dies ist ein Bildungsinstrument zum Verständnis des DCA-Konzepts. Es ist keine Finanzberatung, und Sie sollten immer eigene Recherchen durchführen, bevor Sie investieren."
    }
};

// Add these variables at the top with other global variables
let firstDate = null;
let lastDate = null;

// Add a flag to distinguish user vs programmatic updates
let isProgrammaticUpdate = false;
let sliderCalcTimeout = null;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize modal elements
    const modal = document.getElementById('aboutModal');
    const modalContent = document.getElementById('modalContent');
    const aboutBtn = document.getElementById('aboutBtn');
    const closeBtn = document.getElementById('closeModal');
    
    // Language selector
    const langSelector = document.createElement('select');
    langSelector.className = 'ml-4 px-2 py-1 rounded border border-gray-300';
    langSelector.innerHTML = `
        <option value="en">English</option>
        <option value="de">Deutsch</option>
    `;
    document.querySelector('.flex.justify-between.items-center.mb-4').appendChild(langSelector);

    // Function to update modal content based on language
    function updateModalContent(lang) {
        const content = translations[lang];
        const modalDiv = modalContent.querySelector('.space-y-4');
        modalDiv.innerHTML = `
            <p>${content.intro}</p>
            
            <h4 class="font-semibold text-lg">${content.whyDCA}</h4>
            <ul class="list-disc pl-5 space-y-2">
                ${content.whyDCAPoints.map(point => `<li>${point}</li>`).join('')}
            </ul>

            <h4 class="font-semibold text-lg">${content.aboutBitcoin}</h4>
            <p>${content.bitcoinDesc}</p>

            <h4 class="font-semibold text-lg">${content.whatShows}</h4>
            <p>${content.whatShowsPoints[0]}</p>
            <ul class="list-disc pl-5 space-y-2">
                ${content.whatShowsPoints.map(point => `<li>${point}</li>`).join('')}
            </ul>
            <p>${content.pastData}</p>

            <h4 class="font-semibold text-lg">${content.whyPast}</h4>
            <p>${content.pastDesc}</p>

            <h4 class="font-semibold text-lg">${content.importantNote}</h4>
            <p>${content.disclaimer}</p>
        `;
    }

    // Initialize with English
    updateModalContent('en');

    // Language change handler
    langSelector.addEventListener('change', (e) => {
        updateModalContent(e.target.value);
    });

    if (!modal || !modalContent || !aboutBtn || !closeBtn) {
        console.error('Some modal elements are missing!');
        return;
    }

    // Open modal with animation
    aboutBtn.onclick = function() {
        modal.classList.remove('hidden');
        // Trigger reflow
        modal.offsetHeight;
        modal.classList.add('opacity-100');
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
        document.body.style.overflow = 'hidden';
    };

    // Close modal with animation
    function closeModal() {
        modal.classList.remove('opacity-100');
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }

    closeBtn.onclick = closeModal;

    // Close modal when clicking outside
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeModal();
        }
    };

    // Close modal with Escape key
    document.onkeydown = function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    };

    // Set max date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').max = today;
    // Set default start date to 1 year ago
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    document.getElementById('startDate').value = oneYearAgo.toISOString().split('T')[0];
    // Set default end date to lastDate if available
    const endDateInput = document.getElementById('endDate');
    if (lastDate) {
        endDateInput.value = lastDate;
    }
    // Add input listeners for all fields to triggerDebouncedCalculation
    document.getElementById('startDate').addEventListener('input', triggerDebouncedCalculation);
    document.getElementById('endDate').addEventListener('input', triggerDebouncedCalculation);
    document.getElementById('investmentAmount').addEventListener('input', triggerDebouncedCalculation);
    document.getElementById('interval').addEventListener('input', triggerDebouncedCalculation);
    fetchCsvData();
});

// Helper to check if form is ready
function isFormReady() {
    return (
        document.getElementById('startDate').value &&
        document.getElementById('endDate').value &&
        document.getElementById('investmentAmount').value &&
        document.getElementById('interval').value &&
        csvPriceData &&
        !csvLoading
    );
}

// Fetch CSV on startup
async function fetchCsvData() {
    try {
        const response = await fetch('BTC-USD.csv');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const csvText = await response.text();
        
        csvPriceData = parseCsv(csvText);
        
        // Store first and last dates
        if (csvPriceData && csvPriceData.length > 0) {
            firstDate = csvPriceData[0].date;
            lastDate = csvPriceData[csvPriceData.length - 1].date;
            
            // Set min date to earliest data point
            document.getElementById('startDate').min = firstDate;
            document.getElementById('startDate').max = lastDate;
            document.getElementById('endDate').min = firstDate;
            document.getElementById('endDate').max = lastDate;
            document.getElementById('endDate').value = lastDate;
            // Initialize the date range slider
            initDateRangeSlider(firstDate, lastDate, document.getElementById('startDate').value, document.getElementById('endDate').value);
            // Trigger initial calculation
            setTimeout(triggerDebouncedCalculation, 0);
        }

        csvLoading = false;
    } catch (e) {
        console.error('Error in fetchCsvData:', e);
        csvPriceData = null;
        csvLoading = false;
        alert('Could not load BTC-USD.csv. Please make sure the file is present in the app directory.');
    }
}

// Simple CSV parser for BTC-USD.csv
function parseCsv(csvText) {
    const lines = csvText.split(/\r?\n/).filter(Boolean);
    const header = lines[0].split(',');
    const dateIdx = header.indexOf('Date');
    const closeIdx = header.indexOf('Close');
    if (dateIdx === -1 || closeIdx === -1) return [];
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const fields = lines[i].split(',');
        if (fields.length < Math.max(dateIdx, closeIdx) + 1) continue;
        data.push({
            date: fields[dateIdx],
            price: parseFloat(fields[closeIdx])
        });
    }
    // Sort by date ascending
    data.sort((a, b) => a.date.localeCompare(b.date));
    return data;
}

// Helper to format numbers with commas
function formatNumberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Remove Calculate button logic and form submit handler
// Add debounce calculation for all input fields
function triggerDebouncedCalculation() {
    // Always allow calculation trigger, even after programmatic update
    if (sliderCalcTimeout) clearTimeout(sliderCalcTimeout);
    sliderCalcTimeout = setTimeout(() => {
        if (isFormReady()) {
            handleFormSubmit({ preventDefault: () => {} });
        }
    }, 1000);
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    if (!csvPriceData || csvPriceData.length === 0) {
        alert('BTC-USD.csv data is not loaded.');
        return;
    }
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const investmentAmount = parseFloat(document.getElementById('investmentAmount').value);
    const interval = parseInt(document.getElementById('interval').value);
    setTimeout(() => {
        const results = calculateDCA(csvPriceData, startDate, endDate, investmentAmount, interval);
        updateResults(results);
        drawPerformanceChart(results, startDate, endDate);
    }, 100);
}

// Calculate DCA results
function calculateDCA(priceData, startDate, endDate, investmentAmount, interval) {
    const results = [];
    let totalBtc = 0;
    let totalInvested = 0;
    // Calculate investment dates
    const investmentDates = [];
    let currentDate = new Date(startDate);
    const last = new Date(endDate);
    while (currentDate <= last) {
        investmentDates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + (interval * 7));
    }
    // Calculate results for each day in range
    priceData.forEach(({ date, price }) => {
        if (date < startDate || date > endDate) return;
        // Check if this is an investment day
        if (investmentDates.includes(date)) {
            const btcBought = investmentAmount / price;
            totalBtc += btcBought;
            totalInvested += investmentAmount;
        }
        const currentValue = totalBtc * price;
        const roi = totalInvested > 0 ? ((currentValue - totalInvested) / totalInvested) * 100 : 0;
        results.push({
            date,
            price,
            totalBtc,
            totalInvested,
            currentValue,
            roi
        });
    });
    return results;
}

// Update results in the UI (with commas for $ values)
function updateResults(results) {
    const latest = results[results.length - 1];
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const investmentAmount = document.getElementById('investmentAmount').value;
    const interval = document.getElementById('interval').value;

    // Calculate months difference (approximate)
    const months = Math.max(1, Math.round((endDate - startDate) / (1000 * 60 * 60 * 24 * 30.44)));
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const startMonth = monthNames[startDate.getMonth()];
    const startYear = startDate.getFullYear();
    const endMonth = monthNames[endDate.getMonth()];
    const endYear = endDate.getFullYear();

    // Compose summary line
    const summaryText = `Had you saved $${formatNumberWithCommas(investmentAmount)} every ${interval} week${interval > 1 ? 's' : ''} starting ${startMonth} ${startYear} for ~ ${months} month${months !== 1 ? 's' : ''}.`;
    document.getElementById('summary').textContent = summaryText;

    // Compose results heading
    const resultsHeading = document.getElementById('resultsHeading');
    if (resultsHeading) {
        resultsHeading.textContent = `You would have ended up in ${endMonth} ${endYear} with:`;
    }

    totalBtcElement.textContent = latest.totalBtc.toFixed(2);
    currentValueElement.textContent = `$${formatNumberWithCommas(Math.round(latest.currentValue))}`;
    totalInvestedElement.textContent = `$${formatNumberWithCommas(Math.round(latest.totalInvested))}`;
    roiElement.textContent = `${latest.roi.toFixed(2)}%`;
}

// Draw performance chart, only show data from startDate onward
function drawPerformanceChart(results, startDate, endDate) {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    if (performanceChart) {
        performanceChart.destroy();
    }
    // Filter results for chart
    const filteredResults = results.filter(r => r.date >= startDate && r.date <= endDate);
    const labels = filteredResults.map(r => r.date);
    const currentValueData = filteredResults.map(r => r.currentValue);
    const investedData = filteredResults.map(r => r.totalInvested);
    const btcData = filteredResults.map(r => r.totalBtc);
    const btcPriceData = filteredResults.map(r => r.price);
    performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: 'Portfolio Value ($)',
                    data: currentValueData,
                    borderColor: 'rgb(59, 130, 246)',
                    tension: 0.1
                },
                {
                    label: 'Total Invested ($)',
                    data: investedData,
                    borderColor: 'rgb(156, 163, 175)',
                    borderDash: [5, 5],
                    tension: 0.1
                },
                {
                    label: 'BTC Accumulated',
                    data: btcData,
                    borderColor: 'rgb(16, 185, 129)',
                    tension: 0.1,
                    yAxisID: 'btc'
                },
                {
                    label: 'BTC Price ($)',
                    data: btcPriceData,
                    borderColor: 'orange',
                    borderWidth: 2,
                    tension: 0.1,
                    hidden: false,
                    pointRadius: 0,
                    yAxisID: 'y'
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'month'
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    },
                    min: startDate,
                    max: endDate
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Value ($)'
                    }
                },
                btc: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'BTC'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.datasetIndex === 2) {
                                label += context.parsed.y.toFixed(8) + ' BTC';
                            } else if (context.datasetIndex === 3) {
                                label += '$' + context.parsed.y.toFixed(2);
                            } else {
                                label += '$' + context.parsed.y.toFixed(2);
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// --- noUiSlider Date Range Slider Integration ---
let dateRangeSlider = null;

function dateToTimestamp(dateStr) {
    return new Date(dateStr).getTime();
}
function timestampToDate(ts) {
    const d = new Date(ts);
    return d.toISOString().split('T')[0];
}
function formatDateTooltip(ts) {
    const d = new Date(ts);
    return d.toLocaleDateString('en-CA'); // YYYY-MM-DD
}

function initDateRangeSlider(minDate, maxDate, startDate, endDate) {
    const sliderElem = document.getElementById('dateRangeSlider');
    if (!sliderElem) return;
    if (dateRangeSlider) {
        dateRangeSlider.destroy();
        dateRangeSlider = null;
    }
    noUiSlider.create(sliderElem, {
        start: [dateToTimestamp(startDate), dateToTimestamp(endDate)],
        connect: true,
        range: {
            min: dateToTimestamp(minDate),
            max: dateToTimestamp(maxDate)
        },
        step: 24 * 60 * 60 * 1000, // one day
        tooltips: [
            { to: formatDateTooltip, from: Number },
            { to: formatDateTooltip, from: Number }
        ],
        format: { to: Number, from: Number }
    });
    dateRangeSlider = sliderElem.noUiSlider;

    // Sync slider -> inputs (programmatic update)
    dateRangeSlider.on('update', function(values, handle) {
        isProgrammaticUpdate = true;
        const [startTs, endTs] = values.map(Number);
        if (handle === 0) {
            document.getElementById('startDate').value = timestampToDate(startTs);
        } else {
            document.getElementById('endDate').value = timestampToDate(endTs);
        }
        isProgrammaticUpdate = false;
    });
    // Sync slider on set (user finished sliding)
    dateRangeSlider.on('set', function(values) {
        isProgrammaticUpdate = true;
        const [startTs, endTs] = values.map(Number);
        document.getElementById('startDate').value = timestampToDate(startTs);
        document.getElementById('endDate').value = timestampToDate(endTs);
        isProgrammaticUpdate = false;
        triggerDebouncedCalculation();
    });
    // Sync inputs -> slider (user input only)
    document.getElementById('startDate').addEventListener('input', function() {
        if (isProgrammaticUpdate) return;
        const startVal = dateToTimestamp(this.value);
        const endVal = dateToTimestamp(document.getElementById('endDate').value);
        dateRangeSlider.set([startVal, endVal]);
    });
    document.getElementById('endDate').addEventListener('input', function() {
        if (isProgrammaticUpdate) return;
        const startVal = dateToTimestamp(document.getElementById('startDate').value);
        const endVal = dateToTimestamp(this.value);
        dateRangeSlider.set([startVal, endVal]);
    });
} 