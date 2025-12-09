/**
 * Theme Switcher JavaScript - Dark/Light mode toggle
 */

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
    loadSavedTheme();
});

// ========== INITIALIZE THEME SWITCHER ==========
function initThemeSwitcher() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', toggleTheme);
}

// ========== TOGGLE THEME ==========
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    setTheme(newTheme);
}

// ========== SET THEME ==========
function setTheme(theme) {
    const html = document.documentElement;
    const iconLight = document.getElementById('iconLight');
    const iconDark = document.getElementById('iconDark');

    // Update theme attribute
    html.setAttribute('data-theme', theme);

    // Update icons
    if (iconLight && iconDark) {
        if (theme === 'dark') {
            iconLight.style.display = 'none';
            iconDark.style.display = 'block';
        } else {
            iconLight.style.display = 'block';
            iconDark.style.display = 'none';
        }
    }

    // Save to localStorage
    try {
        localStorage.setItem('portfolio-theme', theme);
    } catch (e) {
        console.warn('Could not save theme preference:', e);
    }

    // Add transition class temporarily for smooth color changes
    html.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        html.style.transition = '';
    }, 300);
}

// ========== LOAD SAVED THEME ==========
function loadSavedTheme() {
    try {
        const savedTheme = localStorage.getItem('portfolio-theme');

        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        }
    } catch (e) {
        console.warn('Could not load theme preference:', e);
        setTheme('light');
    }
}

// ========== LISTEN TO SYSTEM THEME CHANGES ==========
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only auto-switch if user hasn't manually set a preference
    try {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (!savedTheme) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    } catch (err) {
        console.warn('Could not detect theme preference:', err);
    }
});
