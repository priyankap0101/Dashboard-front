/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import { Line, Pie, Radar, Bar, Doughnut } from "react-chartjs-2";
import AnimatedIcon from "./AnimatedIcon";

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

const buttonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "#4B4B9D",
    color: "#fff",
    transition: { duration: 0.3 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

const CRM = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData([
        {
          client: "Tech Innovators Inc.",
          project: "AI-Driven Chatbot",
          status: "Completed",
        },
        {
          client: "EcoGreen Solutions",
          project: "Sustainable Energy Web App",
          status: "In Progress",
        },
        {
          client: "HealthFirst Clinic",
          project: "Patient Management System",
          status: "Pending",
        },
      ]);
      setRecentActivities([
        {
          activity: "Added new project for EcoGreen Solutions",
          time: "2024-08-28 14:00",
        },
        {
          activity: "Completed the report for HealthFirst Clinic",
          time: "2024-08-27 11:30",
        },
        {
          activity: "Updated project status for Tech Innovators Inc.",
          time: "2024-08-26 09:45",
        },
      ]);
      setLoading(false);
    }, 1000);
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

  const csvData = data.map((item) => ({
    client: item.client,
    project: item.project,
    status: item.status,
  }));

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const clientData = {
    labels: [
      "Tech Innovators Inc.",
      "EcoGreen Solutions",
      "HealthFirst Clinic",
      "Bright Future Ltd.",
    ],
    datasets: [
      {
        label: "Clients",
        data: [20, 35, 25, 15],
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const clientOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Clients: ${context.raw}`,
        },
      },
    },
  };

  const projectData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Projects",
        data: [2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 2, 3],
        backgroundColor: "rgba(54, 162, 235, 0.4)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const projectOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Projects: ${context.raw}`,
        },
      },
    },
  };

  const statusData = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        label: "Project Status",
        data: [15, 10, 5],
        backgroundColor: [
          "rgba(75, 192, 192, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(255, 99, 132, 0.4)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const statusOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Status: ${context.raw}`,
        },
      },
    },
  };

  const radarData = {
    labels: [
      "Communication",
      "Technical Skills",
      "Project Management",
      "Client Handling",
      "Problem Solving",
    ],
    datasets: [
      {
        label: "Skill Levels (%)",
        data: [90, 80, 70, 85, 75],
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Skill Level: ${context.raw}%`,
        },
      },
    },
  };

  const doughnutData = {
    labels: ["Direct", "Referral", "Social Media", "Email", "Other"],
    datasets: [
      {
        label: "Traffic Sources",
        data: [500, 120, 150, 80, 90],
        backgroundColor: [
          "rgba(255, 206, 86, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(255, 99, 132, 0.4)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Traffic: ${context.raw}`,
        },
      },
    },
  };

  return (
    <motion.div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
      } transition-colors duration-300 ease-in-out`}
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
        <Sidebar darkMode={darkMode} />
        <motion.main
          className="flex-grow p-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-6"
          >
            {/* <h1
              className={`text-4xl font-extrabold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              CRM Dashboard
            </h1> */}
            {/* <div className="mb-4">
              <CSVLink
                data={csvData}
                filename="client_data.csv"
                className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
              >
                Export Data
              </CSVLink>
              <motion.button
                className="px-4 py-2 ml-4 text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={toggleModal}
              >
                Show Modal
              </motion.button>
            </div> */}
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <ClipLoader color={darkMode ? "#fff" : "#000"} />
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 border rounded-lg shadow-lg">
                  <h2 className="mb-4 text-2xl font-semibold">Client Data</h2>
                  <Line data={clientData} options={clientOptions} />
                </div>

                <div className="p-4 border rounded-lg shadow-lg">
                  <h2 className="mb-4 text-2xl font-semibold">Project Data</h2>
                  <Bar data={projectData} options={projectOptions} />
                </div>

                <div className="p-4 border rounded-lg shadow-lg">
                  <h2 className="mb-4 text-2xl font-semibold">Status Data</h2>
                  <Doughnut data={statusData} options={statusOptions} />
                </div>

                <div className="p-4 border rounded-lg shadow-lg">
                  <h2 className="mb-4 text-xl font-semibold">Skill Radar</h2>
                  <Radar data={radarData} options={radarOptions} />
                </div>

                <div className="p-4 border rounded-lg shadow-lg">
                  <h2 className="mb-4 text-2xl font-semibold">
                    Traffic Sources
                  </h2>
                  <Pie data={doughnutData} options={doughnutOptions} />
                </div>

                <div className="col-span-1 p-4 transition-all duration-300 ease-in-out border border-gray-200 rounded-lg shadow-md dark:border-gray-700 md:col-span-2 lg:col-span-1">
                  <h2 className="mb-4 text-2xl font-semibold">
                    Recent Activities
                  </h2>
                  {recentActivities.length > 0 ? (
                    <ul className="space-y-3">
                      {recentActivities.map((activity, index) => (
                        <li
                          key={index}
                          className="relative flex items-start p-3 transition-shadow duration-300 ease-in-out border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 hover:shadow-md"
                        >
                          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-3 rounded-full shadow-sm bg-gradient-to-r from-blue-400 to-indigo-500 dark:from-blue-600 dark:to-indigo-700">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium ">
                              {activity.activity}
                            </p>
                            <p className="text-xs  mt-0.5">
                              {activity.time}
                            </p>
                          </div>
                          <div className="absolute inset-0 transition-opacity duration-300 ease-in-out rounded-lg bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent opacity-20 group-hover:opacity-10"></div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      No recent activities.
                    </p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.main>
      </div>
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <h2 className="text-xl font-semibold">Modal Title</h2>
          <p>Here is some content for the modal.</p>
        </Modal>
      )}
      <ToastContainer />
    </motion.div>
  );
};

export default CRM;
