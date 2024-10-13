import { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaExclamationTriangle } from "react-icons/fa";
import axios from "axios";

const CreatePupils = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    region: "",
    district: "",
    ward: "",
    postalAddress: "",
    street: "",
    gender: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
  });

  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [notification, setNotification] = useState({ msg: "", success: null });

  useEffect(() => {
    // Fetch regions
    axios.get("/fetchRegions").then((response) => setRegions(response.data));
  }, []);

  const handleRegionChange = (event) => {
    const regionId = event.target.value;
    setFormData({ ...formData, region: regionId });
    setDistricts([]);
    setWards([]);

    axios
      .post("/fetchDistricts", { region_id: regionId })
      .then((response) => setDistricts(response.data.districts));
  };

  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setFormData({ ...formData, district: districtId });
    setWards([]);

    axios
      .post("/fetchWards", { district_id: districtId })
      .then((response) => setWards(response.data.wards));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Form submission logic here
    axios
      .post("/pupil/create", formData)
      .then(() => {
        setNotification({ msg: "Pupil created successfully", success: true });
      })
      .catch(() => {
        setNotification({ msg: "Error creating pupil", success: false });
      });
  };

  const renderNotification = () => {
    if (notification.msg) {
      const Icon = notification.success ? FaCheck : FaExclamationTriangle;
      const iconColor = notification.success ? "text-green-500" : "text-orange-500";
      const bgColor = notification.success ? "bg-green-100" : "bg-orange-100";

      return (
        <div
          className={`fixed top-6 right-5 z-50 flex items-center w-full max-w-xs p-4 rounded-lg shadow ${bgColor}`}
          role="alert"
        >
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${iconColor}`}>
            <Icon />
          </div>
          <div className="ml-3 text-sm font-normal">{notification.msg}</div>
          <button
            type="button"
            className="ml-auto text-gray-400 hover:text-gray-900 p-1.5 hover:bg-gray-100 rounded-lg"
            onClick={() => setNotification({ msg: "", success: null })}
          >
            <FaTimes />
          </button>
        </div>
      );
    }
  };

  return (
    <div className="p-1 max-h-screen">
      <div className="p-4 rounded-lg mt-14">
        {renderNotification()}
        <h1 className="text-xl mb-5 font-semibold">Create Pupils</h1>
        <form onSubmit={handleSubmit} className="max-w-full mx-auto">
          <div className="grid md:grid-cols-3 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">First Name <span className="text-red">*</span></label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="shadow-sm bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">Middle Name <span className="text-red">*</span></label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                className="shadow-sm bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">Last Name <span className="text-red">*</span></label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="shadow-sm bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">Region</label>
              <select
                name="region"
                value={formData.region}
                onChange={handleRegionChange}
                className="shadow-sm bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
              >
                <option disabled selected>Regions</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">District</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleDistrictChange}
                className="shadow-sm bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
              >
                <option disabled selected>Select District</option>
                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">Ward</label>
              <select
                name="ward"
                value={formData.ward}
                onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                className="shadow-sm bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
              >
                <option disabled selected>Select Ward</option>
                {wards.map((ward) => (
                  <option key={ward.id} value={ward.id}>
                    {ward.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">Postal Address</label>
              <input
                type="text"
                name="postalAddress"
                value={formData.postalAddress}
                onChange={handleInputChange}
                className="shadow-sm bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">Street</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                className="shadow-sm bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">Gender <span className="text-red">*</span></label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="shadow-sm bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
                required
              >
                <option disabled selected>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="shadow-sm bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="shadow-sm bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">Birth Date</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="shadow-sm bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
              />
            </div>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Create Pupil
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePupils;
