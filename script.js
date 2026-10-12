"use strict";

document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // 1. MOBILE NAVIGATION
  // =====================================

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-link");

  function closeMenu() {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Open navigation" : "Close navigation"
    );

    navLinks.classList.toggle("is-open", !isOpen);
  });

  navItems.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });


  // =====================================
  // 2. HERO TYPEWRITER ANIMATION
  // =====================================

  const typedRole = document.getElementById("typed-role");

  const roles = [
    "Frontend Web Developer",
    "Aspiring Software Developer",
    "Creative Problem Solver",
    "Computer Science Student"
  ];

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (typedRole && !reducedMotion) {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = true;

    typedRole.textContent = roles[0];

    function typeNext() {
      const currentRole = roles[roleIndex];

      if (deleting) {
        charIndex--;

        typedRole.textContent = currentRole.slice(
          0,
          Math.max(0, charIndex)
        );

        if (charIndex <= 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;

          setTimeout(typeNext, 350);
          return;
        }

        setTimeout(typeNext, 38);

      } else {
        const nextRole = roles[roleIndex];

        charIndex++;

        typedRole.textContent = nextRole.slice(0, charIndex);

        if (charIndex >= nextRole.length) {
          deleting = true;

          setTimeout(typeNext, 1500);
          return;
        }

        setTimeout(typeNext, 65);
      }
    }

    setTimeout(typeNext, 1700);
  }


  // =====================================
  // 3. SCROLL REVEAL ANIMATIONS
  // =====================================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reducedMotion) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }

        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }


  // =====================================
  // 4. ACTIVE NAVIGATION WHILE SCROLLING
  // =====================================

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          const currentId = entry.target.id;

          navItems.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${currentId}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });

        });
      },
      {
        rootMargin: "-35% 0px -55% 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }


  // =====================================
  // 5. AUTOMATIC COPYRIGHT YEAR
  // =====================================

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // =====================================
  // 6. CONTACT FORM
  // =====================================

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  // IMPORTANT:
  // Replace this with your actual email address.
  const recipient = "your.email@example.com";

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const formData = new FormData(contactForm);

    const name = String(formData.get("name")).trim();
    const email = String(formData.get("email")).trim();
    const subject = String(formData.get("subject")).trim();
    const message = String(formData.get("message")).trim();

    if (recipient === "your.email@example.com") {
      formStatus.textContent =
        "Please add your real email address in script.js first.";

      formStatus.style.color = "#f6bd7b";
      return;
    }

    const mailSubject = encodeURIComponent(subject);

    const mailBody = encodeURIComponent(
      `Hi Pratha,\n\n${message}\n\nFrom: ${name}\nReply to: ${email}`
    );

    formStatus.textContent =
      "Opening your email application...";

    window.location.href =
      `mailto:${recipient}?subject=${mailSubject}&body=${mailBody}`;
  });


  // =====================================
  // 7. DISABLE UNCONFIGURED PROJECT LINKS
  // =====================================

  document.querySelectorAll(".disabled-link").forEach((link) => {

    link.addEventListener("click", (event) => {
      event.preventDefault();
    });

  });

});

