document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const themeToggle = document.getElementById("theme-toggle-checkbox");
  const body = document.body;
  document.querySelector(".scroll-to-top");

  // Mobile menu toggle
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;
        smoothScroll(document.documentElement, targetPosition, 1000);
      }

      // Close mobile menu after clicking a link
      if (window.innerWidth <= 1023) {
        navLinks.classList.remove("active");
      }
    });
  });

  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    body.classList.add("dark-mode");
    themeToggle.checked = true;
  }

  let lastScrollTop = 0; // Variable to keep track of last scroll position
  const header = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Current scroll position

    if (scrollTop > lastScrollTop) {
      // Scrolling down
      header.classList.add("hidden"); // Add hidden class to header
    } else {
      // Scrolling up
      header.classList.remove("hidden"); // Remove hidden class from header
    }

    lastScrollTop = scrollTop; // Update last scroll position
  });

  function smoothScroll(element, targetPosition, duration) {
    const startPosition = element.scrollTop;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      element.scrollTop = ease(timeElapsed, startPosition, distance, duration);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }
  // Close mobile menu after clicking a link
  if (window.innerWidth <= 768) {
    navLinks.classList.remove("active");
  }
});
let currentIndex = 0;
const totalCards = document.querySelectorAll(".assignment-card").length;
const cardsContainer = document.querySelector(".slider-container");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

// assignment-card
function updateSlider() {
  const cardWidth = document.querySelector(".assignment-card").offsetWidth;
  cardsContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

leftArrow.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalCards - 4; // Loop back to the end
  }
  updateSlider();
});

rightArrow.addEventListener("click", () => {
  if (currentIndex < totalCards - 4) {
    currentIndex++;
  } else {
    currentIndex = 0; // Loop back to the beginning
  }
  updateSlider();
});

// Initialize slider
updateSlider();

// Gallery #D curcle
document.addEventListener("DOMContentLoaded", () => {
  const serviceContainer = document.getElementById("serviceContainer");

  const services = [
    {
      icon: '<i class="fas fa-code"></i>',
      title: "Web Development",
      description:
        "Creating responsive and scalable web applications using cutting-edge technologies and frameworks."
    },
    {
      icon: '<i class="fas fa-mobile-alt"></i>',
      title: "Mobile App Development",
      description:
        "Developing high-performance, cross-platform mobile applications for iOS and Android."
    },
    {
      icon: '<i class="fas fa-shield-alt"></i>',
      title: "Cybersecurity",
      description:
        "Implementing advanced security measures to protect digital assets and ensure data integrity."
    },
    {
      icon: '<i class="fas fa-brain"></i>',
      title: "AI & Machine Learning",
      description:
        "Leveraging artificial intelligence and machine learning algorithms to solve complex business problems."
    },
    {
      icon: '<i class="fas fa-cloud"></i>',
      title: "Cloud Computing",
      description:
        "Designing and implementing scalable cloud solutions for improved performance and cost-efficiency."
    },
    {
      icon: '<i class="fas fa-database"></i>',
      title: "Data Analytics",
      description:
        "Extracting valuable insights from large datasets to drive informed business decisions."
    },
    {
      icon: '<i class="fas fa-cogs"></i>',
      title: "DevOps",
      description:
        "Streamlining development and operations processes for faster deployment and improved collaboration."
    },
    {
      icon: '<i class="fas fa-network-wired"></i>',
      title: "IoT Solutions",
      description:
        "Developing interconnected systems and devices for smart, data-driven environments."
    },
    {
      icon: '<i class="fas fa-shopping-cart"></i>',
      title: "POS Development",
      description:
        "Developing advanced Point of Sale solutions for streamlined transactions and efficient business operations."
    }
  ];

  services.forEach((service) => {
    const card = document.createElement("div");
    card.classList.add("service-card");
    card.innerHTML = `
                    <div class="service-icon">${service.icon}</div>
                    <h3 class="service-title">${service.title}</h3>
                    <p class="service-description">${service.description}</p>
                `;
    serviceContainer.appendChild(card);
  });
});

class Carousel3D {
  constructor() {
    this.carousel = document.getElementById("carousel");
    this.items = [];
    this.currentAngle = 0;
    this.isAutoRotating = true;
    this.autoRotateSpeed = 0.2;
    this.radius = window.innerWidth < 768 ? 250 : 400; // Adjust radius for mobile
    this.isMobile = window.innerWidth < 768;

    this.images = [
      "assets/image/gallery/innovesta.jpeg",
      "assets/image/gallery/innovesta group photo.jpeg",
      "assets/image/gallery/scl photo.jpeg",
      "assets/image/gallery/innovesta trofy.jpeg",
      "assets/image/gallery/group innovesta.jpeg",
      "assets/image/gallery/Scl get together.jpeg",
      "assets/image/gallery/innovesta 2.jpeg",
      "assets/image/gallery/get together.jpeg",
      "assets/image/gallery/trip photo.jpeg",
      "assets/image/gallery/group.jpeg",
      "assets/image/gallery/wedding photo.jpeg",
      "assets/image/Achini.jpeg"
    ];

    this.init();
    this.setupControls();
    this.setupResizeHandler();
    this.animate();
  }

  init() {
    this.carousel.innerHTML = ""; // Clear existing items
    this.items = [];

    this.images.forEach((src, index) => {
      const item = document.createElement("div");
      item.className = "carousel-item";

      const img = document.createElement("img");
      img.src = src;
      img.alt = `Portfolio item ${index + 1}`;

      item.appendChild(img);
      this.carousel.appendChild(item);
      this.items.push(item);
    });

    this.updateItemsPosition();
  }
  updateItemsPosition() {
    const angleStep = 360 / this.items.length;

    this.items.forEach((item, index) => {
      const angle = (index * angleStep + this.currentAngle) * (Math.PI / 180);

      if (this.isMobile) {
        // X-axis rotation for mobile
        const y = Math.sin(angle) * this.radius;
        const z = Math.cos(angle) * this.radius;
        const rotateX = index * angleStep + this.currentAngle;

        item.style.transform = `
                            translate3d(0, ${y}px, ${z}px)
                            rotateX(${-rotateX}deg)
                        `;
      } else {
        // Y-axis rotation for desktop
        const x = Math.sin(angle) * this.radius;
        const z = Math.cos(angle) * this.radius;
        const rotateY = -index * angleStep - this.currentAngle;

        item.style.transform = `
                            translate3d(${x}px, 0, ${z}px)
                            rotateY(${rotateY}deg)
                        `;
      }

      item.style.opacity =
        Math.cos((this.currentAngle + index * angleStep) * (Math.PI / 180)) *
          0.5 +
        0.5;
    });
  }

  setupControls() {
    document.getElementById("prev-btn").addEventListener("click", () => {
      this.isAutoRotating = false;
      this.currentAngle -= 30;
      this.updateItemsPosition();
      setTimeout(() => (this.isAutoRotating = true), 1000);
    });

    document.getElementById("next-btn").addEventListener("click", () => {
      this.isAutoRotating = false;
      this.currentAngle += 30;
      this.updateItemsPosition();
      setTimeout(() => (this.isAutoRotating = true), 1000);
    });
  }

  setupResizeHandler() {
    window.addEventListener("resize", () => {
      this.isMobile = window.innerWidth < 768;
      this.radius = this.isMobile ? 250 : 400;
      this.updateItemsPosition();
    });
  }

  animate() {
    if (this.isAutoRotating) {
      this.currentAngle += this.autoRotateSpeed;
      this.updateItemsPosition();
    }
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize the carousel when the page loads
window.addEventListener("load", () => {
  new Carousel3D();
});

// Intersection Observer for fade-in animation
const observerOptions = {
  threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((element) => {
  observer.observe(element);
});

// Scroll to top button
const scrollToTop = document.querySelector(".scroll-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    scrollToTop.classList.add("active");
  } else {
    scrollToTop.classList.remove("active");
  }
});

scrollToTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Get the header element
const header = document.querySelector("header");

// Variable to track scroll position
let lastScrollTop = 0;

// Listen for scroll events
window.addEventListener("scroll", function () {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  // Check if scrolling down
  if (currentScroll > lastScrollTop) {
    // Scrolling down, hide the header
    header.style.transform = "translateY(-100%)";
  } else {
    // Scrolling up, show the header
    header.style.transform = "translateY(0)";
  }

  // Update lastScrollTop with current scroll position
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});
