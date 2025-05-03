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
}); // ← Added missing closing brace here


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('internshipForm');
    const photoInput = document.getElementById('photo');
    const photoPreview = document.getElementById('photoPreview');
    const documentInput = document.getElementById('documents');
    const errorSpans = form.querySelectorAll('.error-message');

    // Image Preview
    photoInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file && ['image/jpeg', 'image/png'].includes(file.type)) {
            const reader = new FileReader();
            reader.onload = e => {
                photoPreview.src = e.target.result;
                photoPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            alert('Invalid image type. Only JPG/PNG allowed.');
            this.value = '';
            photoPreview.style.display = 'none';
        }
    });

    // Form Validation
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;
        errorSpans.forEach(span => span.style.display = 'none');

        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            const span = field.parentElement.querySelector('.error-message');
            if ((field.type === 'checkbox' && !field.checked) || (field.type !== 'checkbox' && !field.value.trim())) {
                span.textContent = 'This field is required';
                span.style.display = 'block';
                isValid = false;
            }
        });

        const files = documentInput.files;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type !== 'application/pdf') {
                alert('Only PDF files are allowed for documents.');
                documentInput.value = '';
                isValid = false;
                break;
            }
        }

        if (isValid) {
            // Simulate form submission (e.g., send to server)
            document.body.insertAdjacentHTML('beforeend', `
                <div id="thankYouModal" class="modal-backdrop">
                  <div class="modal-box animate__animated animate__zoomIn">
                    <i class="fas fa-check-circle fa-3x" style="color:#2ecc71;"></i>
                    <h2>Thank you for applying!</h2>
                    <p>Your application has been received. INTECU will get back to you within <strong>72 hours</strong>.</p>
                    <p>Redirecting to homepage...</p>
                  </div>
                </div>
              `);
              
              setTimeout(() => {
                window.location.href = './interns.html';
              }, 5000);
              
        }
    });

    // Auto-switch testimonials
    let currentIndex = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');

    setInterval(() => {
        testimonials[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % testimonials.length;
        testimonials[currentIndex].classList.add('active');
    }, 5000);


    document.querySelectorAll('.accordion-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentElement;
            item.classList.toggle('open');
        });
    });





    // === Reveal on Scroll ===
    const revealElements = document.querySelectorAll('.internship-hero');

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
}
);
