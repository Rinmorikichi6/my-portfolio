const products = [
  { id: 1, name: 'Wireless Headphones', category: 'electronics', price: 129.99, emoji: '🎧' },
  { id: 2, name: 'Smart Watch Pro', category: 'electronics', price: 249.99, emoji: '⌚' },
  { id: 3, name: 'Urban Jacket', category: 'fashion', price: 89.99, emoji: '🧥' },
  { id: 4, name: 'Designer Sneakers', category: 'fashion', price: 119.99, emoji: '👟' },
  { id: 5, name: 'Minimal Desk Lamp', category: 'home', price: 54.99, emoji: '💡' },
  { id: 6, name: 'Ceramic Planter Set', category: 'home', price: 39.99, emoji: '🪴' },
  { id: 7, name: '4K Webcam', category: 'electronics', price: 99.99, emoji: '📷' },
  { id: 8, name: 'Linen Shirt', category: 'fashion', price: 49.99, emoji: '👔' }
];

let cart = JSON.parse(localStorage.getItem('shopsphere-cart') || '[]');
let activeCategory = 'all';

const productGrid = document.getElementById('productGrid');
const cartPanel = document.getElementById('cartPanel');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const overlay = document.getElementById('overlay');

function saveCart() {
  localStorage.setItem('shopsphere-cart', JSON.stringify(cart));
}

function formatPrice(n) {
  return `$${n.toFixed(2)}`;
}

function renderProducts() {
  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  productGrid.innerHTML = filtered.map(p => `
    <article class="product-card" data-id="${p.id}">
      <div class="product-img">${p.emoji}</div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p>${p.category.charAt(0).toUpperCase() + p.category.slice(1)}</p>
        <p class="product-price">${formatPrice(p.price)}</p>
        <button class="btn btn-primary btn-block add-cart" data-id="${p.id}">Add to Cart</button>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', () => addToCart(Number(btn.dataset.id)));
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ ...product, qty: 1 });
  saveCart();
  updateCartUI();
  openCart();
}

function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = count;

  if (!cart.length) {
    cartItems.innerHTML = '<li class="empty-cart">Your cart is empty</li>';
    cartTotal.textContent = '$0.00';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <li class="cart-item">
      <span>${item.emoji} ${item.name} x${item.qty}</span>
      <span>${formatPrice(item.price * item.qty)}</span>
    </li>
  `).join('');

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartTotal.textContent = formatPrice(total);
}

function openCart() {
  cartPanel.classList.add('open');
  overlay.classList.add('active');
  cartPanel.setAttribute('aria-hidden', 'false');
}

function closeCart() {
  cartPanel.classList.remove('open');
  overlay.classList.remove('active');
  cartPanel.setAttribute('aria-hidden', 'true');
}

document.getElementById('categoryFilters').addEventListener('click', e => {
  const pill = e.target.closest('.pill');
  if (!pill) return;
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  pill.classList.add('active');
  activeCategory = pill.dataset.category;
  renderProducts();
});

document.getElementById('cartToggle').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (!cart.length) return;
  alert('Checkout complete! Thank you for shopping with ShopSphere.');
  cart = [];
  saveCart();
  updateCartUI();
  closeCart();
});

const authModal = document.getElementById('authModal');
document.getElementById('authBtn').addEventListener('click', () => authModal.classList.add('open'));
document.getElementById('closeAuth').addEventListener('click', () => authModal.classList.remove('open'));
document.getElementById('authForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Signed in successfully!');
  authModal.classList.remove('open');
});

document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('nav').classList.toggle('open');
});

renderProducts();
updateCartUI();
