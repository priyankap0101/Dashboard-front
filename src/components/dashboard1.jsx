import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { FaTicketAlt, FaCheckCircle, FaClock } from "react-icons/fa"; // Example icons
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CSVLink } from "react-csv";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import { Line, Pie, Radar, Bar, Doughnut } from "react-chartjs-2";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 100,
    },
  },
};

const Dashboard1 = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true); // Add loading state
  const [darkMode, setDarkMode] = useState(false); // Add dark mode state

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const earningData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Weekly Earnings ($)",
        backgroundColor: "rgba(75, 192, 192, 0.4)", // Solid background
        borderColor: "rgba(75, 192, 192, 1)", // Solid border
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.6)", // Lighter on hover
        hoverBorderColor: "rgba(75, 192, 192, 1)",
        data: [45, 50, 40, 60, 80, 90, 70],
        fill: true, // Fill the area under the line
      },
      {
        label: "Weekly Expenses ($)", // Second dataset for comparison
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.6)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        data: [30, 20, 25, 35, 45, 50, 40],
        fill: true,
      },
    ],
  };

  // Chart options for better customization
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount ($)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Days of the Week",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.raw || 0;
            return `${label}: $${value.toFixed(2)}`; // Display values as currency
          },
        },
      },
    },
  };

  const gradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "#4c83ff");
    gradient.addColorStop(1, "#00d4ff");
    return gradient;
  };

  const chartRef = useRef(null);

  const supportData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [85, 15],
        backgroundColor: ["#4c83ff", "#ff4d4d"], // Define your colors here
      },
    ],
  };

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    // Set canvas background color
    const ctx = chart.ctx;
    ctx.fillStyle = darkMode ? "#1a1a1a" : "#ffffff"; // Set the background color based on dark mode
    ctx.fillRect(0, 0, chart.width, chart.height);
  }, [darkMode]);

  const salesByCountry = [
    { country: "United States", sales: "$8,567k", trend: "up", percent: 25.8 },
    { country: "Brazil", sales: "$2,415k", trend: "down", percent: 6.2 },
    { country: "India", sales: "$865k", trend: "up", percent: 12.4 },
    { country: "Australia", sales: "$745k", trend: "down", percent: 11.9 },
    { country: "France", sales: "$45k", trend: "up", percent: 16.2 },
    { country: "China", sales: "$12k", trend: "up", percent: 14.8 },
  ];

  const totalEarningData = {
    labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    datasets: [
      {
        label: "Total Revenue",
        backgroundColor: "#42A5F5",
        data: [20, 40, 60, 80, 100, 120, 140],
      },
    ],
  };

  const monthlyCampaignData = [
    { label: "Emails", value: 12346, percent: 0.3 },
    { label: "Opened", value: 8734, percent: 2.1 },
    { label: "Clicked", value: 967, percent: -1.4 },
    { label: "Subscribe", value: 345, percent: 8.5 },
    { label: "Complaints", value: 10, percent: -1.5 },
    { label: "Unsubscribe", value: 86, percent: 0.8 },
  ];

  useEffect(() => {
    // Simulate loading data
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
      } transition-colors duration-300 ease-in-out`}
      initial="hidden"
      animate="visible"
    >
      <Header
        toggleSidebar={toggleSidebar}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <div className="flex">
        <Sidebar
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
        />

        <motion.main
          className={`flex-1 p-6 ${
            darkMode ? "text-gray-200" : "text-gray-900"
          }`}
          variants={containerVariants}
          animate="visible"
        >
          <div className="container mx-auto">
            {loading ? (
              <div className="flex items-center justify-center h-screen">
                <ClipLoader color={darkMode ? "#fff" : "#000"} />
              </div>
            ) : (
              <div className="container p-4 mx-auto">
                {/* First Row: Three Charts */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* Chart 1: Revenue Overview */}
                  <div
                    className={`p-6 border rounded-lg shadow-lg hover:scale-100 hover:border-blue-500 ${
                      darkMode ? "bg-gray-900" : "bg-white"
                    }`}
                  >
                    <h3
                      className={`mb-6 text-xl font-semibold ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Revenue Overview
                    </h3>
                    <div className="flex items-center justify-between mb-8">
                      <h2
                        className={`text-4xl font-extrabold ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        $743
                      </h2>
                      <span className="px-3 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-full">
                        +7.2%
                      </span>
                    </div>

                    {/* Set a fixed height for the chart */}
                    <div
                      style={{ height: "150px" }}
                      className="overflow-hidden"
                    >
                      <Bar
                        data={earningData}
                        options={{ maintainAspectRatio: false }}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-6 mt-4">
                      <div className="text-center">
                        <p
                          className={`text-sm ${
                            darkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          Earnings
                        </p>
                        <p
                          className={`font-semibold ${
                            darkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          $545.69
                        </p>
                      </div>
                      <div className="text-center">
                        <p
                          className={`text-sm ${
                            darkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          Profit
                        </p>
                        <p
                          className={`font-semibold ${
                            darkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          $256.34
                        </p>
                      </div>
                      <div className="text-center">
                        <p
                          className={`text-sm ${
                            darkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          Expense
                        </p>
                        <p
                          className={`font-semibold ${
                            darkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          $74.19
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Chart 2: Sales by Countries */}
                  <div
                    className={`p-6 border rounded-lg shadow-lg hover:scale-100 hover:border-blue-500 ${
                      darkMode ? "bg-gray-900" : "bg-white"
                    }`}
                  >
                    <h3
                      className={`text-xl font-semibold ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Sales by Countries
                    </h3>
                    <ul>
                      {salesByCountry.map((item, index) => (
                        <li key={index} className="flex justify-between mt-4">
                          <span>{item.country}</span>
                          <span className="font-semibold">{item.sales}</span>
                          <span
                            className={`flex items-center ${
                              item.trend === "up"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {item.trend === "up" ? (
                              <FaArrowUp />
                            ) : (
                              <FaArrowDown />
                            )}
                            {item.percent}%
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Chart 3: Total Earning */}
                  <div
                    className={`p-6 border rounded-lg shadow-lg   lg:col-span-1 hover:scale-100 hover:border-blue-500 ${
                      darkMode ? "bg-gray-900" : "bg-white"
                    }`}
                  >
                    <h3
                      className={`text-xl font-semibold ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Total Earning
                    </h3>
                    <div className="flex items-center justify-between mt-4">
                      <h2
                        className={`text-3xl font-bold ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        87%
                      </h2>
                      <span className="text-sm text-green-500">+25.8%</span>
                    </div>
                    <Bar data={totalEarningData} />
                    <div className="flex justify-between mt-4">
                      <div className="text-sm">
                        <p>Total Revenue</p>
                        <p className="font-semibold">+$126</p>
                      </div>
                      <div className="text-sm">
                        <p>Total Sales</p>
                        <p className="font-semibold">+$98</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Second Row: Two Charts */}
                <div className="   grid grid-cols-1 mt-4 md:grid-cols-[40%,60%] gap-x-2 gap-y-4 ">
                  {/* Chart 4: Monthly Campaign */}
                  <div
                    className={`  p-6 border rounded-lg shadow-lg lg:col-span-1 hover:scale-100 hover:border-blue-500 ${
                      darkMode ? "bg-gray-900" : "bg-white"
                    }`}
                  >
                    <h3
                      className={`text-xl font-semibold ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Monthly Campaign
                    </h3>
                    <ul>
                      {monthlyCampaignData.map((item, index) => (
                        <li key={index} className="flex justify-between mt-4">
                          <span>{item.label}</span>
                          <span className="font-semibold">{item.value}</span>
                          <span
                            className={`text-${
                              item.percent >= 0 ? "green" : "red"
                            }-500`}
                          >
                            {item.percent}%
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Chart 5: Support Tracker */}

                  <div
                    className={` p-6 border rounded-lg shadow-lg lg:col-span-1 hover:scale-100 hover:border-blue-500 ${
                      darkMode ? "bg-gray-900" : "bg-white"
                    }`}
                  >
                    <h2
                      className={`mb-4 text-3xl font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Support Tracker
                    </h2>
                    <div className="flex flex-col justify-between w-full space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                      {/* Tickets Data */}
                      <div className="flex flex-col w-1/2 ml-2 space-y-4">
                        <div>
                          <h3 className='text-5xl font-bold ${darkMode ? "text-white" : "text-gray-800"}'>
                            164
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Total Tickets
                          </p>
                        </div>
                        {[
                          {
                            icon: (
                              <FaTicketAlt className="w-6 h-6 text-violet-500" />
                            ),
                            title: "New Tickets",
                            count: 142,
                          },
                          {
                            icon: (
                              <FaCheckCircle className="w-6 h-6 text-teal-400" />
                            ),
                            title: "Open Tickets",
                            count: 28,
                          },
                          {
                            icon: (
                              <FaClock className="w-6 h-6 text-orange-400" />
                            ),
                            title: "Response Time",
                            count: "1 Day",
                          },
                        ].map((ticket, index) => (
                          <div
                            key={index}
                            className="flex items-center p-4 space-x-3 transition-shadow border border-gray-500 rounded-lg shadow-sm hover:shadow-lg dark:hover:bg-gray-700"
                          >
                            {ticket.icon}
                            <div>
                              <p
                                className='font-semibold     ${
                        darkMode ? "text-white" : "text-gray-800"
                      }'
                              >
                                {ticket.title}
                              </p>
                              <p className='text-sm ${ darkMode ? "text-white" : "text-gray-800"}'>
                                {ticket.count}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Donut Chart */}
                      <div className="relative w-full p-2 transition-all duration-300 ease-in-out md:w-1/2">
                        <Doughnut
                          ref={chartRef}
                          data={{
                            ...supportData,
                            datasets: supportData.datasets.map((dataset) => ({
                              ...dataset,
                              backgroundColor: [
                                "rgba(255, 99, 132, 0.6)",
                                "rgba(54, 162, 235, 0.6)",
                                "rgba(255, 206, 86, 0.6)",
                              ],
                            })),
                          }}
                          options={{
                            cutout: "75%",
                            maintainAspectRatio: false,
                            plugins: {
                              tooltip: { enabled: false },
                            },
                            animation: {
                              animateScale: true,
                              animateRotate: true,
                              duration: 1200,
                              easing: "easeInOutCubic",
                            },
                            layout: {
                              padding: 0,
                            },
                            elements: {
                              arc: {
                                backgroundColor: "rgba(0,0,0,0)",
                              },
                            },
                          }}
                        />

                        {/* Centered content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <p
                            className={`mt-10 mb-1 text-xs font-semibold tracking-widest ${
                              darkMode ? "text-white" : "text-gray-800"
                            } sm:text-sm md:text-base lg:text-lg`} // Responsive text size for "Completed Task"
                          >
                            Completed Task
                          </p>
                          <p
                            className={`text-3xl font-extrabold transition-all duration-200 ease-in-out transform ${
                              darkMode ? "text-white" : "text-gray-800"
                            } sm:text-4xl md:text-4xl lg:text-4xl`} // Responsive text size for percentage
                          >
                            85%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.main>
      </div>
      <ToastContainer />
    </motion.div>
  );
};

export default Dashboard1;
