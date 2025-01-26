const theme_toggle = document.getElementById('theme');
const body = document.body;
const img = document.querySelector('img');

// function declaration
function changeTheme(el) {
    let value = el.value;

    if (value === 'dark') {
        body.classList.add('dark');
        img.src = './byui-logo_white.png';
    } else {
        body.classList.remove('dark');
        img.src = './byui-logo_blue.webp';
    }
};

// listening for a JS event
// theme_toggle.addEventListener('change', function(el) {
//     changeTheme(el.currentTarget);
// });
