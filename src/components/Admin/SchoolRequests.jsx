import { useState, useEffect } from 'react';
import { FaCheck, FaExclamation, FaEdit } from 'react-icons/fa';
import axios from 'axios';

const SchoolRequests = () => {
  const [requests, setRequests] = useState([]);
  const [notification, setNotification] = useState({ msg: '', success: false });

  useEffect(() => {
    // Fetch school requests from API
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/school-requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching school requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const displayToastNotification = (msg, success) => {
    setNotification({ msg, success });
    setTimeout(() => setNotification({ msg: '', success: false }), 3000);
  };

  return (
    <div className="p-1 max-h-screen">
      <div className="p-4 rounded-lg mt-14">
        <div className="text-lg my-3">School requests</div>
        
        {notification.msg && (
          <div
            className={`fixed z-50 top-6 right-5 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow ${
              notification.success ? 'bg-green-100 text-green-500' : 'bg-orange-100 text-orange-500'
            }`}
            role="alert"
          >
            <div className="flex-shrink-0 w-8 h-8">
              {notification.success ? (
                <FaCheck className="w-5 h-5" />
              ) : (
                <FaExclamation className="w-5 h-5" />
              )}
            </div>
            <div className="ms-3 text-sm font-normal">{notification.msg}</div>
          </div>
        )}

        {requests.length > 0 ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-center">NO</th>
                  <th className="px-6 py-3 text-center">School name</th>
                  <th className="px-6 py-3 text-center">Registration number</th>
                  <th className="px-6 py-3 text-center">Type</th>
                  <th className="px-6 py-3 text-center">Level</th>
                  <th className="px-6 py-3 text-center">Phone number</th>
                  <th className="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((school_request, key) => (
                  <tr key={school_request.id} className="bg-white border-b hover:bg-gray-50 cursor-pointer">
                    <td className="text-center p-2">{key + 1}</td>
                    <td className="text-center p-2">{school_request.school_name}</td>
                    <td className="text-center p-2">{school_request.school_registration_number}</td>
                    <td className="text-center p-2">{school_request.type}</td>
                    <td className="text-center p-2">{school_request.level}</td>
                    <td className="text-center p-2">
                      {school_request.primary_phone_number || school_request.secondary_phone_number}
                    </td>
                    <td className="text-center p-2">
                      <a
                        href={`/admin/schoolRequests/${school_request.id}`}
                        className="block text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        <FaEdit className="inline mr-2" />
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <section className="border border-gray-200 rounded-md h-60 p-2 flex items-center justify-center">
            <div className="text-center">
              <FaExclamation className="w-10 h-10 mx-auto text-gray-400" />
              <p className="mt-2 text-gray-500">School requests are not available yet!</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SchoolRequests;
