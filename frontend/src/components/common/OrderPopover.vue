<template>
    <div v-if="show" class="confirmation-dialog"  @click="$emit('close')">
      <div class="dialog-content"  @click.stop="">
        <h2>Customer Details</h2>
        <div class="form-group">
        <label for="firstName">First Name:</label>
        <span v-if="!editMode">{{ customer_data.FirstName }}</span>
        <input v-if="editMode" type="text" id="firstName" v-model="customer_data.FirstName" required>
        </div>
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <span v-if="!editMode">{{ customer_data.LastName }}</span>
          <input v-if="editMode" type="text" id="lastName" v-model="customer_data.LastName" required>
        </div>
        <div class="form-group">
          <label for="phoneNumber">Phone Number:</label>
          <span v-if="!editMode">{{ customer_data.PhoneNumber }}</span>
          <input v-if="editMode" type="text" id="phoneNumber" v-model="customer_data.PhoneNumber" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <span v-if="!editMode">{{ customer_data.Email }}</span>
          <input v-if="editMode" type="email" id="email" v-model="customer_data.Email">
        </div>

        <h2>Customer Address</h2>
        <div class="form-group">
          <label for="country">Country:</label>
          <span v-if="!editMode">{{ customer_address.Country }}</span>
          <input v-if="editMode" type="text" id="country" v-model="customer_address.Country" required>
        </div>
        <div class="form-group">
          <label for="city">City:</label>
          <span v-if="!editMode">{{ customer_address.City }}</span>
          <input v-if="editMode" type="text" id="city" v-model="customer_address.City" required>
        </div>
        <div class="form-group">
          <label for="address">Address:</label>
          <span v-if="!editMode">{{ customer_address.Address }}</span>
          <input v-if="editMode" type="text" id="address" v-model="customer_address.Address" required>
        </div>
        <div class="form-group">
          <label for="zipcode">ZIP Code:</label>
          <span v-if="!editMode">{{ customer_address.ZIPCode }}</span>
          <input v-if="editMode" type="text" id="zipcode" v-model="customer_address.ZIPCode" required>
        </div>

        <h2 v-if="order_items.length > 0">Order Items</h2>
        <div v-if="order_items.length > 0">
          <div v-for="(item, index) in order_items" :key="index" class="order-item">
            <div class="form-group">
              <img :src="cover_image(item.StorageBookID)" :alt="item.StorageBookID" class="book-cover">
            </div>
            <div class="order_item_details">  
              <div class="form-group">
                <label>Quantity:</label>
                <span v-if="!editMode">{{ item.Quantity }}</span>
                <input v-if="editMode" type="number" v-model="item.Quantity" min="1" required>
              </div>
              <div class="form-group">
                <label> Item Price:</label>
                <span>{{ item.TotalItemPrice }}</span>
              </div>
            </div>
          
            <button v-if="editMode" @click="removeOrderItem(item.OrderItemID)">Remove</button>
          </div>
        </div>
        
        <div class="actions">
          <button v-if="!editMode" @click="toggleEditMode">Edit</button>
          <button v-if="editMode" @click="saveChanges">Save</button>
          <button v-if="editMode" @click="cancelChanges">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getCustomerByID, updateCustomer } from '../../services/Customers'
  import { getCustomerAddressByCustomerID, updateAddress } from '../../services/CustomerAddress'
  import { getAllOrderItemsByOrderID, updateOrderItem, deleteOrderItem } from '@/services/OrderItems';
  import { getBookStorageItemByID } from '../../services/BookStorage'
  import { getBookByISBN } from '../../services/Book';
  export default {
    watch: {
    async data(newVal, oldVal) {
      if (newVal !== oldVal) {
        await this.getData()
      }
    },
  },
    props: {
      data: Object,
      show: Boolean, 
    },
    async mounted(){
      if(this.data && this.data.CustomerID){
        await this.getData()
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      toggleEditMode() {
        this.editMode = !this.editMode;
      },
      async saveChanges() {
        console.log('Saving changes:', this.customer_data, this.customer_address);
        await updateCustomer(this.data.CustomerID, this.customer_data);
        await updateAddress(this.customer_address.AddressID, this.customer_address);
        for(const item of this.order_items){
          console.log(item)
          await updateOrderItem(item.OrderItemID, item)
        }
        await this.getData()
        this.toggleEditMode();
      }, 
      async cancelChanges(){
        await this.getData()
        this.toggleEditMode();
      },
      async getData(){
        this.customer_data = await getCustomerByID(this.data.CustomerID);
        this.customer_address = await getCustomerAddressByCustomerID(this.customer_data.CustomerID);
        this.order_items = await getAllOrderItemsByOrderID(this.data.OrderID)
        this.covers = await Promise.all(this.order_items.map(async (item) => {
          const coverURL = await this.getCoverPicture(item.StorageBookID);
          return {
            coverURL: coverURL,
            storageBookID: item.StorageBookID
          };
        }));
      },
      async getCoverPicture(StorageBookID){
        const book_storage = await getBookStorageItemByID(StorageBookID)
        const book = await getBookByISBN(book_storage.ISBN)
        return book.CoverImageURL || 'https://th.bing.com/th/id/OIP.P-nIodv7WzkQ4wYYPsXWaQAAAA?rs=1&pid=ImgDetMain'
      },
      cover_image(StorageBookID){
        const coverURL = this.covers?.find(item => item.storageBookID === StorageBookID);
        return coverURL ? coverURL.coverURL : '';
      },
      async removeOrderItem(index){
        await deleteOrderItem(index)
        this.order_items = this.order_items.filter(item => item.OrderItemID !== index);
      }
    },
    data (){
      return{
        customer_data: {},
        customer_address: {},
        order_items: [],
        editMode: false,
        covers: null
      }
    }
  };
  </script>
  
  <style scoped>
.confirmation-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.dialog-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  height: 70%;
  width: 70%;
  max-width: 500px;
  overflow-y: auto;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

button:first-child {
  background-color: #3f1f1f; /* Updated accent color */
  color: white;
}

button:last-child {
  background-color: #ddd;
  color: black;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-right: 10px;
}

input[type="text"],
input[type="email"],
input[type="number"] {
  width: calc(100% - 10px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="number"]:focus {
  outline: none;
  border-color: #3f1f1f; /* Updated accent color */
}

h2 {
  margin-top: 20px;
  margin-bottom: 10px;
}

.order-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.book-cover {
  height: 100px;
  margin-right: 20px;
}

.order_item_details{
  display: flex;
  flex-direction: column;
}
  </style>