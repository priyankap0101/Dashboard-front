import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie, Radar, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import Sidebar from './Sidebar';
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const CRM = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  const [activeProjects] = useState([
    { name: "Project Alpha", status: "On Track", progress: 60, icon: "🚀" },
    { name: "Project Beta", status: "Completed", progress: 100, icon: "✅" },
    { name: "Project Gamma", status: "At Risk", progress: 30, icon: "⚠️" },
  ]);

  const [recentTransactions] = useState([
    { id: "T001", date: "2024-08-01", amount: "$1200", type: "Purchase", status: "Completed" },
    { id: "T002", date: "2024-08-02", amount: "$500", type: "Refund", status: "Pending" },
    { id: "T003", date: "2024-08-03", amount: "$700", type: "Purchase", status: "Failed" },
  ]);

  const [feedbackMessages] = useState([
    { name: "Alice", message: "Great tool, very helpful!", date: "2024-08-01" },
    { name: "Bob", message: "Needs more features.", date: "2024-08-02" },
  ]);

  const [performanceMetrics] = useState([
    { metric: "Sales Growth", value: "15%" },
    { metric: "Customer Retention", value: "85%" },
  ]);

  const barChartData = {
    labels: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
    datasets: [
      {
        label: "Population",
        data: [8175133, 3792621, 2695598, 2129784, 1445632],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Revenue",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Direct", "Referral", "Social"],
    datasets: [
      {
        label: "Traffic Sources",
        data: [55, 30, 15],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
        borderColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 206, 86)"],
        borderWidth: 1,
      },
    ],
  };

  const radarChartData = {
    labels: ["Strength", "Weakness", "Opportunity", "Threat"],
    datasets: [
      {
        label: "SWOT Analysis",
        data: [65, 59, 90, 81],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 2,
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Product A", "Product B", "Product C"],
    datasets: [
      {
        label: "Sales",
        data: [300, 450, 150],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
        borderColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 206, 86)"],
        borderWidth: 1,
      },
    ],
  };

  const salesChartData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Sales",
        data: [12000, 15000, 18000, 22000],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const darkModeOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#ffffff'
        }
      },
      tooltip: {
        backgroundColor: '#333333',
        titleColor: '#ffffff',
        bodyColor: '#ffffff'
      },
      datalabels: {
        color: '#ffffff'
      }
    },
    elements: {
      line: {
        borderColor: '#ffffff'
      },
      arc: {
        borderColor: '#ffffff'
      }
    }
  };

  const lightModeOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#333333'
        }
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#333333',
        bodyColor: '#333333'
      },
      datalabels: {
        color: '#333333'
      }
    },
    elements: {
      line: {
        borderColor: '#333333'
      },
      arc: {
        borderColor: '#333333'
      }
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    toast.success("Feedback submitted!");
    setFeedback("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color={darkMode ? "white" : "black"} size={50} />
      </div>
    );
  }

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Sidebar darkMode={darkMode} />
      <div className="flex flex-col flex-1">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="flex-1 p-6 overflow-auto">
          <ToastContainer />
          {error && (
            <div className="p-4 mb-4 text-white bg-red-500 rounded-lg">
              {error}
            </div>
          )}

          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className={`p-4 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h2 className="mb-4 text-2xl font-bold">City Data</h2>
              <Bar data={barChartData} options={darkMode ? darkModeOptions : lightModeOptions} />
            </motion.div>

            <motion.div variants={itemVariants} className={`p-4 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h2 className="mb-4 text-2xl font-bold">Revenue</h2>
              <Line data={lineChartData} options={darkMode ? darkModeOptions : lightModeOptions} />
            </motion.div>

            <motion.div variants={itemVariants} className={`p-4 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h2 className="mb-4 text-2xl font-bold">Traffic Sources</h2>
              <Pie data={pieChartData} options={darkMode ? darkModeOptions : lightModeOptions} />
            </motion.div>

            <motion.div variants={itemVariants} className={`p-4 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h2 className="mb-4 text-2xl font-bold">SWOT Analysis</h2>
              <Radar data={radarChartData} options={darkMode ? darkModeOptions : lightModeOptions} />
            </motion.div>

            <motion.div variants={itemVariants} className={`p-4 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h2 className="mb-4 text-2xl font-bold">Sales</h2>
              <Doughnut data={doughnutChartData} options={darkMode ? darkModeOptions : lightModeOptions} />
            </motion.div>

            <motion.div variants={itemVariants} className={`p-4 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h2 className="mb-4 text-2xl font-bold">Performance</h2>
              <Radar data={salesChartData} options={darkMode ? darkModeOptions : lightModeOptions} />
            </motion.div>
          </motion.div>

          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-bold">Active Projects</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeProjects.map((project) => (
                <div
                  key={project.name}
                  className={`p-4 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}
                >
                  <h3 className="mb-2 text-xl font-bold">{project.icon} {project.name}</h3>
                  <p>Status: {project.status}</p>
                  <div className="relative pt-1">
                    <div className="flex h-2 mb-4 overflow-hidden text-xs bg-gray-200 rounded">
                      <div
                        style={{ width: `${project.progress}%` }}
                        className={`flex flex-col justify-center text-center text-white shadow-none ${project.progress === 100 ? "bg-green-500" : project.progress >= 50 ? "bg-blue-500" : "bg-red-500"}`}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-bold">Recent Transactions</h2>
            <div className="overflow-auto rounded-lg shadow-md">
              <table className={`w-full ${darkMode ? "text-white" : "text-gray-900"}`}>
                <thead>
                  <tr className="bg-gray-300">
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className={`${darkMode ? "bg-gray-800" : "bg-white"} ${transaction.status === "Pending" ? "bg-yellow-200" : transaction.status === "Failed" ? "bg-red-200" : ""}`}>
                      <td className="p-3">{transaction.id}</td>
                      <td className="p-3">{transaction.date}</td>
                      <td className="p-3">{transaction.amount}</td>
                      <td className="p-3">{transaction.type}</td>
                      <td className="p-3">{transaction.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-bold">Feedback</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {feedbackMessages.map((message, index) => (
                <div key={index} className={`p-4 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                  <h3 className="mb-2 text-xl font-bold">{message.name}</h3>
                  <p>{message.message}</p>
                  <p className="text-sm text-gray-500">{message.date}</p>
                </div>
              ))}
            </div>
          </div>

          <form className="mt-8" onSubmit={handleFeedbackSubmit}>
            <h2 className="mb-4 text-2xl font-bold">Submit Feedback</h2>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows="4"
              className={`w-full p-2 mb-4 border rounded-lg ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"}`}
              placeholder="Enter your feedback"
            ></textarea>
            <button type="submit" className={`px-4 py-2 font-bold rounded ${darkMode ? "bg-blue-500 text-white" : "bg-blue-300 text-gray-900"}`}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CRM;
