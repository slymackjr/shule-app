import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import AdminHeader from './AdminHeader';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';

const VerifiedApplications = () => {
  const [Applications, setApplications] = useState([]); // State to hold the Applications data
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // For loading state
  const [isMinimized, setIsMinimized] = useState(false);

  const [selectedSchool, setSelectedSchool] = useState(null);

  const openModal = (school) => {
    setSelectedSchool(school);
  };

  const closeModal = () => {
    setSelectedSchool(null);
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('authToken');

        const response = await axios.get('http://78.47.138.167:8000/api/v1/applications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Response data:', response.data);
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

  // Filter for verified applications
  const verifiedApplications = Applications.filter(application => application.is_verified === 1);

  return (
    <AdminHeader>
      <div>
        <div className="flex justify-end m-4 space-x-4">
          <button
            onClick={() => setIsMinimized(false)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              !isMinimized
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-600`}
          >
            Full View
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              isMinimized
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-600`}
          >
            Minimized View
          </button>
        </div>

        {/* Responsive Table and Mobile Views */}
        <div className="m-2 shadow-lg overflow-x-auto">
          {!isMinimized ? (
            <div>
              {/* Main School List for Mobile */}
              <div className="block md:hidden space-y-4">
                {verifiedApplications.map((school) => (
                  <div
                    key={school.id}
                    onClick={() => openModal(school)}
                    className="bg-white p-4 rounded-lg shadow-md border border-gray-300 cursor-pointer"
                  >
                    <p className="font-semibold text-blue-600 text-lg mb-2">
                      {school.school_name}
                    </p>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                      <div className="font-semibold text-green-700">
                        Headmaster:
                      </div>
                      <div>{school.fullname}</div>

                      <div className="font-semibold text-green-700">Email:</div>
                      <div>{school.email}</div>

                      <div className="font-semibold text-green-700">Phone:</div>
                      <div>{school.phone}</div>

                      <div className="font-semibold text-green-700">
                        Address:
                      </div>
                      <div>{school.address}</div>

                      <div className="font-semibold text-green-700">City:</div>
                      <div>{school.city}</div>

                      <div className="font-semibold text-green-700">
                        Postal Code:
                      </div>
                      <div>{school.postal_code}</div>

                      <div className="font-semibold text-green-700">
                        School Type:
                      </div>
                      <div>{JSON.parse(school.school_type).join(", ")}</div>

                      <div className="font-semibold text-green-700">
                        Created At:
                      </div>
                      <div>
                        {new Date(school.created_at).toLocaleDateString()}
                      </div>

                      <div className="font-semibold text-green-700">
                        Status:
                      </div>
                      <div className="flex items-center space-x-2 bg-green-100 bg-opacity-70 text-black border border-green-300 rounded-md px-2 py-1">
                        <FaCheck className="text-green-500" />
                        <span>Verified</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Popup */}
              {selectedSchool && (
                <SchoolModal
                  // onEdit={handleEdit}
                  // onDelete={handleDelete}
                  // onConfirm={handleConfirm}
                  // selectedSchool={selectedSchool}
                  // closeModal={closeModal}
                />
              )}
            </div>
          ) : (
            // Minimized View for Mobile: Table with Selected Columns

            <div>
              <table className="min-w-full divide-y divide-gray-300 md:hidden">
                <thead>
                  <tr className="bg-blue-600 text-white text-left">
                    <th className="p-2 text-lg font-semibold">School Name</th>
                    <th className="p-2 text-lg font-semibold">City</th>
                    <th className="p-2 text-lg font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-blue-50 text-gray-800">
                  {verifiedApplications.map((school) => (
                    <tr
                      key={school.id}
                      onClick={() => openModal(school)} // Open modal when a row is clicked
                      className="hover:bg-blue-100 border-b border-gray-300 cursor-pointer"
                    >
                      <td className="p-3 font-medium">{school.school_name}</td>
                      <td className="p-3">{school.city}</td>
                      <td className="p-4 font-semibold">
                      <div className="flex items-center space-x-2 bg-green-100 bg-opacity-70 text-black border border-green-300 rounded-md px-2 py-1">
                        <FaCheck className="text-green-500" />
                        <span>Verified</span>
                      </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Modal Popup */}
              {selectedSchool && (
                <SchoolModal
                  // onEdit={handleEdit}
                  // onDelete={handleDelete}
                  // onConfirm={handleConfirm}
                  // selectedSchool={selectedSchool}
                  // closeModal={closeModal}
                />
              )}
            </div>
          )}

          {/* Full Table View for Desktop */}
          <div
            className={`overflow-x-auto ${
              isMinimized ? "hidden md:block w-1/2" : "block w-full"
            }`}
          >
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
                  <th className="p-4 text-lg font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="bg-blue-50 text-gray-800">
                {verifiedApplications.map((school) => (
                  <tr
                    key={school.id}
                    onClick={() => openModal(school)}
                    className="hover:bg-blue-100 border-b border-gray-300 cursor-pointer"
                  >
                    <td className="p-4">{school.school_name}</td>
                    <td className="p-4">{school.fullname}</td>
                    <td className="p-4">{school.email}</td>
                    <td className="p-4">{school.phone}</td>
                    <td className="p-4">{school.address}</td>
                    <td className="p-4">{school.city}</td>
                    <td className="p-4">{school.postal_code}</td>
                    <td className="p-4">
                      {JSON.parse(school.school_type).join(", ")}
                    </td>
                    <td className="p-4">
                    <div className="flex items-center space-x-2 bg-green-100 bg-opacity-70 text-black border border-green-300 rounded-md px-2 py-1">
                        <FaCheck className="text-green-500" />
                        <span>Verified</span>
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

export default VerifiedApplications;
