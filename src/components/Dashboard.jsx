import React, { useState, useEffect } from "react";
import { getData } from "../services/dataService";
import IntensityChart from "./IntensityChart";
import LikelihoodChart from "./LikelihoodChart";
import RelevanceChart from "./RelevanceChart";
import YearlyTrendsChart from "./YearlyTrendsChart";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { exportToCSV, exportToPDF } from "../utils/exportUtils";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { FiDownload, FiXCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton"; // For modern loading
import "react-loading-skeleton/dist/skeleton.css"; // Ensure you include skeleton CSS

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortOption, setSortOption] = useState("topic");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllCharts, setShowAllCharts] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getData();
        setData(result);
        setFilteredData(result);
      } catch (error) {
        toast.error("Error fetching data");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const applyFiltersAndSort = () => {
      let filteredResult = data;

      if (searchTerm) {
        filteredResult = filteredResult.filter((item) =>
          item.topic.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (sortOption) {
        filteredResult = filteredResult.sort((a, b) => {
          if (a[sortOption] < b[sortOption]) return -1;
          if (a[sortOption] > b[sortOption]) return 1;
          return 0;
        });
      }

      setFilteredData(filteredResult);
    };

    applyFiltersAndSort();
  }, [data, sortOption, searchTerm]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  };

  const handleExport = (format) => {
    switch (format) {
      case "csv":
        exportToCSV(filteredData, "data_export.csv");
        toast.success("Data exported as CSV");
        break;
      case "pdf":
        exportToPDF(filteredData, "data_export.pdf");
        toast.success("Data exported as PDF");
        break;
      case "zip":
        const zip = new JSZip();
        zip.file("data_export.csv", exportToCSV(filteredData, null, true));
        zip.file("data_export.pdf", exportToPDF(filteredData, null, true));
        zip.generateAsync({ type: "blob" }).then((content) => {
          saveAs(content, "data_export.zip");
          toast.success("Data exported as ZIP");
        });
        break;
      default:
        toast.error("Invalid export format");
    }
    setShowExportMenu(false);
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
      } min-h-screen transition-colors duration-300`}
    >
      <Header
        toggleSidebar={() => {}}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <div className="flex">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 p-6">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Data Visualization Dashboard</h1>
            <div className="relative flex items-center">
              <input
                type="text"
                className={`w-full md:w-80 p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-800 text-gray-200 focus:ring-blue-500"
                    : "bg-white text-gray-800 focus:ring-blue-500"
                }`}
                placeholder="Search by topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute text-gray-500 transform -translate-y-1/2 right-2 top-1/2 hover:text-gray-700"
                  aria-label="Clear search"
                >
                  <FiXCircle size={20} />
                </button>
              )}
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className={`ml-4 p-2 border rounded-md shadow-sm ${
                darkMode
                  ? "bg-gray-900 text-gray-200 border-gray-700"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
            >
              <option value="topic">Sort by Topic</option>
              <option value="year">Sort by Year</option>
              <option value="sector">Sort by Sector</option>
            </select>
          </header>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <ClipLoader color={darkMode ? "#ffffff" : "#000000"} loading={loading} size={50} />
            </div>
          ) : (
            <>
              <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-2">
                {(showAllCharts ? [
                  { component: IntensityChart, name: "Intensity Chart" },
                  { component: LikelihoodChart, name: "Likelihood Chart" },
                  { component: RelevanceChart, name: "Relevance Chart" },
                  { component: YearlyTrendsChart, name: "Yearly Trends Chart" }
                ] : [
                  { component: IntensityChart, name: "Intensity Chart" },
                  { component: LikelihoodChart, name: "Likelihood Chart" }
                ]).map(({ component: ChartComponent, name }, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
                    className={`p-6 rounded-lg shadow-lg ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    }`}
                    aria-label={name}
                  >
                    <h2 className="mb-4 text-xl font-semibold">{name}</h2>
                    <ChartComponent data={filteredData} />
                  </motion.div>
                ))}
              </section>

              {!showAllCharts && (
                <div className="flex justify-center mb-4">
                  <button
                    className="p-3 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
                    onClick={() => setShowAllCharts(true)}
                    aria-label="Show more charts"
                  >
                    Show More
                  </button>
                </div>
              )}
            </>
          )}

          <div className="fixed bottom-4 right-4">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="p-3 text-white transition-transform transform bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-105"
              aria-label="Export options"
            >
              <FiDownload size={24} />
            </button>
            {showExportMenu && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute right-0 bg-white border border-gray-300 rounded-md shadow-lg bottom-14"
              >
                <button
                  onClick={() => handleExport("csv")}
                  className="w-full p-2 text-left hover:bg-gray-100"
                >
                  Export as CSV
                </button>
                <button
                  onClick={() => handleExport("pdf")}
                  className="w-full p-2 text-left hover:bg-gray-100"
                >
                  Export as PDF
                </button>
                <button
                  onClick={() => handleExport("zip")}
                  className="w-full p-2 text-left hover:bg-gray-100"
                >
                  Export as ZIP
                </button>
              </motion.div>
            )}
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
