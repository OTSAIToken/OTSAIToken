document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (menuToggle && header) {
    menuToggle.addEventListener("click", () => {
      header.classList.toggle("menu-open");
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (header) header.classList.remove("menu-open");
    });
  });

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  const revealItems = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach((faq) => {
        faq.classList.remove("active");
        const icon = faq.querySelector(".faq-question span:last-child");
        if (icon) icon.textContent = "+";
      });

      if (!isActive) {
        item.classList.add("active");
        const icon = item.querySelector(".faq-question span:last-child");
        if (icon) icon.textContent = "−";
      }
    });
  });

  const contactForm = document.querySelector(".form");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const status = document.querySelector(".form-status");
      if (status) {
        status.textContent =
          "Thank you. Your OTSAI Token inquiry has been prepared. Please send it directly to support@osoqllc.com.";
      }

      contactForm.reset();
    });
  }
});
