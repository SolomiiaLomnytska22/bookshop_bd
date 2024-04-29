import axios from 'axios';
import { getAccessToken } from './getAccessToken';

const API_URL = 'http://localhost:3000/stats';

export const getCountryStats = async () => {
    try {
        const token = getAccessToken();
        let response
        if(token){
            response = await axios.get(`${API_URL}/countries/`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
        } else 
            response = await axios.get(`${API_URL}/countries/`);
        console.log(response.data)
        return response.data;   
    } catch (error) {
    console.error('Error fetching genre services data:', error);
    throw error;
    }
};
