import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000', // Change this to your Laravel API URL
    withCredentials: true, // Enable sending cookies
    withXSRFToken: true,
});

export default apiClient;
