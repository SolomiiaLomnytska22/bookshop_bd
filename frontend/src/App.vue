<template>
  <div>
    <Header :headerItems="headerItems"></Header>
    <router-view></router-view>
    <notifications position="bottom right"/>
  </div>
</template>

<script>
import Header from './components/common/Header'
import {getPermissionLevel} from './services/getAccessToken'
import axios from 'axios'
export default {
  components: {
    Header
  },
  computed: {
    headerItems () {
      if (getPermissionLevel() == 0)
      {
        const cart = this.$store.state.cart
        let quantity = 0
        for (const item of cart){
          quantity += item.quantity
        }

        return [{
          link: '/browse',
          caption: 'Catalogue'
        },{
          link: '/shopping-cart',
          caption: 'Cart',
          badge: quantity
        },{
          caption: 'Account',
          dropdown_options: [
            {
              action: () => {
                this.$router.push('/orders')
              },
              caption: 'My Orders'
            },
            {
              action: async () => {
                await axios.get('http://localhost:3000/logout', {
                   withCredentials: true  
                });
                location.reload();
              },
              caption: 'Log Out'
            }
          ]
        }
      ]
      }
      return [{
          link: '/browse',
          caption: 'Catalogue'
        },
        {
          link: '/login',
          caption: 'Login'
        }]
    }
  }
}
</script>

<style>
#app {
  font-family: "Eczar", serif;
  font-optical-sizing: auto;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
}

Header {
  position: fixed;
  z-index: 1;
  width: 100%;
  box-sizing: border-box;
  top: 0;
}
</style>
