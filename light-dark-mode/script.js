const menuBtn = document.getElementById("menu-btn");
const menuNav = document.getElementById("nav");
const switchThemeElement = document.getElementById("switch-theme-checkbox");
const themeIcon = document.getElementById("theme-icon");

function showMenu() {
    if (menuNav.style.display === "none"){
        menuNav.style.display = "flex";
    } else {
        menuNav.style.display = "none";
    }
}

const imageList = Array.from(document.getElementsByClassName("image"));

const srcImageList = [
    "images/undraw_in_love_62yu",
    "images/undraw_traveling_yhxq",
    "images/undraw_firmware_re_fgdy"
];

function configTheme(theme) {
    let suffixSrcImage = '.svg';
    if (theme === 'dark') {
        suffixSrcImage = '_dark.svg';
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    imageList.forEach((image, index) => {
        image.src = srcImageList[index] + suffixSrcImage;
    })
}

function switchTheme(event) {
    if (event.target.checked) {
        configTheme('dark');
    } else {
        configTheme('light');
    }
}

menuBtn.addEventListener('click', showMenu);
switchThemeElement.addEventListener('change', switchTheme);

function checkCurrentTheme() {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === "dark"){
        switchThemeElement.checked = true;
        configTheme('dark');
    }
}

// On Load
checkCurrentTheme();