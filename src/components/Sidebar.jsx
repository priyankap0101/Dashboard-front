import React from 'react';
import { FaSun, FaMoon, FaHome, FaFilter, FaSearch, FaUserCircle, FaChartBar } from 'react-icons/fa';
import { BiExport } from 'react-icons/bi';

const Sidebar = ({ darkMode, toggleDarkMode, setShowExportMenu, showExportMenu, handleExport, setActiveChart }) => {
    return (
        <aside className={`p-6 bg-gray-800 text-white min-h-screen lg:w-1/4`}>
            <div className="mb-6">
                <h2 className="text-2xl font-bold">Dashboard Controls</h2>
            </div>
            <div className="flex items-center mb-6 space-x-2">
                <FaUserCircle className="text-3xl" />
                <div>
                    <p className="text-lg">John Doe</p>
                    <p className="text-sm text-gray-400">Admin</p>
                </div>
            </div>
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-4 py-2 text-gray-900 bg-white rounded-full focus:outline-none"
                    />
                    <FaSearch className="absolute top-0 right-0 mt-2 mr-4 text-gray-500" />
                </div>
            </div>
            <nav className="space-y-2">
                <button
                    onClick={() => setActiveChart('overview')}
                    className="flex items-center px-4 py-2 text-lg transition bg-gray-700 rounded hover:bg-gray-600"
                >
                    <FaHome className="mr-2" />
                    Dashboard Overview
                </button>
                <button
                    onClick={() => setActiveChart('filters')}
                    className="flex items-center px-4 py-2 text-lg transition bg-gray-700 rounded hover:bg-gray-600"
                >
                    <FaFilter className="mr-2" />
                    Filters
                </button>
                <button
                    onClick={() => setActiveChart('analytics')}
                    className="flex items-center px-4 py-2 text-lg transition bg-gray-700 rounded hover:bg-gray-600"
                >
                    <FaChartBar className="mr-2" />
                    Analytics
                </button>
                {/* Add more menu items here */}
            </nav>
            <div className="mt-6 space-y-2">
                <button
                    onClick={toggleDarkMode}
                    className="flex items-center px-4 py-2 text-lg transition bg-gray-700 rounded hover:bg-gray-600"
                    aria-label="Toggle Dark Mode"
                >
                    {darkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
                    Toggle {darkMode ? 'Light' : 'Dark'} Mode
                </button>
                <div className="relative">
                    <button
                        onClick={() => setShowExportMenu(!showExportMenu)}
                        className="flex items-center px-4 py-2 text-lg transition bg-gray-700 rounded hover:bg-gray-600"
                        aria-label="Export Data"
                    >
                        <BiExport className="mr-2" />
                        Export Data
                    </button>
                    {showExportMenu && (
                        <div className="absolute w-48 mt-2 bg-gray-800 rounded shadow-lg">
                            <button onClick={() => handleExport('csv')} className="block w-full px-4 py-2 text-left text-white transition hover:bg-gray-600">Export as CSV</button>
                            <button onClick={() => handleExport('pdf')} className="block w-full px-4 py-2 text-left text-white transition hover:bg-gray-600">Export as PDF</button>
                            <button onClick={() => handleExport('zip')} className="block w-full px-4 py-2 text-left text-white transition hover:bg-gray-600">Export as ZIP</button>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
