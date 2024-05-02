<template>
    <div class="table-page">
        <div class="tables">
            <div class="header">
                <h2>Manage Your Books:</h2>
                <div><button @click="openBookForm">Add New</button></div>
            </div>
            <div class="book_table">
                <Table :items="display_data" :show_more="false" @edit="openBookForm" @delete="showConfirmationForBook"></Table>
            </div>
        </div>
        <BookForm :ISBN="target_item.ISBN" :show="show_book_form" @update_book="UpdateBook" @close="show_book_form=false"></BookForm>
        <confirmation-dialog :show="showConfirmationDialog" :message="message" @confirm="completeDeletion" @close="showConfirmationDialog = false" />
    </div>
</template>

<script>
import Table from '../components/common/Table.vue'
import { deleteBook, getBookByISBN, getBooks, updateBook } from '../services/Book'
import ConfirmationDialog from '../components/common/Confirm.vue'
import BookForm from './BookForm.vue'
import { getAuthorsByISBN } from '../services/Author'
import { addBooks_Authors, deleteBooks_Authors } from '../services/Books_Authors'

export default {
    components:{
        Table,
        ConfirmationDialog,
        BookForm
    },
    data(){
        return {
            display_data: [],
            showConfirmationDialog: false,
            message: 'Do you want to delete the book data?',
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
                this.display_data =  await getBooks()
                this.display_data.forEach(async (book)=>{
                    delete book.PublisherID
                    delete book.Price
                    book.AuthorNames = book.AuthorNames?.join(', ')
                    book.Genres = book.Genres?.join(', ')
                    book.Description = book.Description.slice(0, 30) + '...'
                    book.CoverImageURL = book.CoverImageURL.slice(0, 30) + '...'
                    book.Title = book.Title.slice(0, 10) + '...'
                })
               
            }catch(error){
                console.log(error)
            }
        },
        async showConfirmationForBook(data) {
            this.target_item = await getBookByISBN(data.ISBN)
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
        },
        async UpdateBook(params){
            this.show_book_form = false
            await updateBook(params.data.ISBN, params.data)
            const items_to_delete = (await getAuthorsByISBN(params.data.ISBN)).filter(item => {
                return !params.authors.some(author => author.AuthorID === item.AuthorID);
            });
           
            const authorsByISBN = await getAuthorsByISBN(params.data.ISBN);
            const items_to_create = params.authors.filter(item => {
                return !authorsByISBN.some(author => author.AuthorID === item.AuthorID);
            })

            if(items_to_create.length){
                items_to_create.forEach(async (item) => {
                    await addBooks_Authors({Books_ISBN: params.data.ISBN, Authors_AuthorID: item.AuthorID})
                })
            }
            if(items_to_delete.length){
                items_to_delete.forEach(async (item) => {
                    await deleteBooks_Authors(params.data.ISBN, item.AuthorID)
                })
            }

            await this.fetchData()
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