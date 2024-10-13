import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes, FaAngleDown, FaBroom } from 'react-icons/fa';
import PropTypes from 'prop-types';

const AssignSubject = ({ teachers, classes, subjects, extraSubjects, tutorsSubjects }) => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedStream, setSelectedStream] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [teacherSearch, setTeacherSearch] = useState('');
    const [notification, setNotification] = useState('');
    const [streams, setStreams] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Make an API call to assign subject to teacher
        const data = {
            teacher: selectedTeacher,
            class: selectedClass,
            stream: selectedStream,
            subject: selectedSubject
        };

        // Replace with your API endpoint
        axios.post('/api/assign-subject', data)
            .then(response => {
                setNotification('Subject assigned successfully');
                // Clear selections after successful assignment
                setSelectedTeacher(null);
                setSelectedClass('');
                setSelectedStream('');
                setSelectedSubject('');
            })
            .catch(error => {
                setNotification('Failed to assign subject');
                console.error(error);
            });
    };

    const handleTeacherSelect = (teacher) => {
        setSelectedTeacher(teacher);
        setTeacherSearch(teacher.first_name); // Assuming teacher has a first_name property
    };

    const handleStreamChange = (className) => {
        // Implement your logic to get streams based on class
        // Placeholder: Update with your actual stream fetching logic
        const exampleStreams = ['Stream A', 'Stream B']; // Example streams
        setStreams(exampleStreams);
    };

    return (
        <div className="p-4 max-h-screen sm:ml-64">
            <h1 className="mb-2">ASSIGN SUBJECT TO TEACHERS</h1>
            {notification && (
                <div className="flex z-50 fixed top-6 right-5 items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-full">
                        <FaCheck />
                    </div>
                    <div className="ms-3 text-sm font-normal">{notification}</div>
                    <button onClick={() => setNotification('')} className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5">
                        <FaTimes />
                    </button>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Teacher</th>
                            <th className="px-6 py-3">Class</th>
                            <th className="px-6 py-3">Stream (optional)</th>
                            <th className="px-6 py-3">Subject</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white">
                            <td className="px-6 py-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={teacherSearch}
                                        onChange={(e) => setTeacherSearch(e.target.value)}
                                        placeholder="Search..."
                                        className="w-full border border-gray-300 rounded-lg p-2"
                                        required
                                    />
                                    <div className="absolute z-40 border-0 border-gray-300 w-full bg-white shadow-md">
                                        {teachers.filter(teacher => teacher.first_name.toLowerCase().includes(teacherSearch.toLowerCase())).map(teacher => (
                                            <div
                                                key={teacher.id}
                                                onClick={() => handleTeacherSelect(teacher)}
                                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                            >
                                                {teacher.first_name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <select
                                    value={selectedClass}
                                    onChange={(e) => {
                                        setSelectedClass(e.target.value);
                                        handleStreamChange(e.target.value);
                                    }}
                                    className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full"
                                    required
                                >
                                    <option value="" disabled>Class</option>
                                    {classes.map(classItem => (
                                        <option key={classItem.id} value={classItem.name}>{classItem.name}</option>
                                    ))}
                                </select>
                            </td>
                            <td className="px-6 py-4">
                                <select
                                    value={selectedStream}
                                    onChange={(e) => setSelectedStream(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full"
                                >
                                    <option value="" disabled>Streams</option>
                                    {streams.map(stream => (
                                        <option key={stream} value={stream}>{stream}</option>
                                    ))}
                                </select>
                            </td>
                            <td className="px-6 py-4">
                                <select
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full"
                                    required
                                >
                                    <option value="" disabled>Subject</option>
                                    {subjects.map(subject => (
                                        <option key={subject.id} value={`sbj_${subject.id}`}>{subject.name}</option>
                                    ))}
                                    {extraSubjects.map(subject => (
                                        <option key={subject.id} value={`ex_${subject.id}`}>{subject.name}</option>
                                    ))}
                                </select>
                            </td>
                            <td className="px-6 py-4">
                                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                                    Assign
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <div className="mt-5 shadow-md sm:rounded-lg">
                {tutorsSubjects.length > 0 && (
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Phone</th>
                                <th className="px-6 py-3">Subjects</th>
                                <th className="px-6 py-3">Class and Streams</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tutorsSubjects.map(tutor => (
                                <tr key={tutor.id} className="bg-white border-b">
                                    <td className="px-6 py-4">{tutor.name}</td>
                                    <td className="px-6 py-4">{tutor.phone}</td>
                                    <td className="px-6 py-4">{tutor.subjects.join(', ')}</td>
                                    <td className="px-6 py-4">{tutor.classAndStreams}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-red-500">Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

AssignSubject.propTypes = {
    tutorsSubjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    subjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    extraSubjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    classes: PropTypes.arrayOf(PropTypes.object).isRequired,
    teachers: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

export default AssignSubject;
