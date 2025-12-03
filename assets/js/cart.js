// ==========================================
// SHOPPING CART FUNCTIONALITY - Organify
// ==========================================

// Cart storage key
const CART_KEY = "organify_cart";

// Get cart from localStorage
function getCart() {
  return Storage.get(CART_KEY) || [];
}

// Save cart to localStorage
function saveCart(cart) {
  Storage.set(CART_KEY, cart);
  updateCartUI();
}

// Add item to cart
function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);
  if (!product) {
    showNotification("Product not found!", "error");
    return;
  }

  const cart = getCart();
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
  }

  saveCart(cart);
  showNotification(`${product.name} added to cart!`, "success");
}

// Remove item from cart
function removeFromCart(productId) {
  const cart = getCart();
  const filteredCart = cart.filter((item) => item.id !== productId);
  saveCart(filteredCart);

  // Refresh cart page if we're on it
  if (document.getElementById("cart-items")) {
    renderCartPage();
  }
}

// Update item quantity
function updateCartQuantity(productId, quantity) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const cart = getCart();
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.quantity = quantity;
    saveCart(cart);

    // Refresh cart page if we're on it
    if (document.getElementById("cart-items")) {
      renderCartPage();
    }
  }
}

// Clear cart
function clearCart() {
  if (confirm("Are you sure you want to clear your cart?")) {
    Storage.remove(CART_KEY);
    updateCartUI();

    // Refresh cart page if we're on it
    if (document.getElementById("cart-items")) {
      renderCartPage();
    }

    showNotification("Cart cleared!", "success");
  }
}

// Calculate cart total
function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Get cart item count
function getCartItemCount() {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart UI (header badge and total)
function updateCartUI() {
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  if (cartCount) {
    cartCount.textContent = getCartItemCount();
  }

  if (cartTotal) {
    cartTotal.textContent = formatCurrency(getCartTotal());
  }
}

// Render cart page
function renderCartPage() {
  const cartItemsContainer = document.getElementById("cart-items");
  if (!cartItemsContainer) return;

  const cart = getCart();

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "";
    const emptyState = document.getElementById("cart-empty");
    if (emptyState) emptyState.classList.remove("d-none");

    document.getElementById("cart-subtotal").textContent = "$0.00";
    document.getElementById("cart-final-total").textContent = "$0.00";
    return;
  }

  // Hide empty state when items exist
  const emptyState = document.getElementById("cart-empty");
  if (emptyState) emptyState.classList.add("d-none");

  cartItemsContainer.innerHTML = cart
    .map(
      (item) => `
        <tr data-product-id="${item.id}">
            <td class="cart-pic">
                <img src="${item.image}" alt="${
        item.name
      }" style="width: 80px;">
                <span style="margin-left: 15px;">${item.name}</span>
            </td>
            <td class="cart-price">${formatCurrency(item.price)}</td>
            <td class="cart-quantity">
                <div class="quantity">
                    <button class="qty-btn qty-decrease" data-id="${
                      item.id
                    }">-</button>
                    <input type="text" value="${item.quantity}" readonly>
                    <button class="qty-btn qty-increase" data-id="${
                      item.id
                    }">+</button>
                </div>
            </td>
            <td class="cart-total">${formatCurrency(
              item.price * item.quantity
            )}</td>
            <td class="cart-close">
                <button class="remove-item" data-id="${item.id}">
                    <i class="fa fa-times"></i>
                </button>
            </td>
        </tr>
    `
    )
    .join("");

  // Update totals
  const total = getCartTotal();
  document.getElementById("cart-subtotal").textContent = formatCurrency(total);
  document.getElementById("cart-final-total").textContent =
    formatCurrency(total);

  // Add event listeners
  document.querySelectorAll(".qty-decrease").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"));
      const item = cart.find((item) => item.id === id);
      if (item) {
        updateCartQuantity(id, item.quantity - 1);
      }
    });
  });

  document.querySelectorAll(".qty-increase").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"));
      const item = cart.find((item) => item.id === id);
      if (item) {
        updateCartQuantity(id, item.quantity + 1);
      }
    });
  });

  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"));
      removeFromCart(id);
    });
  });
}

// Render checkout page
function renderCheckoutPage() {
  const checkoutItemsContainer = document.getElementById("checkout-items");
  if (!checkoutItemsContainer) return;

  const cart = getCart();

  if (cart.length === 0) {
    window.location.href = "cart.html";
    return;
  }

  checkoutItemsContainer.innerHTML = cart
    .map(
      (item) => `
        <li>${item.name} x ${item.quantity} <span>${formatCurrency(
        item.price * item.quantity
      )}</span></li>
    `
    )
    .join("");

  const total = getCartTotal();
  document.getElementById("checkout-subtotal").textContent =
    formatCurrency(total);
  document.getElementById("checkout-total").textContent = formatCurrency(total);
}

// Initialize cart functionality
function initializeCart() {
  updateCartUI();

  // Cart page
  if (document.getElementById("cart-items")) {
    renderCartPage();

    const clearBtn = document.getElementById("clear-cart");
    if (clearBtn) {
      clearBtn.addEventListener("click", clearCart);
    }
  }

  // Checkout page
  if (document.getElementById("checkout-items")) {
    renderCheckoutPage();

    const checkoutForm = document.querySelector(".checkout-form");
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert(
          "Thank you for your order! This is a demo, no payment was processed."
        );
        clearCart();
        window.location.href = "index.html";
      });
    }
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    updateCartUI,
    renderCartPage,
    renderCheckoutPage,
    initializeCart,
  };
}
