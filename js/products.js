// products.js
// Handles adding products to the cart using localStorage.

function getCart() {
  const stored = localStorage.getItem("cartItems");
  return stored ? JSON.parse(stored) : [];
}

function saveCart(cart) {
  localStorage.setItem("cartItems", JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
}

function setupAddToCartButtons() {
  const buttons = document.querySelectorAll(".btn-add-to-cart");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest("[data-id]");
      const id = card.getAttribute("data-id");
      const name = card.getAttribute("data-name");
      const price = Number(card.getAttribute("data-price"));

      addToCart({ id, name, price });
      alert(`${name} added to cart`);
    });
  });
}

document.addEventListener("DOMContentLoaded", setupAddToCartButtons);
