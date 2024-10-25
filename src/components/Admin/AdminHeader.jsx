import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  FaUserCircle,
  FaRegCreditCard,
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaSchool,
  FaChessBoard,
  FaUser,
  FaPlusCircle,
  FaEye,
} from "react-icons/fa";
import { skuliAppLogo } from "../../assets/images";
import PropTypes from "prop-types";
import axios from "axios";

const AdminHeader = ({ children, activeLink }) => {
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
        const token = localStorage.getItem("authToken"); // Get token from local storage

        if (!token) {
            console.error("No token found!");
            return;
        }

        console.log("Token:", token); // Debugging - to check if the token exists

        // Make the API request for logout
        await axios.post('http://51.222.207.88:8005/api/v1/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`, // Send token with the request
            }
        });

        // Clear the token from localStorage after successful logout
        localStorage.removeItem("authToken");

        // Redirect to login page
        navigate('/login');
    } catch (error) {
        console.error('Logout failed:', error); // Log the error for debugging
    }
};


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
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
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
      <div className="flex flex-row min-h-screen pt-16">
  {/* Sidebar */}
  <aside
    className={`lg:w-64 w-full bg-white shadow-lg lg:block ${
      isNavOpen ? "block" : "hidden"
    } fixed lg:relative z-40 h-full`} // Ensure sidebar takes full height
    ref={navRef}
  >
    <ul className="p-4 space-y-4">
      {/* Sidebar Links */}
      <li>
        <Link
          to="/"
          className={`flex items-center ${
            activeLink === "dashboard" ? activeLinkStyle : defaultLink
          } p-2 rounded-lg`}
        >
          <FaTachometerAlt className="mr-2" /> Dashboard
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className={`flex items-center ${
            activeLink === "profile" ? activeLinkStyle : defaultLink
          } p-2 rounded-lg`}
        >
          <FaUserCircle className="mr-2" /> Profile
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className={`flex items-center ${
            activeLink === "students" ? activeLinkStyle : defaultLink
          } p-2 rounded-lg`}
        >
          <FaRegCreditCard className="mr-2" /> Payments
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className={`flex items-center ${
            activeLink === "teachers" ? activeLinkStyle : defaultLink
          } p-2 rounded-lg`}
        >
          <FaChalkboardTeacher className="mr-2" /> Manage users
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className={`flex items-center ${
            activeLink === "school-details"
              ? activeLinkStyle
              : defaultLink
          } p-2 rounded-lg`}
        >
          <FaSchool className="mr-2" /> Schools
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className={`flex items-center ${
            activeLink === "school-details"
              ? activeLinkStyle
              : defaultLink
          } p-2 rounded-lg`}
        >
          <FaSchool className="mr-2" /> Schools
        </Link>
      </li>
    </ul>
  </aside>

  {/* Main Content */}
  <main className="flex-1 p-4 lg:ml-64">
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
