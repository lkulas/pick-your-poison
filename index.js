const NAME_SEARCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';
const CATEGORY_LIST_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const INGREDIENT_SEARCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';
const WILDCARD_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const ID_SEARCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php';

//AJAX function to search API by name
function searchApiByName(searchTerm, callback) {
	console.log('searchApiByName ran');
	const query = {
		s: `${searchTerm}`,
	}
	$.getJSON(NAME_SEARCH_URL, query, callback);
}

//AJAX function to list API categories

//AJAX function to search API by ingredient

//AJAX function to get random recipe from API

//watch for click on 'search by name' button
function watchClickName() {
	$('.name-button').on('click', event => {
		console.log('watchClickName ran');
		$('.names').prop('hidden', false);
	});
}

//watch for name search submit
function watchNameSearch() {
	$('#name-search-form').submit(event => {
		console.log('watchNameSearch ran');
		event.preventDefault();
		const query = $('#name-search').val();
		console.log(query);
		$('#name-search').val("");
		searchApiByName(query, displayNameSearchResults)
	});
}

//show name search results
function displayNameSearchResults(data) {
	console.log('displayNameSearchResults ran');
	console.log(data);
	const results = data.drinks.map((item, index) => generateNameResults(item));
	$('.name-search-results').html(results);
	$('.name-search-results').prop('hidden', false);
}

//generate HTML for name search results
function generateNameResults(result) {
	console.log('generateNameResults ran');
	return `
		<div class="col-6">
			<div class="name-photo">
				<h2 id="${result.idDrink}">${result.strDrink}</h2>
				<img src="${result.strDrinkThumb}" id="${result.idDrink}" class="thumbnail">
			</div>
		</div>`;
}

//listen for click on recipe name
function watchCocktailNameClick() {
	console.log('watchCocktailNameClick ran');
	$('.name-search-results').on('click', '.name-photo', event => {
		const recipeTarget = event.target.id;
		console.log(recipeTarget);
		searchApiById(recipeTarget, displayRecipe);
	});
}

//display recipe on page
function displayRecipe(data) {
	console.log('displayRecipe ran');
	console.log(data);
	const results = data.drinks.map((item, index) => generateRecipe(item));
		$('.recipe').html(results);
		$('.recipe').prop('hidden', false);
		$('.name-search-results').prop('hidden', true);
}

//generate recipe HTML
function generateRecipe(recipe) {
	console.log('generateRecipe ran');
	return `<h2>${recipe.strDrink}</h2>`
}

//search API by cocktail ID
function searchApiById(searchTerm, callback) {
		const query = {
		i: `${searchTerm}`,
	}
	$.getJSON(ID_SEARCH_URL, query, callback);
}

watchClickName();
watchNameSearch();
watchCocktailNameClick();
