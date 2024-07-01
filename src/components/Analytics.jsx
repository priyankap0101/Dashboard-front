import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getData } from "../services/dataService";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import TopicChart from "./TopicChart";
import SwotChart from "./SwotChart";
import CityChart from "./CityChart";
import PESTLEChart from "./PESTLEChart";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from 'chart.js';
import { Line, Pie, Radar } from 'react-chartjs-2';

// Registering components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

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

const Analytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        toast.error("Error fetching data");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
    setDarkMode(savedDarkMode);
  }, []);

  return (
    <motion.div
      className={`min-h-screen ${darkMode ? "dark" : ""}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header toggleSidebar={() => {}} />
      <div className="flex">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
          <div className="mb-8">
            <motion.h1
              className="text-4xl font-bold text-gray-900 dark:text-gray-100"
              variants={itemVariants}
            >
              Analytics Dashboard
            </motion.h1>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <ClipLoader
                color={darkMode ? "#ffffff" : "#000000"}
                loading={loading}
                size={50}
              />
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2"
              variants={containerVariants}
            >
              <motion.div
                className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.h2
                  className="mb-4 text-xl font-semibold text-center dark:text-gray-100"
                  variants={itemVariants}
                >
                  City
                </motion.h2>
                <motion.div
                  variants={itemVariants}
                >
                  <CityChart data={data} />
                </motion.div>
              </motion.div>
              <motion.div
                className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.h2
                  className="mb-4 text-xl font-semibold text-center dark:text-gray-100"
                  variants={itemVariants}
                >
                  Topic
                </motion.h2>
                <motion.div
                  variants={itemVariants}
                >
                  <TopicChart data={data} />
                </motion.div>
              </motion.div>
              <motion.div
                className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.h2
                  className="mb-4 text-xl font-semibold text-center dark:text-gray-100"
                  variants={itemVariants}
                >
                  SWOT
                </motion.h2>
                <motion.div
                  variants={itemVariants}
                >
                  <SwotChart data={data} />
                </motion.div>
              </motion.div>
              <motion.div
                className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.h2
                  className="mb-4 text-xl font-semibold text-center dark:text-gray-100"
                  variants={itemVariants}
                >
                  PESTLE
                </motion.h2>
                <motion.div
                  variants={itemVariants}
                >
                  <PESTLEChart data={data} />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
      <ToastContainer />
    </motion.div>
  );
};

export default Analytics;
