<template>
  <div class="landing-page">
    <section class="hero-section">
      <div class="hero-content">
        <h2 class="hero-title">Discover Your Next Favorite Book</h2>
        <p class="hero-description">Explore a vast collection of books from various genres and authors.</p>
        <router-link to="/browse" class="btn">Browse Books</router-link>
        <router-link to="/login" class="login" v-if="is_logged">Login</router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { getAccessToken } from '../services/getAccessToken';

export default {
  data(){
    return {
      is_logged: true
    }
    
  },
  mounted(){
    this.is_logged = getAccessToken() ? false : true
  }
}
</script>

<style scoped>
.landing-page {
  height: 100vh;
  text-align: center;
  background:
      linear-gradient(
        rgba(0, 0, 0, 1),
        rgba(0, 0, 0, 0.7)
      ),
      url(https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80);
}

.hero-section {
  padding: 0 15px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hero-content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero-title {
  margin: 0;
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

.login {
  margin-top: 20px;
  background: none;
  color: #9a9a9a;
  text-decoration: underline;
  font-weight: 700;
  font-size: 20px;
  transition: color 0.3s;
}

.login:hover {
  color: #d8d8d8;
}
</style>
