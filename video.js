/* ===================================================================
   MASTER SCRIPT FOR ALL PAGES
   - Contains all shared animations and effects.
   =================================================================== */

// --- 1. Main Initializer ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all the effects when the page is ready
    initializeRevealOnScroll();
    initialize3DPageTilt();
    initializeNeonMouseTrail();
    initializeGlobalTapEffect();
    initializeNavAnimations();
});


// --- 2. Navigation Bar Animations ---
function initializeNavAnimations() {
    const nav = document.querySelector('.glass-nav');
    if (!nav) return;

    // A. Shrink on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // B. Sliding Indicator
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
    setTimeout(() => moveIndicator(activeLink), 150); // Delay to ensure rendering

    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => moveIndicator(link));
    });

    navList.addEventListener('mouseleave', () => moveIndicator(activeLink));
    
    // C. Staggered Reveal Animation
    const logo = nav.querySelector('.nav-logo');
    const listItems = nav.querySelectorAll('li');

    if (logo) {
        setTimeout(() => {
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
        }, 200);
    }
    
    listItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 300 + index * 100);
    });
}


// --- 3. Content Reveal on Scroll ---
function initializeRevealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
}


// --- 4. Interactive 3D Page Tilt ---
function initialize3DPageTilt() {
    const pageContainer = document.querySelector('.page-container');
    if (window.matchMedia('(min-width: 1024px)').matches && pageContainer) {
        document.addEventListener('mousemove', (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const maxRotateX = 4, maxRotateY = 6;
            const rotateX = ((e.clientY - centerY) / centerY) * -maxRotateX;
            const rotateY = ((e.clientX - centerX) / centerX) * maxRotateY;
            pageContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }
}


// --- 5. Neon Mouse Trail Effect ---
function initializeNeonMouseTrail() {
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
}


// --- 6. Global Screen Flash on Tap/Click ---
function initializeGlobalTapEffect() {
    document.addEventListener('click', () => {
        const body = document.body;
        if (body.classList.contains('screen-lit')) return;
        body.classList.add('screen-lit');
        // Duration matches the CSS animation
        setTimeout(() => {
            body.classList.remove('screen-lit');
        }, 1200);
    });
}
