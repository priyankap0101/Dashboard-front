import React, { useState } from 'react';
import { FaSearch, FaUserCircle, FaBell, FaLanguage, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar, darkMode, toggleDarkMode }) => {
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    return (
        <header className={`flex items-center justify-between px-6 py-4 shadow-md ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-800 text-white'}`}>
            {/* Left section */}
            <div className="flex items-center space-x-4">
                <button onClick={toggleSidebar} className="text-2xl">
                    <FaBars />
                </button>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className={`w-64 px-4 py-2 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-900'} rounded-full focus:outline-none`}
                    />
                    <FaSearch className={`absolute top-0 right-0 mt-3 mr-4 ${darkMode ? 'text-gray-500' : 'text-gray-900'}`} />
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
                <div className="relative">
                    <button className={`text-xl ${darkMode ? 'text-gray-300' : 'text-white'}`} onClick={toggleProfileMenu}>
                        <FaUserCircle />
                    </button>
                    {showProfileMenu && (
                        <div className={`absolute right-0 w-48 py-2 mt-2 bg-white rounded-lg shadow-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                            <button
                                className="block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700"
                                onClick={() => {
                                    navigate('/register');
                                    setShowProfileMenu(false);
                                }}
                            >
                                Register
                            </button>
                            <button
                                className="block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700"
                                onClick={() => {
                                    navigate('/login');
                                    setShowProfileMenu(false);
                                }}
                            >
                                Login
                            </button>
                        </div>
                    )}
                </div>
                <button onClick={toggleDarkMode} className={`text-xl ${darkMode ? 'text-gray-300' : 'text-white'}`}>
                    {darkMode ? 'Light' : 'Dark'} Mode
                </button>
            </div>
        </header>
    );
};

export default Header;
