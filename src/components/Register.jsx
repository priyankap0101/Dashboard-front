import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const InputField = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  darkMode,
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className={`mb-2 text-sm font-medium ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        className={`w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
          error
            ? "border-red-600"
            : darkMode
            ? "border-gray-600 bg-gray-700 text-white"
            : "border-gray-300"
        }`}
      />
      {error && (
        <p className="mt-1 text-sm font-semibold text-red-600">{error}</p>
      )}
    </div>
  );
};

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
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/profile/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
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
      if (error.response?.data) {
        setErrors(error.response.data.data || {});
        setMessage("Error registering. Please check the fields.");
      } else {
        setMessage("Error registering. Please try again.");
      }
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const formFields = [
    { label: "First Name", name: "firstName", type: "text" },
    { label: "Last Name", name: "lastName", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone", name: "phone", type: "tel" },
    { label: "Address", name: "address", type: "text" },
    { label: "City", name: "city", type: "text" },
    { label: "State", name: "state", type: "text" },
    { label: "Zip Code", name: "zip", type: "text" },
    { label: "Password", name: "password", type: "password" },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex flex-1">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex flex-col flex-1 p-6 sm:p-8">
          <div
            className={`w-full max-w-4xl mx-auto ${
              darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
            } shadow-lg rounded-2xl overflow-hidden`}
          >
            <div className="p-8">
              <h2 className="mb-6 text-lg font-semibold">Register</h2>
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
                {formFields.map(({ label, name, type }) => (
                  <InputField
                    key={name}
                    label={label}
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    error={errors[name]}
                    darkMode={darkMode}
                  />
                ))}
                <div className="flex justify-center col-span-2">
                  <button
                    type="submit"
                    className={`relative px-8 py-3 font-semibold rounded-lg shadow-lg transition-transform duration-300 transform ${
                      darkMode
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500"
                        : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-400"
                    } ${loading ? "cursor-wait" : "cursor-pointer"}`}
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
