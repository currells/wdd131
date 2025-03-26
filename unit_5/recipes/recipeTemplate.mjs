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
    const tagsRegion = tagsTemplate(tags);
    const ratingRegion = ratingTemplate(rating);

    return (`
        <figure id="recipe">
            <div class="recipe-image">
                <img alt="${name}" id="js-image" src="${image}" />
            </div>

            <figcaption class="recipe-description">
                ${tagsRegion}

                <h2>
                    ${!!url ? `<a href="${url}" target="_blank">${name}</a>` : name}
                </h2>

                ${ratingRegion}

                <p>${description}</p>

                <div class="recipe-meta">
                    <div>
                        <p class="recipe-meta-label">Prep Time</p>
                        <p class="recipe-meta-detail">${prepTime}</p>
                    </div>
                    <div>
                        <p class="recipe-meta-label">Cook Time</p>
                        <p class="recipe-meta-detail">${cookTime}</p>
                    </div>
                    <div>
                        <p class="recipe-meta-label">Servings</p>
                        <p class="recipe-meta-detail">${recipeYield}</p>
                    </div>
                </div>

                <button class="js-ingredients-link button-as-link">
                    Ingredients &amp; Prep
                </button>

                <div class="js-ingredients-list hide">
                    <h3>Ingredients</h3>

                    <ul>
                        ${recipeIngredient.map((ingredient) =>
                            (`<li>${ingredient}</li>`)).join('')}
                    </ul>

                    <h3>Preparation</h3>

                    ${recipeInstructions.map((ingredient) =>
                        (`<p>${ingredient}</p>`)).join('')}
                </div>
            </figcaption>
        </figure>
    `);
};

export default recipeTemplate;
