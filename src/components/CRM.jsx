import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bar, Line, Pie, Radar, Doughnut } from 'react-chartjs-2';
import { getData, getAllCities, getAllSwots, getAllPestles, getSalesData } from "../services/dataService";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const generateRandomData = (length) => Array.from({ length }, () => Math.floor(Math.random() * 100));

const CRM = ({ darkMode }) => {
  const [mainData, setMainData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [swotData, setSwotData] = useState([]);
  const [pestleData, setPestleData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const mainResult = await getData();
        const cities = await getAllCities();
        const swots = await getAllSwots();
        const pestles = await getAllPestles();
        const sales = await getSalesData();
        setMainData(mainResult);
        setCityData(cities);
        setSwotData(swots);
        setPestleData(pestles);
        setSalesData(sales);
      } catch (error) {
        setError("Error fetching data");
        toast.error("Error fetching data");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Default chart data
  const defaultData = [10, 20, 30, 40, 50];

  // Bar chart data
  const barChartData = {
    labels: cityData.length > 0 ? cityData : ['City 1', 'City 2', 'City 3'],
    datasets: [{
      label: 'City Data',
      data: cityData.length > 0 ? generateRandomData(cityData.length) : defaultData,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  // Line chart data
  const lineChartData = {
    labels: swotData.length > 0 ? swotData : ['SWOT 1', 'SWOT 2', 'SWOT 3'],
    datasets: [{
      label: 'SWOT Data',
      data: swotData.length > 0 ? generateRandomData(swotData.length) : defaultData,
      fill: false,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
    }],
  };

  // Pie chart data
  const pieChartData = {
    labels: pestleData.length > 0 ? pestleData : ['PESTLE 1', 'PESTLE 2', 'PESTLE 3'],
    datasets: [{
      label: 'PESTLE Data',
      data: pestleData.length > 0 ? generateRandomData(pestleData.length) : defaultData,
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(153, 102, 255, 1)',
      ],
    }],
  };

  // Radar chart data
  const radarChartData = {
    labels: ['Metric A', 'Metric B', 'Metric C', 'Metric D'],
    datasets: [{
      label: 'Radar Data',
      data: generateRandomData(4),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  // Doughnut chart data for sales
  const doughnutChartData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    datasets: [{
      label: 'Sales Data',
      data: [300, 500, 200, 400],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
    }],
  };

  // New Sales Chart Data
  const salesChartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
      label: 'Sales ($)',
      data: [5000, 6000, 7000, 8000, 9000],
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
    }],
  };

  return (
    <motion.div
      className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"} transition-colors duration-300`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header toggleSidebar={() => {}} />
      <div className="flex">
        <Sidebar darkMode={darkMode} toggleDarkMode={() => {}} />
        <div className="flex-1 p-6">
          <div className="mb-8">
            <motion.h1
              className="mb-6 text-4xl font-bold"
              variants={itemVariants}
            >
              CRM - Customer Visualization
            </motion.h1>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <ClipLoader
                color={darkMode ? "#ffffff" : "#000000"}
                loading={loading}
                size={50}
              />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
              variants={containerVariants}
            >
              <ChartCard
                title="City Data Bar Chart"
                chart={<Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { tooltip: { callbacks: { label: (tooltipItem) => `City: ${tooltipItem.label}, Value: ${tooltipItem.raw}` } } } }} />}
              />
              <ChartCard
                title="SWOT Line Chart"
                chart={<Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { tooltip: { callbacks: { label: (tooltipItem) => `SWOT: ${tooltipItem.label}, Value: ${tooltipItem.raw}` } } } }} />}
              />
              <ChartCard
                title="PESTLE Pie Chart"
                chart={<Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { tooltip: { callbacks: { label: (tooltipItem) => `PESTLE: ${tooltipItem.label}, Value: ${tooltipItem.raw}` } } } }} />}
              />
              <ChartCard
                title="Radar Chart"
                chart={<Radar data={radarChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { tooltip: { callbacks: { label: (tooltipItem) => `Metric: ${tooltipItem.label}, Value: ${tooltipItem.raw}` } } } }} />}
              />
              <ChartCard
                title="Sales Doughnut Chart"
                chart={<Doughnut data={doughnutChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { tooltip: { callbacks: { label: (tooltipItem) => `Product: ${tooltipItem.label}, Sales: ${tooltipItem.raw}` } } } }} />}
              />
              <ChartCard
                title="Sales Line Chart"
                chart={<Line data={salesChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { tooltip: { callbacks: { label: (tooltipItem) => `Month: ${tooltipItem.label}, Sales: ${tooltipItem.raw}` } } } }} />}
              />
            </motion.div>
          )}
        </div>
      </div>
      <ToastContainer />
    </motion.div>
  );
};

const ChartCard = ({ title, chart }) => (
  <div className="p-4 bg-white rounded-lg shadow-lg">
    <h2 className="mb-4 text-lg font-semibold">{title}</h2>
    <div className="h-64">{chart}</div>
  </div>
);

export default CRM;
