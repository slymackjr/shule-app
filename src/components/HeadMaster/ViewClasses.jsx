import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaExclamationCircle, FaTimes, FaTrashAlt } from 'react-icons/fa';

const ViewClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching the classes data from the API
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('/api/classes'); // Replace with your API endpoint
      setClasses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const removeStream = async (className, streamId) => {
    try {
      await axios.post(`/api/streams/remove`, { className, streamId }); // Replace with your API endpoint
      setClasses((prevClasses) =>
        prevClasses.map((c) =>
          c.name === className
            ? {
                ...c,
                class_streams: c.class_streams.filter(
                  (stream) => stream.stream.id !== streamId
                ),
              }
            : c
        )
      );
    } catch (error) {
      console.error('Error removing stream:', error);
    }
  };

  const deleteClass = async (classId) => {
    try {
      await axios.post(`/api/classes/delete`, { classId }); // Replace with your API endpoint
      setClasses(classes.filter((c) => c.id !== classId));
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  return (
    <div className="p-6">
      {/* Create Class Button */}
      <div className="my-2 flex justify-end">
        <a
          href="/classes/class/create/page" // Replace with your actual route
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create Classes
        </a>
      </div>

      {/* Display if no classes */}
      {loading ? (
        <p>Loading...</p>
      ) : classes.length === 0 ? (
        <section
          id="class_display"
          className="border border-gray-200 rounded-md h-60 p-2"
        >
          <div className="flex items-center justify-center flex-col mx-auto h-full w-1/2">
            <span className="bg-slate-200 rounded-full p-2">
              <FaExclamationCircle className="w-7 h-7 text-slate-400" />
            </span>
            <span className="text-slate-500">Classes are not available yet!</span>
          </div>
        </section>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Class name
                </th>
                <th scope="col" className="px-6 py-3">
                  Streams
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c) => (
                <tr
                  key={c.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {c.name}
                  </th>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap">
                      {c.class_streams.map((cs) => (
                        <span
                          key={cs.stream.id}
                          className="flex items-center justify-between bg-blue-200 rounded-md p-2 m-1"
                        >
                          <span>{cs.alias || cs.stream.name}</span>
                          <FaTimes
                            className="ml-2 cursor-pointer text-gray-500 hover:text-red-500"
                            onClick={() =>
                              removeStream(c.name, cs.stream.id)
                            }
                          />
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-500 hover:text-red-400"
                      onClick={() => deleteClass(c.id)}
                    >
                      <FaTrashAlt className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewClasses;
