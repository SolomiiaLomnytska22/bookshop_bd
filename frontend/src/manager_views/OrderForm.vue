<template>
    <div class="overlay" v-if="show" @click.self="cancelEdit">
      <div class="edit-form">
      <h3>Edit Order #{{order.OrderID}}</h3>
      <form @submit.prevent="updateOrder">
        <!-- Post Service Select Dropdown -->
        <div class="form-group">
          <label for="post-office">Select Post Service:</label>
          <select v-model="editedOrder.PostServiceID" id="post-office" required>
            <option v-for="service in post_services" :key="service.PostServiceID" :value="service.PostServiceID">{{ service.Name }} - {{ service.StandardFee }}$</option>
          </select>
        </div>
        <!-- Status Select Dropdown -->
        <div class="form-group">
          <label for="status">Select Status:</label>
          <select v-model="editedOrder.Status" id="status" required>
            <option v-for="status in statuses" :key="status.StatusID" :value="status.StatusID">{{ status.StatusName }}</option>
          </select>
        </div>
        <!-- Customer Select Dropdown -->
        <div class="form-group">
          <label for="customer">Select Customer:</label>
          <select v-model="editedOrder.CustomerID" id="customer" required>
            <option v-for="customer in customers" :key="customer.CustomerID" :value="customer.CustomerID">{{ customer.FirstName }} {{ customer.LastName }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="comment">Comment:</label>
          <input type="text" v-model="editedOrder.Comment" id="customer" />
        </div>
        <div class="buttons">
          <button type="submit">Update Order</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
      </form>
    </div>
    </div>
  </template>
  
  <script>
  import { getPostServices } from '@/services/PostService';
  import { getAllCustomers } from '@/services/Customers';
  import { getStatuses } from '@/services/Status';
  export default {
    props: {
      order: {
        type: Object,
        required: true
      },
      show: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        editedOrder: { ...this.order },
        post_services: {},
        customers: {},
        statuses: {}
      };
    },
    watch:{
        order(){
            this.editedOrder = { ...this.order }
        }
    },
    async mounted(){
        this.post_services = await getPostServices()
        this.customers = await getAllCustomers()
        this.statuses = await getStatuses()
    },
    methods: {
      updateOrder() {
        this.$emit('update_order', this.editedOrder);
      },
      cancelEdit() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black */
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-form {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.edit-form label {
  margin-bottom: 5px;
  display: block;
}

.edit-form input,
.edit-form select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}
</style>