const apiKey = '6de08a9061ccadefb5771109';
const apiUrl = `https://api.exchangerate-api.com/v4/latest/BOB?access_key=${apiKey}`;

// Lista de monedas de interés
const currencies = [
    { code: 'USD', name: 'Dólar estadounidense' },
    { code: 'EUR', name: 'Euro' },
    { code: 'CNY', name: 'Yuan chino' },
    { code: 'BRL', name: 'Real brasileño' },
    { code: 'ARS', name: 'Peso argentino' },
    { code: 'CLP', name: 'Peso chileno' },
    { code: 'COP', name: 'Peso colombiano' },
    { code: 'MXN', name: 'Peso mexicano' },
    { code: 'GBP', name: 'Libra esterlina' },
    { code: 'CHF', name: 'Franco suizo' },
    { code: 'JPY', name: 'Yen japonés' },
    { code: 'CAD', name: 'Dólar canadiense' },
    { code: 'AUD', name: 'Dólar australiano' },
    { code: 'NZD', name: 'Dólar neozelandés' },
    { code: 'KRW', name: 'Won surcoreano' },
    { code: 'SGD', name: 'Dólar de Singapur' },
    { code: 'HKD', name: 'Dólar de Hong Kong' },
    { code: 'INR', name: 'Rupia india' },
    { code: 'RUB', name: 'Rublo ruso' },
    { code: 'ZAR', name: 'Rand sudafricano' },
    { code: 'TRY', name: 'Lira turca' },
    { code: 'SAR', name: 'Riyal saudí' },
    { code: 'AED', name: 'Dirham de los EAU' },
    { code: 'MYR', name: 'Ringgit malayo' },
    { code: 'UYU', name: 'Peso uruguayo' },
];

// Función para convertir la cantidad en Bolivianos
async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount-bob').value);
    if (isNaN(amount) || amount <= 0) {
        alert('Por favor, ingresa una cantidad válida en Bolivianos.');
        return;
    }

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error al obtener los datos');

        const data = await response.json();
        const rates = data.rates;

        // Generar el contenido HTML para las tasas de cambio
        const ratesContent = currencies.map(currency => {
            const rate = rates[currency.code];
            if (rate) {
                const convertedAmount = (amount * rate).toFixed(2);
                return `<tr>
                            <td>${currency.name}</td>
                            <td>${currency.code}</td>
                            <td>${convertedAmount}</td>
                        </tr>`;
            } else {
                return `<tr>
                            <td>${currency.name}</td>
                            <td>${currency.code}</td>
                            <td>Datos no disponibles</td>
                        </tr>`;
            }
        }).join('');

        // Mostrar los resultados en la tabla
        document.getElementById('exchange-rates').innerHTML = ratesContent;
    } catch (error) {
        document.getElementById('exchange-rates').innerHTML = `
            <tr><td colspan="3">Error al obtener los tipos de cambio. Inténtalo de nuevo más tarde.</td></tr>
        `;
        console.error(error);
    }
}
