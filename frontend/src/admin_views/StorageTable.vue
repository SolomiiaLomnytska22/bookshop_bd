<template>
    <div class="table-page">
        <div class="tables">
            <div class="header">
                <h2>Manage Your Storage:</h2>
                <div><button>Add New</button></div>
            </div>
            <div class="book_table"> 
                <Table :items="display_storage" :show_more="false" @delete="showConfirmationForStorage"></Table>
            </div>
        </div>
        <confirmation-dialog :show="showConfirmationDialog" :message="message" @confirm="completeDeletion" @close="showConfirmationDialog = false" />
    </div>
</template>

<script>
import Table from '../components/common/Table.vue'
import { deleteBook } from '../services/Book'
import { getAllStorageBooks, getBookStorageItemByID } from '../services/BookStorage'
import ConfirmationDialog from '../components/common/Confirm.vue'


export default {
    components:{
        Table,
        ConfirmationDialog
    },
    data(){
        return {
            display_storage: [],
            showConfirmationDialog: false,
            message: 'Do you want to delete the storage data?',
            target_item: {},
            delete_book: true,
            show_book_form: false
        }
    },
    async mounted(){
        await this.fetchData()
    },
    methods: {
        async fetchData(){
            try{
                this.display_storage = await getAllStorageBooks()    
                console.log(this.display_storage)           
            }catch(error){
                console.log(error)
            }
        },
        async showConfirmationForStorage(data){
            this.target_item = await getBookStorageItemByID(data.StorageBookID)
            this.showConfirmationDialog = true;
        },
        async completeDeletion(){
            if (this.delete_book){
                await this.deleteBook()
            } else {
                await this.deleteStorageItem()
            }
        },
        async deleteBook(){
            this.showConfirmationDialog = false;
            try {
                const res = await deleteBook(this.target_item.ISBN)
                if (res) {
                    await this.fetchData()
                    this.$notify({title: 'Success!', text: 'Successfully removed book.', type: 'success'})
                }
            } catch (error) {
                console.log(error)
            }
        },
        async deleteStorageItem(){
            this.showConfirmationDialog = false;
            try {
                const res = await this.deleteStorageItem(this.target_item.StorageBookID)
                if (res) {
                    await this.fetchData()
                    this.$notify({title: 'Success!', text: 'Successfully removed book.', type: 'success'})
                }
            } catch (error) {
                console.log(error)
            }
        },
        openBookForm(data){
            this.target_item = data
            this.show_book_form = true
        }
    }

}
</script>

<style scoped>
.table-page{
    margin-top: 120px;
}
.tables{
  padding: 5%;
}
.book_table {
  margin-bottom: 5%;
  overflow-x: auto;
}

Table{
    width: 100%;
}
.header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    box-sizing: border-box;
    align-items: center;
}

button {
    background-color: #3f1f1f;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    opacity: 0.8;
  }

</style>