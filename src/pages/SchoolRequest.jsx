import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { bg, skuliAppLogo } from '../assets/images';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const SchoolRequest = () => {
  const [formData, setFormData] = useState({
    school_name: '',
    email: '',
    phone: '',
    address: '',
    postal_code: '',
    city: '',
    fullname: '',
    school_type: [],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const response = await axios.post('http://51.222.207.88:8005/api/v1/applications', formData);
      setLoading(false);
    
      if (response.data.response) {
        // Display success toast with success icon and message
        toast.success(
          <div className="flex items-center">
            <FaCheckCircle className="text-white bg-green-500 rounded-full mr-2 p-1" />
            Your application has been submitted successfully!
          </div>,
          { position: 'top-center' }
        );
      } else {
        // Display error toast with error icon and message
        toast.error(
          <div className="flex items-center">
            <FaTimesCircle className="text-white bg-red-500 rounded-full mr-2 p-1" />
            There was an issue with your submission. Please try again.
          </div>,
          { position: 'top-center' }
        );
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
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
    }
    
  };

  return (
    <div className="bg-indigo-50 min-h-screen">
      <ToastContainer autoClose={5000} hideProgressBar={true} newestOnTop={true} closeOnClick pauseOnHover draggable />
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
                  <p className="text-gray-600 mb-5">Fill in the details below, and we’ll get back to you in 3 working days.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-indigo-600">School Name</label>
                      <input
                        type="text"
                        name="school_name"
                        className={`w-full p-2 border ${errors.school_name ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                        value={formData.school_name}
                        onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                        placeholder="Enter School Name"
                        required
                      />
                      {errors.school_name && <p className="text-red-600">{errors.school_name[0]}</p>}
                    </div>

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
                        <label className="block text-indigo-600">Email</label>
                        <input
                          type="email"
                          name="email"
                          className={`w-full p-2 border ${errors.email ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Enter Your Email"
                          required
                        />
                        {errors.email && <p className="text-red-600">{errors.email[0]}</p>}
                      </div>

                      <div>
                        <label className="block text-indigo-600">Phone Number</label>
                        <input
                          type="text"
                          name="phone"
                          className={`w-full p-2 border ${errors.phone ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Enter Your Phone Number"
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
                          placeholder="Enter Your Address"
                          required
                        />
                        {errors.address && <p className="text-red-600">{errors.address[0]}</p>}
                      </div>

                      <div>
                        <label className="block text-indigo-600">Postal Code</label>
                        <input
                          type="text"
                          name="postal_code"
                          className={`w-full p-2 border ${errors.postal_code ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.postal_code}
                          onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                          placeholder="Enter Your Postal Code"
                          required
                        />
                        {errors.postal_code && <p className="text-red-600">{errors.postal_code[0]}</p>}
                      </div>

                      <div>
                        <label className="block text-indigo-600">City</label>
                        <input
                          type="text"
                          name="city"
                          className={`w-full p-2 border ${errors.city ? 'border-red-600' : 'border-indigo-600'} rounded-md`}
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="Enter Your City"
                          required
                        />
                        {errors.city && <p className="text-red-600">{errors.city[0]}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-indigo-600">School Level</label>
                      <div className="flex flex-col">
                        {['primary', 'secondary', 'high school'].map((level) => (
                          <label key={level} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              name="school_type"
                              value={level}
                              checked={formData.school_type.includes(level)}
                              onChange={(e) => {
                                const { value } = e.target;
                                setFormData((prev) => ({
                                  ...prev,
                                  school_type: prev.school_type.includes(value)
                                    ? prev.school_type.filter((item) => item !== value)
                                    : [...prev.school_type, value],
                                }));
                              }}
                              className="rounded-full border-indigo-600"
                            />
                            <span>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
                          </label>
                        ))}
                      </div>
                      {errors.school_type && <p className="text-red-600">{errors.school_type[0]}</p>}
                    </div>

                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="mt-2 w-40 flex justify-center py-3 rounded-md bg-indigo-600 text-white font-bold hover:bg-indigo-700"
                        disabled={loading}
                      >
                        {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : 'Submit Request'}
                      </button>
                    </div>
                  </form>
                </div>
                <div className="hidden md:block md:w-1/2 bg-indigo-100">
                  <img src={bg} alt="Hero Image" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white py-4 shadow-md mt-auto">
        <div className="container mx-auto text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} SkuliApp. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SchoolRequest;
