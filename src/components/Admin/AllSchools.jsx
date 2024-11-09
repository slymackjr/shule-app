import "react-toastify/dist/ReactToastify.css";
import AdminHeader from "./AdminHeader";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaClock,
  FaCheck,
  FaTrash,
} from "react-icons/fa";
import SchoolModal from "./SchoolModal";

const AllSchools = () => {
  const [schools, setSchools] = useState([]);
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

  const handleDelete = async (schoolId) => {
    const isConfirmedFirst = window.confirm("Are you sure you want to delete this school?");
    if (!isConfirmedFirst) return;

    const isConfirmedSecond = window.confirm("Are you absolutely sure? This action cannot be undone.");
    if (!isConfirmedSecond) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(
        `http://78.47.138.167:8000/api/v1/schools/${schoolId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200 || response.status === 204) {
        setSchools(prev => prev.filter(school => school.id !== schoolId)); // Update state to remove deleted item
      }
    } catch (err) {
      console.error("Error deleting school:", err);
    }
  };

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://78.47.138.167:8000/api/v1/schools?page=1",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSchools(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch school data");
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  if (loading) return <p>Loading Schools...</p>;
  if (error) return <p>{error}</p>;
  if (!schools || schools.length === 0) return <p>No school data available.</p>;

  return (
    <AdminHeader>
      <div>
        {/* Buttons for toggling views */}
        <div className="flex justify-end m-4 space-x-4">
          <button
            onClick={() => setIsMinimized(false)}
            className={`px-4 py-2 rounded-lg font-semibold ${!isMinimized ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Full View
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className={`px-4 py-2 rounded-lg font-semibold ${isMinimized ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Minimized View
          </button>
        </div>

        {/* Responsive Table and Mobile Views */}
        <div className="m-2 shadow-lg overflow-x-auto">
          {!isMinimized ? (
            <div>
              {/* Main School List for Mobile (Responsive) */}
              <div className="block md:hidden space-y-4">
                {schools.map((school) => (
                  <div
                    key={school.id}
                    onClick={() => openModal(school)}
                    className="bg-white p-4 rounded-lg shadow-md border border-gray-300 cursor-pointer"
                  >
                    <p className="font-semibold text-blue-600 text-lg mb-2">
                      {school.name}
                    </p>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                      <div className="font-semibold text-green-700">motto:</div>
                      <div>{school.motto}</div>

                      <div className="font-semibold text-green-700">Registration no:</div>
                      <div>{school.registration_number}</div>


                      <div className="font-semibold text-green-700">Address:</div>
                      <div>{school.address}</div>

                      <div className="font-semibold text-green-700">City:</div>
                      <div>{school.city}</div>

                      <div className="font-semibold text-green-700">Postal Code:</div>
                      <div>{school.postal_code}</div>

                      <div className="font-semibold text-green-700">School Type:</div>
                      <div>{JSON.parse(school.school_type).join(", ")}</div>

                      <div className="font-semibold text-green-700">Created At:</div>
                      <div>{new Date(school.created_at).toLocaleDateString()}</div>

                      <div className="font-semibold text-green-700">Status:</div>
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
                  onDelete={handleDelete}
                  selectedSchool={selectedSchool}
                  closeModal={closeModal}
                />
              )}
            </div>
          ) : (
            // Minimized View for Mobile
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
                  {schools.map((school) => (
                    <tr
                      key={school.id}
                      onClick={() => openModal(school)}
                      className="hover:bg-blue-100 border-b border-gray-300 cursor-pointer"
                    >
                      <td className="p-3 font-medium">{school.name}</td>
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
            </div>
          )}

          {/* Full Table View for Desktop */}
          <div className={`overflow-x-auto ${isMinimized ? "hidden md:block" : "block"}`}>
            <table className="min-w-full border-collapse divide-y divide-gray-300 hidden md:table">
              <thead>
                <tr className="bg-blue-600 text-white text-left">
                  <th className="p-4 text-lg font-semibold">School Name</th>
                  <th className="p-4 text-lg font-semibold">Address</th>
                  <th className="p-4 text-lg font-semibold">city</th>
                  <th className="p-4 text-lg font-semibold">motto</th>
                  <th className="p-4 text-lg font-semibold">Registration no</th>
                  <th className="p-4 text-lg font-semibold">Created At</th>
                  <th className="p-4 text-lg font-semibold">Postal Code</th>
                  <th className="p-4 text-lg font-semibold">School Type</th>
                  <th className="p-4 text-lg font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="bg-blue-50 text-gray-800">
                {schools.map((school) => (
                  <tr
                    key={school.id}
                    onClick={() => openModal(school)}
                    className="hover:bg-blue-100 border-b border-gray-300 cursor-pointer"
                  >
                    <td className="p-3 font-medium">{school.name}</td>
                    <td className="p-3">{school.address}</td>
                    <td className="p-3">{school.city}</td>
                    <td className="p-3">{school.motto}</td>
                    <td className="p-3">{school.registration_number}</td>
                    <td className="p-4">{new Date(school.created_at).toLocaleDateString()}</td>
                    <td className="p-3">{school.postal_code}</td>
                    <td className="p-3">{JSON.parse(school.school_type).join(", ")}</td>
                    <td className="p-3">
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

export default AllSchools;

