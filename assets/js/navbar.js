// ==========================================
// NAVBAR & MOBILE MENU - Organify
// ==========================================

function initializeNavbar() {
  // Sticky header on scroll
  const header = document.querySelector(".header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }

    lastScroll = currentScroll;
  });

  // Mobile menu toggle (handled in utils.js initializeHeader)

  // Search form functionality
  const searchForms = document.querySelectorAll(".search-form form");
  searchForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const searchInput = form.querySelector('input[type="text"]');
      const searchQuery = searchInput.value.trim();

      if (searchQuery) {
        // Redirect to shop page with search query
        window.location.href = `shop.html?search=${encodeURIComponent(
          searchQuery
        )}`;
      }
    });
  });

  // Category filter on index page
  const filterButtons = document.querySelectorAll(
    ".featured-controls li, .latest-controls li"
  );
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const category = this.getAttribute("data-filter");
      const container = this.closest(".featured-products, .latest-products");
      const productsContainer = container.querySelector('[id$="-list"]');

      // Remove active class from all buttons in this group
      this.parentElement
        .querySelectorAll("li")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Filter products
      let products;
      if (category === "*" || category === "all") {
        products = getAllProducts();
      } else {
        products = getProductsByCategory(category);
      }

      renderProducts(products.slice(0, 8), productsContainer.id);
    });
  });

  // Category filter on shop page
  const categoryLinks = document.querySelectorAll(".category-list a");
  categoryLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const category = this.getAttribute("data-category");

      // Remove active class from all links
      categoryLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      // Filter and render products
      let products;
      if (category === "all") {
        products = getAllProducts();
      } else {
        products = getProductsByCategory(category);
      }

      const sortSelect = document.getElementById("sort-products");
      if (sortSelect) {
        products = sortProducts(products, sortSelect.value);
      }

      renderProducts(products, "shop-products-grid");
      updateProductCount(products.length);
    });
  });

  // Sort functionality on shop page
  const sortSelect = document.getElementById("sort-products");
  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      const activeCategory = document.querySelector(".category-list a.active");
      const category = activeCategory
        ? activeCategory.getAttribute("data-category")
        : "all";

      let products;
      if (category === "all") {
        products = getAllProducts();
      } else {
        products = getProductsByCategory(category);
      }

      products = sortProducts(products, this.value);
      renderProducts(products, "shop-products-grid");
    });
  }

  // Category sort on category page
  const catSortSelect = document.getElementById("cat-sort-products");
  if (catSortSelect) {
    catSortSelect.addEventListener("change", function () {
      const urlCategory = getUrlParameter("cat");
      let products = getProductsByCategory(urlCategory);
      products = sortProducts(products, this.value);
      renderProducts(products, "category-products-grid");
    });
  }
}

function updateProductCount(count) {
  const showingCount = document.getElementById("showing-count");
  const totalProducts = document.getElementById("total-products");

  if (showingCount) {
    showingCount.textContent = `1-${Math.min(count, 12)}`;
  }

  if (totalProducts) {
    totalProducts.textContent = count;
  }
}

// Add CSS for sticky header
const style = document.createElement("style");
style.textContent = `
    .header.sticky {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999;
        background: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        animation: slideDown 0.3s ease;
    }
    
    .header.sticky .header-top {
        display: none;
    }
    
    @keyframes slideDown {
        from {
            transform: translateY(-100%);
        }
        to {
            transform: translateY(0);
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initializeNavbar,
    updateProductCount,
  };
}
