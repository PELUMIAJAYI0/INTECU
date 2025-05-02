// === Navigation Toggle ===
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

function toggleMenu() {
    navMenu.classList.toggle('show');
    const expanded = navMenu.classList.contains('show');
    menuToggle.setAttribute('aria-expanded', expanded.toString());
}

menuToggle.addEventListener('click', toggleMenu);

// Accessibility: toggle menu on Enter or Space key
menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
    }
});

// === Reveal on Scroll ===
const revealElements = document.querySelectorAll('.card, .panel, .container_1, .first-section, .our-story, .cta-section');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Reveal once
        }
    });
}, {
    threshold: 0.15,
});

revealElements.forEach(el => {
    el.classList.add('reveal'); // start hidden
    observer.observe(el);
});

// === Scroll To Top Button (Optional) ===
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '↑';
scrollBtn.classList.add('scroll-top');
document.body.appendChild(scrollBtn);

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('show-scroll', window.scrollY > 300);
});
