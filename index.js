const NAME_SEARCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?';

const CATEGORY_LIST_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const INGREDIENT_SEARCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?';

const WILDCARD_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

//AJAX function to search API by name

function searchApiByName(searchTerm, callback) {
	console.log('searchApiByName ran');
	const query = {
		s: searchTerm,
	};
	$.getJSON(NAME_SEARCH_URL, query, callback);
}

//AJAX function to list API categories

//AJAX function to search API by ingredient

//AJAX function to get random recipe from API