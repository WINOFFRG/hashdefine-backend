
function turnOnDarkMode(themeToggle) {
    document.body.classList.remove('theme--light');
    document.body.classList.add('theme--dark');

    // Set Aria Lable
    themeToggle.setAttribute('aria-label', 'Turn on Light Mode');
}

function turnOnLightMode(themeToggle) {
    document.body.classList.remove('theme--dark');
    document.body.classList.add('theme--light');

    // Set Aria Lable
    themeToggle.setAttribute('aria-label', 'Turn on Dark Mode');
}

function toggleTheme() {
    const currThemeIsDark = document.body.classList.contains('theme--dark');
    const themeToggle = document.querySelector('#theme-toggle');
    currThemeIsDark ? turnOnLightMode(themeToggle) : turnOnDarkMode(themeToggle);

}

function configureTheme() {
    const darkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const themeToggle = document.querySelector('#theme-toggle');
    darkTheme ? turnOnDarkMode(themeToggle) : turnOnLightMode(themeToggle);

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
}

configureTheme();