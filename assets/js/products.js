// ==========================================
// PRODUCT DATA & FUNCTIONS - Organify
// ==========================================

// Sample Product Data
const productsData = [
  {
    id: 1,
    name: "Fresh Organic Broccoli",
    category: "vegetables",
    price: 3.5,
    image:
      "assets/images/banner/Organic Food banner_files/product-7-330x330.png",
    rating: 4.5,
    description: "Fresh organic broccoli, rich in vitamins and minerals.",
    inStock: true,
    featured: true,
    sale: false,
  },
  {
    id: 2,
    name: "Organic Tomatoes",
    category: "vegetables",
    price: 2.99,
    image:
      "assets/images/banner/Organic Food banner_files/product-8-330x330.webp",
    rating: 5,
    description: "Vine-ripened organic tomatoes, perfect for salads.",
    inStock: true,
    featured: true,
    sale: true,
  },
  {
    id: 3,
    name: "Fresh Strawberries",
    category: "fruits",
    price: 4.99,
    image:
      "assets/images/banner/Organic Food banner_files/pd14-min-330x330.png",
    rating: 4,
    description: "Sweet and juicy organic strawberries.",
    inStock: true,
    featured: true,
    sale: false,
  },
  {
    id: 4,
    name: "Organic Bananas",
    category: "fruits",
    price: 1.99,
    image:
      "assets/images/banner/Organic Food banner_files/pd15-min-330x330.png",
    rating: 4.5,
    description: "Organic bananas, perfect for smoothies and snacks.",
    inStock: true,
    featured: false,
    sale: false,
  },
  {
    id: 5,
    name: "Fresh Chicken Breast",
    category: "meat",
    price: 8.99,
    image:
      "assets/images/banner/Organic Food banner_files/product-12-1-330x330.webp",
    rating: 4.5,
    description: "Premium quality fresh chicken breast.",
    inStock: true,
    featured: true,
    sale: false,
  },
  {
    id: 6,
    name: "Wild Caught Salmon",
    category: "seafood",
    price: 12.99,
    image:
      "assets/images/banner/Organic Food banner_files/pd16-min-330x330.png",
    rating: 5,
    description: "Fresh wild caught salmon, rich in omega-3.",
    inStock: true,
    featured: true,
    sale: true,
  },
  {
    id: 7,
    name: "Organic Carrots",
    category: "vegetables",
    price: 2.49,
    image:
      "assets/images/banner/Organic Food banner_files/product-7-330x330.png",
    rating: 4,
    description: "Crunchy organic carrots, great for snacking.",
    inStock: true,
    featured: false,
    sale: false,
  },
  {
    id: 8,
    name: "Fresh Apples",
    category: "fruits",
    price: 3.99,
    image:
      "assets/images/banner/Organic Food banner_files/product-8-330x330.webp",
    rating: 4.5,
    description: "Crisp and sweet organic apples.",
    inStock: true,
    featured: true,
    sale: false,
  },
];

// Categories Data
const categoriesData = [
  {
    id: 1,
    name: "Fresh Vegetables",
    slug: "vegetables",
    image: "assets/images/banner/Organic Food banner_files/grape.png",
    count: 43,
  },
  {
    id: 2,
    name: "Fresh Fruits",
    slug: "fruits",
    image: "assets/images/banner/Organic Food banner_files/guava.png",
    count: 36,
  },
  {
    id: 3,
    name: "Fresh Meat",
    slug: "meat",
    image: "assets/images/banner/Organic Food banner_files/mango.png",
    count: 28,
  },
  {
    id: 4,
    name: "Seafood",
    slug: "seafood",
    image: "assets/images/banner/Organic Food banner_files/grape.png",
    count: 22,
  },
];

// Get all products
function getAllProducts() {
  return productsData;
}

// Get product by ID
function getProductById(id) {
  return productsData.find((product) => product.id === parseInt(id));
}

// Get products by category
function getProductsByCategory(category) {
  if (category === "all" || category === "*") {
    return productsData;
  }
  return productsData.filter((product) => product.category === category);
}

// Get featured products
function getFeaturedProducts() {
  return productsData.filter((product) => product.featured);
}

// Sort products
function sortProducts(products, sortBy) {
  const sorted = [...products];

  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}

// Generate star rating HTML
function generateStarRating(rating) {
  let stars = "";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fa fa-star"></i>';
  }

  if (hasHalfStar) {
    stars += '<i class="fa fa-star-half-alt"></i>';
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }

  return stars;
}

// Create product card HTML
function createProductCard(product) {
  return `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="product-item">
                <div class="product-pic">
                    <img src="${product.image}" alt="${
    product.name
  }" class="product-image" loading="lazy" decoding="async">
                    <ul class="product-hover">
                        <li><a href="#" class="add-to-wishlist"><i class="fa fa-heart"></i></a></li>
                        <li><a href="#" class="quick-view"><i class="fa fa-retweet"></i></a></li>
                        <li><a href="product.html?id=${
                          product.id
                        }" class="view-details"><i class="fa fa-search"></i></a></li>
                    </ul>
                    ${
                      product.sale
                        ? '<span class="product-label sale">Sale</span>'
                        : ""
                    }
                </div>
                <div class="product-text">
                    <h6><a href="product.html?id=${
                      product.id
                    }" class="product-title">${product.name}</a></h6>
                    <div class="rating">
                        ${generateStarRating(product.rating)}
                    </div>
                    <h5 class="product-price">${formatCurrency(
                      product.price
                    )}</h5>
                    <button class="add-to-cart-btn" data-product-id="${
                      product.id
                    }">
                        <i class="fa fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Create category card HTML
function createCategoryCard(category) {
  return `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="category-item">
                <div class="category-pic">
                    <img src="${category.image}" alt="${category.name}" class="category-image">
                </div>
                <div class="category-text">
                    <h5 class="category-name">${category.name}</h5>
                    <p class="category-count">${category.count} products</p>
                    <a href="category.html?cat=${category.slug}" class="category-link">Shop Now</a>
                </div>
            </div>
        </div>
    `;
}

// Render products to a container
function renderProducts(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = products
    .map((product) => createProductCard(product))
    .join("");

  // Add event listeners to add-to-cart buttons
  container.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const productId = parseInt(this.getAttribute("data-product-id"));
      addToCart(productId);
    });
  });
}

// Render categories
function renderCategories(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = categoriesData
    .map((category) => createCategoryCard(category))
    .join("");
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    productsData,
    categoriesData,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    sortProducts,
    generateStarRating,
    createProductCard,
    createCategoryCard,
    renderProducts,
    renderCategories,
  };
}
