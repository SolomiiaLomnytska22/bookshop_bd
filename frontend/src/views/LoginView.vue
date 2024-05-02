<template>
    <div class="login-container">
      <form class="login-form" @submit.prevent="handleSubmit">
        <h2 class="login-title">Login</h2>
        <div class="input-container">
          <input
            type="text"
            id="username"
            v-model="formData.username"
            class="login-input"
            placeholder="Login"
            required
          />
        </div>
        <div class="input-container">
          <input
            type="password"
            id="password"
            v-model="formData.password"
            class="login-input"
            placeholder="Password"
            required
          />
        </div>
        <div class="button-container">
          <button type="submit" class="login-button">Увійти</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    components: {
    },
    data() {
      return {
        formData: {
          username: '',
          password: '',
        },
      };
    },
    methods: {
      async handleSubmit() {
        try {
          const response = await axios.post('http://localhost:3000/login', this.formData);

          console.log('Відповідь від сервера:', response.data);
          document.cookie = `accessToken=${response.data.accessToken}; path=/;`;   
          const redirect = this.$route.query.redirect;
          if (redirect) {
            this.$router.push(redirect);
          } else {
            console.log('heer')
            this.$router.push('/browse');
          }
        } catch (error) {
          if(error.request?.status === 401){
            this.$notify({ type: "error", title: "Authorization Error", text: "Please, check your username or login." });
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    margin-top: 120px;
    display: flex;
    justify-content: center;
  }
  
  .login-form {
    margin: 20px;
    width: 75%;
    background-color: #3f1f1fbc;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .login-title {
    color: #ffffff;
    font-size: 24px;
    text-align: center;
  }
  
  .input-container {
    margin-bottom: 15px;
  }
  
  .login-input {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
  }
  
  .button-container {
    text-align: center;
  }
  
  .login-button {
    background-color: #1e1e1e;
    color: #ffffff;
    padding: 10px 20px;
    border: solid 1px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .login-button:hover {
    background-color: #241212;
  }
  </style>
  