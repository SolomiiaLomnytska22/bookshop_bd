<template>
  <div class="orders-table">
    <Table :items="orders_data" @edit="editOrder" @delete="showConfirmation" @more="openMoreInfo"></Table>
    <confirmation-dialog :show="showConfirmationDialog" :message="message" @confirm="deleteOrder" @close="showConfirmationDialog = false" />
    <OrderPopover :show="show_more" :data="details_item" @close="show_more = false"></OrderPopover>

  </div>
</template>

<script>
import Table from '../components/common/Table.vue'
import { getAllOrders, deleteOrder } from '../services/Orders'
import { getCustomerByID } from '@/services/Customers';
import ConfirmationDialog from '../components/common/Confirm.vue';
import OrderPopover from '@/components/common/OrderPopover.vue';
import { getPostServiceById } from '@/services/PostService';
import { getStatusById } from '@/services/Status'


export default {
  components: {
    Table,
    ConfirmationDialog,
    OrderPopover
  },
  data (){
    return {
      orders_data: [],
      message: 'Do you want to delete order?',
      showConfirmationDialog: false,
      delete_item: {},
      details_item: null,
      show_more: false
    }
  },
  async mounted() {
    const response = await getAllOrders()
    this.orders_data = response
    this.orders_data.forEach(async (item)=>{
      const customer = await getCustomerByID(item.CustomerID)
      item.CustomerName = customer.FirstName + ' ' + customer.LastName
      const post = await getPostServiceById(item.PostServiceID)
      item.PostServiceName = post.Name
      const status = await getStatusById(item.Status)
      item.StatusName = status.StatusName
    })
    console.log(this.orders_data)
  },
  methods: {
    editOrder(){

    },
    showConfirmation(data) {
      this.delete_item = data
      this.showConfirmationDialog = true;
    },
    async deleteOrder(){
      this.showConfirmationDialog = false;
      try {
        const res = await deleteOrder(this.delete_item.OrderID)
        if (res) {
          this.orders_data = await getAllOrders() 
          this.$notify({title: 'Success!', text: 'Successfully removed order.', type: 'success'})
        }
      } catch (error) {
        console.log(error)
      }
    },
    async openMoreInfo(data){
      this.show_more = true
      this.details_item = data
    }

  }
}
</script>

<style>
.orders-table{
    margin-top: 120px;
    padding: 5%;
    display: flex;
    justify-content: center;
}
</style>