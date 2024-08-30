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
              <div className="flex justify-center items-center h-screen">
                <ClipLoader color={darkMode ? "#fff" : "#000"} />
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {data.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 border rounded-lg shadow-md ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h2
                      className={`text-lg font-semibold ${
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
            <div className="mt-8 flex items-center">
              <CSVLink data={csvData} filename="ecommerce-data.csv">
                <motion.button
                  className="mr-4 py-2 px-4 bg-blue-500 text-white rounded-md shadow-md"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Export CSV
                </motion.button>
              </CSVLink>
              <motion.button
                className={`py-2 px-4 ${
                  darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
                } rounded-md shadow-md`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={toggleModal}
              >
                Add Product
              </motion.button>
            </div>
            {showModal && (
              <Modal onClose={toggleModal}>
                <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
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
                    <label className="block text-sm font-medium mb-2">
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
                    <label className="block text-sm font-medium mb-2">
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
                    <label className="block text-sm font-medium mb-2">
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
                      className="mr-4 py-2 px-4 bg-blue-500 text-white rounded-md shadow-md"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={toggleModal}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="py-2 px-4 bg-green-500 text-white rounded-md shadow-md"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Add Product
                    </motion.button>
                  </div>
                </form>
              </Modal>
            )}
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div className="border rounded-lg p-4 shadow-lg col-span-2 lg:col-span-1">
                <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
                <Line data={salesData} options={salesOptions} />
              </div>
              <div className="border rounded-lg p-4 shadow-lg col-span-2 lg:col-span-1">
                <h2 className="text-lg font-semibold mb-4">
                  Product Categories
                </h2>
                <Pie data={categoryData} options={categoryOptions} />
              </div>
              <div className="border rounded-lg p-4 shadow-lg col-span-2 lg:col-span-1">
                <h2 className="text-lg font-semibold mb-4">Stock Levels</h2>
                <Doughnut data={stockData} options={stockOptions} />
              </div>
              <div className="border rounded-lg p-4 shadow-lg col-span-2 lg:col-span-1">
                <h2 className="text-lg font-semibold mb-4">
                  Customer Feedback
                </h2>
                <Radar data={feedbackData} options={feedbackOptions} />
              </div>

              <div className="border rounded-lg p-6 shadow-lg overflow-x-auto col-span-2 lg:col-span-2 xl:col-span-3 ">
                <h2 className="text-2xl font-semibold mb-6">
                  Product Data Table
                </h2>
                <div className="relative overflow-x-auto">
                  {data.length === 0 ? (
                    <div className="flex items-center justify-center h-48">
                      <p className="text-lg">No data available</p>
                    </div>
                  ) : (
                    <table className="min-w-full divide-y  ">
                      <thead className="   uppercase text-xs font-medium">
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
                                className="px-6 py-4 text-sm font-medium  "
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

             






<div className="border rounded-lg p-6  col-span-2 lg:col-span-1 transition-transform transform hover:scale-105 hover:border-blue-500">
  <h2 className="text-2xl font-semibold mb-6  flex items-center">
    <i className="fas fa-chart-line text-blue-500 dark:text-blue-300 mr-3"></i> Sales Progress
  </h2>
  
 
  <div className="space-y-6">
    
    <div className="relative group">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold ">
          Achieved
        </span>
        <span className="text-sm font-semibold text-green-600">
          60%
        </span>
      </div>
      <div className="relative w-full h-2 rounded  overflow-hidden">
        <div
          style={{ width: '60%' }}
          className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded transition-all duration-500 ease-in-out group-hover:shadow-md"
        >
          <span className="absolute inset-y-0 right-0 pr-2 text-xs font-bold  transform translate-x-1/2 group-hover:translate-x-0 transition-all duration-300">
            {/* 60% */}
          </span>
        </div>
      </div>
      {/* Tooltip on Hover */}
      <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-medium bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 rounded-md py-1 px-2 shadow-lg -mt-12 ml-32 transform -translate-x-1/2 group-hover:translate-y-2 transition-all duration-500 ease-in-out">
        Reached 60% of the target
      </div>
    </div>

    {/* In Progress Progress Bar */}
    <div className="relative group">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold ">
          In Progress
        </span>
        <span className="text-sm font-semibold text-blue-600">
          30%
        </span>
      </div>
      <div className="relative w-full h-2 rounded  overflow-hidden">
        <div
          style={{ width: '30%' }}
          className="h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded transition-all duration-500 ease-in-out group-hover:shadow-md"
        >
          <span className="absolute inset-y-0 right-0 pr-2 text-xs font-bold  transform translate-x-1/2 group-hover:translate-x-0 transition-all duration-300">
            {/* 30% */}
          </span>
        </div>
      </div>
      {/* Tooltip on Hover */}
      <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-medium bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 rounded-md py-1 px-2 shadow-lg -mt-12 ml-32 transform -translate-x-1/2 group-hover:translate-y-2 transition-all duration-500 ease-in-out">
        Currently at 30% progress
      </div>
    </div>

    {/* Pending Progress Bar */}
    <div className="relative group">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold ">
          Pending
        </span>
        <span className="text-sm font-semibold text-red-600">
          10%
        </span>
      </div>
      <div className="relative w-full h-2 rounded  overflow-hidden">
        <div
          style={{ width: '10%' }}
          className="h-2 bg-gradient-to-r from-red-400 to-red-600 rounded transition-all duration-500 ease-in-out group-hover:shadow-md"
        >
          <span className="absolute inset-y-0 right-0 pr-2 text-xs font-bold  transform translate-x-1/2 group-hover:translate-x-0 transition-all duration-300">
            {/* 10% */}
          </span>
        </div>
      </div>
      {/* Tooltip on Hover */}
      <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-medium bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 rounded-md py-1 px-2 shadow-lg -mt-12 ml-32 transform -translate-x-1/2 group-hover:translate-y-2 transition-all duration-500 ease-in-out">
        Only 10% completed
      </div>
    </div>
  </div>
</div>




















<div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-lg col-span-2 lg:col-span-1 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl  ">
  <h2 className="text-xl font-bold mb-4 flex items-center ">
    <i className="fas fa-calendar-alt text-indigo-500 mr-2"></i> Event Timeline
  </h2>
  {/* Custom Event Timeline */}
  <div className="relative border-l-4 border-indigo-500 dark:border-indigo-400 ml-4 pl-4">
    <div className="mb-8 group">
      <div className="absolute w-5 h-5 bg-indigo-500 rounded-full mt-1.5 -left-3 border-2 border-white dark:border-gray-800 transition-transform transform group-hover:scale-110"></div>
      <p className="text-sm font-semibold   transition-colors">
        March 12, 2024
      </p>
      <p className="text-base leading-snug   transition-colors">
        <i className="fas fa-briefcase  mr-2"></i> Company Annual Meeting: A comprehensive overview of the past year's achievements and the roadmap for the next year was discussed.
      </p>
    </div>
    <div className="mb-8 group">
      <div className="absolute w-5 h-5 bg-indigo-500 rounded-full mt-1.5 -left-3 border-2 border-white dark:border-gray-800  transition-transform transform group-hover:scale-110"></div>
      <p className="text-sm font-semibold  transition-colors">
        April 5, 2024
      </p>
      <p className="text-base leading-snug    transition-colors">
        <i className="fas fa-rocket text-indigo-500 mr-2"></i> Product Launch: The new product line was launched, featuring innovative designs and cutting-edge technology.
      </p>
    </div>
    {/* Add more timeline events as needed */}
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
