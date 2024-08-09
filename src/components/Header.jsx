import React, { useState } from 'react';
import {
  FaSearch, FaBell, FaUserCircle, FaCog, FaSignOutAlt, FaGlobe, FaMoon, FaSun, FaChevronDown, FaShareAlt
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = ({ profilePicURL, userName, darkMode, toggleDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleProfileMenu = () => setShowProfileMenu(prev => !prev);
  const toggleLanguageMenu = () => setShowLanguageMenu(prev => !prev);
  const handleProfileNavigation = (path) => {
    toggleProfileMenu();
    navigate(path);
  };

  return (
    <header className={`flex items-center justify-between px-4 py-2 border-b ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
      {/* Title and Search Toggle */}
      <div className="flex items-center flex-1">
        <h1 className="flex-1 text-xl font-bold md:text-2xl">Dashboard</h1>
        <button
          className="ml-4 text-2xl md:hidden hover:text-blue-500"
          onClick={() => setShowSearchBar(prev => !prev)}
          aria-label="Toggle Search Bar"
        >
          <FaSearch />
        </button>
      </div>

      {/* Search Bar */}
      <div className={`relative flex-1 ${showSearchBar || window.innerWidth >= 768 ? 'block' : 'hidden'}`}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className={`w-full md:w-80 lg:w-96 px-4 py-2 rounded-full focus:outline-none transition-all duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
        />
        {showSearchBar && (
          <FaSearch className={`absolute right-3 top-3 text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
        )}
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center ml-4 space-x-4">
        <button className="text-2xl hover:text-blue-500" aria-label="Notifications">
          <FaBell />
        </button>

        <div className="relative">
          <button
            onClick={toggleProfileMenu}
            className="flex items-center space-x-2 text-2xl hover:text-blue-500"
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
              <button className="w-full px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-blue-700" onClick={() => handleProfileNavigation("/profile")}>
                <FaUserCircle className="mr-2" /> Profile
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-blue-700" onClick={() => handleProfileNavigation("/settings")}>
                <FaCog className="mr-2" /> Settings
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-blue-700" onClick={() => { /* Handle Share Profile */ }}>
                <FaShareAlt className="mr-2" /> Share Profile
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-blue-700" onClick={() => { /* Handle Logout */ }}>
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={toggleLanguageMenu}
            className="text-2xl hover:text-blue-500"
            aria-label="Change Language"
          >
            <FaGlobe />
          </button>
          {showLanguageMenu && (
            <div className={`absolute right-0 mt-2 w-48 border rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
              {['English', 'Spanish', 'French'].map((language) => (
                <button
                  key={language}
                  className="w-full px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-blue-700"
                  onClick={() => { /* Handle Language Change */ }}
                >
                  {language}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={toggleDarkMode}
          className="text-2xl hover:text-blue-500"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
