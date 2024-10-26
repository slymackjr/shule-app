import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import AdminHeader from './AdminHeader';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaClock } from 'react-icons/fa';

const UnverifiedApplications = () => {
  const [Applications, setApplications] = useState([]); // State to hold the Applications data
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('authToken');

        const response = await axios.get('http://51.222.207.88:8005/api/v1/applications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Set the Applications state to the correct array inside the response
        setApplications(response.data.data || []); // Access response.data.data
        setLoading(false); // Stop loading after data is fetched
      } catch (err) {
        setError('Failed to fetch Applications data');
        console.error('Error fetching Applications:', err);
        setLoading(false);
      }
    };

    fetchApplications(); // Call function when component mounts
  }, []);

  // Show loading state
  if (loading) {
    return <p>Loading Applications...</p>;
  }

  // Handle error state
  if (error) {
    return <p>{error}</p>;
  }

  // Check if Applications array has data
  if (!Applications || Applications.length === 0) {
    return <p>No Applications data available.</p>;
  }

  // Filter for unverified applications
  const unverifiedApplications = Applications.filter(application => application.is_verified === 0);

  return (
    <AdminHeader>
      <div className="overflow-x-auto m-4 shadow-lg">
        <table className="min-w-full border-collapse divide-y divide-gray-300">
          {/* Table Header */}
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-4 text-lg font-semibold">School Name</th>
              <th className="p-4 text-lg font-semibold">HeadMaster Name</th>
              <th className="p-4 text-lg font-semibold">Email</th>
              <th className="p-4 text-lg font-semibold">Phone</th>
              <th className="p-4 text-lg font-semibold">Address</th>
              <th className="p-4 text-lg font-semibold">City</th>
              <th className="p-4 text-lg font-semibold">Postal Code</th>
              <th className="p-4 text-lg font-semibold">School Type</th>
              <th className="p-4 text-lg font-semibold">Created At</th>
              <th className="p-4 text-lg font-semibold">Verification Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-blue-50 text-gray-800">
            {unverifiedApplications.map((school) => (
              <tr key={school.id} className="hover:bg-blue-100 border-b border-gray-300">
                <td className="p-4 font-medium">{school.school_name}</td>
                <td className="p-4">{school.fullname}</td>
                <td className="p-4">{school.email}</td>
                <td className="p-4">{school.phone}</td>
                <td className="p-4">{school.address}</td>
                <td className="p-4">{school.city}</td>
                <td className="p-4">{school.postal_code}</td>
                <td className="p-4">{JSON.parse(school.school_type).join(", ")}</td>
                <td className="p-4">{new Date(school.created_at).toLocaleDateString()}</td>
                <td className="p-4 font-semibold">
                  <div className="flex items-center space-x-2 bg-red-100 bg-opacity-70 text-red-700 border border-red-300 rounded-md px-2 py-1">
                    <FaClock className="text-red-500" />
                    <span>Pending</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminHeader>
  );
};

export default UnverifiedApplications;
