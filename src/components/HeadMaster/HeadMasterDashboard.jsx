import { DashboardHeader } from '../Common';
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';

const HeadMasterDashboard = () => {
    return (
        <DashboardHeader activeLink={'dashboard'}>
            <h1 className="text-2xl font-bold">Headmaster Dashboard</h1>
      <div className="mt-4">
        <p>Title: Headmaster</p>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-white shadow-md rounded-lg p-4 flex items-center">
          <FaChalkboardTeacher className="text-2xl text-blue-500 mr-2" />
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">Teachers</h2>
            <p className="text-sm font-bold mt-1 pe-5">2</p>
          </div>
        </div>
        <div className="card bg-white shadow-md rounded-lg p-4 flex items-center">
          <FaUserGraduate className="text-2xl text-green-500 mr-2" />
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">Students</h2>
            <p className="text-sm font-bold mt-1 pe-5">4</p>
          </div>
        </div>
      </div>
        </DashboardHeader>
    );
};

export default HeadMasterDashboard;
