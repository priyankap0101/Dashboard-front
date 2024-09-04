import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { getData } from "../services/dataService";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";

import Slider from "react-slick"; // Import react-slick
import "slick-carousel/slick/slick.css"; // Import slick-carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Import slick-carousel theme
import html2canvas from "html2canvas";
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
import { Line, Pie, Radar, Bar } from "react-chartjs-2";
import MySlider from "./slider";
import EarningsReport from "./EarningsReport";

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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

const Analytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [feedback, setFeedback] = useState("");
  const chartsRef = useRef(null);

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

  const darkColors = {
    background: "rgba(0, 0, 0, 0.8)",
    border: "rgba(255, 255, 255, 0.8)",
    line: "rgba(255, 99, 132, 1)",
    bar: "rgba(255, 99, 132, 0.2)",
    pie: [
      "rgba(255, 99, 132, 0.8)",
      "rgba(54, 162, 235, 0.8)",
      "rgba(255, 206, 86, 0.8)",
      "rgba(75, 192, 192, 0.8)",
    ],
    radar: "rgba(255, 99, 132, 0.8)",
    chartBackground: "rgba(0, 0, 0, 0.8)",
    chartBorder: "rgba(255, 255, 255, 0.8)",
  };

  const lightColors = {
    background: "rgba(255, 255, 255, 1)",
    border: "rgba(0, 0, 0, 0.8)",
    line: "rgba(75, 192, 192, 1)",
    bar: "rgba(75, 192, 192, 0.2)",
    pie: [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
    ],
    radar: "rgba(255, 99, 132, 0.2)",
    chartBackground: "rgba(255, 255, 255, 1)",
    chartBorder: "rgba(0, 0, 0, 0.8)",
  };

  const colors = darkMode ? darkColors : lightColors;

  const chartOptions = (isRadar = false) => ({
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: colors.border,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    elements: {
      line: {
        borderColor: colors.line,
      },
      bar: {
        backgroundColor: colors.bar,
      },
      radar: {
        backgroundColor: colors.radar,
        borderColor: colors.border,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: colors.border,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: colors.border,
        },
      },
    },
    layout: {
      padding: {
        top: 20,
      },
    },
  });

  const monthlySalesData = {
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
        label: "Monthly Sales ($)",
        data: [
          1200, 1500, 1800, 2200, 2500, 2800, 3000, 3200, 3300, 3100, 2900,
          2700,
        ],
        backgroundColor: colors.chartBackground,
        borderColor: colors.line,
        borderWidth: 2,
      },
    ],
  };

  const quarterlyRevenueData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Quarterly Revenue ($)",
        data: [15000, 20000, 22000, 25000],
        backgroundColor: colors.chartBackground,
        borderColor: colors.line,
        borderWidth: 2,
      },
    ],
  };

  const expenseData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Monthly Expenses ($)",
        data: [600, 700, 800, 900, 950, 1100],
        borderColor: colors.line,
        backgroundColor: colors.chartBackground,
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const earnings = 468; // Example earnings data
  const percentageChange = 4.2; // Example percentage change data

  
  const departmentExpenseData = {
    labels: ["HR", "Engineering", "Sales", "Marketing"],
    datasets: [
      {
        label: "Department Expenses (%)",
        data: [30, 40, 20, 10],
        backgroundColor: colors.pie,
      },
    ],
  };

  const skillData = {
    labels: ["JavaScript", "React", "Node.js", "CSS", "HTML"],
    datasets: [
      {
        label: "Skill Proficiency",
        data: [90, 85, 80, 75, 70],
        backgroundColor: colors.radar,
        borderColor: colors.border,
        borderWidth: 2,
      },
    ],
  };
  const conversionRate = 7.5; // Example conversion rate data
  const projectTimelineData = {
    labels: ["Phase 1", "Phase 2", "Phase 3", "Phase 4"],
    datasets: [
      {
        label: "Project Timeline (days)",
        data: [30, 45, 60, 75],
        backgroundColor: colors.chartBackground,
        borderColor: colors.line,
        borderWidth: 2,
      },
    ],
  };

  const exportToPDF = () => {
    if (chartsRef.current) {
      html2canvas(chartsRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save("charts.pdf");
      });
    }
  };

  // Slider settings for react-slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleFeedbackChange = (e) => setFeedback(e.target.value);

  const handleFeedbackSubmit = () => {
    toast.success("Feedback submitted successfully!");
    setFeedback(""); // Clear feedback input
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 p-6">
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            ref={chartsRef}
          >
            {loading ? (
              <div className="flex items-center justify-center min-h-screen">
                <ClipLoader color="#4A90E2" loading={loading} size={150} />
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2"
                variants={itemVariants}
              >
                <div
                  // className={`p-4  shadow-md rounded-lg w-full h-60 md:h-72 lg:h-96 }`}
                >
                  <MySlider />
                </div>

                <EarningsReport earnings={earnings} percentageChange={percentageChange} />

                {/* Line Chart */}
                <div
                  className={`p-4  shadow-md rounded-lg w-full h-64 md:h-80 lg:h-96 ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <Line options={chartOptions()} data={monthlySalesData} />
                </div>

                {/* Bar Chart */}
                <div
                  className={`p-4  shadow-md rounded-lg w-full h-72 md:h-96 lg:h-64 ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <Bar options={chartOptions()} data={quarterlyRevenueData} />
                </div>

                {/* Radar Chart */}
                <div
                  className={`p-4 rounded-lg shadow-md ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <Radar options={chartOptions(true)} data={skillData} />
                </div>

                {/* Pie Chart */}
                <div
                  className={`p-4 shadow-md rounded-lg w-full h-80 md:h-72 lg:h-80 ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <Pie options={chartOptions()} data={departmentExpenseData} />
                </div>

                {/* Line Chart for Expenses */}
                <div
                  className={`p-4 rounded-lg shadow-md ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <Line options={chartOptions()} data={expenseData} />
                </div>

                {/* Bar Chart for Project Timeline */}
                <div
                  className={`p-4 rounded-lg shadow-md ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <Bar options={chartOptions()} data={projectTimelineData} />
                </div>
              </motion.div>
            )}

            {/* Export Buttons */}
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={exportToPDF}
                className={`px-4 py-2 rounded-lg shadow-md ${
                  darkMode ? "bg-gray-700 text-white" : "bg-blue-500 text-white"
                }`}
              >
                Export as PDF
              </button>
              <CSVLink
                data={csvData}
                filename={"chart_data.csv"}
                className={`px-4 py-2 rounded-lg shadow-md ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                Export as CSV
              </CSVLink>
            </div>

            {/* Feedback Section */}
            <div className="mt-6">
              <h2
                className={`text-lg font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Feedback
              </h2>
              <textarea
                value={feedback}
                onChange={handleFeedbackChange}
                placeholder="Provide your feedback here..."
                className={`w-full p-2 mt-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              />
              <button
                onClick={handleFeedbackSubmit}
                className={`mt-2 px-4 py-2 rounded-lg ${
                  darkMode ? "bg-gray-700 text-white" : "bg-blue-500 text-white"
                }`}
              >
                Submit Feedback
              </button>
            </div>
          </motion.div>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Analytics;
