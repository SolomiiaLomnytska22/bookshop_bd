<template>
    <div class="order-success-page">
      <h2>Order Successfully Added!</h2>
      <p>Your order has been successfully added. Thank you for your purchase!</p>
      <div>
        <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3Jrc2htYWVhYnpnc3U5OHhhMDRqcW82b3htZ3h0eGszaGl6MDlzdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tHIRLHtNwxpjIFqPdV/giphy.gif" alt="">
      </div>
      <router-link to="/orders" class="button">View My Orders</router-link>
    </div>
  </template>
  
  <script>
  export default {
  };
  </script>
  
  <style scoped>
  .order-success-page {
    text-align: center;
    margin-top: 150px;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 16px;
    margin-bottom: 30px;
  }
  
  .button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #3f1f1f;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .button:hover {
    background-color: #0056b3;
  }
  </style>
  