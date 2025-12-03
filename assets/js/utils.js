// ==========================================
// UTILITY FUNCTIONS - Organify
// ==========================================

// Load HTML components (header, footer)
function loadComponent(elementId, componentPath) {
  fetch(componentPath)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
      // Re-initialize event listeners after loading
      if (elementId === "header-placeholder") {
        initializeHeader();
      }
    })
    .catch((error) => console.error("Error loading component:", error));
}

// Initialize header functionality
function initializeHeader() {
  // Mobile menu toggle
  const canvasOpen = document.querySelector(".canvas-open");
  const canvasClose = document.querySelector(".canvas-close");
  const offcanvasMenu = document.querySelector(".offcanvas-menu-wrapper");
  const offcanvasOverlay = document.querySelector(".offcanvas-menu-overlay");

  if (canvasOpen) {
    canvasOpen.addEventListener("click", function () {
      offcanvasMenu.classList.add("active");
      offcanvasOverlay.style.display = "block";
    });
  }

  if (canvasClose) {
    canvasClose.addEventListener("click", function () {
      offcanvasMenu.classList.remove("active");
      offcanvasOverlay.style.display = "none";
    });
  }

  if (offcanvasOverlay) {
    offcanvasOverlay.addEventListener("click", function () {
      offcanvasMenu.classList.remove("active");
      offcanvasOverlay.style.display = "none";
    });
  }
}

// Format currency
function formatCurrency(amount) {
  return "$" + parseFloat(amount).toFixed(2);
}

// Get URL parameter
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Show notification
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#7fad39" : "#dc3545"};
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Smooth scroll to element
function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

// Local Storage helpers
const Storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Error saving to localStorage", e);
    }
  },

  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error("Error reading from localStorage", e);
      return null;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error("Error removing from localStorage", e);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error("Error clearing localStorage", e);
    }
  },
};

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    loadComponent,
    formatCurrency,
    getUrlParameter,
    showNotification,
    debounce,
    smoothScrollTo,
    Storage,
  };
}
