import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes, FaBroom, FaExclamation } from 'react-icons/fa';
import PropTypes from 'prop-types';

const AssignStream = ({ classes, classTeachers, teachers }) => {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedStream, setSelectedStream] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [teacherList, setTeacherList] = useState([]);
    const [notification, setNotification] = useState({ msg: '', success: false });

    useEffect(() => {
        if (selectedClass) {
            getFreeStreams(selectedClass);
        }
    }, [selectedClass]);

    const getFreeStreams = (classId) => {
        // Fetch streams based on selected class
        axios.post(`/api/streams/free`, { classId })
            .then(response => {
                setTeacherList(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const assignClassTeacher = (e) => {
        e.preventDefault();
        axios.post('/api/assign-class-teacher', {
            class: selectedClass,
            stream: selectedStream,
            teacher: selectedTeacher
        })
            .then(response => {
                setNotification({ msg: response.data.message, success: true });
                // Optionally reload or update the state to reflect changes
            })
            .catch(error => {
                setNotification({ msg: error.response.data.message || 'An error occurred', success: false });
            });
    };

    const handleTeacherSelect = (teacher) => {
        setSelectedTeacher(teacher.id);
    };

    const clearInput = () => {
        setSelectedTeacher('');
    };

    return (
        <div className="p-1 max-h-screen sm:ml-64">
            <div className="p-4 rounded-lg mt-14">
                <h1>Assign Class Teacher</h1>
                <div className="p-2 my-3">
                    <form id="assign_class_teacher_form" onSubmit={assignClassTeacher}>
                        <input type="hidden" name="assign" value="1" />
                        <div className="grid gap-x-2 grid-cols-3 sm:grid-cols-3 md:grid-cols-3">
                            <div className="w-full">
                                <select 
                                    id="class" 
                                    name="class" 
                                    onChange={(e) => setSelectedClass(e.target.value)} 
                                    required 
                                    className="hover:cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    <option value="" disabled selected>Class</option>
                                    {classes.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full">
                                <select 
                                    id="stream" 
                                    name="stream" 
                                    onChange={(e) => setSelectedStream(e.target.value)} 
                                    required 
                                    className="hover:cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    <option value="" disabled selected>Stream</option>
                                    {teacherList.map(stream => (
                                        <option key={stream.id} value={stream.id}>{stream.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full">
                                <div className="relative">
                                    <div className="cursor-pointer flex border border-gray-300 rounded-lg">
                                        <input 
                                            type="text" 
                                            placeholder="Search Teacher..." 
                                            value={selectedTeacher} 
                                            onChange={(e) => setSelectedTeacher(e.target.value)} 
                                            className="w-full border-0 outline-none bg-gray-50" 
                                            required 
                                        />
                                        <button type="button" onClick={clearInput} className="px-3 py-3 bg-slate-200 hover:bg-red-500 hover:text-white">
                                            <FaBroom />
                                        </button>
                                    </div>
                                    {teachers.length > 0 && (
                                        <div className="absolute z-40 border border-gray-300 w-full rounded-md shadow-md bg-white p-1">
                                            {teachers.map(teacher => (
                                                <div 
                                                    key={teacher.id} 
                                                    className="teacher_tag hover:bg-slate-300 cursor-pointer p-1 rounded-md text-black" 
                                                    onClick={() => handleTeacherSelect(teacher)}
                                                >
                                                    {teacher.first_name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end my-2">
                            <button type="submit" className="font-medium text-white text-sm hover:text-blue-500 hover:bg-transparent bg-blue-500 border-2 border-blue-500 rounded-md p-2 mx-1 hover:no-underline">
                                Assign
                            </button>
                        </div>
                    </form>
                </div>
                {classTeachers.length > 0 ? (
                    <div>
                        <div className="my-2 text-lg">Class Teachers</div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-center">NO</th>
                                        <th scope="col" className="px-6 py-3 text-center">Class</th>
                                        <th scope="col" className="px-6 py-3 text-center">Class Streams</th>
                                        <th scope="col" className="px-6 py-3 text-center">Class Teacher</th>
                                        <th scope="col" className="px-6 py-3 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="font-medium">
                                    {classTeachers.map((classTeacher, index) => (
                                        <tr key={classTeacher.id} className="bg-white border-b hover:bg-gray-50 cursor-pointer">
                                            <td className="text-center p-2">{index + 1}</td>
                                            <td className="text-center p-2">{classTeacher.class.name}</td>
                                            <td className="text-center p-2">{classTeacher.stream.name}</td>
                                            <td className="text-center p-2">{classTeacher.teacher.first_name} {classTeacher.teacher.last_name}</td>
                                            <td className="text-center p-2">
                                                <button className="font-medium text-white text-sm hover:text-red-500 hover:bg-transparent bg-red-500 border-2 border-red-500 rounded-md p-2 mx-1 hover:no-underline">
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <section className="border border-gray-200 rounded-md h-60 p-2">
                        <div className="flex items-center justify-center flex-col mx-auto h-full w-1/2">
                            <span className="bg-slate-200 rounded-full p-2">
                                <FaExclamation className="w-7 h-7 text-slate-400" />
                            </span>
                            <span className="text-slate-500">Classes and streams are not available yet!</span>
                        </div>
                    </section>
                )}
                {notification.msg && (
                    <div className={`flex z-50 fixed top-6 right-5 items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow ${notification.success ? 'bg-green-100' : 'bg-orange-100'}`} role="alert">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500">
                            {notification.success ? <FaCheck /> : <FaTimes />}
                        </div>
                        <div className="ms-3 text-sm font-normal">{notification.msg}</div>
                        <button type="button" onClick={() => setNotification({ msg: '', success: false })} className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8">
                            <span className="sr-only">Close</span>
                            <FaTimes />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

AssignStream.propTypes = {
    classes: PropTypes.arrayOf(PropTypes.object).isRequired,
    classTeachers: PropTypes.arrayOf(PropTypes.object).isRequired,
    teachers: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

export default AssignStream;
