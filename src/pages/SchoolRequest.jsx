import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { bg, skuliAppLogo } from '../assets/images';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // Import loading spinner icon

const SchoolRequest = () => {
  const [formData, setFormData] = useState({
    school_name: '',
    school_registration_number: '',
    type: '',
    level: '',
    region: '',
    district: '',
    ward: '',
    first_name: '',
    last_name: '',
    phone_number: '', 
    teacher_email: '', 
    school_email: '',  
    school_phone_number: '',  
    street: '',        
    postal_address: '', 
    gender: '', 
    role: '', 
    motto: '', 
  });

  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    // Fetch regions on component mount
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted
    setNotification(null); // Clear previous notifications
    try {
      // Submit the form data
      axios.post('http://localhost:8000/api/school-registration', formData)
        .then(response => {
          setLoading(false); // Set loading to false when the request completes
          if (response.data.response) {
            setNotification({ message: response.data.message, type: 'success' });
          } else {
            setNotification({ message: response.data.message, type: 'error' });
          }
        })
        .catch(error => {
          setLoading(false); // Set loading to false in case of error
          if (error.response && error.response.status === 422) {
            setNotification({ message: 'Validation failed. Please check your input.', type: 'error' });
          } else {
            setNotification({ message: 'Error submitting request.', type: 'error' });
          }
        });
    } catch (err) {
      setLoading(false); // Set loading to false in case of unexpected error
      console.error('Error during form submission:', err);
      setNotification({ message: 'An unexpected error occurred.', type: 'error' });
    }
  };  



  return (
    <div className="bg-indigo-50 min-h-screen">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/">
            <img src={skuliAppLogo} alt="SkuliApp Logo" className="w-40" />
          </Link>
        </div>
      </header>

      <main className="container mx-auto mt-12 pb-5">
        <div className="flex justify-center">
          <div className="w-full xl:w-10/12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-8">
                  <h3 className="text-2xl font-bold text-indigo-600 mb-4">Submit Your School Details</h3>
                  <p className="text-gray-600 mb-5">
                    Fill in the details below, and we’ll get back to you in 3 working days.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* School Details */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-indigo-600">School Name</label>
                        <input
                          type="text"
                          name="school_name"
                          className="w-full p-2 border border-indigo-600 rounded-md"
                          value={formData.school_name}
                          onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-indigo-600">Registration Number</label>
                        <input
                          type="text"
                          name="school_registration_number"
                          className="w-full p-2 border border-indigo-600 rounded-md"
                          value={formData.school_registration_number}
                          onChange={(e) => setFormData({ ...formData, school_registration_number: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-indigo-600">Sponsorship Type</label>
                        <select
                          name="type"
                          className="w-full p-2 border border-indigo-600 rounded-md"
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          required
                        >
                          <option value="" disabled>Select Type</option>
                          <option value="government">Government</option>
                          <option value="private">Private</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-indigo-600">Level</label>
                        <select
                          name="level"
                          className="w-full p-2 border border-indigo-600 rounded-md"
                          value={formData.level}
                          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                        >
                          <option value="" disabled>Select Level</option>
                          <option value="primary">Primary</option>
                          <option value="O level">O level</option>
                          <option value="A level">A level</option>
                        </select>
                      </div>
                    </div>

                    {/* Region, District, and Ward */}
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="block text-indigo-600">Region</label>
                        <select
                          name="region"
                          className="w-full p-2 border border-indigo-600 rounded-md"
                          value={formData.region}
                          onChange={handleRegionChange}
                        >
                          <option value="" disabled>Select Region</option>
                          {regions.map(region => (
                            <option key={region.id} value={region.id}>{region.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-indigo-600">District</label>
                        <select
                          name="district"
                          className="w-full p-2 border border-indigo-600 rounded-md"
                          value={formData.district}
                          onChange={handleDistrictChange}
                          disabled={!districts.length}
                        >
                          <option value="" disabled>Select District</option>
                          {districts.map(district => (
                            <option key={district.id} value={district.id}>{district.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-indigo-600">Ward</label>
                        <select
                          name="ward"
                          className="w-full p-2 border border-indigo-600 rounded-md"
                          value={formData.ward}
                          onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                          disabled={!wards.length}
                        >
                          <option value="" disabled>Select Ward</option>
                          {wards.map(ward => (
                            <option key={ward.id} value={ward.id}>{ward.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Head Master Details */}
                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      <div>
                        <label className="block text-indigo-600">First Name</label>
                        <input
                          type="text"
                          name="first_name"
                          className="w-full p-2 border border-indigo-600 rounded-md"
                          value={formData.first_name}
                          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-indigo-600">Last Name</label>
                        <input
                          type="text"
                          name="last_name"
                          className="w-full p-2 border border-indigo-600 rounded-md"
                          value={formData.last_name}
                          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-indigo-600">Phone Number</label>
                        <input
                          type="text"
                          name="phone_number"
                          className="w-full p-2 border border-indigo-600 rounded-md"
                          value={formData.phone_number}
                          onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-indigo-600">Teacher Email</label>
                        <input
                          type="email"
                          name="teacher_email"
                          className="w-full p-2 border border-indigo-600 rounded-md"
                          value={formData.teacher_email}
                          onChange={(e) => setFormData({ ...formData, teacher_email: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-indigo-600">Head Title</label>
                        <select
                          name="gender"
                          className="w-full p-2 border border-indigo-600 rounded-md"
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          required
                        >
                          <option value="" disabled>Select Title</option>
                          <option value="male">Head Master</option>
                          <option value="female">Head Mistress</option>
                        </select>
                      </div>

                       <div>
                        <label className="block text-indigo-600">School Motto</label>
                        <input
                          type="text"
                          name="motto"
                          className="w-full p-2 border border-indigo-600 rounded-md"
                          value={formData.motto}
                          onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
                        />
                      </div>

                    </div>
                    
                    {/* New Fields: Street, Postal Address, and School Email */}
                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      <div>
                        <label className="block text-indigo-600">Street</label>
                        <input
                          type="text"
                          name="street"
                          className="w-full p-2 border border-indigo-600 rounded-md"
                          value={formData.street}
                          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-indigo-600">Postal Address (P.O. Box)</label>
                        <input
                          type="text"
                          name="postal_address"
                          className="w-full p-2 border border-indigo-600 rounded-md"
                          value={formData.postal_address}
                          onChange={(e) => setFormData({ ...formData, postal_address: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-indigo-600">School Email</label>
                        <input
                          type="email"
                          name="school_email"
                          className="w-full p-2 border border-indigo-600 rounded-md"
                          value={formData.school_email}
                          onChange={(e) => setFormData({ ...formData, school_email: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-indigo-600">School Number</label>
                        <input
                          type="text"
                          name="school_number"
                          className="w-full p-2 border border-indigo-600 rounded-md"
                          value={formData.school_phone_number}
                          onChange={(e) => setFormData({ ...formData, school_phone_number: e.target.value })}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={`mt-6 w-full flex justify-center py-3 rounded-md bg-indigo-600 text-white font-bold hover:bg-indigo-700`}
                      disabled={loading} // Disable the button when loading is true
                    >
                      {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : 'Submit Request'} {/* Show loading spinner if loading */}
                    </button>
                  </form>
                  
                  {notification && (
                    <p className={`mt-4 text-center font-bold ${notification.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                      {notification.message}
                    </p>
                  )}
                </div>
                <div className="hidden md:block md:w-1/2 bg-indigo-100">
                <img
                    src={bg}
                    alt="Hero Image"
                    className="w-full h-full object-cover"
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 shadow-md mt-auto">
        <div className="container mx-auto text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} SkuliApp. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SchoolRequest;
