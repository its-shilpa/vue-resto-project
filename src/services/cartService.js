const CART_KEY = "cart";

export default {
  getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  },

  addToCart(item) {
     const cart = this.getCart();
    const existing = cart.find(
        i => i.name === item.name && i.restaurant === item.restaurant
    );

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
        ...item,
        qty: 1
        });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    },

  removeFromCart(id) {
    const cart = this.getCart().filter(i => i.id !== id);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    },

  removeDishFromAllCarts(dishName, restaurantName) {
    const cart = this.getCart().filter(i => !(i.name === dishName && i.restaurant === restaurantName));
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },

  clearCart() {
    localStorage.removeItem(CART_KEY);
  },

  getCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.qty, 0);
  },

  // ✅ ADD THIS
  getTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => {
      return total + (item.price * item.qty);
    }, 0);
  }
};