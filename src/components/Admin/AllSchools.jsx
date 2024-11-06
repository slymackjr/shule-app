import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import AdminHeader from './AdminHeader';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FaCheckCircle, FaClock} from 'react-icons/fa';

const AllSchools = () => {
const [schools, setSchools] = useState([]); // State to hold the schools data
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
      const fetchSchools = async () => {
          try {
              const token = localStorage.getItem('authToken');

              const response = await axios.get('http://78.47.138.167:8000/api/v1/schools', {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });

              
              // Set the schools state to the correct array inside the response
              setSchools(response.data.data || []); // Access response.data.data
              setLoading(false); // Stop loading after data is fetched
          } catch (err) {
              setError('Failed to fetch schools data');
              console.error('Error fetching schools:', err);
              setLoading(false);
          }
      };

      fetchSchools(); // Call function when component mounts
  }, []);

  // Show loading state
  if (loading) {
      return <p>Loading schools...</p>;
  }

  // Handle error state
  if (error) {
      return <p>{error}</p>;
  }

  // Check if schools array has data
  if (!schools || schools.length === 0) {
      return <p>No schools data available.</p>;
  }


  return (
<AdminHeader>
<div className="overflow-x-auto bg-gray-100 border border-gray-300 rounded-lg p-5 m-4 shadow-lg">
  <table className="min-w-full border-collapse">
    {/* Table Header */}
    <thead>
      <tr className="bg-blue-600 text-white text-left">
        <th className="p-4 text-lg font-semibold">Name</th>
        <th className="p-4 text-lg font-semibold">Address</th>
        <th className="p-4 text-lg font-semibold">City</th>
        <th className="p-4 text-lg font-semibold">Postal Code</th>
        <th className="p-4 text-lg font-semibold">Motto</th>
        <th className="p-4 text-lg font-semibold">School Type</th>
        <th className="p-4 text-lg font-semibold">Created At</th>
        <th className="p-4 text-lg font-semibold">Updated At</th>
        <th className="p-4 text-lg font-semibold">Active Status</th>
      </tr>
    </thead>

    {/* Table Body */}
    <tbody className="bg-blue-50 text-gray-800">
      {schools.map((school) => (
        <tr key={school.id} className="hover:bg-blue-100 border-b border-gray-300">
          <td className="p-4 font-medium">{school.name}</td>
          <td className="p-4">{school.address}</td>
          <td className="p-4">{school.city}</td>
          <td className="p-4">{school.postal_code}</td>
          <td className="p-4">{school.motto}</td>
          <td className="p-4">{JSON.parse(school.school_type).join(", ")}</td>
          <td className="p-4">{new Date(school.created_at).toLocaleDateString()}</td>
          <td className="p-4">{new Date(school.updated_at).toLocaleDateString()}</td>
          <td className="p-4 font-semibold">
            {school.is_active ? (
              <div className="flex items-center space-x-2 bg-green-100 bg-opacity-70 text-green-700 border border-green-300 rounded-md px-2 py-1">
                <FaCheckCircle className="text-green-500" /> {/* Check icon for active */}
                <span>Active</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 bg-red-100 bg-opacity-70 text-red-700 border border-red-300 rounded-md px-2 py-1">
                <FaClock className="text-red-500" /> {/* Pending icon for inactive */}
                <span>Pending</span>
              </div>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


    </AdminHeader>
  );
};
export default AllSchools;