// routes.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Login, Parents, SchoolRequest, Service, TeacherLogin } from './pages';
import './index.css';
import { CreateClasses, CreateTeachers, HeadMasterDashboard, HeadMasterProfile, SchoolDetails, ViewClasses, ViewTeachers } from './components/HeadMaster';
import AdminDashboard from './components/Admin/AdminDashboard'
import { ProtectedRoutes } from './components/Auth';


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/dashboard' element={<AdminDashboard/>} />
                <Route path="/service" element={<Service />} />
                <Route path="/parents" element={<Parents />} />
                <Route path="/school-request" element={<SchoolRequest />} />
                <Route path="/login" element={<Login />} />
                <Route path="/head-master-profile" element={<HeadMasterProfile />} />
                <Route path="/school-details" element={<SchoolDetails />} />
                <Route path="/create-teachers" element={<CreateTeachers />} />
                <Route path="/view-teachers" element={<ViewTeachers />} />
                <Route path="/view-classes" element={<ViewClasses />} />
                <Route path="/create-classes" element={<CreateClasses />} />
                <Route path="/teacher-login" element={<TeacherLogin />} />
                <Route
                    path="/head-master-dashboard"
                    element={
                        <ProtectedRoutes>
                            <HeadMasterDashboard />
                        </ProtectedRoutes>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;