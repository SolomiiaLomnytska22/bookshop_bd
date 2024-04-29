<template>
  <div class="orders-wrapper">
    <h1>Your Orders:</h1>
    <div class="orders">
      <div v-for="order in orders" :key="order.id" class="order">
        <h2>Order ID: {{ order.OrderID }}</h2>
        <p>Status: {{ order.Status }}</p>
        <p>Formation Date: {{ order.CreationDate }}</p>
        <button v-if="order.OrderItems.length" @click="order.showItems = !order.showItems">
          {{ order.showItems ? 'Hide' : 'Show' }} Items
        </button>
        <ul v-if="order.showItems">
          <li v-for="item in order.OrderItems" :key="item.OrderItemID">
            {{ item.StorageBookID }} - {{ item.Quantity }} - {{ item.TotalItemPrice }}
          </li>
        </ul>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import { getAllOrdersByUserID } from '../services/Orders';
  import { getCustomerByUsername } from '../services/Customers';
  import { getUsername } from '../services/getAccessToken';

  export default {
    data() {
      return {
        orders: [],
        customer_id: null
      };
    },
    async mounted() {
      const customer_data = await getCustomerByUsername(getUsername() ?? null);
      this.customer_id = customer_data.CustomerID
      const orders = await getAllOrdersByUserID(this.customer_id);
      this.orders = orders;
      console.log(this.orders)
    },
  };
  </script>
  
  <style scoped>
  .orders-wrapper{
    margin-top: 150px;
    text-align: center;
  }
  .orders {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px;
  }
  .order {
    border: 2px solid #3f1f1f;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 10px;
    padding: 20px;
    max-width: 300px;
    width: calc(50% - 20px); /* Two items in a row */
    background-color: #f8f9fa;
  }
  h2 {
    color: #3f1f1f;
    margin-bottom: 10px;
  }
  p {
    margin: 5px 0;
  }
  button {
    background-color: #3f1f1f;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  button:hover {
    background-color: #1e1e1e;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin-top: 10px;
  }
  li {
    margin: 5px 0;
  }

  /* Media query for smaller screens */
  @media (max-width: 600px) {
    .order {
      width: calc(100% - 20px); /* One item per row */
    }
  }
</style>
