import { useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ViewAttendanceLogs = ({ logs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // You can set this based on your success logic

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Add search functionality here if needed
  };

  return (
    <div className="p-1 max-h-screen sm:ml-64">
      <div className="p-4 rounded-lg mt-14">
        <div className="w-full">
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

          <h1 className="text-lg font-semibold mb-5">View Attendance</h1>

          <div className="flex justify-end mb-2">
            <input
              type="text"
              name="search"
              id="search"
              className="rounded-lg p-2 border border-gray-300 focus:outline-none"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {logs && logs.length > 0 ? (
            <>
              <table className="w-full text-sm text-left shadow-md rounded-lg text-black dark:text-gray-400">
                <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="bg-gray-50">
                    <th scope="col" className="px-6 py-3">Full Name</th>
                    <th scope="col" className="px-6 py-3">Stream</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Taken at</th>
                  </tr>
                </thead>
                <tbody className="allData">
                  {logs.map((log, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {log.pupil ? log.pupil.full_name : ' '}
                      </th>
                      <td className="px-6 py-4">
                        {log.stream.subject_streams.map((stream, i) => (
                          <span key={i}>{`${stream.class.name} - ${log.stream.name}`}</span>
                        ))}
                      </td>
                      <td className="px-6 py-4">
                        {log.status === 1 && (
                          <div className="bg-green-200 rounded-xl p-1 text-center">
                            <span>Present</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">{new Date(log.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex container mx-auto justify-end mb-3">
                {/* Pagination or other actions */}
                {logs.length > 0 ? <div>{/* Pagination component here */}</div> : ' '}
              </div>
            </>
          ) : (
            <section className="border border-gray-200 rounded-md h-60 p-2">
              <div className="flex items-center justify-center flex-col h-full w-full">
                <span className="bg-slate-200 rounded-full p-2">
                  <FaExclamationCircle className="w-7 h-7 text-slate-400" />
                </span>
                <span className="text-slate-500 mt-2">Attendance not available yet!</span>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

ViewAttendanceLogs.propTypes = {
    logs: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

export default ViewAttendanceLogs;
