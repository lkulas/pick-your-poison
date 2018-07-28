const NAME_SEARCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';
const CATEGORY_LIST_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php';
const INGREDIENT_SEARCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';
const WILDCARD_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const ID_SEARCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php';
const CATEGORY_FILTER_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';

//AJAX function to search API by name
function searchApiByName(searchTerm, callback) {
	const query = {
		s: `${searchTerm}`,
	};
	$.getJSON(NAME_SEARCH_URL, query, callback);
}

//AJAX function to search API by ingredient
function searchApiByIngredient(searchTerm, callback) {
	console.log('searchApiByIngredient ran');
	const query = {
		i: `${searchTerm}`,
	};
	$.getJSON(INGREDIENT_SEARCH_URL, query, callback).fail(function () {
		searchError();
	});
}

//AJAX function to get random recipe from API
function searchApiByWildcard(callback) {
	$.getJSON(WILDCARD_URL, callback);
}

//AJAX function to search API by cocktail ID
function searchApiById(searchTerm, callback) {
	const query = {
		i: `${searchTerm}`,
	};
	$.getJSON(ID_SEARCH_URL, query, callback);
}

//AJAX function to list API categories
function searchApiByCategory(callback) {
	const query = {
		c: 'list',
	};
	$.getJSON(CATEGORY_LIST_URL, query, callback);
}

//AJAX function to find drinks by category
function filterApiByCategory(searchTerm, callback) {
	const query = {
		c: `${searchTerm}`,
	};
	$.getJSON(CATEGORY_FILTER_URL, query, callback);
}

//watch for click on 'search by ingredient' button
function watchClickIngredient() {
	$('#ingredient-button').on('click', event => {
		$('#ingredients-container').prop('hidden', false);
		$('#search-selection').prop('hidden', true);
		$('#start-over').prop('hidden', false);
	});
}

//watch for ingredient search submit
function watchIngredientSearch() {
	$('#ingredient-search-form').submit(event => {
		console.log('ingredient searched');
		event.preventDefault();
		const query = $('#ingredient-search').val();
		$('#ingredient-search').val("");
		searchApiByIngredient(query, displayNameSearchResults)
    $('#ingredients-container').prop('hidden', true);
	});
}

//watch for click on 'wildcard' button
function watchClickWildcard() {
  $('#wildcard-button').on('click', event => {
    $('#search-selection').prop('hidden', true);
		$('#start-over').prop('hidden', false);
    searchApiByWildcard(displayRecipe);
    $('#back-button').prop('hidden', true);
    $('#wildcard-repeat-button').prop('hidden', false);
  });
}

//watch for click on 'get another recipe' button
function watchClickRepeatWildcard() {
  $('#wildcard-repeat-button').on('click', event => {
    $('#ingredient-list').html("");
		$('#instructions').html("");
    searchApiByWildcard(displayRecipe);
  });
}

//watch for click on 'search by name' button
function watchClickName() {
	$('#name-button').on('click', event => {
		$('#names').prop('hidden', false);
		$('#search-selection').prop('hidden', true);
		$('#start-over').prop('hidden', false);
	});
}

//watch for click on 'categories' button
function watchClickCategories() {
	$('#category-button').on('click', event => {
		$('#categories-container').prop('hidden', false);
		$('#search-selection').prop('hidden', true);
		$('#start-over').prop('hidden', false);
		searchApiByCategory(displayCategoryResults)
	});
}

//generate categories
function displayCategoryResults(data) {
	data.drinks.map((item, index) => generateCategoryResults(item));
}

//generate HTML for name search results
function generateCategoryResults(result) {
	$('#categories').append(`<div class="col-6"><button type="button" class="category-list-button" id="${result.strCategory}">${result.strCategory}</button></div>`);
}

//watch for user click on category result button
function watchClickCategoryResult() {
	$('#categories').on('click', 'button', event => {
		const query = event.target.id;
		filterApiByCategory(query, displayNameSearchResults);
		$('#category-back-button').prop('hidden', false);
	});
}

//watch for user click on start over button
function watchStartOver() {
	$('#start-over-button').on('click', event => {
		window.location.reload(true);
	});
}

//watch for user click on go back button
function watchGoBack() {
	$('#back-button').on('click', event => {
		$('#name-search-results-container').prop('hidden', false);
		$('#names').prop('hidden', true);
		$('#recipe-container').prop('hidden', true);
		$('#ingredient-list').html("");
		$('#back-button').prop('hidden', true);
		$('#instructions').html("");
	});
	$('#category-back-button').on('click', event => {
		$('#categories-container').prop('hidden', false);
		$('#category-back-button').prop('hidden', true);
		$('#name-search-results-container').prop('hidden', true);
    $('#instructions').html("");
    $('#ingredient-list').html("");
	});
}

//watch for name search submit
function watchNameSearch() {
	$('#name-search-form').submit(event => {
		event.preventDefault();
		const query = $('#name-search').val();
		$('#name-search').val("");
		searchApiByName(query, displayNameSearchResults)
    $('#names').prop('hidden', true);
	});
}

function searchError() {
	$('#name-search-results-container').html('<div class="col-12"><p>Sorry, no results!</p></div>');
	$('#load-more-button').prop('hidden', true);
	$('#name-search-results-container').prop('hidden', false);
}

//show name search results
function displayNameSearchResults(data) {
	console.log(data.drinks);
	if (data.drinks === null) {
		searchError();
	} else {
	const results = data.drinks.map((item, index) => generateNameResults(item));
	$('#name-search-results').html(results);
	$('#name-search-results-container').prop('hidden', false);
	$('#categories-container').prop('hidden', true);
	showNextSix(listCount);
	console.log(data.drinks.length);
	if (data.drinks.length > 7) {
		$('#load-more-button').prop('hidden', false);
	}
	else $('#load-more-button').prop('hidden', true);};
}

function showNextSix(index) {
	console.log('showNextSix ran');
	let elements = $("#name-search-results li");
	elements.hide();
	let end = index + 6;
	if (end > elements.length) {
		end = elements.length;
		elements.slice(0, end).show()
		$('#load-more-button').prop('hidden', true);
	}
	else if (end < elements.length) {
		elements.slice(0, end).show();
		index += 6;
	}
	else {
		index = 0;
		elements.slice(0, 6).show();
	};
}

let listCount = 0;

function watchLoadMore() {
	console.log('watchLoadMore ran');
	$('main').on('click', '#load-more-button', event => {
		console.log(listCount);
		listCount += 6;
		showNextSix(listCount);
	});
}

//generate HTML for name search results
function generateNameResults(result) {
	return `
			<li class="name-photo">
				<div class="col-6">
					<img src="${result.strDrinkThumb}" id="${result.idDrink}" class="thumbnail" alt="Photo of ${result.strDrinkThumb}">
					<h3>${result.strDrink}</h3>
				</div>
			</li>`;
}

//listen for click on recipe name
function watchCocktailNameClick() {
	$('main').on('click', '.name-photo', event => {
		const recipeTarget = event.target.id;
		searchApiById(recipeTarget, displayRecipe);
		$('#names').prop('hidden', true);
		$('#category-back-button').prop('hidden', true);
    $('#back-button').prop('hidden', false);
	})
}

//display recipe on page
function displayRecipe(data) {
	const results = data.drinks.map((item, index) => generateRecipe(item));
	data.drinks.map((item, index) => generateIngredientList(item));
	data.drinks.map((item, index) => generateInstructions(item));
	$('#recipe').html(results);
	$('#recipe-container').prop('hidden', false);
	$('#name-search-results-container').prop('hidden', true);
}

//generate recipe HTML
function generateRecipe(recipe) {
	return `
	<h2>${recipe.strDrink}</h2>
	<img src="${recipe.strDrinkThumb}" class="feature-image" alt="Photo of ${recipe.strDrink}">`;
}

//display recipe instructions
function generateInstructions(recipe) {
	$('#instructions').append(`<p>${recipe.strInstructions}</p>`);
}

//generate and display recipe ingredient list
function generateIngredientList(recipe) {
	if (recipe.strIngredient1 != ("" || null)) {
		$('#ingredient-list').append(`<li>${recipe.strMeasure1} ${recipe.strIngredient1}</li>`);
	};
	if (recipe.strIngredient2 != ("" || null)) {
		$('#ingredient-list').append(`<li>${recipe.strMeasure2} ${recipe.strIngredient2}</li>`);
	};
	if (recipe.strIngredient3 != ("" || null)) {
		$('#ingredient-list').append(`<li>${recipe.strMeasure3} ${recipe.strIngredient3}</li>`);
	};
	if (recipe.strIngredient4 != ("" || null)) {
		$('#ingredient-list').append(`<li>${recipe.strMeasure4} ${recipe.strIngredient4}</li>`);
	};
	if (recipe.strIngredient5 != ("" || null)) {
		$('#ingredient-list').append(`<li>${recipe.strMeasure5} ${recipe.strIngredient5}</li>`);
	};
	if (recipe.strIngredient6 != ("" || null)) {
		$('#ingredient-list').append(`<li>${recipe.strMeasure6} ${recipe.strIngredient6}</li>`);
	};
	if (recipe.strIngredient7 != ("" || null)) {
		$('#ingredient-list').append(`<li>${recipe.strMeasure7} ${recipe.strIngredient7}</li>`);
	};
	if (recipe.strIngredient8 != ("" || null)) {
		$('#ingredient-list').append(`<li>${recipe.strMeasure8} ${recipe.strIngredient8}</li>`);
	};
	if (recipe.strIngredient9 != ("" || null)) {
		$('#ingredient-list').append(`<li>${recipe.strMeasure9} ${recipe.strIngredient9}</li>`);
	};
	if (recipe.strIngredient10 != ("" || null)) {
		$('#ingredient-list').append(`<li>${recipe.strMeasure10} ${recipe.strIngredient10}</li>`);
	};
	if (recipe.strIngredient11 != ("" || null)) {
		$('#ingredient-list').append(`<li>${recipe.strMeasure11} ${recipe.strIngredient11}</li>`);
	};
	if (recipe.strIngredient12 != ("" || null)) {
		$('#ingredient-list').append(`<li>${recipe.strMeasure12} ${recipe.strIngredient12}</li>`);
	};
	if (recipe.strIngredient13 != ("" || null)) {
		$('#ingredient-list').append(`<li>${recipe.strMeasure13} ${recipe.strIngredient13}</li>`);
	};
	if (recipe.strIngredient14 != ("" || null)) {
		$('#ingredient-list').append(`<li>${recipe.strMeasure14} ${recipe.strIngredient14}</li>`);
	};
	if (recipe.strIngredient15 != ("" || null)) {
		$('#ingredient-list').append(`<li>${recipe.strMeasure15} ${recipe.strIngredient15}</li>`);
	};
}

watchClickName();
watchNameSearch();
watchCocktailNameClick();
watchStartOver();
watchGoBack();
watchClickCategories();
watchClickCategoryResult();
watchClickWildcard();
watchClickRepeatWildcard();
watchClickIngredient();
watchIngredientSearch();
watchLoadMore();