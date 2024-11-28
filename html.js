const jsonUrls = [
    'https://pro.ip-api.com/json/?key=6KddQSe576qrfNb',
    'https://pro.ip-api.com/json/?key=U4NdpvcDcxvMekN',
];

// Determine user location and load corresponding product data
async function fetchCountryAndRedirect() {
    try {
        const randomUrl = jsonUrls[Math.floor(Math.random() * jsonUrls.length)];
        const response = await fetch(randomUrl);
        const data = await response.json();

        // Extract country code (support multiple naming conventions)
        const countryCode = data.countryCode || data.country_code2;

        if (!countryCode) {
            console.error('Country code not found. Loading default (US) products.');
            return loadProducts('https://hellonetwork2023.github.io/us/usurls.json');
        }

        // Load UK or US product URLs based on the country
        const url =
            countryCode === 'GB'
                ? 'https://hellonetwork2023.github.io/us/ukurls.json'
                : 'https://hellonetwork2023.github.io/us/usurls.json';

        console.log(`Detected country: ${countryCode}. Loading: ${url}`);
        loadProducts(url);
    } catch (error) {
        console.error('Error fetching country data:', error);
        loadProducts('https://hellonetwork2023.github.io/us/usurls.json'); // Fallback to US URLs
    }
}

// Fetch and display products from a specified JSON file
async function loadProducts(jsonFile) {
    try {
        const response = await fetch(jsonFile);
        const data = await response.json();
        const thumbnails = document.querySelector('.thumbnails');

        if (!thumbnails) {
            console.error('Thumbnails element not found.');
            return;
        }

        const usedIndices = [];
        const products = data.urls || [];

        // Loop through product data
        for (let i = 0; i < products.length; i++) {
            let randomIndex;

            // Generate a unique random index
            do {
                randomIndex = Math.floor(Math.random() * products.length);
            } while (usedIndices.includes(randomIndex));

            usedIndices.push(randomIndex);
            const product = products[randomIndex];

            // Build and append the product element
            const li = document.createElement('li');
            li.className = 'span3';

            li.innerHTML = `
                <div class="thumbnail">
                    <a href="${product.url}">
                        <img src="${product.image}" alt="${product.name}" style="width:auto;height:260px;">
                    </a>
                    <div class="caption">
                        <h5 style="max-width: 300px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">
                            ${product.name}
                        </h5>
                        <p>${product.description}</p>
                        <h4 style="text-align:center;">
                            <a class="btn" href="${product.url}">
                                <i class="icon-zoom-in"></i>
                            </a>
                            <a class="btn btn-primary" href="${product.url}">
                                <i class="icon-shopping-cart"></i>
                            </a>
                        </h4>
                    </div>
                </div>
            `;

            thumbnails.appendChild(li);
        }
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

// Execute when the page is loaded
document.addEventListener('DOMContentLoaded', fetchCountryAndRedirect);
