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
  BarElement,
} from "chart.js";
import { Line, Pie, Radar, Bar, Doughnut, Bubble } from "react-chartjs-2";
import Footer from "./Footer";

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
    transition: { duration: 0.3 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

const ChartCard = ({ title, children }) => (
  <motion.div
    className="p-2 border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:shadow-lg"
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

  const csvData = data.map((item) => ({
    city: item.city,
    topic: item.topic,
    swot: item.swot,
    pestle: item.pestle,
  }));

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Dummy chart data
  const dummyChartData = {
    labels: ["A", "B", "C", "D", "E", "F"],
    datasets: [
      {
        label: "Dummy Data",
        data: [10, 20, 15, 25, 30, 40],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };

  const dummyChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Value: ${context.raw}`,
          title: (tooltipItems) => `Label: ${tooltipItems[0].label}`,
        },
      },
    },
  };

  const deliveryData = {
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
        label: "Deliveries",
        data: [150, 225, 270, 320, 380, 410, 475, 530, 590, 640, 680, 750],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        fill: true, // Fills the area under the line for better visual impact
        pointBackgroundColor: "rgba(54, 162, 235, 1)", // Point color
        pointBorderColor: "#fff",
        pointBorderWidth: 1,
        tension: 0.3, // Smooths out the line for a more aesthetic look
      },
    ],
  };

  const getFontSize = () => {
    if (window.innerWidth < 300) {
      // Very small screens (hide labels and titles)
      return {
        title: 0, // Title font size
        body: 0, // Body font size
        legend: 0, // Legend font size
        showLabels: false, // Do not show labels
      };
    } else if (window.innerWidth < 640) {
      // Small screens
      return {
        title: 8,
        body: 6,
        legend: 4,
        showLabels: true,
      };
    } else if (window.innerWidth < 768) {
      // Medium screens
      return {
        title: 14,
        body: 12,
        legend: 12,
        showLabels: true,
      };
    } else {
      // Large screens
      return {
        title: 14,
        body: 14,
        legend: 14,
        showLabels: true,
      };
    }
  };

  const deliveryOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      tension: {
        duration: 1000,
        easing: "easeOutBounce",
        from: 1,
        to: 0,
        loop: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: getFontSize().legend,
            family: "'Arial', sans-serif",
          },
          color: "#4a4a4a",
          padding: 10,
          boxWidth: 20,
          boxHeight: 10,
          borderColor: "#4a4a4a",
          borderWidth: 1,
          borderRadius: 5,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        bodyFont: {
          size: getFontSize().body,
        },
        titleFont: {
          size: getFontSize().title,
          weight: "bold",
        },
        padding: 10,
        cornerRadius: 5,
        callbacks: {
          label: (context) => `Deliveries: ${context.raw}`,
          title: (tooltipItems) => `Month: ${tooltipItems[0].label}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: getFontSize().showLabels, // Conditionally show title
          text: "Number of Deliveries",
          color: "#4a4a4a",
          font: {
            size: getFontSize().title,
            weight: "bold",
          },
          padding: { top: 10 },
        },
        ticks: {
          stepSize: 80,
          color: "#6b7280",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.4)",
          drawBorder: false,
        },
      },
      x: {
        title: {
          display: getFontSize().showLabels, // Conditionally show title
          text: "Months",
          color: "#4a4a4a",
          font: {
            size: getFontSize().title,
            weight: "bold",
          },
          padding: { top: 10, bottom: 10 },
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
        tension: 0.4,
        borderColor: "rgba(54, 162, 235, 1)",
      },
      point: {
        radius: 6,
        hoverRadius: 8,
        backgroundColor: "rgba(54, 162, 235, 1)",
        hoverBackgroundColor: "rgba(54, 162, 235, 0.8)",
      },
    },
  };

  const getTransportFontSize = () => {
    if (window.innerWidth < 300) {
      // Very small screens (hide labels and titles)
      return {
        title: 0, // Title font size
        body: 0, // Body font size
        legend: 0, // Legend font size
        showLabels: false, // Do not show labels
      };
    } else if (window.innerWidth < 640) {
      // Small screens
      return {
        title: 8,
        body: 6,
        legend: 4,
      };
    } else if (window.innerWidth < 768) {
      // Medium screens
      return {
        title: 14,
        body: 12,
        legend: 12,
      };
    } else {
      // Large screens
      return {
        title: 14,
        body: 14,
        legend: 14,
      };
    }
  };

  const transportCostData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Transport Costs ($)",
        data: [5000, 7000, 8000, 10000],
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 2,
      },
    ],
  };

  const transportCostOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      tension: {
        duration: 1000,
        easing: "easeOutBounce",
        from: 1,
        to: 0,
        loop: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: getTransportFontSize().legend,
            family: "'Arial', sans-serif",
          },
          color: "#4a4a4a",
          padding: 10,
          boxWidth: 20,
          boxHeight: 10,
          borderColor: "#4a4a4a",
          borderWidth: 1,
          borderRadius: 5,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        bodyFont: {
          size: getTransportFontSize().body,
        },
        titleFont: {
          size: getTransportFontSize().title,
          weight: "bold",
        },
        padding: 10,
        cornerRadius: 5,
        callbacks: {
          label: (context) => `Costs: $${context.raw}`,
          title: (tooltipItems) => `Quarter: ${tooltipItems[0].label}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Transport Costs ($)",
          color: "#4a4a4a",
          font: {
            size: getTransportFontSize().title,
            weight: "bold",
          },
          padding: { top: 10 },
        },
        ticks: {
          stepSize: 2000, // Adjust step size for better readability
          color: "#6b7280",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.4)", // Subtle grid color
          drawBorder: false,
        },
      },
      x: {
        title: {
          display: true,
          text: "Quarters",
          color: "#4a4a4a",
          font: {
            size: getTransportFontSize().title,
            weight: "bold",
          },
          padding: { top: 10, bottom: 10 },
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 2,
        backgroundColor: "rgba(255, 206, 86, 0.8)", // More visible bar color
      },
    },
  };

  const deliveryTimeData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Average Delivery Time (days)",
        data: [5, 4, 4.5, 4, 3.5, 3],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const deliveryTimeOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Time: ${context.raw} days`,
          title: (tooltipItems) => `Month: ${tooltipItems[0].label}`,
        },
      },
    },
  };

  const regionExpensesData = {
    labels: ["North", "South", "East", "West"],
    datasets: [
      {
        label: "Regional Expenses ($)",
        data: [3000, 4000, 3500, 4500],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const regionExpensesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Expenses: $${context.raw}`,
          title: (tooltipItems) => `Region: ${tooltipItems[0].label}`,
        },
      },
    },
  };

  const fleetEfficiencyData = {
    labels: ["Truck", "Van", "Bike", "Drone"],
    datasets: [
      {
        label: "Fleet Efficiency (%)",
        data: [85, 90, 70, 75],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
      },
    ],
  };

  const fleetEfficiencyOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Efficiency: ${context.raw}%`,
          title: (tooltipItems) => `Vehicle: ${tooltipItems[0].label}`,
        },
      },
    },
  };

  const monthlyExpensesData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Monthly Expenses ($)",
        data: [
          1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200,
          2300,
        ],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 2,
      },
    ],
  };

  const monthlyExpensesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Expenses: $${context.raw}`,
          title: (tooltipItems) => `Month: ${tooltipItems[0].label}`,
        },
      },
    },
  };

  const deliveryStatusData = {
    labels: ["On Time", "Delayed", "Pending"],
    datasets: [
      {
        label: "Delivery Status",
        data: [70, 20, 10],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 205, 86, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const deliveryStatusOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Status: ${context.raw}`,
          title: (tooltipItems) => `Delivery Status: ${tooltipItems[0].label}`,
        },
      },
    },
  };

  const fleetUtilizationData = {
    labels: ["Utilized", "Idle"],
    datasets: [
      {
        label: "Fleet Utilization (%)",
        data: [80, 20],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const fleetUtilizationOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Utilization: ${context.raw}%`,
          title: (tooltipItems) => `Fleet Status: ${tooltipItems[0].label}`,
        },
      },
    },
  };

  const bubbleChartData = {
    datasets: [
      {
        label: "Sales Data",
        data: [
          { x: 10, y: 20, r: 15 },
          { x: 15, y: 30, r: 25 },
          { x: 20, y: 40, r: 35 },
          { x: 25, y: 50, r: 45 },
          { x: 30, y: 60, r: 55 },
        ],
        backgroundColor: (context) => {
          const revenue = context.raw.y;
          return revenue > 50
            ? "rgba(75, 192, 192, 0.7)"
            : "rgba(255, 99, 132, 0.7)";
        },
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        hoverBackgroundColor: (context) => {
          const revenue = context.raw.y;
          return revenue > 50
            ? "rgba(75, 192, 192, 0.9)"
            : "rgba(255, 99, 132, 0.9)";
        },
        hoverBorderColor: "#000",
        hoverBorderWidth: 1,
      },
    ],
  };

  const bubbleChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    plugins: {
      // position: 'top',
      labels: {
        font: {
          size: 14,
          weight: "bold", // Makes the font more prominent
        },
        padding: 20, // Adds space between legend items
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        borderRadius: 8,
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        callbacks: {
          label: (context) =>
            `Revenue: $${context.raw.y}k\nUnits Sold: ${context.raw.r} units`,
          title: (tooltipItems) => `Quarter: Q${tooltipItems[0].raw.x}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
          color: "rgba(211, 211, 211, 0.3)",
        },
        ticks: {
          color: darkMode ? "#fff" : "#444",
          padding: 12, // More padding for improved spacing
          font: {
            size: 16, // Increase size for better readability
            weight: "bold",
          },
        },
        title: {
          display: true,
          text: "Quarter",
          color: darkMode ? "#f97316" : "#444",
          font: {
            size: 16,
            family: "Arial",
            weight: "bold",
          },
          padding: { top: 10 },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
          color: "rgba(211, 211, 211, 0.3)",
        },
        ticks: {
          color: darkMode ? "#fff" : "#444",
          padding: 10,
          font: {
            size: 14,
            weight: "bold",
          },
        },
        title: {
          display: true,
          text: "Revenue (in $k)",
          color: darkMode ? "#f97316" : "#444",
          font: {
            size: 16,
            family: "Arial",
            weight: "bold",
          },
          padding: { left: 10 },
        },
      },
    },
    layout: {
      padding: {
        // top: 60,
        // bottom: 30,
        // left: 20,
        // right: 20,
      },
    },
    elements: {
      point: {
        radius: (context) => {
          const value = context.raw.r;
          const maxRadius = 5;
          return Math.min(value, maxRadius);
        },
        hoverRadius: 1,
        hoverBorderColor: "#fff",
        hoverBorderWidth: 1,
      },
    },
    interaction: {
      mode: "nearest",
      axis: "xy",
      intersect: false,
    },
    animation: {
      duration: 700, // Slightly longer animation for smoother effect
      easing: "easeOutQuart", // Softer easing for a smoother entry
    },
  };
  return (
    <motion.div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
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
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div
          className={`flex-1 p-6 space-y-6 ${
            darkMode ? "bg-gray-900" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-4"></div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Existing ChartCards */}
            <ChartCard title="Deliveries Over Time">
              <div className="w-full sm:h-[400px] lg:h-[300px] p-2">
                <Line data={deliveryData} options={deliveryOptions} />
              </div>
            </ChartCard>

            <ChartCard title="Transport Costs">
              <div className="w-full sm:h-[300px] lg:h-[300px] p-2">
                <Bar data={transportCostData} options={transportCostOptions} />
              </div>
            </ChartCard>
            <ChartCard title="Average Delivery Time">
              <Radar data={deliveryTimeData} options={deliveryTimeOptions} />
            </ChartCard>
            <ChartCard title="Regional Expenses">
              <Pie data={regionExpensesData} options={regionExpensesOptions} />
            </ChartCard>
            <ChartCard title="Fleet Efficiency">
              <Bar
                data={fleetEfficiencyData}
                options={fleetEfficiencyOptions}
              />
            </ChartCard>
            <ChartCard title="Monthly Expenses">
              <Bar
                data={monthlyExpensesData}
                options={monthlyExpensesOptions}
              />
            </ChartCard>
            <ChartCard title="Delivery Status">
              <Pie data={deliveryStatusData} options={deliveryStatusOptions} />
            </ChartCard>
            <ChartCard title="Fleet Utilization">
              <Bar
                data={fleetUtilizationData}
                options={fleetUtilizationOptions}
              />
            </ChartCard>
            {/* New Bubble Chart */}
            <ChartCard title="Sales Data">
              <Bubble
                className="h-60"
                data={bubbleChartData}
                options={bubbleChartOptions}
              />
            </ChartCard>
          </div>
          {/* Existing loading spinner, ToastContainer, and Modal */}
          {loading && (
            <div className="flex items-center justify-center h-40">
              <ClipLoader color={darkMode ? "white" : "black"} />
            </div>
          )}
          <ToastContainer />
          <Modal isOpen={showModal} onClose={toggleModal}>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">Export Data</h3>
              <CSVLink
                data={csvData}
                filename="logistics_data.csv"
                className="inline-block px-4 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Download CSV
              </CSVLink>
            </div>
          </Modal>
          <Footer />
        </div>
      </div>
    </motion.div>
  );
};

export default Logistics;
