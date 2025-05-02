const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Accessibility: toggle menu on Enter or Space key
menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navMenu.classList.toggle('show');
    }
}
);

// === Reveal on Scroll ===
const revealElements = document.querySelectorAll('.container_1, .container_2_h2, card_2, .policy-container, .container_3, .container_4, .container_5');

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