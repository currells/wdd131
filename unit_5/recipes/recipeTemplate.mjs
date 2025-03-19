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
                        <p><strong>Prep Time</strong></p>
                        <p>${prepTime}</p>
                    </div>
                    <div>
                        <p><strong>Cook Time</strong></p>
                        <p>${cookTime}</p>
                    </div>
                    <div>
                        <p><strong>Servings</strong></p>
                        <p>${recipeYield}</p>
                    </div>
                </div>

                <p>
                    <a class="js-ingredients-link" href="javascript:void(0);">Ingredients &amp; Prep</a>
                </p>

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
