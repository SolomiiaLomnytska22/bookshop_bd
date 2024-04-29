<template>
  <div class="shopping-cart">
    <h2>Shopping Cart</h2>
    <div class="empty-cart" v-if="cartItems.length === 0">
      <p>Your cart is empty.</p>
      <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXg1aDRxb3hxYm9zMjBqdW1wNHJzdHYzM2RmdnZjanBtNTBsaXptOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/giXLnhxp60zEEIkq8K/giphy.gif" alt="">
    </div>
    <div v-else class="cart-items">
      <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
        <div class="book-details">
          <h3 @click="$router.push(`/details/${item.bookId}`)">{{ item.title }}</h3>
          <div class="quantity-container">
            Quantity:
            <input type="number" v-model="item.quantity" @change="updateQuantity(item.bookId, item.quantity)">
          </div>
          <div class="price">
           {{ itemPrice(item) }}$
          </div>
          <button @click="removeFromCart(item.bookId)">Remove</button>
        </div>
      </div>
      <div class="cart-actions">
        <h3>Your Total: {{ totalPrice }}$</h3>
        <button class="secondary" @click="clearCart">Clear Cart</button>
        <button @click="formOrder">Check Out</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getBookByISBN } from '@/services/Book';
export default {
  mounted(){
    this.cartItems.forEach((item)=>{
      getBookByISBN(item.bookId).then((data)=> {
        item.title = data.Title
        item.unit_price = data.Price
      }).catch((error) => {
        console.log(error);
      })
    })
  },
  data(){
    return {
      
    }
  },
  computed: {
    cartItems() {
      return this.$store.state.cart
    },
    totalPrice(){
      let res = 0
      for (const item of this.cartItems)
      {
        res+=this.itemPrice(item)
      }
      return res
    }
  },
  methods: {
    updateQuantity(bookId, quantity) {
      this.$store.commit('updateCartItemQuantity', { bookId, quantity });
    },
    removeFromCart(bookId) {
      this.$store.commit('removeFromCart', bookId);
    },
    clearCart() {
      this.$store.commit('clearCart');
    },
    formOrder() {
      this.$router.push('/form-order')
    },
    itemPrice(item){
      return item.unit_price * item.quantity
    }
  }
};
</script>

<style scoped>
.shopping-cart {
  margin-top: 120px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.cart-items{
  width: 100%;
  margin: 10px;
  padding: 0 5%;
  box-sizing: border-box;
}
.cart-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding: 10px;
}

.book-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quantity-container {
  display: flex;
  align-items: center;
}

input[type="number"] {
  width: 50px;
  padding: 5px;
  margin-left: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 8px 15px;
  background-color: #3f1f1f;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #241212;
}

.cart-actions {
  margin-top: 20px;
}

.cart-actions button {
  margin-right: 10px;
}

.secondary{
  background-color: #ffffff;
  color: #3f1f1f;
  border: solid 1px;
}

.secondary:hover{
  background-color: #a0a0a0;
 
}

.empty-cart{
  text-align: center;
  margin-bottom: 50px;
}
</style>