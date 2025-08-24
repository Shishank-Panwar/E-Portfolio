/* global-animations.js */

document.addEventListener('DOMContentLoaded', () => {

    // --- Staggered Navigation Load Animation ---
    const navLogo = document.querySelector('.nav-logo');
    const navItems = document.querySelectorAll('.glass-nav li');

    if (navLogo) {
        // Animate the logo first
        setTimeout(() => {
            navLogo.classList.add('visible');
        }, 200); // 200ms delay
    }

    if (navItems.length > 0) {
        // Animate each navigation link one by one
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, 300 + (index * 150)); // Start after logo, 150ms stagger
        });
    }

    // --- You can add other global scripts here ---
    // For example, the full-screen tap glow effect
    document.addEventListener('click', () => {
        const body = document.body;
        if (body.classList.contains('screen-lit')) return;
        body.classList.add('screen-lit');
        setTimeout(() => {
            body.classList.remove('screen-lit');
        }, 600);
    });
});
