const NAME_SEARCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

const CATEGORY_LIST_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const INGREDIENT_SEARCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';

const WILDCARD_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

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
	$('.js-name-button').on('click', event => {
		console.log('watchClickName ran');
		$('.js-names').prop('hidden', false);
	})
}

//watch for name search submit
function watchNameSearch() {
	$('.js-name-search-form').submit(event => {
		console.log('watchNameSearch ran');
		event.preventDefault();
		const queryTarget = $(this).find('.js-name-query');
		const query = queryTarget.val();
		queryTarget.val("");
		searchApiByName(query, displayNameSearchResults);
	});
}

//show name search results
function displayNameSearchResults(data) {
	console.log('displayNameSearchResults ran');
	const results = data.drinks.map((item, index) => generateNameResults(item));
	$('.js-name-search-results').html(results);
	$('.js-name-search-results').prop('hidden', false);
}

//generate HTML for name search results
function generateNameResults(result) {
	return `<h2>${result.strDrink}</h2>`;
}

watchClickName();
watchNameSearch();