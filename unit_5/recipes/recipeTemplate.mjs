const tagsTemplate = (tags) => (`
    <ul class="tags">
        <!--
            join because the tags array is being stringified
            otherwise, the rendered output would be separated by commas
        -->
        ${tags.map((tag) => (`
            <li class="tag" data-tag="${tag}">${tag}</li>
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
    description,
    image,
    name,
    rating,
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
            </figcaption>
        </figure>
    `);
};

export default recipeTemplate;
