import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import AdminHeader from './AdminHeader';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllSchools = () => {
const [schools, setSchools] = useState([]); // State to hold the schools data
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
      const fetchSchools = async () => {
          try {
              const token = localStorage.getItem('authToken');

              const response = await axios.get('http://51.222.207.88:8005/api/v1/schools', {
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
      <div className="overflow-x-auto bg-blue-50 border border-blue-200 rounded-lg p-5 m-4 shadow-lg">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-blue-300 text-white text-left">
              <th className="p-3 text-xs md:text-sm">Name</th>
              <th className="p-3 text-xs md:text-sm">Address</th>
              <th className="p-3 text-xs md:text-sm">City</th>
              <th className="p-3 text-xs md:text-sm">Postal Code</th>
              <th className="p-3 text-xs md:text-sm">Motto</th>
              <th className="p-3 text-xs md:text-sm">School Type</th>
              <th className="p-3 text-xs md:text-sm">Created At</th>
              <th className="p-3 text-xs md:text-sm">Updated At</th>
              <th className="p-3 text-xs md:text-sm">Active Status</th>
            </tr>
          </thead>
          <tbody className="bg-green-50 bg-opacity-80">
            {schools.map((school) => (
              <tr key={school.id} className="border-b border-green-100">
                <td className="p-3 text-xs md:text-base font-medium text-gray-700">{school.name}</td>
                <td className="p-3 text-xs md:text-base">{school.address}</td>
                <td className="p-3 text-xs md:text-base">{school.city}</td>
                <td className="p-3 text-xs md:text-base">{school.postal_code}</td>
                <td className="p-3 text-xs md:text-base">{school.motto}</td>
                <td className="p-3 text-xs md:text-base">{JSON.parse(school.school_type).join(", ")}</td>
                <td className="p-3 text-xs md:text-base">{new Date(school.created_at).toLocaleDateString()}</td>
                <td className="p-3 text-xs md:text-base">{new Date(school.updated_at).toLocaleDateString()}</td>
                <td className="p-3 text-xs md:text-base">{school.is_active ? "Active" : "Inactive"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminHeader>
  );
};
export default AllSchools;