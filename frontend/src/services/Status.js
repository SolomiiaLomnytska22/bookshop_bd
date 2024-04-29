import axios from 'axios';
import { getAccessToken } from './getAccessToken';

const API_URL = 'http://localhost:3000/statuses';

export const getStatuses = async () => {
    try {
        const token = getAccessToken();
        let response
        if(token){
            response = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
        } else 
            response = await axios.get(API_URL);
        console.log(response.data)
        return response.data;   
    } catch (error) {
    console.error('Error fetching post services data:', error);
    throw error;
    }
};

export const getStatusById = async (id) => {
    try {
        const token = getAccessToken();
        const response = token ? await axios.get(`${API_URL}/${id}`, {headers: {
            Authorization: `Bearer ${token}` 
        }}) : await axios.get(`${API_URL}/${id}`)
        return response.data;
    } catch (error) {
        console.error(`Error fetching book with id ${id}:`, error);
        throw error;
    }
}


export const updateStatus = async (id, postServiceData) => {
    try {
        const token = getAccessToken();
        const url = `${API_URL}/${id}`;
        await axios.put(url, postServiceData, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    } catch (error) {
        console.error(`Error updating post service with id ${id}:`, error);
        throw error;
    }
};

export const deleteStatus = async (id) => {
    try {
        const token = getAccessToken();
        const response = await axios.delete(`${API_URL}/${id}`, { headers: {
            Authorization: `Bearer ${token}` 
        }});
        if (response.status === 200) {
        return true; 
        }
        throw new Error(`Error deleting post service with id ${id}`);
    } catch (error) {
        console.error(`Error deleting post service with id ${id}:`, error);
        throw error;
    }
};


export const addPostService = async (data) => {

    try {
        const token = getAccessToken();
        await axios.post(API_URL, data, { headers: {
            Authorization: `Bearer ${token}` 
        }});
      return true; // успішно додано
    } catch (error) {
        console.log(error);
      return false; // помилка під час додавання
    }
};