// cart.js
// Reads cart items from localStorage, renders them, and allows removal.

function getCart() {
  const stored = localStorage.getItem("cartItems");
  return stored ? JSON.parse(stored) : [];
}

function saveCart(cart) {
  localStorage.setItem("cartItems", JSON.stringify(cart));
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const cart = getCart();

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "€0";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const article = document.createElement("article");
    article.className = "cart-item";
    article.dataset.id = item.id;

    article.innerHTML = `
      <span class="cart-item-name">€{item.name} (x€{item.quantity})</span>
      <span class="cart-item-price">€€{itemTotal}</span>
      <button class="cart-item-remove">Remove</button>
    `;

    container.appendChild(article);
  });

  totalEl.textContent = `€€{total}`;
}

function setupCartEvents() {
  const container = document.getElementById("cart-items");

  container.addEventListener("click", (event) => {
    if (!event.target.classList.contains("cart-item-remove")) return;

    const article = event.target.closest(".cart-item");
    const id = article.dataset.id;

    let cart = getCart();
    cart = cart.filter((item) => item.id !== id);
    saveCart(cart);
    renderCart();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  setupCartEvents();
});
