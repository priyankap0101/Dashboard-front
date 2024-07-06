import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', profile);
    toast.success('Profile updated successfully!');
    // Add logic here to send the updated profile data to your backend
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen transition-colors duration-300`}
    >
      <Header /> {/* Include the Header component here */}
      <div className="flex">
        <Sidebar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          className="mt-16" // Adjust the margin-top to position Sidebar below Header
        />
        <div className="flex-1 p-6 mt-16"> {/* Adjusted margin-top to account for header height */}
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text drop-shadow-lg animate-fade-in">
              User Profile
            </h1>
          </div>
          <motion.div
            className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <motion.div variants={itemVariants}>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                  <input
                    type="text"
                    name="city"
                    value={profile.city}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
                  <input
                    type="text"
                    name="state"
                    value={profile.state}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Zip</label>
                  <input
                    type="text"
                    name="zip"
                    value={profile.zip}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                  />
                </motion.div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
