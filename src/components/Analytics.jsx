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
import Modal from "./Modal";
import { CSVLink } from "react-csv";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from 'chart.js';
import { Line, Pie, Radar } from 'react-chartjs-2';

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

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 }
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.3 }
  }
};

const Analytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
    setDarkMode(savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  const csvData = data.map(item => ({
    city: item.city,
    topic: item.topic,
    swot: item.swot,
    pestle: item.pestle
  }));

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <motion.div
      className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header toggleSidebar={() => {}} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className={`flex-1 p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
          <div className="mb-8">
          <motion.h1
  className={`text-4xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
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
              <ChartCard title="City" chart={<CityChart data={data} darkMode={darkMode} width="100%" height={120} />} csvData={csvData.map(item => ({ city: item.city }))} darkMode={darkMode} />
              <ChartCard title="Topic" chart={<TopicChart data={data} darkMode={darkMode} width="100%" height={320} />} csvData={csvData.map(item => ({ topic: item.topic }))} darkMode={darkMode} />
              <ChartCard title="SWOT" chart={<SwotChart data={data} darkMode={darkMode} width="100%" height={320} />} csvData={csvData.map(item => ({ swot: item.swot }))} darkMode={darkMode} />
              <ChartCard title="PESTLE" chart={<PESTLEChart data={data} darkMode={darkMode} width="100%" height={320} />} csvData={csvData.map(item => ({ pestle: item.pestle }))} darkMode={darkMode} />
            </motion.div>
          )}
        </div>
      </div>
      <ToastContainer />
      {showModal && (
        <Modal onClose={toggleModal}>
          <h2>Modal Content</h2>
          <p>This is where you can add your modal content.</p>
          <button onClick={toggleModal}>Close Modal</button>
        </Modal>
      )}
    </motion.div>
  );
};

const ChartCard = ({ title, chart, csvData, darkMode }) => (
  <motion.div
    className="relative h-full"
    variants={itemVariants}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className={`flex flex-col justify-between h-full p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
      <motion.h2
        className="mb-4 text-xl font-semibold text-center"
        variants={itemVariants}
      >
        {title}
      </motion.h2>
      <div className="flex-1 h-80">
        {chart}
      </div>
      <motion.div
        variants={itemVariants}
        className="flex justify-end mt-4"
      >
        <CSVLink
          className="inline-flex items-center px-4 py-2 text-sm font-bold text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-700"
          data={csvData}
          filename={`${title.toLowerCase()}_data.csv`}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M15.5 3a.5.5 0 01.5.5v12a.5.5 0 01-1 0v-12a.5.5 0 01.5-.5z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M4.293 12.293a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L7.414 12H13a1 1 0 110 2H7.414l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download CSV
        </CSVLink>
      </motion.div>
    </div>
  </motion.div>
);

export default Analytics;
