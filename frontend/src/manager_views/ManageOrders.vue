<template>
  <div class="orders-table">
    <div class="header">
        <h2>Manage Orders:</h2>
        <div style="display:flex;align-items: center;">
          <button>Download As File</button>
        </div>
    </div>
    <Table class="table" :items="table_orders_data" @edit="editOrder" @delete="showConfirmation" @more="openMoreInfo"></Table>
    <confirmation-dialog :show="showConfirmationDialog" :message="message" @confirm="deleteOrder" @close="showConfirmationDialog = false" />
    <OrderPopover :show="show_more" :data="edit_item" @close="show_more = false"></OrderPopover>
    <OrderFormVue :show="show_edit_form" :order="edit_item" @close="show_edit_form=false" @update_order="updateOrder"></OrderFormVue>
  </div>
</template>

<script>
import Table from '../components/common/Table.vue'
import { getAllOrders, deleteOrder, getOrderByID, updateOrder } from '../services/Orders'
import { getCustomerByID } from '@/services/Customers';
import ConfirmationDialog from '../components/common/Confirm.vue';
import OrderPopover from '@/components/common/OrderPopover.vue';
import { getPostServiceById } from '@/services/PostService';
import { getStatusById } from '@/services/Status'
import OrderFormVue from './OrderForm.vue';


export default {
  components: {
    Table,
    ConfirmationDialog,
    OrderPopover,
    OrderFormVue
  },
  data (){
    return {
      orders_data: [],
      table_orders_data: [],
      message: 'Do you want to delete order?',
      showConfirmationDialog: false,
      edit_item: {},
      show_more: false,
      show_edit_form: false
    }
  },
  async mounted() {
    await this.setDisplayInfo()
    console.log(this.orders_data)
  },
  methods: {
    async setDisplayInfo(){
      const response = await getAllOrders()
      this.orders_data = response
      this.table_orders_data = this.orders_data.map(a => {return {...a}})
      this.table_orders_data.forEach(async (item)=>{
        const customer = await getCustomerByID(item.CustomerID)
        item.CustomerName = customer.FirstName + ' ' + customer.LastName
        const post = await getPostServiceById(item.PostServiceID)
        item.PostServiceName = post.Name
        const status = await getStatusById(item.Status)
        item.StatusName = status.StatusName
        delete item.CustomerID
        delete item.PostServiceID
        delete item.Status
      })
    },
    async editOrder(item){
      this.show_edit_form = true;
      this.edit_item = await getOrderByID(item.OrderID)
    },
    async updateOrder(data){
      this.show_edit_form = false;
      await updateOrder(data.OrderID, data)
    },
    async showConfirmation(data) {
      this.edit_item = await getOrderByID(data.OrderID)
      this.showConfirmationDialog = true;
    },
    async deleteOrder(){
      this.showConfirmationDialog = false;
      try {
        const res = await deleteOrder(this.edit_item.OrderID)
        if (res) {
          this.setDisplayInfo()
          this.$notify({title: 'Success!', text: 'Successfully removed order.', type: 'success'})
        }
      } catch (error) {
        console.log(error)
      }
    },
    async openMoreInfo(data){
      this.show_more = true
      this.edit_item = await getOrderByID(data.OrderID)
    }

  }
}
</script>

<style scoped>
.orders-table{
  margin-top: 120px;
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.table{
  width: 1000px;
}
.header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

button {
    background-color: #3f1f1f;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px;
    font-size: 16px;
  }
  
  button:hover {
    opacity: 0.8;
  }

</style>