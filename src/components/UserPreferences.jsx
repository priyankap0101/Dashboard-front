// src/components/UserPreferences.jsx

import React, { useState, useEffect } from 'react';

const UserPreferences = ({ darkMode, toggleDarkMode, expertMode, toggleExpertMode }) => {
  const [preferences, setPreferences] = useState({
    darkMode,
    expertMode
  });

  useEffect(() => {
    const savedPreferences = JSON.parse(localStorage.getItem('userPreferences')) || {
      darkMode: false,
      expertMode: false
    };
    setPreferences(savedPreferences);
  }, []);

  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences]);

  const handleToggleDarkMode = () => {
    const newDarkMode = !preferences.darkMode;
    setPreferences({ ...preferences, darkMode: newDarkMode });
    toggleDarkMode();
  };

  const handleToggleExpertMode = () => {
    const newExpertMode = !preferences.expertMode;
    setPreferences({ ...preferences, expertMode: newExpertMode });
    toggleExpertMode();
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-xl font-semibold text-center dark:text-gray-100">User Preferences</h2>
      <div className="flex flex-col mt-4">
        <button
          onClick={handleToggleDarkMode}
          className="px-4 py-2 mb-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          {preferences.darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
        </button>
        <button
          onClick={handleToggleExpertMode}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          {preferences.expertMode ? 'Disable Expert Mode' : 'Enable Expert Mode'}
        </button>
      </div>
    </div>
  );
};

export default UserPreferences;
