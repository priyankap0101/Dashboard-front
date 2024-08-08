import React, { useState } from 'react';
import {
  FaSearch, FaBell, FaUserCircle, FaCog, FaSignOutAlt, FaGlobe, FaMoon, FaSun, FaChevronDown, FaShareAlt
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const notifications = [
  {
    text: "New comment on your post",
    time: "2 minutes ago",
    icon: <FaGlobe className="text-blue-500" />
  },
  {
    text: "You have a new friend request",
    time: "1 hour ago",
    icon: <FaUserCircle className="text-green-500" />
  },
  {
    text: "Server rebooted successfully",
    time: "Yesterday",
    icon: <FaCog className="text-yellow-500" />
  }
];

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
    <header className={`flex items-center justify-between p-4 border-b ${darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
      <div className="flex items-center flex-grow">
        <h1 className="text-xl font-bold md:text-2xl">Dashboard</h1>
      </div>
      <div className="flex items-center flex-shrink-0 space-x-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className={`px-4 py-2 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
          />
          <FaSearch className={`absolute right-2 top-2 text-xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>
        <div className="relative md:hidden">
          <button onClick={() => handleMenuToggle('search')} className="text-2xl transition-transform transform hover:text-blue-500 hover:scale-105" aria-label="Search">
            <FaSearch />
          </button>
        </div>
        <div className="relative">
          <button onClick={() => handleMenuToggle('notifications')} className="text-2xl transition-transform transform hover:text-blue-500 hover:scale-105" aria-label="Notifications">
            <FaBell />
          </button>
          {showNotifications && (
            <div className={`absolute right-0 mt-2 w-64 border rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
              <div className={`px-4 py-2 border-b ${darkMode ? 'border-gray-700 text-white' : 'border-gray-300'}`}>Notifications</div>
              {notifications.map((notif, index) => (
                <div key={index} className={`px-4 py-2 hover:${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} rounded-lg transition-colors duration-300`}>
                  <div className="flex items-center space-x-2">
                    {notif.icon}
                    <div>
                      <p className="font-semibold">{notif.text}</p>
                      <p className="text-sm text-gray-500">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full px-4 py-2 text-blue-500 rounded-b-lg hover:bg-blue-50 dark:hover:bg-blue-700" onClick={() => handleMenuToggle('notifications')}>View All</button>
            </div>
          )}
        </div>
        <div className="relative">
          <button onClick={() => handleMenuToggle('profile')} className="flex items-center space-x-2 focus:outline-none" title="Profile">
            <img src={profilePicURL || "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151021986.jpg?t=st=1723092794~exp=1723096394~hmac=6ad460ae4faf28675ac9aae06279aeb25619f0f38fc0fb0128a53957dbee3b27&w=360"} alt="UserLoggedIn" className="w-8 h-8 rounded-full" />
            <span className="hidden text-sm md:block">{userName}</span>
            <FaChevronDown />
          </button>
          {showProfileMenu && (
            <div className={`absolute right-0 mt-2 w-48 border rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
              <button className="w-full px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-blue-700" onClick={() => { handleMenuToggle('profile'); navigate("/profile"); }}>
                <FaUserCircle className="mr-2" /> Profile
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-blue-700" onClick={() => { handleMenuToggle('profile'); navigate("/settings"); }}>
                <FaCog className="mr-2" /> Settings
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-blue-700" onClick={handleShareProfile}>
                <FaShareAlt className="mr-2" /> Share Profile
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-blue-700" onClick={handleLogout}>
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
        <div className="relative">
          <button onClick={() => handleMenuToggle('language')} className="text-2xl transition-transform transform hover:text-blue-500 hover:scale-105" aria-label="Change Language">
            <FaGlobe />
          </button>
          {showLanguageMenu && (
            <div className={`absolute right-0 mt-2 w-48 border rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
              {['English', 'Spanish', 'French'].map((language) => (
                <button key={language} className="w-full px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-blue-700" onClick={() => handleLanguageChange(language)}>
                  {language}
                </button>
              ))}
            </div>
          )}
        </div>
        <button onClick={toggleDarkMode} className="text-2xl transition-transform transform hover:text-blue-500 hover:scale-105" aria-label="Toggle Dark Mode">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
