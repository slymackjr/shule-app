// PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem("authToken") !== null;
console.log('Is authenticated:', isAuthenticated);

    // If authenticated, return the desired element, otherwise redirect to login
    return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
