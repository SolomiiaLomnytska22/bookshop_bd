import axios from 'axios';
import { getAccessToken } from './getAccessToken';

const API_URL = 'http://localhost:3000/customerAddresses';

export const getCustomerAddressByCustomerID = async (id) => {
    try {
        const token = getAccessToken();
        let response
        if(token){
            response = await axios.get(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
        } else 
            response = await axios.get(`${API_URL}/${id}`);
        
        console.log(response.data)
        return response.data;   
    } catch (error) {
    console.error('Error fetching customer address data:', error);
    throw error;
    }
};

export const getAddressByID = async (id) => {
    try {
        const token = getAccessToken();
        const response = await axios.get(`${API_URL}/${id}`, {headers: {
            Authorization: `Bearer ${token}` 
        }});
        return response.data;
    } catch (error) {
        console.error(`Error fetching address with id ${id}:`, error);
        throw error;
    }
}


export const updateAddress = async (id, data) => {
    try {
        const token = getAccessToken();
        const url = `${API_URL}/${id}`;
        const response = token ? await axios.put(url, data, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        }) :  await axios.put(url, data)
        return response.data
    } catch (error) {
        console.error(`Error updating address with id ${id}:`, error);
        throw error;
    }
};

export const deleteAddress = async (isbn) => {
    try {
        const token = getAccessToken();
        const response = await axios.delete(`${API_URL}/${isbn}`, { headers: {
            Authorization: `Bearer ${token}` 
        }});
        if (response.status === 200) {
        return true; 
    }
        throw new Error(`Error deleting book with id ${isbn}`);
    } catch (error) {
        console.error(`Error deleting book with id ${isbn}:`, error);
        throw error;
    }
};


export const addAddress = async (data) => {

    try {
        const token = getAccessToken();
        await axios.post(API_URL, data, { headers: {
            Authorization: `Bearer ${token}` 
        }});
      return true;
    } catch (error) {
        console.log(error);
      return false;
    }
};