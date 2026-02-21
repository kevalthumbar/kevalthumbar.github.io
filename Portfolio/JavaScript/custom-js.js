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
  }, 2500);
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

// Typing Animation Logic
const typingElement = document.getElementById("hero-typing");
const textToType = "Shopify Developer";
const typingSpeed = 100; // ms per char
const deletingSpeed = 50; // ms per char
const pauseTime = 2000; // Pause after typing
const loopDelay = 500; // Pause before starting next loop

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
