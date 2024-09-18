import React, { useState, useRef, useEffect } from "react";
import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaGlobe,
  FaMoon,
  FaSun,
  FaChevronDown,
  FaShareAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ profilePicURL, userName, darkMode, toggleDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const profileMenuRef = useRef(null);
  const languageMenuRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleProfileMenu = () => setShowProfileMenu((prev) => !prev);
  const toggleLanguageMenu = () => setShowLanguageMenu((prev) => !prev);

  const handleProfileNavigation = (path) => {
    toggleProfileMenu();
    navigate(path);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target)
      ) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`flex items-center justify-between px-4 py-3 border-b ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <div className="flex items-center flex-1">
        <h1 className="text-xl font-bold md:text-2xl">Dashboard</h1>
        <button
          className="ml-4 text-2xl md:hidden hover:text-blue-500"
          onClick={() => setShowSearchBar((prev) => !prev)}
          aria-label="Toggle Search Bar"
        >
          <FaSearch />
        </button>
      </div>

      <div
        className={`relative flex-1 ${
          showSearchBar || window.innerWidth >= 768 ? "block" : "hidden"
        }`}
      >
        <label htmlFor="search-input" className="sr-only">
          Search
        </label>
        <input
          id="search-input"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className={`w-full px-4 py-2 rounded-full focus:outline-none transition-all duration-300 ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
          }`}
        />
        {showSearchBar && (
          <FaSearch
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-lg ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          />
        )}
      </div>

      <div className="flex items-center ml-4 space-x-4">
        <button
          className="text-sm hover:text-blue-500"
          aria-label="Notifications"
        >
          <FaBell />
        </button>

        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={toggleProfileMenu}
            className="flex items-center space-x-1 text-xs hover:text-blue-500"
            aria-label="Profile Menu"
          >
            <img
              src={
                profilePicURL ||
                "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151021986.jpg"
              }
              alt={userName || "User Profile"}
              className="w-5 h-5 rounded-full"
            />
            <FaChevronDown className="text-xs" />
          </button>
          {showProfileMenu && (
            <div
              className={`absolute right-0 mt-1 w-36 border rounded-md shadow-sm ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-300"
              }`}
            >
              <button
                className={`w-full px-2 py-1 text-left text-xs flex items-center ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-blue-50"
                }`}
                onClick={() => handleProfileNavigation("/profile")}
              >
                <FaUserCircle className="mr-1 text-xs" /> Profile
              </button>
              <button
                className={`w-full px-2 py-1 text-left text-xs flex items-center ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-blue-50"
                }`}
                onClick={() => handleProfileNavigation("/settings")}
              >
                <FaCog className="mr-1 text-xs" /> Settings
              </button>
              <button
                className={`w-full px-2 py-1 text-left text-xs flex items-center ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-blue-50"
                }`}
                onClick={() => {
                  /* Handle Share Profile */
                }}
              >
                <FaShareAlt className="mr-1 text-xs" /> Share Profile
              </button>
              <button
                className={`w-full px-2 py-1 text-left text-xs flex items-center ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-blue-50"
                }`}
                onClick={() => {
                  /* Handle Logout */
                }}
              >
                <FaSignOutAlt className="mr-1 text-xs" /> Logout
              </button>
            </div>
          )}
        </div>

        <div className="relative" ref={languageMenuRef}>
          <button
            onClick={toggleLanguageMenu}
            className="text-xs hover:text-blue-500"
            aria-label="Change Language"
          >
            <FaGlobe className="text-sm" />
          </button>
          {showLanguageMenu && (
            <div
              className={`absolute right-0 mt-1 w-32 border rounded-md shadow-sm ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-300"
              }`}
            >
              {["English", "Spanish", "French"].map((language) => (
                <button
                  key={language}
                  className={`w-full px-2 py-1 text-left text-xs flex items-center ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-blue-50"
                  }`}
                  onClick={() => {
                    /* Handle Language Change */
                  }}
                >
                  {language}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={toggleDarkMode}
          className="text-sm hover:text-blue-500"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
