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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  BarElement
} from 'chart.js';
import { Line, Pie, Radar, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  BarElement
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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

  // Dummy data for new charts
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Sales ($)',
      data: [1200, 1900, 3000, 5000, 2000, 3000, 4000, 5500, 6000, 7000, 8000, 9000],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2
    }]
  };

  const salesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Sales: $${context.raw}`
        }
      }
    }
  };

  const revenueData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Revenue ($)',
      data: [15000, 20000, 25000, 30000],
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 2
    }]
  };

  const revenueOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Revenue: $${context.raw}`
        }
      }
    }
  };

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      label: 'Expenses ($)',
      data: [500, 600, 700, 800, 900, 1000],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true,
      tension: 0.3
    }]
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Expenses: $${context.raw}`
        }
      }
    }
  };

  const pieData = {
    labels: ['Marketing', 'Development', 'Design', 'Sales'],
    datasets: [{
      label: 'Department Expenses ($)',
      data: [2000, 3000, 4000, 2500],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 2
    }]
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Expenses: $${context.raw}`
        }
      }
    }
  };

  const radarData = {
    labels: ['JavaScript', 'Python', 'Java', 'C++', 'PHP'],
    datasets: [{
      label: 'Skill Levels (%)',
      data: [80, 70, 60, 50, 40],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2
    }]
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Skill Level: ${context.raw}%`
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
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
            >
              <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold">Sales Over Time</h2>
                <Line data={salesData} options={salesOptions} />
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold">Revenue by Quarter</h2>
                <Bar data={revenueData} options={revenueOptions} />
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold">Expenses Overview</h2>
                <Line data={lineData} options={lineOptions} />
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold">Department Expenses</h2>
                <Pie data={pieData} options={pieOptions} />
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold">Skill Levels</h2>
                <Radar data={radarData} options={radarOptions} />
              </div>
            </motion.div>
          )}
          <div className="flex justify-end mt-6">
            <motion.button
              className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={toggleModal}
            >
              Export Data
            </motion.button>
            <Modal show={showModal} onClose={toggleModal}>
              <h2 className="mb-4 text-xl font-semibold">Export Data</h2>
              <CSVLink data={csvData} filename="analytics-data.csv" className="px-4 py-2 text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600">
                Download CSV
              </CSVLink>
            </Modal>
          </div>
          <ToastContainer />
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;
