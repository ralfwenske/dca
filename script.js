/*
  BTC DCA Calculator - Main Application Logic
  Copyright (c) 2024 Ralf Wenske
  MIT License - see LICENSE file for details
*/

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

// Current language
let currentLanguage = 'en';

// Add these variables at the top with other global variables
let firstDate = null;
let lastDate = null;

// Add a flag to distinguish user vs programmatic updates
let isProgrammaticUpdate = false;
let sliderCalcTimeout = null;

// Store latest results globally for language switching
window.latestResults = null;

// Function to update all UI text based on current language
function updateUIText() {
    // Update page title
    document.title = getTranslation('pageTitle', currentLanguage);
    
    // Update main heading
    document.getElementById('mainHeading').textContent = getTranslation('mainHeading', currentLanguage);
    
    // Update About DCA button
    document.getElementById('aboutBtn').textContent = getTranslation('aboutDCA', currentLanguage);
    
    // Update form labels
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = getTranslation(key, currentLanguage);
    });
    
    // Update modal title
    document.getElementById('modalTitle').textContent = getTranslation('modalTitle', currentLanguage);
    
    // Update modal content
    updateModalContent();
    
    // Re-render results in new language if available
    if (window.latestResults) {
        updateResults(window.latestResults);
    }
}

// Function to update modal content based on language
function updateModalContent() {
    const modalDiv = document.querySelector('#modalContent .space-y-4');
    modalDiv.innerHTML = `
        <p>${getTranslation('intro', currentLanguage)}</p>
        <p>${getTranslation('successKey', currentLanguage)}</p>
        
        <h4 class="font-semibold text-lg">${getTranslation('whyDCA', currentLanguage)}</h4>
        <ul class="list-disc pl-5 space-y-2">
            ${getTranslation('whyDCAPoints', currentLanguage).map(point => `<li>${point}</li>`).join('')}
        </ul>

        <h4 class="font-semibold text-lg">${getTranslation('aboutBitcoin', currentLanguage)}</h4>
        <p>${getTranslation('bitcoinDesc', currentLanguage)}</p>

        <h4 class="font-semibold text-lg">${getTranslation('whatShows', currentLanguage)}</h4>
        <p>${getTranslation('whatShowsPoints', currentLanguage)[0]}</p>
        <ul class="list-disc pl-5 space-y-2">
            ${getTranslation('whatShowsPoints', currentLanguage).map(point => `<li>${point}</li>`).join('')}
        </ul>
        <p>${getTranslation('pastData', currentLanguage)}</p>

        <h4 class="font-semibold text-lg">${getTranslation('whyPast', currentLanguage)}</h4>
        <p>${getTranslation('pastDesc', currentLanguage)}</p>

        <h4 class="font-semibold text-lg">${getTranslation('importantNote', currentLanguage)}</h4>
        <p>${getTranslation('disclaimer', currentLanguage)}</p>
    `;
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize modal elements
    const modal = document.getElementById('aboutModal');
    const modalContent = document.getElementById('modalContent');
    const aboutBtn = document.getElementById('aboutBtn');
    const closeBtn = document.getElementById('closeModal');
    const languageSelector = document.getElementById('languageSelector');
    
    // Initialize UI with current language
    updateUIText();

    // Language change handler
    languageSelector.addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        updateUIText();
        if (window.latestResults) {
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;
            drawPerformanceChart(window.latestResults, startDate, endDate);
        }
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
    
    // Initialize BTC price data from the included JavaScript file
    csvPriceData = getBtcPriceArray();
    csvLoading = false;
    
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
        alert(getTranslation('dataNotLoaded', currentLanguage));
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

// Update results display
function updateResults(results) {
    if (results.length === 0) return;
    
    // Store latest results for language switching
    window.latestResults = results;
    
    const latest = results[results.length - 1];
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const investmentAmount = parseFloat(document.getElementById('investmentAmount').value);
    const interval = parseInt(document.getElementById('interval').value);
    
    // Calculate months between dates
    const months = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24 * 30.44));
    
    // Get month names in current language
    const startMonth = getMonthName(startDate.getMonth(), currentLanguage);
    const endMonth = getMonthName(endDate.getMonth(), currentLanguage);
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    
    // Get correct pluralization for week and month
    const weekWord = interval > 1
        ? getTranslation('weekPlural', currentLanguage)
        : getTranslation('weekSingular', currentLanguage);
    const monthWord = months > 1
        ? getTranslation('monthPlural', currentLanguage)
        : getTranslation('monthSingular', currentLanguage);
    
    // Create summary text with translations
    const summaryText = getTranslation('summaryText', currentLanguage, {
        amount: `$${formatNumberWithCommas(investmentAmount)}`,
        interval: interval,
        weekWord: weekWord,
        startMonth: startMonth,
        startYear: startYear,
        months: months,
        monthWord: monthWord
    });
    
    document.getElementById('summary').innerHTML = summaryText;
    
    // Update results heading
    const resultsHeading = document.getElementById('resultsHeading');
    resultsHeading.textContent = getTranslation('resultsHeading', currentLanguage, {
        endMonth: endMonth,
        endYear: endYear
    });
    
    // Update result values (always use $ for currency)
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
    const chartLabels = getTranslation('chartLabels', currentLanguage);
    const chartAxis = getTranslation('chartAxis', currentLanguage);
    const monthsArr = getTranslation('months', currentLanguage);
    performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: chartLabels.portfolioValue,
                    data: currentValueData,
                    borderColor: 'rgb(59, 130, 246)',
                    tension: 0.1
                },
                {
                    label: chartLabels.totalInvested,
                    data: investedData,
                    borderColor: 'rgb(156, 163, 175)',
                    borderDash: [5, 5],
                    tension: 0.1
                },
                {
                    label: chartLabels.btcAccumulated,
                    data: btcData,
                    borderColor: 'rgb(16, 185, 129)',
                    tension: 0.1,
                    yAxisID: 'btc',
                    hidden: true
                },
                {
                    label: chartLabels.btcPrice,
                    data: btcPriceData,
                    borderColor: 'orange',
                    borderWidth: 2,
                    tension: 0.1,
                    hidden: true,
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
                        text: chartAxis.date
                    },
                    min: startDate,
                    max: endDate,
                    ticks: {
                        callback: function(value, index, ticks) {
                            // value is a timestamp or ISO string
                            const date = new Date(value);
                            const monthIdx = date.getMonth();
                            // Use first 3 chars of the translated month name + year
                            return monthsArr[monthIdx].slice(0, 3) + ' ' + date.getFullYear();
                        }
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: chartAxis.value
                    }
                },
                btc: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: chartAxis.btc
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            // Localize the tooltip date
                            const date = new Date(context[0].label);
                            return date.toLocaleDateString(currentLanguage);
                        },
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