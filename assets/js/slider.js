// ==========================================
// HERO SLIDER - Organify
// ==========================================

let currentSlide = 0;
let sliderInterval;

function initializeSlider() {
  const slider = document.getElementById("heroSlider");
  if (!slider) return;

  const slides = slider.querySelectorAll(".hero-item");
  if (slides.length === 0) return;

  // Auto slide every 5 seconds
  sliderInterval = setInterval(() => {
    nextSlide(slides);
  }, 5000);

  // Add navigation dots if needed
  createSliderDots(slides.length);
}

function nextSlide(slides) {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
  updateDots();
}

function prevSlide(slides) {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  updateDots();
}

function goToSlide(slideIndex, slides) {
  slides[currentSlide].classList.remove("active");
  currentSlide = slideIndex;
  slides[currentSlide].classList.add("active");
  updateDots();
}

function createSliderDots(count) {
  const slider = document.getElementById("heroSlider");
  if (!slider) return;

  // Check if dots already exist
  if (slider.querySelector(".slider-dots")) return;

  const dotsContainer = document.createElement("div");
  dotsContainer.className = "slider-dots";
  dotsContainer.style.cssText = `
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
        z-index: 10;
    `;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("span");
    dot.className = "slider-dot" + (i === 0 ? " active" : "");
    dot.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: ${i === 0 ? "#7fad39" : "rgba(255,255,255,0.5)"};
            cursor: pointer;
            transition: all 0.3s ease;
        `;

    dot.addEventListener("click", () => {
      const slides = slider.querySelectorAll(".hero-item");
      goToSlide(i, slides);
      clearInterval(sliderInterval);
      sliderInterval = setInterval(() => nextSlide(slides), 5000);
    });

    dotsContainer.appendChild(dot);
  }

  slider.appendChild(dotsContainer);
}

function updateDots() {
  const dots = document.querySelectorAll(".slider-dot");
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.style.backgroundColor = "#7fad39";
    } else {
      dot.style.backgroundColor = "rgba(255,255,255,0.5)";
    }
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", initializeSlider);

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initializeSlider,
  };
}
