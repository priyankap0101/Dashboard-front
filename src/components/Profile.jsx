import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { FaUserCircle } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = ({ darkMode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState("John Doe");
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/150");
  const [userEmail, setUserEmail] = useState("email@example.com");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        let response;
        if (id) {
          // Fetch user data by ID
          response = await fetch(`http://localhost:8080/api/profile/getbyId?id=${id}`);
        } else {
          // Fetch user data by query if no ID is provided
          response = await fetch(`http://localhost:8080/api/profile/search?query=priya`);
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Handle both cases
        if (Array.isArray(data) && data.length > 0) {
          const user = data[0]; // Use the first result if it's an array
          setUserName(user.firstName + " " + user.lastName);
          setProfilePic(user.profilePic || "https://via.placeholder.com/150");
          setUserEmail(user.email || "email@example.com");
        } else if (data.id) { // Handle the single object case
          setUserName(data.firstName + " " + data.lastName);
          setProfilePic(data.profilePic || "https://via.placeholder.com/150");
          setUserEmail(data.email || "email@example.com");
        }
      } catch (error) {
        toast.error("Error fetching user data");
      }
      setLoading(false);
    };

    fetchUserData();
  }, [id]);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = () => {
    console.log("User logged out");
    setIsLoggedIn(false);
    navigate("/login");
    setShowProfileMenu(false);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Header darkMode={darkMode} />
      <div className="flex flex-1">
        <Sidebar darkMode={darkMode} />
        <div className="flex-1 p-6 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <ClipLoader color={darkMode ? "#ffffff" : "#000000"} loading={loading} size={50} />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="relative flex flex-col items-center">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-32 h-32 mb-4 border-4 border-gray-300 rounded-full dark:border-gray-600"
                />
                <button
                  className={`absolute bottom-0 right-0 bg-gray-200 dark:bg-gray-700 p-2 rounded-full ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <FaUserCircle className="text-xl" />
                  <input type="file" id="fileInput" className="hidden" onChange={handleProfilePicChange} />
                </button>
                <div className="text-center">
                  <h1 className="text-2xl font-semibold">{userName}</h1>
                  <p className="text-gray-500 dark:text-gray-400">{userEmail}</p>
                </div>
                <button
                  className={`mt-4 px-4 py-2 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"} hover:bg-gray-300 dark:hover:bg-gray-600 transition`}
                  onClick={toggleProfileMenu}
                >
                  {showProfileMenu ? "Hide Menu" : "Show Menu"}
                </button>
                {showProfileMenu && (
                  <div className={`mt-4 w-full max-w-md p-4 rounded-lg shadow-lg border ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"}`}>
                    {isLoggedIn ? (
                      <>
                        <button className="block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => { navigate("/profile"); setShowProfileMenu(false); }}>View Profile</button>
                        <button className="block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700" onClick={handleLogout}>Logout</button>
                      </>
                    ) : (
                      <>
                        <button className="block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => { navigate("/login"); setShowProfileMenu(false); }}>Login</button>
                        <button className="block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => { navigate("/register"); setShowProfileMenu(false); }}>Register</button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Profile;
