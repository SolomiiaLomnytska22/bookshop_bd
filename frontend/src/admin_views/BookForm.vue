<template>
    <div class="overlay" v-if="show" @click.self="cancelEdit">
      <div class="edit-form">
      <h3 v-if="ISBN">Edit Book</h3>
      <h3 v-else>Add Book</h3>
      <form @submit.prevent="updateOrder">

        <div class="form-group">
          <label for="isbn">ISBN:</label>
          <input type="text" id="isbn" v-model="data.ISBN" :disabled="ISBN!==-1" required/>
        </div>

        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="data.Title" required/>
        </div>

        <div class="form-group">
          <label for="language">Language:</label>
          <input type="text" id="language" v-model="data.Language" required/>
        </div>

        <div class="form-group">
          <label for="pages">Pages:</label>
          <input type="number" id="pages" v-model="data.Pages" required/>
        </div>

        <div class="form-group">
          <label for="description">Description:</label>
          <textarea rows="4" v-model="data.Description" required></textarea>
        </div>

        <div class="form-group">
          <label for="date">Publication Date:</label>
          <input type="date" id="date" v-model="data.PublicationDate" required/>
        </div>

        <div class="form-group">
          <label for="post-office">Select Publisher:</label>
          <select v-model="data.PublisherID" id="post-office" required>
            <option v-for="publisher in publishers" :key="publisher.PublisherID" :value="publisher.PublisherID">
                {{publisher.PublisherName}}
            </option>
          </select>
        </div> 

        <div class="form-group">
          <label for="author">Select Authors:</label>
          <multiselect
            :multiple="true" 
            v-model="selected_authors"
            :options="authors"
            placeholder="Select a publisher"
            :custom-label="formatAuthorLabel"
            track-by="AuthorID"
            id="author"
            class="custom-multiselect"
          >
        </multiselect>
        </div> 

        <div class="form-group">
          <label for="genre">Select Genres:</label>
          <multiselect
            :multiple="true" 
            v-model="selected_genres"
            :options="genres"
            placeholder="Select a genre"
            label="Name"
            track-by="GenreID"
            id="genre"
            class="custom-multiselect"
          >
        </multiselect>
        </div> 
        
        <div class="cover-img">
          <img style="height: 100px;" :src="data.CoverImageURL ?? 'https://th.bing.com/th/id/OIP.P-nIodv7WzkQ4wYYPsXWaQAAAA?rs=1&pid=ImgDetMain'" alt="">
          <div class="form-group">
          <label for="cover">Set New Cover Image:</label>
          <input type="text" id="cover" v-model="data.CoverImageURL" required/>
          </div> 
        </div>

        <div class="buttons">
          <button type="submit">{{ISBN?'Update Book':'Add Book'}}</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
      </form>
    </div>
    </div>
  </template>
  
  <script>
import { getBookByISBN } from '../services/Book';
import { getPublishers } from '../services/Publishers';
import { getAuthors, getAuthorsByISBN } from '../services/Author'
import Multiselect from 'vue-multiselect'
import { getGenreByISBN, getGenres } from '../services/Genres';

  export default {
    components: {
      Multiselect
    },
    props: {
      ISBN: {
        type: String,
        required: true
      },
      show: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        data: [],
        authors: [],
        genres: [],
        publishers: [],
        selected_authors : [],
        selected_genres : []
      };
    },
    async mounted(){
      console.log(this.ISBN)
        if(this.ISBN && this.ISBN!==-1){
          await this.fetchData()
        }
        
    },
    watch:{
        async ISBN(){
          if(this.ISBN && this.ISBN!==-1)
            await this.fetchData()
        }
    },
    methods: {
      async fetchData(){
        this.data = await getBookByISBN(this.ISBN)
        this.publishers = await getPublishers()
        this.authors = await getAuthors()
        this.selected_authors = await getAuthorsByISBN(this.ISBN)
        this.genres = await getGenres()
        this.selected_genres = await getGenreByISBN(this.ISBN)

      },
      updateOrder() {
        if(this.ISBN!==-1){
          this.$emit('update_book', {data: this.data, authors: this.selected_authors, genres: this.selected_genres});
        } else {
          this.$emit('save_book', {data: this.data, authors: this.selected_authors, genres: this.selected_genres});
        }
      },
      cancelEdit() {
        this.$emit('close');
      },
      formatAuthorLabel(author) {
        return `${author.FirstName} ${author.LastName}`;
      }
    }
  };
  </script>
  <style src="vue-multiselect/dist/vue-multiselect.css"></style>
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
  max-height: 50%;
  overflow-y: scroll;
  width: 30%;
  min-width: 200px;
}

.edit-form label {
  margin-bottom: 5px;
  display: block;
}

.edit-form input,
.edit-form select, 
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.buttons {
  display: flex;
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

  .cover-img{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 15px 0;
  }

  .form-group{
    margin: 10px 0;
  }
</style>