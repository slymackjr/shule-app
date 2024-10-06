import { useState} from 'react';
import { FaPhone, FaEnvelope} from 'react-icons/fa';
import { DashboardHeader } from '../Common';

const HeadMasterProfile = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        region: '',
        district: '',
        ward: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        // Implement save logic, likely an API call to update profile
        console.log('Profile saved:', formData);
    };

    return (
        <DashboardHeader activeLink={'profile'}>
            <h1 className="text-2xl font-bold">Headmaster Profile</h1>
                    <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                        {/* Profile Form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md mt-1"
                                    placeholder="Enter first name"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Middle Name</label>
                                <input
                                    type="text"
                                    name="middleName"
                                    value={formData.middleName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md mt-1"
                                    placeholder="Enter middle name"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md mt-1"
                                    placeholder="Enter last name"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <div className="relative">
                                    <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 p-2 border rounded-md mt-1"
                                        placeholder="Enter email"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700">Phone Number</label>
                                <div className="relative">
                                    <FaPhone className="absolute top-3 left-3 text-gray-400" />
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 p-2 border rounded-md mt-1"
                                        placeholder="Enter phone number"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700">Region</label>
                                <input
                                    type="text"
                                    name="region"
                                    value={formData.region}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md mt-1"
                                    placeholder="Enter region"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">District</label>
                                <input
                                    type="text"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md mt-1"
                                    placeholder="Enter district"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Ward</label>
                                <input
                                    type="text"
                                    name="ward"
                                    value={formData.ward}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md mt-1"
                                    placeholder="Enter ward"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleSave}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Save Profile
                        </button>
                    </div>
        </DashboardHeader>
    );
};

export default HeadMasterProfile;
