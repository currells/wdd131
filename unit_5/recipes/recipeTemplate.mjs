const tagsTemplate = (tags) => (`
    <ul class="tags">
        <!--
            join because the tags array is being stringified
            otherwise, the rendered output would be separated by commas
        -->
        ${tags.map((tag) => (`
            <li class="js-tag" data-tag="${tag}">${tag}</li>
        `)).join('')}
    </ul>
`);

const starsTemplate = (rating) => {
    let stars = '';
    const rat = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
        rat > i
            ? stars += `<span aria-hidden="true" class="icon-star">⭐</span>`
            : stars += `<span aria-hidden="true" class="icon-star-empty">☆</span>`
    }

    return stars;
};

const ratingTemplate = (rating) => (`
    <p>
        <span
            class="rating"
            role="img"
            aria-label="Rating: ${rating} out of 5 stars"
        >
            ${starsTemplate(rating)}
        </span>
    </p>
`);

const metaTemplate = (items) => (`
    <div class="recipe-meta">
        ${items.map(({ label, value }) => (`
            <div>
                <p class="recipe-meta-label">${label}</p>
                <p class="recipe-meta-detail">${value || 'N/A'}</p>
            </div>    
        `)).join('')}
    </div>
`);

const ingredientsTemplate = (ingredients) => (`
    <h3>Ingredients</h3>

    <ul>
        ${ingredients.map((ingredient) =>
            (`<li>${ingredient}</li>`)).join('')}
    </ul>
`);

const prepTemplate = (steps) => (`
    <h3>Preparation</h3>

    <ol>
        ${steps.map((step) =>
            (`<li>${step}</li>`)).join('')}
    </ol>
`);

const recipeTemplate = ({
    cookTime,
    description,
    image,
    name,
    prepTime,
    rating,
    recipeIngredient,
    recipeInstructions,
    recipeYield,
    tags,
    url,
}) => {
    const metaData = [
        {
            label: 'Prep Time',
            value: prepTime,
        },
        {
            label: 'Cook Time',
            value: cookTime,
        },
        {
            label: 'Servings',
            value: recipeYield,
        },
    ];
    const ingredientsRegion = ingredientsTemplate(recipeIngredient);
    const metaRegion = metaTemplate(metaData);
    const prepRegion = prepTemplate(recipeInstructions);
    const ratingRegion = ratingTemplate(rating);
    const tagsRegion = tagsTemplate(tags);

    return (`
        <figure class="recipe">
            <div class="recipe-image">
                <img alt="${name}" src="${image}" />
            </div>

            <figcaption class="recipe-description">
                ${tagsRegion}

                <h2>
                    ${!!url ? `<a href="${url}" target="_blank">${name}</a>` : name}
                </h2>

                ${ratingRegion}

                <p>${description}</p>

                ${metaRegion}

                <button class="js-ingredients-link button-as-link">
                    Ingredients &amp; Prep
                </button>

                <div class="js-ingredients-list hide">
                    ${ingredientsRegion}
                    ${prepRegion}
                </div>
            </figcaption>
        </figure>
    `);
};

export default recipeTemplate;
