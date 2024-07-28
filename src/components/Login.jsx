import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar"; // Import Sidebar component
import Header from "./Header"; // Import Header component

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/profile/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setMessage("Login successful!");
      setMessageType("success");
      // Optionally, redirect to another page or handle post-login actions here
    } catch (error) {
      setMessage(
        "Error logging in. Please check your credentials and try again."
      );
      setMessageType("error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex items-center justify-center flex-1 p-6">
          <div className="w-full max-w-lg overflow-hidden transition-transform transform bg-white border border-gray-300 shadow-2xl rounded-2xl hover:scale-105 hover:shadow-3xl">
            <div className="p-10">
              <h2 className="mb-6 text-4xl font-bold text-center text-gray-800">
                Login
              </h2>
              {message && (
                <div
                  className={`p-4 mb-6 rounded-md ${
                    messageType === "success"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {message}
                </div>
              )}
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="mb-2 text-lg font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-4 transition duration-200 ease-in-out border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="password"
                    className="mb-2 text-lg font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full p-4 transition duration-200 ease-in-out border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-gray-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4.5-7 11-7 11 7 11 7-4.5 7-11 7S1 12 1 12z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-gray-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4.5-7 11-7 11 7 11 7-4.5 7-11 7S1 12 1 12z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                          <path d="M16.24 17.57A10.963 10.963 0 0 0 21 12c-1.72-3.35-5.01-5.96-8.93-5.96a9.963 9.963 0 0 0-5.21 1.32"></path>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-3 font-semibold text-white transition duration-200 ease-in-out bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Login
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

export default Login;
