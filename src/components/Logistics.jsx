import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getData } from "../services/dataService";
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
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  BarElement
} from 'chart.js';
import { Line, Pie, Radar, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  BarElement
);

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      staggerChildren: 0.3,
    },
  },
};


const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 }
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.3 }
  }
};

const ChartCard = ({ title, children }) => (
  <motion.div
    className="p-4 border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:shadow-lg"
    variants={itemVariants}
  >
    <h2 className="mb-4 text-xl font-semibold dark:text-gray-200">{title}</h2>
    {children}
  </motion.div>
);

const Logistics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        toast.error("Error fetching data");
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

  const csvData = data.map(item => ({
    city: item.city,
    topic: item.topic,
    swot: item.swot,
    pestle: item.pestle
  }));

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const deliveryData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Deliveries',
      data: [150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2
    }]
  };

  const deliveryOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `Deliveries: ${context.raw}`,
          title: (tooltipItems) => `Month: ${tooltipItems[0].label}`,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
    },
  };

  const transportCostData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Transport Costs ($)',
      data: [5000, 7000, 8000, 10000],
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 2
    }]
  };

  const transportCostOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Costs: $${context.raw}`,
          title: (tooltipItems) => `Quarter: ${tooltipItems[0].label}`,
        }
      }
    }
  };

  const deliveryTimeData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      label: 'Average Delivery Time (days)',
      data: [5, 4, 4.5, 4, 3.5, 3],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.3
    }]
  };

  const deliveryTimeOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Time: ${context.raw} days`,
          title: (tooltipItems) => `Month: ${tooltipItems[0].label}`,
        }
      }
    }
  };

  const regionExpensesData = {
    labels: ['North', 'South', 'East', 'West'],
    datasets: [{
      label: 'Regional Expenses ($)',
      data: [3000, 4000, 3500, 4500],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 2
    }]
  };

  const regionExpensesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Expenses: $${context.raw}`,
          title: (tooltipItems) => `Region: ${tooltipItems[0].label}`,
        }
      }
    }
  };

  const fleetEfficiencyData = {
    labels: ['Truck', 'Van', 'Bike', 'Drone'],
    datasets: [{
      label: 'Fleet Efficiency (%)',
      data: [85, 90, 70, 75],
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 2
    }]
  };

  const fleetEfficiencyOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Efficiency: ${context.raw}%`,
          title: (tooltipItems) => `Vehicle: ${tooltipItems[0].label}`,
        }
      }
    }
  };

  const productDistributionData = {
    labels: ['Electronics', 'Furniture', 'Clothing', 'Toys'],
    datasets: [{
      label: 'Product Distribution',
      data: [300, 450, 250, 350],
      backgroundColor: [
        'rgba(255, 159, 64, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(255, 159, 64, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }]
  };

  const productDistributionOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} units`,
        }
      }
    }
  };

  const monthlyExpensesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Transport',
        data: [500, 600, 700, 800, 600, 700, 800, 900, 700, 800, 900, 1000],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Storage',
        data: [300, 400, 500, 600, 500, 600, 700, 800, 600, 700, 800, 900],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Miscellaneous',
        data: [200, 300, 400, 500, 400, 500, 600, 700, 500, 600, 700, 800],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ]
  };

  const monthlyExpensesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: $${context.raw}`,
          title: (tooltipItems) => `Month: ${tooltipItems[0].label}`,
        }
      }
    },
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  };

  const deliveryStatusData = {
    labels: ['On Time', 'Delayed', 'In Transit', 'Cancelled'],
    datasets: [{
      data: [60, 20, 15, 5],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }]
  };

  const deliveryStatusOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}%`,
        }
      }
    }
  };

  const fleetUtilizationData = {
    labels: ['Truck', 'Van', 'Bike', 'Drone'],
    datasets: [{
      label: 'Utilization (%)',
      data: [80, 90, 70, 85],
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1
    }]
  };

  const fleetUtilizationOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Utilization: ${context.raw}%`,
        }
      }
    }
  };

  return (
    <motion.div
      className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header toggleSidebar={() => {}} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className={`flex-1 p-6 space-y-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold dark:text-gray-100">Logistics Dashboard</h1>
            <button
              className="px-4 py-2 text-white bg-blue-600 rounded-lg dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400"
              onClick={toggleModal}
            >
              Export Data
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ChartCard title="Deliveries Over Time">
              <Line data={deliveryData} options={deliveryOptions} />
            </ChartCard>
            <ChartCard title="Transport Costs">
              <Bar data={transportCostData} options={transportCostOptions} />
            </ChartCard>
            <ChartCard title="Average Delivery Time">
              <Radar data={deliveryTimeData} options={deliveryTimeOptions} />
            </ChartCard>
            <ChartCard title="Regional Expenses">
              <Pie data={regionExpensesData} options={regionExpensesOptions} />
            </ChartCard>
            <ChartCard title="Fleet Efficiency">
              <Bar data={fleetEfficiencyData} options={fleetEfficiencyOptions} />
            </ChartCard>
            <ChartCard title="Monthly Expenses">
              <Bar data={monthlyExpensesData} options={monthlyExpensesOptions} />
            </ChartCard>
            <ChartCard title="Delivery Status">
              <Pie data={deliveryStatusData} options={deliveryStatusOptions} />
            </ChartCard>
            <ChartCard title="Fleet Utilization">
              <Bar data={fleetUtilizationData} options={fleetUtilizationOptions} />
            </ChartCard>
          </div>
          {loading && (
            <div className="flex items-center justify-center h-40">
              <ClipLoader color={darkMode ? 'white' : 'black'} />
            </div>
          )}
          <ToastContainer />
          <Modal isOpen={showModal} onClose={toggleModal}>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">Export Data</h3>
              <CSVLink data={csvData} filename="logistics_data.csv" className="inline-block px-4 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-700">
                Download CSV
              </CSVLink>
            </div>
          </Modal>
        </div>
      </div>
    </motion.div>
  );
};

export default Logistics;
