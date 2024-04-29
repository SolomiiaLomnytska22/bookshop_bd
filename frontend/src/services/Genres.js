import axios from 'axios';
import { getAccessToken } from './getAccessToken';

const API_URL = 'http://localhost:3000/genres';

export const getGenres = async () => {
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
    console.error('Error fetching genre services data:', error);
    throw error;
    }
};

export const getGenreById = async (id) => {
    try {
        const token = getAccessToken();
        const response = token ? await axios.get(`${API_URL}/${id}`, {headers: {
            Authorization: `Bearer ${token}` 
        }}) : await axios.get(`${API_URL}/${id}`)
        return response.data;
    } catch (error) {
        console.error(`Error fetching genre with id ${id}:`, error);
        throw error;
    }
}


export const updateGenre = async (id, postServiceData) => {
    try {
        const token = getAccessToken();
        const url = `${API_URL}/${id}`;
        await axios.put(url, postServiceData, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    } catch (error) {
        console.error(`Error updating genre with id ${id}:`, error);
        throw error;
    }
};

export const deleteGenre = async (id) => {
    try {
        const token = getAccessToken();
        const response = await axios.delete(`${API_URL}/${id}`, { headers: {
            Authorization: `Bearer ${token}` 
        }});
        if (response.status === 200) {
        return true; 
        }
        throw new Error(`Error deleting genre with id ${id}`);
    } catch (error) {
        console.error(`Error deleting genre with id ${id}:`, error);
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