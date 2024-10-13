import { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { DashboardHeader } from '../Common';
import axios from 'axios';

const HeadMasterProfile = () => {
    const [formData, setFormData] = useState({
        id: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        region: '',
        district: '',
        ward: '',
    });

    const [regions, setRegions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Fetch headmaster details, regions, districts, and wards when the component mounts
    useEffect(() => {
        const fetchHeadMasterDetails = async () => {
            try {
                const token = localStorage.getItem('teacher_token');
                const response = await axios.get('http://localhost:8000/api/head-master-details', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                if (response.data.success) {
                    const userData = response.data.data; // Access the `data` field
                    setFormData({
                        id: userData.id,
                        firstName: userData.first_name || '',
                        middleName: userData.middle_name || '',
                        lastName: userData.last_name || '',
                        email: userData.email || '',
                        phoneNumber: userData.phone_number || '',
                        region: userData.region || '',
                        district: userData.district || '',
                        ward: userData.ward || '',
                    });
                } else {
                    console.error('User not found:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching headmaster details:', error);
            }
        };
    
        fetchHeadMasterDetails();
    }, []);
    
    // Fetch regions on component mount
    useEffect(() => {
        axios.get('http://localhost:8000/api/regions')
            .then(response => {
                setRegions(response.data.regions);
            })
            .catch(error => {
                console.error('Error fetching regions:', error);
            });
    }, []);

    const handleRegionChange = (e) => {
        const selectedRegion = e.target.value;
        setFormData({ ...formData, region: selectedRegion });

        // Fetch districts based on selected region
        axios.get(`http://localhost:8000/api/district?region=${selectedRegion}`)
            .then(response => {
                setDistricts(response.data.districts);
                setWards([]); // Clear wards when region changes
            })
            .catch(error => {
                console.error('Error fetching districts:', error);
            });
    };

    const handleDistrictChange = (e) => {
        const selectedDistrict = e.target.value;
        setFormData({ ...formData, district: selectedDistrict });

        // Fetch wards based on selected district
        axios.get(`http://localhost:8000/api/wards?district=${selectedDistrict}`)
            .then(response => {
                setWards(response.data.wards);
            })
            .catch(error => {
                console.error('Error fetching wards:', error);
            });
    };

    // Handle save and update the profile
    const handleSave = async (e) => {
        e.preventDefault(); // Prevent page reload on form submit
        try {
            const token = localStorage.getItem('teacher_token');
            const response = await axios.put(`http://localhost:8000/api/head-master/${formData.id}/update`, {
                first_name: formData.firstName,
                middle_name: formData.middleName,
                last_name: formData.lastName,
                email: formData.email,
                phone_number: formData.phoneNumber,
                region: formData.region,
                district: formData.district,
                ward: formData.ward,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Profile updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <DashboardHeader activeLink={'profile'}>
            <h1 className="text-2xl font-bold">Headmaster Profile</h1>
            <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                {/* Profile Form */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSave}>
                    <div>
                        <label className="block text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md mt-1"
                            placeholder="Enter first name"
                            required
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
                            required
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
                            required
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
                                required
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
                                required
                            />
                        </div>
                    </div>
                    {/* Region Dropdown */}
                    <div>
                        <label className="block text-gray-700">Region</label>
                        <select
                            name="region"
                            value={formData.region}
                            onChange={handleRegionChange}
                            className="w-full p-2 border rounded-md mt-1"
                            required
                        >
                            <option value="" disabled>Select Region</option>
                            {regions.map(region => (
                                <option key={region.id} value={region.id}>
                                    {region.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* District Dropdown */}
                    <div>
                        <label className="block text-gray-700">District</label>
                        <select
                            name="district"
                            value={formData.district}
                            onChange={handleDistrictChange}
                            className="w-full p-2 border rounded-md mt-1"
                            disabled={!districts.length}
                            required
                        >
                            <option value="" disabled>Select District</option>
                            {districts.map(district => (
                                <option key={district.id} value={district.id}>
                                    {district.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Ward Dropdown */}
                    <div>
                        <label className="block text-gray-700">Ward</label>
                        <select
                            name="ward"
                            value={formData.ward}
                            onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                            className="w-full p-2 border rounded-md mt-1"
                            disabled={!wards.length}
                            required
                        >
                            <option value="" disabled>Select Ward</option>
                            {wards.map(ward => (
                                <option key={ward.id} value={ward.id}>
                                    {ward.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                    <button
                    type='submit'
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Save Profile
                </button>
                    </div>
                </form>
                
            </div>
        </DashboardHeader>
    );
};

export default HeadMasterProfile;
