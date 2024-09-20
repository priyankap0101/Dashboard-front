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
import { exportToCSV } from "../utils/exportUtils";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { FiDownload } from "react-icons/fi";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortOption, setSortOption] = useState("topic");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showExportMenu, setShowExportMenu] = useState(false);
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
  }, [data, sortOption]);

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
        <main className="flex-1 p-6 ">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold"></h1>
            {/* Download Button Section */}
            <div className="relative flex items-center">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="p-2 text-white transition-transform transform bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-105"
                aria-label="Export options"
              >
                <FiDownload size={20} />
              </button>
              {showExportMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute right-0 w-40 bg-white border border-gray-300 rounded-lg shadow-lg top-12"
                >
                  <button
                    onClick={() => handleExport("csv")}
                    className={`block  px-4  py-2 text-sm text-gray-800  `}
                    aria-label="Export as CSV"
                  >
                    Export as CSV
                  </button>
                </motion.div>
              )}
            </div>
          </header>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <ClipLoader
                color={darkMode ? "#ffffff" : "#000000"}
                loading={loading}
                size={50}
              />
            </div>
          ) : (
            <>
              <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-2">
                {(showAllCharts
                  ? [
                      { component: RelevanceChart, name: "Relevance Chart" },
                      { component: LikelihoodChart, name: "Likelihood Chart" },
                      { component: IntensityChart, name: "Intensity Chart" },

                      {
                        component: YearlyTrendsChart,
                        name: "Yearly Trends Chart",
                      },
                    ]
                  : [
                      { component: RelevanceChart, name: "Relevance Chart" },
                      // { component: IntensityChart, name: "Intensity Chart" },
                      { component: LikelihoodChart, name: "Likelihood Chart" },
                    ]
                ).map(({ component: ChartComponent, name }, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
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

          <ToastContainer />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
