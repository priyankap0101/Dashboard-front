import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
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
    labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    datasets: [
      {
        label: "Earnings",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [45, 50, 40, 60, 80, 90, 70],
      },
    ],
  };

  const supportData = {
    labels: ["Completed Task"],
    datasets: [
      {
        data: [85, 15],
        backgroundColor: ["#42A5F5", "#ddd"],
      },
    ],
  };

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
        <Sidebar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

        <motion.main
          className={`flex-1 p-6 ${darkMode ? "text-gray-200" : "text-gray-900"}`}
          variants={containerVariants}
          animate="visible"
        >
          <div className="container mx-auto">
            {loading ? (
              <div className="flex items-center justify-center h-screen">
                <ClipLoader color={darkMode ? "#fff" : "#000"} />
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                {/* Earning Reports */}
                <div className="p-4 bg-white rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold">Earning Reports</h3>
                  <div className="flex items-center justify-between mt-4">
                    <h2 className="text-3xl font-bold">$468</h2>
                    <span className="text-sm text-green-500">+4.2%</span>
                  </div>
                  <Bar data={earningData} />
                  <div className="flex justify-between mt-4">
                    <div className="text-sm">
                      <p>Earnings</p>
                      <p className="font-semibold">$545.69</p>
                    </div>
                    <div className="text-sm">
                      <p>Profit</p>
                      <p className="font-semibold">$256.34</p>
                    </div>
                    <div className="text-sm">
                      <p>Expense</p>
                      <p className="font-semibold">$74.19</p>
                    </div>
                  </div>
                </div>

                {/* Support Tracker */}
                <div className="p-4 bg-white rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold">Support Tracker</h3>
                  <p>Total Tickets: 164</p>
                  <p>New Tickets: 142</p>
                  <p>Open Tickets: 28</p>
                  <p>Response Time: 1 Day</p>
                  <Doughnut data={supportData} />
                  <p className="mt-4 font-bold text-center">85% Completed</p>
                </div>

                {/* Sales by Countries */}
                <div className="p-4 bg-white rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold">Sales by Countries</h3>
                  <ul>
                    {salesByCountry.map((item, index) => (
                      <li key={index} className="flex justify-between mt-4">
                        <span>{item.country}</span>
                        <span className="font-semibold">{item.sales}</span>
                        <span
                          className={`flex items-center ${
                            item.trend === "up" ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {item.trend === "up" ? <FaArrowUp /> : <FaArrowDown />}
                          {item.percent}%
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Total Earning */}
                <div className="p-4 bg-white rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold">Total Earning</h3>
                  <div className="flex items-center justify-between mt-4">
                    <h2 className="text-3xl font-bold">87%</h2>
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

                {/* Monthly Campaign */}
                <div className="p-4 bg-white rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold">Monthly Campaign</h3>
                  <ul>
                    {monthlyCampaignData.map((item, index) => (
                      <li key={index} className="flex justify-between mt-4">
                        <span>{item.label}</span>
                        <span className="font-semibold">{item.value}</span>
                        <span className={`text-${item.percent >= 0 ? 'green' : 'red'}-500`}>
                          {item.percent}%
                        </span>
                      </li>
                    ))}
                  </ul>
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
