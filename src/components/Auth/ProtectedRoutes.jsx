// src/components/ProtectedRoutes.js

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // Custom hook to check authentication
import PropTypes from 'prop-types';

const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated, loading } = useAuth(); // Get auth status and loading state

    if (loading) {
        return <div>Loading...</div>; // You might want to show a loading indicator while checking auth
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />; // Redirect to login if not authenticated
    }

    return children; // Render the protected component if authenticated
};

ProtectedRoutes.propTypes = {
    children: PropTypes.node,
};

export default ProtectedRoutes;
