/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Modal from "./Modal";
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
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import html2canvas from "html2canvas"; // For image export
import jsPDF from "jspdf"; // For PDF export

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
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

const Dashboard1 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setData([
        // Add your dummy data here
      ]);
      setLoading(false);
    }, 1000);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const exportToPDF = (chartType) => {
    const doc = new jsPDF();
    doc.text(`${chartType} Chart Data`, 10, 10);
    doc.save(`${chartType.toLowerCase()}_chart.pdf`);
    toast.success(`${chartType} PDF exported successfully!`);
  };

  const exportToImage = (chartType) => {
    html2canvas(document.querySelector(`#${chartType.toLowerCase()}-chart`)).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save(`${chartType.toLowerCase()}_chart.png`);
      toast.success(`${chartType} image exported successfully!`);
    });
  };

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [30, 20, 40, 50, 70],
        backgroundColor: "rgba(54, 162, 235, 0.4)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const barChartData = {
    labels: ["A", "B", "C", "D"],
    datasets: [
      {
        label: "Performance",
        data: [40, 50, 30, 60],
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const doughnutData = {
    labels: ["Direct", "Referral", "Social Media"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          "rgba(255, 206, 86, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(75, 192, 192, 0.4)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <motion.div
      className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"} transition-colors duration-300 ease-in-out`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header toggleDarkMode={toggleDarkMode} />
      <div className="flex">
        <Sidebar darkMode={darkMode} />
        <motion.main className="flex-grow p-6" initial="hidden" animate="visible" variants={containerVariants}>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <ClipLoader color={darkMode ? "#fff" : "#000"} />
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div id="line-chart" className="p-4 border rounded-lg shadow-lg">
                <h2 className="mb-4 text-2xl font-semibold">Sales Data</h2>
                <Line data={lineChartData} />
                <div className="flex justify-between mt-4">
                  <button onClick={() => exportToPDF("Line")} className="p-2 text-white bg-blue-500 rounded">Export PDF</button>
                  <button onClick={() => exportToImage("Line")} className="p-2 text-white bg-blue-500 rounded">Export Image</button>
                </div>
              </div>

              <div id="bar-chart" className="p-4 border rounded-lg shadow-lg">
                <h2 className="mb-4 text-2xl font-semibold">Performance</h2>
                <Bar data={barChartData} />
                <div className="flex justify-between mt-4">
                  <button onClick={() => exportToPDF("Bar")} className="p-2 text-white bg-blue-500 rounded">Export PDF</button>
                  <button onClick={() => exportToImage("Bar")} className="p-2 text-white bg-blue-500 rounded">Export Image</button>
                </div>
              </div>

              <div id="doughnut-chart" className="p-4 border rounded-lg shadow-lg">
                <h2 className="mb-4 text-2xl font-semibold">Traffic Sources</h2>
                <Doughnut data={doughnutData} />
                <div className="flex justify-between mt-4">
                  <button onClick={() => exportToPDF("Doughnut")} className="p-2 text-white bg-blue-500 rounded">Export PDF</button>
                  <button onClick={() => exportToImage("Doughnut")} className="p-2 text-white bg-blue-500 rounded">Export Image</button>
                </div>
              </div>
            </div>
          )}
        </motion.main>
      </div>
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <h2 className="text-xl font-semibold">Modal Title</h2>
          <p>Here is some content for the modal.</p>
        </Modal>
      )}
      <ToastContainer />
    </motion.div>
  );
};

export default Dashboard1;
