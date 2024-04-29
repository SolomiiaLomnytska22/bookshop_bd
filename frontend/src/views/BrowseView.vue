<template>
    <div class="bookshop-home">  
      <section class="featured-books" >
        <section class="header">
          <h2>Featured Books</h2>
          <div class="search-bar">
            <input type="text" v-model="searchText" placeholder="Search books..." />
            <button @click="search">🔎</button>
          </div>
        </section>
        <section class="genres">
          <div class="genre-item" @click="fetchBooks">All</div>
          <div v-for="genre of genres" :key="genre.GenreID" @click="filterBooks(genre.GenreID)" class="genre-item">
            <p>{{ genre.Name }}</p>
          </div>
        </section>
        <section v-if="paginatedBooks.length"> 
          <div class="book-list">
            <router-link v-for="book of paginatedBooks" :key="book.ISBN" class="book-card" :to="'/details/' + book.ISBN">
              <img :src="coverPicture(book)" :alt="book.Title" class="book-cover">
              <h3>{{ book.Title }}</h3>
              <div class="book-details">
                <p>{{ book.AuthorNames.join(' ,') }}</p>
                <p class="price">{{ book.Price }}$</p>
              </div>
            </router-link>
          </div>
          <div class="pagination">
            <div> <button @click="prevPage" :disabled="currentPage === 0">{{"<"}}</button></div>
            <span>{{ currentPage + 1 }} / {{ totalPages }}</span>
            <div><button @click="nextPage" :disabled="currentPage === totalPages - 1">{{">"}}</button></div>
          </div>
        </section>
        <section v-else-if="error_display" class="error">
          <img :src="error_display.picture" alt="">
          <p>❌{{error_display.description}}❌</p>
        </section>
        <section v-else class="error">
          <p>No books found</p>
        </section>
      </section>
    </div>
  </template>
  
  <script>
  import { getBooks, getBooksByGenre } from '../services/Book'
  import { getGenres } from '../services/Genres';
  export default {
    async mounted () {
      await this.fetchBooks();
    },
    data () {
      return {
        featuredBooks: [],
        currentPage: 0,
        itemsPerPage: 20,
        error_display: null,
        genres: [],
        searchText: ''
      }
    },
    computed: {
      totalPages () {
        return Math.ceil(this.featuredBooks.length / this.itemsPerPage)
      },
      paginatedBooks () {
        const start = this.currentPage * this.itemsPerPage
        const end = start + this.itemsPerPage
        return this.featuredBooks.slice(start, end)
      }
    },
    methods: {
      nextPage () {
        if (this.currentPage < this.totalPages - 1) {
          this.currentPage++
        }
      },
      prevPage () {
        if (this.currentPage > 0) {
          this.currentPage--
        }
      },
      coverPicture (book) {
        return book.CoverImageURL || 'https://th.bing.com/th/id/OIP.P-nIodv7WzkQ4wYYPsXWaQAAAA?rs=1&pid=ImgDetMain'
      },
      async filterBooks(genreId){
        try {
          this.featuredBooks = await getBooksByGenre(genreId);
        } catch (error) {
          console.log(error)
        }
      },
      async fetchBooks(){
        try {
          this.featuredBooks = await getBooks();
          this.genres = await getGenres();
        } catch (error) {
          if (error.code === 'ERR_NETWORK') {
            this.error_display = {
              picture: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzllODN3cmNjaHA0OGFtajJwNmRhN25lbzhmNG85bXppZWx1NTNvNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bC8EUWeuy5OIx6o7ul/giphy.gif',
              description: error.message
            };
          } else if (error.response && error.response.status === 401) {
            this.error_display = {
              picture: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXoxcXNnenk2aWdiOXB4emdxb254ZWswOGNocmJjcnFqZmxndmU1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pQQUyfun25hnF6LE6e/giphy.gif',
              description: error.message
            };
          }
        }
      },
      async search(){
        if(this.searchText){
          this.featuredBooks = this.featuredBooks.filter(book =>
            book.Title.toLowerCase().includes(this.searchText.toLowerCase()) ||
            book.AuthorNames.some(author => author.toLowerCase().includes(this.searchText.toLowerCase()))
          )
        } else {
          await this.fetchBooks()
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .error{
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .bookshop-home {
    max-width: 100%;
    margin-top: 117px;
  }
  
  .featured-books {
    text-align: center;
    padding-top: 20px;
  }
  
  .book-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  
  .book-card {
    text-decoration: none;
    width: 150px;
    height: 300px;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    transition: transform 0.3s ease-in-out;
    background-color: #ddd;
  }
  
  .book-card:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-color: #3f1f1f;
    cursor: pointer;
  }
  
  .book-cover {
    width: 100%;
    height: 75%;
    object-fit: cover;
  }

  h3{
    color: #1e1e1e;
  }
  
  .book-details p {
    color: #4e4e4e;
  }

  .price {
    font-weight: bold;
  }
  
  .pagination {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .pagination button {
    border-radius: 3px;
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;
    border: none;
    background-color: #3f1f1f;
    color: #fff;
  }
  
  .pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .book-card h3{
    font-size: large;
    margin: 0;
    margin: 5px;
  }
  .book-card p{
    font-size: small;
    margin: 5px;
  }

  .genres{
    display: flex;
    justify-content: center;
    padding: 15px;
  }

  .genre-item{
    padding: 10px;
    margin: 0 10px;
    border-radius: 4px;
    cursor: pointer;
    color: #3f1f1f;
    background-color: #e9e9e9;
  }

  .genre-item:hover{
    cursor: pointer;
    color: #1e1e1e;
  }

  .genre-item p {
    margin: 0;
  }

  .search-bar {
    display: flex;
    align-items: center;
    margin-top: 10px;
    width: 30%;
    margin-left: 5%;
  }

  .search-bar input {
    padding: 5px 10px;
    border: 1px solid #ddd;
    flex-grow: 1; 
    border-radius: 5px;
  }
  .search-bar button {
    background-color: #3f1f1f;
    border-radius: 5px;
    margin: 0 10px;
    padding: 5px 15px;
    border: none;
  }

  .search-bar button:hover {
    cursor: pointer;
  }

  .header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 5%;
  }
  </style>
  