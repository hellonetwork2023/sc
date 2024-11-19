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
    "https://server-tracking.eu/amz/unsubscribe-122023-01.html"
];

// Function to select a random URL and redirect
function redirectToRandomUrl() {
    const randomIndex = Math.floor(Math.random() * urls.length);
    const randomUrl = urls[randomIndex];
    console.log(`Redirecting to: ${randomUrl}`);
    window.location.href = randomUrl; // Perform the redirect
}

// Trigger the redirect after the page loads
window.onload = redirectToRandomUrl;
