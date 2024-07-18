import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaChartBar, FaUserFriends, FaShoppingCart, FaTruck, FaSchool } from 'react-icons/fa';

const Sidebar = ({ darkMode, toggleDarkMode }) => {
    return (
        <aside className={`w-64 min-h-screen p-4 text-white ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <nav>
                <ul className="space-y-4">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => `flex items-center p-2 space-x-2 rounded hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-800'} ${isActive ? 'bg-gray-700' : ''}`}
                        >
                            <FaChartBar />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/analytics"
                            className={({ isActive }) => `flex items-center p-2 space-x-2 rounded hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-800'} ${isActive ? 'bg-gray-700' : ''}`}
                        >
                            <FaChartBar />
                            <span>Analytics</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/crm"
                            className={({ isActive }) => `flex items-center p-2 space-x-2 rounded hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-800'} ${isActive ? 'bg-gray-700' : ''}`}
                        >
                            <FaUserFriends />
                            <span>CRM</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/ecommerce"
                            className={({ isActive }) => `flex items-center p-2 space-x-2 rounded hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-800'} ${isActive ? 'bg-gray-700' : ''}`}
                        >
                            <FaShoppingCart />
                            <span>E-commerce</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/logistics"
                            className={({ isActive }) => `flex items-center p-2 space-x-2 rounded hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-800'} ${isActive ? 'bg-gray-700' : ''}`}
                        >
                            <FaTruck />
                            <span>Logistics</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/academy"
                            className={({ isActive }) => `flex items-center p-2 space-x-2 rounded hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-800'} ${isActive ? 'bg-gray-700' : ''}`}
                        >
                            <FaSchool />
                            <span>Academy</span>
                        </NavLink>
                    </li>
                    <li>
                        {/* <NavLink
                            to="/profile"
                            className={({ isActive }) => `flex items-center p-2 space-x-2 rounded hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-800'} ${isActive ? 'bg-gray-700' : ''}`}
                        >
                            <FaSchool />
                            <span>Profile</span>
                        </NavLink>
                        <NavLink
                            to="/saveprofile"
                            className={({ isActive }) => `flex items-center p-2 space-x-2 rounded hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-800'} ${isActive ? 'bg-gray-700' : ''}`}
                        >
                            <FaSchool />
                            <span>Save Profile</span>
                        </NavLink> */}
                        {/* <NavLink
                            to="/updateprofile"
                            className={({ isActive }) => `flex items-center p-2 space-x-2 rounded hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-800'} ${isActive ? 'bg-gray-700' : ''}`}
                        >
                            <FaSchool />
                            <span>Update Profile</span>
                        </NavLink> */}
                        <NavLink
                            to="/register"
                            className={({ isActive }) => `flex items-center p-2 space-x-2 rounded hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-800'} ${isActive ? 'bg-gray-700' : ''}`}
                        >
                            <FaSchool />
                            <span>Register</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>

            {/* Dark Mode Toggle */}
            <div className="flex items-center mt-4">
                <button
                    className={`w-full py-2 rounded-md ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-800'}`}
                    onClick={toggleDarkMode}
                >
                    {darkMode ? 'Dark Mode ON' : 'Dark Mode OFF'}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
