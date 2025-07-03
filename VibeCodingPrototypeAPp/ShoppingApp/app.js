// Fruit Shop Prototype App

const PRODUCTS = [
  { id: 1, name: 'Apple', emoji: '🍎', description: 'Crisp, sweet apples.', price: 1.0, unit: 'each' },
  { id: 2, name: 'Banana', emoji: '🍌', description: 'Fresh bananas.', price: 0.5, unit: 'each' },
  { id: 3, name: 'Orange', emoji: '🍊', description: 'Juicy oranges.', price: 0.8, unit: 'each' },
  { id: 4, name: 'Grapes', emoji: '🍇', description: 'Seedless grapes.', price: 2.5, unit: 'lb' },
  { id: 5, name: 'Strawberry', emoji: '🍓', description: 'Sweet strawberries.', price: 3.0, unit: 'lb' },
  { id: 6, name: 'Watermelon', emoji: '🍉', description: 'Refreshing watermelon.', price: 5.0, unit: 'each' },
  { id: 7, name: 'Pineapple', emoji: '🍍', description: 'Tropical pineapple.', price: 2.0, unit: 'each' },
  { id: 8, name: 'Lemon', emoji: '🍋', description: 'Tangy lemons.', price: 0.6, unit: 'each' },
  { id: 9, name: 'Peach', emoji: '🍑', description: 'Juicy peaches.', price: 1.2, unit: 'each' },
  { id: 10, name: 'Mango', emoji: '🥭', description: 'Delicious mangoes.', price: 1.5, unit: 'each' }
];

const NAV = [
  { key: 'products', label: 'Products', emoji: '🍏', abbr: 'PR' },
  { key: 'details', label: 'ProductDetails', emoji: '🔍', abbr: 'PD' },
  { key: 'cart', label: 'ShoppingCart', emoji: '🛒', abbr: 'SC' },
  { key: 'checkout', label: 'Checkout', emoji: '💳', abbr: 'CO' }
];

let state = {
  page: 'products',
  selectedProduct: null,
  cart: []
};

function renderNav() {
  const collapsed = window.innerWidth < 600;
  return `
    <nav class="${collapsed ? 'collapsed' : ''}">
      ${NAV.map(item => `
        <a class="nav-link${state.page === item.key ? ' active' : ''}" data-page="${item.key}">
          <span class="emoji">${item.emoji}</span>${collapsed ? '' : `<span>${item.label}</span>`}
        </a>
      `).join('')}
    </nav>
  `;
}

function renderProducts() {
  return `
    <div class="main-content">
      <h2>Products</h2>
      <div class="product-list">
        ${PRODUCTS.map(product => `
          <div class="product-card">
            <div class="emoji">${product.emoji}</div>
            <div><strong>${product.name}</strong></div>
            <div>$${product.price.toFixed(2)} / ${product.unit}</div>
            <button class="button" data-action="details" data-id="${product.id}">View Details</button>
            <div style="margin-top:0.5em;">
              <input type="number" min="1" value="1" class="qty-input" data-id="${product.id}" style="width:50px;" />
              <button class="button" data-action="add" data-id="${product.id}">Add to Cart</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderProductDetails() {
  const product = PRODUCTS.find(p => p.id === state.selectedProduct);
  if (!product) return '<div class="main-content">Product not found.</div>';
  return `
    <div class="main-content">
      <h2>Product Details</h2>
      <div class="product-card" style="width:300px;">
        <div class="emoji">${product.emoji}</div>
        <div><strong>${product.name}</strong></div>
        <div>${product.description}</div>
        <div>Price: $${product.price.toFixed(2)} / ${product.unit}</div>
        <div style="margin-top:0.5em;">
          <input type="number" min="1" value="1" class="qty-input" data-id="${product.id}" style="width:50px;" />
          <button class="button" data-action="add" data-id="${product.id}">Add to Cart</button>
        </div>
        <button class="button" data-action="back">Back to Products</button>
      </div>
    </div>
  `;
}

function renderCart() {
  if (state.cart.length === 0) {
    return `<div class="main-content"><h2>Shopping Cart</h2><p>Your cart is empty.</p></div>`;
  }
  let total = 0;
  return `
    <div class="main-content">
      <h2>Shopping Cart</h2>
      <table class="cart-list">
        <tr><th>Product</th><th>Qty</th><th>Price</th><th></th></tr>
        ${state.cart.map(item => {
          const product = PRODUCTS.find(p => p.id === item.id);
          const itemTotal = product.price * item.qty;
          total += itemTotal;
          return `<tr>
            <td>${product.emoji} ${product.name}</td>
            <td><input type="number" min="1" value="${item.qty}" class="cart-qty" data-id="${item.id}" style="width:40px;" /></td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td><button class="button" data-action="remove" data-id="${item.id}">Remove</button></td>
          </tr>`;
        }).join('')}
      </table>
      <div><strong>Total: $${total.toFixed(2)}</strong></div>
      <button class="button" data-action="checkout">Proceed to Checkout</button>
    </div>
  `;
}

function renderCheckout() {
  if (state.cart.length === 0) {
    return `<div class="main-content"><h2>Checkout</h2><p>Your cart is empty.</p></div>`;
  }
  let total = 0;
  return `
    <div class="main-content">
      <h2>Checkout</h2>
      <table class="checkout-list">
        <tr><th>Product</th><th>Qty</th><th>Price</th></tr>
        ${state.cart.map(item => {
          const product = PRODUCTS.find(p => p.id === item.id);
          const itemTotal = product.price * item.qty;
          total += itemTotal;
          return `<tr>
            <td>${product.emoji} ${product.name}</td>
            <td>${item.qty}</td>
            <td>$${itemTotal.toFixed(2)}</td>
          </tr>`;
        }).join('')}
      </table>
      <div><strong>Total: $${total.toFixed(2)}</strong></div>
      <button class="button" data-action="process">Process Order</button>
    </div>
  `;
}

function renderApp() {
  let html = renderNav();
  switch (state.page) {
    case 'products':
      html += renderProducts();
      break;
    case 'details':
      html += renderProductDetails();
      break;
    case 'cart':
      html += renderCart();
      break;
    case 'checkout':
      html += renderCheckout();
      break;
    default:
      html += '<div class="main-content">Page not found.</div>';
  }
  document.getElementById('app').innerHTML = html;
  attachEvents();
}

function attachEvents() {
  // Navigation
  document.querySelectorAll('nav .nav-link').forEach(link => {
    link.onclick = e => {
      const page = link.getAttribute('data-page');
      if (page === 'details' && !state.selectedProduct) return;
      state.page = page;
      renderApp();
    };
  });
  // Product details
  document.querySelectorAll('[data-action="details"]').forEach(btn => {
    btn.onclick = e => {
      state.selectedProduct = parseInt(btn.getAttribute('data-id'));
      state.page = 'details';
      renderApp();
    };
  });
  // Add to cart
  document.querySelectorAll('[data-action="add"]').forEach(btn => {
    btn.onclick = e => {
      const id = parseInt(btn.getAttribute('data-id'));
      const qtyInput = document.querySelector(`.qty-input[data-id="${id}"]`);
      const qty = Math.max(1, parseInt(qtyInput.value) || 1);
      const existing = state.cart.find(item => item.id === id);
      if (existing) {
        existing.qty += qty;
      } else {
        state.cart.push({ id, qty });
      }
      renderApp();
    };
  });
  // Back to products
  const backBtn = document.querySelector('[data-action="back"]');
  if (backBtn) {
    backBtn.onclick = () => {
      state.page = 'products';
      renderApp();
    };
  }
  // Remove from cart
  document.querySelectorAll('[data-action="remove"]').forEach(btn => {
    btn.onclick = e => {
      const id = parseInt(btn.getAttribute('data-id'));
      state.cart = state.cart.filter(item => item.id !== id);
      renderApp();
    };
  });
  // Update cart qty
  document.querySelectorAll('.cart-qty').forEach(input => {
    input.onchange = e => {
      const id = parseInt(input.getAttribute('data-id'));
      const qty = Math.max(1, parseInt(input.value) || 1);
      const item = state.cart.find(i => i.id === id);
      if (item) item.qty = qty;
      renderApp();
    };
  });
  // Proceed to checkout
  const checkoutBtn = document.querySelector('[data-action="checkout"]');
  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      state.page = 'checkout';
      renderApp();
    };
  }
  // Process order
  const processBtn = document.querySelector('[data-action="process"]');
  if (processBtn) {
    processBtn.onclick = () => {
      alert('Thank you for your order!');
      state.cart = [];
      state.page = 'products';
      renderApp();
    };
  }
}

window.addEventListener('resize', () => {
  renderApp();
});

window.onload = renderApp;
