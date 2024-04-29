import axios from 'axios';
import { getAccessToken } from './getAccessToken';

const API_URL = 'http://localhost:3000/books';

export const getBooks = async () => {
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
    console.error('Error fetching book data:', error);
    throw error;
    }
};

export const getBooksByGenre = async (genreId) => {
    try {
        const token = getAccessToken();
        let response
        if(token){
            response = await axios.get(`${API_URL}/genre/${genreId}`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
        } else 
            response = await axios.get(`${API_URL}/genre/${genreId}`);
        console.log(response.data)
        return response.data;   
    } catch (error) {
    console.error('Error fetching book data:', error);
    throw error;
    }
};

export const getBookByISBN = async (isbn) => {
    try {
        const token = getAccessToken();
        const response = await axios.get(`${API_URL}/${isbn}`, {headers: {
            Authorization: `Bearer ${token}` 
        }});
        return response.data;
    } catch (error) {
        console.error(`Error fetching book with id ${isbn}:`, error);
        throw error;
    }
}


export const updateBook = async (isbn, bookData) => {
    try {
        const token = getAccessToken();
        const url = `${API_URL}/${isbn}`;
        await axios.put(url, bookData, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    } catch (error) {
        console.error(`Error updating book with id ${isbn}:`, error);
        throw error;
    }
};

export const deleteBook = async (isbn) => {
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


export const addBook = async (data) => {

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