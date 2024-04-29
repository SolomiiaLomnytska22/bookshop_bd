<template>
    <div class="landing-page">
      <section class="hero-section">
        <div class="hero-content">
          <h2 class="hero-title">Discover Your Next Favorite Book</h2>
          <p class="hero-description">Explore a vast collection of books from various genres and authors.</p>
          <router-link to="/browse-books" class="btn btn-primary">Browse Books</router-link>
        </div>
      </section>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Landing extends Vue {
}
</script>

<style scoped>

.landing-page {
    height: 100vh;
}

.hero-section {
    padding: 0 15px;
    height: 100%;
    text-align: center;
    background:
        linear-gradient(
          rgba(0, 0, 0, 1),
          rgba(0, 0, 0, 0.7)
        ),
        url(https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80);
}

.hero-title {
    margin: 0;
    padding-top: 30%;
    color: #d8d8d8;
    font-size: 36px;
}

.hero-description {
    padding: 10px 0;
    color: #9a9a9a;
    font-size: 18px;
    margin-bottom: 50px;
}

.btn {
    padding: 15px 20px;
    background: none;
    color: #9a9a9a;
    text-decoration: none;
    font-weight: 700;
    border: solid;
    border-width: 1px;
    border-radius: 5px;
    font-size: 24px;
    transition: background-color 0.3s;
  }

  .btn:hover {
    background-color: rgba(154,154,154, 0.5);
    color: #d8d8d8;
  }

</style>
