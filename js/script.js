document.addEventListener("DOMContentLoaded", () => {
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

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // --- MODAL & BOOKING LOGIC --- //
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
    // Allow background to scroll again
    body.style.overflow = "auto";
  };

  closeBtn.addEventListener("click", closeModalFunc);

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalFunc();
    }
  });

  ticketInput.addEventListener("input", (e) => {
    let val = parseInt(e.target.value) || 1;
    if (val < 1) val = 1;
    priceDisplay.innerText = `$${val * basePrice}`;
  });

  // --- FAQ ACCORDION --- //
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    item.querySelector(".faq-question").addEventListener("click", () => {
      faqItems.forEach((other) => {
        if (other !== item) other.classList.remove("active");
      });

      item.classList.toggle("active");
      const icon = item.querySelector(".faq-question i");
      if (item.classList.contains("active")) {
        icon.classList.replace("fa-plus", "fa-minus");
      } else {
        icon.classList.replace("fa-minus", "fa-plus");
      }
    });
  });

  // --- EVENT FILTERING --- //
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".event-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(".filter-btn.active").classList.remove("active");
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

  // --- SMOOTH SCROLLING --- //
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
