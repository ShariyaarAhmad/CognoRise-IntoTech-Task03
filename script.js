document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const convertButton = document.getElementById('convertButton');
    const resultDiv = document.getElementById('result');

    // Fetch exchange rates and populate currency options
    async function fetchCurrencies() {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        const currencies = Object.keys(data.rates);

        currencies.forEach(currency => {
            const optionFrom = document.createElement('option');
            optionFrom.value = currency;
            optionFrom.textContent = currency;
            fromCurrencySelect.appendChild(optionFrom);

            const optionTo = document.createElement('option');
            optionTo.value = currency;
            optionTo.textContent = currency;
            toCurrencySelect.appendChild(optionTo);
        });
    }

    async function convertCurrency() {
        const amount = amountInput.value;
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (!amount || !fromCurrency || !toCurrency) {
            resultDiv.textContent = 'Please fill in all fields.';
            return;
        }

        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    }

    convertButton.addEventListener('click', convertCurrency);

    fetchCurrencies();
});
