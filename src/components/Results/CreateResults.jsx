// CreateResults.jsx
import { useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';
import { MdDownload } from 'react-icons/md';
import PropTypes from 'prop-types';

const CreateResults = ({ regNumbers, exams, subjects, successMessage, errorMessage }) => {
  const [regNumber, setRegNumber] = useState('');
  const [score, setScore] = useState('');
  const [exam, setExam] = useState('');
  const [subject, setSubject] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your submit logic goes here
    // Simulating a successful form submission
    if (regNumber && score && exam && subject) {
      setToastMessage(successMessage || 'Result created successfully!');
      setIsSuccess(true);
      setShowToast(true);
      // Reset form
      setRegNumber('');
      setScore('');
      setExam('');
      setSubject('');
    } else {
      setToastMessage(errorMessage || 'Please fill out all fields.');
      setIsSuccess(false);
      setShowToast(true);
    }
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <div className="p-4 max-h-screen sm:ml-64">
      <div className="rounded-lg mt-14">
        {showToast && (
          <div
            className={`flex z-50 fixed top-6 right-5 items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow ${
              isSuccess ? 'bg-green-100' : 'bg-red-100'
            }`}
            role="alert"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-full">
              {isSuccess ? (
                <FaCheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <FaExclamationCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
            <div className="ms-3 text-sm font-normal">{toastMessage}</div>
            <button
              type="button"
              onClick={handleToastClose}
              className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8"
              aria-label="Close"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          </div>
        )}
        <h1 className="text-lg font-semibold">Create Results</h1>
        <div className="flex justify-end mb-4">
          <a
            href="#"
            className="bg-blue-700 hover:bg-blue-800 p-2 rounded-md text-white flex items-center"
          >
            <MdDownload className="mr-2" /> Download Template
          </a>
          <a
            href="#"
            className="bg-blue-700 hover:bg-blue-800 p-2 rounded-md text-white flex items-center ml-2"
          >
            <MdDownload className="mr-2" /> Upload Results
          </a>
        </div>

        {regNumbers && regNumbers.length > 0 ? (
          <form onSubmit={handleSubmit} className="max-w-full mx-auto">
            <div className="grid md:grid-cols-3 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <label htmlFor="reg_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Registration Number <span className="text-red-600">*</span>
                </label>
                <select
                  id="reg_number"
                  name="reg_number"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option disabled selected value="">
                    Select Registration Numbers
                  </option>
                  {regNumbers.map((reg) => (
                    <option key={reg} value={reg}>
                      {reg.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <label htmlFor="score" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Score <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="score"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  id="score"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <label htmlFor="exam" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Exam <span className="text-red-600">*</span>
                </label>
                <select
                  id="exam"
                  name="exam"
                  value={exam}
                  onChange={(e) => setExam(e.target.value)}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option disabled selected value="">
                    Select Exams
                  </option>
                  {exams.map((exam) => (
                    <option key={exam.id} value={exam.id}>
                      {exam.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Subject <span className="text-red-600">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option disabled selected value="">
                    Select Subject
                  </option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        ) : (
          <section id="class_display" className="border border-gray-200 rounded-md h-60 p-2">
            <div className="flex items-center justify-center flex-col mx-auto h-full w-1/2">
              <span className="bg-slate-200 rounded-full p-2">
                <FaExclamationCircle className="w-7 h-7 text-slate-400" />
              </span>
              <span className="text-slate-500">You cannot create results yet!</span>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

CreateResults.propTypes = {
    regNumbers: PropTypes.arrayOf(PropTypes.object).isRequired,
    exams: PropTypes.arrayOf(PropTypes.object).isRequired,
    subjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    successMessage: PropTypes.arrayOf(PropTypes.object).isRequired,
    errorMessage: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default CreateResults;
