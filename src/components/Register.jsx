import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const [loading, setLoading] = useState(false); // State for loading

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/profile/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setMessage("Registration successful!");
      setMessageType("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        password: "",
      });
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data.data || {});
        setMessage("Error registering. Please check the fields.");
        setMessageType("error");
      } else {
        setMessage("Error registering. Please try again.");
        setMessageType("error");
      }
    } finally {
      setLoading(false);
    }
  };

  // Toggle dark mode function
  const toggleDarkMode = () => setDarkMode(prevMode => !prevMode);

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex flex-1">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex items-center justify-center flex-1 p-6 sm:p-8">
          <div className={`w-full max-w-4xl ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'} shadow-lg rounded-2xl overflow-hidden`}>
            <div className="p-8">
              <h2 className="mb-6 text-3xl font-semibold">Register</h2>
              {message && (
                <div
                  className={`p-4 mb-6 rounded-md ${
                    messageType === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {message}
                </div>
              )}
              <form onSubmit={handleRegister} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[
                  { label: "First Name", name: "firstName", type: "text" },
                  { label: "Last Name", name: "lastName", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Phone", name: "phone", type: "tel" },
                  { label: "Address", name: "address", type: "text" },
                  { label: "City", name: "city", type: "text" },
                  { label: "State", name: "state", type: "text" },
                  { label: "Zip Code", name: "zip", type: "text" },
                  { label: "Password", name: "password", type: "password" },
                ].map(({ label, name, type }) => (
                  <div key={name} className="flex flex-col">
                    <label
                      htmlFor={name}
                      className={`mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      {label}
                    </label>
                    <input
                      id={name}
                      name={name}
                      type={type}
                      value={formData[name]}
                      onChange={handleChange}
                      required
                      className={`w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                        errors[name] ? "border-red-600" : (darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300")
                      }`}
                    />
                    {errors[name] && (
                      <p className="mt-1 text-sm font-semibold text-red-600">
                        {errors[name]}
                      </p>
                    )}
                  </div>
                ))}
                <div className="flex justify-center col-span-2">
                  <button
                    type="submit"
                    className={`relative px-8 py-3 font-semibold rounded-lg shadow-lg transition-transform duration-300 transform ${
                      darkMode
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500"
                        : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-400"
                    } focus:outline-none focus:ring-2 ring-opacity-50 ${
                      loading ? "cursor-wait" : "cursor-pointer"
                    }`}
                    style={{ maxWidth: '250px' }} // Control the width of the button
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                      </div>
                    ) : (
                      <span className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Register
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Register;
