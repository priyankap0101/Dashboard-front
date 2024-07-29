import React, { useState, useEffect } from "react";
import { FaSearch, FaUserCircle, FaBell, FaLanguage, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar, darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [userName, setUserName] = useState("John Doe");
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/40");

  useEffect(() => {
    // Fetch user data (mock)
    setUserName("John Doe");
    setProfilePic("https://via.placeholder.com/40");
  }, []);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
    setShowLanguageMenu(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
    setShowLanguageMenu(false);
  };

  const toggleLanguageMenu = () => {
    setShowLanguageMenu(!showLanguageMenu);
    setShowProfileMenu(false);
    setShowNotifications(false);
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      try {
        const response = await fetch(`http://localhost:8080/api/profile/search?query=${query}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setSearchSuggestions(data);
        } else {
          setSearchSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
        setSearchSuggestions([]);
      }
    } else {
      setSearchSuggestions([]);
    }
  };

  const handleLogout = () => {
    // Mock logout functionality
    console.log("User logged out");
    navigate("/login");
    setShowProfileMenu(false);
  };

  const handleLanguageChange = (language) => {
    // Mock language change functionality
    console.log("Language changed to:", language);
    setShowLanguageMenu(false);
  };

  const handleSuggestionClick = (profileId) => {
    navigate(`/profile/${profileId}`);
    setSearchQuery("");
    setSearchSuggestions([]);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/searchprofile/${searchQuery}`);
      setSearchQuery("");
      setSearchSuggestions([]);
    }
  };

  return (
    <header className={`flex items-center justify-between px-6 py-4 shadow-md transition duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="text-2xl transition duration-300 hover:text-blue-500">
          <FaBars />
        </button>
        <div className="relative">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={`w-64 px-4 py-2 rounded-full focus:outline-none transition duration-300 ${darkMode ? "bg-gray-700 text-gray-300 border-gray-600" : "bg-gray-100 text-gray-800 border-gray-300"}`}
            />
            <button type="submit" className={`absolute top-0 right-0 mt-3 mr-4 transition duration-300 ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
              <FaSearch />
            </button>
          </form>
          {searchSuggestions.length > 0 && (
            <ul className={`absolute left-0 w-full mt-2 border rounded-lg shadow-lg max-h-60 overflow-y-auto ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"}`}>
              {searchSuggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => handleSuggestionClick(suggestion.id)}
                >
                  {suggestion.firstName} {suggestion.lastName}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        <span className="hidden md:block">Welcome, {userName}</span>
        <div className="relative">
          <button className={`text-xl transition duration-300 hover:text-blue-500 ${darkMode ? "text-gray-300" : "text-gray-600"}`} onClick={toggleLanguageMenu}>
            <FaLanguage />
          </button>
          {showLanguageMenu && (
            <div className={`absolute right-0 w-48 py-2 mt-2 rounded-lg shadow-xl border ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"}`}>
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => handleLanguageChange("English")}>
                English
              </button>
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => handleLanguageChange("Spanish")}>
                Spanish
              </button>
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => handleLanguageChange("French")}>
                French
              </button>
            </div>
          )}
        </div>
        <div className="relative">
          <button className={`relative text-xl transition duration-300 hover:text-blue-500 ${darkMode ? "text-gray-300" : "text-gray-600"}`} onClick={toggleNotifications}>
            <FaBell />
            <span className="absolute top-0 right-0 px-2 mt-1 mr-1 text-xs bg-red-500 rounded-full">3</span>
          </button>
          {showNotifications && (
            <div className={`absolute right-0 w-64 py-2 mt-2 rounded-lg shadow-xl border ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"}`}>
              <div className="px-4 py-2 border-b dark:border-gray-600">Notifications</div>
              <div className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">Notification 1</div>
              <div className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">Notification 2</div>
              <div className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">Notification 3</div>
            </div>
          )}
        </div>
        <div className="relative">
          <button className={`text-xl transition duration-300 hover:text-blue-500 ${darkMode ? "text-gray-300" : "text-gray-600"}`} onClick={toggleProfileMenu}>
            <img src={profilePic} alt="Profile" className="w-8 h-8 rounded-full" />
          </button>
          {showProfileMenu && (
            <div className={`absolute right-0 w-48 py-2 mt-2 rounded-lg shadow-xl border ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"}`}>
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => navigate("/profile")}>View Profile</button>
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => navigate("/register")}>Register</button>
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => navigate("/login")}>Login</button>
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
        <button onClick={toggleDarkMode} className={`text-xl transition duration-300 px-3 py-1 rounded-full ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}>{darkMode ? "Light" : "Dark"} Mode</button>
      </div>
    </header>
  );
};

export default Header;
