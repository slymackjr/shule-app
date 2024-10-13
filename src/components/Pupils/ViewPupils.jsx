import { useState, useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import PropTypes from 'prop-types';

const ViewPupils = ({ pupils }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPupils, setFilteredPupils] = useState(pupils);

    useEffect(() => {
        if (searchTerm) {
            const results = pupils.filter(pupil =>
                pupil.full_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPupils(results);
        } else {
            setFilteredPupils(pupils);
        }
    }, [searchTerm, pupils]);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this pupil?');
        if (confirmDelete) {
            axios.post(`/pupil/delete/${id}`)
                .then(response => {
                    // Handle success response
                    alert(response.data.message);
                })
                .catch(error => {
                    // Handle error response
                    alert(error.response.data.message);
                });
        }
    };

    const handleEdit = (id) => {
        window.location.assign(`/pupil/edit/${id}`);
    };

    return (
        <div className="p-4 max-h-screen sm:ml-64 mt-14">
            <div className="rounded-lg">
                <div className="p-4">
                    <h1 className="text-lg font-semibold">Pupils</h1>
                    <div className="flex justify-end mb-2">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="rounded-lg border border-gray-300 p-2"
                                placeholder="Search"
                            />
                            <FaSearch className="absolute right-3 top-2.5 text-gray-400" />
                        </div>
                    </div>

                    {filteredPupils.length > 0 ? (
                        <table className="w-full text-sm text-left shadow-md rounded-lg text-black">
                            <thead className="text-xs text-gray-900 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3">Full Name</th>
                                    <th className="px-6 py-3">Gender</th>
                                    <th className="px-6 py-3">Stream</th>
                                    <th className="px-6 py-3">Reg #</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Region</th>
                                    <th className="px-6 py-3">District</th>
                                    <th className="px-6 py-3">Ward</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPupils.map((pupil) => (
                                    <tr key={pupil.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">{pupil.full_name}</td>
                                        <td className="px-6 py-4">{pupil.gender}</td>
                                        <td className="px-6 py-4">{pupil.stream.name}</td>
                                        <td className="px-6 py-4">{pupil.pupil_reg_number}</td>
                                        <td className="px-6 py-4">
                                            {pupil.status === 1 ? (
                                                <span className="bg-green-200 rounded-lg p-1 text-center">
                                                    <FaCheckCircle className="inline mr-1" />
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="bg-red-200 rounded-lg p-1 text-center">
                                                    <FaExclamationCircle className="inline mr-1" />
                                                    Inactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">{pupil.region?.name}</td>
                                        <td className="px-6 py-4">{pupil.district?.name}</td>
                                        <td className="px-6 py-4">{pupil.ward?.name}</td>
                                        <td className="px-6 py-4 flex justify-center">
                                            <button
                                                onClick={() => handleEdit(pupil.id)}
                                                className="text-white bg-blue-700 hover:bg-blue-800 p-1 rounded-md"
                                            >
                                                <FaEdit className="inline" /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(pupil.id)}
                                                className="text-white bg-red-700 hover:bg-red-800 p-1 rounded-md mx-1"
                                            >
                                                <FaTrash className="inline" /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="border border-gray-200 rounded-md h-60 p-2 flex items-center justify-center">
                            <span className="bg-slate-200 rounded-full p-2">
                                <FaExclamationCircle className="w-7 h-7 text-slate-400" />
                            </span>
                            <span className="text-slate-500">Pupils are not available yet!</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

ViewPupils.propTypes = {
    pupils: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

export default ViewPupils;
