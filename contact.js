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

const form = document.getElementById("contact-form");
const successMessage = document.getElementById("form-success");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent actual submission

  // Simulate a successful submission (you can replace this with real API call)
  form.reset();
  successMessage.hidden = false;

  setTimeout(() => {
    successMessage.hidden = true;
  }, 4000);
});
