import { FaCheck, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Grade = ({ grades }) => {
    const displayToastNotification = (msg, success) => {
        const notification = success ? (
            <div
                id="toast-success"
                className="flex z-50 fixed top-6 right-5 items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow"
                role="alert"
            >
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-full">
                    <FaCheck className="w-5 h-5" />
                    <span className="sr-only">Check icon</span>
                </div>
                <div className="ms-3 text-sm font-normal">{msg}</div>
                <button
                    type="button"
                    id="toaster-close"
                    className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
                    aria-label="Close"
                    onClick={() => clearNotification()}
                >
                    <FaTimes className="w-5 h-5" />
                </button>
            </div>
        ) : (
            <div
                id="toast-warning"
                className="flex z-50 fixed top-6 right-5 items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow"
                role="alert"
            >
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-full">
                    <FaExclamationTriangle className="w-5 h-5" />
                    <span className="sr-only">Warning icon</span>
                </div>
                <div className="ms-3 text-sm font-normal">{msg}</div>
                <button
                    type="button"
                    id="toaster-close"
                    className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
                    aria-label="Close"
                    onClick={() => clearNotification()}
                >
                    <FaTimes className="w-5 h-5" />
                </button>
            </div>
        );

        document.getElementById('notification-container').innerHTML = notification;
        setTimeout(() => {
            document.getElementById('notification-container').innerHTML = '';
        }, 3000);
    };

    const clearNotification = () => {
        document.getElementById('notification-container').innerHTML = '';
    };

    return (
        <div className="p-1 max-h-screen sm:ml-64">
            <div className="p-4 rounded-lg mt-14">
                <h1 className="text-2xl font-bold mb-6">GRADE SYSTEM</h1>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    <b>Minimum Score</b>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <b>Maximum Score</b>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <b>Grade</b>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades.map((grade, index) => (
                                <tr key={index} className="bg-white border-b">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        {grade.min}
                                    </th>
                                    <td className="px-6 py-4">{grade.max}</td>
                                    <td className="px-6 py-4">{grade.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="notification-container"></div>
        </div>
    );
};

Grade.propTypes = {
    grades: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

export default Grade;
