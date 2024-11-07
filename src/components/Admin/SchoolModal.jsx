import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify'; // For toast notifications

// VerifyForm Component
const VerifyForm = ({ schoolId, onConfirm, closeModal }) => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [motto, setMotto] = useState('');
  const [color, setColor] = useState('#ffffff'); // Default color
  const [logo, setLogo] = useState(null); // For logo image
  const [logoPreview, setLogoPreview] = useState(null); // Preview logo
  
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file); // Store the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result); // Set logo preview
      };
      reader.readAsDataURL(file); // Read the image file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(); // Use FormData to handle file uploads
  
    formData.append('registration_number', registrationNumber);
    formData.append('motto', motto);
    formData.append('color', color);
  
    if (logo) {
      formData.append('logo', logo); // Append logo to form data if available
    }
  
    try {
      const response = await axios.post(
        `http://78.47.138.167:8000/api/v1/applications/${schoolId}/verify`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'multipart/form-data', // Ensure the correct content type
          },
        }
      );
  
      // Use both message and info from API response in the toast notification
      const message = response.data.message || "Application verified successfully!";
      const info = response.data.info || "Additional information not available.";
      
      toast.success(`${message} ${info}`, {
        position: "top-center",
        style: { backgroundColor: "green", color: "white" }
      });
  
      setTimeout(() => closeModal(), 1000);
      onConfirm(response.data); // Call the onConfirm handler to update the parent component
      closeModal(); // Close the modal after success
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Error verifying the application. Please try again.");
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="registration_number" className="block text-sm font-medium text-gray-700">
          Registration Number
        </label>
        <input
          type="text"
          id="registration_number"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          required
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="motto" className="block text-sm font-medium text-gray-700">
          Motto
        </label>
        <input
          type="text"
          id="motto"
          value={motto}
          onChange={(e) => setMotto(e.target.value)}
          required
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="color" className="block text-sm font-medium text-gray-700">
          Color
        </label>
        <input
          type="color"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="mt-1 w-20 h-10"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
          Upload Logo
        </label>
        <input
          type="file"
          id="logo"
          onChange={handleLogoChange}
          accept="image/*"
          className="mt-1 p-2 border rounded-md w-full"
        />
        {logo && (
          <div className="mt-2">
            <img src={logoPreview} alt="Logo Preview" className="w-32 h-32 object-cover rounded-md" />
            <p className="text-sm text-gray-500 mt-2">Selected Logo: {logo.name}</p>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        Confirm Application
      </button>
    </form>
  );
};

// SchoolModal Component
const SchoolModal = ({ selectedSchool, closeModal, onEdit, onDelete, onConfirm }) => {
  const [showConfirmForm, setShowConfirmForm] = useState(false);

  const handleConfirmClick = () => {
    setShowConfirmForm(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
        <h2 className="text-xl font-bold mb-4 text-blue-600">{selectedSchool.school_name}</h2>

        {showConfirmForm ? (
          <VerifyForm
            schoolId={selectedSchool.id}
            onConfirm={onConfirm}  // Callback to handle confirmation in parent
            closeModal={closeModal} // Close modal after confirmation
          />
        ) : (
          <div className="flex justify-around mt-4">
            {/* Action buttons */}
            <button
              onClick={() => onEdit(selectedSchool.id)}
              className="flex items-center space-x-1 bg-blue-100 text-blue-600 px-3 py-2 rounded-md shadow-sm hover:bg-blue-200"
            >
              <FaEdit className="text-blue-600" />
              <span>Edit</span>
            </button>

            <button
              onClick={() => onDelete(selectedSchool.id)}
              className="flex items-center space-x-1 bg-red-100 text-red-600 px-3 py-2 rounded-md shadow-sm hover:bg-red-200"
            >
              <FaTrash className="text-red-600" />
              <span>Delete</span>
            </button>

            <button
              onClick={handleConfirmClick}
              className="flex items-center space-x-1 bg-green-100 text-green-600 px-3 py-2 rounded-md shadow-sm hover:bg-green-200"
            >
              <FaCheck className="text-green-600" />
              <span>Verify</span>
            </button>
          </div>
        )}

        <button onClick={closeModal} className="mt-6 text-sm text-gray-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default SchoolModal;
