/* eslint-disable no-unused-vars */
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

const CRM = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData([
        { client: 'Tech Innovators Inc.', project: 'AI-Driven Chatbot', status: 'Completed' },
        { client: 'EcoGreen Solutions', project: 'Sustainable Energy Web App', status: 'In Progress' },
        { client: 'HealthFirst Clinic', project: 'Patient Management System', status: 'Pending' }
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

  const csvData = data.map(item => ({
    client: item.client,
    project: item.project,
    status: item.status
  }));

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const clientData = {
    labels: ['Tech Innovators Inc.', 'EcoGreen Solutions', 'HealthFirst Clinic', 'Bright Future Ltd.'],
    datasets: [{
      label: 'Clients',
      data: [20, 35, 25, 15],
      backgroundColor: 'rgba(75, 192, 192, 0.4)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2
    }]
  };

  const clientOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (context) => `Clients: ${context.raw}`
        }
      }
    }
  };

  const projectData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Projects',
      data: [2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 2, 3],
      backgroundColor: 'rgba(54, 162, 235, 0.4)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2
    }]
  };

  const projectOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (context) => `Projects: ${context.raw}`
        }
      }
    }
  };

  const statusData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [{
      label: 'Project Status',
      data: [15, 10, 5],
      backgroundColor: [
        'rgba(75, 192, 192, 0.4)',
        'rgba(153, 102, 255, 0.4)',
        'rgba(255, 99, 132, 0.4)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 2
    }]
  };

  const statusOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (context) => `Status: ${context.raw}`
        }
      }
    }
  };

  const radarData = {
    labels: ['Communication', 'Technical Skills', 'Project Management', 'Client Handling', 'Problem Solving'],
    datasets: [{
      label: 'Skill Levels (%)',
      data: [90, 80, 70, 85, 75],
      backgroundColor: 'rgba(255, 99, 132, 0.4)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2
    }]
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (context) => `Skill Level: ${context.raw}%`
        }
      }
    }
  };

  const doughnutData = {
    labels: ['Direct', 'Referral', 'Social Media', 'Email', 'Other'],
    datasets: [{
      label: 'Traffic Sources',
      data: [500, 120, 150, 80, 90],
      backgroundColor: [
        'rgba(255, 206, 86, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(75, 192, 192, 0.4)',
        'rgba(153, 102, 255, 0.4)',
        'rgba(255, 99, 132, 0.4)'
      ],
      borderColor: [
        'rgba(255, 206, 86, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 2
    }]
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (context) => `Traffic: ${context.raw}`
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
              Client Relationship Management
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
                    className={`border rounded-lg p-4 shadow-lg ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} transition-all duration-300 ease-in-out`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <h2 className="mb-3 text-2xl font-semibold">{item.client}</h2>
                    <p className="mb-2">Project: <span className="font-medium">{item.project}</span></p>
                    <p>Status: <span className={`font-medium ${item.status === 'Completed' ? 'text-green-500' : item.status === 'In Progress' ? 'text-yellow-500' : 'text-red-500'}`}>{item.status}</span></p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          <div className="flex gap-4 mb-6">
            <motion.button
              className={`bg-blue-600 text-white px-6 py-3 font-semibold rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:bg-blue-700 active:bg-blue-800`}
              onClick={toggleModal}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Add Client
            </motion.button>

            <CSVLink
              data={csvData}
              filename="clients_data.csv"
              className={`bg-green-600 text-white px-6 py-3 font-semibold rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:bg-green-700 active:bg-green-800`}
            >
              Export to CSV
            </CSVLink>
          </div>

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
              <h2 className="mb-4 text-2xl font-semibold">Traffic Sources</h2>
              <Pie data={doughnutData} options={doughnutOptions} />
            </div>
          </div>
        </motion.main>
      </div>

      <Modal showModal={showModal} toggleModal={toggleModal} darkMode={darkMode} className={`transition-transform ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add New Client</h2>
        {/* Modal content */}
      </Modal>

      <ToastContainer />
    </motion.div>
  );
};

export default CRM;
