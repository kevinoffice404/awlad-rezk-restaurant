const WHATSAPP_NUMBER = "201023799167";

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const year = document.getElementById("year");
const backToTop = document.getElementById("backToTop");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
    });
  });
}

document.querySelectorAll(".order-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.dataset.item || "طلب من المنيو";
    const message = `السلام عليكم، أريد طلب ${item} من مطعم أولاد رزق`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener");
  });
});

const tabs = document.querySelectorAll(".tab");
const menuCards = document.querySelectorAll(".menu-card");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;

    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    menuCards.forEach((card) => {
      const category = card.dataset.category;
      const show = filter === "all" || category === filter;

      card.classList.toggle("hide", !show);
    });
  });
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.14
  });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("in"));
}

function updateBackToTop() {
  if (!backToTop) return;

  const show = window.scrollY > 650;
  backToTop.style.display = show ? "grid" : "none";
}

window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();

if (backToTop) {
  backToTop.addEventListener("click", () => {
    const reduceMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  });
}

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

if ("IntersectionObserver" in window) {
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.id;

      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("active", active);
      });
    });
  }, {
    rootMargin: "-45% 0px -50% 0px",
    threshold: 0.01
  });

  sections.forEach((section) => activeObserver.observe(section));
}
