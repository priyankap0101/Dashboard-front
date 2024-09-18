// src/App.jsx
import React from "react";
import { motion } from "framer-motion"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Analytics from "./components/Analytics";
import Profile from "./components/Profile";
import SaveProfile from "./components/SaveProfile";
import UpdateProfile from "./components/UpdateProfile";
import Register from "./components/Register";
import Login from "./components/Login";
import SearchProfile from "./components/SearchProfile";
import CRM from "./components/CRM"; // Correctly import CRM
import Ecommerce from "./components/Ecommerce";
import Logistics from "./components/Logistics";
import ResourceAllocation from "./components/ResourceAllocation";

// Placeholder components for other routes
const ECommerce = () => <div>E-commerce Content</div>;
// const Logistics = () => <div>Logistics Content</div>;
const Academy = () => <div>Academy Content</div>;


const lightningAnimation = {
  keyframes: [
    { boxShadow: "0 0 5px rgba(255, 255, 255, 0.5)" },
    { boxShadow: "0 0 15px rgba(255, 255, 255, 1)" },
    { boxShadow: "0 0 5px rgba(255, 255, 255, 0.5)" }
  ],
  duration: 1000, // Duration of the animation in milliseconds
  iterations: Infinity // Infinite loop
};

const App = () => {
  return (
    <Router>
      <div className="flex">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/crm/*" element={<CRM />} /> {/* Updated path */}
            <Route path="/ecommerce" element={<Ecommerce />} />
            <Route path="/logistics" element={<Logistics />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/resource" element={<ResourceAllocation />} />
            
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/saveprofile" element={<SaveProfile />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/searchprofile/:query" element={<SearchProfile />} />
            {/* Default route */}
            <Route
              path="*"
              element={<div>Select an option from the sidebar</div>}
            />
          </Routes>
          {/* Button positioned at bottom-right */}
          <div className="fixed bottom-6 right-6">
              <motion.button
                className="px-6 py-2 font-semibold text-white transition-all duration-200 rounded-lg shadow-lg bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-400 focus:outline-none"
                whileHover={{ translateY: -3 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  animation: `lightning ${lightningAnimation.duration}ms ${lightningAnimation.iterations} linear`
                }}
              >
                Shop Now
              </motion.button>
            </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
