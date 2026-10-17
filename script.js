
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main .screen");

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";

  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navLinks.classList.toggle("open", !isOpen);
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// Reveal elements smoothly as they enter the screen.
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Highlight the navigation link for the current section.
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", isActive);
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach((section) => sectionObserver.observe(section));
}

// Automatically update the footer year.
document.querySelector("#year").textContent = new Date().getFullYear();

// Add your actual business details before publishing.
const WHATSAPP_NUMBER = "+2349060404849";
const PHONE_NUMBER = "+2349060404849";

const whatsappLink = document.querySelector("#whatsapp-link");
const callLink = document.querySelector("#call-link");

if (WHATSAPP_NUMBER) {
  whatsappLink.href =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Hello D AUTOS, I'm interested in finding a car."
    )}`;
  whatsappLink.target = "_blank";
  whatsappLink.rel = "noopener noreferrer";
} else {
  whatsappLink.addEventListener("click", (event) => {
    event.preventDefault();
    alert("WhatsApp is not configured yet.");
  });
}

if (PHONE_NUMBER) {
  callLink.href = `tel:${PHONE_NUMBER}`;
} else {
  callLink.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Add your business phone number in script.js to activate this button.");
  });
}
