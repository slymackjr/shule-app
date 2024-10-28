// PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, allowedRoles =[]}) => {
    // Check if the user is authenticated
    const token = localStorage.getItem("authToken");
    const isAuthenticated = token !== null;

    const userRole = localStorage.getItem("role"); 


    console.log('Is authenticated:', isAuthenticated);
    console.log('User role:', userRole);
    console.log('Allowed roles:', allowedRoles);

    

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Redirect if the role is not allowed
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />; // Or to a "not authorized" page
    }

    // Render the element if authenticated and role is allowed
    return element;
    
};

export default PrivateRoute;
