import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Register = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [darkMode, setDarkMode] = useState(false);

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
      const response = await fetch("http://localhost:8080/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const savedProfile = await response.json();
      console.log("Profile saved successfully:", savedProfile);
      setSuccess(true);
    } catch (error) {
      console.error("Error saving profile:", error);
      setError(error.message);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Header />

      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <h2 className="mb-6 text-2xl font-bold">Register</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveProfile();
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">City:</label>
                  <input
                    type="text"
                    name="city"
                    value={profile.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">State:</label>
                  <input
                    type="text"
                    name="state"
                    value={profile.state}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Zip:</label>
                  <input
                    type="text"
                    name="zip"
                    value={profile.zip}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Password:</label>
                  <input
                    type="text"
                    name="zip"
                    value={profile.password}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Register
              </button>
            </form>
            {success && (
              <p className="mt-4 text-green-600">Profile saved successfully!</p>
            )}
            {error && <p className="mt-4 text-red-600">Error: {error}</p>}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Register;
