import axios from 'axios';
import { getAccessToken } from './getAccessToken';

const API_URL = 'http://localhost:3000/orderItems';

export const getAllOrderItems = async () => {
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

export const getAllOrderItemsByOrderID = async (id) => {
    try {
        const token = getAccessToken();
        let response;
        if (token) {
            response = await axios.get(`${API_URL}/order/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
        } else {
            response = await axios.get(`${API_URL}/order/${id}`);
        }
        return response.data;   
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const updateOrderItem = async (orderItemId, orderData) => {
    try {
        const token = getAccessToken();
        const url = `${API_URL}/${orderItemId}`;
        await axios.put(url, orderData, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    } catch (error) {
        console.error(`Error updating order with ID ${orderItemId}:`, error);
        throw error;
    }
};

export const deleteOrderItem = async (orderId) => {
    try {
        const token = getAccessToken();
        const response = await axios.delete(`${API_URL}/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        if (response.status === 204) {
            return true; // Successfully deleted
        }
        throw new Error(`Error deleting order with ID ${orderId}`);
    } catch (error) {
        console.error(`Error deleting order with ID ${orderId}:`, error);
        throw error;
    }
};


export const addOrderItem = async (orderData) => {
    try {
        const token = getAccessToken();
        let response = await axios.post(API_URL, orderData, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response; 
    } catch (error) {
        console.error('Error adding order:', error);
        throw error;
    }
};
