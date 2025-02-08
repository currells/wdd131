const menuButton = document.getElementById('js-menu');
const menu = document.querySelector('nav');
const gallery = document.getElementById('js-gallery');

function toggleMenu() {
    menu.classList.toggle('hide');
};

function handleResize() {
    const menuClasses = menu.classList;

    1000 <= window.innerWidth
        ? menuClasses.remove('hide')
        : menuClasses.add('hide');
}

function viewerTemplate(src, alt) {
    return `
        <div class="viewer">
            <button class="close-viewer">X</button>
            <img src="${src}" alt="${alt}">
        </div>
    `;
}

function closeViewer() {
    document.querySelector('.viewer').remove();
}

function viewHandler(event) {
    // create a variable to hold the element that was clicked on from event.target
    const clickedImg = event.target;

    // get the src attribute from that element and 'split' it on the "-"
    const imgSrc = clickedImg.getAttribute('src').split('-');

    // construct the new image file name by adding "-full.jpeg" to the first part of the array from the previous step
    const modalImgSrc = imgSrc[0] + '-full.jpeg';

    // insert the viewerTemplate into the top of the body element
    // (element.insertAdjacentHTML("afterbegin", htmltoinsert))
    document.body.insertAdjacentHTML('afterbegin', viewerTemplate(modalImgSrc, clickedImg.alt));

    // add a listener to the close button (X) that calls a function called closeViewer when clicked
    document.querySelector(".close-viewer").addEventListener("click", closeViewer);
}

window.onload = function () {
    handleResize();
};

menuButton.addEventListener('click', toggleMenu);
window.addEventListener('resize', handleResize);
gallery.addEventListener('click', viewHandler);

/**
 * copyright logic below this comment
 */
const copyright_date = document.getElementById('js-date');
const current_year = new Date().getFullYear();

copyright_date.innerText = current_year;
