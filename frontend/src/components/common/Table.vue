<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
          <th>Actions</th>
          <th v-if="show_more"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginated_items" :key="index">
          <td v-for="(value, key) in item" :key="key">{{ value }}</td>
          <td>
          <button @click="$emit('edit', item)">✏️</button>
          <button @click="$emit('delete', item)">🗑️</button>
        </td>
        <td v-if="show_more"><button @click="$emit('more', item)">...</button></td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <div> <button @click="prevPage" :disabled="currentPage === 0">{{"<"}}</button></div>
      <span>{{ currentPage + 1 }} / {{ totalPages }}</span>
      <div><button @click="nextPage" :disabled="currentPage === totalPages - 1">{{">"}}</button></div>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    data(){
      return {
        currentPage: 0,
        itemsPerPage: 5,
      }
    },
    props: {
      items: {
        type: Array,
        required: true
      },
      show_more: {
        type: Boolean,
        required: false, 
        default: true
      }
    },
    computed: {
      headers() {
        return Object.keys(this.items[0] || {});
      },
      totalPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      paginated_items () {
        const start = this.currentPage * this.itemsPerPage
        const end = start + this.itemsPerPage
        return this.items.slice(start, end)
      }
    },
    methods:{
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
    }
  };
  </script>
  
  <style scoped>
  .table, table{
    width: 100%;
  }

  table {
    border-collapse: collapse;
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

.pagination {
    margin: 15px 0;
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
  </style>