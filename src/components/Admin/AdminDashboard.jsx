import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import AdminHeader from './AdminHeader';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../pages/layout';
import SchoolRequests from './SchoolRequests';

const AdminDashboard = () => {
  const [schools, setSchools] = useState([]); // State to hold the schools data
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
      const fetchSchools = async () => {
          try {
              const token = localStorage.getItem('authToken');
              console.log('Auth token:', token);

              const response = await axios.get('http://51.222.207.88:8005/api/v1/schools', {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });

              console.log('API Response:', response.data); // Check the full structure

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

  const SchoolCard = ({ school }) => {
    return (
      <div style={{
        backgroundColor: "#f0f8ff", // light blue background
        border: "2px solid #add8e6", // light blue border
        borderRadius: "10px", // rounded corners
        padding: "20px",
        margin: "15px",
        color: "#333", // text color
        maxWidth: "400px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" // subtle shadow
      }}>
        <h2 style={{ color: "#007acc" }}>{school.name}</h2>
        <p><strong>Address:</strong> {school.address}</p>
      <p><strong>City:</strong> {school.city}</p>
      <p><strong>Postal Code:</strong> {school.postal_code}</p>
      <p><strong>Motto:</strong> {school.motto}</p>
      <p><strong>School Type:</strong> {JSON.parse(school.school_type).join(", ")}</p>
      <p><strong>Created At:</strong> {new Date(school.created_at).toLocaleDateString()}</p>
      <p><strong>Updated At:</strong> {new Date(school.updated_at).toLocaleDateString()}</p>
      <p><strong>Active Status:</strong> {school.is_active ? "Active" : "Inactive"}</p>
      </div>
    );
  };
    return (
      <div>
       
            <AdminHeader>
            <div>
      {schools.map((school) => (
        <SchoolCard key={school.id} school={school} />
      ))}
    </div>
    
    </AdminHeader>
    
<footer className="footer bg-blue-700 text-white text-center py-4 mt-8">
<div className="container mx-auto">
  <div className="flex justify-between">
    <p>&copy; 2024 Altus Smart Solution. All Rights Reserved.</p>
    <p>Developed & Powered by: Altus Smart Solution</p>
  </div>
</div>
</footer> 
</div>

    );

};
export default AdminDashboard;

