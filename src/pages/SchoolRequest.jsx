import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { bg, skuliAppLogo } from '../assets/images';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // Import loading spinner icon
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Import success and error icons

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

  const [errors, setErrors] = useState({}); // Holds validation errors
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
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
    setErrors({}); // Reset errors

    try {
      // Submit the form data
      await axios.post('http://localhost:8000/api/school-registration', formData)
        .then(response => {
          setLoading(false); // Set loading to false when the request completes
          if (response.data.response) {
             // Display success toast
             toast.success(
              <div className="flex items-center">
                <FaCheckCircle className="text-white bg-green-500 rounded-full mr-2 p-1" />
                {response.data.message}
              </div>,
              { position: 'top-center' }
            );
          } else {
            // Display error toast
            toast.error(
              <div className="flex items-center">
                <FaTimesCircle className="text-white bg-red-500 rounded-full mr-2 p-1" />
                {response.data.message}
              </div>,
              { position: 'top-center' }
            );
          }
        })
        .catch(error => {
          setLoading(false); // Set loading to false in case of error
          if (error.response && error.response.status === 422) {
            setErrors(error.response.data.errors); // Set validation errors
            toast.error(
              <div className="flex items-center">
                <FaTimesCircle className="text-white bg-red-500 rounded-full mr-2 p-1" />
                Validation failed. Please check your input.
              </div>,
              { position: 'top-center' }
            );
          } else {
            toast.error(
              <div className="flex items-center">
                <FaTimesCircle className="text-white bg-red-500 rounded-full mr-2 p-1" />
                Error submitting request.
              </div>,
              { position: 'top-center' }
            );
          }
        });
    } catch (err) {
      setLoading(false); // Set loading to false in case of unexpected error
      console.error('Error during form submission:', err);
      toast.error(
        <div className="flex items-center">
          <FaTimesCircle className="text-white bg-red-500 rounded-full mr-2 p-1" />
          An unexpected error occurred.
        </div>,
        { position: 'top-center' }
      );
    }
  };  



  return (
    <div className="bg-indigo-50 min-h-screen">
      {/* Toast Container */}
      <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
      />

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
                          className={`w-full p-2 border ${errors.school_name ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.school_name}
                          onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                          required
                        />
                        {errors.school_name && <p className="text-red-600">{errors.school_name[0]}</p>}
                      </div>

                      <div>
                        <label className="block text-indigo-600">Registration Number</label>
                        <input
                          type="text"
                          name="school_registration_number"
                          className={`w-full p-2 border ${errors.school_registration_number ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.school_registration_number}
                          onChange={(e) => setFormData({ ...formData, school_registration_number: e.target.value })}
                          required
                        />
                        {errors.school_registration_number && <p className="text-red-600">{errors.school_registration_number[0]}</p>}
                      </div>

                      <div>
                        <label className="block text-indigo-600">Sponsorship Type</label>
                        <select
                          name="type"
                          className={`w-full p-2 border ${errors.type ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          required
                        >
                          <option value="" disabled>Select Type</option>
                          <option value="government">Government</option>
                          <option value="private">Private</option>
                        </select>
                        {errors.type && <p className="text-red-600">{errors.type[0]}</p>}
                      </div>

                      <div>
                        <label className="block text-indigo-600">Level</label>
                        <select
                          name="level"
                          className={`w-full p-2 border ${errors.level ? 'border-red-600' : 'border-indigo-600'}  rounded-md`}
                          value={formData.level}
                          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                          required
                        >
                          <option value="" disabled>Select Level</option>
                          <option value="primary">Primary</option>
                          <option value="O level">O level</option>
                          <option value="A level">A level</option>
                        </select>
                        {errors.level && <p className="text-red-600">{errors.level[0]}</p>}
                      </div>
                    </div>

                    {/* Region, District, and Ward */}
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="block text-indigo-600">Region</label>
                        <select
                          name="region"
                          className={`w-full p-2 border ${errors.region ? 'bordeer-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.region}
                          onChange={handleRegionChange}
                          required
                        >
                          <option value="" disabled>Select Region</option>
                          {regions.map(region => (
                            <option key={region.id} value={region.id}>{region.name}</option>
                          ))}
                        </select>
                        {errors.region && <p className="text-red-600">{errors.region[0]}</p>}
                      </div>

                      <div>
                        <label className="block text-indigo-600">District</label>
                        <select
                          name="district"
                          className={`w-full p-2 border ${errors.district ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.district}
                          onChange={handleDistrictChange}
                          disabled={!districts.length}
                          required
                        >
                          <option value="" disabled>Select District</option>
                          {districts.map(district => (
                            <option key={district.id} value={district.id}>{district.name}</option>
                          ))}
                        </select>
                        {errors.district && <p className="text-red-600">{errors.district[0]}</p>}
                      </div>

                      <div>
                        <label className="block text-indigo-600">Ward</label>
                        <select
                          name="ward"
                          className={`w-full p-2 border ${errors.ward ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.ward}
                          onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                          disabled={!wards.length}
                          required
                        >
                          <option value="" disabled>Select Ward</option>
                          {wards.map(ward => (
                            <option key={ward.id} value={ward.id}>{ward.name}</option>
                          ))}
                        </select>
                        {errors.ward && <p className="text-red-600">{errors.ward[0]}</p>}
                      </div>
                    </div>

                    {/* Head Master Details */}
                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      <div>
                        <label className="block text-indigo-600">First Name</label>
                        <input
                          type="text"
                          name="first_name"
                          className={`w-full p-2 border ${errors.first_name ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.first_name}
                          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                          required
                        />
                        {errors.first_name && <p className="text-red-600">{errors.first_name[0]}</p>}
                      </div>

                      <div>
                        <label className="block text-indigo-600">Last Name</label>
                        <input
                          type="text"
                          name="last_name"
                          className={`w-full p-2 border ${errors.last_name ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.last_name}
                          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                          required
                        />
                        {errors.last_name && <p className="text-red-600">{errors.last_name[0]}</p>}
                      </div>

                      <div>
                        <label className="block text-indigo-600">Phone Number</label>
                        <input
                          type="text"
                          name="phone_number"
                          className={`w-full p-2 border ${errors.phone_number ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.phone_number}
                          onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                          required
                        />
                        {errors.phone_number && <p className="text-red-600">{errors.phone_number[0]}</p>}
                      </div>

                      <div>
                        <label className="block text-indigo-600">Teacher Email</label>
                        <input
                          type="email"
                          name="teacher_email"
                          className={`w-full p-2 border ${errors.teacher_email ? 'border-red-6000' : 'border-indigo-600'} rounded-md`}
                          value={formData.teacher_email}
                          onChange={(e) => setFormData({ ...formData, teacher_email: e.target.value })}
                          required
                        />
                        {errors.teacher_email && <p className="text-red-600">{errors.teacher_email[0]}</p>}
                      </div>

                      <div>
                        <label className="block text-indigo-600">Head Title</label>
                        <select
                          name="gender"
                          className={`w-full p-2 border ${errors.gender ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          required
                        >
                          <option value="" disabled>Select Title</option>
                          <option value="male">Head Master</option>
                          <option value="female">Head Mistress</option>
                        </select>
                        {errors.gender && <p className="text-red-600">{errors.gender[0]}</p>}
                      </div>

                       <div>
                        <label className="block text-indigo-600">School Motto</label>
                        <input
                          type="text"
                          name="motto"
                          className={`w-full p-2 border ${errors.motto ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.motto}
                          onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
                          required
                        />
                        {errors.motto && <p className="text-red-600">{errors.motto[0]}</p>}
                      </div>

                    </div>
                    
                    {/* New Fields: Street, Postal Address, and School Email */}
                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      <div>
                        <label className="block text-indigo-600">Street</label>
                        <input
                          type="text"
                          name="street"
                          className={`w-full p-2 border ${errors.street ? 'border-red-600' : 'border-indigo-600'} rounded-md`} 
                          value={formData.street}
                          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                          required
                        />
                        {errors.street && <p className="text-red-600">{errors.street[0]}</p>}
                      </div>

                      <div>
                        <label className="block text-indigo-600">Postal Address (P.O. Box)</label>
                        <input
                          type="text"
                          name="postal_address"
                          className={`w-full p-2 border ${errors.postal_address ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.postal_address}
                          onChange={(e) => setFormData({ ...formData, postal_address: e.target.value })}
                          required
                        />
                        {errors.postal_address && <p className="text-red-600">{errors.postal_address[0]}</p>}
                      </div>

                      <div>
                        <label className="block text-indigo-600">School Email</label>
                        <input
                          type="email"
                          name="school_email"
                          className={`w-full p-2 border ${errors.school_email ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.school_email}
                          onChange={(e) => setFormData({ ...formData, school_email: e.target.value })}
                          required
                        />
                        {errors.school_email && <p className="text-red-600">{errors.school_email[0]}</p>}
                      </div>

                      <div>
                        <label className="block text-indigo-600">School Phone Number</label>
                        <input
                          type="text"
                          name="school_phone_number"
                          className={`w-full p-2 border ${errors.school_phone_number ? 'border-red' : 'border-indigo-600'} rounded-md`}
                          value={formData.school_phone_number}
                          onChange={(e) => setFormData({ ...formData, school_phone_number: e.target.value })}
                          required
                        />
                        {errors.school_phone_number && <p className="text-red-600">{errors.school_phone_number[0]}</p>}
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
