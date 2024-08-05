import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getData } from "../services/dataService";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
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

const Logistics = () => {
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
  const deliveryData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Deliveries',
      data: [150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2
    }]
  };

  const deliveryOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Deliveries: ${context.raw}`
        }
      }
    }
  };

  const transportCostData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Transport Costs ($)',
      data: [5000, 7000, 8000, 10000],
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 2
    }]
  };

  const transportCostOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Costs: $${context.raw}`
        }
      }
    }
  };

  const deliveryTimeData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      label: 'Average Delivery Time (days)',
      data: [5, 4, 4.5, 4, 3.5, 3],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.3
    }]
  };

  const deliveryTimeOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Time: ${context.raw} days`
        }
      }
    }
  };

  const regionExpensesData = {
    labels: ['North', 'South', 'East', 'West'],
    datasets: [{
      label: 'Regional Expenses ($)',
      data: [3000, 4000, 3500, 4500],
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

  const regionExpensesOptions = {
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

  const fleetEfficiencyData = {
    labels: ['Truck', 'Van', 'Bike', 'Drone'],
    datasets: [{
      label: 'Fleet Efficiency (%)',
      data: [85, 90, 70, 75],
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 2
    }]
  };

  const fleetEfficiencyOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Efficiency: ${context.raw}%`
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
              Logistics Dashboard
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
              <motion.div
                className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
                variants={itemVariants}
              >
                <h2 className="mb-4 text-xl font-semibold">Deliveries Over Time</h2>
                <Line data={deliveryData} options={deliveryOptions} />
              </motion.div>
              <motion.div
                className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
                variants={itemVariants}
              >
                <h2 className="mb-4 text-xl font-semibold">Transport Costs by Quarter</h2>
                <Bar data={transportCostData} options={transportCostOptions} />
              </motion.div>
              <motion.div
                className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
                variants={itemVariants}
              >
                <h2 className="mb-4 text-xl font-semibold">Average Delivery Time</h2>
                <Line data={deliveryTimeData} options={deliveryTimeOptions} />
              </motion.div>
              <motion.div
                className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
                variants={itemVariants}
              >
                <h2 className="mb-4 text-xl font-semibold">Regional Expenses</h2>
                <Pie data={regionExpensesData} options={regionExpensesOptions} />
              </motion.div>
              <motion.div
                className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
                variants={itemVariants}
              >
                <h2 className="mb-4 text-xl font-semibold">Fleet Efficiency</h2>
                <Radar data={fleetEfficiencyData} options={fleetEfficiencyOptions} />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
      <ToastContainer />
      <Modal showModal={showModal} toggleModal={toggleModal} />
    </motion.div>
  );
};

export default Logistics;
