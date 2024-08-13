import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getData } from "../services/dataService";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
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

  const darkColors = {
    background: 'rgba(0, 0, 0, 0.8)',
    border: 'rgba(255, 255, 255, 0.8)',
    line: 'rgba(255, 99, 132, 1)',
    bar: 'rgba(255, 99, 132, 0.2)',
    pie: [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)'
    ],
    radar: 'rgba(255, 99, 132, 0.8)'
  };

  const lightColors = {
    background: 'rgba(255, 255, 255, 1)',
    border: 'rgba(0, 0, 0, 0.8)',
    line: 'rgba(75, 192, 192, 1)',
    bar: 'rgba(75, 192, 192, 0.2)',
    pie: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)'
    ],
    radar: 'rgba(255, 99, 132, 0.2)'
  };

  const colors = darkMode ? darkColors : lightColors;

  const chartOptions = (isRadar = false) => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: darkMode ? colors.border : 'rgba(0, 0, 0, 0.8)'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`
        }
      }
    },
    elements: {
      line: {
        borderColor: colors.line
      },
      bar: {
        backgroundColor: colors.bar
      },
      radar: {
        backgroundColor: colors.radar,
        borderColor: colors.border
      }
    },
    scales: {
      x: {
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: darkMode ? colors.border : 'rgba(0, 0, 0, 0.8)'
        }
      },
      y: {
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: darkMode ? colors.border : 'rgba(0, 0, 0, 0.8)'
        }
      }
    }
  });

  const monthlySalesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Monthly Sales ($)',
      data: [1200, 1500, 1800, 2200, 2500, 2800, 3000, 3200, 3300, 3100, 2900, 2700],
      backgroundColor: colors.bar,
      borderColor: colors.line,
      borderWidth: 2
    }]
  };

  const quarterlyRevenueData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Quarterly Revenue ($)',
      data: [15000, 20000, 22000, 25000],
      backgroundColor: colors.bar,
      borderColor: colors.line,
      borderWidth: 2
    }]
  };

  const expenseData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      label: 'Monthly Expenses ($)',
      data: [600, 700, 800, 900, 950, 1100],
      borderColor: colors.line,
      backgroundColor: colors.bar,
      fill: true,
      tension: 0.3
    }]
  };

  const departmentExpenseData = {
    labels: ['HR', 'Engineering', 'Sales', 'Marketing'],
    datasets: [{
      label: 'Department Expenses (%)',
      data: [30, 40, 20, 10],
      backgroundColor: colors.pie
    }]
  };

  const skillData = {
    labels: ['JavaScript', 'React', 'Node.js', 'CSS', 'HTML'],
    datasets: [{
      label: 'Skill Proficiency',
      data: [90, 85, 80, 75, 70],
      backgroundColor: colors.radar,
      borderColor: colors.border,
      borderWidth: 2
    }]
  };

  const projectTimelineData = {
    labels: ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'],
    datasets: [{
      label: 'Project Timeline (days)',
      data: [30, 45, 60, 75],
      backgroundColor: colors.bar,
      borderColor: colors.line,
      borderWidth: 2
    }]
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Full width header */}
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main content with sidebar */}
      <div className="flex">
        <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <motion.h1
              className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              Analytics Dashboard
            </motion.h1>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <ClipLoader size={60} color={darkMode ? "#ffffff" : "#000000"} />
            </div>
          ) : (
            <motion.div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" variants={containerVariants}>
              <motion.div className="p-4 rounded-lg shadow-lg dark:bg-gray-800" variants={itemVariants}>
                <Bar data={monthlySalesData} options={chartOptions()} />
              </motion.div>
              <motion.div className="p-4 rounded-lg shadow-lg dark:bg-gray-800" variants={itemVariants}>
                <Bar data={quarterlyRevenueData} options={chartOptions()} />
              </motion.div>
              <motion.div className="p-4 rounded-lg shadow-lg dark:bg-gray-800" variants={itemVariants}>
                <Line data={expenseData} options={chartOptions()} />
              </motion.div>
              <motion.div className="p-4 rounded-lg shadow-lg dark:bg-gray-800" variants={itemVariants}>
                <Pie data={departmentExpenseData} options={chartOptions()} />
              </motion.div>
              <motion.div className="p-4 rounded-lg shadow-lg dark:bg-gray-800" variants={itemVariants}>
                <Radar data={skillData} options={chartOptions(true)} />
              </motion.div>
              <motion.div className="p-4 rounded-lg shadow-lg dark:bg-gray-800" variants={itemVariants}>
                <Bar data={projectTimelineData} options={chartOptions()} />
              </motion.div>
            </motion.div>
          )}
          <div className="mt-8">
            <CSVLink
              data={csvData}
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg dark:bg-blue-800"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Download CSV
            </CSVLink>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Analytics;
