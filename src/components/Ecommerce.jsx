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
              <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {/* Special card at the start */}
              <motion.div
                className={`flex p-8 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform ${
                  darkMode
                    ? "bg-gray-800 border border-transparent hover:border-blue-500"
                    : "bg-white border border-transparent hover:border-blue-500"
                }`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 30px rgba(0, 0, 0, 0.15)",
                }}
                whileTap={{ scale: 0.97 }}
                style={{ gridColumn: "span 2", width: "100%", height: "auto" }} // Adjusted for better fit
              >
                {/* Content Section */}
                <div className="flex flex-col justify-between flex-1 pr-8">
                  <div>
                    <h2
                      className={`text-3xl font-extrabold mb-4 ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Congratulations John! 🎉
                    </h2>
                    <p
                      className={`text-sm leading-relaxed ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Best seller of the month! This card celebrates John's achievement
                      with a special mention.
                    </p>
                  </div>
            
                  <div className="flex mt-6">
                    <motion.button
                      className={`py-2 px-6 rounded-full font-semibold transition-all duration-300 ease-in-out transform ${
                        darkMode
                          ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white border border-purple-600"
                          : "bg-gradient-to-r from-blue-400 to-green-500 text-white border border-blue-400"
                      } shadow-lg hover:shadow-2xl hover:scale-105`}
                      whileHover={{ scale: 1.08, y: -2 }} // Slight lift effect on hover
                      whileTap={{ scale: 0.95, y: 0 }} // Slightly shrink on tap
                      onClick={() => alert("Button Clicked!")} // Replace with your button action
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
            
                {/* Image Section */}
                <div className="flex-shrink-0 ml-8">
                  <img
                    src="https://img.freepik.com/free-photo/3d-rendering-cartoon-like-person-showing-thumbs-up_23-2150797540.jpg?t=st=1725023635~exp=1725027235~hmac=6eea2cb7d811c4839f4b503f0842c7c475524dff36296b2e3dee7d8fde03c77d&w=740"
                    alt="John's Achievement"
                    className="object-cover w-full h-full rounded-lg shadow-lg"
                    style={{ width: "100px", height: "160px" }} // Image size to fit the layout
                  />
                </div>
              </motion.div>
            
              {/* Monthly Statistics Card */}
              <div
                className={`flex flex-col p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                }`}
                style={{ maxWidth: "100%", height: "auto" }} // Ensure responsiveness
              >
                <h2 className="mb-4 text-2xl font-extrabold text-center">
                  Monthly Statistics
                </h2>
                <div className="flex justify-around gap-6">
                  {/* Stat Item 1 */}
                  <div className="flex flex-col items-center w-1/3">
                    <div
                      className={`w-16 h-16 flex items-center justify-center rounded-full ${
                        darkMode ? "bg-blue-600" : "bg-blue-500"
                      } text-white mb-2`}
                    >
                      {/* Example Icon */}
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 17l-4-4m0 0l4-4m-4 4h12"
                        />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold">Sales</p>
                    <p className="text-xl font-bold">$24,000</p>
                  </div>
                  {/* Stat Item 2 */}
                  <div className="flex flex-col items-center w-1/3">
                    <div
                      className={`w-16 h-16 flex items-center justify-center rounded-full ${
                        darkMode ? "bg-green-600" : "bg-green-500"
                      } text-white mb-2`}
                    >
                      {/* Example Icon */}
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2 4 4L21 4"
                        />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold">New Orders</p>
                    <p className="text-xl font-bold">150</p>
                  </div>
                  {/* Stat Item 3 */}
                  <div className="flex flex-col items-center w-1/3">
                    <div
                      className={`w-16 h-16 flex items-center justify-center rounded-full ${
                        darkMode ? "bg-red-600" : "bg-red-500"
                      } text-white mb-2`}
                    >
                      {/* Example Icon */}
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m4 4h.01M4 6h16M4 10h16M4 14h16M4 18h16"
                        />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold">Returns</p>
                    <p className="text-xl font-bold">30</p>
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
            <div className="flex items-center mt-8">
              <CSVLink data={csvData} filename="ecommerce-data.csv">
                <motion.button
                  className="px-4 py-2 mr-4 text-white bg-blue-500 rounded-md shadow-md"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Export CSV
                </motion.button>
              </CSVLink>
              {/* <motion.button
                className={`py-2 px-4 ${
                  darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
                } rounded-md shadow-md`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={toggleModal}
              >
                Add Product
              </motion.button> */}
            </div>
            {/* {showModal && (
              <Modal onClose={toggleModal}>
                <h2 className="mb-4 text-lg font-semibold">Add New Product</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="product"
                      value={newProduct.product}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={newProduct.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">
                      Price
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={newProduct.stock}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <motion.button
                      className="px-4 py-2 mr-4 text-white bg-blue-500 rounded-md shadow-md"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={toggleModal}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="px-4 py-2 text-white bg-green-500 rounded-md shadow-md"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Add Product
                    </motion.button>
                  </div>
                </form>
              </Modal>
            )} */}

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

              <div className="col-span-2 p-6 overflow-x-auto border rounded-lg shadow-lg lg:col-span-2 xl:col-span-3 ">
                <h2 className="mb-6 text-2xl font-semibold">
                  Product Data Table
                </h2>
                <div className="relative overflow-x-auto">
                  {data.length === 0 ? (
                    <div className="flex items-center justify-center h-48">
                      <p className="text-lg">No data available</p>
                    </div>
                  ) : (
                    <table className="min-w-full divide-y ">
                      <thead className="text-xs font-medium uppercase ">
                        <tr>
                          <th className="px-6 py-3 text-left">Product</th>
                          <th className="px-6 py-3 text-left">Category</th>
                          <th className="px-6 py-3 text-left">Price</th>
                          <th className="px-6 py-3 text-left">Stock</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {data.map((item, index) => {
                          const price = parseFloat(item.price);
                          const formattedPrice = isNaN(price)
                            ? "N/A"
                            : `$${price.toFixed(2)}`;

                          return (
                            <tr
                              key={index}
                              className="transition-transform duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500"
                              role="row"
                              aria-labelledby={`row-${index}`}
                            >
                              <td
                                className="px-6 py-4 text-sm font-medium "
                                id={`row-${index}-product`}
                              >
                                {item.product}
                              </td>
                              <td
                                className="px-6 py-4 text-sm "
                                id={`row-${index}-category`}
                              >
                                {item.category}
                              </td>
                              <td
                                className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300"
                                id={`row-${index}-price`}
                              >
                                {formattedPrice}
                              </td>
                              <td
                                className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300"
                                id={`row-${index}-stock`}
                              >
                                {item.stock}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
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
