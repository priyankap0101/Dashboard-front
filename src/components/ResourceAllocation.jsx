import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Radar, Line, Pie, Doughnut, Bar } from "react-chartjs-2";
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

  const bubbleData = {
    datasets: [
      {
        label: "High Budget ",
        data: [
          // { x: 120000, y: 5, r: 20 },
          { x: 450000, y: 18, r: 25 },
          { x: 730000, y: 19, r: 22 },
        ],
        backgroundColor: "rgba(255,99,132,0.6)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
      {
        label: "Medium Budget ",
        data: [
          // { x: 70000, y: 10, r: 18 },
          { x: 985000, y: 22, r: 20 },
          { x: 43000, y: 16, r: 17 },
        ],
        backgroundColor: "rgba(54,162,235,0.6)",
        borderColor: "rgba(54,162,235,1)",
        borderWidth: 1,
      },
      {
        label: "Low Budget ",
        data: [
          // { x: 30000, y: 20, r: 15 },
          { x: 650000, y: 25, r: 12 },
          { x: 400000, y: 20, r: 10 },
        ],
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const bubbleOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: darkMode ? "#ffffff" : "#000000",
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
          padding: window.innerWidth < 768 ? 10 : 20,
          boxWidth: 12,
        },
      },
      tooltip: {
        backgroundColor: darkMode ? "#2D3748" : "#FFFFFF",
        titleColor: darkMode ? "#FFFFFF" : "#000000",
        bodyColor: darkMode ? "#FFFFFF" : "#000000",
        borderColor: darkMode ? "#4A5568" : "#E2E8F0",
        borderWidth: 1,
        callbacks: {
          label: (tooltipItem) => {
            const dataPoint = tooltipItem.raw;
            return `Budget: $${dataPoint.x}, Team Size: ${dataPoint.y}, Impact Score: ${dataPoint.r}`;
          },
        },
      },
    },
    layout: {
      padding: {
        top: 15,
        bottom: 50, // Increase bottom padding
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Project Budget ($)",
          color: darkMode ? "#ffffff" : "#000000",
          font: {
            size: 14,
          },
          padding: 15,
        },
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
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
          padding: 15,
        },
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
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

  const radarData = {
    labels: [
      "Budget Management",
      "Time Management",
      "Team Coordination",
      "Risk Assessment",
      "Resource Planning",
    ],
    datasets: [
      {
        label: "Resource Allocation Proficiency",
        data: [75, 80, 85, 70, 78], // Adjust data values as needed
        backgroundColor: darkMode
          ? "rgba(153, 102, 255, 0.2)" // Purple
          : "rgba(255, 206, 86, 0.2)", // Yellow
        borderColor: darkMode
          ? "rgba(153, 102, 255, 1)" // Purple
          : "rgba(255, 206, 86, 1)", // Yellow
        borderWidth: 1,
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: darkMode ? "#e0e0e0" : "#333333",
          font: {
            size: window.innerWidth < 768 ? 8 : 14, // Responsive font size
            weight: "600",
          },
        },
      },
      tooltip: {
        backgroundColor: darkMode ? "#333333" : "#ffffff",
        titleColor: darkMode ? "#ffffff" : "#000000",
        bodyColor: darkMode ? "#ffffff" : "#000000",
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}%`,
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          color: darkMode ? "#666666" : "#cccccc",
          lineWidth: 1,
        },
        grid: {
          color: darkMode ? "#444444" : "#cccccc",
          lineWidth: 1,
        },
        ticks: {
          color: darkMode ? "#e0e0e0" : "#333333",
          backdropColor: darkMode ? "#444444" : "#ffffff",
          backdropPadding: 4,
          font: {
            size: window.innerWidth < 768 ? 4 : 12, // Smaller ticks on mobile
          },
        },
      },
    },
  };

  const donutData = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        label: "Resource Status",
        data: [55, 25, 20],
        backgroundColor: [
          darkMode ? "rgba(75, 192, 192, 0.6)" : "rgba(75, 192, 192, 0.6)",
          darkMode ? "rgba(255, 159, 64, 0.6)" : "rgba(255, 159, 64, 0.6)",
          darkMode ? "rgba(255, 99, 132, 0.6)" : "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          darkMode ? "rgba(75, 192, 192, 1)" : "rgba(75, 192, 192, 1)",
          darkMode ? "rgba(255, 159, 64, 1)" : "rgba(255, 159, 64, 1)",
          darkMode ? "rgba(255, 99, 132, 1)" : "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const donutOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top", // Position the legend at the top
        align: "center", // Center-align the legend
        labels: {
          boxWidth: 20, // Width of the color box in the legend
          padding: 15, // Padding between legend items
          font: {
            size: 10, // Font size of the legend text
            weight: "bold", // Font weight of the legend text
          },
          color: darkMode ? "#e0e0e0" : "#333333", // Text color based on dark mode

          usePointStyle: true,
        },

        fullSize: true, // Ensure full width for the legend
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}%`,
        },
      },
    },
  };

  const pieData = {
    labels: ["Frontend", "Backend", "Fullstack", "Design", "Testing"],
    datasets: [
      {
        label: "Team Roles",
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          darkMode ? "rgba(54, 162, 235, 0.6)" : "rgba(54, 162, 235, 0.6)",
          darkMode ? "rgba(255, 99, 132, 0.6)" : "rgba(255, 99, 132, 0.6)",
          darkMode ? "rgba(255, 206, 86, 0.6)" : "rgba(255, 206, 86, 0.6)",
          darkMode ? "rgba(75, 192, 192, 0.6)" : "rgba(75, 192, 192, 0.6)",
          darkMode ? "rgba(153, 102, 255, 0.6)" : "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          darkMode ? "rgba(54, 162, 235, 1)" : "rgba(54, 162, 235, 1)",
          darkMode ? "rgba(255, 99, 132, 1)" : "rgba(255, 99, 132, 1)",
          darkMode ? "rgba(255, 206, 86, 1)" : "rgba(255, 206, 86, 1)",
          darkMode ? "rgba(75, 192, 192, 1)" : "rgba(75, 192, 192, 1)",
          darkMode ? "rgba(153, 102, 255, 1)" : "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart resizes with its container
    plugins: {
      legend: {
        display: true,
        position: "top", // Legend at the top
        align: "center", // Center-aligns the legend
        labels: {
          color: darkMode ? "#e0e0e0" : "#333333", // Adjusted color for better contrast
          font: {
            size: 10, // Slightly larger font for better readability
            // weight: '600', // Semi-bold for emphasis
          },
          boxWidth: 20, // Larger box width for better visibility
          padding: 15, // Increased padding for clarity
          usePointStyle: true, // Uses point style for cleaner look
        },
        fullSize: true, // Full width for the legend
      },
      tooltip: {
        backgroundColor: darkMode ? "#1a1a1a" : "#ffffff", // Darker background for better contrast
        titleColor: darkMode ? "#ffffff" : "#000000", // Title color in tooltip
        bodyColor: darkMode ? "#ffffff" : "#000000", // Body text color in tooltip
        borderColor: darkMode ? "#444444" : "#dddddd", // Subtle border color
        borderWidth: 1, // Thin border for a sleek appearance
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}%`, // Formatting tooltip labels
        },
        padding: 12, // Padding inside the tooltip for better spacing
        cornerRadius: 6, // Rounded corners for a modern look
        displayColors: false, // Hides the color box in the tooltip
        titleFont: {
          size: 16, // Larger font size for title
          weight: "700", // Bold font weight for the title
        },
        bodyFont: {
          size: 10, // Larger font size for body text
          weight: "700", // Regular weight for body text
        },
      },
    },

    elements: {
      arc: {
        borderWidth: 3, // Adds border width to arcs for better separation
      },
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
            {/* <motion.h1
              className={`text-4xl font-bold ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}
              variants={itemVariants}
            >
              Resource Allocation Dashboard
            </motion.h1> */}
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
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                }`}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                }}
                whileTap={{ scale: 0.98 }}
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
                  {/* <div className="flex justify-end mt-6">
                    <motion.button
                      className="px-6 py-2 font-semibold text-white transition-all duration-200 rounded-lg shadow-lg bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-400 focus:outline-none"
                      whileHover={{ translateY: -3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Download Report
                    </motion.button>
                  </div> */}
                </div>
              </motion.div>

              {/* Donut Chart */}
              <motion.div
                className={`relative p-4   md:p-8 rounded-xl border border-gray-200 transition-all duration-300 ease-out ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                }`}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.h2
                  className="text-2xl font-semibold"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  Resource Status
                </motion.h2>
                <div className="flex items-center justify-center h-72">
                  <Doughnut data={donutData} options={donutOptions} />
                </div>
              </motion.div>
              <motion.div
                className={`p-7 rounded-xl border border-gray-200 transition-all duration-300 ease-out ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                }`}
                style={{
                  height: window.innerWidth < 768 ? "400px" : "400px", // Increase height based on screen size
                  maxWidth: "100%", // Responsive width
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <h2 className="text-2xl font-semibold ">Project Allocation</h2>
                <div className="flex items-center justify-center w-full h-full">
                  <div className="w-full h-full">
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
                whileTap={{ scale: 0.98 }}
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
                  className="h-64 overflow-hidden md:h-72 rounded-xl"
                  variants={chartVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 120, damping: 15 }}
                >
                  <Bar
                    className="items-center justify-center"
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

              {/* Radar Chart */}
              <motion.div
                className={`relative p-6 rounded-xl border border-gray-200 transition-all duration-300 ease-out ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                }`}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <h2
                  className="text-2xl font-semibold "
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  Skill Distribution
                </h2>
                <div className="flex items-center justify-center w-full h-full">
                  <div
                    className="w-full h-full"
                    style={{
                      maxHeight: "400px", // Set a maximum height here for larger screens
                      height: window.innerWidth < 768 ? "200px" : "300px", // Responsive height control
                    }}
                  >
                    <Radar data={radarData} options={radarOptions} />
                  </div>
                </div>
              </motion.div>

              {/* Pie Chart */}
              <motion.div
                className={`relative p-8 rounded-xl border border-gray-200 transition-all duration-300 ease-out ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                }`}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <h2
                  className="text-2xl font-semibold "
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  Team Roles
                </h2>
                <div className="flex items-center justify-center h-72">
                  <Pie data={pieData} options={pieOptions} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ResourceAllocation;
