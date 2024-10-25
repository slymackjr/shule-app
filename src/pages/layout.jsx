import React, { useState, useRef } from 'react';
import { Outlet, Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import styles from './layout.module.css';

import {FaUserCircle} from "react-icons/fa";
// import  Search from './search';


function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggles the state of sidebarOpen (true/false)
  };

  return (
    <div className="flex h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-gray-900 text-white p-4 flex justify-between items-center z-10">
        {/* Button to toggle sidebar visibility */}
        <button
          className="text-2xl bg-transparent border-none text-white cursor-pointer"
          onClick={toggleSidebar}
        >
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
                    // onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full bg-gray-700 text-white transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } pt-16 w-64 z-20`}
      >
        <nav>
          <ul className="list-none p-0">
            <li className="p-4">
              <Link to="/" className="flex items-center space-x-2 text-white no-underline">
                <FaIcons.FaHome />
                <span>Home</span>
              </Link>
            </li>
            <li className="p-4">
              <Link to="/services" className="flex items-center space-x-2 text-white no-underline">
                <FaIcons.FaThList />
                <span>Shop by Category</span>
              </Link>
            </li>
            <li className="p-4">
              <Link to="/settings" className="flex items-center space-x-2 text-white no-underline">
                <FaIcons.FaCogs />
                <span>Settings</span>
              </Link>
            </li>
            <li className="p-4">
              <Link to="/dashboard" className="flex items-center space-x-2 text-white no-underline">
                <FaIcons.FaTachometerAlt />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="p-4">
              <Link to="/analytics" className="flex items-center space-x-2 text-white no-underline">
                <FaIcons.FaChartBar />
                <span>Analytics</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        } p-4 flex-1`}
      >
        {/* Keep the toggle button visible on all screens */}
        <button
          className="fixed top-4 left-4 text-2xl bg-transparent border-none text-white cursor-pointer z-30"
          onClick={toggleSidebar}
        >
          <FaIcons.FaBars />
        </button>
        <Outlet />
      </main>
      <div className={styles.flexjustify_around } >
          <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 md:hidden">
          <ul className="flex justify-around">
              {/* <li><a href="#" className="text-zinc-500 hover:text-zinc-700">Home</a></li> */}
              <li><a href="#" className="flex flex-col items-center text-zinc-800 dark:text-zinc-200">
                <FaIcons.FaHome/>
              <span className="text-sm">Home</span>
            </a></li>
            <li><a href="#" className="flex flex-col items-center text-zinc-800 dark:text-zinc-200">
              <FaIcons.FaShoppingCart/>
              <span className="text-sm">Cart</span>
            </a></li>
            <li><a href="#" className="flex flex-col items-center text-zinc-800 dark:text-zinc-200 relative">
              <FaIcons.FaEnvelopeOpenText/>
              <span className="text-sm">Messenger</span>
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">10</span>
            </a></li>
            <li><a href="#" className="flex flex-col items-center text-zinc-800 dark:text-zinc-200">
              <FaIcons.FaUser/>
              <span className="text-sm">My Account</span>
            </a></li>

          </ul>
  </nav>
</div>
    </div>
  );
}

export default Layout;
