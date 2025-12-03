// ==========================================
// MAIN JAVASCRIPT - Organify
// Entry point for all functionality
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  // Load header and footer components
  loadComponent("header-placeholder", "components/header.html");
  loadComponent("footer-placeholder", "components/footer.html");

  // Initialize navbar functionality
  initializeNavbar();

  // Initialize cart
  initializeCart();

  // Initialize slider
  initializeSlider();

  // Page-specific initializations
  initializeHomePage();
  initializeShopPage();
  initializeProductPage();
  initializeCategoryPage();
});

// ==========================================
// HOME PAGE INITIALIZATION
// ==========================================
function initializeHomePage() {
  // Only run on home page
  if (!document.querySelector(".hero")) return;

  // Render categories
  renderCategories("categories-list");

  // Render featured products
  const featuredProducts = getFeaturedProducts();
  renderProducts(featuredProducts.slice(0, 8), "featured-products-list");

  // Render latest products
  const allProducts = getAllProducts();
  renderProducts(allProducts.slice(0, 8), "latest-products-list");
}

// ==========================================
// SHOP PAGE INITIALIZATION
// ==========================================
function initializeShopPage() {
  // Only run on shop page
  if (!document.getElementById("shop-products-grid")) return;

  // Check for search query
  const searchQuery = getUrlParameter("search");
  let products = getAllProducts();

  if (searchQuery) {
    // Filter products by search query
    products = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Show search results message
    const toolbarShowing = document.querySelector(".shop-showing p");
    if (toolbarShowing) {
      toolbarShowing.innerHTML = `Showing results for "<strong>${searchQuery}</strong>"`;
    }
  }

  // Render all products
  renderProducts(products, "shop-products-grid");
  updateProductCount(products.length);

  // Initialize price range slider (placeholder - requires jQuery UI or similar)
  initializePriceRange();
}

// ==========================================
// PRODUCT PAGE INITIALIZATION
// ==========================================
function initializeProductPage() {
  // Only run on product page
  if (!document.getElementById("product-title")) return;

  const productId = getUrlParameter("id");
  if (!productId) {
    window.location.href = "shop.html";
    return;
  }

  const product = getProductById(parseInt(productId));
  if (!product) {
    window.location.href = "shop.html";
    return;
  }

  // Populate product details
  document.getElementById("product-title").textContent = product.name;
  document.getElementById("product-price").textContent = formatCurrency(
    product.price
  );
  document.getElementById("product-description").textContent =
    product.description;
  document.getElementById("product-name-breadcrumb").textContent = product.name;
  document.getElementById("main-product-image").src = product.image;
  document.getElementById("main-product-image").alt = product.name;

  // Product quantity controls
  let quantity = 1;
  const qtyInput = document.getElementById("product-qty");

  document.getElementById("increase-qty").addEventListener("click", () => {
    quantity++;
    qtyInput.value = quantity;
  });

  document.getElementById("decrease-qty").addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      qtyInput.value = quantity;
    }
  });

  // Add to cart
  document.getElementById("add-to-cart-btn").addEventListener("click", () => {
    addToCart(product.id, quantity);
  });

  // Thumbnail gallery
  const thumbItems = document.querySelectorAll(".thumb-item");
  thumbItems.forEach((thumb) => {
    thumb.addEventListener("click", function () {
      thumbItems.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const img = this.querySelector("img");
      if (img) {
        document.getElementById("main-product-image").src = img.src;
      }
    });
  });

  // Render related products
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);
  renderProducts(relatedProducts, "related-products");
}

// ==========================================
// CATEGORY PAGE INITIALIZATION
// ==========================================
function initializeCategoryPage() {
  // Only run on category page
  if (!document.getElementById("category-products-grid")) return;

  const categorySlug = getUrlParameter("cat");
  if (!categorySlug) {
    window.location.href = "shop.html";
    return;
  }

  // Update page title and breadcrumb
  const category = categoriesData.find((cat) => cat.slug === categorySlug);
  if (category) {
    document.getElementById("category-page-title").textContent = category.name;
    document.getElementById("category-breadcrumb").textContent = category.name;
  }

  // Get and render products
  const products = getProductsByCategory(categorySlug);
  renderProducts(products, "category-products-grid");

  // Update product count
  const catShowingCount = document.getElementById("cat-showing-count");
  const catTotalProducts = document.getElementById("cat-total-products");

  if (catShowingCount) {
    catShowingCount.textContent = `1-${Math.min(products.length, 12)}`;
  }

  if (catTotalProducts) {
    catTotalProducts.textContent = products.length;
  }
}

// ==========================================
// PRICE RANGE FILTER (Placeholder)
// ==========================================
function initializePriceRange() {
  // This would require a library like noUiSlider or jQuery UI
  // For now, just add placeholder values
  const minAmount = document.getElementById("minamount");
  const maxAmount = document.getElementById("maxamount");

  if (minAmount) minAmount.value = "$0";
  if (maxAmount) maxAmount.value = "$50";

  // Add visual feedback
  console.log(
    "Price range filter would be initialized here with a slider library"
  );
}

// ==========================================
// ADDITIONAL HELPER FUNCTIONS
// ==========================================

// Scroll to top button
window.addEventListener("scroll", function () {
  const scrollBtn = document.getElementById("scroll-to-top");
  if (scrollBtn) {
    if (window.pageYOffset > 300) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  }
});

// Create scroll to top button
function createScrollToTopButton() {
  const btn = document.createElement("button");
  btn.id = "scroll-to-top";
  btn.innerHTML = '<i class="fa fa-arrow-up"></i>';
  btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #7fad39;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    `;

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  btn.addEventListener("mouseenter", () => {
    btn.style.backgroundColor = "#6a9230";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.backgroundColor = "#7fad39";
  });

  document.body.appendChild(btn);
}

// Create scroll to top button on page load
createScrollToTopButton();

// Handle form submissions (contact, newsletter, etc.)
document.addEventListener("submit", function (e) {
  const form = e.target;

  // Newsletter form
  if (form.classList.contains("newsletter-form")) {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    if (email) {
      showNotification("Thank you for subscribing!", "success");
      form.reset();
    }
  }

  // Contact form
  if (form.classList.contains("contact-form")) {
    e.preventDefault();
    showNotification(
      "Thank you for your message! We will get back to you soon.",
      "success"
    );
    form.reset();
  }
});

console.log(
  "%c🌿 Organify Website Loaded Successfully! 🌿",
  "color: #7fad39; font-size: 16px; font-weight: bold;"
);
