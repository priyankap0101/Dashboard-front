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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
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
    }
  };

  // Toggle dark mode function
  const toggleDarkMode = () => setDarkMode(prevMode => !prevMode);

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex flex-1">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex items-center justify-center flex-1 p-4">
          <div className={`w-full max-w-4xl overflow-hidden ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-xl`}>
            <div className="p-8">
              <h2 className="mb-6 text-3xl font-semibold">
                Register
              </h2>
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
              <form
                onSubmit={handleRegister}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2"
              >
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
                      className={`w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 ${
                        errors[name] ? "border-red-600" : (darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300")
                      }`}
                    />
                    {errors[name] && (
                      <p className="text-sm font-semibold text-red-600">
                        {errors[name]}
                      </p>
                    )}
                  </div>
                ))}
                <div className="col-span-2">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700"
                  >
                    Register
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
