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

//watch for click on 'search by name' button
function watchClickName() {
	$('.js-name-button').on('click', event => {
		console.log('watchClickName ran');
		$('.js-names').prop('hidden', false);
		$('.js-search-selection').prop('hidden', true);
	})
}

function watchGoBack() {
	$('.return-button').on('click', event => {
		console.log('watchGoBack ran');
		$('.js-names').prop('hidden', true);
		$('.js-search-selection').prop('hidden', false);
	})
}

watchClickName();
watchGoBack();