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

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    item.classList.toggle("active");
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) otherItem.classList.remove("active");
    });
  });
});


const track = document.getElementById("testimonial-track");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progress-bar");

function scrollCarousel(direction) {
  const cardWidth = track.querySelector(".testimonial-card").offsetWidth + 24;
  track.scrollBy({ left: direction === "next" ? cardWidth : -cardWidth, behavior: "smooth" });
  restartProgressBar();
}

function restartProgressBar() {
  progressBar.style.transition = "none";
  progressBar.style.width = "0%";
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      progressBar.style.transition = "width 6s linear";
      progressBar.style.width = "100%";
    });
  });
}

// Event listeners
nextBtn.addEventListener("click", () => scrollCarousel("next"));
prevBtn.addEventListener("click", () => scrollCarousel("prev"));

// Auto-scroll every 6s
let autoScroll = setInterval(() => scrollCarousel("next"), 6000);
restartProgressBar();

// Pause on hover
track.addEventListener("mouseenter", () => clearInterval(autoScroll));
track.addEventListener("mouseleave", () => {
  autoScroll = setInterval(() => scrollCarousel("next"), 6000);
  restartProgressBar();
});

