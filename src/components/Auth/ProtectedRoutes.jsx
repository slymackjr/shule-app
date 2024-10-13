// ProtectedRoutes.js
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem('teacher_token');

  // Check if token exists, if not, redirect to login page
  if (!token) {
    return <Navigate to="/teacher-login" replace />;
  }

  // If the token exists, allow access to the protected route
  return children;
};

ProtectedRoutes.propTypes = {
    children: PropTypes.node,
};

export default ProtectedRoutes;
