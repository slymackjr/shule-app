import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

const EditPupils = ({ pupil, regions, districts, wards }) => {
    const [formData, setFormData] = useState({
        first_name: pupil.first_name,
        middle_name: pupil.middle_name,
        last_name: pupil.last_name,
        region: pupil.region_id || '',
        district: pupil.district_id || '',
        ward: pupil.ward_id || '',
        postal_address: pupil.postal,
        street: pupil.street,
        gender: pupil.gender,
        email: pupil.email,
        phone_number: pupil.phone_number,
        birth_date: pupil.date_birth,
    });
    
    const [notification, setNotification] = useState({ message: '', success: false });

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', success: false });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleRegionChange = async (e) => {
        const regionId = e.target.value;
        setFormData((prevData) => ({ ...prevData, region: regionId, district: '', ward: '' }));

        try {
            const response = await axios.post('/fetchDistricts', { region_id: regionId });
            // Set districts state with response.data.districts
            // You need to manage districts in state or props
        } catch (error) {
            console.error(error);
        }
    };

    const handleDistrictChange = async (e) => {
        const districtId = e.target.value;
        setFormData((prevData) => ({ ...prevData, district: districtId, ward: '' }));

        try {
            const response = await axios.post('/fetchWards', { district_id: districtId });
            // Set wards state with response.data.wards
            // You need to manage wards in state or props
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Submit the form data to your backend
        try {
            const response = await axios.post(`/update.pupil/${pupil.id}`, formData);
            setNotification({ message: response.data.message, success: true });
        } catch (error) {
            setNotification({ message: 'Error updating pupil.', success: false });
            console.error(error);
        }
    };

    return (
        <div className="p-4 max-w-screen-lg mx-auto">
            {notification.message && (
                <div className={`flex items-center p-4 mb-4 text-sm text-gray-500 rounded-lg shadow-md ${notification.success ? 'bg-green-100' : 'bg-red-100'}`}>
                    {notification.success ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />}
                    <span className="ml-2">{notification.message}</span>
                    <button onClick={() => setNotification({ message: '', success: false })} className="ml-auto text-gray-400 hover:text-gray-900">
                        <FaTimes />
                    </button>
                </div>
            )}

            <h1 className="text-xl mb-5 font-semibold">Edit Pupils</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-3 md:gap-6">
                    <InputField
                        label="First Name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        label="Middle Name"
                        name="middle_name"
                        value={formData.middle_name}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        label="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="grid md:grid-cols-3 md:gap-6">
                    <SelectField
                        label="Region"
                        name="region"
                        value={formData.region}
                        onChange={handleRegionChange}
                        options={regions}
                        required
                    />
                    <SelectField
                        label="District"
                        name="district"
                        value={formData.district}
                        onChange={handleDistrictChange}
                        options={districts}
                    />
                    <SelectField
                        label="Ward"
                        name="ward"
                        value={formData.ward}
                        onChange={handleChange}
                        options={wards}
                    />
                </div>
                <div className="grid md:grid-cols-3 md:gap-6">
                    <InputField
                        label="Postal Address"
                        name="postal_address"
                        value={formData.postal_address}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                    />
                    <SelectField
                        label="Select Gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        options={[
                            { id: '', name: 'Gender' },
                            { id: 'Male', name: 'Male' },
                            { id: 'Female', name: 'Female' },
                        ]}
                        required
                    />
                </div>
                <div className="grid md:grid-cols-3 md:gap-6">
                    <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Phone Number"
                        name="phone_number"
                        type="tel"
                        value={formData.phone_number}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Date of Birth"
                        name="birth_date"
                        type="date"
                        value={formData.birth_date}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Submit
                </button>
            </form>
        </div>
    );
};

const InputField = ({ label, name, value, onChange, required = false, type = "text" }) => (
    <div className="relative z-0 mb-5">
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
            {label} {required && <span className="text-red-600">*</span>}
        </label>
        <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            required={required}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
    </div>
);

const SelectField = ({ label, name, value, onChange, options, required = false }) => (
    <div className="relative z-0 mb-5">
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
            {label} {required && <span className="text-red-600">*</span>}
        </label>
        <select
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            required={required}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
            <option value="" disabled>Select {label}</option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
    </div>
);

EditPupils.propTypes = {
    pupil: PropTypes.arrayOf(PropTypes.object).isRequired,
    regions: PropTypes.arrayOf(PropTypes.object).isRequired,
    districts: PropTypes.arrayOf(PropTypes.object).isRequired,
    wards: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

export default EditPupils;
