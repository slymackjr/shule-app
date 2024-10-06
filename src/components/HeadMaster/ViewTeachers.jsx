import { useState, useEffect } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { DashboardHeader } from '../Common';

const ViewTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  /* useEffect(() => {
    // Fetch the initial teachers data
    axios.get('/api/teachers').then((response) => {
      setTeachers(response.data);
    }).catch((error) => {
      console.error('Error fetching teachers:', error);
    });
  }, []); */

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    axios.get(`/api/teachers/search?searchterm=${e.target.value}`)
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error('Error searching teachers:', error);
      });
  };

  const handleAssignRole = (userId, checked) => {
    axios.post('/api/teachers/assign-role', {
      userId,
      assign: checked ? 1 : 0,
      roleName: 'Academic Teacher',
    })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error('Error assigning role:', error);
      });
  };

  return (
    <DashboardHeader>
        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
      <div className="font-bold text-xl mb-4">Teachers</div>

      <div className="flex items-center justify-end mb-7">
        <a
          href="/teachers/create"
          className="flex items-center gap-2 bg-blue-700 text-white hover:bg-blue-800 px-4 py-2 rounded-lg"
        >
          <FaPlus /> Add New Teacher
        </a>
      </div>

      {teachers.length > 0 ? (
        <div>
          <div className="flex justify-end pb-5">
            <div className="relative">
              <FaSearch className="absolute left-2 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 rounded-md border border-gray-300 w-80"
              />
            </div>
          </div>

          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-center">No</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3 text-center">Gender</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3 text-center">Assign Role</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr key={teacher.user_id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-center">{index + 1}</td>
                    <td className="px-6 py-4">
                      {`${teacher.first_name} ${teacher.middle_name || ''} ${teacher.last_name}`}
                    </td>
                    <td className="px-6 py-4 text-center">{teacher.gender}</td>
                    <td className="px-6 py-4">{teacher.user.email}</td>
                    <td className="px-6 py-4">{teacher.phone_number}</td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={teacher.user.roles.some((role) => role.name === 'Academic Teacher')}
                        onChange={(e) => handleAssignRole(teacher.user_id, e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No teachers available.</p>
      )}
    </div>
    </DashboardHeader>
  );
};

export default ViewTeachers;
