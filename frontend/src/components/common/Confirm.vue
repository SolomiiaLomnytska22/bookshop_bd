<template>
    <div v-if="show" class="confirmation-dialog">
      <div class="dialog-content">
        <p>{{ message }}</p>
        <div class="actions">
          <button @click="$emit('confirm')">Confirm</button>
          <button @click="close">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: String, // The message to display in the dialog
      show: Boolean, // Flag to control visibility of the dialog
    },
    methods: {
      close() {
        this.$emit('close'); // Emit close event when cancel button is clicked
      },
    },
  };
  </script>
  
  <style scoped>
  .confirmation-dialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100; /* Ensure dialog is above other elements */
  }
  
  .dialog-content {
    background-color: white;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
  
  .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  
  button {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 5px;
  }
  
  button:first-child {
    background-color: #3f1f1f; /* Use your accent color */
    color: white;
  }
  
  button:last-child {
    background-color: #ddd;
    color: black;
  }
  </style>