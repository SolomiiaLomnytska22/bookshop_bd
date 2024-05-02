import axios from 'axios';
import { getAccessToken } from './getAccessToken';

const API_URL = 'http://localhost:3000/booksAuthors';

export const deleteBooks_Authors = async (ISBN, AuthorID) => {
    try {
        const token = getAccessToken();
        const response = await axios.delete(`${API_URL}/?isbn=${ISBN}&author=${AuthorID}`, { headers: {
            Authorization: `Bearer ${token}` 
        }});
        if (response.status === 204) {
         return true; 
        }
        throw new Error(`Error deleting book with id ${ISBN}`);
    } catch (error) {
        console.error(`Error deleting book with id ${ISBN}:`, error);
        throw error;
    }
};


export const addBooks_Authors = async (data) => {
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