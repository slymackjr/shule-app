import { useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';

const AttendanceLogs = ({ pupils }) => {
  const [selectedPupils, setSelectedPupils] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleCheckboxChange = (id) => {
    setSelectedPupils((prev) =>
      prev.includes(id) ? prev.filter((pupilId) => pupilId !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here, e.g., sending data to an API
    setSuccessMessage('Attendance successfully collected!');
  };

  return (
    <div className="p-1 max-h-screen sm:ml-64">
      <div className="p-4 rounded-lg mt-14">
        <div className="mt-10">
          {successMessage && (
            <div
              className="flex p-4 mb-2 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
              role="alert"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 inline w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          <h1 className="text-xl mb-5 font-semibold">Collect Attendance</h1>

          {pupils && pupils.length > 0 ? (
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-4 md:gap-6">
                {pupils.map((pupil) => (
                  <div key={pupil.id} className="relative w-full mb-5 group">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        checked={selectedPupils.includes(pupil.id)}
                        onChange={() => handleCheckboxChange(pupil.id)}
                      />
                      <span className="ml-2 text-gray-700">{pupil.full_name}</span>
                    </label>
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          ) : (
            <section className="border border-gray-200 rounded-md h-60 p-2">
              <div className="flex items-center justify-center flex-col h-full w-full">
                <span className="bg-slate-200 rounded-full p-2">
                  <FaExclamationCircle className="w-7 h-7 text-slate-400" />
                </span>
                <span className="text-slate-500 mt-2">Pupils are not available yet!</span>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

AttendanceLogs.propTypes = {
  pupils: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      full_name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AttendanceLogs;
