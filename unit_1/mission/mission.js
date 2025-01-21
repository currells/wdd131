const theme_toggle = document.getElementById('theme');
const body = document.body;

// function declaration
function changeTheme(el) {
    let value = el.value;

    if (value === 'dark') {
        body.classList.add('dark');
    } else {
        body.classList.remove('dark');
    }
};

// arrow function
// const changeTheme = ({ value }) => {
//     value === 'dark'
//         ? body.classList.add(value)
//         : body.classList.remove('dark');
// };

// listening for a JS event
// theme_toggle.addEventListener('change', function(el) {
//     changeTheme(el.currentTarget);
// });
