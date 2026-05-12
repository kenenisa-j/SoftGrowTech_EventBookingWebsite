document.addEventListener("DOMContentLoaded", () => {
  // --- THEME TOGGLE LOGIC ---
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const icon = themeToggle.querySelector("i");

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");

    if (body.classList.contains("dark-theme")) {
      icon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "dark");
    } else {
      icon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "light");
    }
  });

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme");
    icon.classList.replace("fa-sun", "fa-moon");
  }

  // --- UPDATED NAVIGATION LOGIC (HAMBURGER & X-ANIMATION) ---
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      // Toggle the slide-in menu
      navLinks.classList.toggle("active");
      // Toggle the X animation on the hamburger itself
      hamburger.classList.toggle("active");

      // Prevent scrolling the background when menu is open
      if (navLinks.classList.contains("active")) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    });
  }

  // Close menu and reset icon when a link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
      body.style.overflow = "auto"; // Re-enable scroll
    });
  });

  // --- MODAL & BOOKING LOGIC ---
  const modal = document.getElementById("bookingModal");
  const closeBtn = document.querySelector(".close-modal");
  const bookButtons = document.querySelectorAll(".book-btn");
  const eventInput = document.getElementById("selectedEvent");
  const ticketInput = document.getElementById("ticketCount");
  const priceDisplay = document.getElementById("totalPrice");

  let basePrice = 0;

  bookButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const eventName = btn.getAttribute("data-event");
      basePrice = parseInt(btn.getAttribute("data-price"));

      eventInput.value = eventName;
      ticketInput.value = 1;
      priceDisplay.innerText = `$${basePrice}`;

      modal.classList.add("active");
      modal.style.display = "flex";

      body.style.overflow = "hidden";
    });
  });

  const closeModalFunc = () => {
    modal.classList.remove("active");
    modal.style.display = "none";
    body.style.overflow = "auto";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModalFunc);

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalFunc();
    }
  });

  if (ticketInput) {
    ticketInput.addEventListener("input", (e) => {
      let val = parseInt(e.target.value) || 1;
      if (val < 1) val = 1;
      priceDisplay.innerText = `$${val * basePrice}`;
    });
  }

  // --- FAQ ACCORDION ---
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", () => {
        faqItems.forEach((other) => {
          if (other !== item) other.classList.remove("active");
        });

        item.classList.toggle("active");
        const icon = item.querySelector(".faq-question i");
        if (icon) {
          if (item.classList.contains("active")) {
            icon.classList.replace("fa-plus", "fa-minus");
          } else {
            icon.classList.replace("fa-minus", "fa-plus");
          }
        }
      });
    }
  });

  // --- EVENT FILTERING ---
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".event-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const activeBtn = document.querySelector(".filter-btn.active");
      if (activeBtn) activeBtn.classList.remove("active");
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      cards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "block";
          setTimeout(() => (card.style.opacity = "1"), 50);
        } else {
          card.style.opacity = "0";
          card.style.display = "none";
        }
      });
    });
  });

  // --- SMOOTH SCROLLING ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
