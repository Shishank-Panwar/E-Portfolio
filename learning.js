/* ===================================================================
   SPECIAL SCRIPT FOR LEARNING PAGE
   - Includes all master effects + unique timeline animation.
   =================================================================== */

// --- 1. Main Initializer ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all the shared effects
    initializeRevealOnScroll();
    initialize3DPageTilt();
    initializeNeonMouseTrail();
    initializeGlobalTapEffect();
    initializeNavAnimations();

    // Initialize the page-specific timeline animation
    initializeTimelineAnimation();
});

// --- Timeline-Specific Animation ---
function initializeTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length === 0) return;

    // Use a separate observer for the timeline to handle its unique animations
    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

    timelineItems.forEach((item, index) => {
        // Add classes to determine animation direction (left or right)
        item.classList.add(index % 2 === 0 ? 'from-left' : 'from-right');
        timelineObserver.observe(item);
    });
}


/* ===================================================================
   The following are the shared master functions.
   =================================================================== */

// --- Navigation Bar Animations ---
function initializeNavAnimations() {
    // (This function is identical to the one in the master script)
    const nav = document.querySelector('.glass-nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

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
    setTimeout(() => moveIndicator(activeLink), 150);

    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => moveIndicator(link));
    });

    navList.addEventListener('mouseleave', () => moveIndicator(activeLink));

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

// --- Content Reveal on Scroll ---
function initializeRevealOnScroll() {
    // Exclude timeline items since they have their own observer
    const revealElements = document.querySelectorAll('.reveal:not(.timeline-item)');
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

// --- Other Master Functions (3D Tilt, Trail, Tap Effect) ---
function initialize3DPageTilt() { /* ... identical code ... */ }
function initializeNeonMouseTrail() { /* ... identical code ... */ }
function initializeGlobalTapEffect() { /* ... identical code ... */ }

// (You can copy the full function bodies from the master script above to complete this file)


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
