import { useState, useEffect } from 'react';
import { FaExclamationCircle, FaSpinner, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { DashboardHeader } from '../Common';

const CreateClasses = () => {
  const [classes, setClasses] = useState([]);
  const [streams, setStreams] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [streamAlias, setStreamAlias] = useState('');
  const [loading, setLoading] = useState(false);

/*   useEffect(() => {
    // Fetch classes from an API or static data
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      // Simulate fetching class data
      const res = await axios.get('/api/classes'); // Replace with your API endpoint
      setClasses(res.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleClassChange = async (e) => {
    const className = e.target.value;
    setSelectedClass(className);
    fetchStreams(className);
  };

  const fetchStreams = async (className) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/classes/${className}/streams`); // Replace with your API endpoint
      setStreams(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching streams:', error);
      setLoading(false);
    }
  };

  const handleStreamRemoval = async (streamId) => {
    try {
      await axios.post(`/api/streams/remove`, { className: selectedClass, streamId }); // Replace with your API endpoint
      setStreams(streams.filter(stream => stream.id !== streamId));
    } catch (error) {
      console.error('Error removing stream:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/classes/create', {
        name: selectedClass,
        stream_alias: streamAlias,
      });
      console.log('Class created successfully:', res.data);
    } catch (error) {
      console.error('Error creating class:', error);
    }
  }; */

  return (
    <DashboardHeader>
        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Manage Classes</h1>

      {/* Class Selection Form */}
      <form /* onSubmit={handleSubmit} */ className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-3">
        <div className="w-full">
          <label htmlFor="classes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Class
          </label>
          <select
            id="classes"
            name="name"
            /* onChange={handleClassChange}  */
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          >
            <option value="" disabled selected>Select Class</option>
            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.name}>
                {classItem.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label htmlFor="streams" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Stream
          </label>
          <select
            id="streams"
            name="stream_id"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            disabled={!streams.length}
          >
            <option value="" disabled selected>Select a Stream</option>
            {streams.map((stream) => (
              <option key={stream.id} value={stream.id}>
                {stream.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label htmlFor="stream_alias" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Stream Alias
          </label>
          <input
            type="text"
            id="stream_alias"
            value={streamAlias}
            onChange={(e) => setStreamAlias(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="e.g., Mikumi"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end w-full mt-5 col-span-full">
            <button
              type="submit"
              className="w-40 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md font-semibold"
            >
              Create
            </button>
          </div>
      </form>

      {/* Streams Display */}
      <section id="class_display" className="border border-gray-200 rounded-md h-60 p-2 mt-5">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <FaSpinner className="text-gray-200 animate-spin w-14 h-14" />
          </div>
        ) : streams.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {streams.map((stream) => (
              <div key={stream.id} className="flex items-center justify-between bg-blue-200 p-2 rounded-md">
                <span>{stream.name}</span>
                <FaTimes
                  className="cursor-pointer text-gray-500 hover:text-red-500"
                 /*  onClick={() => handleStreamRemoval(stream.id)} */
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <FaExclamationCircle className="text-gray-400 w-7 h-7" />
            <span className="ml-2 text-gray-500">No Streams Available</span>
          </div>
        )}
      </section>
    </div>
    </DashboardHeader>
  );
};

export default CreateClasses;
