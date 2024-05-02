document .addEventListener('DOMContentLoaded', function(){
    fetchTrendingGIFs();
    fetchRandomGIFs();
    loadCategoryFilters();
    implementSearch();
    implementShareOptions();
});


async function fetchTrendingGIFs(){
    try{
       const apiKey = 'KZL42s1yyYkYL5GdffziJjCQNN3yDyY4'; 
       const responseTrend = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10`);
       const data = await responseTrend.json();

       console.log('Trending GIFs:', data);
    } catch(error){
        console.error('Error fetching trending GIFs:', error);
    }
}

async function fetchRandomGIFs(){
    try{
        const apiKey = 'KZL42s1yyYkYL5GdffziJjCQNN3yDyY4';
        const responseRandom = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&limit=10`);
        const data = await responseRandom.json();

        console.log('Random GIFs:', data);
    }catch(error){
        console.error('Error fetching random GIFs:', error);
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
        filterButton.classList.add('list-group-item', 'list-group-iem-action');
        filterButton.textContent = category;
        // event listener to filter GIFs based on category
        filterButton.addEventListener('click', () => filterCategory(category));
        categoryFilterContainer.appendChild(filterButton);
    });

    categoryFilterSection.appendChild(categoryFilterContainer);
}