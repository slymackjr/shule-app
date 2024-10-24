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
    emial: '',
    phone: '',
    address: '',
    postal_code: '',
    city: '',
    school_type: '',
    fullname: '',
  });

  const [errors, setErrors] = useState({}); 
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); 

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
                        <label className="block text-indigo-600">Full Name</label>
                        <input
                          type="text"
                          name="fullname"
                          className={`w-full p-2 border ${errors.fullname ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.fullname}
                          onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                          placeholder="Enter Your Full Name"
                          required
                        />
                        {errors.fullname && <p className="text-red-600">{errors.fullname[0]}</p>}
                      </div>

                      <div>
                        <label className="block text-indigo-600">Phone Number</label>
                        <input
                          type="text"
                          name="phone"
                          className={`w-full p-2 border ${errors.phone ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder='Enter Your Phone Number'
                          required
                        />
                        {errors.phone && <p className="text-red-600">{errors.phone[0]}</p>}
                      </div>

                      <div>
                        <label className="block text-indigo-600">Address</label>
                        <input
                          type="text"
                          name="address"
                          className={`w-full p-2 border ${errors.address ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder='Enter Your Address'
                          required
                        />
                        {errors.type && <p className="text-red-600">{errors.type[0]}</p>}
                      </div>

                      <div>
                        <label className="block text-indigo-600">Postal Code</label>
                        <input
                          type="text"
                          name="postal_code"
                          className={`w-full p-2 border ${errors.postal_code ? 'border-red-600' : 'border-indigo-600'}  rounded-md`}
                          value={formData.postal_code}
                          onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                          placeholder='Enter Your Postal Code'
                          required
                        />
                        {errors.postal_code && <p className="text-red-600">{errors.postal_code[0]}</p>}
                      </div>
                    </div>

                    {/* Head Master Details */}
                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      <div>
                        <label className="block text-indigo-600">City</label>
                        <input
                          type="text"
                          name="city"
                          className={`w-full p-2 border ${errors.city ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder='Enter Your City'
                          required
                        />
                        {errors.city && <p className="text-red-600">{errors.city[0]}</p>}
                      </div>

                      <div>
                        <label className="block text-indigo-600">Shool Level</label>
                        <select
                          name="school_type"
                          className={`w-full p-2 border ${errors.school_type ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.school_type}
                          onChange={(e) => setFormData({ ...formData, school_type: e.target.value })}
                          required
                          >
                          <option value="" disabled>Select Title</option>
                          <option value="primary">Primary</option>
                          <option value="secondary">Secondary</option>
                          <option value="high school">High School</option>
                        </select>
                        {errors.school_type && <p className="text-red-600">{errors.school_type[0]}</p>}
                      </div>
                    </div>
                    <div className="flex justify-center">
                    <button
                      type="submit"
                      className={`mt-2 w-40 flex justify-center py-3 rounded-md bg-indigo-600 text-white font-bold hover:bg-indigo-700`}
                      disabled={loading} // Disable the button when loading is true
                    >
                      {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : 'Submit Request'} {/* Show loading spinner if loading */}
                    </button>
                    </div>
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
