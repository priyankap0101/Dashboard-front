import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; 
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { FiArrowUpCircle } from "react-icons/fi"; 
import Dashboard from "./components/Dashboard";
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

const colorChangingAnimation = `
  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .color-changing {
    background: linear-gradient(270deg, #14b8a6, #3b82f6, #ec4899, #facc15);
    background-size: 400% 400%;
    animation: gradientMove 8s ease infinite;
    transition: all 0.3s ease-in-out;
  }
`;

const App = () => {
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowIcon(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <style>{colorChangingAnimation}</style>
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
            <div className="fixed flex flex-col items-end space-y-2 bottom-6 right-6">
              <div className="flex items-center">
                <motion.button
                  className="px-6 py-2 font-semibold text-white rounded-lg shadow-lg color-changing focus:outline-none"
                  whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(255, 255, 255, 1)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  Shop Now
                </motion.button>

                {showIcon && (
                  <motion.div
                    className="ml-3 cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onClick={scrollToTop}
                  >
                    <FiArrowUpCircle size={32} className="text-white hover:text-gray-400" />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
