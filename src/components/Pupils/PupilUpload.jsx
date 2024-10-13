import { useState } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes, FaFileUpload } from 'react-icons/fa';

const PupilUpload = () => {
    const [file, setFile] = useState(null);
    const [notification, setNotification] = useState({ message: '', success: false });

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/pupil/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setNotification({ message: response.data.message, success: true });
            setFile(null);
        } catch (error) {
            setNotification({ message: 'Error uploading file. Please try again.', success: false });
            console.error(error);
        }
    };

    return (
        <div className="p-4 max-h-screen sm:ml-64">
            {notification.message && (
                <div className={`flex z-50 fixed top-6 right-5 items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow ${notification.success ? 'bg-green-100' : 'bg-red-100'}`} role="alert">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-full">
                        {notification.success ? <FaCheck className="w-5 h-5" /> : <FaTimes className="w-5 h-5 text-red-500" />}
                        <span className="sr-only">{notification.success ? 'Success icon' : 'Error icon'}</span>
                    </div>
                    <div className="ms-3 text-sm font-normal">{notification.message}</div>
                    <button
                        type="button"
                        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
                        onClick={() => setNotification({ message: '', success: false })}
                    >
                        <span className="sr-only">Close</span>
                        <FaTimes className="w-3 h-3" />
                    </button>
                </div>
            )}

            <div className="p-4 rounded-lg mt-14">
                <div className="mt-10">
                    <h1 className="text-lg font-semibold">Upload Pupils</h1>
                    <div className="p-2 mb-3 w-72">
                        <a href="/pupil/upload/template" className="text-blue-600 hover:underline">Download Template</a>
                    </div>
                </div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid md:grid-cols-3 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900">Attach File <span className="text-red-600">*</span></label>
                            <div className="flex items-center">
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    onChange={handleFileChange}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required
                                />
                                <FaFileUpload className="ml-2 text-gray-500" />
                            </div>
                            <span className="text-red-600">Accepted File: .csv</span>
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                        Upload
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PupilUpload;
