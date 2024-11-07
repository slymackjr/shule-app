import "react-toastify/dist/ReactToastify.css";
import AdminHeader from "./AdminHeader";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaCheckCircle,
  FaClock,
  FaEdit,
  FaTrash,
  FaCheck,
} from "react-icons/fa";
import SchoolModal from "./SchoolModal";

const UnverifiedApplications = () => {
  const [Applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  const [selectedSchool, setSelectedSchool] = useState(null);

  const openModal = (school) => {
    setSelectedSchool(school);
  };

  const closeModal = () => {
    setSelectedSchool(null);
  };
  const handleEdit = (school) => {
    // Handle edit logic (open form or fill details)
    console.log("Editing school:", school);
  };

  const handleDelete = async (schoolId) => {
    // First confirmation prompt
    const isConfirmedFirst = window.confirm(
      "Are you sure you want to delete this application?"
    );
  
    if (!isConfirmedFirst) {
      console.log("Delete action cancelled");
      return; // Stop execution if the user cancels
    }
  
    // Second confirmation prompt
    const isConfirmedSecond = window.confirm(
      "Are you absolutely sure? This action cannot be undone."
    );
  
    if (!isConfirmedSecond) {
      console.log("Delete action cancelled");
      return; // Stop execution if the user cancels
    }
  
    try {
      const token = localStorage.getItem("authToken");
      
      // Send DELETE request
      const response = await axios.delete(
        `http://78.47.138.167:8000/api/v1/applications/${schoolId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      console.log(schoolId);
      
      // Check if the response indicates success
      if (response.status === 200 || response.status === 204) {
        console.log("School deleted successfully");
        // Optionally update state to remove the school from your UI
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (err) {
      console.error("Error deleting school:", err);
    }
  };
  
  
  const handleConfirm = (data) => { // Removed async and changed parameter
    console.log('Confirmation successful:', data);
    setApplications((prevApplications) =>
      prevApplications.filter((application) => application.id !== data.id)
    );
  };

  const handleModalClose = () => {
    setSelectedSchool(null);
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("authToken");
       
        const response = await axios.get(
          "http://78.47.138.167:8000/api/v1/applications?page=1",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setApplications(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch Applications data");
        console.error("Error fetching Applications:", err);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p>Loading Applications...</p>;
  if (error) return <p>{error}</p>;
  if (!Applications || Applications.length === 0)
    return <p>No Applications data available.</p>;

  const unverifiedApplications = Applications.filter(
    (app) => app.is_verified === 0
  );

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
                {unverifiedApplications.map((school) => (
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
                      <div className="flex items-center space-x-2 bg-red-100 bg-opacity-70 text-red-700 border border-red-300 rounded-md px-2 py-1">
                        <FaClock className="text-red-500" />
                        <span>Pending</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Popup */}
              {selectedSchool && (
                <SchoolModal
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onConfirm={handleConfirm}
                  selectedSchool={selectedSchool}
                  closeModal={closeModal}
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
                  {unverifiedApplications.map((school) => (
                    <tr
                      key={school.id}
                      onClick={() => openModal(school)} // Open modal when a row is clicked
                      className="hover:bg-blue-100 border-b border-gray-300 cursor-pointer"
                    >
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

              {/* Modal Popup */}
              {selectedSchool && (
                <SchoolModal
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onConfirm={handleConfirm}
                  selectedSchool={selectedSchool}
                  closeModal={closeModal}
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
                {unverifiedApplications.map((school) => (
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
