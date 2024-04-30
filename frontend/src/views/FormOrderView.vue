<template>
  <div class="order-form">
    <h2>Lets Create Your Order!</h2>
    <div class="form-wrap">
    <h3 @click="open_user_data=!open_user_data">Enter Your Data</h3>
    <form  @submit.prevent="" v-if="open_user_data">
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="customer_data.FirstName" required>
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="customer_data.LastName" required>
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone Number:</label>
        <input type="text" id="phoneNumber" v-model="customer_data.PhoneNumber" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="customer_data.Email">
      </div>
    </form>
    </div>
    <div class="form-wrap">
      <h3 @click="open_address_data=!open_address_data">Enter Address Details</h3>
      <form @submit.prevent="" v-if="open_address_data">
        <div class="form-group">
          <label for="country">Country:</label>
          <input type="text" id="country" v-model="customer_address.Country" required>
        </div>
        <div class="form-group">
          <label for="city">City:</label>
          <input type="text" id="city" v-model="customer_address.City" required>
        </div>
        <div class="form-group">
          <label for="address">Address:</label>
          <input type="text" id="address" v-model="customer_address.Address" required>
        </div>
        <div class="form-group">
          <label for="zipcode">ZIP Code:</label>
          <input type="text" id="zipcode" v-model="customer_address.ZIPCode" required>
        </div>
        <div class="form-group">
          <label for="post-office">Select Your Post Service:</label>
          <select v-model="order_data.PostServiceID" id="post-office" required>
            <option v-for="service in post_services" :key="service.PostServiceID" :value="service.PostServiceID">{{ service.Name }} - {{ service.StandardFee }}$</option>
          </select>
        </div>
      </form>
      <div class="form-group" style="margin-top: 40px;">
        <label for="comment">Comment:</label>
        <input type="text" id="comment" v-model="order_data.Comment">
      </div>
    </div>
    <button @click="save">Confirm Order</button>
  </div>
</template>

<script>
import { getCustomerByUsername, updateCustomer } from '../services/Customers';
import { getCustomerAddressByCustomerID, updateAddress } from '../services/CustomerAddress';
import { getPostServices } from '../services/PostService';
import { getUsername } from '../services/getAccessToken';
import { addOrder } from '../services/Orders';
import { addOrderItem } from '../services/OrderItems';
import { getBookStorageItemByISBN } from '../services/BookStorage'

export default {
  async mounted() {
    if (this.username) {
      try {
        // Fetch customer data
        this.customer_data = await getCustomerByUsername(this.username);
        console.log(this.customer_data);
        
        // Fetch customer address using CustomerID
        this.customer_address = await getCustomerAddressByCustomerID(this.customer_data.CustomerID);
        
        // Fetch post services
        this.post_services = await getPostServices();
        console.log(this.post_services);
      } catch (error) {
        console.error(error);
  }
  
    }
  },
  data() {
    return {
      open_user_data: true,
      open_address_data: true,
      username: getUsername() ?? null,
      customer_data: {},
      customer_address: {},
      order_data: {},
      order_items: [],
      post_services: []
    };
  },
  methods: {
    async save() {
      try {
        // Update customer data
        const updatedCustomerData = await updateCustomer(this.customer_data.CustomerID, this.customer_data);
        console.log(updatedCustomerData);

        // Update customer address
        const updatedAddressData = await updateAddress(this.customer_address.AddressID, this.customer_address);
        console.log(updatedAddressData);

        // Prepare order data
        this.order_data.CustomerID = this.customer_data.CustomerID;
        this.order_data.Status = 1;
        this.order_data.CreationDate = new Date();
        console.log(this.order_data);

        // Add order
        const addedOrder = await addOrder(this.order_data);
        console.log(addedOrder);

        // Add order items
        for (const item of this.$store.state.cart) {
          const bookStorageData = await getBookStorageItemByISBN(item.bookId);
          console.log(bookStorageData);

          const request_data = {
            OrderID: addedOrder.OrderID,
            StorageBookID: bookStorageData.StorageBookID,
            Quantity: item.quantity
          };
          await addOrderItem(request_data);
        }
        this.$store.commit('clearCart')
        this.$router.push('/success')
      } catch (error) {
        this.$notify({title: 'Error!', text: 'Error occured while adding your order. Please, try again later!', type: 'error'})
      }
    }
  }
};
</script>

<style scoped>
.order-form {
  margin: 120px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-wrap {
  display: flex;
  flex-direction: column;
  width: 50%;
}
h2 {
  font-size: 24px;
  margin-bottom: 20px;
}
h3 {
  text-decoration: underline;
  cursor: pointer;
}
.form-group {
  margin-bottom: 15px;
}
label {
  font-weight: bold;
}
input[type="text"],
input[type="email"],
select { /* Applied style to select as well */
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
input[type="text"]:focus,
input[type="email"]:focus,
select:focus { /* Added style for focus */
  outline: none;
  border-color: #3f1f1f;
}
input[type="text"]:invalid,
input[type="email"]:invalid { /* Added style for invalid input */
  border-color: red;
}
select { /* Added style for select dropdown */
  padding-right: 30px; /* Adjusted padding to accommodate the arrow icon */
}

form {
  background-color: #ececec;
  padding: 20px;
  border-radius: 5px;
}
</style>

