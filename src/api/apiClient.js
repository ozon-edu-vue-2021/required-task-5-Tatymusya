import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 0,
    retry: 4,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET'
    },
});

export default apiClient;