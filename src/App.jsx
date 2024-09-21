import React from "react";
import { motion } from "framer-motion"; 
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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
import CRM from "./components/CRM"; 
import Ecommerce from "./components/Ecommerce";
import Logistics from "./components/Logistics";
import ResourceAllocation from "./components/ResourceAllocation";

const ECommerce = () => <div>E-commerce Content</div>;
const Academy = () => <div>Academy Content</div>;

const colorChangingAnimation = `
  @keyframes colorChange {
    0% { background-color: #14b8a6; } /* Teal */
    33% { background-color: #3b82f6; } /* Blue */
    66% { background-color: #ec4899; } /* Pink */
    100% { background-color: #14b8a6; } /* Teal */
  }

  @keyframes shadowPulse {
    0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.8); }
    50% { box-shadow: 0 0 40px rgba(255, 255, 255, 1); }
  }

  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .color-changing {
    background: linear-gradient(270deg, #14b8a6, #3b82f6, #ec4899, #facc15);
    background-size: 400% 400%;
    animation: gradientMove 8s ease infinite, shadowPulse 2s infinite;
    transition: all 0.3s ease-in-out;
  }
`;

const App = () => {
  return (
    <>
      <style>{colorChangingAnimation}</style> {/* Inject the keyframes */}
      <Router>
        <div className="flex">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Navigate to="/analytics" replace />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/crm/*" element={<CRM />} />
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
              <Route path="*" element={<Navigate to="/analytics" replace />} />
            </Routes>

            {/* Button positioned at bottom-right */}
            <div className="fixed bottom-6 right-6">
              <motion.button
                className="px-6 py-2 font-semibold text-white rounded-lg shadow-lg color-changing focus:outline-none"
                whileHover={{ scale: 1.1}} 
                whileTap={{ scale: 0.9 }} /* Stronger tap interaction */
              >
                Shop Now
              </motion.button>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
