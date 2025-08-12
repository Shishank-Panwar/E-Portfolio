/*
 * Consolidated JavaScript for Suhani Agarwal's Portfolio
 * Features:
 * 1. Advanced Navigation Animations (Shrink, Slide, Staggered Reveal)
 * 2. General Reveal-on-Scroll Effect
 * 3. Interactive 3D Page Tilt
 * 4. Neon Mouse Trail
 * 5. Interactive Card Glow
 * 6. Global Screen Flash on Tap
 */

// --- Function to handle all navigation effects ---
// This is defined globally so it can be called once the DOM is ready.
function initializeNavAnimations() {
    const nav = document.querySelector('.glass-nav');
    if (!nav) return;

    // 1. Shrink on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 2. Sliding Indicator
    const navList = nav.querySelector('ul');
    const navLinks = nav.querySelectorAll('a');
    
    function moveIndicator(target) {
        if (!target || !navList) return;
        const targetRect = target.getBoundingClientRect();
        const navListRect = navList.getBoundingClientRect();
        
        navList.style.setProperty('--indicator-left', `${targetRect.left - navListRect.left}px`);
        navList.style.setProperty('--indicator-top', `${targetRect.top - navListRect.top}px`);
        navList.style.setProperty('--indicator-width', `${targetRect.width}px`);
        navList.style.setProperty('--indicator-height', `${targetRect.height}px`);
    }

    const activeLink = nav.querySelector('a.active');
    if (activeLink) {
        // Use a timeout to ensure the layout is settled before positioning
        setTimeout(() => moveIndicator(activeLink), 100);
    }
    
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => moveIndicator(link));
    });

    navList.addEventListener('mouseleave', () => moveIndicator(activeLink));

    // 3. Staggered Reveal Animation
    const logo = nav.querySelector('.nav-logo');
    const listItems = nav.querySelectorAll('li');

    if (logo) {
        setTimeout(() => {
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
        }, 200);
    }

    if (listItems) {
        listItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 300 + index * 100); // 100ms stagger
        });
    }
}


// --- Main script execution after the page loads ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize all the animations and effects
    initializeNavAnimations();

    // --- Reveal Elements on Scroll ---
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));

    // --- Interactive Glow Effect for Skill Cards ---
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // --- Global Screen Flash on Tap/Click ---
    document.addEventListener('click', () => {
        const body = document.body;
        if (body.classList.contains('screen-lit')) return;
        body.classList.add('screen-lit');
        setTimeout(() => body.classList.remove('screen-lit'), 600);
    });
});


// --- Effects that run continuously based on mouse movement ---

// --- Interactive 3D Page Tilt ---
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

// --- Neon Mouse Trail Effect ---
let canCreateParticle = true;
document.addEventListener('mousemove', (e) => {
    if (canCreateParticle) {
        canCreateParticle = false;
        const particle = document.createElement('div');
        particle.classList.add('trail-particle');
        particle.style.left = `${e.pageX}px`;
        particle.style.top = `${e.pageY}px`;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
        setTimeout(() => { canCreateParticle = true; }, 50);
    }
});
