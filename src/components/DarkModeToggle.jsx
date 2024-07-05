import React from 'react';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
    return (
        <div className="dark-mode-toggle">
            <button
                className={`w-full py-2 rounded-md ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-800'}`}
                onClick={toggleDarkMode}
            >
                {darkMode ? 'Dark Mode ON' : 'Dark Mode OFF'}
            </button>
        </div>
    );
};

export default DarkModeToggle;
