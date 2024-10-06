// routes.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Login, Parents, SchoolRequest, Service } from './pages';
import './index.css';
import { CreateClasses, CreateTeachers, HeadMasterDashboard, HeadMasterProfile, SchoolDetails, ViewClasses, ViewTeachers } from './components/HeadMaster';


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
            </Routes>
        </BrowserRouter>
    );
};

export default App;