// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import axios from '../utils/axios'; // Ensure this is your configured Axios instance

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Send a request to a protected route (e.g., /teacher/dashboard)
                const response = await axios.get('/teacher-login'); // Adjust the endpoint as necessary
                // If successful, set isAuthenticated to true
                setIsAuthenticated(!!response.data.teacher);
            } catch (error) {
                setIsAuthenticated(false); // If the request fails, the user is not authenticated
            } finally {
                setLoading(false); // Set loading to false after checking authentication
            }
        };

        checkAuth();
    }, []);

    return { isAuthenticated, loading };
};
