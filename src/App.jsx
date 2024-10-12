// routes.js
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Home, Login, Parents, SchoolRequest, Service, TeacherLogin } from './pages';
import './index.css';
import { CreateClasses, CreateTeachers, HeadMasterDashboard, HeadMasterProfile, SchoolDetails, ViewClasses, ViewTeachers } from './components/HeadMaster';
import { ProtectedRoutes } from './components/Auth';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
// Set axios to a window property for easy access
window.axios = axios;
// Default headers for API calls
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// Base URL for your API calls
window.axios.defaults.baseURL = 'http://localhost:8000/api/';
// If a token exists in local storage, set it in axios authorization header
const token = localStorage.getItem('token');
if (token) {
   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
// Intercept responses. If 401 error, clear token and redirect to login
axios.interceptors.response.use(
   response => response,
   error => {
      if (error.response?.status === 401) {
         localStorage.removeItem('token');
         axios.defaults.headers.common['Authorization'] = 'Bearer';
         // Redirect to login route
         return <Link to="/teacher-login" />;
      }
      return Promise.reject(error);
   }
);
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/service" element={<Service />} />
                <Route path="/parents" element={<Parents />} />
                <Route path="/school-request" element={<SchoolRequest />} />
                <Route path="/login" element={<Login />} />
                <Route path="/head-master-dashboard" element={<HeadMasterDashboard />} />
                <Route path="/head-master-profile" element={<HeadMasterProfile />} />
                <Route path="/school-details" element={<SchoolDetails />} />
                <Route path="/create-teachers" element={<CreateTeachers />} />
                <Route path="/view-teachers" element={<ViewTeachers />} />
                <Route path="/view-classes" element={<ViewClasses />} />
                <Route path="/create-classes" element={<CreateClasses />} />
                <Route path="/teacher-login" element={<TeacherLogin />} />
                <Route
                    path="/view-classes"
                    element={
                        <ProtectedRoutes>
                            <CreateClasses />
                        </ProtectedRoutes>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;