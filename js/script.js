document .addEventListener('DOMContentLoaded', function(){
    fetchTrendingGIFs();
    fetchRandomGIFs();
    loadCategoryFilters();
    implementSearch();
    implementShareOptions();
    implementFavorites();
});


async function fetchTrendingGIFs(){
    try{
       const apiKey = 'KZL42s1yyYkYL5GdffziJjCQNN3yDyY4'; 
       const responseTrend = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10`);
       const data = await responseTrend.json();

       displayGIFs(data.data, 'trending-gifs');
    } catch(error){
        console.error('Error fetching trending GIFs:', error);
    }
}

async function fetchRandomGIFs(){
    try{
        const apiKey = 'KZL42s1yyYkYL5GdffziJjCQNN3yDyY4';
        const responseRandom = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&limit=10`);
        const data = await responseRandom.json();

        // console.log('Random GIFs:', data);
        displayGIFs([data.data], 'random-gifs');
    }catch(error){
        console.error('Error fetching random GIFs:', error);
    }
}

async function filterCategory(category){
    try{
        const apiKey = 'KZL42s1yyYkYL5GdffziJjCQNN3yDyY4';
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${category}&limit=10`);
        const data = await response.json();
        displayGIFs(data.data, 'category-gifs');
    }catch(error){
        console.error(`Error fetching ${category} GIFs:`, error);
    }
}

function loadCategoryFilters(){
    // defining predefined categories
    const categories = ['Emotions', 'Reactions', 'Animals', 'Memes'];

    // DOM manipulation to access element to display categories
    const categoryFilterSection = document.getElementById('category-filtering');
    const categoryFilterContainer = document.createElement('div');
    categoryFilterContainer.classList.add('list-group');

    // iterating over categories and creating filter buttons
    categories.forEach(category =>{
        const filterButton = document.createElement('button');
        filterButton.classList.add('list-group-item', 'list-group-item-action');
        filterButton.textContent = category;
        // event listener to filter GIFs based on category
        filterButton.addEventListener('click', () => filterCategory(category));
        categoryFilterContainer.appendChild(filterButton);
    });

    categoryFilterSection.appendChild(categoryFilterContainer);
}

async function implementSearch(){
    // search button element
    const searchButton = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');

    // adding event listener
    searchButton.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        if(query !== ''){
            try{
                const apiKey = 'KZL42s1yyYkYL5GdffziJjCQNN3yDyY4';
                const responseSearch = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=10`);
                const data = await responseSearch.json();

                // clear the previous search results
                const searchResultsContainer = document.getElementById('search-results');
                searchResultsContainer.innerHTML = '';
                // console.log('Search results:', data);
                displayGIFs(data.data, 'search-results');
            }catch(error){
                console.error('Error fetching search results:', error);
            }
        }
    });
}

function implementShareOptions() {
    // Get the share options element
    const shareOptionsElement = document.getElementById('share-options');

    // Create share buttons for social media platforms
    const facebookButton = createShareButton('Facebook', 'fab fa-facebook-square');
    const twitterButton = createShareButton('Twitter', 'fab fa-twitter-square');
    const pinterestButton = createShareButton('Pinterest', 'fab fa-pinterest-square');

    // Append share buttons to the share options element
    shareOptionsElement.appendChild(facebookButton);
    shareOptionsElement.appendChild(twitterButton);
    shareOptionsElement.appendChild(pinterestButton);

    // Create a function to create share buttons
    function createShareButton(platform, iconClass) {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-light', 'mr-2');
        const icon = document.createElement('i');
        icon.classList.add(iconClass);
        button.appendChild(icon);
        button.appendChild(document.createTextNode(` Share on ${platform}`));
        // Add event listener to share button
        button.addEventListener('click', () => shareOnPlatform(platform));
        return button;
    }

    // Function to handle sharing on social media platforms
    function shareOnPlatform(platform) {
        // Implement sharing functionality for the specified platform
        console.log(`Sharing on ${platform}`);
    }
}

function displayGIFs(gifs, containerId){
    const gifContainer = document.getElementById(containerId);
    gifContainer.innerHTML = '';
    gifs.forEach(gifData => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.src = gifData.images.original.url;
        div.appendChild(img);
        gifContainer.appendChild(img);
    });
}

function implementFavorites() {
    const favoritesButton = document.getElementById('favorites-btn');
    const favoritesSection = document.getElementById('favorites-gifs');

    // Event listener for the favorites button
    favoritesButton.addEventListener('click', function() {
        // Toggle display of favorites section
        if (favoritesSection.style.display === 'none') {
            favoritesSection.style.display = 'block';
            displayFavoriteGIFs(); // Display favorite GIFs when the favorites section is shown
        } else {
            favoritesSection.style.display = 'none';
        }
    });

    // Function to handle adding GIFs to favorites
    function addToFavorites(gifData) {
        // Add your logic here to store the GIF data in the user's favorites
        console.log('Added to favorites:', gifData);
        // Retrieve current favorites from local storage or initialize an empty array if no favorites exist
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.push(gifData);
        // Store the updated favorites array back into local storage
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // Function to display favorite GIFs
    function displayFavoriteGIFs() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const favoritesSection = document.getElementById('favorites-gifs');
        favoritesSection.innerHTML = ''; // Clear previous favorites

        favorites.forEach(gif => {
            const gifImage = document.createElement('img');
            gifImage.src = gif.images.original.url;
            gifImage.alt = gif.title;
            gifImage.classList.add('gif-image');
            favoritesSection.appendChild(gifImage);
        });
    }

    // Example event listener to add GIFs to favorites (you can replace this with your actual implementation)
    document.getElementById('category-gifs').addEventListener('click', function(event) {
        if (event.target.classList.contains('gif-image')) {
            const gifUrl = event.target.src; // Get the URL of the clicked GIF
            const gifAlt = event.target.alt; // Get the alt text (title) of the clicked GIF
            const gifData = { url: gifUrl, title: gifAlt }; // Construct the GIF data object

            addToFavorites(gifData);
        }
    });
}