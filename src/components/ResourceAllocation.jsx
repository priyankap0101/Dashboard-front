import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Line, Pie, Doughnut, Bar } from "react-chartjs-2";
import { ClipLoader } from "react-spinners";
import Header from "./Header"; // Adjust path as needed
import Sidebar from "./Sidebar"; // Adjust path as needed
import { Bubble } from "react-chartjs-2";

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

const refreshChart = () => {
  // Logic to refresh the chart
  console.log("Chart refreshed");
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
        label: "Utilization",
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

  const bubbleData = {
    datasets: [
      {
        label: "High Budget ",
        data: [
          { x: 120000, y: 5, r: 20 },
          { x: 150000, y: 7, r: 25 },
          { x: 130000, y: 6, r: 22 },
        ],
        backgroundColor: "rgba(255,99,132,0.6)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
      {
        label: "Medium Budget ",
        data: [
          { x: 70000, y: 10, r: 18 },
          { x: 85000, y: 12, r: 20 },
          { x: 90000, y: 11, r: 17 },
        ],
        backgroundColor: "rgba(54,162,235,0.6)",
        borderColor: "rgba(54,162,235,1)",
        borderWidth: 1,
      },
      {
        label: "Low Budget ",
        data: [
          { x: 30000, y: 20, r: 15 },
          { x: 25000, y: 25, r: 12 },
          { x: 20000, y: 30, r: 10 },
        ],
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const bubbleOptions = {
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          // color: "#333",
          color: darkMode ? "#ffffff" : "#000000",
          font: {
            size: 10, // Slightly larger font for better readability
            family: "Arial, sans-serif", // Consistent font family
            // weight: 'bold'  // Bold text for better emphasis
          },
          padding: 20, // Add padding around legend labels
          boxWidth: 14, // Width of the colored box for each legend item
          usePointStyle: true, // Use point style instead of box for items
        },
        padding: {
          top: -20, // Padding above the chart (creates gap between legend and chart)
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataPoint = tooltipItem.raw;
            return `Budget: $${dataPoint.x}, Team Size: ${dataPoint.y}, Impact Score: ${dataPoint.r}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Project Budget ($)",
          // color: "#333",
          color: darkMode ? "#ffffff" : "#000000",
          font: {
            size: 19,
          },
        },
        grid: {
          display: false,
          color: "#ddd",
        },
      },
      y: {
        title: {
          display: true,
          text: "Team Size",
          color: darkMode ? "#ffffff" : "#000000",
          font: {
            size: 14,
          },
        },
        grid: {
          display: false,
          color: "#ddd",
        },
      },
    },
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          // color: darkMode ? "#ffffff" : "#000000",
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
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
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
          className={`flex-1 p-6 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
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
                className={`relative p-8 rounded-xl border border-gray-200 transition-all duration-300 ease-out ${
                  darkMode
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-white text-gray-900 hover:bg-gray-100"
                } shadow-md hover:shadow-lg`}
              >
                {/* Main Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <h2 className="mb-5 text-2xl font-semibold">
                    Employee Utilization
                  </h2>

                  {/* Chart Container */}
                  <motion.div
                    className="h-64"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Line
                      data={utilizationData}
                      options={{
                        ...commonOptions,
                        scales: {
                          x: {
                            grid: {
                              display: false, // Remove grid lines
                            },
                            ticks: {
                              color: darkMode ? "#A0AEC0" : "#4A5568",
                              font: {
                                size: 12,
                              },
                            },
                          },
                          y: {
                            grid: {
                              display: false, // Remove grid lines
                            },
                            ticks: {
                              color: darkMode ? "#A0AEC0" : "#4A5568",
                              font: {
                                size: 12,
                              },
                            },
                          },
                        },
                        plugins: {
                          tooltip: {
                            backgroundColor: darkMode ? "#2D3748" : "#EDF2F7",
                            titleColor: darkMode ? "#F7FAFC" : "#2D3748",
                            bodyColor: darkMode ? "#F7FAFC" : "#2D3748",
                            borderColor: darkMode ? "#4FD1C5" : "#3182CE",
                            borderWidth: 1,
                            cornerRadius: 8,
                          },
                        },
                        elements: {
                          line: {
                            tension: 0.4,
                            borderWidth: 2.5,
                            borderColor: darkMode ? "#4FD1C5" : "#3182CE",
                            backgroundColor: darkMode
                              ? "rgba(79, 209, 197, 0.2)"
                              : "rgba(49, 130, 206, 0.2)",
                          },
                          point: {
                            radius: 5,
                            hoverRadius: 3,
                            backgroundColor: darkMode ? "#4FD1C5" : "#3182CE",
                          },
                        },
                      }}
                    />
                  </motion.div>

                  {/* Action Buttons */}
                  <div className="flex justify-end mt-6">
                    <motion.button
                      className="px-6 py-2 font-semibold text-white transition-all duration-200 rounded-lg shadow-lg bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-400 focus:outline-none"
                      whileHover={{ translateY: -3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Download Report
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className={`relative p-8 rounded-xl border border-gray-200 transition-all duration-300 ease-out ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                }`}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                }}
              >
                <h2 className="mb-5 text-2xl font-semibold">
                  Project Allocation
                </h2>
                <div className="flex items-center justify-center w-full ">
                  <div className="w-full h-full ">
                    <Bubble data={bubbleData} options={bubbleOptions} />
                  </div>
                </div>
              </motion.div>

              <motion.div
                className={`relative p-8 rounded-xl border border-gray-200 transition-all duration-300 ease-out ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                }`}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                }}
                variants={itemVariants}
              >
                <motion.h2
                  className="mb-5 text-2xl font-semibold"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  Utilization vs Allocation
                </motion.h2>

                <motion.div
                  className="h-64 overflow-hidden shadow-inner md:h-72 rounded-xl"
                  variants={chartVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 120, damping: 15 }}
                >
                  <Bar
                    data={barData}
                    options={{
                      ...commonOptions,
                      plugins: {
                        legend: {
                          labels: {
                            color: darkMode ? "#f0f0f0" : "#333",
                            font: {
                              size: 14,
                              family: "Poppins, sans-serif",
                            },
                          },
                        },
                      },
                      scales: {
                        x: {
                          grid: {
                            color: darkMode ? "#555" : "#ddd",
                            display: false,
                          },
                        },
                        y: {
                          grid: {
                            color: darkMode ? "#555" : "#ddd",
                            display: false,
                          },
                        },
                      },
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* 
<motion.div
  className={`relative p-8 transition-all duration-700 ease-in-out transform rounded-2xl shadow-xl ${
    darkMode
      ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white hover:shadow-2xl hover:scale-105"
      : "bg-gradient-to-br from-gray-50 to-white text-gray-900 hover:shadow-lg hover:scale-105"
  } border ${
    darkMode ? "border-gray-700 border-opacity-50" : "border-gray-300 border-opacity-70"
  } hover:border-opacity-100`}
  variants={itemVariants}
  whileHover={{ scale: 1.05, rotate: 1 }} // Slight rotation for a 3D effect
>
  <div className="flex items-center justify-between mb-6">
    <h2
      className={`text-3xl font-bold tracking-wider bg-clip-text text-transparent ${
        darkMode
          ? "bg-gradient-to-r from-teal-400 to-blue-500"
          : "bg-gradient-to-r from-indigo-600 to-purple-600"
      }`}
    >
      Bar Chart
    </h2>

    {/* Toggle button to switch between light and dark mode */}
              {/* <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-full transition-transform duration-300 ${
        darkMode
          ? "bg-gray-800 hover:bg-gray-700"
          : "bg-gray-300 hover:bg-gray-400"
      } focus:outline-none`}
    >
      {darkMode ? "🌙" : "☀️"} {/* Dark/Light mode icons */}
              {/* </button> */}
              {/* </div> */}

              {/* Bar chart container */}
              {/* <motion.div
    className="relative h-64 overflow-hidden rounded-lg bg-opacity-30 md:h-72 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800"
    variants={chartVariants}
    whileHover={{ scale: 1.04 }}
    transition={{ type: "spring", stiffness: 120, damping: 15 }}
  > */}
              {/* Chart refresh button */}
              {/* <button
      onClick={refreshChart}
      className="absolute p-2 text-sm bg-gray-300 rounded-full top-4 right-4 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
    > */}
              {/* 🔄 Refresh icon */}
              {/* </button> */}

              {/* The Bar chart itself */}
              {/* <Bar data={barData} options={commonOptions} />
  </motion.div> */}

              {/* Chart legend */}
              {/* <div className="flex justify-center mt-4 space-x-4">
    {barData.datasets.map((dataset, index) => (
      <div key={index} className="flex items-center space-x-2">
        <span
          className="block w-4 h-4 rounded-full"
          style={{ backgroundColor: dataset.backgroundColor }}
        ></span>
        <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          {dataset.label}
        </span>
      </div>
    ))}
  </div>
</motion.div> */}

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
