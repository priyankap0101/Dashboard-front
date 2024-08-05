import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ClipLoader from 'react-spinners/ClipLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';
import Header from './Header';
import Modal from './Modal';
import { CSVLink } from 'react-csv';
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
  RadialLinearScale
} from 'chart.js';
import { Line, Pie, Radar, Bar, Doughnut } from 'react-chartjs-2';

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
      type: 'spring',
      stiffness: 100
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: '#4B4B9D',
    color: '#fff',
    transition: { duration: 0.3 }
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.3 }
  }
};

const Ecommerce = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    product: '',
    category: '',
    price: '',
    stock: ''
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData([
        { product: 'Smartphone', category: 'Electronics', price: '$699', stock: 50 },
        { product: 'Laptop', category: 'Electronics', price: '$999', stock: 30 },
        { product: 'Headphones', category: 'Accessories', price: '$199', stock: 100 }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
    setDarkMode(savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const handleSubmit = () => {
    if (Object.values(newProduct).some(value => !value)) {
      toast.error('Please fill out all fields');
      return;
    }
    setData([...data, newProduct]);
    toast.success('Product added successfully');
    setNewProduct({
      product: '',
      category: '',
      price: '',
      stock: ''
    });
    toggleModal();
  };

  const csvData = data.map(item => ({
    product: item.product,
    category: item.category,
    price: item.price,
    stock: item.stock
  }));

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Sales ($)',
      data: [1500, 2000, 2500, 3000, 3500, 4000, 4500],
      backgroundColor: 'rgba(75, 192, 192, 0.4)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2
    }]
  };

  const salesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (context) => `Sales: $${context.raw}`
        }
      }
    }
  };

  const categoryData = {
    labels: ['Electronics', 'Accessories', 'Home & Kitchen', 'Books'],
    datasets: [{
      label: 'Product Categories',
      data: [60, 25, 10, 5],
      backgroundColor: [
        'rgba(54, 162, 235, 0.4)',
        'rgba(255, 99, 132, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(75, 192, 192, 0.4)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 2
    }]
  };

  const categoryOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (context) => `Category: ${context.raw}%`
        }
      }
    }
  };

  const stockData = {
    labels: ['Smartphone', 'Laptop', 'Headphones'],
    datasets: [{
      label: 'Stock Levels',
      data: [50, 30, 100],
      backgroundColor: [
        'rgba(255, 159, 64, 0.4)',
        'rgba(153, 102, 255, 0.4)',
        'rgba(255, 99, 132, 0.4)'
      ],
      borderColor: [
        'rgba(255, 159, 64, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 2
    }]
  };

  const stockOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (context) => `Stock: ${context.raw}`
        }
      }
    }
  };

  const feedbackData = {
    labels: ['Customer Service', 'Product Quality', 'Value for Money', 'Delivery Speed'],
    datasets: [{
      label: 'Customer Feedback',
      data: [85, 90, 75, 80],
      backgroundColor: 'rgba(255, 99, 132, 0.4)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2
    }]
  };

  const feedbackOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (context) => `Feedback: ${context.raw}%`
        }
      }
    }
  };

  return (
    <motion.div
      className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'} transition-colors duration-300 ease-in-out`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header toggleSidebar={() => {}} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
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
            <h1 className={`text-4xl font-extrabold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300 ease-in-out`}>
              E-Commerce Dashboard
            </h1>
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <ClipLoader color={darkMode ? "#ffffff" : "#000000"} loading={loading} size={150} />
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {data.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`border rounded-lg p-4 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2 className="mb-4 text-2xl font-semibold">{item.product}</h2>
                    <p className="mb-2 text-lg">Category: {item.category}</p>
                    <p className="mb-2 text-lg">Price: {item.price}</p>
                    <p className="mb-2 text-lg">Stock: {item.stock}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          <div className="flex gap-4 mb-6">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={toggleModal}
              className={`px-4 py-2 rounded-lg font-semibold ${darkMode ? 'bg-gray-700 text-white' : 'bg-blue-500 text-white'} transition-colors duration-300 ease-in-out`}
            >
              Add Product
            </motion.button>
            <CSVLink
              data={csvData}
              filename="products.csv"
              className={`px-4 py-2 rounded-lg font-semibold ${darkMode ? 'bg-gray-700 text-white' : 'bg-green-500 text-white'} transition-colors duration-300 ease-in-out`}
            >
              Export to CSV
            </CSVLink>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 border rounded-lg shadow-lg">
              <h2 className="mb-4 text-2xl font-semibold">Sales Overview</h2>
              <Line data={salesData} options={salesOptions} />
            </div>
            <div className="p-4 border rounded-lg shadow-lg">
              <h2 className="mb-4 text-2xl font-semibold">Product Categories</h2>
              <Pie data={categoryData} options={categoryOptions} />
            </div>
            <div className="p-4 border rounded-lg shadow-lg">
              <h2 className="mb-4 text-2xl font-semibold">Stock Levels</h2>
              <Bar data={stockData} options={stockOptions} />
            </div>
            <div className="p-4 border rounded-lg shadow-lg">
              <h2 className="mb-4 text-2xl font-semibold">Customer Feedback</h2>
              <Radar data={feedbackData} options={feedbackOptions} />
            </div>
          </div>

          {showModal && (
            <Modal toggleModal={toggleModal} handleInputChange={handleInputChange} handleSubmit={handleSubmit} newProduct={newProduct} />
          )}

          <ToastContainer />
        </motion.main>
      </div>
    </motion.div>
  );
};

export default Ecommerce;
