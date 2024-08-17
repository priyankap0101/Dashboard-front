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
  BarElement
} from 'chart.js';
import { Line, Pie, Radar, Bar } from 'react-chartjs-2';

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
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
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

  const csvData = data.map(item => ({
    city: item.city,
    topic: item.topic,
    swot: item.swot,
    pestle: item.pestle
  }));

  const darkColors = {
    background: 'rgba(0, 0, 0, 0.8)',
    border: 'rgba(255, 255, 255, 0.8)',
    line: 'rgba(255, 99, 132, 1)',
    bar: 'rgba(255, 99, 132, 0.2)',
    pie: [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)'
    ],
    radar: 'rgba(255, 99, 132, 0.8)',
    chartBackground: 'rgba(0, 0, 0, 0.8)',
    chartBorder: 'rgba(255, 255, 255, 0.8)'
  };

  const lightColors = {
    background: 'rgba(255, 255, 255, 1)',
    border: 'rgba(0, 0, 0, 0.8)',
    line: 'rgba(75, 192, 192, 1)',
    bar: 'rgba(75, 192, 192, 0.2)',
    pie: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)'
    ],
    radar: 'rgba(255, 99, 132, 0.2)',
    chartBackground: 'rgba(255, 255, 255, 1)',
    chartBorder: 'rgba(0, 0, 0, 0.8)'
  };

  const colors = darkMode ? darkColors : lightColors;

  const chartOptions = (isRadar = false) => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: colors.border
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`
        }
      }
    },
    elements: {
      line: {
        borderColor: colors.line
      },
      bar: {
        backgroundColor: colors.bar
      },
      radar: {
        backgroundColor: colors.radar,
        borderColor: colors.border
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: colors.border
        }
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          color: colors.border
        }
      }
    },
    layout: {
      padding: {
        top: 20
      }
    }
  });

  const monthlySalesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Monthly Sales ($)',
      data: [1200, 1500, 1800, 2200, 2500, 2800, 3000, 3200, 3300, 3100, 2900, 2700],
      backgroundColor: colors.chartBackground,
      borderColor: colors.line,
      borderWidth: 2
    }]
  };

  const quarterlyRevenueData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Quarterly Revenue ($)',
      data: [15000, 20000, 22000, 25000],
      backgroundColor: colors.chartBackground,
      borderColor: colors.line,
      borderWidth: 2
    }]
  };

  const expenseData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      label: 'Monthly Expenses ($)',
      data: [600, 700, 800, 900, 950, 1100],
      borderColor: colors.line,
      backgroundColor: colors.chartBackground,
      fill: true,
      tension: 0.3
    }]
  };

  const departmentExpenseData = {
    labels: ['HR', 'Engineering', 'Sales', 'Marketing'],
    datasets: [{
      label: 'Department Expenses (%)',
      data: [30, 40, 20, 10],
      backgroundColor: colors.pie
    }]
  };

  const skillData = {
    labels: ['JavaScript', 'React', 'Node.js', 'CSS', 'HTML'],
    datasets: [{
      label: 'Skill Proficiency',
      data: [90, 85, 80, 75, 70],
      backgroundColor: colors.radar,
      borderColor: colors.border,
      borderWidth: 2
    }]
  };

  const projectTimelineData = {
    labels: ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'],
    datasets: [{
      label: 'Project Timeline (days)',
      data: [30, 45, 60, 75],
      backgroundColor: colors.chartBackground,
      borderColor: colors.line,
      borderWidth: 2
    }]
  };

  const exportToPDF = () => {
    if (chartsRef.current) {
      html2canvas(chartsRef.current).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("charts.pdf");
      });
    }
  };

  const handleFeedbackChange = (e) => setFeedback(e.target.value);

  const handleFeedbackSubmit = () => {
    toast.success("Feedback submitted successfully!");
    setFeedback(""); // Clear feedback input
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Full width header */}
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main content area */}
      <div className="flex">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 p-6">
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Analytics Dashboard</h1>
            </motion.div>
            <motion.div
              variants={itemVariants}
              ref={chartsRef}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {loading ? (
                <div className="flex items-center justify-center h-40">
                  <ClipLoader color={darkMode ? '#ffffff' : '#000000'} />
                </div>
              ) : (
                <>
                  <div className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Monthly Sales</h2>
                    <Line data={monthlySalesData} options={chartOptions()} />
                  </div>
                  <div className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quarterly Revenue</h2>
                    <Bar data={quarterlyRevenueData} options={chartOptions()} />
                  </div>
                  <div className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Expenses</h2>
                    <Line data={expenseData} options={chartOptions()} />
                  </div>
                  <div className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Department Expenses</h2>
                    <Pie data={departmentExpenseData} options={chartOptions()} />
                  </div>
                  <div className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Skill Proficiency</h2>
                    <Radar data={skillData} options={chartOptions(true)} />
                  </div>
                  <div className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Project Timeline</h2>
                    <Bar data={projectTimelineData} options={chartOptions()} />
                  </div>
                </>
              )}
            </motion.div>
            <div className="flex flex-col gap-4 mt-6 md:flex-row md:justify-between">
              <button
                onClick={exportToPDF}
                className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Export as PDF
              </button>
              <CSVLink
                data={csvData}
                filename={"analytics-data.csv"}
                className="px-4 py-2 text-white bg-green-500 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Export as CSV
              </CSVLink>
            </div>
            {/* Feedback section */}
            <motion.div variants={itemVariants} className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Submit Your Feedback</h2>
              <textarea
                value={feedback}
                onChange={handleFeedbackChange}
                className={`w-full p-2 mt-2 text-sm rounded-md ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
                placeholder="Enter your feedback here..."
                rows={4}
              />
              <button
                onClick={handleFeedbackSubmit}
                className="px-4 py-2 mt-2 text-white bg-indigo-500 rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Submit Feedback
              </button>
            </motion.div>
          </motion.div>
        </main>
      </div>

      {/* Toast notifications */}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </div>
  );
};

export default Analytics;
