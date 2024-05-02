import axios from 'axios';
import { getAccessToken } from './getAccessToken';

const API_URL = 'http://localhost:3000/logs';

export const getAllLogs = async () => {
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
    console.error('Error fetching log services data:', error);
    throw error;
    }
};

export const getLogsByDate = async (fromDate, toDate) => {
    try {
        const token = getAccessToken();
        let response
        if(token){
            response = await axios.get(`${API_URL}/byDate?fromDate=${fromDate}&toDate=${toDate}`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
        } else 
            response = await axios.get(API_URL);
        console.log(response.data)
        return response.data;   
    } catch (error) {
        console.error('Error fetching log data:', error);
        throw error;
    }
};