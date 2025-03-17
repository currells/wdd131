import recipes from "./recipes.mjs";
import recipeTemplate from "./recipeTemplate.mjs";

const form = document.recipes;
const recipeContainer = document.getElementById('js-recipe-container');
const getRandNum = (max) => Math.floor(Math.random() * max);
const getRandListItem = (list) => list[getRandNum(list.length)];
const filterRecipes = (query) =>
    recipes.filter((recipe) => (
        recipe.name.toLowerCase().includes(query)
        || recipe.description.toLowerCase().includes(query)
        || recipe.tags.find((tag) => tag.toLowerCase().includes(query))
        || recipe.recipeIngredient.find((ingredient) => ingredient.toLowerCase().includes(query))
    ));

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const filteredRecipes = filterRecipes(form.recipe.value.toLowerCase());

    recipeContainer.innerHTML = null;

    filteredRecipes.map((recipe) => {
        recipeContainer.innerHTML += recipeTemplate(recipe)
    });
});

function init() {
    recipeContainer.innerHTML = recipeTemplate(getRandListItem(recipes));
}

init();
