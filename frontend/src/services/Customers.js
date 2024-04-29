import axios from 'axios';

const API_URL = 'http://localhost:3000/customers'; // Adjust this URL according to your backend API endpoint

export const getAllCustomers = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const getCustomerByID = async (customerId) => {
  try {
    const response = await axios.get(`${API_URL}/${customerId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching customer with ID ${customerId}:`, error);
    throw error;
  }
};

export const getCustomerByUsername = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/login/${username}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching customer with username ${username}:`, error);
    throw error;
  }
};

export const createCustomer = async (customerData) => {
  try {
    const response = await axios.post(`${API_URL}`, customerData);
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

export const deleteCustomer = async (customerId) => {
  try {
    const response = await axios.delete(`${API_URL}/${customerId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting customer with ID ${customerId}:`, error);
    throw error;
  }
};

export const updateCustomer = async (customerId, customerData) => {
  try {
    const response = await axios.put(`${API_URL}/${customerId}`, customerData);
    return response.data;
  } catch (error) {
    console.error(`Error updating customer with ID ${customerId}:`, error);
    throw error;
  }
};

