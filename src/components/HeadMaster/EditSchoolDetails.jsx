import { useState } from 'react';
import { FaPhone, FaEnvelope} from 'react-icons/fa';// Update this import to your logo's path
import { DashboardHeader } from '../Common';

const EditSchoolDetails = () => {
    const [formData, setFormData] = useState({
        schoolName: '',
        schoolEmail: '',
        schoolPhone: '',
        schoolMotto: '',
        registrationNumber: '',
        primaryContact: '',
        secondaryContact: '',
        contractNumber: '',
        educationLevel: 'Primary School',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        // Implement save logic, likely an API call to update school details
        console.log('School details saved:', formData);
    };

    const handleLogoChange = (event) => {
        const logo = event.target.files[0 ];
        const reader = new FileReader();
        reader.onload = () => {
            setFormData({ ...formData, schoolLogo: reader.result });
        };
        reader.readAsDataURL(logo);
    };

    return (
        <DashboardHeader activeLink={'school-details'}>
            <h1 className="text-2xl font-bold">{formData.educationLevel} Details</h1>
<div className="mt-4 bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">School Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* School Name */}
        <div>
            <label className="block text-gray-700">School Name</label>
            <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md mt-1"
                placeholder="Enter school name"
            />
        </div>

        {/* School Email */}
        <div>
            <label className="block text-gray-700">School Email</label>
            <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                <input
                    type="email"
                    name="schoolEmail"
                    value={formData.schoolEmail}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-2 border rounded-md mt-1"
                    placeholder="Enter school email"
                />
            </div>
        </div>

        {/* School Phone */}
        <div>
            <label className="block text-gray-700">School Phone Number</label>
            <div className="relative">
                <FaPhone className="absolute top-3 left-3 text-gray-400" />
                <input
                    type="text"
                    name="schoolPhone"
                    value={formData.schoolPhone}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-2 border rounded-md mt-1"
                    placeholder="Enter school phone number"
                />
            </div>
        </div>

        {/* School Motto */}
        <div>
            <label className="block text-gray-700">School Motto</label>
            <input
                type="text"
                name="schoolMotto"
                value={formData.schoolMotto}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md mt-1"
                placeholder="Enter school motto"
            />
        </div>

        {/* Registration Number */}
        <div>
            <label className="block text-gray-700">Registration Number</label>
            <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md mt-1"
                placeholder="Enter registration number"
            />
        </div>

        {/* Primary Contact */}
        <div>
            <label className="block text-gray-700">Primary Contact</label>
            <input
                type="text"
                name="primaryContact"
                value={formData.primaryContact}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md mt-1"
                placeholder="Enter primary contact"
            />
        </div>

        {/* Secondary Contact */}
        <div>
            <label className="block text-gray-700">Secondary Contact</label>
            <input
                type="text"
                name="secondaryContact"
                value={formData.secondaryContact}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md mt-1"
                placeholder="Enter secondary contact"
            />
        </div>

        {/* Contract Number */}
        <div>
            <label className="block text-gray-700">Contract Number</label>
            <input
                type="text"
                name="contractNumber"
                value={formData.contractNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md mt-1"
                placeholder="Enter contract number"
            />
        </div>

        {/* School Logo */}
        <div>
            <label className="block text-gray-700">School Logo</label>
            <input
                type="file"
                name="schoolLogo"
                onChange={handleLogoChange}
                className="w-full p-2 border rounded-md mt-1"
            />
            {formData.schoolLogo && (
                <img
                    src={formData.schoolLogo}
                    alt="School Logo"
                    className="w-20 h-20 mt-2"
                />
            )}
        </div>
    </div>

    <button
        onClick={handleSave}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
    >
        Save Changes
    </button>
</div>
        </DashboardHeader>
    );
};

export default EditSchoolDetails;
