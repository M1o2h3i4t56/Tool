document.getElementById('conversion-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    if (amount && fromCurrency && toCurrency) {
        convertCurrency(amount, fromCurrency, toCurrency);
    } else {
        alert('Please fill in all fields');
    }
});

function convertCurrency(amount, fromCurrency, toCurrency) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            saveConversionHistory(amount, fromCurrency, convertedAmount, toCurrency);
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            alert('Error fetching exchange rates. Please try again later.');
        });
}

function saveConversionHistory(amount, fromCurrency, convertedAmount, toCurrency) {
    const historyEntry = `${amount} ${fromCurrency} to ${convertedAmount} ${toCurrency}`;
    const historyList = document.getElementById('history-list');
    const historyItem = document.createElement('div');
    historyItem.innerText = historyEntry;
    historyList.appendChild(historyItem);
}

// FAQ Toggle Functionality
document.querySelectorAll('.faq-item h3').forEach((faqQuestion) => {
    faqQuestion.addEventListener('click', () => {
        const faqItem = faqQuestion.parentElement;
        faqItem.classList.toggle('active');
    });
});

// Reset Functionality
function resetResults() {
    // Reset the input field
    document.getElementById('amount').value = '';

    // Reset the "From Currency" dropdown to default (e.g., USD)
    document.getElementById('from-currency').value = 'USD';

    // Reset the "To Currency" dropdown to default (e.g., EUR)
    document.getElementById('to-currency').value = 'EUR';

    // Clear the result box
    document.getElementById('result').innerText = '';

    // Clear the conversion history
    document.getElementById('history-list').innerHTML = '';
}