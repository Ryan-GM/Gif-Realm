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