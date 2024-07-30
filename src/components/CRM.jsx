import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bar, Line, Pie } from 'react-chartjs-2';
import ThreeDScatterPlot from "./ThreeDScatterPlot";
import { getData, getAllCities, getAllSwots, getAllPestles } from "../services/dataService";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const CRM = ({ darkMode }) => {
  const [mainData, setMainData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [swotData, setSwotData] = useState([]);
  const [pestleData, setPestleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const mainResult = await getData();
        const cities = await getAllCities();
        const swots = await getAllSwots();
        const pestles = await getAllPestles();
        setMainData(mainResult);
        setCityData(cities);
        setSwotData(swots);
        setPestleData(pestles);
      } catch (error) {
        toast.error("Error fetching data");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const barChartData = {
    labels: cityData.map(d => d),
    datasets: [{
      label: 'City Data',
      data: cityData.map(d => Math.floor(Math.random() * 100)), // Replace with actual data if available
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const lineChartData = {
    labels: swotData.map(d => d),
    datasets: [{
      label: 'SWOT Data',
      data: swotData.map(d => Math.floor(Math.random() * 100)), // Replace with actual data if available
      fill: false,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
    }],
  };

  const pieChartData = {
    labels: pestleData.map(d => d),
    datasets: [{
      label: 'PESTLE Data',
      data: pestleData.map(d => Math.floor(Math.random() * 100)), // Replace with actual data if available
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(153, 102, 255, 1)',
      ],
    }],
  };

  return (
    <motion.div
      className={`min-h-screen ${darkMode ? "dark" : ""}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header toggleSidebar={() => {}} />
      <div className="flex">
        <Sidebar darkMode={darkMode} toggleDarkMode={() => {}} />
        <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
          <div className="mb-8">
            <motion.h1
              className="text-4xl font-bold text-gray-900 dark:text-gray-100"
              variants={itemVariants}
            >
              CRM - Customer Visualization
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
              className="grid grid-cols-1 gap-6"
              variants={containerVariants}
            >
              <ChartCard
                title="Customer Data 3D Scatter Plot"
                chart={<ThreeDScatterPlot data={mainData} />}
              />
              <ChartCard
                title="City Data Bar Chart"
                chart={<Bar data={barChartData} />}
              />
              <ChartCard
                title="SWOT Data Line Chart"
                chart={<Line data={lineChartData} />}
              />
              <ChartCard
                title="PESTLE Data Pie Chart"
                chart={<Pie data={pieChartData} />}
              />
            </motion.div>
          )}
        </div>
      </div>
      <ToastContainer />
    </motion.div>
  );
};

const ChartCard = ({ title, chart }) => (
  <motion.div
    className="relative h-full"
    variants={itemVariants}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="flex flex-col justify-between h-full p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <motion.h2
        className="mb-4 text-xl font-semibold text-center dark:text-gray-100"
        variants={itemVariants}
      >
        {title}
      </motion.h2>
      <div className="flex-1 h-80">{chart}</div>
    </div>
  </motion.div>
);

export default CRM;
