import React, { useState } from 'react';
import { FaSearch, FaUserCircle, FaBell, FaLanguage, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false); // State for dark mode

    const toggleDarkMode = () => {
        setDarkMode(!darkMode); // Toggle dark mode state
    };

    return (
        <header className={`flex items-center justify-between px-6 py-4 text-white ${darkMode ? 'bg-gray-900' : 'bg-gray-800'} shadow-md`}>
            {/* Left section */}
            <div className="flex items-center space-x-4">
                <button onClick={toggleSidebar} className="text-2xl">
                    <FaBars />
                </button>
                <div className={`relative ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className={`w-64 px-4 py-2 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-full focus:outline-none`}
                    />
                    <FaSearch className="absolute top-0 right-0 mt-3 mr-4 text-gray-500" />
                </div>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-4">
                <button className={`text-xl ${darkMode ? 'text-gray-300' : 'text-white'}`}>
                    <FaLanguage />
                </button>
                <button className={`relative text-xl ${darkMode ? 'text-gray-300' : 'text-white'}`}>
                    <FaBell />
                    <span className="absolute top-0 right-0 px-2 mt-1 mr-1 text-xs bg-red-500 rounded-full">3</span>
                </button>
                <button className={`text-xl ${darkMode ? 'text-gray-300' : 'text-white'}`} onClick={() => navigate('/profile')}>
                    <FaUserCircle />
                </button>
                <button onClick={toggleDarkMode} className={`text-xl ${darkMode ? 'text-gray-300' : 'text-white'}`}>
                    {darkMode ? 'Light' : 'Dark'} Mode
                </button>
            </div>
        </header>
    );
};

export default Header;
