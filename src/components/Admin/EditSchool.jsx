import { useState, useEffect } from "react";
import { FaCheck, FaExclamation, FaTimes, FaWarning } from "react-icons/fa";
import axios from "axios";
import $ from "jquery";
import PropTypes from 'prop-types';

const EditSchool = ({ schoolRequest }) => {
  const [formData, setFormData] = useState({
    schoolName: "",
    contractNumber: "",
    schoolRegistrationNumber: "",
    type: "",
    level: "",
    region: "",
    district: "",
    ward: "",
    firstName: "",
    middleName: "",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    motto: "",
  });

  useEffect(() => {
    if (schoolRequest) {
      setFormData({
        schoolName: schoolRequest.school_name,
        contractNumber: schoolRequest.contract_number,
        schoolRegistrationNumber: schoolRequest.school_registration_number,
        type: schoolRequest.type,
        level: schoolRequest.level,
        region: schoolRequest.region,
        district: schoolRequest.district,
        ward: schoolRequest.ward,
        firstName: schoolRequest.first_name,
        middleName: schoolRequest.middle_name,
        lastName: schoolRequest.last_name,
        primaryPhoneNumber: schoolRequest.primary_phone_number,
        secondaryPhoneNumber: schoolRequest.secondary_phone_number,
        motto: schoolRequest.motto,
      });
    }
  }, [schoolRequest]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/admin/schoolRequests/edit", formData);
      if (response.data.success) {
        displayToastNotification("School updated successfully!", true);
      }
    } catch (error) {
      displayToastNotification("Error updating school.", false);
    }
  };

  const displayToastNotification = (msg, success) => {
    const toastHTML = success ? (
      <div className="flex z-50 fixed top-6 right-5 items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-full">
          <FaCheck className="w-5 h-5" />
        </div>
        <div className="ms-3 text-sm font-normal">{msg}</div>
        <button
          type="button"
          id="toaster-close"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
          onClick={() => $("#notification-container").html("")}
        >
          <FaTimes className="w-5 h-5" />
        </button>
      </div>
    ) : (
      <div className="flex z-50 fixed top-6 right-5 items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-full">
          <FaWarning className="w-5 h-5" />
        </div>
        <div className="ms-3 text-sm font-normal">{msg}</div>
        <button
          type="button"
          id="toaster-close"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
          onClick={() => $("#notification-container").html("")}
        >
          <FaTimes className="w-5 h-5" />
        </button>
      </div>
    );

    $("#notification-container").html(toastHTML);
    setTimeout(() => {
      $("#notification-container").html("");
    }, 3000);
  };

  return (
    <div className="p-1 max-h-screen sm:ml-64">
      <div className="p-4 rounded-lg mt-14">
        {schoolRequest ? (
          <div>
            <div className="my-5 px-5">
              <span>{schoolRequest.school_name}</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="px-5 flex flex-col space-y-4">
                {/* School Details */}
                <div>
                  <h3 className="font-bold text-slate-600 text-sm my-2 py-2 border-b-2 border-slate-200">
                    School Details
                  </h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        School Name
                      </label>
                      <input
                        type="text"
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleInputChange}
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="School Name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Registration Number
                      </label>
                      <input
                        type="text"
                        name="schoolRegistrationNumber"
                        value={formData.schoolRegistrationNumber}
                        onChange={handleInputChange}
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="P0702517"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Region
                      </label>
                      <select
                        name="region"
                        value={formData.region}
                        onChange={handleInputChange}
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option>Select Region</option>
                        {/* Add options dynamically */}
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        District
                      </label>
                      <select
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option>Select District</option>
                        {/* Add options dynamically */}
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Ward
                      </label>
                      <select
                        name="ward"
                        value={formData.ward}
                        onChange={handleInputChange}
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option>Select Ward</option>
                        {/* Add options dynamically */}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Headmaster Details */}
                <div>
                  <h3 className="font-bold text-slate-600 text-sm my-2 py-2 border-b-2 border-slate-200">
                    Headmaster Details
                  </h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleInputChange}
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Middle Name"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Primary Phone Number
                      </label>
                      <input
                        type="text"
                        name="primaryPhoneNumber"
                        value={formData.primaryPhoneNumber}
                        onChange={handleInputChange}
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Primary Phone Number"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Secondary Phone Number
                      </label>
                      <input
                        type="text"
                        name="secondaryPhoneNumber"
                        value={formData.secondaryPhoneNumber}
                        onChange={handleInputChange}
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Secondary Phone Number"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div>
                  <h3 className="font-bold text-slate-600 text-sm my-2 py-2 border-b-2 border-slate-200">
                    Additional Information
                  </h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Type
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option>Select Type</option>
                        {/* Add options dynamically */}
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Level
                      </label>
                      <select
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option>Select Level</option>
                        {/* Add options dynamically */}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      School Motto
                    </label>
                    <input
                      type="text"
                      name="motto"
                      value={formData.motto}
                      onChange={handleInputChange}
                      className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="School Motto"
                    />
                  </div>
                </div>
                {/* Submit Button */}
                <div className="my-4">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Update School
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center p-5">
            <h2 className="font-bold text-xl">No School Selected</h2>
            <p className="text-gray-600">Please select a school to edit.</p>
          </div>
        )}
      </div>
      <div id="notification-container" className="absolute top-0 right-0"></div>
    </div>
  );
};

EditSchool.propTypes = {
    schoolRequest: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default EditSchool;
