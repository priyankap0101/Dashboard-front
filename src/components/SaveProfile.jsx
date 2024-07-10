import React, { useState } from 'react';


const SaveProfile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        // other fields
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const saveProfile = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/profile/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const savedProfile = await response.json();
            console.log('Profile saved successfully:', savedProfile);
            setSuccess(true);
        } catch (error) {
            console.error('Error saving profile:', error);
            setError(error.message);
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
              className="max-w-2xl p-8 mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:shadow-2xl"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                  />
                </motion.div>
                {/* Add other fields similarly */}
                <motion.div variants={itemVariants}>
                  <button type="submit" className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Update Profile
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
export default SaveProfile;
