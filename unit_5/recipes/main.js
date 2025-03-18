import recipes from "./recipes.mjs";
import recipeTemplate from "./recipeTemplate.mjs";

const form = document.recipes;
const recipeContainer = document.getElementById('js-recipe-container');
// store for event handlers
const handlerMap = new Map();
const getRandNum = (max) => Math.floor(Math.random() * max);
const getRandListItem = (list) => list[getRandNum(list.length)];
const filterRecipes = (query) =>
    recipes.filter((recipe) => (
        recipe.name.toLowerCase().includes(query)
        || recipe.description.toLowerCase().includes(query)
        || recipe.tags.find((tag) => tag.toLowerCase().includes(query))
        || recipe.recipeIngredient.find((ingredient) => ingredient.toLowerCase().includes(query))
    ));
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
const clearEventListeners = () => {
    handlerMap.forEach((handler, element) => {
        if (element && element.removeEventListener) {
            element.removeEventListener('click', handler);
        }
    });

    handlerMap.clear();
};
const updateDom = (items) => {
    clearEventListeners();

    recipeContainer.innerHTML = null;

    items.map((recipe) => {
        recipeContainer.innerHTML += recipeTemplate(recipe)
    });

    addTagClickHandlers();
};
let tags;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const filteredRecipes = filterRecipes(e.currentTarget.recipe.value.toLowerCase());

    updateDom(filteredRecipes);
});

function init() {
    recipeContainer.innerHTML = recipeTemplate(getRandListItem(recipes));

    addTagClickHandlers();
}

init();
