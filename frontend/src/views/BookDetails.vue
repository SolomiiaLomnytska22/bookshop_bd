<template>
    <div>
        <div class="book-details">
            <img :src="coverPicture" :alt="book.Title" class="book-cover">
            <div class="details">
                <h1>{{ book.Title }}</h1>
                <p class="author">{{ authorNames }}</p>
                <div class="genres">
                  <p class="genre">{{book.Language}} language</p>
                  <p class="genre">{{book.Pages}} pages</p>
                  <p class="genre" v-for="(genre, index) in book.Genres" :key="index">{{ genre }}</p>
                </div>
                <p class="price">{{ book.Price }}$</p>
                <button @click="addToCart">Add To Cart</button>
                <div class="description">
                  <p >{{ book.Description }}</p>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import { getBookByISBN } from '../services/Book'
  
  export default {
    data() {
      return {
        book: {}
      }
    },
    computed: {
        coverPicture () {
            return this.book.CoverImageURL || 'https://th.bing.com/th/id/OIP.P-nIodv7WzkQ4wYYPsXWaQAAAA?rs=1&pid=ImgDetMain'
        },
        authorNames(){
          if (this.book.AuthorNames)
            return this.book.AuthorNames.join(', ')
          return ''
        }
    },
    async mounted() {
      try {
        const isbn = this.$route.params.isbn;
        this.book = await getBookByISBN(isbn)
      } catch (error){
        console.log(error)
      }
       
    },
    methods: {
    addToCart() {
      this.$store.commit('addToCart', { bookId: this.book.ISBN, quantity: 1 });
    }
    }
  }
  </script>
  
  <style scoped>
  .book-details {
    margin-top: 115px;
    padding: 3% 5%;
    display: flex;
    flex-direction: row;
  }
  
  .book-details img {
    width: 25%;
    height: 100%;
    border-radius: 8px;
  }
  
  .details {
    padding-left: 5%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .details h1 {
    margin: 0;
    font-size: 24px;
  }
  
  .author {
    margin: 5px 0;
    font-style: italic;
    color:#3f1f1f;
  }
  
  
  .genre {
    margin-right: 5px;
    padding: 5px 10px;
    background-color: #f2f2f2;
    border-radius: 5px;
    font-size: 14px;
  }
  .genres{
    display: flex;
    flex-direction: row;
  }
  .price {
    margin-top: 10px;
    font-weight: bold;
  }
  
  button {
    margin-top: 10px;
    padding: 10px 15px;
    background-color: #3f1f1f;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #241212;
  }

  .description{
    margin: 5% 0;
    width: 75%;
    padding: 10px 20px;
    background-color: #f2f2f2;
    border-radius: 5px;
    border: solid #3f1f1f 1px;
  }
  </style>
  