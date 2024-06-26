import React from 'react';
import { FaSearch, FaUserCircle, FaBell, FaLanguage, FaBars } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="flex items-center justify-between px-6 py-4 text-white bg-gray-800 shadow-md">
            {/* Left section */}
            <div className="flex items-center space-x-4">
                <button className="text-2xl">
                    <FaBars />
                </button>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-64 px-4 py-2 text-gray-900 bg-white rounded-full focus:outline-none"
                    />
                    <FaSearch className="absolute top-0 right-0 mt-3 mr-4 text-gray-500" />
                </div>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-4">
                <button className="text-xl">
                    <FaLanguage />
                </button>
                <button className="relative text-xl">
                    <FaBell />
                    <span className="absolute top-0 right-0 px-2 mt-1 mr-1 text-xs bg-red-500 rounded-full">3</span>
                </button>
                <button className="text-xl">
                    <FaUserCircle />
                </button>
            </div>
        </header>
    );
};

export default Header;
