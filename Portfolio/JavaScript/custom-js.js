var swiper = new Swiper(".projects-slider", {
  slidesPerView: 1.2,
  spaceBetween: 10,
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

// Welcome Screen Logic
window.addEventListener("load", () => {
  const welcomeScreen = document.getElementById("welcome-screen");

  setTimeout(() => {
    welcomeScreen.classList.add("fade-out");
  }, 1000);
});

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  // Toggle Hamburger Icon
  const icon = hamburger.querySelector("i");
  if (navLinks.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Close menu when clicking a link
links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.querySelector("i").classList.remove("fa-times");
    hamburger.querySelector("i").classList.add("fa-bars");
  });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const elementVisible = 150;

  revealElements.forEach((reveal) => {
    const elementTop = reveal.getBoundingClientRect().top;
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// Active State in Nav Bar on Scroll
const navMenuLinks = document.querySelectorAll(".nav-links a");
const sections = Array.from(navMenuLinks).map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);

const activeNavOnScroll = () => {
  let scrollPosition = window.scrollY || document.documentElement.scrollTop;
  const headerOffset = 160; 
  let currentSection = null;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollPosition >= sectionTop - headerOffset) {
      currentSection = section;
    }
  });

  // If at the very bottom of the page, activate the last section
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20) {
    currentSection = sections[sections.length - 1];
  }

  navMenuLinks.forEach((link) => {
    link.classList.remove("active");
    if (currentSection && link.getAttribute("href") === `#${currentSection.id}`) {
      link.classList.add("active");
    }
  });
};

window.addEventListener("scroll", activeNavOnScroll);
window.addEventListener("DOMContentLoaded", activeNavOnScroll);

// Read More Toggle Logic
const readMoreBtns = document.querySelectorAll(".read-more-btn");

readMoreBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const wrapper = btn.closest(".project-details-wrapper");
    const content = wrapper.querySelector(".project-details-content");

    content.classList.toggle("active");
    btn.classList.toggle("active");

    if (content.classList.contains("active")) {
      btn.childNodes[0].nodeValue = "Read Less ";
    } else {
      btn.childNodes[0].nodeValue = "Read More ";
    }
  });
});

// Experience Section Read More Toggle
const experienceToggleBtn = document.getElementById("experienceToggleBtn");
const experienceHiddenJobs = document.getElementById("experienceHiddenJobs");

if (experienceToggleBtn && experienceHiddenJobs) {
  experienceToggleBtn.addEventListener("click", () => {
    experienceHiddenJobs.classList.toggle("active");
    experienceToggleBtn.classList.toggle("active");

    const btnText = experienceToggleBtn.querySelector("span");
    if (experienceHiddenJobs.classList.contains("active")) {
      btnText.textContent = "Hide Past Experience";
    } else {
      btnText.textContent = "View Past Experience";
    }
  });
}

// Typing Animation Logic
const typingElement = document.getElementById("hero-typing");
const textToType = "Shopify Developer";
const typingSpeed = 100; 
const deletingSpeed = 50;
const pauseTime = 2000;
const loopDelay = 500;

let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  if (!typingElement) return;

  if (!isDeleting && charIndex <= textToType.length) {
    typingElement.textContent = textToType.substring(0, charIndex);
    charIndex++;
    
    if (charIndex > textToType.length) {
       isDeleting = true;
       setTimeout(typeWriter, pauseTime);
    } else {
       setTimeout(typeWriter, typingSpeed);
    }
  } else if (isDeleting && charIndex >= 0) {
    typingElement.textContent = textToType.substring(0, charIndex);
    charIndex--;
    
    if (charIndex < 0) {
        isDeleting = false;
        charIndex = 0;
        setTimeout(typeWriter, loopDelay);
    } else {
        setTimeout(typeWriter, deletingSpeed);
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeWriter, 500);
});

// Back to Top Button
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Theme Toggle Logic
const themeToggleBtn = document.getElementById("themeToggle");
if (themeToggleBtn) {
  const themeIcon = themeToggleBtn.querySelector("i");

  const updateToggleIcon = (isDark) => {
    if (isDark) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  };

  const currentTheme = document.documentElement.getAttribute("data-theme");
  updateToggleIcon(currentTheme === "dark");

  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      updateToggleIcon(false);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      updateToggleIcon(true);
    }
  });
}

