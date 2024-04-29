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

        <h2>Order Items</h2>
        
        
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
  export default {
    watch: {
    async data(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.customer_data = await getCustomerByID(this.data.CustomerID);
        this.customer_address = await getCustomerAddressByCustomerID(this.customer_data.CustomerID);
      }
    },
  },
    props: {
      data: Object,
      show: Boolean, 
    },
    async mounted(){
      if(this.data && this.data.CustomerID){
        this.customer_data = await getCustomerByID(this.data.customerID);
        this.customer_address = await getCustomerAddressByCustomerID(this.customer_data.CustomerID);
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
        this.toggleEditMode();
      }, 
      async cancelChanges(){
        this.customer_data = await getCustomerByID(this.data.CustomerID);
        this.customer_address = await getCustomerAddressByCustomerID(this.customer_data.CustomerID);
        this.toggleEditMode();
      }
    },
    data (){
      return{
        customer_data: {},
        customer_address: {},
        editMode: false
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
    z-index: 100; /* Ensure dialog is above other elements */
  }
  .dialog-content {
    background-color: white;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
  
  .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  
  button {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 5px;
  }
  
  button:first-child {
    background-color: #3f1f1f; /* Use your accent color */
    color: white;
  }
  
  button:last-child {
    background-color: #ddd;
    color: black;
  }
  </style>