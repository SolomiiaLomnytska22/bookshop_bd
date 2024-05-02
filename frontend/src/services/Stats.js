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

export const getTop5Books = async () => {
    try {
        const token = getAccessToken();
        let response
        if(token){
            response = await axios.get(`${API_URL}/books/`, {
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

export const getOrdersStats = async (start_date, end_date) => {
    try {
        const token = getAccessToken();
        console.log(new Date(start_date).toISOString())

        let response
        if(token){
            response = await axios.get(`${API_URL}/order?start_date=${start_date}&end_date=${end_date}`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
        } else 
            response = await axios.get(`${API_URL}/order/`, {
                start_date: new Date(start_date).toISOString(),
                end_date: new Date(end_date).toISOString()
            });
        console.log(response.data)
        return response.data;   
    } catch (error) {
    console.error('Error fetching genre services data:', error);
    throw error;
    }
};
