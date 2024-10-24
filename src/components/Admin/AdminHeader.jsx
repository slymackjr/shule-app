import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaCaretDown, FaBars, FaTimes, FaTachometerAlt, FaUserGraduate, FaChalkboardTeacher, FaSchool, FaChessBoard, FaUser, FaPlusCircle, FaEye, } from 'react-icons/fa';
import { skuliAppLogo } from '../../assets/images';
import PropTypes from 'prop-types';

const AdminHeader = ({
    children,
    activeLink,
}) => {
    const navigate = useNavigate();
    const defaultLink = "text-gray-900 hover:bg-gray-100";
    const activeLinkStyle = "text-blue-500 bg-blue-100";
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isTeacherDropdownOpen, setIsTeacherDropdownOpen] = useState(false);
    const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
    const profileRef = useRef(null);
    const navRef = useRef(null);

    const handleClickOutside = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            setIsProfileOpen(false);
        }
        if (navRef.current && !navRef.current.contains(event.target)) {
            setIsNavOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    /* const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/api/logout-teacher', {}, { withCredentials: true });
            navigate('/login'); // Redirect to login after logout
        } catch (err) {
            console.error('Error logging out', err);
        }
    }; */
    

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="fixed top-0 z-50 w-full bg-white shadow">
                <div className="px-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-between">
                    <Link to="/" className="flex items-center">
                        <img src={skuliAppLogo} alt="Skuli App" className="w-40" />
                    </Link>
                    <div className="flex items-center space-x-3">
                        <button
                            className="lg:hidden text-gray-700"
                            onClick={() => setIsNavOpen(!isNavOpen)}
                        >
                            {isNavOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                        <div className="relative" ref={profileRef}>
                            <FaUserCircle
                                size={24}
                                className="text-gray-700 cursor-pointer"
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                            />
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
                                    <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</a>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        onClick={() => navigate('/login')}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Layout */}
            <div className="flex flex-1 pt-16">
                <aside
                    className={`lg:w-64 bg-white shadow-lg lg:block ${isNavOpen ? 'block' : 'hidden'} fixed lg:relative z-40`}
                    ref={navRef}
                >
                    <ul className="p-4 space-y-4">
                        <li>
                            <Link to="/head-master-dashboard" className={`flex items-center ${activeLink === 'dashboard' ? activeLinkStyle : defaultLink} p-2 rounded-lg`}>
                                <FaTachometerAlt className="mr-2" /> Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/students" className={`flex items-center ${activeLink === 'students' ? activeLinkStyle : defaultLink} p-2 rounded-lg`}>
                                <FaUserGraduate className="mr-2" /> Manage Students
                            </Link>
                        </li>
                        <li>
                            <Link to="/teachers" className={`flex items-center ${activeLink === 'teachers' ? activeLinkStyle : defaultLink} p-2 rounded-lg`}>
                                <FaChalkboardTeacher className="mr-2" /> Manage Teachers
                            </Link>
                        </li>
                        <li>
                            <Link to="/head-master-profile" className={`flex items-center ${activeLink === 'profile' ? activeLinkStyle : defaultLink} p-2 rounded-lg`}>
                                <FaUserCircle className="mr-2" /> Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/school-details" className={`flex items-center ${activeLink === 'school-details' ? activeLinkStyle : defaultLink} p-2 rounded-lg`}>
                                <FaSchool className="mr-2" /> School Details
                            </Link>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100"
                                onClick={() => setIsTeacherDropdownOpen(!isTeacherDropdownOpen)}
                            >
                                <FaChalkboardTeacher className="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                    Teachers
                                </span>
                                <FaCaretDown className="w-4 h-4" />
                            </button>
                            {isTeacherDropdownOpen && (
                                <ul className="py-2 space-y-2">
                                    <li>
                                        <Link
                                            to="/create-teachers"
                                            className={`flex items-center w-full p-2 ${activeLink === 'create-teachers' ? activeLinkStyle : defaultLink} pl-11 group hover:bg-gray-100`}
                                        >
                                            <FaUser Plus className="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                                            Manage Teachers
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/view-teachers"
                                            className={`flex items-center w-full p-2 ${activeLink === 'view-teachers' ? activeLinkStyle : defaultLink} pl-11 group hover:bg-gray-100`}
                                        >
                                            <FaUser Plus className="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                                            Academic Teachers
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100"
                                onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
                            >
                                <FaChessBoard className="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                    Classes
                                </span>
                                <FaCaretDown className="w-4 h-4" />
                            </button>
                            {isClassDropdownOpen && (
                                <ul className="py-2 space-y-2">
                                    <li>
                                        <Link
                                            to="/create-classes"
                                            className={`flex items-center w-full p-2 ${activeLink === 'create-classes' ? activeLinkStyle : defaultLink} pl-11 group hover:bg-gray-100`}
                                        >
                                            <FaPlusCircle className="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                                            Create Classes
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/view-classes"
                                            className={`flex items-center w-full p-2 ${activeLink === 'view-classes' ? activeLinkStyle : defaultLink} pl-11 group hover:bg-gray-100`}
                                        >
                                            <FaEye className="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                                            View Classes
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </aside>

                <main className="flex-1 p-4 lg:ml-50 max-w-full">
                    {children}
                </main>
            </div>
        </div>
    );
};

AdminHeader.propTypes = {
    children: PropTypes.node,
    activeLink: PropTypes.string,
};

export default AdminHeader;
