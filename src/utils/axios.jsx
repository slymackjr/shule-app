// 
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api', // Change this to your Laravel API URL
    withCredentials: true, // Enable sending cookies
});

export default instance;
