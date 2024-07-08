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
    id: 4, // Profile ID
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });
  const [isNewProfile, setIsNewProfile] = useState(true); // Flag to determine if the profile is new
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);

    // Fetch existing profile data
    fetch(`/api/getProfile/${profile.id}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setProfile(data);
          setIsNewProfile(false); // Profile data exists, so it's not a new profile
        }
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/updateProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        if (isNewProfile) {
          toast.success('Profile created successfully!');
          setIsNewProfile(false); // Once saved, it's no longer a new profile
        } else {
          toast.success('Profile updated successfully!');
        }
      } else {
        toast.error('Failed to save profile. Please try again.');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Header />
      <div className="flex">
        <Sidebar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          className="mt-16"
        />
        <div className="flex-1 p-6 mt-16">
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text drop-shadow-lg animate-fade-in">
              User Profile
            </h1>
          </div>
          <motion.div
            className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:shadow-2xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <motion.div variants={itemVariants} className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                <input
                  type="text"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
                <input
                  type="text"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Zip</label>
                <input
                  type="text"
                  name="zip"
                  value={profile.zip}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="col-span-2">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isNewProfile ? 'Save Profile' : 'Update Profile'}
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
