import { useState } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'; // Check and close icons
import { MdWarning } from 'react-icons/md'; // Warning icon

const UploadResults = () => {
    const [exam, setExam] = useState('');
    const [subject, setSubject] = useState('');
    const [file, setFile] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Handle form submission logic
        // You can replace the alert with your actual upload logic
        if (exam && subject && file) {
            // Assuming successful upload
            setNotification({ message: 'Results uploaded successfully!', type: 'success' });
        } else {
            setNotification({ message: 'Please fill out all fields!', type: 'warning' });
        }

        // Clear the form fields
        setExam('');
        setSubject('');
        setFile(null);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleCloseNotification = () => {
        setNotification({ message: '', type: '' });
    };

    return (
        <div className="p-1 max-h-screen sm:ml-64">
            <div className="p-4 rounded-lg mt-14">
                <div className="mt-10">
                    {notification.message && (
                        <div className={`flex p-4 mb-2 text-sm rounded-lg ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`} role="alert">
                            {notification.type === 'success' ? <AiFillCheckCircle className="flex-shrink-0 w-5 h-5 mr-3" /> : <MdWarning className="flex-shrink-0 w-5 h-5 mr-3" />}
                            <div>
                                <span className="font-small">{notification.message}</span>
                            </div>
                            <button onClick={handleCloseNotification} className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex items-center justify-center h-8 w-8">
                                <AiFillCloseCircle className="w-5 h-5" />
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                    )}
                    <h1 className="text-lg font-semibold mb-5">Upload Results</h1>
                    <form onSubmit={handleSubmit} className="max-w-full mx-auto">
                        <div className="grid md:grid-cols-3 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <label htmlFor="exam" className="block mb-2 text-sm font-medium text-gray-900">Exam <span className="text-red-600">*</span></label>
                                <select
                                    id="exam"
                                    name="exam"
                                    value={exam}
                                    onChange={(e) => setExam(e.target.value)}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required
                                >
                                    <option disabled value="">Select Exams</option>
                                    {/* Replace with your exam data */}
                                    <option value="1">Exam 1</option>
                                    <option value="2">Exam 2</option>
                                    <option value="3">Exam 3</option>
                                </select>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">Subject <span className="text-red-600">*</span></label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required
                                >
                                    <option disabled value="">Select Subject</option>
                                    {/* Replace with your subject data */}
                                    <option value="1">Subject 1</option>
                                    <option value="2">Subject 2</option>
                                    <option value="3">Subject 3</option>
                                </select>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900">Attach CSV <span className="text-red-600">*</span></label>
                                <input
                                    type="file"
                                    name="file"
                                    onChange={handleFileChange}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadResults;
