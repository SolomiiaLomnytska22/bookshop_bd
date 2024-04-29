import axios from 'axios';
import { getAccessToken } from './getAccessToken';

const API_URL = 'http://localhost:3000/orders';

export const getAllOrders = async () => {
    try {
        const token = getAccessToken();
        let response;
        if (token) {
            response = await axios.get(`${API_URL}`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
        } else {
            response = await axios.get(`${API_URL}`);
        }
        return response.data;   
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const getAllOrdersByUserID = async (customerId) => {
    try {
        const token = getAccessToken();
        let response;
        if (token) {
            response = await axios.get(`${API_URL}/customer/${customerId}`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
        } else {
            response = await axios.get(`${API_URL}/customer/${customerId}`);
        }
        return response.data;   
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const updateOrder = async (orderId, orderData) => {
    try {
        const token = getAccessToken();
        const url = `${API_URL}/${orderId}`;
        await axios.put(url, orderData, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    } catch (error) {
        console.error(`Error updating order with ID ${orderId}:`, error);
        throw error;
    }
};

export const deleteOrder = async (orderId) => {
    try {
        let response
        const token = getAccessToken();
        if (token){
            response = await axios.delete(`${API_URL}/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
        } else {
            response = await axios.delete(`${API_URL}/${orderId}`);
        }
        
        if (response.status === 204) {
            return true; // Successfully deleted
        }
        throw new Error(`Error deleting order with ID ${orderId}`);
    } catch (error) {
        console.error(`Error deleting order with ID ${orderId}:`, error);
        throw error;
    }
};


export const addOrder = async (orderData) => {
    try {
        const token = getAccessToken();
        let response = await axios.post(API_URL, orderData, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response.data; 
    } catch (error) {
        console.error('Error adding order:', error);
        throw error;
    }
};
