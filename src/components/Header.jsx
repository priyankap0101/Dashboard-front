import React, { useState } from 'react';
import {
  FaSearch, FaBell, FaUserCircle, FaCog, FaSignOutAlt, FaGlobe, FaMoon, FaSun, FaChevronDown, FaShareAlt
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = ({ profilePicURL, userName, darkMode, toggleDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = (menu) => {
    if (menu === 'notifications') setShowNotifications(!showNotifications);
    if (menu === 'profile') setShowProfileMenu(!showProfileMenu);
    if (menu === 'language') setShowLanguageMenu(!showLanguageMenu);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    // Logic to handle logout
  };

  const handleLanguageChange = (language) => {
    // Logic to handle language change
  };

  const handleShareProfile = () => {
    // Logic to handle profile sharing
  };

  return (
    <header className={`flex items-center justify-between px-4 py-2 border-b ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
      {/* Left Aligned Title */}
      <div className="flex-1">
        <h1 className="text-xl font-bold md:text-2xl">Dashboard</h1>
      </div>

      {/* Centered Icons */}
      <div className="flex justify-center flex-1 space-x-4">
        <button
          onClick={() => handleMenuToggle('notifications')}
          className="relative text-2xl hover:text-blue-500"
          aria-label="Notifications"
        >
          <FaBell />
          {showNotifications && (
            <div className={`absolute right-0 mt-2 w-48 border rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
              {/* Notification Items */}
              <div className="p-2 text-sm">No new notifications</div>
            </div>
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => handleMenuToggle('profile')}
            className="flex items-center space-x-2 hover:text-blue-500"
            aria-label="Profile"
          >
            <img
              src={profilePicURL || "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151021986.jpg?t=st=1723092794~exp=1723096394~hmac=6ad460ae4faf28675ac9aae06279aeb25619f0f38fc0fb0128a53957dbee3b27&w=360"}
              alt="User Profile"
              className="w-8 h-8 rounded-full"
            />
            <FaChevronDown />
          </button>
          {showProfileMenu && (
            <div className={`absolute right-0 mt-2 w-48 border rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
              <button
                className="w-full px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-blue-700"
                onClick={() => { handleMenuToggle('profile'); navigate("/profile"); }}
              >
                <FaUserCircle className="mr-2" /> Profile
              </button>
              <button
                className="w-full px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-blue-700"
                onClick={() => { handleMenuToggle('profile'); navigate("/settings"); }}
              >
                <FaCog className="mr-2" /> Settings
              </button>
              <button
                className="w-full px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-blue-700"
                onClick={handleShareProfile}
              >
                <FaShareAlt className="mr-2" /> Share Profile
              </button>
              <button
                className="w-full px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-blue-700"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => handleMenuToggle('language')}
          className="relative text-2xl hover:text-blue-500"
          aria-label="Change Language"
        >
          <FaGlobe />
          {showLanguageMenu && (
            <div className={`absolute right-0 mt-2 w-48 border rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
              {['English', 'Spanish', 'French'].map((language) => (
                <button
                  key={language}
                  className="w-full px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-blue-700"
                  onClick={() => handleLanguageChange(language)}
                >
                  {language}
                </button>
              ))}
            </div>
          )}
        </button>

        <button
          onClick={toggleDarkMode}
          className="text-2xl hover:text-blue-500"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Right Aligned Search Input */}
      <div className="flex justify-end flex-1">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className={`px-4 py-2 rounded-full focus:outline-none ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
          />
          <FaSearch className={`absolute right-3 top-3 text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
        </div>
      </div>
    </header>
  );
};

export default Header;
