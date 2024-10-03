import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { getData } from "../services/dataService";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import Header from "./Header";

import { jsPDF } from "jspdf";

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
  // Initialize the expandedIndex state
  const [expandedIndex, setExpandedIndex] = useState(null);

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

  const salesOverviewData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [3000, 2500, 4000, 3500, 4200, 4800],
        borderColor: darkMode ? "#f9fafb" : "#111827", // Line color
        backgroundColor: darkMode
          ? "rgba(249, 250, 251, 0.5)"
          : "rgba(17, 24, 39, 0.5)",
        fill: false,
      },
    ],
  };

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
          1200, 8500, 1800, 2200, 25000, 2800, 3000, 3200, 3300, 3100, 2900,
          2700, 6000,
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
        label: "Monthly Expenses ($)",
        data: [
          1200, 8500, 1800, 2200, 25000, 2800, 3000, 3200, 3300, 3100, 2900,
          2700, 6000,
        ],
        borderColor: colors.line,
        backgroundColor: colors.chartBackground,
        fill: false,
        // tension: 0.3,
      },
    ],
  };

  const LinechartOptions = (darkMode) => ({
    responsive: true,
    maintainAspectRatio: false,
    // Remove height here and control it through CSS or parent container
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 100, // Add ticks every 10,000 on Y-axis
          callback: function (value) {
            return "$" + value.toLocaleString(); // Format Y-axis labels as $ amounts
          },
        },
        grid: {
          display: false,
          color: darkMode ? "#4A5568" : "#E2E8F0", // Grid color for dark and light modes
          lineWidth: 1, // Optional: Adjust grid line width
        },
      },
      x: {
        ticks: {
          autoSkip: true, // Automatically skip ticks to avoid overlap
          maxTicksLimit: 10, // Limit the number of ticks on the X-axis
        },
        grid: {
          display: false, // Optional: Hide X-axis gridlines
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top", // Optional: Position the legend at the top
        labels: {
          color: darkMode ? "#2D3748" : "#FFFFFF", // Label color based on dark mode
          boxWidth: 15, // Adjust legend box width
        },
      },
      tooltip: {
        backgroundColor: darkMode ? "#2D3748" : "#FFFFFF", // Tooltip background color
        titleColor: darkMode ? "white" : "black", // Tooltip title color
        bodyColor: darkMode ? "white" : "black", // Tooltip body color
        borderColor: darkMode ? "#4A5568" : "#E2E8F0", // Tooltip border color
        borderWidth: 1, // Tooltip border width
      },
    },
  });

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

  const faqData = [
    // { question: 'What is analytics?', answer: 'Analytics involves the discovery, interpretation, and communication of meaningful patterns in data.' },
    {
      question: "How can I track user behavior?",
      answer:
        "User behavior can be tracked using various analytics tools like Google Analytics or custom tracking scripts.",
    },
    {
      question: "What are key performance indicators (KPIs)?",
      answer:
        "KPIs are measurable values that demonstrate how effectively a company is achieving its objectives.",
    },
    // { question: 'How does data visualization help?', answer: 'Data visualization helps make complex data more accessible and understandable through graphical representation.' },
    // { question: 'What is real-time analytics?', answer: 'Real-time analytics provides insights and data analysis as events happen, allowing for immediate decision-making.' }
  ];

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
        data: [30, 75, 80, 95],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        stepped: true, // Use stepped line
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
    <motion.div
      className={`min-h-screen w-full ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
      } transition-colors duration-300 ease-in-out`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        className="relative z-50"
      />
      <div className="flex">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <motion.main className="flex-1 p-6">
          <motion.div
            className="flex-grow p-6"
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
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={itemVariants}
              >
                {/* Slider Section (Takes 2 columns on larger screens) */}
                <div className={`p-4  col-span-1 md:col-span-2 lg:col-span-2 `}>
                  <MySlider />
                </div>

                {/* Average Daily Sales (1-column) */}
                <div
                  className={`p-6 rounded-3xl shadow-xl border transition-transform duration-300 ease-in-out hover:scale-100 hover:shadow-2xl ${
                    darkMode
                      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 border-gray-600"
                      : "bg-gradient-to-br from-white via-gray-100 to-gray-300 border-gray-200"
                  } h-96 flex flex-col justify-center   transition-transform duration-300 ease-in-out hover:scale-105`}
                >
                  {/* Title and Sales Value */}
                  <div className="flex flex-col items-center justify-center mb-6">
                    <h4
                      className={`text-2xl font-semibold tracking-wide mb-2 transition-colors duration-300 ${
                        darkMode ? "text-gray-300" : "text-gray-800"
                      }`}
                    >
                      Average Daily Sales
                    </h4>
                    <p
                      className={`text-xl font-extrabold transition-colors duration-300 ${
                        darkMode ? "text-yellow-300" : "text-gray-900"
                      }`}
                    >
                      $28,450
                    </p>
                  </div>

                  {/* Centered Chart */}
                  <div className="flex items-center justify-center flex-grow">
                    <div
                      className={`w-full h-full p-4 transition-all duration-300 ease-in-out shadow-md rounded-xl ${
                        darkMode ? "bg-gray-900" : "bg-gray-50"
                      }`}
                    >
                      <Line
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: { display: false },
                            tooltip: {
                              enabled: true,
                              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                              titleColor: darkMode ? "#e5e7eb" : "#000000",
                              bodyColor: darkMode ? "#e5e7eb" : "#000000",
                              borderColor: darkMode ? "#3b82f6" : "#6366f1",
                              borderWidth: 1,
                              displayColors: false,
                            },
                          },
                          scales: {
                            x: {
                              grid: { display: false }, // Remove x-axis grid lines
                              ticks: {
                                color: darkMode ? "#e5e7eb" : "#111827",
                                font: { weight: "600" },
                              },
                            },
                            y: {
                              grid: { display: false }, // Remove y-axis grid lines
                              ticks: {
                                color: darkMode ? "#e5e7eb" : "#111827",
                                font: { weight: "600" },
                              },
                            },
                          },
                          animation: {
                            duration: 1200,
                            easing: "easeInOutQuad",
                          },
                        }}
                        data={monthlySalesData}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Sales Overview (1-column) */}
                <div
                  className={`p-4 rounded-lg shadow-md border ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-300"
                  } transition-transform duration-300 ease-in-out hover:scale-105`}
                >
                  {/* Sales Overview Section */}
                  <div className="flex flex-col ">
                    {/* Sales Overview Text */}
                    <div className="flex items-center justify-between mb-4">
                      <h4
                        className={`text-lg font-semibold ${
                          darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                      >
                        Sales Overview
                      </h4>
                      <p
                        className={`text-2xl font-bold ${
                          darkMode ? "text-gray-200" : "text-gray-900"
                        }`}
                      >
                        $42.5k
                      </p>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <p
                        className={` font-bold ${
                          darkMode ? "text-gray-200" : "text-gray-900"
                        }`}
                      >
                        Order: 62.2% | Visits: 25.5%
                      </p>
                    </div>
                    {/* Chart Containers */}
                    <div className="grid grid-cols-1 gap-4">
                      {/* First Line Chart */}
                      <div className="h-56">
                        {" "}
                        {/* Adjust height as needed */}
                        <Line
                          data={salesOverviewData} // Replace with your actual chart data
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: { display: false },
                              tooltip: { enabled: true },
                            },
                            scales: {
                              x: {
                                grid: { display: false },
                                ticks: {
                                  color: darkMode ? "#f9fafb" : "#111827",
                                },
                              },
                              y: {
                                grid: { display: false },
                                ticks: {
                                  color: darkMode ? "#f9fafb" : "#111827",
                                },
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Earning Reports (Takes 2 columns on larger screens) */}
                <div
                  className={`p-3 m-1  col-span-1 md:col-span-2 lg:col-span-2 `}
                >
                  <EarningsReport
                    earnings={earnings}
                    percentageChange={percentageChange}
                  />
                </div>

                {/* Radar Chart for Skill Analysis */}
                <div
                  className={`p-4 sm:p-6 lg:p-8 w-full max-w-full sm:max-w-md lg:max-w-2xl mx-auto rounded-lg shadow-md border ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-300"
                  } transition-transform duration-300 ease-in-out hover:scale-105`}
                >
                  <div className="w-full">
                    <div className="relative pb-[95%]">
                      {" "}
                      {/* Responsive aspect ratio */}
                      <Radar
                        options={chartOptions(true)}
                        data={skillData}
                        className="absolute inset-0"
                      />
                    </div>
                  </div>
                </div>

                {/* Pie Chart */}
                <div
                  className={`w-full max-w-full sm:max-w-md lg:max-w-2xl mx-auto rounded-lg shadow-md border ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-300"
                  } transition-transform duration-300 ease-in-out hover:scale-105`}
                  style={{ height: "auto" }} // fallback height
                >
                  <div className="w-full h-full sm:h-80 lg:h-96">
                    <div className="relative h-full">
                      <Pie
                        options={chartOptions()}
                        data={departmentExpenseData}
                      />
                    </div>
                  </div>
                </div>

                {/* Line Chart for Expenses */}
                <div
                  className={`  w-full max-w-full sm:max-w-md lg:max-w-2xl mx-auto rounded-lg shadow-md border ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-300"
                  } transition-transform duration-300 ease-in-out hover:scale-105`}
                >
                  <div className="w-full mt-10 ">
                    <div className="relative ">
                      {" "}
                      <Line options={LinechartOptions()} data={expenseData} />
                    </div>
                  </div>
                </div>

                {/* Bar Chart for Project Timeline */}
                <div
                  className={`w-full max-w-full sm:max-w-md lg:max-w-2xl relative p-4 mx-auto rounded-lg shadow-lg border ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-300"
                  } transition-transform duration-300 ease-in-out transform hover:scale-[1.05] hover:shadow-2xl`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h2
                      className={`text-lg font-black ${
                        darkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      Project Timeline
                    </h2>
                    <div
                      className={`flex items-center space-x-4 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <span className="text-sm md:text-base">
                        Updated 2 days ago
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-opacity duration-200 h-7 w-7 opacity-70 hover:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 16h-1v-4h-1m1-4h.01M12 9v2m0 4v2m0 2v2m6 0H6a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="relative h-40 overflow-hidden shadow-inner sm:h-48 md:h-56 lg:h-72 rounded-2xl">
                    <Line
                      options={chartOptions()}
                      data={projectTimelineData}
                      height={300} // Increase the height of the chart to 400 pixels
                    />
                  </div>

                  {/* Button */}
                  <div className="flex justify-start mt-6">
                    <button
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ease-in-out ${
                        darkMode
                          ? "bg-gray-600 text-gray-100 hover:bg-gray-500"
                          : "bg-blue-600 text-white hover:bg-blue-500"
                      }`}
                    >
                      View Full Report
                    </button>
                  </div>
                </div>

                {/* Feedback Section */}
                <div
                  className={`p-4 md:p-6 max-w-full md:max-w-lg mx-auto rounded-lg shadow-md border ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-300"
                  } transition-transform duration-300 ease-in-out hover:scale-105`}
                >
                  <h2
                    className={`text-2xl font-semibold mb-4 ${
                      darkMode ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    Feedback
                  </h2>
                  <textarea
                    value={feedback}
                    onChange={handleFeedbackChange}
                    placeholder="Share your feedback here..."
                    className={`w-full p-4 rounded-lg border focus:outline-none transition-colors duration-300 ease-in-out ${
                      darkMode
                        ? "bg-gray-900 text-gray-200 border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-900"
                        : "bg-white text-gray-900 border-gray-300 placeholder-gray-600 focus:ring-2 focus:ring-blue-500"
                    }`}
                    rows="11"
                  />
                  <button
                    onClick={handleFeedbackSubmit}
                    className={` px-4 py-2 mt-4 rounded-lg font-semibold transition-colors duration-300 ease-in-out ${
                      darkMode
                        ? "bg-gray-600 text-gray-100 hover:bg-gray-500"
                        : "bg-blue-600 text-white hover:bg-blue-500"
                    }`}
                  >
                    Submit Feedback
                  </button>
                </div>

                <div
                  className={`p-4 md:p-6 max-w-full md:max-w-lg mx-auto rounded-lg shadow-md border ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-300"
                  } transition-transform duration-300 ease-in-out hover:scale-105`}
                >
                  <h2
                    className={`text-2xl font-semibold mb-4 ${
                      darkMode ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    FAQ
                  </h2>
                  {faqData.slice(0, 3).map((item, index) => (
                    <div key={index} className="mb-4">
                      <h4
                        className={`text-lg font-semibold ${
                          darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                      >
                        {item.question}
                      </h4>
                      <p
                        className={`mt-2 ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {item.answer.length > 120
                          ? `${item.answer.slice(0, 100)}...`
                          : item.answer}
                        {item.answer.length > 100 && (
                          <span
                            className={`cursor-pointer text-blue-500 ml-2`}
                            onClick={() => handleViewMore(index)}
                          >
                            {/* View More */}
                          </span>
                        )}
                      </p>
                      {expandedIndex === index && (
                        <p
                          className={`mt-2 ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {item.answer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
          <Footer />
        </motion.main>
      </div>

      <ToastContainer />
    </motion.div>
  );
};

export default Analytics;
