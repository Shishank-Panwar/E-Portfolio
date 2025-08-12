/* lab1.js */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Generic Reveal on Scroll ---
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger the reveal for a nicer effect
                const delay = entry.target.dataset.delay || 150;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // --- 2. Interactive 3D Page Tilt ---
    const pageContainer = document.querySelector('.page-container');
    if (window.matchMedia('(min-width: 1024px)').matches && pageContainer) {
        document.addEventListener('mousemove', (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const maxRotateX = 4;
            const maxRotateY = 6;

            const rotateX = ((e.clientY - centerY) / centerY) * -maxRotateX;
            const rotateY = ((e.clientX - centerX) / centerX) * maxRotateY;

            pageContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }

    // --- 3. Neon Mouse Trail Effect ---
    let canCreateParticle = true;
    document.addEventListener('mousemove', (e) => {
        if (canCreateParticle) {
            canCreateParticle = false;

            const particle = document.createElement('div');
            particle.classList.add('trail-particle');
            particle.style.left = `${e.pageX}px`;
            particle.style.top = `${e.pageY}px`;
            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 800);

            setTimeout(() => {
                canCreateParticle = true;
            }, 50);
        }
    });

});



document.addEventListener('DOMContentLoaded', () => {
    // ... (existing code for reveal, tilt, and trail effects) ...

    // --- NEW: Global Screen Flash on Tap/Click ---
    document.addEventListener('click', () => {
        const body = document.body;
        // Prevent re-triggering the animation if it's already running
        if (body.classList.contains('screen-lit')) {
            return;
        }

        // Add the class to trigger the CSS animation
        body.classList.add('screen-lit');

        // Remove the class after the animation completes (600ms)
        // This allows the effect to be triggered again.
        setTimeout(() => {
            body.classList.remove('screen-lit');
        }, 600);
    });
});


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
