import React, { useEffect, useState } from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa"; // Update this import to your logo's path
import { DashboardHeader } from "../Common";
import axios from "axios";

const SchoolDetails = () => {
  const [schoolData, setSchoolData] = useState(null);
  const schoolId = localStorage.getItem("schoolId");
  // Replace this with the school ID you want to fetch
  const authToken = localStorage.getItem("authToken"); // Retrieve the token from local storage
  console.log("Auth Token:", authToken); // Log the token to the console

  useEffect(() => {
    const fetchSchoolDetails = async () => {
      try {
        const response = await axios.get(
          `http://78.47.138.167:8000/api/v1/schools/${schoolId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // Add the auth token to the headers
            },
          }
        );
        setSchoolData(response.data.data);
      } catch (error) {
        console.error("Error fetching school details:", error);
      }
    };

    fetchSchoolDetails();
  }, [schoolId, authToken]); // Include authToken in the dependency array

  return (
    <DashboardHeader activeLink={"school-details"}>
      <h1 className="text-3xl font-bold text-gray-900">School Details</h1>
      <div className="mt-6 bg-white p-8 rounded-lg shadow-lg">
        {schoolData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                School Information
              </h2>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Name:</strong> {schoolData.name}
                </p>
                <p className="text-gray-700">
                  <strong>Motto:</strong> {schoolData.motto}
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> {schoolData.address}
                </p>
                <p className="text-gray-700">
                  <strong>City:</strong> {schoolData.city}
                </p>
                <p className="text-gray-700">
                  <strong>Postal Code:</strong> {schoolData.postal_code}
                </p>
                <p className="text-gray-700">
                  <strong>Type:</strong>{" "}
                  {JSON.parse(schoolData.school_type).join(", ")}
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> <FaPhone className="inline mr-1" />{" "}
                  {schoolData.schoolPhone || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> <FaEnvelope className="inline mr-1" />{" "}
                  {schoolData.schoolEmail || "N/A"}
                </p>
                <p
                  className={`text-gray-700 ${
                    schoolData.is_active
                      ? "font-semibold text-green-600"
                      : "font-semibold text-red-600"
                  }`}
                >
                  <strong>Active Status:</strong>{" "}
                  {schoolData.is_active ? "Yes" : "No"}
                </p>
              </div>
            </div>
            {schoolData.logo && (
    <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">School Logo</h2>
        {console.log(`Full image URL: http://78.47.138.167:8000/${schoolData.logo}`)}
        <img
            src={`http://78.47.138.167:8000/${schoolData.logo}`}
            alt="School Logo"
            className="w-40 h-40 object-cover rounded-lg shadow-md"
        />
    </div>
)}
          </div>
        ) : (
          <p className="text-gray-700">Loading school details...</p>
        )}
      </div>
    </DashboardHeader>
  );
};

export default SchoolDetails;
