// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: JSON.parse(localStorage.getItem('cart')) || [], // Retrieve cart data from local storage
  },
  mutations: {
    addToCart(state, { bookId, quantity }) {
      const index = state.cart.findIndex(item => item.bookId === bookId);
      if (index !== -1) {
        // If book already exists in cart, update quantity
        state.cart[index].quantity += quantity;
      } else {
        // Otherwise, add new item to cart
        state.cart.push({ bookId, quantity });
      }
      // Update local storage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart(state, bookId) {
      state.cart = state.cart.filter((item) => {
        return item.bookId !== bookId
      });
      // Update local storage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart(state) {
      state.cart = [];
      // Update local storage
      localStorage.removeItem('cart');
    },
    updateCartItemQuantity(state, { bookId, quantity }) {
      const index = state.cart.findIndex(item => item.bookId === bookId);
      if (index !== -1) {
        // Update quantity
        state.cart[index].quantity = quantity;
        // Update local storage
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    }
  },
  actions: {},
  modules: {},
});
