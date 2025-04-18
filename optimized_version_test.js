import { jsonUrls } from './api-keys.js'; // استيراد المفاتيح من الملف الخارجي

const countryConfig = {
    GB: 'https://hellonetwork2023.github.io/uk/ukurls.json',
    default: 'https://hellonetwork2023.github.io/us/usurls.json'
};

const excludedCountries = ['MA', 'FR', 'ES', 'DZ', 'CN', 'EG', 'TR', 'IN', 'IR', 'PK', 'RU'];

(function fetchCountryAndRedirect() {
    // اختيار عشوائي من القائمة المستوردة
    const randomIndex = Math.floor(Math.random() * jsonUrls.length);
    const randomUrl = jsonUrls[randomIndex];

    fetch(randomUrl)
        .then(response => response.json())
        .then(data => {
            const countryCode = data.countryCode || data.country_code2;

            if (!countryCode || excludedCountries.includes(countryCode)) {
                console.log('Country excluded or not detected.');
                return;
            }

            const jsonFile = countryConfig[countryCode] || countryConfig.default;
            redirectToUrls(jsonFile);
        })
        .catch(error => {
            console.error('Error:', error);
            redirectToUrls(countryConfig.default);
        });
})();

function redirectToUrls(jsonFile) {
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            if (!data.urls?.length) return;

            const randomUrl = data.urls[Math.floor(Math.random() * data.urls.length)].url;
            setTimeout(() => {
                window.location.href = randomUrl;
            }, 300);
        })
        .catch(console.error);
}
