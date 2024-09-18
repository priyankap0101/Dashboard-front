import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Modal from "./Modal";

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
import { Table } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Timeline } from "react-twitter-widgets";
import { FaThumbsUp } from "react-icons/fa";

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

const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png", // Example icon URL
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Anchor point of the icon
  popupAnchor: [1, -34], // Anchor point of the popup
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png", // Example shadow URL
  shadowSize: [41, 41], // Size of the shadow
});

const Ecommerce = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    product: "",
    category: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData([
        {
          product: "Smartphone",
          category: "Electronics",
          price: "$699",
          stock: 50,
        },
        {
          product: "Laptop",
          category: "Electronics",
          price: "$999",
          stock: 30,
        },
        {
          product: "Headphones",
          category: "Accessories",
          price: "$199",
          stock: 100,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (Object.values(newProduct).some((value) => !value)) {
      toast.error("Please fill out all fields");
      return;
    }
    setData([...data, newProduct]);
    toast.success("Product added successfully");
    setNewProduct({
      product: "",
      category: "",
      price: "",
      stock: "",
    });
    toggleModal();
  };

  const csvData = data.map((item) => ({
    product: item.product,
    category: item.category,
    price: item.price,
    stock: item.stock,
  }));

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Existing charts
  const salesData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales ($)",
        data: [1500, 2000, 2500, 3000, 3500, 4000, 4500],
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const salesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Sales: $${context.raw}`,
        },
      },
    },
  };

  const categoryData = {
    labels: ["Electronics", "Accessories", "Home & Kitchen", "Books"],
    datasets: [
      {
        label: "Product Categories",
        data: [60, 25, 10, 5],
        backgroundColor: [
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 99, 132, 0.4)",
          "rgba(255, 206, 86, 0.4)",
          "rgba(75, 192, 192, 0.4)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const categoryOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Category: ${context.raw}%`,
        },
      },
    },
  };

  const stockData = {
    labels: ["Smartphone", "Laptop", "Headphones"],
    datasets: [
      {
        label: "Stock Levels",
        data: [50, 30, 100],
        backgroundColor: [
          "rgba(255, 159, 64, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(255, 99, 132, 0.4)",
        ],
        borderColor: [
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const stockOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Stock: ${context.raw}`,
        },
      },
    },
  };

  const feedbackData = {
    labels: [
      "Customer Service",
      "Product Quality",
      "Value for Money",
      "Delivery Speed",
    ],
    datasets: [
      {
        label: "Customer Feedback",
        data: [85, 90, 75, 80],
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };

  const feedbackOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Feedback: ${context.raw}%`,
        },
      },
    },
  };

  // New charts
  const salesByCategoryData = {
    labels: ["Electronics", "Accessories", "Home & Kitchen", "Books"],
    datasets: [
      {
        label: "Sales by Category",
        data: [7000, 2000, 1500, 500],
        backgroundColor: "rgba(153, 102, 255, 0.4)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
      },
    ],
  };

  const salesByCategoryOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Sales: $${context.raw}`,
        },
      },
    },
  };

  const revenueGrowthData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Revenue Growth ($)",
        data: [4000, 5000, 6000, 7000],
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };

  const revenueGrowthOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Revenue: $${context.raw}`,
        },
      },
    },
  };

  const funnelData = [
    { name: "Stage 1", value: 100 },
    { name: "Stage 2", value: 80 },
    { name: "Stage 3", value: 60 },
    { name: "Stage 4", value: 40 },
    { name: "Stage 5", value: 20 },
  ];

  return (
    <motion.div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
      } transition-colors duration-300 ease-in-out`}
      initial="hidden"
      animate="visible"
    >
      <Header
        toggleSidebar={() => {}}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <div className="flex">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <motion.main
          className={`p-8 ${darkMode ? "text-gray-200" : "text-gray-900"}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div
            className="container mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {loading ? (
              <div className="flex items-center justify-center h-screen">
                <ClipLoader color={darkMode ? "#fff" : "#000"} />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                <motion.div
                  className={`flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform ${
                    darkMode
                      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 hover:from-gray-800 hover:via-gray-700 hover:to-gray-600"
                      : "bg-gradient-to-br from-white via-gray-100 to-gray-50 hover:from-gray-200 hover:via-gray-100 hover:to-white"
                  }`}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "100%", // Full width to adapt to screen sizes
                    // maxWidth: "90%", // Uncomment this line if you need a responsive maximum width
                  }}
                >
                  {/* Image */}
                  <div className="flex justify-center mb-4">
                    <img
                      src="https://img.freepik.com/free-photo/view-3d-man-holding-coffee-cup-showing-thumbs-up_23-2150709926.jpg?t=st=1725036525~exp=1725040125~hmac=aa76cfb4e7ddf29b404545e6527b3b9e6e8f73f06593160a63fdaac6c2805740&w=740"
                      alt="Boy Showing Thumbs Up"
                      className="rounded-full shadow-md"
                      style={{ width: "60px", height: "60px" }} // Adjusted for better scaling
                    />
                  </div>

                  {/* Text Content */}
                  <div className="px-4 mb-4 text-center">
                    <h2
                      className={`text-lg sm:text-xl md:text-2xl font-extrabold mb-2 ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Congratulations, John! 🎉
                    </h2>
                    <p
                      className={`text-xs sm:text-sm md:text-base ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      } mb-1`}
                    >
                      Best seller of the month!
                    </p>
                    <p
                      className={`text-base sm:text-lg md:text-xl font-semibold mt-1 ${
                        darkMode ? "text-yellow-400" : "text-yellow-500"
                      }`}
                    >
                      $24,000
                    </p>
                  </div>

                  {/* Button */}
                  <motion.button
                    className={`mt-4 py-2 px-6 rounded-full font-medium transition-transform duration-300 ease-in-out ${
                      darkMode
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-indigo-600 hover:to-purple-600"
                        : "bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-green-500 hover:to-blue-500"
                    } shadow-md hover:shadow-lg`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95, y: 0 }}
                    onClick={() => alert("Button Clicked!")}
                  >
                    View Details
                  </motion.button>
                </motion.div>

                {/* Monthly Statistics Card */}
                <div
                  className={`flex flex-col p-4 rounded-xl shadow-lg transition-transform duration-300 ease-in-out ${
                    darkMode
                      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 hover:from-gray-800 hover:via-gray-700 hover:to-gray-600"
                      : "bg-gradient-to-br from-white via-gray-100 to-gray-50 hover:from-gray-50 hover:via-gray-100 hover:to-white"
                  }`}
                  style={{
                    gridColumn: "span 2",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="flex flex-col items-center w-full">
                    <h2 className="mb-4 text-lg font-semibold text-center">
                      Monthly Statistics
                    </h2>
                    <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                      {/* Stat Item 1: Sales */}
                      <div className="flex flex-col items-center p-3 transition-transform duration-300 ease-in-out rounded-lg shadow-md hover:shadow-2xl hover:bg-opacity-80">
                        <div
                          className={`w-12 h-12 flex items-center justify-center rounded-full ${
                            darkMode ? "bg-blue-600" : "bg-blue-500"
                          } text-white mb-2`}
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p className="mb-1 text-xs font-medium text-center">
                          Sales
                        </p>
                        <p className="text-lg font-semibold text-center">
                          $24,000
                        </p>
                      </div>
                      {/* Stat Item 2: New Orders */}
                      <div className="flex flex-col items-center p-3 transition-transform duration-300 ease-in-out rounded-lg shadow-md hover:shadow-2xl hover:bg-opacity-80">
                        <div
                          className={`w-12 h-12 flex items-center justify-center rounded-full ${
                            darkMode ? "bg-green-600" : "bg-green-500"
                          } text-white mb-2`}
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 10l5 5 5-5H7z"
                            />
                          </svg>
                        </div>
                        <p className="mb-1 text-xs font-medium text-center">
                          New Orders
                        </p>
                        <p className="text-lg font-semibold text-center">150</p>
                      </div>
                      {/* Stat Item 3: Returns */}
                      <div className="flex flex-col items-center p-3 transition-transform duration-300 ease-in-out rounded-lg shadow-md hover:shadow-2xl hover:bg-opacity-80">
                        <div
                          className={`w-12 h-12 flex items-center justify-center rounded-full ${
                            darkMode ? "bg-red-600" : "bg-red-500"
                          } text-white mb-2`}
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 13l3 3 3-3m-3 3V4"
                            />
                          </svg>
                        </div>
                        <p className="mb-1 text-xs font-medium text-center">
                          Returns
                        </p>
                        <p className="text-lg font-semibold text-center">30</p>
                      </div>
                      {/* Stat Item 4: Customers */}
                      <div className="flex flex-col items-center p-3 transition-transform duration-300 ease-in-out rounded-lg shadow-md hover:shadow-2xl hover:bg-opacity-80">
                        <div
                          className={`w-12 h-12 flex items-center justify-center rounded-full ${
                            darkMode ? "bg-teal-600" : "bg-teal-500"
                          } text-white mb-2`}
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 2H6a2 2 0 00-2 2v12a2 2 0 002 2h8M8 4v16M4 6l4-2m0 0l4 2"
                            />
                          </svg>
                        </div>
                        <p className="mb-1 text-xs font-medium text-center">
                          Customers
                        </p>
                        <p className="text-lg font-semibold text-center">
                          1,200
                        </p>
                      </div>
                      {/* Stat Item 5: Revenue */}
                      <div className="flex flex-col items-center p-3 transition-transform duration-300 ease-in-out rounded-lg shadow-md hover:shadow-2xl hover:bg-opacity-80">
                        <div
                          className={`w-12 h-12 flex items-center justify-center rounded-full ${
                            darkMode ? "bg-purple-600" : "bg-purple-500"
                          } text-white mb-2`}
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 12l5 5L20 7"
                            />
                          </svg>
                        </div>
                        <p className="mb-1 text-xs font-medium text-center">
                          Revenue
                        </p>
                        <p className="text-lg font-semibold text-center">
                          $45,000
                        </p>
                      </div>
                      {/* Stat Item 6: Products */}
                      <div className="flex flex-col items-center p-3 transition-transform duration-300 ease-in-out rounded-lg shadow-md hover:shadow-2xl hover:bg-opacity-80">
                        <div
                          className={`w-12 h-12 flex items-center justify-center rounded-full ${
                            darkMode ? "bg-orange-600" : "bg-orange-500"
                          } text-white mb-2`}
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 6h16v12H4z"
                            />
                          </svg>
                        </div>
                        <p className="mb-1 text-xs font-medium text-center">
                          Products
                        </p>
                        <p className="text-lg font-semibold text-center">300</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data-driven cards */}
                {data.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`p-6 border rounded-lg shadow-md transition-all duration-300 ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    }`}
                    whileHover={{
                      scale: 1.04,
                      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h2
                      className={`text-xl font-semibold ${
                        darkMode ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      {item.product}
                    </h2>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Category: {item.category}
                    </p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Price: {item.price}
                    </p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Stock: {item.stock}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div className="col-span-2 p-4 border rounded-lg shadow-lg lg:col-span-1">
                <h2 className="mb-4 text-lg font-semibold">Sales Overview</h2>
                <Line data={salesData} options={salesOptions} />
              </div>

              <div className="col-span-2 p-4 border rounded-lg shadow-lg lg:col-span-1">
                <h2 className="mb-4 text-lg font-semibold">
                  Customer Feedback
                </h2>
                <Radar data={feedbackData} options={feedbackOptions} />
              </div>

              <div className="col-span-2 p-4 border rounded-lg shadow-lg lg:col-span-1">
                <h2 className="mb-4 text-lg font-semibold">
                  Product Categories
                </h2>
                <Pie data={categoryData} options={categoryOptions} />
              </div>

              <div className="col-span-2 p-6 border border-gray-200 rounded-lg shadow-lg lg:col-span-2 xl:col-span-3">
                <h2 className="mb-6 text-2xl font-semibold">
                  Product Data Table
                </h2>

                {loading ? (
                  <div className="flex items-center justify-center h-48">
                    <div className="w-10 h-10 border-4 border-blue-500 rounded-full loader"></div>
                  </div>
                ) : data.length === 0 ? (
                  <div className="flex items-center justify-center h-48 rounded-lg">
                    <p className="text-lg">No data available</p>
                  </div>
                ) : (
                  <div className="relative overflow-x-auto rounded-lg shadow-md">
                    <table className="w-full divide-y divide-gray-200 table-auto dark:divide-gray-700">
                      <thead className="text-gray-900 bg-gradient-to-r from-blue-300 to-blue-200">
                        <tr>
                          <th className="px-6 py-3 text-sm font-semibold text-left uppercase">
                            Product
                          </th>
                          <th className="px-6 py-3 text-sm font-semibold text-left uppercase">
                            Category
                          </th>
                          <th className="px-6 py-3 text-sm font-semibold text-left uppercase">
                            Price
                          </th>
                          <th className="px-6 py-3 text-sm font-semibold text-left uppercase">
                            Stock
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {data.map((item, index) => {
                          const price = parseFloat(item.price);
                          const formattedPrice = isNaN(price)
                            ? "N/A"
                            : `$${price.toFixed(2)}`;

                          return (
                            <tr
                              key={index}
                              className="transition-all duration-300 transform dark:hover:bg-gray-700 focus-within:ring-2 focus-within:ring-blue-500 hover:scale-105"
                              role="row"
                              aria-labelledby={`row-${index}`}
                              tabIndex={0}
                            >
                              <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                {item.product}
                              </td>
                              <td className="px-6 py-4 text-sm whitespace-nowrap">
                                {item.category}
                              </td>
                              <td className="px-6 py-4 text-sm whitespace-nowrap">
                                {formattedPrice}
                              </td>
                              <td className="px-6 py-4 text-sm whitespace-nowrap">
                                {item.stock > 0 ? (
                                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-800 dark:text-green-100">
                                    In Stock
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full dark:bg-red-800 dark:text-red-100">
                                    Out of Stock
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    {/* Consistent Pagination Controls */}
                    <div className="flex items-center justify-between p-4 dark:bg-gray-700">
                      <button className="px-4 py-2 text-sm font-medium text-gray-600 border rounded-lg shadow-sm dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Previous
                      </button>
                      <span className="text-sm text-gray-600">Page 1 of 1</span>
                      <button className="px-4 py-2 text-sm font-medium text-gray-600 border rounded-lg shadow-sm dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-span-2 p-6 transition-all duration-300 transform border border-gray-200 rounded-lg shadow-lg h-84 dark:border-gray-700 lg:col-span-1 hover:scale-105 hover:shadow-2xl ">
                <h2 className="flex items-center mb-4 text-xl font-bold ">
                  <i className="mr-2 text-indigo-500 fas fa-calendar-alt"></i>{" "}
                  Event Timeline
                </h2>
                {/* Custom Event Timeline */}
                <div className="relative pl-4 ml-4 border-l-4 border-indigo-500 dark:border-indigo-400">
                  <div className="mb-8 group">
                    <div className="absolute w-5 h-5 bg-indigo-500 rounded-full mt-1.5 -left-3 border-2 border-white dark:border-gray-800 transition-transform transform group-hover:scale-110"></div>
                    <p className="text-sm font-semibold transition-colors">
                      March 12, 2024
                    </p>
                    <p className="text-base leading-snug transition-colors">
                      <i className="mr-2 fas fa-briefcase"></i> Company Annual
                      Meeting: A comprehensive overview of the past year's
                      achievements and the roadmap for the next year was
                      discussed.
                    </p>
                  </div>
                  <div className="mb-8 group">
                    <div className="absolute w-5 h-5 bg-indigo-500 rounded-full mt-1.5 -left-3 border-2 border-white dark:border-gray-800  transition-transform transform group-hover:scale-110"></div>
                    <p className="text-sm font-semibold transition-colors">
                      April 5, 2024
                    </p>
                    <p className="text-base leading-snug transition-colors">
                      <i className="mr-2 text-indigo-500 fas fa-rocket"></i>{" "}
                      Product Launch: The new product line was launched,
                      featuring innovative designs and cutting-edge technology.
                    </p>
                  </div>
                  {/* Add more timeline events as needed */}
                </div>
              </div>

              <div className="col-span-2 p-4 border rounded-lg shadow-lg lg:col-span-1">
                <h2 className="mb-4 text-lg font-semibold">Stock Levels</h2>
                <Doughnut data={stockData} options={stockOptions} />
              </div>

              <div className="col-span-2 p-6 transition-transform transform border rounded-lg h-h-75 lg:col-span-1 hover:scale-105 hover:border-blue-500">
                <h2 className="flex items-center mb-6 text-2xl font-semibold">
                  <i className="mr-3 text-blue-500 fas fa-chart-line dark:text-blue-300"></i>{" "}
                  Sales Progress
                </h2>

                <div className="space-y-6 ">
                  <div className="relative group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold ">Achieved</span>
                      <span className="text-sm font-semibold text-green-600">
                        60%
                      </span>
                    </div>
                    <div className="relative w-full h-2 overflow-hidden rounded">
                      <div
                        style={{ width: "60%" }}
                        className="h-2 transition-all duration-500 ease-in-out rounded bg-gradient-to-r from-green-400 to-green-600 group-hover:shadow-md"
                      >
                        <span className="absolute inset-y-0 right-0 pr-2 text-xs font-bold transition-all duration-300 transform translate-x-1/2 group-hover:translate-x-0">
                          {/* 60% */}
                        </span>
                      </div>
                    </div>
                    {/* Tooltip on Hover */}
                    <div className="absolute px-2 py-1 ml-32 -mt-12 text-xs font-medium text-white transition-all transition-opacity duration-300 duration-500 ease-in-out transform -translate-x-1/2 bg-gray-900 rounded-md shadow-lg opacity-0 group-hover:opacity-100 dark:bg-gray-100 dark:text-gray-900 group-hover:translate-y-2">
                      Reached 60% of the target
                    </div>
                  </div>

                  {/* In Progress Progress Bar */}
                  <div className="relative group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold ">
                        In Progress
                      </span>
                      <span className="text-sm font-semibold text-blue-600">
                        30%
                      </span>
                    </div>
                    <div className="relative w-full h-2 overflow-hidden rounded">
                      <div
                        style={{ width: "30%" }}
                        className="h-2 transition-all duration-500 ease-in-out rounded bg-gradient-to-r from-blue-400 to-blue-600 group-hover:shadow-md"
                      >
                        <span className="absolute inset-y-0 right-0 pr-2 text-xs font-bold transition-all duration-300 transform translate-x-1/2 group-hover:translate-x-0">
                          {/* 30% */}
                        </span>
                      </div>
                    </div>
                    {/* Tooltip on Hover */}
                    <div className="absolute px-2 py-1 ml-32 -mt-12 text-xs font-medium text-white transition-all transition-opacity duration-300 duration-500 ease-in-out transform -translate-x-1/2 bg-gray-900 rounded-md shadow-lg opacity-0 group-hover:opacity-100 dark:bg-gray-100 dark:text-gray-900 group-hover:translate-y-2">
                      Currently at 30% progress
                    </div>
                  </div>

                  {/* Pending Progress Bar */}
                  <div className="relative group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold ">Pending</span>
                      <span className="text-sm font-semibold text-red-600">
                        10%
                      </span>
                    </div>
                    <div className="relative w-full h-2 overflow-hidden rounded">
                      <div
                        style={{ width: "10%" }}
                        className="h-2 transition-all duration-500 ease-in-out rounded bg-gradient-to-r from-red-400 to-red-600 group-hover:shadow-md"
                      >
                        <span className="absolute inset-y-0 right-0 pr-2 text-xs font-bold transition-all duration-300 transform translate-x-1/2 group-hover:translate-x-0">
                          {/* 10% */}
                        </span>
                      </div>
                    </div>
                    {/* Tooltip on Hover */}
                    <div className="absolute px-2 py-1 ml-32 -mt-12 text-xs font-medium text-white transition-all transition-opacity duration-300 duration-500 ease-in-out transform -translate-x-1/2 bg-gray-900 rounded-md shadow-lg opacity-0 group-hover:opacity-100 dark:bg-gray-100 dark:text-gray-900 group-hover:translate-y-2">
                      Only 10% completed
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-2 p-6 transition-transform duration-300 transform border border-gray-200 rounded-lg shadow-lg h-75 dark:border-gray-700 hover:scale-105 hover:shadow-2xl lg:col-span-1">
                {/* Title Section */}
                <h2 className="mb-4 text-xl font-semibold text-center ">
                  Visit US
                </h2>

                {/* Map Container */}
                <div className="relative overflow-hidden border border-gray-300 rounded-lg h-52 dark:border-gray-600">
                  <MapContainer
                    center={[19.076, 72.8777]} // Coordinates for Mumbai
                    zoom={13} // Zoom level for a closer view of Mumbai
                    style={{ height: "500px", width: "100%" }}
                    className="rounded-lg"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[19.076, 72.8777]} icon={customIcon}>
                      <Popup>
                        <strong>Mumbai</strong>
                        <br />
                        {/* This is a marker centered on Mumbai. */}
                      </Popup>
                    </Marker>
                  </MapContainer>

                  {/* Footer with map data attribution */}
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    Map data &copy;{" "}
                    <a
                      href="https://www.openstreetmap.org/copyright"
                      className="text-indigo-500 hover:underline"
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.main>
      </div>
      <ToastContainer />
    </motion.div>
  );
};

export default Ecommerce;
