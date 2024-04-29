<template>
    <table class="table">
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
          <th>Actions</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td v-for="(value, key) in item" :key="key">{{ value }}</td>
          <td>
            <button @click="$emit('edit', item)">✏️</button>
            <button @click="$emit('delete', item)">🗑️</button>
          </td>
          <td><button @click="$emit('more', item)">More</button></td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    props: {
      items: {
        type: Array,
        required: true
      },
    },
    computed: {
      headers() {
        return Object.keys(this.items[0] || {});
      },
    },
  };
  </script>
  
  <style scoped>
  .table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    border: none;
    padding: 8px;
    text-align: center;
  }
  
  th {
    background-color: #3f1f1f;
    color: white;
  }
  
  button {
    background-color: #3f1f1f;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px;
  }
  
  button:hover {
    opacity: 0.8;
  }

  tbody tr:nth-child(odd) {
  background: #ededed;
}
  </style>