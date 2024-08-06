import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line, Pie, Doughnut } from 'react-chartjs-2';
import { ClipLoader } from 'react-spinners';
import Header from './Header'; // Adjust path as needed
import Sidebar from './Sidebar'; // Adjust path as needed
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, ArcElement, Filler, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  CategoryScale,
  LinearScale
);

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const ResourceAllocation = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Replace this with your data fetching logic
        const result = [
          { month: 'Jan', utilization: 65, allocation: 35 },
          { month: 'Feb', utilization: 75, allocation: 45 },
          { month: 'Mar', utilization: 85, allocation: 55 },
          { month: 'Apr', utilization: 70, allocation: 60 },
          { month: 'May', utilization: 80, allocation: 50 },
          // Add more data as needed
        ];
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  const utilizationData = {
    labels: data.map(item => item.month),
    datasets: [{
      label: 'Employee Utilization (%)',
      data: data.map(item => item.utilization),
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      fill: true,
    }]
  };

  const allocationData = {
    labels: data.map(item => item.month),
    datasets: [{
      label: 'Project Allocation (%)',
      data: data.map(item => item.allocation),
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true,
    }]
  };

  const pieData = {
    labels: ['Utilization', 'Allocation'],
    datasets: [{
      data: [
        data.reduce((sum, item) => sum + item.utilization, 0) / data.length,
        data.reduce((sum, item) => sum + item.allocation, 0) / data.length
      ],
      backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 1
    }]
  };

  const doughnutData = {
    labels: ['Utilization', 'Allocation'],
    datasets: [{
      data: [
        data.reduce((sum, item) => sum + item.utilization, 0) / data.length,
        data.reduce((sum, item) => sum + item.allocation, 0) / data.length
      ],
      backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
      borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
      borderWidth: 1
    }]
  };

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Value: ${context.raw}`
        }
      }
    }
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
              Resource Allocation Dashboard
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
              >
                <h2 className="mb-4 text-xl font-semibold">Employee Utilization Over Time</h2>
                <Line data={utilizationData} options={commonOptions} />
              </motion.div>
              <motion.div
                className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
                variants={itemVariants}
              >
                <h2 className="mb-4 text-xl font-semibold">Project Allocation Over Time</h2>
                <Line data={allocationData} options={commonOptions} />
              </motion.div>
              <motion.div
                className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
                variants={itemVariants}
              >
                <h2 className="mb-4 text-xl font-semibold">Overall Utilization vs Allocation</h2>
                <Pie data={pieData} options={commonOptions} />
              </motion.div>
              <motion.div
                className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
                variants={itemVariants}
              >
                <h2 className="mb-4 text-xl font-semibold">Utilization vs Allocation (Doughnut)</h2>
                <Doughnut data={doughnutData} options={commonOptions} />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ResourceAllocation;
