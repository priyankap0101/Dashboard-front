import React, { useState, useEffect } from "react";
import {
  FaSearch, FaUserCircle, FaBell, FaGlobe, FaBars, FaSignOutAlt,
  FaMoon, FaSun, FaCog, FaShareAlt, FaEnvelope, FaCircle, FaSpinner
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar, darkMode, toggleDarkMode, theme, setTheme }) => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [userName, setUserName] = useState("John Doe");
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/32");
  const [userStatus, setUserStatus] = useState("Online");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user data (mock)
    setUserName("John Doe");
    setProfilePic("https://via.placeholder.com/32");
  }, []);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
    setShowLanguageMenu(false);
    setShowMessages(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
    setShowLanguageMenu(false);
    setShowMessages(false);
  };

  const toggleMessages = () => {
    setShowMessages(!showMessages);
    setShowProfileMenu(false);
    setShowNotifications(false);
    setShowLanguageMenu(false);
  };

  const toggleLanguageMenu = () => {
    setShowLanguageMenu(!showLanguageMenu);
    setShowProfileMenu(false);
    setShowNotifications(false);
    setShowMessages(false);
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/profile/search?query=${query}`);
        const data = await response.json();
        setSearchSuggestions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
        setSearchSuggestions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchSuggestions([]);
    }
  };

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
    setShowProfileMenu(false);
  };

  const handleLanguageChange = (language) => {
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

  const handleShareProfile = () => {
    const profileUrl = window.location.origin + '/profile';
    navigator.clipboard.writeText(profileUrl)
      .then(() => {
        alert("Profile URL copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying profile URL:", error);
      });
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <header className={`flex items-center justify-between px-6 py-4 shadow-md transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="text-2xl transition-transform transform hover:text-blue-500 hover:scale-105">
          <FaBars />
        </button>
        <div className="relative flex-grow max-w-md">
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-100 rounded-full shadow-sm dark:bg-gray-800">
            <input
              type="text"
              placeholder="Search profiles..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={`w-full px-4 py-2 rounded-full focus:outline-none transition-colors duration-300 ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-800"}`}
            />
            <button type="submit" className={`px-4 text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              <FaSearch />
            </button>
          </form>
          {loading && <FaSpinner className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2 animate-spin" />}
          {searchSuggestions.length > 0 && !loading && (
            <ul className={`absolute left-0 w-full mt-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              {searchSuggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className={`px-4 py-2 cursor-pointer hover:${darkMode ? "bg-gray-700 text-white" : "bg-gray-100"} rounded-lg transition-colors duration-300`}
                  onClick={() => handleSuggestionClick(suggestion.id)}
                >
                  <div className="flex items-center space-x-2">
                    <img src={suggestion.profilePic || "https://via.placeholder.com/32"} alt="Profile" className="w-8 h-8 rounded-full" />
                    <div>
                      <p>{suggestion.firstName} {suggestion.lastName}</p>
                      <p className="text-sm text-gray-500">{suggestion.email}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        <span className="hidden text-sm font-medium md:block">{userName}</span>
        <div className="flex items-center space-x-2">
          <FaCircle className={`text-xs ${userStatus === "Online" ? "text-green-500" : userStatus === "Away" ? "text-yellow-500" : "text-red-500"}`} />
          <span className="hidden text-sm md:block">{userStatus}</span>
        </div>
        <div className="relative">
          <button onClick={toggleMessages} className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-600"} hover:text-blue-500`} title="Messages">
            <FaEnvelope />
          </button>
          {showMessages && (
            <div className={`absolute right-0 mt-2 w-64 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className={`px-4 py-2 border-b ${darkMode ? "dark:border-gray-700 text-white" : "border-gray-300"}`}>Messages</div>
              {[
                {
                  user: "Alice Johnson",
                  message: "Hi, could you please send me the report?",
                  profilePic: "https://via.placeholder.com/32"
                },
                {
                  user: "Bob Smith",
                  message: "Don't forget our meeting tomorrow at 10 AM.",
                  profilePic: "https://via.placeholder.com/32"
                },
                {
                  user: "Charlie Brown",
                  message: "Can you review the code I submitted?",
                  profilePic: "https://wallpapers.com/images/high/profile-picture-f67r1m9y562wdtin.webp"
                }
              ].map((msg, index) => (
                <div key={index} className={`px-4 py-2 hover:${darkMode ? "bg-gray-700 text-white" : "bg-gray-100"} rounded-lg transition-colors duration-300`}>
                  <div className="flex items-center space-x-2">
                    <img src={msg.profilePic} alt="User" className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="font-semibold">{msg.user}</p>
                      <p className="text-sm text-gray-500">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full px-4 py-2 text-blue-500 rounded-b-lg hover:bg-blue-50 dark:hover:bg-blue-700" onClick={toggleMessages}>View All</button>
            </div>
          )}
        </div>
        <div className="relative">
          <button onClick={toggleNotifications} className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-600"} hover:text-blue-500`} title="Notifications">
            <FaBell />
          </button>
          {showNotifications && (
            <div className={`absolute right-0 mt-2 w-64 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className={`px-4 py-2 border-b ${darkMode ? "dark:border-gray-700 text-white" : "border-gray-300"}`}>Notifications</div>
              {[
                {
                  title: "New Comment",
                  detail: "John commented on your post."
                },
                {
                  title: "New Follower",
                  detail: "Jane Doe started following you."
                },
                {
                  title: "Task Deadline",
                  detail: "Your task is due tomorrow."
                }
              ].map((notification, index) => (
                <div key={index} className={`px-4 py-2 hover:${darkMode ? "bg-gray-700 text-white" : "bg-gray-100"} rounded-lg transition-colors duration-300`}>
                  <p className="font-semibold">{notification.title}</p>
                  <p className="text-sm text-gray-500">{notification.detail}</p>
                </div>
              ))}
              <button className="w-full px-4 py-2 text-blue-500 rounded-b-lg hover:bg-blue-50 dark:hover:bg-blue-700" onClick={toggleNotifications}>View All</button>
            </div>
          )}
        </div>
        <div className="relative">
          <button onClick={toggleLanguageMenu} className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-600"} hover:text-blue-500`} title="Language">
            <FaGlobe />
          </button>
          {showLanguageMenu && (
            <div className={`absolute right-0 mt-2 w-48 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className={`px-4 py-2 border-b ${darkMode ? "dark:border-gray-700 text-white" : "border-gray-300"}`}>Select Language</div>
              <div className="flex flex-col">
                {["English", "Spanish", "French", "German"].map((language, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 text-left hover:${darkMode ? "bg-gray-700 text-white" : "bg-gray-100"} rounded-lg transition-colors duration-300`}
                    onClick={() => handleLanguageChange(language)}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="relative">
          <button onClick={toggleProfileMenu} className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-600"} hover:text-blue-500`} title="Profile">
            <FaUserCircle />
          </button>
          {showProfileMenu && (
            <div className={`absolute right-0 mt-2 w-48 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className={`px-4 py-2 border-b ${darkMode ? "dark:border-gray-700 text-white" : "border-gray-300"}`}>
                <div className="flex items-center space-x-2">
                  <img src={profilePic} alt="Profile" className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="font-semibold">{userName}</p>
                    <p className="text-sm text-gray-500">View Profile</p>
                  </div>
                </div>
              </div>
              <button className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={handleShareProfile}>
                <FaShareAlt className="inline mr-2" /> Share Profile
              </button>
              <button className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={handleLogout}>
                <FaSignOutAlt className="inline mr-2" /> Logout
              </button>
              <button className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => navigate("/settings")}>
                <FaCog className="inline mr-2" /> Settings
              </button>
            </div>
          )}
        </div>
        <button onClick={toggleDarkMode} className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-600"}`} title="Toggle Dark Mode">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
