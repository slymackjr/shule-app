// IndexResults.jsx
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';
import { Pagination } from 'flowbite-react'; // Assuming you want to use flowbite for pagination
import PropTypes from 'prop-types';

const IndexResults = ({ results, pupils, successMessage }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResults, setFilteredResults] = useState(results);

    // Toast Notification State
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        // Filter results based on search term
        if (searchTerm) {
            const filtered = results.filter((result) =>
                pupils.find((pupil) => pupil.pupil_reg_number === result.pupil_reg_number)?.full_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredResults(filtered);
        } else {
            setFilteredResults(results);
        }
    }, [searchTerm, results, pupils]);

    useEffect(() => {
        if (successMessage) {
            setToastMessage(successMessage);
            setIsSuccess(true);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    }, [successMessage]);

    const handleCloseToast = () => {
        setShowToast(false);
    };

    return (
        <div className="p-1 max-h-screen sm:ml-64">
            <div className="p-4 rounded-lg mt-14">
                {showToast && (
                    <div
                        className={`flex z-50 fixed top-6 right-5 items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow ${
                            isSuccess ? 'bg-green-100' : 'bg-orange-100'
                        }`}
                        role="alert"
                    >
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-full">
                            {isSuccess ? <FaCheckCircle className="w-5 h-5 text-green-600" /> : <FaExclamationCircle className="w-5 h-5 text-orange-600" />}
                        </div>
                        <div className="ms-3 text-sm font-normal">{toastMessage}</div>
                        <button
                            type="button"
                            onClick={handleCloseToast}
                            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8"
                            aria-label="Close"
                        >
                            <FaTimes className="w-3 h-3" />
                        </button>
                    </div>
                )}
                <div className="w-full">
                    <h1 className="text-lg font-semibold">View Results</h1>
                    {results.length > 0 ? (
                        <>
                            <div className="flex justify-end mb-2">
                                <div className="relative">
                                    <MdSearch className="absolute left-2 top-2 text-gray-400" />
                                    <input
                                        type="text"
                                        name="search"
                                        id="search"
                                        className="rounded-lg pl-8 p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <table className="w-full text-sm text-left shadow-md rounded-lg text-black">
                                <thead className="text-xs text-gray-900 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Full Name</th>
                                        <th scope="col" className="px-6 py-3">Reg #</th>
                                        <th scope="col" className="px-6 py-3">Score</th>
                                        <th scope="col" className="px-6 py-3">Remark</th>
                                        <th scope="col" className="px-6 py-3">Exam</th>
                                        <th scope="col" className="px-6 py-3">Subject</th>
                                        <th scope="col" className="px-6 py-3">Grade</th>
                                        <th scope="col" className="px-6 py-3">Stream</th>
                                        <th scope="col" className="px-6 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredResults.map((result) => {
                                        const pupil = pupils.find(p => p.pupil_reg_number === result.pupil_reg_number);
                                        return (
                                            <tr key={result.id} className="bg-white border-b hover:bg-gray-50">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{pupil?.full_name || 'Unknown'}</th>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{result.pupil_reg_number.toUpperCase()}</th>
                                                <td className="px-6 py-4">{result.score}%</td>
                                                <td className="px-6 py-4">{result.remark.charAt(0).toUpperCase() + result.remark.slice(1)}</td>
                                                <td className="px-6 py-4">{result.exam.name.charAt(0).toUpperCase() + result.exam.name.slice(1)}</td>
                                                <td className="px-6 py-4">{result.subjectStream.subject.name.charAt(0).toUpperCase() + result.subjectStream.subject.name.slice(1)}</td>
                                                <td className="px-6 py-4">{result.grade}</td>
                                                <td className="px-6 py-4">{`${result.subjectStream.class.name} - ${result.subjectStream.stream.name}`}</td>
                                                <td className="px-6 py-4">
                                                    <a href="#" className="font-medium text-blue-600 hover:underline p-1">Edit</a>
                                                    <form action="#" method="POST" className="inline">
                                                        <button type="submit" className="text-red-600">Delete</button>
                                                    </form>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div className="flex container mx-auto justify-end mb-3">
                                {results.length > 0 && <Pagination currentPage={1} totalPages={Math.ceil(results.length / 10)} />}
                            </div>
                        </>
                    ) : (
                        <section id="class_display" className="border border-gray-200 rounded-md h-60 p-2">
                            <div className="flex items-center justify-center flex-col mx-auto h-full w-1/2">
                                <span className="bg-slate-200 rounded-full p-2">
                                    <FaExclamationCircle className="w-7 h-7 text-slate-400" />
                                </span>
                                <span className="text-slate-500">Results are not available yet!</span>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

IndexResults.propTypes = {
    results: PropTypes.arrayOf(PropTypes.object), 
    pupils: PropTypes.arrayOf(PropTypes.object),  
    successMessage: PropTypes.arrayOf(PropTypes.object), 
}

export default IndexResults;
