import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import AdminHeader from './AdminHeader';
import React, { useState, useEffect } from 'react';
import YourComponent from './testLocation';




const AdminDashboard = () => {
  
    return (
      <div>
       
            <AdminHeader>
            <YourComponent/>
  
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

