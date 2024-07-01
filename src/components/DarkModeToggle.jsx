import React, { useState, useEffect } from 'react';

const DarkModeToggle = ({ onToggle }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    onToggle(savedDarkMode);
  }, [onToggle]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    onToggle(newDarkMode);
  };

  return (
    <button onClick={toggleDarkMode} className={`text-xl ${darkMode ? 'text-gray-300' : 'text-white'}`}>
      {darkMode ? 'Light' : 'Dark'} Mode
    </button>
  );
};

export default DarkModeToggle;
