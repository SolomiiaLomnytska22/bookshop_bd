<template>
    <header class="header">
      <h1 class="header-title" @click="$router.push('/')">{{ title }}</h1>
      <ul class="header-nav">
      <li v-for="(item, index) in headerItems" :key="index">
        <a :href="item.link">{{ item.caption }}</a>
        <span v-if="item.badge" class="badge">{{ item.badge }}</span>
        <ul v-if="item.dropdown_options" class="dropdown">
            <li v-for="(option, index) in item.dropdown_options" :key="`sub-${index}`">
              <a @click="option.action">{{ option.caption }}</a>
            </li>
          </ul>
      </li>
    </ul>
    </header>
</template>

<script>

export default {
    props : {
        headerItems: {
            type: Array,
            default: () => [] 
        }
    },
    data() {
        return {
            title : 'BookNook'
        }
    }
}
</script>

<style scoped>
.header {
    background: linear-gradient(to bottom right, #1e1e1e, #3f1f1f);
    padding: 20px;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.header-title {
    color: #d8d8d8;
    font-size: 28px;
    font-weight: 1000;
    margin-left: 50px;
}

.header-nav{
    display: flex;
    flex-direction: row;
    list-style-type: none;
    padding: 10px;
}

.header-nav li {
    margin-right: 20px;
}

.header-nav li:last-child {
    margin-right: 50px;
}

.header-nav li a {
    color: #d8d8d8;
    text-decoration: none;
    font-size: 18px;
}

.header-nav li a:hover {
    color: #9a9a9a;
}

.dropdown {
    display: none;
    position: absolute;
    background-color: none;
    padding: 0;
    padding-top: 50px;
    list-style-type: none;
}

.dropdown li a {
    margin: 5px;
    font-size: 16px;
}

.dropdown li:hover {
    margin-left: 5px;
    background-color: #3f1f1f;
}

.dropdown li {
    background-color: #1e1e1e;
    width: 100%;
    text-align: start;
    padding: 10px;
}

.header-nav li:hover .dropdown {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    cursor: pointer;
}

.badge {
  position: relative;
  top: -2px;
  left: 4px;
  background-color: #ffffff; 
  color: #3f1f1f;
  font-weight: 700;
  padding: 3px 6px;
  border-radius: 100%;
  font-size: 10px;
}
</style>
