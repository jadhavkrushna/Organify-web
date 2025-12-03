# 🌿 Organify - Organic Food E-commerce Website

A modern, responsive organic food e-commerce website built with **HTML**, **CSS**, **JavaScript**, and **Bootstrap 5**.

![Organify](https://img.shields.io/badge/Version-1.0.0-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?logo=bootstrap&logoColor=white)

## 📋 Table of Contents

- [Features](#features)
- [Demo Pages](#demo-pages)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
- [Browser Support](#browser-support)
- [Credits](#credits)

## ✨ Features

### 🛒 E-commerce Functionality

- ✅ Product browsing and filtering
- ✅ Shopping cart with localStorage persistence
- ✅ Product search functionality
- ✅ Category-based navigation
- ✅ Product details page
- ✅ Checkout process (demo)
- ✅ Wishlist functionality

### 🎨 Design & UI

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Modern and clean interface
- ✅ Smooth animations and transitions
- ✅ Hero slider on homepage
- ✅ Product hover effects
- ✅ Mobile-friendly navigation
- ✅ Sticky header on scroll

### 🔧 Technical Features

- ✅ Pure vanilla JavaScript (no frameworks)
- ✅ Bootstrap 5 for responsive grid
- ✅ CSS variables for easy theming
- ✅ localStorage for cart persistence
- ✅ Modular JavaScript architecture
- ✅ SEO-friendly structure
- ✅ Fast loading times

## 📱 Demo Pages

1. **Home Page** (`index.html`)

   - Hero slider with call-to-action
   - Featured categories
   - Featured products section
   - Latest products
   - Blog section

2. **Shop Page** (`shop.html`)

   - Product grid with filters
   - Category sidebar
   - Price range filter
   - Sort functionality
   - Pagination

3. **Product Details** (`product.html`)

   - Product image gallery
   - Product information
   - Quantity selector
   - Add to cart
   - Related products
   - Product reviews

4. **Shopping Cart** (`cart.html`)

   - Cart items list
   - Quantity adjustment
   - Remove items
   - Cart totals
   - Coupon code input

5. **Checkout** (`checkout.html`)

   - Billing information form
   - Order summary
   - Payment method selection

6. **Category Page** (`category.html`)

   - Category-specific products
   - Filtering and sorting

7. **About Us** (`about.html`)

   - Company information
   - Team members

8. **Contact** (`contact.html`)

   - Contact form
   - Contact information
   - Google Maps integration

9. **Blog** (`blog.html`)

   - Blog posts grid
   - Pagination

10. **Blog Details** (`blog-single.html`)
    - Article content
    - Comments section
    - Sidebar widgets

## 📁 Project Structure

```
organify/
│
├── index.html              # Home page
├── shop.html               # Shop/Products listing
├── product.html            # Product details
├── cart.html               # Shopping cart
├── checkout.html           # Checkout page
├── category.html           # Category page
├── about.html              # About us
├── contact.html            # Contact page
├── blog.html               # Blog listing
├── blog-single.html        # Blog details
│
├── components/             # Reusable HTML components
│   ├── header.html         # Header component
│   ├── footer.html         # Footer component
│   ├── product-card.html   # Product card template
│   ├── category-card.html  # Category card template
│   ├── hero-section.html   # Hero section template
│   └── testimonial-card.html
│
├── assets/
│   ├── css/
│   │   ├── variables.css   # CSS custom properties
│   │   ├── style.css       # Main stylesheet
│   │   └── responsive.css  # Responsive styles
│   │
│   ├── js/
│   │   ├── main.js         # Main JavaScript entry point
│   │   ├── utils.js        # Utility functions
│   │   ├── products.js     # Product data & functions
│   │   ├── cart.js         # Shopping cart functionality
│   │   ├── slider.js       # Hero slider
│   │   └── navbar.js       # Navigation functionality
│   │
│   ├── images/
│   │   ├── banner/         # Banner images
│   │   ├── products/       # Product images
│   │   ├── categories/     # Category images
│   │   ├── testimonials/   # Testimonial images
│   │   └── icons/          # Icons and logos
│   │
│   ├── fonts/              # Custom fonts (optional)
│   └── vendor/             # Third-party libraries
│
└── README.md               # This file
```

## 🚀 Installation

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended)

### Quick Start

1. **Clone or Download** the project:

   ```bash
   git clone https://github.com/yourusername/organify.git
   cd organify
   ```

2. **Add Product Images**:

   - Add your product images to `assets/images/products/`
   - Add category images to `assets/images/categories/`
   - Add banner images to `assets/images/banner/`
   - Add logo to `assets/images/logo.png`

3. **Run a Local Server** (Recommended):

   **Option A: Using Python**

   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Option B: Using Node.js (http-server)**

   ```bash
   npx http-server
   ```

   **Option C: Using VS Code**

   - Install "Live Server" extension
   - Right-click on `index.html` → "Open with Live Server"

4. **Open in Browser**:
   Navigate to `http://localhost:8000`

## 💻 Usage

### Modifying Products

Edit the product data in `assets/js/products.js`:

```javascript
const productsData = [
  {
    id: 1,
    name: "Your Product Name",
    category: "vegetables", // vegetables, fruits, meat, seafood
    price: 3.5,
    image: "assets/images/products/product-1.jpg",
    rating: 4.5,
    description: "Product description",
    inStock: true,
    featured: true,
    sale: false,
  },
  // Add more products...
];
```

### Modifying Categories

Edit the category data in `assets/js/products.js`:

```javascript
const categoriesData = [
  {
    id: 1,
    name: "Fresh Vegetables",
    slug: "vegetables",
    image: "assets/images/categories/cat-1.jpg",
    count: 43,
  },
  // Add more categories...
];
```

### Customizing Colors

Edit CSS variables in `assets/css/variables.css`:

```css
:root {
  --primary-color: #7fad39; /* Main brand color */
  --primary-dark: #6a9230; /* Darker shade */
  --secondary-color: #252525; /* Secondary color */
  /* Modify other variables as needed */
}
```

### Adding New Pages

1. Create a new HTML file (e.g., `new-page.html`)
2. Copy the structure from an existing page
3. Update the header and footer placeholders
4. Add page-specific content
5. Link to it from the navigation menu in `components/header.html`

## 🎨 Customization

### Change Website Name & Logo

1. Replace logo image at `assets/images/logo.png`
2. Update footer text in `components/footer.html`
3. Update page titles in each HTML file

### Modify Header/Footer

1. Edit `components/header.html` for header changes
2. Edit `components/footer.html` for footer changes
3. Changes will automatically reflect on all pages

### Add Custom Styles

Add your custom CSS to `assets/css/style.css` or create a new CSS file:

```html
<link rel="stylesheet" href="assets/css/custom.css" />
```

### Add New JavaScript Functionality

Create a new JS file in `assets/js/` and include it in your HTML:

```html
<script src="assets/js/your-custom-script.js"></script>
```

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)
- ⚠️ IE11 (limited support)

## 📦 Dependencies

### CDN Libraries (Included via CDN)

- **Bootstrap 5.3.0** - Responsive framework
- **Font Awesome 6.4.0** - Icons
- **jQuery 3.6.0** - DOM manipulation (for component loading)
- **Google Fonts (Cairo)** - Typography

### No Build Tools Required!

This project uses pure HTML, CSS, and JavaScript - no compilation or build process needed.

## 🔧 Advanced Configuration

### Using a Backend API

To connect to a real backend API, modify `assets/js/products.js`:

```javascript
// Replace static data with API calls
async function getAllProducts() {
  const response = await fetch("https://your-api.com/products");
  return await response.json();
}
```

### Add Payment Gateway

In `checkout.html`, integrate with payment providers like:

- Stripe
- PayPal
- Square

Example with Stripe:

```javascript
// Add Stripe.js
<script src="https://js.stripe.com/v3/"></script>;

// Initialize Stripe
const stripe = Stripe("your_publishable_key");
```

## 🐛 Known Issues

1. **Image Placeholders**: Add your own product images to replace placeholders
2. **Price Range Slider**: Requires a library like noUiSlider for full functionality
3. **Payment Processing**: Checkout is demo only - integrate real payment gateway

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Your Name**

- Website: [yourwebsite.com](https://yourwebsite.com)
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Design inspiration from modern e-commerce websites
- Bootstrap team for the responsive framework
- Font Awesome for icons
- Google Fonts for typography

## 📞 Support

For support, email hello@organify.com or create an issue in the GitHub repository.

---

**Made with ❤️ and 🌿**

_Last Updated: December 2024_
