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


// Fetch user country and load posts accordingly
async function fetchCountryAndRedirect() {
    try {
        const randomUrl = jsonUrls[Math.floor(Math.random() * jsonUrls.length)];
        const response = await fetch(randomUrl);
        const data = await response.json();

        // Extract country code
        const countryCode = data.countryCode || data.country_code2;

        if (!countryCode) {
            console.error('Country code not found. Loading default posts.');
            return loadPosts('https://hellonetwork2023.github.io/us/usurls.json');
        }

        // Load UK or US URLs based on the detected country
        const url =
            countryCode === 'GB'
                ? 'https://hellonetwork2023.github.io/us/ukurls.json'
                : 'https://hellonetwork2023.github.io/us/usurls.json';

        console.log(`Detected country: ${countryCode}. Loading: ${url}`);
        loadPosts(url);
    } catch (error) {
        console.error('Error fetching country data:', error);
        loadPosts('https://hellonetwork2023.github.io/us/usurls.json'); // Fallback to US URLs
    }
}

// Fetch and load posts into the HTML
async function loadPosts(jsonFile) {
    try {
        const response = await fetch(jsonFile);
        const data = await response.json();
        const postsContainer = document.querySelector('.flex-container');

        if (!postsContainer) {
            console.error('Posts container not found.');
            return;
        }

        const usedIndices = [];
        const posts = data.urls || [];

        // Load and display posts dynamically
        posts.forEach((post, index) => {
            let randomIndex;

            // Generate a unique random index
            do {
                randomIndex = Math.floor(Math.random() * posts.length);
            } while (usedIndices.includes(randomIndex));

            usedIndices.push(randomIndex);
            const postData = posts[randomIndex];

            // Create a new post article
            const article = document.createElement('article');
            article.className = `flex-item homepage-style-item green`;

            // Add post title
            const title = document.createElement('h3');
            const link = document.createElement('a');
            link.href = postData.url;
            link.target = '_blank';
            link.textContent = postData.name;
            link.className = 'ng-binding';

            // Post filter logic (e.g., check for specific types or properties)
            if (postData.type === 'ad' && !postData.has_content) return; // Skip unwanted posts
            if (postData.link.includes('gleam')) article.classList.add('desktop-giveaway-editorial');

            // Append title link
            title.appendChild(link);
            article.appendChild(title);

            // Append article to the container
            postsContainer.appendChild(article);
        });
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

// Trigger infinite scroll to load additional posts dynamically
let page = 1;
function nextPage() {
    page++;
    console.log(`Loading page: ${page}`);
    // Simulate loading posts from a paginated API (extend functionality here as needed)
    loadPosts('https://hellonetwork2023.github.io/us/usurls.json');
}

// Initialize the script on DOM load
document.addEventListener('DOMContentLoaded', fetchCountryAndRedirect);


// Execute when the page is loaded
document.addEventListener('DOMContentLoaded', fetchCountryAndRedirect);
