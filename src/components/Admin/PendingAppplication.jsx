import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from './AdminHeader';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaClock } from 'react-icons/fa';
import { DashboardHeader } from '../Common';

const UnverifiedApplications = () => {
  const [Applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://51.222.207.88:8005/api/v1/applications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch Applications data');
        console.error('Error fetching Applications:', err);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p>Loading Applications...</p>;
  if (error) return <p>{error}</p>;
  if (!Applications || Applications.length === 0) return <p>No Applications data available.</p>;

  const unverifiedApplications = Applications.filter(app => app.is_verified === 0);

  return (
    <AdminHeader>
      <div>
        <div className="flex justify-end m-4 space-x-4">
          <button
            onClick={() => setIsMinimized(false)}
            className={`px-4 py-2 rounded-lg font-semibold ${!isMinimized ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600`}
          >
            Full View
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className={`px-4 py-2 rounded-lg font-semibold ${isMinimized ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600`}
          >
            Minimized View
          </button>
        </div>

        {/* Responsive Table and Mobile Views */}
        <div className="m-2 shadow-lg overflow-x-auto">
          {!isMinimized ? (
            // Full View for Mobile: Stacked View with All Details
            <div className="block md:hidden space-y-4">
              {unverifiedApplications.map((school) => (
                <div key={school.id} className="bg-white p-4 rounded-lg shadow-md space-y-2 border border-gray-300">
                  <p className="font-semibold text-blue-600">{school.school_name}</p>
                  <p>Headmaster: {school.fullname}</p>
                  <p>Email: {school.email}</p>
                  <p>Phone: {school.phone}</p>
                  <p>Address: {school.address}</p>
                  <p>City: {school.city}</p>
                  <p>Postal Code: {school.postal_code}</p>
                  <p>School Type: {JSON.parse(school.school_type).join(", ")}</p>
                  <p>Created At: {new Date(school.created_at).toLocaleDateString()}</p>
                  <p>Status: {school.is_verified === 1 ? <FaCheckCircle className="inline text-green-500" /> : <FaClock className="inline text-red-500" />}</p>
                </div>
              ))}
            </div>
          ) : (
            // Minimized View for Mobile: Table with Selected Columns
            <table className="min-w-full divide-y divide-gray-300 md:hidden">
              <thead>
                <tr className="bg-blue-600 text-white text-left">
                  <th className="p-2 text-lg font-semibold">School Name</th>
                  <th className="p-2 text-lg font-semibold">City</th>
                  <th className="p-2 text-lg font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="bg-blue-50 text-gray-800">
                {unverifiedApplications.map((school) => (
                  <tr key={school.id} className="hover:bg-blue-100 border-b border-gray-300">
                    <td className="p-3 font-medium">{school.school_name}</td>
                    <td className="p-3">{school.city}</td>
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
          )}

          {/* Full Table View for Desktop */}
          <div className={`overflow-x-auto ${isMinimized ? 'hidden md:block w-1/2' : 'block w-full'}`}>
            <table className="min-w-full border-collapse divide-y divide-gray-300 hidden md:table">
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
        </div>
      </div>
    </AdminHeader>
  );
};

export default UnverifiedApplications;
