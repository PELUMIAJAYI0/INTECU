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

function toggleChatbot() {
    const chatbox = document.getElementById("chatbot-container");
    chatbox.style.display = chatbox.style.display === "flex" ? "none" : "flex";
  }
  
  document.getElementById("chatbot-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const input = document.getElementById("chat-input");
    const msg = input.value.trim();
    if (!msg) return;
    appendMessage("user", msg);
    appendMessage("bot", "Typing...");
    input.value = "";
  
    try {
      const reply = await fetchAIResponse(msg);
      const messagesDiv = document.getElementById("chatbot-messages");
      messagesDiv.lastChild.textContent = reply;
    } catch (error) {
      console.error(error);
      appendMessage("bot", "Something went wrong. Please try again later.");
    }
  });
  
  function appendMessage(sender, text) {
    const messages = document.getElementById("chatbot-messages");
    const p = document.createElement("p");
    p.className = sender;
    p.textContent = text;
    messages.appendChild(p);
    messages.scrollTop = messages.scrollHeight;
  }
  
  async function fetchAIResponse(userInput) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral/mistral-7b-instruct",
        messages: [
          { role: "system", content: "You are a helpful assistant for INTECU's networking services." },
          { role: "user", content: userInput }
        ]
      })
    });
  
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response received.";
  }