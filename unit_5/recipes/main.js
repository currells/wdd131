import recipes from "./recipes.mjs";
import recipeTemplate from "./recipeTemplate.mjs";

const errorRegion = document.getElementById('js-validation-error');
const form = document.recipes;
const recipeContainer = document.getElementById('js-recipe-container');
// store for event handlers
const handlerMap = new Map();
const getRandNum = (max) => Math.floor(Math.random() * max);
const getRandListItem = (list) => list[getRandNum(list.length)];

/**
 * get a curated list of recipes by keyword search
 * @param {String} query
 * @returns Object: specific recipe from the recipes array
 */
const filterRecipes = (query) =>
    recipes.filter((recipe) => (
        recipe.name.toLowerCase().includes(query)
        || recipe.description.toLowerCase().includes(query)
        || recipe.tags.find((tag) => tag.toLowerCase().includes(query))
        || recipe.recipeIngredient.find((ingredient) => ingredient.toLowerCase().includes(query))
    ));

/**
 * add DOM interaction (click handlers)
 * perform a recipe search on tag click
 * search criteria are defined by the tag's data attribute
 */
const addTagClickHandlers = () => {
    tags = document.getElementsByClassName('js-tag');

    let tagsArr = [...tags];

    tagsArr.forEach((tag) => {
        const handleClick = (e) => {
            const filteredRecipes = filterRecipes(e.currentTarget.dataset.tag.toLowerCase());

            updateDom(filteredRecipes);
        };

        tag.addEventListener('click', handleClick);

        // store reference to handler
        handlerMap.set(tag, handleClick);
    });
};

/**
 * add DOM interaction (click handlers)
 * show/hide ingredients and prep information on click
 */
const addIngredientClickHandler = () => {
    ingredientsLinks = document.getElementsByClassName('js-ingredients-link');
    ingredientsLists = document.getElementsByClassName('js-ingredients-list');

    let ingredientsLinksArr = [...ingredientsLinks];
    let ingredientsListsArr = [...ingredientsLists];

    ingredientsLinksArr.forEach((ingredientsLink, index) => {
        const handleClick = () => {
            ingredientsListsArr[index].classList.toggle('hide');
        };

        ingredientsLink.addEventListener('click', handleClick);

        handlerMap.set(ingredientsLinks, handleClick);
    });
};

/**
 * garbage collection
 * remove listeners from old/dead recipe templates that are no longer in the
 * DOM to prevent memory leaks
 */
const clearEventListeners = () => {
    handlerMap.forEach((handler, element) => {
        if (element && element.removeEventListener) {
            element.removeEventListener('click', handler);
        }
    });

    handlerMap.clear();
};

/**
 * add recipe(s) to the DOM
 * @param {Array} items - recipes object array
 */
const updateDom = (items) => {
    clearEventListeners();

    // clean up the DOM
    recipeContainer.innerHTML = null;

    // add new recipes
    items.map((recipe) => {
        recipeContainer.innerHTML += recipeTemplate(recipe)
    });

    addTagClickHandlers();
    addIngredientClickHandler();
};

const validateForm = (form) => !!form.recipe.value.trim();

let tags;
let ingredientsLinks;
let ingredientsLists;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm(e.target)) {
        const filteredRecipes = filterRecipes(e.currentTarget.recipe.value.toLowerCase());
    
        updateDom(filteredRecipes);
        
        errorRegion.classList.add('hide');
    } else {
        errorRegion.classList.remove('hide');
    }
});

function init() {
    recipeContainer.innerHTML = recipeTemplate(getRandListItem(recipes));

    addTagClickHandlers();
    addIngredientClickHandler();
}

init();
