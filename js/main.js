window.addEventListener('error', (e) => console.log('JS error:', e.message));

// ===== THEME (dark/light) =====
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const iconSun = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');

if (themeToggle && iconSun && iconMoon) {
    function setTheme(theme) {
        const isDark = theme === 'dark';
        root.classList.toggle('dark', isDark);
        localStorage.setItem('theme', theme);

        // Update icons
        iconSun.classList.toggle('hidden', !isDark);
        iconMoon.classList.toggle('hidden', isDark);
    }

    // laad opgeslagen thema of systeem voorkeur
    const saved = localStorage.getItem('theme');
    if (saved) {
        setTheme(saved);
    } else {
        setTheme('dark');
    }

    themeToggle.addEventListener('click', () => {
        const nowDark = root.classList.contains('dark');
        setTheme(nowDark ? 'light' : 'dark');
    });
}

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const iconMenu = document.getElementById('iconMenu');
const iconClose = document.getElementById('iconClose');

if (menuToggle && mobileNav && iconMenu && iconClose) {

    menuToggle.addEventListener('click', () => {
        const isOpen = !mobileNav.classList.contains('hidden');
        mobileNav.classList.toggle('hidden', isOpen);

        iconMenu.classList.toggle('hidden', !isOpen);
        iconClose.classList.toggle('hidden', isOpen);       
    });

    // smooth scroll bij klikken + menu sluiten
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });

            // sluit mobiel menu na klikken
            if (!mobileNav.classList.contains('hidden')) {
                mobileNav.classList.add('hidden');
                iconMenu.classList.remove('hidden');
                iconClose.classList.add('hidden');
            }
        });
    });
}

// ===== TABS =====
function openTab(event, tabName) {
    // actieve knop wisselen
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active-tab'));

    event.currentTarget.classList.add('active-tab');

    // alle content verbergen
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.add('hidden'));

    // juiste content tonen
    document.getElementById(tabName).classList.remove('hidden');
}