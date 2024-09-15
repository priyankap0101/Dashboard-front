import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Line, Pie, Doughnut, Bar } from "react-chartjs-2";
import { ClipLoader } from "react-spinners";
import Header from "./Header"; // Adjust path as needed
import Sidebar from "./Sidebar"; // Adjust path as needed
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
);

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const chartVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
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
        // Simulate a network request
        const result = [
          { month: "Jan", utilization: 65, allocation: 35 },
          { month: "Feb", utilization: 75, allocation: 45 },
          { month: "Mar", utilization: 85, allocation: 55 },
          { month: "Apr", utilization: 70, allocation: 60 },
          { month: "May", utilization: 80, allocation: 50 },
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
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "Employee Utilization (%)",
        data: data.map((item) => item.utilization),
        borderColor: darkMode
          ? "rgba(54, 162, 235, 1)"
          : "rgba(75, 192, 192, 1)",
        backgroundColor: darkMode
          ? "rgba(54, 162, 235, 0.2)"
          : "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const allocationData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "Project Allocation (%)",
        data: data.map((item) => item.allocation),
        borderColor: darkMode
          ? "rgba(255, 99, 132, 1)"
          : "rgba(255, 159, 64, 1)",
        backgroundColor: darkMode
          ? "rgba(255, 99, 132, 0.2)"
          : "rgba(255, 159, 64, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "Utilization vs Allocation",
        data: data.map((item) => item.utilization),
        backgroundColor: darkMode
          ? "rgba(75, 192, 192, 0.6)"
          : "rgba(153, 102, 255, 0.6)",
        borderColor: darkMode
          ? "rgba(75, 192, 192, 1)"
          : "rgba(153, 102, 255, 1)",
        borderWidth: 1,
        barPercentage: 0.5,
      },
      {
        label: "Allocation",
        data: data.map((item) => item.allocation),
        backgroundColor: darkMode
          ? "rgba(255, 99, 132, 0.6)"
          : "rgba(255, 159, 64, 0.6)",
        borderColor: darkMode
          ? "rgba(255, 99, 132, 1)"
          : "rgba(255, 159, 64, 1)",
        borderWidth: 1,
        barPercentage: 0.5,
      },
    ],
  };

  const pieData = {
    labels: ["Utilization", "Allocation"],
    datasets: [
      {
        data: [
          data.reduce((sum, item) => sum + item.utilization, 0) / data.length,
          data.reduce((sum, item) => sum + item.allocation, 0) / data.length,
        ],
        backgroundColor: darkMode
          ? ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"]
          : ["rgba(75, 192, 192, 0.6)", "rgba(255, 159, 64, 0.6)"],
        borderColor: darkMode
          ? ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"]
          : ["rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ["Utilization", "Allocation"],
    datasets: [
      {
        data: [
          data.reduce((sum, item) => sum + item.utilization, 0) / data.length,
          data.reduce((sum, item) => sum + item.allocation, 0) / data.length,
        ],
        backgroundColor: darkMode
          ? ["rgba(255, 159, 64, 0.6)", "rgba(153, 102, 255, 0.6)"]
          : ["rgba(255, 206, 86, 0.6)", "rgba(153, 102, 255, 0.6)"],
        borderColor: darkMode
          ? ["rgba(255, 159, 64, 1)", "rgba(153, 102, 255, 1)"]
          : ["rgba(255, 206, 86, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: darkMode ? "#ffffff" : "#000000",
          font: {
            size: 14,
            family: "Arial, sans-serif",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `Value: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? "#ffffff" : "#000000",
        },
        grid: {
          color: darkMode ? "#444" : "#e0e0e0",
        },
      },
      y: {
        ticks: {
          color: darkMode ? "#ffffff" : "#000000",
        },
        grid: {
          color: darkMode ? "#444" : "#e0e0e0",
        },
      },
    },
    animation: {
      duration: 2000,
      easing: "easeInOutQuad",
    },
  };
  return (
    <motion.div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header
        toggleSidebar={() => {}}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <div className="flex">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div
          className={`flex-1 p-6 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
        >
          <div className="mb-8">
            <motion.h1
              className={`text-4xl font-bold ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}
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
                className={`p-6 transition-shadow rounded-lg shadow-lg ${
                  darkMode
                    ? "bg-gray-700 text-white hover:shadow-xl"
                    : "bg-white text-gray-900 hover:shadow-lg"
                }`}
                variants={itemVariants}
              >
                <h2 className="mb-4 text-2xl font-semibold">
                  Employee Utilization
                </h2>
                <motion.div
                  className="h-64"
                  variants={chartVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <Line data={utilizationData} options={commonOptions} />
                </motion.div>
              </motion.div>

              <motion.div
                className={`p-6 transition-shadow rounded-lg shadow-lg ${
                  darkMode
                    ? "bg-gray-700 text-white hover:shadow-xl"
                    : "bg-white text-gray-900 hover:shadow-lg"
                }`}
                variants={itemVariants}
              >
                <h2 className="mb-4 text-2xl font-semibold">
                  Project Allocation
                </h2>
                <motion.div
                  className="h-64"
                  variants={chartVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <Line data={allocationData} options={commonOptions} />
                </motion.div>
              </motion.div>

              <motion.div
                className={`p-6 transition-shadow rounded-lg shadow-lg ${
                  darkMode
                    ? "bg-gray-700 text-white hover:shadow-xl"
                    : "bg-white text-gray-900 hover:shadow-lg"
                }`}
                variants={itemVariants}
              >
                <h2 className="mb-4 text-2xl font-semibold">Bar Chart</h2>
                <motion.div
                  className="h-64"
                  variants={chartVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <Bar data={barData} options={commonOptions} />
                </motion.div>
              </motion.div>

              <motion.div
                className={`p-6 transition-shadow rounded-lg shadow-lg ${
                  darkMode
                    ? "bg-gray-700 text-white hover:shadow-xl"
                    : "bg-white text-gray-900 hover:shadow-lg"
                }`}
                variants={itemVariants}
              >
                <h2 className="mb-4 text-2xl font-semibold">Pie Chart</h2>
                <motion.div
                  className="h-64"
                  variants={chartVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <Pie data={pieData} options={commonOptions} />
                </motion.div>
              </motion.div>

              <motion.div
                className={`p-6 transition-shadow rounded-lg shadow-lg ${
                  darkMode
                    ? "bg-gray-700 text-white hover:shadow-xl"
                    : "bg-white text-gray-900 hover:shadow-lg"
                }`}
                variants={itemVariants}
              >
                <h2 className="mb-4 text-2xl font-semibold">Doughnut Chart</h2>
                <motion.div
                  className="h-64"
                  variants={chartVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <Doughnut data={doughnutData} options={commonOptions} />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ResourceAllocation;
